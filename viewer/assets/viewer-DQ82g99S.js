import{a as e,i as t,n,o as r,r as i,s as a,t as o,u as s}from"./gut3d.wgsl-BZjVsqNx.js";var c=32768,l=1024,u={N:0,VIS_TOTAL:1,PAIR_TOTAL:2,BIG:3,DERIVED_N:4,DERIVED_A:8,DERIVED_B:12,SCRATCH:16,BIG_EMIT:20,COUNT:24},d={N:0,A:9,B:18,BIG:27,BIG_EMIT:30,COUNT:33},f=`
struct Frame {
    worldToSensor : mat4x4f,
    sensorToWorld : mat4x4f,
    focal : vec2f,
    principal : vec2f,
    resolution : vec2f,
    tileGrid : vec2u,
    camPos : vec3f,
    numParticles : u32,
    radial : vec4f,
    radialExtra : vec4f,
    prism : vec4f,
    maxAngle : f32,
    shDegree : u32,
    pairCapacity : u32,
    numTiles : u32,
    background : vec4f,
};
`,p=`
const GRID_X: u32 = ${c}u;
fn linearGroup(wid: vec3u) -> u32 { return wid.x + wid.y * GRID_X; }
`,m=`
${n}
${o}
${r}
override GUT_FLAVOR_GSPLAT: bool = false;
override GUT_DISTANCE_SORT: bool = false;
${e}
${i}
${f}
${p}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read> geom: array<vec4f>;
@group(0) @binding(2) var<storage, read_write> tileCount: array<u32>;
@group(0) @binding(3) var<storage, read_write> visFlag: array<u32>;
@group(0) @binding(4) var<storage, read_write> depthKey: array<u32>;
@group(0) @binding(5) var<storage, read_write> proj: array<vec4f>;

override CAMERA_MODEL: u32 = 2u;
fn frameCamera() -> GutCamera {
    var cam: GutCamera;
    cam.worldToSensor = frame.worldToSensor;
    cam.sensorToWorld = frame.sensorToWorld;
    cam.focalLength = frame.focal;
    cam.principalPoint = frame.principal;
    cam.radialCoeffs = frame.radial;
    cam.radialExtra = frame.radialExtra;
    cam.thinPrismCoeffs = frame.prism;
    cam.resolution = frame.resolution;
    cam.maxAngle = frame.maxAngle;
    cam.cameraModel = CAMERA_MODEL;
    return cam;
}

// computeTileSpaceBBox: tiles [lo, hi) touched by the projected extent.
fn tileBox(center: vec2f, extent: vec2f, grid: vec2u) -> vec4u {
    let g = vec2i(grid);
    let lo = min(g, max(vec2i(0), vec2i(floor((center - 0.5 - extent) / TILE_BLOCK_X))));
    let hi = min(g, max(vec2i(0), vec2i(ceil((center - 0.5 + extent) / TILE_BLOCK_X))));
    return vec4u(vec2u(lo), vec2u(hi));
}

override KERNEL_DEGREE: i32 = 2;
override FOOTPRINT: bool = true;

@group(0) @binding(6) var<storage, read_write> counters: array<atomic<u32>>;
@group(0) @binding(7) var<storage, read_write> bigList: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let i = linearGroup(wid) * 256u + lid;
    if (i >= frame.numParticles) { return; }
    let a = geom[3u * i];
    let q = geom[3u * i + 1u];
    let s = geom[3u * i + 2u];
    let p = gutProjectParticle(frameCamera(), a.xyz, s.xyz, q, a.w, KERNEL_DEGREE);
    var count = 0u;
    var big = false;
    var tiles = vec4u(0u);
    var box = vec4f(-1.0e30, -1.0e30, 1.0e30, 1.0e30);
    if (p.valid) {
        tiles = select(tileBox(p.center, p.extent, frame.tileGrid),
                       gsplatRect(p.center, p.extent, frame.tileGrid), GUT_FLAVOR_GSPLAT);
        if (FOOTPRINT && CAMERA_MODEL == GUT_MODEL_PINHOLE_IDEAL) {
            let axes = gutQuatToMat3(q);
            let invScale = vec3f(1.0) / s.xyz;
            let v = frame.camPos - a.xyz;
            let origin = invScale * vec3f(dot(v, axes[0]), dot(v, axes[1]), dot(v, axes[2]));
            let b = gutExactPinholeBox(origin, axes, invScale, frame.sensorToWorld, frame.focal, frame.principal,
                p.center, max(max(p.extent.x, p.extent.y), 1.0), gutResponseCutoffSq(KERNEL_DEGREE, a.w));
            if (b.valid && all(b.lo <= p.center) && all(b.hi >= p.center)) {
                box = vec4f(b.lo, b.hi);
                let grid = vec2f(frame.tileGrid);
                let lo = vec2u(clamp(floor(box.xy / TILE_BLOCK_X), vec2f(0.0), grid));
                let hi = vec2u(clamp(floor(box.zw / TILE_BLOCK_X) + 1.0, vec2f(0.0), grid));
                tiles = vec4u(max(tiles.xy, lo), min(tiles.zw, hi));
            }
        }
        let extent = vec2u(max(tiles.zw, tiles.xy) - tiles.xy);
        if (extent.x * extent.y > 32u) {
            bigList[atomicAdd(&counters[${u.BIG}u], 1u)] = i;
            big = true;
        } else {
            for (var y = tiles.y; y < tiles.w; y++) {
                for (var x = tiles.x; x < tiles.z; x++) {
                    if (gutTileHit(vec2u(x, y), p.center, p.conic, p.maxPower, frame.tileGrid)) {
                        count++;
                    }
                }
            }
        }
    }
    // A deferred particle's count is written by projectBig.
    tileCount[i] = count;
    visFlag[i] = select(0u, 1u, count > 0u);
    if (count > 0u || big) {
        // GlobalZOrder: centre sensor depth. Positive, so its bits sort as a u32.
        depthKey[i] = bitcast<u32>(p.depth);
        proj[3u * i] = vec4f(p.center, p.conic.xy);
        proj[3u * i + 1u] = vec4f(p.conic.z, p.maxPower,
            bitcast<f32>(tiles.x | (tiles.y << 16u)), bitcast<f32>(tiles.z | (tiles.w << 16u)));
        proj[3u * i + 2u] = box;
    }
}
`,h=`
${n}
${o}
${r}
override GUT_FLAVOR_GSPLAT: bool = false;
override GUT_DISTANCE_SORT: bool = false;
${e}
${f}
${p}
@group(0) @binding(0) var<storage, read> counters: array<u32>;
@group(0) @binding(1) var<storage, read> bigList: array<u32>;
@group(0) @binding(2) var<storage, read> proj: array<vec4f>;
@group(0) @binding(3) var<storage, read_write> tileCount: array<u32>;
@group(0) @binding(4) var<storage, read_write> visFlag: array<u32>;
@group(0) @binding(5) var<uniform> frame: Frame;
var<workgroup> hits: atomic<u32>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let w = linearGroup(wid);
    if (w >= counters[${u.BIG}u]) { return; }
    let i = bigList[w];
    let pa = proj[3u * i];
    let pb = proj[3u * i + 1u];
    let center = pa.xy;
    let conic = vec3f(pa.zw, pb.x);
    let lo = bitcast<u32>(pb.z);
    let hi = bitcast<u32>(pb.w);
    let x0 = lo & 0xffffu;
    let y0 = lo >> 16u;
    let width = (hi & 0xffffu) - x0;
    let area = width * ((hi >> 16u) - y0);
    var local = 0u;
    for (var k = lid; k < area; k += 256u) {
        if (gutTileHit(vec2u(x0 + k % width, y0 + k / width), center, conic, pb.y, frame.tileGrid)) { local++; }
    }
    if (local > 0u) { atomicAdd(&hits, local); }
    workgroupBarrier();
    if (lid == 0u) {
        let count = atomicLoad(&hits);
        tileCount[i] = count;
        visFlag[i] = select(0u, 1u, count > 0u);
    }
}
`,g=`
struct ArgsParams { src: u32, perGroup: u32, dst: u32, pad: u32 };
@group(0) @binding(0) var<uniform> params: ArgsParams;
@group(0) @binding(1) var<storage, read> counters: array<u32>;
@group(0) @binding(2) var<storage, read_write> args: array<u32>;
const GRID_X: u32 = ${c}u;
@compute @workgroup_size(1)
fn main() {
    let groups = (counters[params.src] + params.perGroup - 1u) / params.perGroup;
    args[params.dst] = min(groups, GRID_X);
    args[params.dst + 1u] = (groups + GRID_X - 1u) / GRID_X;
    args[params.dst + 2u] = 1u;
}
`,_=`
${f}
${p}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read> tileCount: array<u32>;
@group(0) @binding(2) var<storage, read> visOffset: array<u32>;
@group(0) @binding(3) var<storage, read> depthKey: array<u32>;
@group(0) @binding(4) var<storage, read_write> pairs: array<vec2u>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let i = linearGroup(wid) * 256u + lid;
    if (i >= frame.numParticles) { return; }
    if (tileCount[i] > 0u) {
        pairs[visOffset[i]] = vec2u(depthKey[i], i);
    }
}
`,v=`
${p}
@group(0) @binding(0) var<storage, read> counters: array<u32>;
@group(0) @binding(1) var<storage, read> sorted: array<vec2u>;
@group(0) @binding(2) var<storage, read> tileCount: array<u32>;
@group(0) @binding(3) var<storage, read_write> counts: array<u32>;
@group(0) @binding(4) var<storage, read_write> depthRank: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let s = linearGroup(wid) * 256u + lid;
    if (s >= counters[${u.DERIVED_A}u]) { return; }
    let i = sorted[s].y;
    counts[s] = tileCount[i];
    depthRank[i] = s;
}
`,y=`
fn recordRange(s: u32, visible: u32) -> vec2u {
    let start = pairOffset[s];
    return vec2u(start, select(pairTotal(), pairOffset[s + 1u], s + 1u < visible));
}
`,b=`
${n}
${o}
${r}
override GUT_FLAVOR_GSPLAT: bool = false;
override GUT_DISTANCE_SORT: bool = false;
${e}
${f}
${p}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read_write> counters: array<atomic<u32>>;
@group(0) @binding(2) var<storage, read> tileCount: array<u32>;
@group(0) @binding(3) var<storage, read> depthRank: array<u32>;
@group(0) @binding(4) var<storage, read> proj: array<vec4f>;
@group(0) @binding(5) var<storage, read> pairOffset: array<u32>;
@group(0) @binding(6) var<storage, read_write> records: array<vec2u>;
@group(0) @binding(7) var<storage, read_write> bigEmit: array<u32>;
fn pairTotal() -> u32 { return atomicLoad(&counters[${u.PAIR_TOTAL}u]); }
${y}

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let i = linearGroup(wid) * 256u + lid;
    if (i >= frame.numParticles || tileCount[i] == 0u) { return; }
    let s = depthRank[i];
    let visible = atomicLoad(&counters[${u.DERIVED_A}u]);
    let pb = proj[3u * i + 1u];
    let lo = bitcast<u32>(pb.z);
    let hi = bitcast<u32>(pb.w);
    if (((hi & 0xffffu) - (lo & 0xffffu)) * ((hi >> 16u) - (lo >> 16u)) > 32u) {
        bigEmit[atomicAdd(&counters[${u.BIG_EMIT}u], 1u)] = i;
        return;
    }
    let pa = proj[3u * i];
    let center = pa.xy;
    let conic = vec3f(pa.zw, pb.x);
    let maxPower = pb.y;
    // Slots come from the depth-ordered scan; the records carry the particle
    // index, and the stable tile sort keeps them in depth order.
    let range = recordRange(s, visible);
    let capacity = frame.pairCapacity;
    let gridX = frame.tileGrid.x;
    let gridTiles = frame.tileGrid;
    var k = range.x;
    for (var y = lo >> 16u; y < (hi >> 16u) && k < range.y; y++) {
        for (var x = lo & 0xffffu; x < (hi & 0xffffu) && k < range.y; x++) {
            if (gutTileHit(vec2u(x, y), center, conic, maxPower, gridTiles)) {
                if (k < capacity) { records[k] = vec2u(y * gridX + x, i); }
                k++;
            }
        }
    }
    // Slots a re-evaluated test did not fill sort to the end and are ignored.
    for (; k < range.y; k++) {
        if (k < capacity) { records[k] = vec2u(frame.numTiles, i); }
    }
}
`,x=`
${n}
${o}
${r}
override GUT_FLAVOR_GSPLAT: bool = false;
override GUT_DISTANCE_SORT: bool = false;
${e}
${f}
${p}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read> counters: array<u32>;
@group(0) @binding(2) var<storage, read> bigEmit: array<u32>;
@group(0) @binding(3) var<storage, read> depthRank: array<u32>;
@group(0) @binding(4) var<storage, read> proj: array<vec4f>;
@group(0) @binding(5) var<storage, read> pairOffset: array<u32>;
@group(0) @binding(6) var<storage, read_write> records: array<vec2u>;
fn pairTotal() -> u32 { return counters[${u.PAIR_TOTAL}u]; }
${y}
var<workgroup> claimed: atomic<u32>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let w = linearGroup(wid);
    if (w >= counters[${u.BIG_EMIT}u]) { return; }
    let i = bigEmit[w];
    let s = depthRank[i];
    let pa = proj[3u * i];
    let pb = proj[3u * i + 1u];
    let center = pa.xy;
    let conic = vec3f(pa.zw, pb.x);
    let lo = bitcast<u32>(pb.z);
    let hi = bitcast<u32>(pb.w);
    let x0 = lo & 0xffffu;
    let y0 = lo >> 16u;
    let width = (hi & 0xffffu) - x0;
    let area = width * ((hi >> 16u) - y0);
    let range = recordRange(s, counters[${u.DERIVED_A}u]);
    let capacity = frame.pairCapacity;
    for (var k = lid; k < area; k += 256u) {
        let x = x0 + k % width;
        let y = y0 + k / width;
        if (gutTileHit(vec2u(x, y), center, conic, pb.y, frame.tileGrid)) {
            let slot = range.x + atomicAdd(&claimed, 1u);
            if (slot < range.y && slot < capacity) { records[slot] = vec2u(y * frame.tileGrid.x + x, i); }
        }
    }
    workgroupBarrier();
    for (var slot = range.x + atomicLoad(&claimed) + lid; slot < range.y; slot += 256u) {
        if (slot < capacity) { records[slot] = vec2u(frame.numTiles, i); }
    }
}
`,S={f32:12,f16:6,u8:14},C={f32:48,f16:24,u8:14};function w(e){let t=[];if(e===`f16`){for(let e=0;e<6;e++)t.push(`let w${e} = sh[base + ${e}u];`);for(let e=0;e<6;e++)for(let n=0;n<4;n++){let r=8*e+2*n;t.push(`let p${r} = unpack2x16float(w${e}.${`xyzw`[n]}); let h${r} = p${r}.x; let h${r+1} = p${r}.y;`)}}else if(e===`f32`){for(let e=0;e<12;e++)t.push(`let w${e} = sh[base + ${e}u];`);for(let e=0;e<12;e++)for(let n=0;n<4;n++)t.push(`let h${4*e+n} = w${e}.${`xyzw`[n]};`)}else{t.push(`let dc01 = unpack2x16float(sh[base]);`,`let dc2s = unpack2x16float(sh[base + 1u]);`),t.push(`let h0 = dc01.x; let h1 = dc01.y; let h2 = dc2s.x; let restScale = dc2s.y;`);for(let e=0;e<12;e++)t.push(`let q${e} = sh[base + ${e+2}u];`);for(let e=0;e<45;e++){let n=e>>2,r=e&3;t.push(`let h${e+3} = f32(bitcast<i32>(q${n} << ${24-8*r}u) >> 24u) * restScale;`)}}return t.join(`
    `)}function T(e){let t=e=>`vec3f(h${3*e}, h${3*e+1}, h${3*e+2})`,n=[`var rad = SPH_C0 * ${t(0)};`];return e>0&&n.push(`let x = dir.x; let y = dir.y; let z = dir.z;`,`rad = rad - SPH_C1 * y * ${t(1)} + SPH_C1 * z * ${t(2)} - SPH_C1 * x * ${t(3)};`),e>1&&n.push(`let xx = x * x; let yy = y * y; let zz = z * z;`,`let xy = x * y; let yz = y * z; let xz = x * z;`,`rad = rad + SPH_C2[0] * xy * ${t(4)}
              + SPH_C2[1] * yz * ${t(5)}
              + SPH_C2[2] * (2.0 * zz - xx - yy) * ${t(6)}
              + SPH_C2[3] * xz * ${t(7)}
              + SPH_C2[4] * (xx - yy) * ${t(8)};`),e>2&&n.push(`rad = rad + SPH_C3[0] * y * (3.0 * xx - yy) * ${t(9)}
              + SPH_C3[1] * xy * z * ${t(10)}
              + SPH_C3[2] * y * (4.0 * zz - xx - yy) * ${t(11)}
              + SPH_C3[3] * z * (2.0 * zz - 3.0 * xx - 3.0 * yy) * ${t(12)}
              + SPH_C3[4] * x * (4.0 * zz - xx - yy) * ${t(13)}
              + SPH_C3[5] * z * (xx - yy) * ${t(14)}
              + SPH_C3[6] * x * (xx - 3.0 * yy) * ${t(15)};`),n.push(`let rgb = max(rad + 0.5, vec3f(0.0));`),n.join(`
    `)}function E({encoding:e=`f32`,degree:t=3}){return`
${n}
${r}
${a}
${f}
${p}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read> tileCount: array<u32>;
@group(0) @binding(2) var<storage, read> proj: array<vec4f>;
@group(0) @binding(3) var<storage, read> geom: array<vec4f>;
@group(0) @binding(4) var<storage, read> sh: array<${{f32:`vec4f`,f16:`vec4u`,u8:`u32`}[e]}>;
@group(0) @binding(5) var<storage, read_write> rdata: array<vec4f>;
fn gutCanonical(axes: mat3x3f, invScale: vec3f, v: vec3f) -> vec3f {
    return invScale * vec3f(dot(v, axes[0]), dot(v, axes[1]), dot(v, axes[2]));
}

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let i = linearGroup(wid) * 256u + lid;
    if (i >= frame.numParticles || tileCount[i] == 0u) { return; }
    let g0 = geom[3u * i];
    let axes = gutQuatToMat3(geom[3u * i + 1u]);
    let invScale = vec3f(1.0) / geom[3u * i + 2u].xyz;
    let s2w = frame.sensorToWorld;
    let o = gutCanonical(axes, invScale, frame.camPos - g0.xyz);
    let c0 = gutCanonical(axes, invScale, s2w[0].xyz);
    let c1 = gutCanonical(axes, invScale, s2w[1].xyz);
    let c2 = gutCanonical(axes, invScale, s2w[2].xyz);

    let base = i * ${S[e]}u;
    ${w(e)}
    let ray = g0.xyz - frame.camPos;
    let dir = ray / length(ray);
    ${T(t)}

    rdata[5u * i] = vec4f(c0, o.x);
    rdata[5u * i + 1u] = vec4f(c1, o.y);
    rdata[5u * i + 2u] = vec4f(c2, o.z);
    rdata[5u * i + 3u] = vec4f(rgb, g0.w);
    rdata[5u * i + 4u] = proj[3u * i + 2u];
}
`}var D=`
${f}
${p}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read> counters: array<u32>;
@group(0) @binding(2) var<storage, read> records: array<vec2u>;
@group(0) @binding(3) var<storage, read_write> ranges: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let k = linearGroup(wid) * 256u + lid;
    let n = counters[${u.DERIVED_B}u];
    // Records were dropped (the buffer is too small for this view): flag the
    // frame, so the rasterizer keeps the last image rather than draw holes.
    // The word after the flag says whether that is wanted (see renderer.js).
    if (k == 0u && counters[${u.PAIR_TOTAL}u] > frame.pairCapacity) { ranges[2u * frame.numTiles] = ranges[2u * frame.numTiles + 1u]; }
    if (k >= n) { return; }
    let t = records[k].x;
    if (t >= frame.numTiles) { return; }
    if (k == 0u || records[k - 1u].x != t) { ranges[2u * t] = k; }
    if (k + 1u == n || records[k + 1u].x != t) { ranges[2u * t + 1u] = k + 1u; }
}
`,O={1:{threads:256,base:`vec2u(((t >> 5u) & 1u) * 8u + (t & 7u), (t >> 6u) * 4u + ((t >> 3u) & 3u))`,offsets:[[0,0]]},2:{threads:128,base:`vec2u(((t >> 5u) & 1u) * 8u + (t & 7u), (t >> 6u) * 8u + ((t >> 3u) & 3u) * 2u)`,offsets:[[0,0],[0,1]]},4:{threads:64,base:`vec2u((t & 7u) * 2u, (t >> 5u) * 8u + ((t >> 3u) & 3u) * 2u)`,offsets:[[0,0],[1,0],[0,1],[1,1]]},8:{threads:32,base:`vec2u((t & 7u) * 2u, (t >> 3u) * 4u)`,offsets:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]}};function k(e,t){return`if (GUT_FLAVOR_GSPLAT) {
            let next = transmittance${e} * (1.0 - ${t}.w);
            if (next <= MIN_TRANSMITTANCE) { alive${e} = false; } else {
                radiance${e} += ${t}.rgb * (${t}.w * transmittance${e}); transmittance${e} = next; }
        } else {
            radiance${e} += ${t}.rgb * (${t}.w * transmittance${e});
            transmittance${e} *= (1.0 - ${t}.w);
            alive${e} = transmittance${e} >= MIN_TRANSMITTANCE;
        }`}function A({batch:e=128,format:r=`rgba16float`,ppt:i=1,mask:a=!0,stats:o=!1,branchless:s=!0,kbuffer:c=0}={}){c>0&&(s=!1);let l=O[i],u=a&&e<=32;if(!l)throw Error(`Unsupported pixels per thread: ${i}`);let d=l.offsets.map((e,t)=>t),p=[Math.max(...l.offsets.map(e=>e[0])),Math.max(...l.offsets.map(e=>e[1]))],m=Math.max(1,e/l.threads),h=e=>d.map(e).join(`
`);return`
override GUT_FLAVOR_GSPLAT: bool = false;
${n}
${t}
${f}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read> ranges: array<u32>;
@group(0) @binding(2) var<storage, read> records: array<vec2u>;
@group(0) @binding(3) var<storage, read> rdata: array<vec4f>;
@group(0) @binding(4) var output: texture_storage_2d<${r}, write>;
${o?`@group(0) @binding(5) var<storage, read_write> work: array<atomic<u32>, 4>;`:``}

const BATCH: u32 = ${e}u;
const THREADS: u32 = ${l.threads}u;
const MIN_TRANSMITTANCE: f32 = 0.0001;
var<workgroup> batch: array<vec4f, ${5*e}>;
var<workgroup> retired: atomic<u32>;
var<workgroup> retiredSnapshot: u32;

// Camera-space ray of a pixel: (uv, 1) for the ideal pinhole; for the
// pinhole-to-fisheye lens (frame.radial.y = 1) the inverse of
// radius = tan(k theta) / k, with k in frame.radial.x.
fn pixelRay(uv: vec2f) -> vec3f {
    if (frame.radial.y == 0.0) { return vec3f(uv, 1.0); }
    if (frame.radial.y == 2.0) {
        // equirectangular: uv is (longitude, latitude)
        return vec3f(cos(uv.y) * sin(uv.x), sin(uv.y), cos(uv.y) * cos(uv.x));
    }
    if (frame.radial.y == 3.0) { return lonLatRay(fisheyePanoInverse(uv)); }
    if (frame.radial.y == 4.0) { return lonLatRay(triangleInverse(uv)); }
    let k = frame.radial.x;
    let r = length(uv);
    let theta = select(atan(k * r) / k, r, k < 1e-4);
    return select(vec3f(sin(theta) * uv / r, cos(theta)), vec3f(0.0, 0.0, 1.0), r < 1e-9);
}

fn lonLatRay(q: vec2f) -> vec3f {
    return vec3f(cos(q.y) * sin(q.x), sin(q.y), cos(q.y) * cos(q.x));
}

fn fisheyePanoOffset(q: vec2f) -> vec2f {
    let r = frame.radial;
    return r.z * gutLensFamily(q.x, q.y, r.x, r.w);
}

// Longitude and latitude of a pixel offset between fisheye and panorama:
// the blend has no closed-form inverse, so a few Newton steps solve it.
fn fisheyePanoInverse(offset: vec2f) -> vec2f {
    let r = frame.radial;
    // Start from the exact inverse of the stretched fisheye / Aitoff stage,
    // leaning towards the panorama's own inverse as w grows.
    let p = offset / r.z;
    let a = vec2f(p.x / r.x, p.y);
    let c = min(length(a), 3.14159);
    let u = select(a / c, vec2f(0.0), c < 1e-6);
    let d = vec3f(sin(c) * u, cos(c));
    let aitoffInverse = vec2f(r.x * atan2(d.x, d.z), asin(clamp(d.y, -1.0, 1.0)));
    var q = mix(aitoffInverse, p, r.w);
    for (var i = 0; i < 10; i++) {
        let e = fisheyePanoOffset(q) - offset;
        let h = 1e-3;
        let jx = (fisheyePanoOffset(q + vec2f(h, 0.0)) - fisheyePanoOffset(q)) / h;
        let jy = (fisheyePanoOffset(q + vec2f(0.0, h)) - fisheyePanoOffset(q)) / h;
        let det = jx.x * jy.y - jy.x * jx.y;
        if (abs(det) < 1e-12) { break; }
        q -= vec2f(jy.y * e.x - jy.x * e.y, -jx.y * e.x + jx.x * e.y) / det;
        q.y = clamp(q.y, -1.5707963, 1.5707963);
    }
    return q;
}

// Experimental lens triangle (gutLensTriangle): weights frame.radial.(x, z, w),
// focal lengths frame.radialExtra.xyz, outline parameters frame.prism.
fn triangleWeights() -> vec3f { return vec3f(frame.radial.x, frame.radial.z, frame.radial.w); }
fn triangleOffset(q: vec2f) -> vec2f { return gutLensTriangle(q.x, q.y, triangleWeights(), frame.radialExtra.xyz); }

fn triangleInverse(offset: vec2f) -> vec2f {
    let w = triangleWeights();
    let f = frame.radialExtra.xyz;
    // Start from an exact solve of the radial approximation
    //   radius(theta) = wP fP tan(theta) + (wF fF + wE fE) theta,
    // monotonic, so bisection finds it; then Newton corrects the panorama part.
    let r = length(offset);
    let linear = w.y * f.y + w.z * f.z;
    let top = select(3.14159, 1.5707, w.x > 0.0);
    var lo = 0.0;
    var hi = top;
    for (var i = 0; i < 24; i++) {
        let mid = 0.5 * (lo + hi);
        let rm = w.x * f.x * tan(mid) + linear * mid;
        if (rm < r) { lo = mid; } else { hi = mid; }
    }
    let theta = 0.5 * (lo + hi);
    let u = select(offset / r, vec2f(0.0), r < 1e-6);
    let d = vec3f(sin(theta) * u, cos(theta));
    var q = vec2f(atan2(d.x, d.z), asin(clamp(d.y, -1.0, 1.0)));
    for (var i = 0; i < 12; i++) {
        let e = triangleOffset(q) - offset;
        let h = 1e-3;
        let jx = (triangleOffset(q + vec2f(h, 0.0)) - triangleOffset(q)) / h;
        let jy = (triangleOffset(q + vec2f(0.0, h)) - triangleOffset(q)) / h;
        let det = jx.x * jy.y - jy.x * jx.y;
        if (abs(det) < 1e-12) { break; }
        q -= vec2f(jy.y * e.x - jy.x * e.y, -jx.y * e.x + jx.x * e.y) / det;
        q.y = clamp(q.y, -1.5707963, 1.5707963);
    }
    return q;
}

fn boxDistance(p: vec2f, half: vec2f) -> f32 {
    let d = abs(p) - half;
    return length(max(d, vec2f(0.0))) + min(max(d.x, d.y), 0.0);
}

// Pixels whose ray is wider than frame.radial.z from the axis are masked
// (the fisheye image circle) and show the background.
fn lensValid(uv: vec2f, ray: vec3f) -> bool {
    if (frame.radial.y == 4.0) {
        // The outline blends the corners' outlines (screen, mask circle,
        // 2:1 panorama) by their signed distances, with the same weights.
        let q = triangleInverse(uv);
        let w = triangleWeights();
        let fp = frame.radialExtra.z;
        let border = w.x * boxDistance(uv, frame.prism.yz) + w.y * (length(uv) - frame.prism.x)
                   + w.z * boxDistance(uv, vec2f(3.14159265, 1.5707963) * fp);
        // A solution past a fold of the mapping (mirrored, negative Jacobian)
        // is a ghost image, not this pixel's direction.
        let h = 1e-3;
        let jx = triangleOffset(q + vec2f(h, 0.0)) - triangleOffset(q);
        let jy = triangleOffset(q + vec2f(0.0, h)) - triangleOffset(q);
        let unfolded = jx.x * jy.y - jy.x * jx.y > 0.0;
        return border <= 0.0 && abs(q.x) <= 3.1416 && (w.x == 0.0 || ray.z > 0.0) && unfolded
            && length(triangleOffset(q) - uv) < 0.5;
    }
    if (frame.radial.y == 2.0) { return abs(uv.x) <= 3.14159265 && abs(uv.y) <= 1.5707963; }
    if (frame.radial.y == 3.0) {
        // inside the border ellipse (frame.radialExtra.xy, pixels), within
        // the sphere, and the solution really lands on this pixel
        let q = fisheyePanoInverse(uv);
        let e = uv / frame.radialExtra.xy;
        return dot(e, e) <= 1.0 && abs(q.x) <= 3.1416 && length(fisheyePanoOffset(q) - uv) < 0.5;
    }
    return frame.radial.y == 0.0 || ray.z >= cos(frame.radial.z);
}

@compute @workgroup_size(${l.threads})
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) t: u32) {
    // A frame with records missing leaves the last image in place (see the ranges pass).
    if (ranges[2u * frame.numTiles] != 0u) { return; }
    let first = wid.xy * 16u + ${l.base};
    let size = vec2u(frame.resolution);
    // Pixel centres, and the unnormalised camera-space rays (uv, 1) of an ideal pinhole.
${h(e=>`    let pixel${e} = first + vec2u(${l.offsets[e][0]}u, ${l.offsets[e][1]}u);
    let inside${e} = all(pixel${e} < size);
    let centre${e} = vec2f(pixel${e}) + 0.5;
    let angle${e} = (centre${e} - frame.principal) / frame.focal;
    let uv${e} = pixelRay(angle${e});
    var transmittance${e} = 1.0;
    var radiance${e} = vec3f(0.0);
    var alive${e} = inside${e} && lensValid(angle${e}, uv${e});${c?`
    // K named slots (not an array): with fixed indices they stay in registers.
${Array.from({length:c},(t,n)=>`    var kbT${e}_${n} = -1.0; var kbC${e}_${n} = vec4f(0.0);`).join(`
`)}
    var kbN${e} = 0u;`:``}`)}
    let lo = vec2f(first) + 0.5;
    let hi = lo + vec2f(${p[0]}.0, ${p[1]}.0);
    let tile = wid.y * frame.tileGrid.x + wid.x;
    let range = vec2u(ranges[2u * tile], ranges[2u * tile + 1u]);
    var alive = ${d.map(e=>`alive${e}`).join(` || `)};
    if (!alive) { atomicAdd(&retired, 1u); }
${o?`    var nTests = 0u; var nVisits = 0u; var nEvals = 0u; var nHits = 0u;`:``}

    for (var cursor = range.x; cursor < range.y; cursor += BATCH) {
        for (var l = 0u; l < ${m}u; l++) {
            let slot = l * THREADS + t;
            let k = cursor + slot;
            if (slot < BATCH && k < range.y) {
                let s = 5u * records[k].y;
                for (var c = 0u; c < 5u; c++) { batch[5u * slot + c] = rdata[s + c]; }
            }
        }
        workgroupBarrier();
        if (alive) {
            let n = min(BATCH, range.y - cursor);
${o?`            nTests += n;`:``}
${u?`            // Which particles of this batch reach this thread's pixels, as bits in
            // depth order; then visit only those, lowest bit first.
            var hits = 0u;
            for (var j = 0u; j < n; j++) {
                let box = batch[5u * j + 4u];
                if (all(hi >= box.xy) && all(lo <= box.zw)) { hits |= 1u << j; }
            }
            while (hits != 0u) {
                let j = firstTrailingBit(hits);
                hits &= hits - 1u;`:`            for (var j = 0u; j < n; j++) {
                let box = batch[5u * j + 4u];
                if (any(hi < box.xy) || any(lo > box.zw)) { continue; }`}
                let a = batch[5u * j];
                let b = batch[5u * j + 1u];
                let c = batch[5u * j + 2u];
                let e = batch[5u * j + 3u];
                let o = vec3f(a.w, b.w, c.w);
${o?`                nVisits++;`:``}
${h(e=>s?`                {${o?` if (alive${e}) { nEvals++; }`:``}
                    // Evaluated for every pixel of the thread; a rejected hit or a
                    // retired ray contributes alpha 0, which leaves both the radiance
                    // and the transmittance exactly unchanged.
                    let dir = normalize(a.xyz * uv${e}.x + b.xyz * uv${e}.y + c.xyz * uv${e}.z);
                    let d = cross(dir, o);
                    let response = exp(-0.5 * dot(d, d));
                    let clamped = min(GAUSSIAN_MAX_ALPHA, response * e.w);
                    // gsplat: the ray must not start past the particle's closest
                    // point, and a hit that would take transmittance to 1e-4 or
                    // below retires the ray without being added.
                    let gsHit = alive${e} && -dot(dir, o) >= 0.0 && clamped >= ALPHA_THRESHOLD;
                    let gsStop = gsHit && transmittance${e} * (1.0 - clamped) <= MIN_TRANSMITTANCE;
                    let accept = select(alive${e} && response > 0.0 && clamped > ALPHA_THRESHOLD,
                                        gsHit && !gsStop, GUT_FLAVOR_GSPLAT);${o?` if (accept) { nHits++; }`:``}
                    let alpha = select(0.0, clamped, accept);
                    radiance${e} += e.rgb * (alpha * transmittance${e});
                    transmittance${e} *= (1.0 - alpha);
                    alive${e} = select(alive${e} && transmittance${e} >= MIN_TRANSMITTANCE,
                                       alive${e} && !gsStop, GUT_FLAVOR_GSPLAT);
                }`:c?`                if (alive${e}) {${o?` nEvals++;`:``}
                    let g = a.xyz * uv${e}.x + b.xyz * uv${e}.y + c.xyz * uv${e}.z;
                    let dir = normalize(g);
                    let d = cross(dir, o);
                    let response = exp(-0.5 * dot(d, d));
                    let alpha = min(GAUSSIAN_MAX_ALPHA, response * e.w);
                    let along = -dot(dir, o);
                    // Distance along the ray to the particle's closest point (up to the
                    // pixel's ray length, the same for every hit of this ray).
                    let hitT = abs(along) / length(g);
                    let hit = select(response > 0.0 && alpha > ALPHA_THRESHOLD && hitT > 0.0,
                                     along >= 0.0 && alpha >= ALPHA_THRESHOLD, GUT_FLAVOR_GSPLAT);
                    if (hit) {${o?` nHits++;`:``}
                        if (kbN${e} == ${c}u) {
                            let h = kbC${e}_0;
                            ${k(e,`h`)}
                            kbT${e}_0 = -1.0;
                        } else {
                            kbN${e}++;
                        }
                        // Insertion from the far end, branch-free: slot q takes the carried
                        // hit when it is farther, and the old entry moves on down.
                        var carryT = hitT;
                        var carryC = vec4f(e.rgb, alpha);
${Array.from({length:c},(e,t)=>c-1-t).map(t=>`                        { let sw = carryT > kbT${e}_${t}; let tt = kbT${e}_${t}; let cc = kbC${e}_${t};
                          kbT${e}_${t} = select(tt, carryT, sw); kbC${e}_${t} = select(cc, carryC, sw);
                          carryT = select(carryT, tt, sw); carryC = select(carryC, cc, sw); }`).join(`
`)}
                    }
                }`:`                if (alive${e}) {${o?` nEvals++;`:``}
                    let dir = normalize(a.xyz * uv${e}.x + b.xyz * uv${e}.y + c.xyz * uv${e}.z);
                    let d = cross(dir, o);
                    let response = exp(-0.5 * dot(d, d));
                    let alpha = min(GAUSSIAN_MAX_ALPHA, response * e.w);
                    if (GUT_FLAVOR_GSPLAT) {
                        if (-dot(dir, o) >= 0.0 && alpha >= ALPHA_THRESHOLD) {
                            let next = transmittance${e} * (1.0 - alpha);
                            if (next <= MIN_TRANSMITTANCE) {
                                alive${e} = false;
                            } else {${o?` nHits++;`:``}
                                radiance${e} += e.rgb * (alpha * transmittance${e});
                                transmittance${e} = next;
                            }
                        }
                    } else if (response > 0.0 && alpha > ALPHA_THRESHOLD) {${o?` nHits++;`:``}
                        radiance${e} += e.rgb * (alpha * transmittance${e});
                        transmittance${e} *= (1.0 - alpha);
                        alive${e} = transmittance${e} >= MIN_TRANSMITTANCE;
                    }
                }`)}
                if (!(${d.map(e=>`alive${e}`).join(` || `)})) { break; }
            }
            alive = ${d.map(e=>`alive${e}`).join(` || `)};
            if (!alive) { atomicAdd(&retired, 1u); }
        }
        workgroupBarrier();
        if (t == 0u) { retiredSnapshot = atomicLoad(&retired); }
        if (workgroupUniformLoad(&retiredSnapshot) >= THREADS) { break; }
    }
${c?h(e=>Array.from({length:c},(t,n)=>`    if (alive${e} && ${n}u >= ${c}u - kbN${e}) {
        let h = kbC${e}_${n};
        ${k(e,`h`)}
    }`).join(`
`)):``}
${h(e=>`    if (inside${e}) { textureStore(output, vec2i(pixel${e}), vec4f(radiance${e}, 1.0 - transmittance${e})); }`)}
${o?`    atomicAdd(&work[0], nTests); atomicAdd(&work[1], nVisits); atomicAdd(&work[2], nEvals); atomicAdd(&work[3], nHits);`:``}
}
`}var j=`
struct Prep { src: u32, capacity: u32, dst: u32, args: u32 };
@group(0) @binding(0) var<uniform> prep: Prep;
@group(0) @binding(1) var<storage, read_write> counters: array<u32>;
@group(0) @binding(2) var<storage, read_write> args: array<u32>;
const GRID_X: u32 = ${c}u;
fn writeArgs(offset: u32, groups: u32) {
    args[offset] = min(groups, GRID_X);
    args[offset + 1u] = (groups + GRID_X - 1u) / GRID_X;
    args[offset + 2u] = 1u;
}
@compute @workgroup_size(1)
fn main() {
    let count = min(counters[prep.src], prep.capacity);
    let blocks = (count + ${l-1}u) / ${l}u;
    let hist = blocks * 16u;
    let histBlocks = (hist + ${l-1}u) / ${l}u;
    counters[prep.dst] = count;
    counters[prep.dst + 1u] = blocks;
    counters[prep.dst + 2u] = hist;
    counters[prep.dst + 3u] = histBlocks;
    writeArgs(prep.args, (count + 255u) / 256u);
    writeArgs(prep.args + 3u, blocks);
    writeArgs(prep.args + 6u, histBlocks);
}
`,M=`
struct ScanParams { countSlot: u32, totalSlot: u32, pad0: u32, pad1: u32 };
${p}
var<workgroup> scratch: array<u32, 256>;

// Inclusive Hillis-Steele scan of one value per thread; returns the exclusive
// prefix. The workgroup total is left in scratch[255].
fn workgroupExclusive(lid: u32, v: u32) -> u32 {
    scratch[lid] = v;
    workgroupBarrier();
    for (var offset = 1u; offset < 256u; offset <<= 1u) {
        var t = scratch[lid];
        if (lid >= offset) { t += scratch[lid - offset]; }
        workgroupBarrier();
        scratch[lid] = t;
        workgroupBarrier();
    }
    return scratch[lid] - v;
}
`,ee=`
${M}
@group(0) @binding(0) var<uniform> params: ScanParams;
@group(0) @binding(1) var<storage, read> counters: array<u32>;
@group(0) @binding(2) var<storage, read> data: array<u32>;
@group(0) @binding(3) var<storage, read_write> blockSums: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let count = counters[params.countSlot];
    let block = linearGroup(wid);
    if (block >= (count + ${l-1}u) / ${l}u) { return; }
    var sum = 0u;
    for (var k = 0u; k < 4u; k++) {
        let idx = block * ${l}u + k * 256u + lid;
        if (idx < count) { sum += data[idx]; }
    }
    scratch[lid] = sum;
    workgroupBarrier();
    for (var stride = 128u; stride > 0u; stride >>= 1u) {
        if (lid < stride) { scratch[lid] += scratch[lid + stride]; }
        workgroupBarrier();
    }
    if (lid == 0u) { blockSums[block] = scratch[0]; }
}
`,te=`
${M}
@group(0) @binding(0) var<uniform> params: ScanParams;
@group(0) @binding(1) var<storage, read_write> counters: array<u32>;
@group(0) @binding(2) var<storage, read_write> blockSums: array<u32>;
var<workgroup> countShared: u32;

@compute @workgroup_size(256)
fn main(@builtin(local_invocation_index) lid: u32) {
    if (lid == 0u) { countShared = counters[params.countSlot]; }
    let count = workgroupUniformLoad(&countShared);
    let blocks = (count + ${l-1}u) / ${l}u;
    var carry = 0u;
    for (var chunk = 0u; chunk < blocks; chunk += ${l}u) {
        let base = chunk + 4u * lid;
        var v = vec4u(0u);
        for (var k = 0u; k < 4u; k++) {
            if (base + k < blocks) { v[k] = blockSums[base + k]; }
        }
        let prefix = carry + workgroupExclusive(lid, v.x + v.y + v.z + v.w);
        let total = scratch[255];
        var run = prefix;
        for (var k = 0u; k < 4u; k++) {
            if (base + k < blocks) { blockSums[base + k] = run; }
            run += v[k];
        }
        carry += total;
        workgroupBarrier();
    }
    if (lid == 0u) { counters[params.totalSlot] = carry; }
}
`,ne=`
${M}
@group(0) @binding(0) var<uniform> params: ScanParams;
@group(0) @binding(1) var<storage, read> counters: array<u32>;
@group(0) @binding(2) var<storage, read_write> data: array<u32>;
@group(0) @binding(3) var<storage, read> blockSums: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let count = counters[params.countSlot];
    let block = linearGroup(wid);
    if (block >= (count + ${l-1}u) / ${l}u) { return; }
    let base = block * ${l}u + 4u * lid;
    var v = vec4u(0u);
    for (var k = 0u; k < 4u; k++) {
        if (base + k < count) { v[k] = data[base + k]; }
    }
    var run = blockSums[block] + workgroupExclusive(lid, v.x + v.y + v.z + v.w);
    for (var k = 0u; k < 4u; k++) {
        if (base + k < count) { data[base + k] = run; }
        run += v[k];
    }
}
`,N=`
struct SortParams { shift: u32, countSlot: u32, blocksSlot: u32, pad: u32 };
${p}
`,re=`
${N}
@group(0) @binding(0) var<uniform> params: SortParams;
@group(0) @binding(1) var<storage, read> counters: array<u32>;
@group(0) @binding(2) var<storage, read> keys: array<vec2u>;
@group(0) @binding(3) var<storage, read_write> hist: array<u32>;
var<workgroup> bins: array<atomic<u32>, 16>;

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let count = counters[params.countSlot];
    let blocks = counters[params.blocksSlot];
    let block = linearGroup(wid);
    if (block >= blocks) { return; }
    for (var k = 0u; k < 4u; k++) {
        let idx = block * ${l}u + k * 256u + lid;
        if (idx < count) {
            atomicAdd(&bins[(keys[idx].x >> params.shift) & 15u], 1u);
        }
    }
    workgroupBarrier();
    if (lid < 16u) { hist[lid * blocks + block] = atomicLoad(&bins[lid]); }
}
`,P=`
${N}
@group(0) @binding(0) var<uniform> params: SortParams;
@group(0) @binding(1) var<storage, read> counters: array<u32>;
@group(0) @binding(2) var<storage, read> src: array<vec2u>;
@group(0) @binding(3) var<storage, read_write> dst: array<vec2u>;
@group(0) @binding(4) var<storage, read> hist: array<u32>;
var<workgroup> scanLo: array<vec4u, 256>;
var<workgroup> scanHi: array<vec4u, 256>;
var<workgroup> binBase: array<u32, 16>;

fn field(lo: vec4u, hi: vec4u, digit: u32) -> u32 {
    let word = select(hi[(digit >> 1u) & 3u], lo[(digit >> 1u) & 3u], digit < 8u);
    return (word >> ((digit & 1u) * 16u)) & 0xffffu;
}

@compute @workgroup_size(256)
fn main(@builtin(workgroup_id) wid: vec3u, @builtin(local_invocation_index) lid: u32) {
    let count = counters[params.countSlot];
    let blocks = counters[params.blocksSlot];
    let block = linearGroup(wid);
    if (block >= blocks) { return; }
    let base = block * ${l}u + 4u * lid;
    var kv: array<vec2u, 4>;
    var digit = vec4u(16u);
    var lo = vec4u(0u);
    var hi = vec4u(0u);
    for (var k = 0u; k < 4u; k++) {
        if (base + k < count) {
            kv[k] = src[base + k];
            let d = (kv[k].x >> params.shift) & 15u;
            digit[k] = d;
            let inc = 1u << ((d & 1u) * 16u);
            if (d < 8u) { lo[(d >> 1u) & 3u] += inc; } else { hi[(d >> 1u) & 3u] += inc; }
        }
    }
    scanLo[lid] = lo;
    scanHi[lid] = hi;
    workgroupBarrier();
    for (var offset = 1u; offset < 256u; offset <<= 1u) {
        var a = scanLo[lid];
        var b = scanHi[lid];
        if (lid >= offset) { a += scanLo[lid - offset]; b += scanHi[lid - offset]; }
        workgroupBarrier();
        scanLo[lid] = a;
        scanHi[lid] = b;
        workgroupBarrier();
    }
    let exLo = scanLo[lid] - lo;
    let exHi = scanHi[lid] - hi;
    if (lid < 16u) { binBase[lid] = hist[lid * blocks + block]; }
    workgroupBarrier();
    for (var k = 0u; k < 4u; k++) {
        let d = digit[k];
        if (d < 16u) {
            var within = 0u;
            for (var j = 0u; j < k; j++) { within += select(0u, 1u, digit[j] == d); }
            dst[binBase[d] + field(exLo, exHi, d) + within] = kv[k];
        }
    }
}
`,F=`
@group(0) @binding(0) var a: texture_2d<f32>;
@group(0) @binding(1) var b: texture_2d<f32>;
@group(0) @binding(2) var<uniform> weight: vec4f;
@group(0) @binding(3) var out: texture_storage_2d<FORMAT, write>;
@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let size = textureDimensions(a);
    if (any(id.xy >= size)) { return; }
    let p = vec2i(id.xy);
    textureStore(out, p, mix(textureLoad(a, p, 0), textureLoad(b, p, 0), weight.x));
}
`;function I({format:e=`rgba16float`}={}){return`
@group(0) @binding(0) var image: texture_2d<f32>;
@group(0) @binding(1) var<uniform> background: vec4f;
struct VOut { @builtin(position) position: vec4f };
@vertex
fn vs(@builtin(vertex_index) i: u32) -> VOut {
    var out: VOut;
    let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
    out.position = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
    return out;
}
@fragment
fn fs(in: VOut) -> @location(0) vec4f {
    let c = textureLoad(image, vec2i(in.position.xy), 0);
    return vec4f(c.rgb + (1.0 - c.a) * background.rgb, 1.0);
}
`}var L=typeof GPUBufferUsage<`u`?GPUBufferUsage:{},R=[`project`,`compact`,`depthSort`,`gather`,`emit`,`shade`,`tileSort`,`rasterize`];async function ie({powerPreference:e=`high-performance`}={}){if(!navigator.gpu)throw Error(`This viewer needs WebGPU. Try a recent Chrome, Edge or Safari.`);let t=await navigator.gpu.requestAdapter({powerPreference:e});if(!t)throw Error(`No WebGPU adapter is available on this device.`);let n=t.limits,r={maxStorageBufferBindingSize:n.maxStorageBufferBindingSize,maxBufferSize:n.maxBufferSize,maxComputeWorkgroupStorageSize:n.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.maxComputeWorkgroupsPerDimension},i=[`timestamp-query`].filter(e=>t.features.has(e));return{adapter:t,device:await t.requestDevice({requiredLimits:r,requiredFeatures:i})}}function ae(e){return[Math.min(e,c),Math.max(1,Math.ceil(e/c))]}var oe=class{constructor(e,t={}){this.device=e,this.outputFormat=t.outputFormat??`rgba16float`,this.canvasFormat=t.canvasFormat??null,this.ppt=t.ppt??8,this.batch=t.batch??32,this.footprint=t.footprint!==!1,this.mask=t.mask!==!1,this.workStats=t.workStats===!0,this.branchless=t.branchless!==!1,this.kbuffer=t.kbuffer??0,this.timing=t.timing===!0&&e.features.has(`timestamp-query`),this.cameraModel=2,this.scene=null,this.width=0,this.height=0,this.pairCapacity=0,this.stats={visible:0,pairs:0,overflow:!1},this._readbackBusy=!1,this._timings=null,this.onNeedsRedraw=null}async init(){let e=this.device,t=(t,n,r={})=>e.createComputePipelineAsync({label:n,layout:`auto`,compute:{module:e.createShaderModule({code:t,label:n}),entryPoint:`main`,constants:r}}),n=[`prepare`,`args`,`scanReduce`,`scanBlocks`,`scanDownsweep`,`sortCount`,`sortScatter`,`projectBig`,`compact`,`gather`,`emit`,`emitBig`,`ranges`,`rasterize`],r=await Promise.all([t(j,`prepare`),t(g,`args`),t(ee,`scan-reduce`),t(te,`scan-blocks`),t(ne,`scan-downsweep`),t(re,`sort-count`),t(P,`sort-scatter`),t(h,`project-big`),t(_,`compact`),t(v,`gather`),t(b,`emit`),t(x,`emit-big`),t(D,`ranges`),t(A({batch:this.batch,format:this.outputFormat,ppt:this.ppt,mask:this.mask,stats:this.workStats,branchless:this.branchless}),`rasterize`)]);if(this._pipelines=Object.fromEntries(n.map((e,t)=>[e,r[t]])),this._pipelines.fade=await t(F.replace(`FORMAT`,this.outputFormat),`fade`),this._fadeWeight=e.createBuffer({label:`fade weight`,size:16,usage:L.UNIFORM|L.COPY_DST}),this.canvasFormat){let t=e.createShaderModule({code:I(),label:`blit`});this._pipelines.blit=await e.createRenderPipelineAsync({label:`blit`,layout:`auto`,vertex:{module:t,entryPoint:`vs`},fragment:{module:t,entryPoint:`fs`,targets:[{format:this.canvasFormat}]},primitive:{topology:`triangle-list`}})}this._frame=e.createBuffer({label:`frame`,size:256,usage:L.UNIFORM|L.COPY_DST}),this._background=e.createBuffer({label:`background`,size:16,usage:L.UNIFORM|L.COPY_DST}),this._counters=e.createBuffer({label:`counters`,size:u.COUNT*4,usage:L.STORAGE|L.COPY_SRC|L.COPY_DST}),this._args=e.createBuffer({label:`dispatch args`,size:d.COUNT*4,usage:L.STORAGE|L.INDIRECT}),this._readback=e.createBuffer({label:`counter readback`,size:u.COUNT*4,usage:L.MAP_READ|L.COPY_DST}),this.workStats&&(this._work=e.createBuffer({label:`raster work`,size:16,usage:L.STORAGE|L.COPY_SRC|L.COPY_DST}));let i=(t,n)=>{let r=e.createBuffer({label:t,size:16,usage:L.UNIFORM|L.COPY_DST});return e.queue.writeBuffer(r,0,new Uint32Array(n)),r};return this._small=i,this._params={argsBig:i(`args big`,[u.BIG,1,d.BIG,0]),argsBigEmit:i(`args big emit`,[u.BIG_EMIT,1,d.BIG_EMIT,0]),scanN:i(`scan N`,[u.DERIVED_N,u.VIS_TOTAL,0,0]),scanHistA:i(`scan hist A`,[u.DERIVED_A+2,u.SCRATCH,0,0]),scanPairs:i(`scan pairs`,[u.DERIVED_A,u.PAIR_TOTAL,0,0]),scanHistB:i(`scan hist B`,[u.DERIVED_B+2,u.SCRATCH+1,0,0]),sortA:Array.from({length:8},(e,t)=>i(`sort A ${t}`,[4*t,u.DERIVED_A,u.DERIVED_A+1,0])),sortB:Array.from({length:8},(e,t)=>i(`sort B ${t}`,[4*t,u.DERIVED_B,u.DERIVED_B+1,0]))},this.timing&&(this._querySet=e.createQuerySet({type:`timestamp`,count:2*R.length}),this._queryResolve=e.createBuffer({size:16*R.length,usage:L.QUERY_RESOLVE|L.COPY_SRC}),this._queryRead=e.createBuffer({size:16*R.length,usage:L.MAP_READ|L.COPY_DST}),this._queryBusy=!1),this}async setScene({count:e,geometry:t,sh:n,shDegree:r,shF16:i,shEncoding:a,kernelDegree:o=2,flavor:s=`native`,sortByDistance:c=!1}){this.allocateScene({count:e,shDegree:r,shEncoding:a??(i?`f16`:`f32`),kernelDegree:o,flavor:s,sortByDistance:c}),this.writeGeometry(0,t),this.writeSH(0,n),await this.finishScene()}allocateScene({count:e,shDegree:t,shEncoding:n=`f32`,kernelDegree:r=2,flavor:i=`native`,sortByDistance:a=!1}){let o=this.device;if(this._destroyScene(),r!==2)throw Error(`The tile renderer implements the degree-2 kernel of native 3DGUT`);let s=C[n];if(!s)throw Error(`Unknown SH encoding ${n}`);let c=(e,t,n=L.STORAGE)=>o.createBuffer({label:e,size:Math.max(16,t),usage:n});return this.scene={count:e,shDegree:t,shEncoding:n,kernelDegree:r,flavor:i,sortByDistance:a,geom:c(`geometry`,e*48,L.STORAGE|L.COPY_DST),sh:c(`sh`,e*s*4,L.STORAGE|L.COPY_DST),tileCount:c(`tile count`,e*4,L.STORAGE|L.COPY_SRC),visFlag:c(`visible offset`,e*4),depthKey:c(`depth key`,e*4),proj:c(`projection`,e*48),bigList:c(`big particles`,e*4),bigEmit:c(`big records`,e*4),pairsA:c(`depth pairs`,e*8),pairsA2:c(`depth pairs 2`,e*8),counts:c(`record offset`,e*4),depthRank:c(`depth rank`,e*4),rdata:c(`shading data`,e*80)},this._ready=!1,this.scene}writeGeometry(e,t){this.device.queue.writeBuffer(this.scene.geom,e,t)}writeSH(e,t){this.device.queue.writeBuffer(this.scene.sh,e,t)}async finishScene(){let e=this.device,t=this.scene;e.queue.writeBuffer(this._counters,0,new Uint32Array([t.count])),this._params.prepN=this._small(`prep N`,[u.N,t.count,u.DERIVED_N,d.N]),this._params.prepA=this._small(`prep A`,[u.VIS_TOTAL,t.count,u.DERIVED_A,d.A]);let n=+(t.flavor===`gsplat`);if(t.flavor!==`native`&&t.flavor!==`gsplat`)throw Error(`Unknown 3DGUT flavour ${t.flavor}`);let r=e.createShaderModule({code:m,label:`project`}),i=(i,a)=>e.createComputePipelineAsync({label:a,layout:`auto`,compute:{module:r,entryPoint:`main`,constants:{CAMERA_MODEL:i,KERNEL_DEGREE:t.kernelDegree,FOOTPRINT:+!!this.footprint,GUT_FLAVOR_GSPLAT:n,GUT_DISTANCE_SORT:+!!t.sortByDistance}}});this._flavorPipelines??={};let a=(t,r)=>e.createComputePipelineAsync({label:r,layout:`auto`,compute:{module:e.createShaderModule({code:t,label:r}),entryPoint:`main`,constants:{GUT_FLAVOR_GSPLAT:n}}});this._flavored=a;let o=this._flavorPipelines[`${t.flavor}/${this.kbuffer}`]??=Promise.all([a(h,`project-big`),a(b,`emit`),a(x,`emit-big`),this._rasterizePipeline(a)]),[s,c,l,f,p,[g,_,v,y],S]=await Promise.all([i(this.cameraModel,`project`),i(3,`project lens`),i(4,`project panorama`),i(5,`project fisheye-panorama`),i(6,`project lens triangle`),o,e.createComputePipelineAsync({label:`shade`,layout:`auto`,compute:{module:e.createShaderModule({code:E({encoding:t.shEncoding,degree:t.shDegree}),label:`shade`}),entryPoint:`main`}})]);this.scene===t&&(this._pipelines.project=s,this._pipelines.projectLens=c,this._pipelines.projectPano=l,this._pipelines.projectBlend=f,this._pipelines.projectTriangle=p,this._pipelines.shade=S,Object.assign(this._pipelines,{projectBig:g,emit:_,emitBig:v,rasterize:y}),this.pairCapacity=0,this._ensurePairs(Math.max(1<<22,t.count*3)),this._bindScene(),this._ready=!0)}_rasterizePipeline(e){return e(A({batch:this.batch,format:this.outputFormat,ppt:this.kbuffer?1:this.ppt,mask:this.mask,stats:this.workStats,branchless:this.branchless,kbuffer:this.kbuffer}),this.kbuffer?`rasterize k${this.kbuffer}`:`rasterize`)}async setKBuffer(e){if(e=Math.max(0,Math.min(32,Math.round(Number(e)||0))),e===this.kbuffer||(this.kbuffer=e,!this.scene||!this._flavored))return;let t=this.scene,n=await this._rasterizePipeline(this._flavored);this.scene!==t||this.kbuffer!==e||(this._pipelines.rasterize=n,this._bindTarget(),this.onNeedsRedraw?.())}updateGeometry(e){this.scene&&this.device.queue.writeBuffer(this.scene.geom,0,e)}_destroyScene(){let e=this.scene;if(e){for(let t of Object.values(e))t&&typeof t.destroy==`function`&&t.destroy();this.scene=null}}setHoldOnOverflow(e){this.holdOnOverflow=!!e,this._writeHold()}_writeHold(){if(!this._ranges)return;let e=this.device,t=Math.floor(Math.min(e.limits.maxStorageBufferBindingSize,e.limits.maxBufferSize)/8),n=(this.holdOnOverflow??!0)&&this.pairCapacity<t-1024;e.queue.writeBuffer(this._ranges,this.numTiles*8+4,new Uint32Array([+!!n]))}_ensurePairs(e){let t=this.device;if(e<=this.pairCapacity)return!1;let n=Math.floor(Math.min(t.limits.maxStorageBufferBindingSize,t.limits.maxBufferSize)/8);if(e=Math.min(n,Math.ceil(e/l)*l),e<=this.pairCapacity)return!1;for(let e of[this._recordsB,this._recordsB2,this._hist,this._blockSums])e?.destroy();this.pairCapacity=e,this._recordsB=t.createBuffer({label:`tile records`,size:e*8,usage:L.STORAGE}),this._recordsB2=t.createBuffer({label:`tile records 2`,size:e*8,usage:L.STORAGE});let r=this.scene?.count??0,i=16*Math.ceil(Math.max(r,e)/l);this._hist=t.createBuffer({label:`sort histogram`,size:i*4,usage:L.STORAGE});let a=Math.ceil(Math.max(r,i)/l)+16;return this._blockSums=t.createBuffer({label:`scan block sums`,size:a*4,usage:L.STORAGE}),this._params.prepB=this._small(`prep B`,[u.PAIR_TOTAL,e,u.DERIVED_B,d.B]),this._writeHold(),!0}_resizeTarget(e,t){if(e===this.width&&t===this.height&&this._output)return;let n=this.device;this.width=e,this.height=t,this.tileGrid=[Math.ceil(e/16),Math.ceil(t/16)],this.numTiles=this.tileGrid[0]*this.tileGrid[1];let r=Math.max(1,Math.ceil(Math.log2(this.numTiles+1)));this.tileSortPasses=2*Math.ceil(Math.ceil(r/4)/2),this._output?.destroy(),this._fadeA?.destroy(),this._fadeB?.destroy(),this._ranges?.destroy();let i=r=>n.createTexture({label:r,size:[e,t],format:this.outputFormat,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC});this._output=i(`tile output`),this._fadeA=i(`fade a`),this._fadeB=i(`fade b`),this._ranges=n.createBuffer({label:`tile ranges`,size:this.numTiles*8+16,usage:L.STORAGE|L.COPY_DST|L.COPY_SRC}),this._writeHold(),this._bindTarget()}_group(e,t){return this.device.createBindGroup({layout:e.getBindGroupLayout(0),entries:t.map((e,t)=>({binding:t,resource:e instanceof GPUTextureView?e:{buffer:e}}))})}_bindScene(){let e=this.scene,t=this._pipelines,n=this._params,r=this._counters,i=(e,n)=>({reduce:this._group(t.scanReduce,[e,r,n,this._blockSums]),blocks:this._group(t.scanBlocks,[e,r,this._blockSums]),down:this._group(t.scanDownsweep,[e,r,n,this._blockSums])}),a=(e,n,i)=>e.map((e,a)=>{let[o,s]=a%2?[i,n]:[n,i];return{count:this._group(t.sortCount,[e,r,o,this._hist]),scatter:this._group(t.sortScatter,[e,r,o,s,this._hist])}});this._groups={prepN:this._group(t.prepare,[n.prepN,r,this._args]),prepA:this._group(t.prepare,[n.prepA,r,this._args]),prepB:this._group(t.prepare,[n.prepB,r,this._args]),argsBig:this._group(t.args,[n.argsBig,r,this._args]),argsBigEmit:this._group(t.args,[n.argsBigEmit,r,this._args]),project:this._group(t.project,[this._frame,e.geom,e.tileCount,e.visFlag,e.depthKey,e.proj,r,e.bigList]),projectTriangle:this._group(t.projectTriangle,[this._frame,e.geom,e.tileCount,e.visFlag,e.depthKey,e.proj,r,e.bigList]),projectBlend:this._group(t.projectBlend,[this._frame,e.geom,e.tileCount,e.visFlag,e.depthKey,e.proj,r,e.bigList]),projectPano:this._group(t.projectPano,[this._frame,e.geom,e.tileCount,e.visFlag,e.depthKey,e.proj,r,e.bigList]),projectLens:this._group(t.projectLens,[this._frame,e.geom,e.tileCount,e.visFlag,e.depthKey,e.proj,r,e.bigList]),projectBig:this._group(t.projectBig,[r,e.bigList,e.proj,e.tileCount,e.visFlag,this._frame]),scanN:i(n.scanN,e.visFlag),compact:this._group(t.compact,[this._frame,e.tileCount,e.visFlag,e.depthKey,e.pairsA]),sortA:a(n.sortA,e.pairsA,e.pairsA2),scanHistA:i(n.scanHistA,this._hist),gather:this._group(t.gather,[r,e.pairsA,e.tileCount,e.counts,e.depthRank]),scanPairs:i(n.scanPairs,e.counts),emit:this._group(t.emit,[this._frame,r,e.tileCount,e.depthRank,e.proj,e.counts,this._recordsB,e.bigEmit]),emitBig:this._group(t.emitBig,[this._frame,r,e.bigEmit,e.depthRank,e.proj,e.counts,this._recordsB]),shade:this._group(t.shade,[this._frame,e.tileCount,e.proj,e.geom,e.sh,e.rdata]),sortB:a(n.sortB,this._recordsB,this._recordsB2),scanHistB:i(n.scanHistB,this._hist)},this._output&&this._bindTarget()}_bindTarget(){if(!this.scene||!this._groups)return;let e=this._pipelines;this._groups.ranges=this._group(e.ranges,[this._frame,this._counters,this._recordsB,this._ranges]),this._groups.rasterize=this._group(e.rasterize,[this._frame,this._ranges,this._recordsB,this.scene.rdata,this._output.createView(),...this.workStats?[this._work]:[]]);let t=t=>this._group(e.rasterize,[this._frame,this._ranges,this._recordsB,this.scene.rdata,t.createView(),...this.workStats?[this._work]:[]]);this._groups.rasterizeA=t(this._fadeA),this._groups.rasterizeB=t(this._fadeB),this._groups.fade=this._group(e.fade,[this._fadeA.createView(),this._fadeB.createView(),this._fadeWeight,this._output.createView()]),e.blit&&(this._groups.blit=this._group(e.blit,[this._output.createView(),this._background]))}fade(e,t){if(!this._groups?.fade)return;this.device.queue.writeBuffer(this._fadeWeight,0,new Float32Array([t,0,0,0]));let n=e.beginComputePass({label:`fade`});n.setPipeline(this._pipelines.fade),n.setBindGroup(0,this._groups.fade),n.dispatchWorkgroups(Math.ceil(this.width/16),Math.ceil(this.height/16)),n.end()}encode(e,t,n,r,i){if(!this.scene||!this._ready)return!1;this._resizeTarget(n,r);let a=this.device,o=this.scene,s=this._pipelines,c=this._groups,l=new ArrayBuffer(256),f=new Float32Array(l),p=new Uint32Array(l);f.set(t.worldToSensor,0),f.set(t.sensorToWorld,16),f.set(t.focal,32),f.set(t.principal,34),f[36]=n,f[37]=r,p[38]=this.tileGrid[0],p[39]=this.tileGrid[1],f.set(t.position,40),p[43]=o.count;let m=t.lensK!==void 0,h=t.panorama===!0;m&&(f[44]=t.lensK,f[45]=1,f[46]=t.imageCircle??Math.PI,f[56]=t.maxAngle),h&&(f[45]=2);let g=t.fisheyePano!==void 0;if(g){let e=t.fisheyePano;f.set([e.s,3,e.focal,e.w],44),f.set(e.ellipse,48),f[51]=e.depthByDistance===!1?0:1}let _=t.triangle;_&&(f.set([_.weights[0],4,_.weights[1],_.weights[2]],44),f.set([..._.focal,_.depthByDistance===!1?0:1],48),f.set([_.circle,n/2,r/2,0],52)),p[57]=o.shDegree,p[58]=this.pairCapacity,p[59]=this.numTiles,a.queue.writeBuffer(this._frame,0,l),a.queue.writeBuffer(this._counters,u.BIG*4,new Uint32Array([0])),a.queue.writeBuffer(this._counters,u.BIG_EMIT*4,new Uint32Array([0])),e.clearBuffer(this._ranges,0,this.numTiles*8+4),this.workStats&&e.clearBuffer(this._work);let v=(e,t,n,r)=>{r<=0||(e.setPipeline(t),e.setBindGroup(0,n),e.dispatchWorkgroups(...ae(r)))},y=(e,t,n,r)=>{e.setPipeline(t),e.setBindGroup(0,n),e.dispatchWorkgroupsIndirect(this._args,r*4)},b=(e,t,n)=>{e.setPipeline(t),e.setBindGroup(0,n),e.dispatchWorkgroups(1)},x=(e,t,n)=>{y(e,s.scanReduce,t.reduce,n),b(e,s.scanBlocks,t.blocks),y(e,s.scanDownsweep,t.down,n)},S=(e,t,n,r,i)=>{for(let a=0;a<t;a++)y(e,s.sortCount,n[a].count,i+3),x(e,r,i+6),y(e,s.sortScatter,n[a].scatter,i+3)},C=0,w=t=>{let n={label:t};return this.timing&&(n.timestampWrites={querySet:this._querySet,beginningOfPassWriteIndex:2*C,endOfPassWriteIndex:2*C+1}),C++,e.beginComputePass(n)},T=this.timing?w(`project`):e.beginComputePass({label:`tile renderer`}),E=e=>{this.timing&&(T.end(),T=w(e))},D=Math.ceil(o.count/256);b(T,s.prepare,c.prepN);let O=_?`projectTriangle`:g?`projectBlend`:h?`projectPano`:m?`projectLens`:`project`;return v(T,s[O],c[O],D),b(T,s.args,c.argsBig),y(T,s.projectBig,c.projectBig,d.BIG),E(`compact`),x(T,c.scanN,d.N+3),v(T,s.compact,c.compact,D),b(T,s.prepare,c.prepA),E(`depthSort`),S(T,8,c.sortA,c.scanHistA,d.A),E(`gather`),y(T,s.gather,c.gather,d.A),x(T,c.scanPairs,d.A+3),b(T,s.prepare,c.prepB),E(`emit`),v(T,s.emit,c.emit,D),b(T,s.args,c.argsBigEmit),y(T,s.emitBig,c.emitBig,d.BIG_EMIT),E(`shade`),v(T,s.shade,c.shade,D),E(`tileSort`),S(T,this.tileSortPasses,c.sortB,c.scanHistB,d.B),y(T,s.ranges,c.ranges,d.B),E(`rasterize`),T.setPipeline(s.rasterize),T.setBindGroup(0,i===`a`?c.rasterizeA:i===`b`?c.rasterizeB:c.rasterize),T.dispatchWorkgroups(this.tileGrid[0],this.tileGrid[1]),T.end(),this.timing&&!this._queryBusy&&(e.resolveQuerySet(this._querySet,0,2*R.length,this._queryResolve,0),e.copyBufferToBuffer(this._queryResolve,0,this._queryRead,0,16*R.length),this._queryPending=!0),this._readbackBusy||(e.copyBufferToBuffer(this._counters,0,this._readback,0,u.COUNT*4),this._readbackPending=!0),!0}present(e,t,n=[0,0,0,1]){if(!this._groups?.blit)return;this.device.queue.writeBuffer(this._background,0,new Float32Array(n));let r=e.beginRenderPass({colorAttachments:[{view:t,loadOp:`clear`,storeOp:`store`,clearValue:{r:0,g:0,b:0,a:1}}]});r.setPipeline(this._pipelines.blit),r.setBindGroup(0,this._groups.blit),r.draw(3),r.end()}async fit(e,t,n){for(let r=0;r<4;r++){let r=this.device.createCommandEncoder();this.encode(r,e,t,n),this.device.queue.submit([r.finish()]);let i=new Promise(e=>{this._fitResolve=e});if(this.afterSubmit(),await i,!this.stats.overflow)return this.stats}return this.stats}afterSubmit(){this._readbackPending&&(this._readbackPending=!1,this._readbackBusy=!0,this._readback.mapAsync(GPUMapMode.READ).then(()=>{let e=new Uint32Array(this._readback.getMappedRange().slice(0));this._readback.unmap(),this._readbackBusy=!1;let t=e[u.VIS_TOTAL],n=e[u.PAIR_TOTAL];this.stats={visible:t,pairs:n,overflow:n>this.pairCapacity,capacity:this.pairCapacity,big:e[u.BIG],bigEmit:e[u.BIG_EMIT]},n>.8*this.pairCapacity&&this.scene&&this._ensurePairs(Math.ceil(n*1.6))&&(this._bindScene(),this.onNeedsRedraw?.()),this._fitResolve?.(),this._fitResolve=null},()=>{this._readbackBusy=!1,this._fitResolve?.(),this._fitResolve=null})),this._queryPending&&(this._queryPending=!1,this._queryBusy=!0,this._queryRead.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigUint64Array(this._queryRead.getMappedRange().slice(0));this._queryRead.unmap(),this._queryBusy=!1;let t={},n=0;R.forEach((r,i)=>{let a=Number(e[2*i+1]-e[2*i])/1e6;t[r]=a,n+=a}),t.total=n,this._timings=t,this.onTimings?.(t)},()=>{this._queryBusy=!1}))}async readWork(){let e=this.device.createBuffer({size:16,usage:L.MAP_READ|L.COPY_DST}),t=this.device.createCommandEncoder();t.copyBufferToBuffer(this._work,0,e,0,16),this.device.queue.submit([t.finish()]),await e.mapAsync(GPUMapMode.READ);let[n,r,i,a]=new Uint32Array(e.getMappedRange().slice(0));return e.destroy(),{tests:n,visits:r,evals:i,hits:a}}get timings(){return this._timings}get outputTexture(){return this._output}destroy(){this._destroyScene();for(let e of[this._recordsB,this._recordsB2,this._hist,this._blockSums,this._output,this._ranges,this._frame,this._background,this._counters,this._args,this._readback,this._queryResolve,this._queryRead])e?.destroy?.();this._querySet?.destroy()}},se=`GUTB0001`,ce=16<<20,z=class{constructor(e){this.reader=e.getReader(),this.chunks=[],this.buffered=0,this.done=!1}async fill(e){for(;this.buffered<e&&!this.done;){let{value:e,done:t}=await this.reader.read();if(t){this.done=!0;break}this.chunks.push(e),this.buffered+=e.length}return this.buffered>=e}take(e){let t=new Uint8Array(e),n=0;for(;n<e;){let r=this.chunks[0],i=Math.min(r.length,e-n);t.set(r.subarray(0,i),n),n+=i,i===r.length?this.chunks.shift():this.chunks[0]=r.subarray(i)}return this.buffered-=e,t}async pipe(e,t){let n=e;for(;n>0;){if(!this.buffered&&!await this.fill(1))throw Error(`Scene file ended early`);let e=this.chunks[0],r=Math.min(e.length,n);t(e.subarray(0,r)),r===e.length?this.chunks.shift():this.chunks[0]=e.subarray(r),this.buffered-=r,n-=r}}};async function B(e,t,{keepGeometry:n=!1}={}){let r=new z(e);if(!await r.fill(12))throw Error(`Not a scene file`);let i=r.take(12);if(new TextDecoder().decode(i.subarray(0,8))!==se)throw Error(`Not a .gutb scene file`);let a=new DataView(i.buffer).getUint32(8,!0);await r.fill(a);let o=JSON.parse(new TextDecoder().decode(r.take(a))),s=t.allocate(o),c={header:o,count:o.count,geometry:null,switches:null},l=0;for(let e of o.sections){e.offset>l&&(await r.pipe(e.offset-l,()=>{}),l=e.offset);let t=e.name===`geometry`?s.geometry:e.name===`sh`?s.sh:null,i=null;(e.name===`geometry`&&n||e.name===`switches`)&&(i=new Uint8Array(e.bytes));let a=0,o=0,u=t?new Uint8Array(Math.min(ce,e.bytes)):null,d=()=>{o&&=(t(a,u.subarray(0,o)),a+=o,0)},f=0;await r.pipe(e.bytes,e=>{if(i&&(i.set(e,f),f+=e.length),!u)return;let t=0;for(;t<e.length;){let n=Math.min(u.length-o,e.length-t);u.set(e.subarray(t,t+n),o),o+=n,t+=n,o===u.length&&d()}}),d(),l+=e.bytes,e.name===`geometry`&&i&&(c.geometry=new Float32Array(i.buffer)),e.name===`switches`&&(c.switches=V(new Uint16Array(i.buffer)))}return c}function V(e){let t=new Float32Array(e.length);for(let n=0;n<e.length;n++){let r=e[n],i=r>>10&31,a=r&1023,o=r&32768?-1:1;t[n]=i===0?o*a*5.960464477539063e-8:i===31?a?NaN:o*(1/0):o*(1+a/1024)*2**(i-15)}return t}var H=new Float32Array(1),U=new Uint32Array(H.buffer);function W(e){H[0]=e;let t=U[0],n=t>>>16&32768,r=t>>>23&255,i=t&8388607;if(r===255)return n|31744|(i?512:0);let a=r-127+15;if(a>=31)return n|31744;if(a<=0){if(a<-10)return n;i|=8388608;let e=14-a,t=i>>>e,r=i&(1<<e)-1,o=1<<e-1;return n|t+(r>o||r===o&&t&1?1:0)}let o=n|a<<10|i>>>13,s=i&8191;return(s>4096||s===4096&&o&1)&&o++,o}function le(e){let t=new TextDecoder(`latin1`).decode(e),n=t.indexOf(`end_header
`);if(n<0)return null;let r=t.slice(0,n).split(`
`).map(e=>e.trim()).filter(Boolean);if(r[0]!==`ply`)throw Error(`Not a PLY file`);if(!r.some(e=>e===`format binary_little_endian 1.0`))throw Error(`Only binary little-endian PLY is supported`);let i=0,a=!1,o=[];for(let e of r){let t=e.split(/\s+/);if(t[0]===`element`){if(a=t[1]===`vertex`,a)i=Number(t[2]);else if(Number(t[2])>0)throw Error(`Unsupported PLY element ${t[1]}`)}else if(t[0]===`property`&&a){if(t[1]!==`float`&&t[1]!==`float32`)throw Error(`Unsupported PLY property type ${t[1]}`);o.push(t[2])}}return{count:i,props:o,headerBytes:n+11}}async function ue(e,{shF16:t=!1,onProgress:n}={}){let r=e.getReader(),i=new Uint8Array,a=null;for(;!a;){let{value:e,done:t}=await r.read();if(t)throw Error(`PLY ended before its header`);let n=new Uint8Array(i.length+e.length);n.set(i),n.set(e,i.length),i=n,a=le(i.subarray(0,Math.min(i.length,65536)))}let{count:o,props:s}=a,c=Object.fromEntries(s.map((e,t)=>[e,t])),l=[`x`,`y`,`z`,`opacity`,`scale_0`,`scale_1`,`scale_2`,`rot_0`,`rot_1`,`rot_2`,`rot_3`,`f_dc_0`,`f_dc_1`,`f_dc_2`];for(let e of l)if(!(e in c))throw Error(`PLY is missing property ${e}`);let u=0;for(;`f_rest_${u}`in c;)u++;let d=u/3+1,f=Math.round(Math.sqrt(d))-1;if((f+1)**2!==d||f>3)throw Error(`Unsupported SH layout with ${u} f_rest values`);let p=new Set([...l,`nx`,`ny`,`nz`,...Array.from({length:u},(e,t)=>`f_rest_${t}`)]),m=s.filter(e=>!p.has(e)),h=s.length,g=new Float32Array(12*o),_=new Uint32Array((t?24:48)*o),v=t?null:new Float32Array(_.buffer),y=Object.fromEntries(m.map(e=>[e,new Float32Array(o)])),b=m.map(e=>[c[e],y[e]]),x=c,S=[x.f_dc_0,x.f_dc_1,x.f_dc_2],C=Array.from({length:u},(e,t)=>x[`f_rest_${t}`]),w=d-1,T=new Uint16Array(48),E=0,D=4*h,O=i.subarray(a.headerBytes),k=(e,t)=>{let n=Math.min(Math.floor(e.length/D),o-E);if(n>0){let t=new Float32Array(n*h);new Uint8Array(t.buffer).set(e.subarray(0,n*D));for(let e=0;e<n;e++,E++){let n=e*h,r=12*E;g[r]=t[n+x.x],g[r+1]=t[n+x.y],g[r+2]=t[n+x.z],g[r+3]=1/(1+Math.exp(-t[n+x.opacity]));let i=t[n+x.rot_0],a=t[n+x.rot_1],o=t[n+x.rot_2],s=t[n+x.rot_3],c=1/Math.max(Math.hypot(i,a,o,s),1e-12);if(g[r+4]=i*c,g[r+5]=a*c,g[r+6]=o*c,g[r+7]=s*c,g[r+8]=Math.exp(t[n+x.scale_0]),g[r+9]=Math.exp(t[n+x.scale_1]),g[r+10]=Math.exp(t[n+x.scale_2]),v){let e=48*E;v[e]=t[n+S[0]],v[e+1]=t[n+S[1]],v[e+2]=t[n+S[2]];for(let r=1;r<d;r++)for(let i=0;i<3;i++)v[e+3*r+i]=t[n+C[i*w+r-1]]}else{T.fill(0);for(let e=0;e<3;e++)T[e]=W(t[n+S[e]]);for(let e=1;e<d;e++)for(let r=0;r<3;r++)T[3*e+r]=W(t[n+C[r*w+e-1]]);let e=24*E;for(let t=0;t<24;t++)_[e+t]=T[2*t]|T[2*t+1]<<16}for(let[e,r]of b)r[E]=t[n+e]}}let r=e.subarray(n*D);if(t&&E<o)throw Error(`PLY ended after ${E} of ${o} particles`);return r};for(O=k(O,!1),n?.(E,o);;){let{value:e,done:t}=await r.read();if(t)break;let i=new Uint8Array(O.length+e.length);i.set(O),i.set(e,O.length),O=k(i,!1),n?.(E,o)}return k(O,!0),{count:o,geometry:g,sh:_,shDegree:f,shF16:t,extra:y}}var G=Math.PI/180,de=class{constructor(){this.position=[0,0,0],this.rotation=[0,0,0,1],this.version=0}setPosition(e,t,n){this.position=[e,t,n],this.version++}setRotation(e,t,n,r){this.rotation=[e,t,n,r],this.version++}};function K(e){let t=K.ctx??=new OffscreenCanvas(1,1).getContext(`2d`);t.fillStyle=`#000`,t.fillStyle=e,t.fillRect(0,0,1,1);let[n,r,i]=t.getImageData(0,0,1,1).data;return[n/255,r/255,i/255,1]}function fe(e){return(e?.vendor??``).toLowerCase().includes(`apple`)?{ppt:4,batch:32}:{ppt:1,batch:128}}var q=90*Math.PI/180,J=.8,pe=3,Y=130*Math.PI/180,me=.46,X=.82,he=(e,t)=>Math.min(me,X*e/Math.max(1,t)),Z=.25;function Q(e,t){let n=e?.renderer??t.renderer??`3dgut`;return/gsplat/.test(n)?`gsplat`:`native`}function $(e,t){return(e?.globalZOrder??t?.config?.global_z_order)===!1}var ge=class{constructor(e,t={}){this.canvas=e,this.options=t,this.lens={mode:`pinhole`,fovDeg:70,fisheye:0},this._subjectDistance=2.5,this.kernelDegree=2,this.splatCount=0,this._background=[.04,.05,.07,1],this._visible=!0,this._qualityScale=1,this._loadGeneration=0,this._inflight=0,this._dirty=!0,this._camera=new de,this._lastCameraVersion=-1,this.continuous=t.continuousRender===!0,this.maxInflight=t.maxInflight??2}async init(){let{adapter:e,device:t}=await ie();if(this._disposed)throw t.destroy(),Error(`Viewer disposed during initialization`);this.adapter=e,this.device=t,t.lost.then(e=>{this._disposed||this.onError?.(Error(`GPU device lost: ${e.message}`))}),this.context=this.canvas.getContext(`webgpu`),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:t,format:this.format,alphaMode:`opaque`});let n={...fe(e.info),...this.options.layout??{}};this.renderer=new oe(t,{canvasFormat:this.format,timing:this.options.timing===!0,...n,kbuffer:this.options.perRayK??0}),this.renderer.onNeedsRedraw=()=>this._invalidate(),this.renderer.setHoldOnOverflow?.(this.options.holdOnOverflow??!0),await this.renderer.init(),this.controller=new s(this.canvas,this._camera,()=>this._invalidate()),this.canvas.tabIndex<0&&(this.canvas.tabIndex=0),this._observer=new ResizeObserver(()=>this._resize()),this._observer.observe(this.canvas),this._resize();let r=performance.now(),i=r;this._frames=0;let a=e=>{if(this._disposed)return;this._raf=requestAnimationFrame(a);let t=Math.min((e-i)/1e3,.1);i=e,this.onBeforeFrame?.(t,e),this.controller.update?.(t),this.onAfterControls?.(t,e),this._camera.version!==this._lastCameraVersion&&(this._lastCameraVersion=this._camera.version,this._dirty=!0),this._pump(),this.onCameraUpdate?.(),this._present(),e-r>=500&&(this.onStats?.({fps:Math.round(this._frames*1e3/(e-r)),idle:this._frames===0,splats:this.splatCount,width:this.canvas.width,height:this.canvas.height}),this._frames=0,r=e)};return this._raf=requestAnimationFrame(a),this}async loadScene(e,t){if(this._disposed)throw Error(`Viewer has been disposed`);if((t?.kernelDegree??2)!==2)throw Error(`This renderer implements the degree-2 3DGUT kernel`);let n=++this._loadGeneration;this._abort?.abort();let r=new AbortController;this._abort=r,this._switchData=null,this._stateKey=null,this._rays=void 0,this.splatCount=0;let i=await fetch(e,{signal:r.signal});if(!i.ok)throw Error(`Model request failed (${i.status})`);let a=Number(i.headers.get(`content-length`))||t?.base?.bytes||0,o=0,s=0,c=i.body.pipeThrough(new TransformStream({transform:(e,t)=>{o+=e.byteLength;let r=performance.now();n===this._loadGeneration&&(r-s>150||o===a)&&(this.onLoadProgress?.({loaded:o,total:a}),s=r),t.enqueue(e)}})),l=(t?.base?.filename??e.split(/[?#]/)[0].split(`/`).at(-1)).toLowerCase(),u=/\.gz$/.test(l)||/\.gz(?:[?#]|$)/i.test(e)?c.pipeThrough(new DecompressionStream(`gzip`)):c,d=t?.switchMode===`probabilities`,f=this.renderer,p,m,h;if(/\.gutb(\.gz)?$/.test(l)||/\.gutb/.test(e)){let e=await B(u,{allocate:e=>{if(n!==this._loadGeneration)throw Error(`superseded`);return f.allocateScene({count:e.count,shDegree:e.shDegree,shEncoding:e.shEncoding===`dc-f16/rest-i8`?`u8`:e.shEncoding,kernelDegree:e.kernelDegree??2,flavor:Q(t,e),sortByDistance:this._sortByDistance=$(t,e)}),{geometry:(e,t)=>f.writeGeometry(e,t),sh:(e,t)=>f.writeSH(e,t)}}},{keepGeometry:d});if(h=e.count,p=e.geometry,m=e.switches,d&&e.header.switchCount!==1+2*t.switches.length)throw Error(`Model is missing learned switch probabilities`)}else if(/\.ply$/.test(l.replace(/\.gz$/,``))){let e=await ue(u,{shF16:!0});if(n!==this._loadGeneration)return null;h=e.count,p=e.geometry;let r=1+2*(t?.switches?.length??0);if(d){m=new Float32Array(h*r);for(let t=0;t<r;t++){let n=e.extra[`switch_${t}`];if(!n)throw Error(`Model is missing learned switch probabilities`);for(let e=0;e<h;e++)m[e*r+t]=n[e]}}await f.setScene({...e,shEncoding:`f16`,flavor:Q(t,{}),sortByDistance:$(t,{})})}else throw Error(`Unsupported scene file ${l}`);if(n!==this._loadGeneration||this._disposed||(f._ready||await f.finishScene(),n!==this._loadGeneration||this._disposed))return null;this.kernelDegree=2,this.splatCount=h,d&&(this._switchData={slots:t.switches,probabilities:m,k:1+2*t.switches.length,density:Float32Array.from({length:h},(e,t)=>p[12*t+3]),geometry:p},this.setStates({},{}));let g=t?.camera??{},_=t?.training?.maskAngleDeg;this._maskAngle=_?_*G:void 0,this.controller.configure?.(g);let v=g.up??[0,-1,0],y=e=>({x:e[0],y:e[1],z:e[2]});Array.isArray(g.position)&&Array.isArray(g.target)?this.controller.frameFromPose(y(g.target),y(g.position),y(v)):this.controller.frame({x:0,y:0,z:0},2,y(v)),this.controller.remember();let b=this._size();return await f.fit(this._sensorCamera(b),b.width,b.height),this._invalidate(),{count:h}}async prepareLenses(e){if(!this.renderer?.fit)return;let t=this._size(),n=this.lens;for(let r of e){this.lens={...n,...r};let e=this._sensorCamera(t);this.lens=n,await this.renderer.fit(e,t.width,t.height)}this._invalidate()}get seesBehind(){return!!this._sortByDistance}_followPlanetPitch(e,t){let n=this.controller;if(!n?.setPitch||t===e)return;let r=-(Math.PI/2-.001);if(t>e){this._planetIn??={pitch:n.pitch(),from:e},this._planetOut=null;let i=(t-this._planetIn.from)/Math.max(1e-6,1-this._planetIn.from);n.setPitch(this._planetIn.pitch+(r-this._planetIn.pitch)*Math.min(1,i))}else this._planetOut??={pitch:n.pitch(),from:e},this._planetIn=null,n.setPitch(this._planetOut.pitch*t/Math.max(1e-6,this._planetOut.from));t>=1&&(this._planetIn=null),t<=0&&(this._planetOut=null)}setLens(e){e.fisheye!==void 0&&(e={...e,fisheye:Math.min(2,Math.max(0,Number(e.fisheye)||0))});let t=Number(this.lens.planet)||0;Object.assign(this.lens,e),e.planet!==void 0&&this._followPlanetPitch(t,Math.min(1,Math.max(0,Number(e.planet)||0))),this.controller.verticalFov=this.lens.fovDeg,e.planet!==void 0&&t!==this.lens.planet&&this.onBeforeFrame?.(0,performance.now()),this._invalidate()}async setSortPerRay(e){this._perRayK=e,await this.renderer?.setKBuffer(e),this._invalidate()}setFootprint(){}setPerformanceMode(){}get performanceMode(){return!1}setBackground(e){this._background=K(e),this._invalidate()}setQuality(e){this._qualityScale=Math.max(.3,Math.min(1,e)),this._resize()}setVisible(e){this._visible=!!e,this._invalidate()}setStates(e={},t={}){if(!this._switchData){this.setVisible(t.A!==!1);return}let{slots:n,probabilities:r,k:i,density:a,geometry:o}=this._switchData,s=[t.A!==!1];for(let r of n)for(let n=0;n<2;n++)s.push(t[`${r.id}:${n}`]??n===(e[r.id]??r.defaultState??0));let c=s.map(Number).join(``);if(c===this._stateKey)return;this._stateKey=c;let l=s.flatMap((e,t)=>e?[t]:[]),u=0;for(let e=0;e<a.length;e++){let t=0;for(let n of l)t+=r[e*i+n];let n=a[e]*t;o[12*e+3]=n,n>1/255&&u++}this.renderer.updateGeometry(o),this.splatCount=u,this._visible=l.length>0,this._invalidate()}cameraPose(){let[e,t,n,r]=this._camera.rotation;return{position:this._camera.position.slice(),wxyz:[-e,r,n,-t]}}setCameraPose(e,t,{exact:n=!1,keepInput:r=!1}={}){this.controller.setPose?.(e,t,{keepInput:r});let i=Math.min(1,Math.max(0,Number(this.lens.planet)||0));if(!n&&i>0&&this.controller.setPitch){let e=this.controller.pitch();this.controller.setPitch(e+(-(Math.PI/2-.001)-e)*i)}}resetView(){this.controller.restore()}levelView(){this.controller.level()}adjustRoll(e){return this.controller.roll?.(e)??0}project(e){let t=this.canvas.getBoundingClientRect(),{camera:n,width:r,height:i}=this._viewCamera(),a=n.worldToSensor,[o,s,c]=e,l=a[0]*o+a[4]*s+a[8]*c+a[12],u=a[1]*o+a[5]*s+a[9]*c+a[13],d=a[2]*o+a[6]*s+a[10]*c+a[14],f=Math.hypot(l,u,d);if(!(f>1e-6))return{x:0,y:0,visible:!1,distance:f};let p=Math.atan2(l,d),m=Math.asin(Math.max(-1,Math.min(1,u/f))),h,g,_;if(n.triangle){let{weights:e,focal:t}=n.triangle,r=Math.acos(Math.max(-1,Math.min(1,d/f))),i=Math.hypot(l,u),a=i>1e-9?l/i*r:0,o=i>1e-9?u/i*r:0,s=Math.max(d/f,.05);h=e[0]*t[0]*l/f/s+e[1]*t[1]*a+e[2]*t[2]*p,g=e[0]*t[0]*u/f/s+e[1]*t[1]*o+e[2]*t[2]*m,_=e[0]===0||d>0}else if(n.panorama)h=n.focal[0]*p,g=n.focal[1]*m,_=!0;else if(n.fisheyePano){let{s:e,w:t,focal:r,ellipse:i}=n.fisheyePano,a=p/e,o=Math.acos(Math.max(-1,Math.min(1,Math.cos(m)*Math.cos(a)))),s=o<1e-4?1:o/Math.sin(o);h=r*((1-t)*e*Math.cos(m)*Math.sin(a)*s+t*p),g=r*((1-t)*Math.sin(m)*s+t*m),_=(h/i[0])**2+(g/i[1])**2<=1}else if(n.lensK!==void 0){let e=n.lensK,t=Math.acos(Math.max(-1,Math.min(1,d/f))),r=Math.hypot(l,u),i=e<1e-4?t:Math.tan(e*t)/e;_=t<n.maxAngle&&t<=n.imageCircle&&i>0,h=r>1e-9?n.focal[0]*i*l/r:0,g=r>1e-9?n.focal[1]*i*u/r:0}else _=d>.001,h=n.focal[0]*l/d,g=n.focal[1]*u/d;let v=(n.principal[0]+h)*t.width/r,y=(n.principal[1]+g)*t.height/i,b=.06,x=v>=-b*t.width&&v<=(1+b)*t.width&&y>=-b*t.height&&y<=(1+b)*t.height;return{x:v,y,visible:_&&x&&Number.isFinite(v+y),distance:f}}get viewVersion(){return this._viewVersion??0}_viewCamera(){if(this._drawnCamera)return this._drawnCamera;let e=this.canvas.width,t=this.canvas.height;return{camera:this._sensorCamera({width:e,height:t}),width:e,height:t}}partAnchor(e,t){let n=this._partAnchors()?.[e]?.[t];if(!n)return;let r=this._viewCamera().camera.position,i=n.centre,a=[r[0]-i[0],r[1]-i[1],r[2]-i[2]],o=Math.hypot(...a)||1,s=a.map((e,t)=>i[t]+e/o*.5*n.radius),c=n.samples[0],l=1/0;for(let e of n.samples){let t=(e[0]-s[0])**2+(e[1]-s[1])**2+(e[2]-s[2])**2;t<l&&(l=t,c=e)}return c}_partAnchors(){let e=this._switchData;if(!e)return null;if(e.anchors)return e.anchors;let{probabilities:t,k:n,density:r,geometry:i}=e,a=r.length,o=(n-1)/2,s=Array.from({length:n},()=>[]),c=e.slotOf=new Uint8Array(a);for(let e=0;e<a;e++){let i=0,a=t[e*n];for(let r=1;r<n;r++){let o=t[e*n+r];o>a&&(a=o,i=r)}c[e]=i+1>>1,i&&a>=.5&&r[e]>=.3&&s[i].push(e)}let l=(e,a)=>{if(e.length<8)return null;let o=e=>r[e]*t[e*n+a],s=e=>{let t=0,n=0,r=0,a=0;for(let s of e){let e=o(s);t+=e*i[12*s],n+=e*i[12*s+1],r+=e*i[12*s+2],a+=e}return{c:[t/a,n/a,r/a],mass:a}},c=(e,t)=>Math.hypot(i[12*e]-t[0],i[12*e+1]-t[1],i[12*e+2]-t[2]),l=s(e),u=e.map(e=>[c(e,l.c),e]).sort((e,t)=>e[0]-t[0]),d=0,f=u.at(-1)[0];for(let[e,t]of u)if(d+=o(t),d>=l.mass/2){f=e;break}let p=u.filter(([e])=>e<=pe*f).map(([,e])=>e),{c:m,mass:h}=s(p),g=p.map(e=>[c(e,m),e]).sort((e,t)=>e[0]-t[0]),_=g[Math.floor(.6*(g.length-1))][0],v=Math.max(1,Math.floor(p.length/600)),y=[];for(let e=0;e<p.length;e+=v)y.push([i[12*p[e]],i[12*p[e]+1],i[12*p[e]+2]]);return{centre:m,radius:_,samples:y,mass:h}};e.anchors=[];for(let t=0;t<o;t++){let n=[l(s[1+2*t],1+2*t),l(s[2+2*t],2+2*t)],r=n.map(e=>e?.mass??0);e.anchors[t]=n.map((e,t)=>(e&&r[t]>=.1*r[1-t]?e:n[1-t])??void 0)}return e.anchors}clearance(e,t=-1,n=.03){let r=this._rayIndex();if(!r)return 1;let{lo:i,h:a,dims:o,start:s,items:c,stamp:l}=r,{geometry:u,slotOf:d}=this._switchData,f=this._viewCamera().camera.position,p=[e[0]-f[0],e[1]-f[1],e[2]-f[2]],m=Math.hypot(...p);if(!(m>1e-6))return 1;for(let e=0;e<3;e++)p[e]/=m;let h=m-n,g=t+1,_=r.ray=r.ray+1>>>0,v=0,y=-1;for(let e=0;e<h;e+=a/2){let t=Math.floor((f[0]+p[0]*e-i[0])/a),n=Math.floor((f[1]+p[1]*e-i[1])/a),r=Math.floor((f[2]+p[2]*e-i[2])/a);if(t<0||n<0||r<0||t>=o[0]||n>=o[1]||r>=o[2])continue;let m=(r*o[1]+n)*o[0]+t;if(m!==y){y=m;for(let e=s[m],t=s[m+1];e<t;e++){let t=c[e];if(l[t]===_)continue;l[t]=_;let n=u[12*t+3];if(n<1/255||g&&d[t]===g)continue;let r=[f[0]-u[12*t],f[1]-u[12*t+1],f[2]-u[12*t+2]],i=-(r[0]*p[0]+r[1]*p[1]+r[2]*p[2]);if(i<=0||i>=h)continue;let a=3.33*Math.max(u[12*t+8],u[12*t+9],u[12*t+10]);if(r[0]*r[0]+r[1]*r[1]+r[2]*r[2]-i*i>a*a)continue;let o=u[12*t+4],s=u[12*t+5],m=u[12*t+6],y=u[12*t+7],b=Math.hypot(o,s,m,y)||1;o/=b,s/=b,m/=b,y/=b;let x=[[1-2*(m*m+y*y),2*(s*m+o*y),2*(s*y-o*m)],[2*(s*m-o*y),1-2*(s*s+y*y),2*(m*y+o*s)],[2*(s*y+o*m),2*(m*y-o*s),1-2*(s*s+m*m)]],S=0,C=0,w=0;for(let e=0;e<3;e++){let n=1/u[12*t+8+e],i=x[e],a=n*(r[0]*i[0]+r[1]*i[1]+r[2]*i[2]),o=n*(p[0]*i[0]+p[1]*i[1]+p[2]*i[2]);S+=a*a,C+=a*o,w+=o*o}let T=Math.min(.99,n*Math.exp(-.5*(S-C*C/w)));if(!(T<=1/255)&&(v+=Math.log(1-T),v<-5))return Math.exp(v)}}}return Math.exp(v)}_rayIndex(){if(this._rays!==void 0)return this._rays;let e=this._switchData;if(!e)return null;this._partAnchors();let{density:t,geometry:n}=e,r=t.length,i=[[],[],[]];for(let e=0;e<r;e+=5)if(t[e]>.3)for(let t=0;t<3;t++)i[t].push(n[12*e+t]);if(i[0].length<100)return this._rays=null;let a=[],o=[];for(let e=0;e<3;e++){let t=i[e].sort((e,t)=>e-t),n=t[Math.floor(.01*t.length)],r=t[Math.floor(.99*t.length)],s=.05*(r-n);a.push(n-s),o.push(r+s)}let s=Math.max(o[0]-a[0],o[1]-a[1],o[2]-a[2])/128,c=[0,1,2].map(e=>Math.max(1,Math.ceil((o[e]-a[e])/s))),l=c[0]*c[1]*c[2],u=(e,t)=>{let r=Math.min(1.5*s,2*Math.max(n[12*e+8],n[12*e+9],n[12*e+10])),i=[0,1,2].map(t=>[Math.max(0,Math.floor((n[12*e+t]-r-a[t])/s)),Math.min(c[t]-1,Math.floor((n[12*e+t]+r-a[t])/s))]);for(let e=i[2][0];e<=i[2][1];e++)for(let n=i[1][0];n<=i[1][1];n++)for(let r=i[0][0];r<=i[0][1];r++)t((e*c[1]+n)*c[0]+r)},d=new Uint32Array(l+1);for(let e=0;e<r;e++)t[e]>=1/255&&u(e,e=>{d[e+1]++});for(let e=0;e<l;e++)d[e+1]+=d[e];let f=d.slice(0,l),p=new Uint32Array(d[l]);for(let e=0;e<r;e++)t[e]>=1/255&&u(e,t=>{p[f[t]++]=e});return this._rays={lo:a,h:s,dims:c,start:d,items:p,stamp:new Uint32Array(r),ray:0}}setWalkMode(e){this.controller.setWalkMode?.(e)}_invalidate(){this._dirty=!0}_pump(){this._disposed||!(this._dirty||this.continuous)||this._inflight>=this.maxInflight||this._draw()&&this._frames++}_size(){let e=this.canvas.getBoundingClientRect(),t=Math.min(window.devicePixelRatio||1,1.5)*this._qualityScale,n=this.options.maxPixels??1920*1080,r=Math.max(1,e.width*t)*Math.max(1,e.height*t);r>n&&(t*=Math.sqrt(n/r));let i=this.options.maxWidth??1600;e.width*t>i&&(t=i/Math.max(1,e.width));let a=this.options.framebuffer;return a?{width:a[0],height:a[1]}:{width:Math.max(64,Math.round(e.width*t)),height:Math.max(64,Math.round(e.height*t))}}_resize(){let{width:e,height:t}=this._size();(this.canvas.width!==e||this.canvas.height!==t)&&(this.canvas.width=e,this.canvas.height=t),this._invalidate()}_sensorCamera({width:e,height:t}){let[n,r,i,a]=this._camera.rotation,o=[1-2*(r*r+i*i),2*(n*r+i*a),2*(n*i-r*a)],s=[2*(n*r-i*a),1-2*(n*n+i*i),2*(r*i+n*a)],c=[2*(n*i+r*a),2*(r*i-n*a),1-2*(n*n+r*r)],l=this.lens.panorama?2:this.lens.fisheye,u=l>1||this.lens.triangle?0:Math.min(1,Math.max(0,Number(this.lens.planet)||0)),d=c,f=this._camera.position,p=new Float32Array([o[0],o[1],o[2],0,-s[0],-s[1],-s[2],0,-c[0],-c[1],-c[2],0,f[0],f[1],f[2],1]),m=new Float32Array(16),h=[o,s.map(e=>-e),c.map(e=>-e)];for(let e=0;e<3;e++){for(let t=0;t<3;t++)m[t*4+e]=h[e][t];m[12+e]=-(h[e][0]*f[0]+h[e][1]*f[1]+h[e][2]*f[2])}m[15]=1;let g=Math.min(Math.max(this.lens.fovDeg,1),178)*G,_=this.options.fovAxis===`vertical`,v=(_?t:e)/2,y=v/Math.tan(g/2);if(this.lens.triangle)return this._triangleCamera({width:e,height:t,w2s:m,s2w:p,p:f,back:c,axes:h,focal:y,vertical:_});if(!(l>0)&&!(u>0))return{worldToSensor:m,sensorToWorld:p,position:f,focal:[y,y],principal:[e/2,t/2]};let b=this._maskAngle??q,x=J*Math.min(e,t)/2/b,S=Math.min(e,2*t)/(2*Math.PI),C=(e,t)=>{let n=this._subjectDistance*(1-e/y)*t,r=[f[0]-d[0]*n,f[1]-d[1]*n,f[2]-d[2]*n];for(let e=0;e<3;e++)m[12+e]=-(h[e][0]*r[0]+h[e][1]*r[1]+h[e][2]*r[2]);return p[12]=r[0],p[13]=r[1],p[14]=r[2],r},w=[e/2,t/2];if(l>=2)return{worldToSensor:m,sensorToWorld:p,position:f,focal:[S,S],principal:w,panorama:!0};if(l>1){let e=l-1,t=C(x,1-e),n=e=>e*e*(3-2*e),r=e=>Math.min(1,Math.max(0,e)),i=x+e*(S-x),a=x*b,o=n(e),s=n(r((e-.4)/.6)),c=this.lens.blend!==`staged`,u={s:1+n(c?e:r(e/.5)),w:n(c?e:r((e-.5)/.5)),focal:i,ellipse:[a+o*(Math.SQRT2*Math.PI*S-a),a+s*(Math.SQRT2*Math.PI/2*S-a)]};return this.lens.noBorder&&(u.ellipse=[1e6,1e6]),u.fade=this.lens.noFade||this._sortByDistance?1:n(r(e/Z)),{worldToSensor:m,sensorToWorld:p,position:t,focal:[1,1],principal:w,fisheyePano:u}}let T=Math.min(1,l),E=Math.min(1,Math.max(0,Number(this.lens.orb)||0)),D=2*Math.atan(Math.tan(Y/2)/he(e,t)),O=Math.min(150,Math.max(70,60+this.lens.fovDeg/2))*G*(1-E)+D*E,k=1-T+(.5-(1-T))*u,A=(_?t:e)/2/x,j=g/2+T*(A-g/2)+u*(O-(g/2+T*(A-g/2))),M=k<1e-4?v/j:v*k/Math.tan(k*j);return{worldToSensor:m,sensorToWorld:p,position:C(M,u>0?T*(1-u):1),focal:[M,M],principal:w,lensK:k,imageCircle:b+(Math.PI+(Y-Math.PI)*E-b)*u,maxAngle:Math.min(Math.PI,k<1e-4?Math.PI:.999*Math.PI/(2*k))}}_triangleCamera({width:e,height:t,w2s:n,s2w:r,p:i,back:a,axes:o,focal:s}){let c=this.lens.triangle.map(e=>Math.max(0,Number(e)||0)),l=c.reduce((e,t)=>e+t,0)||1,u=c.map(e=>e/l),d=this._maskAngle??q,f=J*Math.min(e,t)/2/d,p=Math.min(e,2*t)/(2*Math.PI),m=this._subjectDistance*(1-f/s)*u[1],h=[i[0]-a[0]*m,i[1]-a[1]*m,i[2]-a[2]*m];for(let e=0;e<3;e++)n[12+e]=-(o[e][0]*h[0]+o[e][1]*h[1]+o[e][2]*h[2]);return r[12]=h[0],r[13]=h[1],r[14]=h[2],{worldToSensor:n,sensorToWorld:r,position:h,focal:[1,1],principal:[e/2,t/2],triangle:{weights:u,focal:[s,f,p],circle:f*d,fade:this._sortByDistance?1:(e=>e*e*(3-2*e))(Math.min(1,u[2]/Z))}}}_draw(){let e=this.canvas.width,t=this.canvas.height,n=this.device.createCommandEncoder(),r=this._sensorCamera({width:e,height:t});this._drawnCamera={camera:r,width:e,height:t},this._viewVersion=(this._viewVersion??0)+1;let i,a=r.fisheyePano?.fade??r.triangle?.fade;if(this._visible&&a!==void 0&&a<1){let o=this.device.createCommandEncoder(),s=r.triangle?{...r,triangle:{...r.triangle,depthByDistance:!1}}:{...r,fisheyePano:{...r.fisheyePano,depthByDistance:!1}};i=this.renderer.encode(o,s,e,t,`a`),this.device.queue.submit([o.finish()]),this.renderer.encode(n,r,e,t,`b`),this.renderer.fade(n,a)}else i=this._visible&&this.renderer.encode(n,r,e,t);return this.device.queue.submit([n.finish()]),i&&this.renderer.afterSubmit(),this._drawn=i,this._needsPresent=!0,this._dirty=!1,this._inflight++,this.device.queue.onSubmittedWorkDone().then(()=>{this._inflight--,this._pump()}),!0}_present(){if(!this._needsPresent)return;this._needsPresent=!1;let e=this.device.createCommandEncoder(),t=this.context.getCurrentTexture().createView();if(this._drawn)this.renderer.present(e,t,this._background);else{let[n,r,i]=this._background;e.beginRenderPass({colorAttachments:[{view:t,loadOp:`clear`,storeOp:`store`,clearValue:{r:n,g:r,b:i,a:1}}]}).end()}this.device.queue.submit([e.finish()])}async snapshot(){let e=this.renderer.outputTexture;if(!e)return null;let{width:t,height:n}=e,r=this.renderer.outputFormat===`rgba32float`?16:8,i=Math.ceil(t*r/256)*256,a=this.device.createBuffer({size:i*n,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),o=this.device.createCommandEncoder();o.copyTextureToBuffer({texture:e},{buffer:a,bytesPerRow:i},[t,n]),this.device.queue.submit([o.finish()]),await a.mapAsync(GPUMapMode.READ);let s=a.getMappedRange(),c=new Uint8ClampedArray(t*n*4),l=e=>{let t=e>>10&31,n=e&1023,r=e&32768?-1:1;return t===0?r*n*2**-24:t===31?n?NaN:r*(1/0):r*(1+n/1024)*2**(t-15)},u=this._background;for(let e=0;e<n;e++){let n=r===16?new Float32Array(s,e*i,t*4):new Uint16Array(s,e*i,t*4);for(let i=0;i<t;i++){let a=r===16?[n[4*i],n[4*i+1],n[4*i+2],n[4*i+3]]:[l(n[4*i]),l(n[4*i+1]),l(n[4*i+2]),l(n[4*i+3])],o=4*(e*t+i);for(let e=0;e<3;e++)c[o+e]=255*(a[e]+(1-a[3])*u[e])+.5;c[o+3]=255}}a.unmap(),a.destroy();let d=new OffscreenCanvas(t,n);return d.getContext(`2d`).putImageData(new ImageData(c,t,n),0,0),d.convertToBlob({type:`image/png`})}dispose(){this._disposed||(this._disposed=!0,++this._loadGeneration,this._abort?.abort(),cancelAnimationFrame(this._raf),this._observer?.disconnect(),this.controller?.dispose(),this.renderer?.destroy(),this.device?.destroy())}};export{ge as GutTileViewer};