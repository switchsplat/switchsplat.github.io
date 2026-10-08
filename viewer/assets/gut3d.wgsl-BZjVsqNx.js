var e=1e3,t=1001,n=1002,r=1006,i=1008,a=1009,o=1023,s=2300,c=2301,l=2302,u=2303,d=2400,f=2401,p=2402,m=`srgb`,h=`srgb-linear`,g=`linear`,_=`srgb`,v=2e3;function y(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function b(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}var x={},S=null;function C(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function w(...e){e=C(e);let t=`THREE.`+e.shift();if(S)S(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function T(...e){e=C(e);let t=`THREE.`+e.shift();if(S)S(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function E(...e){let t=e.join(` `);t in x||(x[t]=!0,w(...e))}var D=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},O=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),k=1234567,A=Math.PI/180,j=180/Math.PI;function M(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(O[e&255]+O[e>>8&255]+O[e>>16&255]+O[e>>24&255]+`-`+O[t&255]+O[t>>8&255]+`-`+O[t>>16&15|64]+O[t>>24&255]+`-`+O[n&63|128]+O[n>>8&255]+`-`+O[n>>16&255]+O[n>>24&255]+O[r&255]+O[r>>8&255]+O[r>>16&255]+O[r>>24&255]).toLowerCase()}function N(e,t,n){return Math.max(t,Math.min(n,e))}function ee(e,t){return(e%t+t)%t}function te(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ne(e,t,n){return e===t?0:(n-e)/(t-e)}function re(e,t,n){return(1-n)*e+n*t}function ie(e,t,n,r){return re(e,t,1-Math.exp(-n*r))}function ae(e,t=1){return t-Math.abs(ee(e,t*2)-t)}function oe(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function se(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function ce(e,t){return e+Math.floor(Math.random()*(t-e+1))}function le(e,t){return e+Math.random()*(t-e)}function ue(e){return e*(.5-Math.random())}function de(e){e!==void 0&&(k=e);let t=k+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fe(e){return e*A}function pe(e){return e*j}function me(e){return(e&e-1)==0&&e!==0}function he(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function ge(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function _e(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:w(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function ve(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ye(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var be={DEG2RAD:A,RAD2DEG:j,generateUUID:M,clamp:N,euclideanModulo:ee,mapLinear:te,inverseLerp:ne,lerp:re,damp:ie,pingpong:ae,smoothstep:oe,smootherstep:se,randInt:ce,randFloat:le,randFloatSpread:ue,seededRandom:de,degToRad:fe,radToDeg:pe,isPowerOfTwo:me,ceilPowerOfTwo:he,floorPowerOfTwo:ge,setQuaternionFromProperEuler:_e,normalize:ye,denormalize:ve},P=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=N(this.x,e.x,t.x),this.y=N(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=N(this.x,e,t),this.y=N(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(N(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(N(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},F=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:w(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(N(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Se.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Se.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=N(this.x,e.x,t.x),this.y=N(this.y,e.y,t.y),this.z=N(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=N(this.x,e,t),this.y=N(this.y,e,t),this.z=N(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(N(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xe.copy(this).projectOnVector(e),this.sub(xe)}reflect(e){return this.sub(xe.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(N(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xe=new I,Se=new F,Ce=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return E(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(we.makeScale(e,t)),this}rotate(e){return E(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(we.makeRotation(-e)),this}translate(e,t){return E(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(we.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},we=new Ce,Te=new Ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ee=new Ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function De(){let e={enabled:!0,workingColorSpace:h,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=R(e.r),e.g=R(e.g),e.b=R(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Oe(e.r),e.g=Oe(e.g),e.b=Oe(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?g:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return E(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return E(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[h]:{primaries:t,whitePoint:r,transfer:g,toXYZ:Te,fromXYZ:Ee,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:m},outputColorSpaceConfig:{drawingBufferColorSpace:m}},[m]:{primaries:t,whitePoint:r,transfer:_,toXYZ:Te,fromXYZ:Ee,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:m}}}),e}var L=De();function R(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Oe(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var ke,Ae=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ke===void 0&&(ke=b(`canvas`)),ke.width=e.width,ke.height=e.height;let t=ke.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=ke}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=b(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=R(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(R(t[e]/255)*255):t[e]=R(t[e]);return{data:t,width:e.width,height:e.height}}else return w(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},je=0,Me=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,`id`,{value:je++}),this.uuid=M(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ne(r[t].image)):e.push(Ne(r[t]))}else e=Ne(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ne(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Ae.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(w(`Texture: Unable to serialize Texture.`),{})}var Pe=0,Fe=new I,Ie=class s extends D{constructor(e=s.DEFAULT_IMAGE,n=s.DEFAULT_MAPPING,c=t,l=t,u=r,d=i,f=o,p=a,m=s.DEFAULT_ANISOTROPY,h=``){super(),this.isTexture=!0,Object.defineProperty(this,`id`,{value:Pe++}),this.uuid=M(),this.name=``,this.source=new Me(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=c,this.wrapT=l,this.magFilter=u,this.minFilter=d,this.anisotropy=m,this.format=f,this.internalFormat=null,this.type=p,this.offset=new P(0,0),this.repeat=new P(1,1),this.center=new P(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fe).x}get height(){return this.source.getSize(Fe).y}get depth(){return this.source.getSize(Fe).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){w(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){w(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x);break}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y);break}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ie.DEFAULT_IMAGE=null,Ie.DEFAULT_MAPPING=300,Ie.DEFAULT_ANISOTROPY=1,class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=N(this.x,e.x,t.x),this.y=N(this.y,e.y,t.y),this.z=N(this.z,e.z,t.z),this.w=N(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=N(this.x,e,t),this.y=N(this.y,e,t),this.z=N(this.z,e,t),this.w=N(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(N(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var z=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Le.setFromMatrixColumn(e,0).length(),i=1/Le.setFromMatrixColumn(e,1).length(),a=1/Le.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Re,e,ze)}lookAt(e,t,n){let r=this.elements;return H.subVectors(e,t),H.lengthSq()===0&&(H.z=1),H.normalize(),V.crossVectors(n,H),V.lengthSq()===0&&(Math.abs(n.z)===1?H.x+=1e-4:H.z+=1e-4,H.normalize(),V.crossVectors(n,H)),V.normalize(),Be.crossVectors(H,V),r[0]=V.x,r[4]=Be.x,r[8]=H.x,r[1]=V.y,r[5]=Be.y,r[9]=H.y,r[2]=V.z,r[6]=Be.z,r[10]=H.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],te=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*ne,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*ne,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*ne,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Le.set(r[0],r[1],r[2]).length(),o=Le.set(r[4],r[5],r[6]).length(),s=Le.set(r[8],r[9],r[10]).length();i<0&&(a=-a),B.copy(this);let c=1/a,l=1/o,u=1/s;return B.elements[0]*=c,B.elements[1]*=c,B.elements[2]*=c,B.elements[4]*=l,B.elements[5]*=l,B.elements[6]*=l,B.elements[8]*=u,B.elements[9]*=u,B.elements[10]*=u,t.setFromRotationMatrix(B),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=v,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=v,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Le=new I,B=new z,Re=new I(0,0,0),ze=new I(1,1,1),V=new I,Be=new I,H=new I,Ve=new z,He=new F,U=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(N(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-N(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(N(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-N(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(N(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-N(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:w(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ve.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ve,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return He.setFromEuler(this),this.setFromQuaternion(He,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};U.DEFAULT_ORDER=`XYZ`;var Ue=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},We=0,Ge=new I,Ke=new F,W=new z,qe=new I,Je=new I,Ye=new I,Xe=new F,Ze=new I(1,0,0),Qe=new I(0,1,0),$e=new I(0,0,1),et={type:`added`},tt={type:`removed`},nt={type:`childadded`,child:null},rt={type:`childremoved`,child:null},it=class e extends D{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,`id`,{value:We++}),this.uuid=M(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new I,n=new U,r=new F,i=new I(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new z},normalMatrix:{value:new Ce}}),this.matrix=new z,this.matrixWorld=new z,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ue,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ke.setFromAxisAngle(e,t),this.quaternion.multiply(Ke),this}rotateOnWorldAxis(e,t){return Ke.setFromAxisAngle(e,t),this.quaternion.premultiply(Ke),this}rotateX(e){return this.rotateOnAxis(Ze,e)}rotateY(e){return this.rotateOnAxis(Qe,e)}rotateZ(e){return this.rotateOnAxis($e,e)}translateOnAxis(e,t){return Ge.copy(e).applyQuaternion(this.quaternion),this.position.add(Ge.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ze,e)}translateY(e){return this.translateOnAxis(Qe,e)}translateZ(e){return this.translateOnAxis($e,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(W.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qe.copy(e):qe.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Je.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?W.lookAt(Je,qe,this.up):W.lookAt(qe,Je,this.up),this.quaternion.setFromRotationMatrix(W),r&&(W.extractRotation(r.matrixWorld),Ke.setFromRotationMatrix(W),this.quaternion.premultiply(Ke.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(T(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(et),nt.child=e,this.dispatchEvent(nt),nt.child=null):T(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tt),rt.child=e,this.dispatchEvent(rt),rt.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),W.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),W.multiply(e.parent.matrixWorld)),e.applyMatrix4(W),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(et),nt.child=e,this.dispatchEvent(nt),nt.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Je,e,Ye),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Je,Xe,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};it.DEFAULT_UP=new I(0,1,0),it.DEFAULT_MATRIX_AUTO_UPDATE=!0,it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var at={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},G={h:0,s:0,l:0},ot={h:0,s:0,l:0};function st(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var ct=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=m){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,L.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=L.workingColorSpace){return this.r=e,this.g=t,this.b=n,L.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=L.workingColorSpace){if(e=ee(e,1),t=N(t,0,1),n=N(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=st(i,r,e+1/3),this.g=st(i,r,e),this.b=st(i,r,e-1/3)}return L.colorSpaceToWorking(this,r),this}setStyle(e,t=m){function n(t){t!==void 0&&parseFloat(t)<1&&w(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:w(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);w(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=m){let n=at[e.toLowerCase()];return n===void 0?w(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=R(e.r),this.g=R(e.g),this.b=R(e.b),this}copyLinearToSRGB(e){return this.r=Oe(e.r),this.g=Oe(e.g),this.b=Oe(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=m){return L.workingToColorSpace(K.copy(this),e),Math.round(N(K.r*255,0,255))*65536+Math.round(N(K.g*255,0,255))*256+Math.round(N(K.b*255,0,255))}getHexString(e=m){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=L.workingColorSpace){L.workingToColorSpace(K.copy(this),t);let n=K.r,r=K.g,i=K.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=L.workingColorSpace){return L.workingToColorSpace(K.copy(this),t),e.r=K.r,e.g=K.g,e.b=K.b,e}getStyle(e=m){L.workingToColorSpace(K.copy(this),e);let t=K.r,n=K.g,r=K.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(G),this.setHSL(G.h+e,G.s+t,G.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(G),e.getHSL(ot);let n=re(G.h,ot.h,t),r=re(G.s,ot.s,t),i=re(G.l,ot.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},K=new ct;ct.NAMES=at;var q=new I,lt=new I,ut=new I,J=new I,dt=new I,ft=new I,pt=new I,mt=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,q)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=q.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(q.copy(this.origin).addScaledVector(this.direction,t),q.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){lt.copy(e).add(t).multiplyScalar(.5),ut.copy(t).sub(e).normalize(),J.copy(this.origin).sub(lt);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ut),o=J.dot(this.direction),s=-J.dot(ut),c=J.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(lt).addScaledVector(ut,d),f}intersectSphere(e,t){q.subVectors(e.center,this.origin);let n=q.dot(this.direction),r=q.dot(q)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,q)!==null}intersectTriangle(e,t,n,r,i){dt.subVectors(t,e),ft.subVectors(n,e),pt.crossVectors(dt,ft);let a=this.direction.dot(pt),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;J.subVectors(this.origin,e);let s=o*this.direction.dot(ft.crossVectors(J,ft));if(s<0)return null;let c=o*this.direction.dot(dt.cross(J));if(c<0||s+c>a)return null;let l=-o*J.dot(pt);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};function ht(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var gt=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},_t=class extends gt{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:d,endingEnd:d}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case f:i=e,o=2*t-n;break;case p:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case f:a=e,s=2*n-t;break;case p:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},vt=class extends gt{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},yt=class extends gt{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bt=class extends gt{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Y=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ht(t,this.TimeBufferType),this.values=ht(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ht(e.times,Array),values:ht(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yt(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vt(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new _t(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new bt(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case s:t=this.InterpolantFactoryMethodDiscrete;break;case c:t=this.InterpolantFactoryMethodLinear;break;case l:t=this.InterpolantFactoryMethodSmooth;break;case u:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return w(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return s;case this.InterpolantFactoryMethodLinear:return c;case this.InterpolantFactoryMethodSmooth:return l;case this.InterpolantFactoryMethodBezier:return u}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(T(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(T(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){T(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){T(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&y(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){T(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===l,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Y.prototype.ValueTypeName=``,Y.prototype.TimeBufferType=Float32Array,Y.prototype.ValueBufferType=Float32Array,Y.prototype.DefaultInterpolation=c;var xt=class extends Y{constructor(e,t,n){super(e,t,n)}};xt.prototype.ValueTypeName=`bool`,xt.prototype.ValueBufferType=Array,xt.prototype.DefaultInterpolation=s,xt.prototype.InterpolantFactoryMethodLinear=void 0,xt.prototype.InterpolantFactoryMethodSmooth=void 0;var St=class extends Y{constructor(e,t,n,r){super(e,t,n,r)}};St.prototype.ValueTypeName=`color`;var Ct=class extends Y{constructor(e,t,n,r){super(e,t,n,r)}};Ct.prototype.ValueTypeName=`number`;var wt=class extends gt{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)F.slerpFlat(i,0,a,c-o,a,c,s);return i}},Tt=class extends Y{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new wt(this.times,this.values,this.getValueSize(),e)}};Tt.prototype.ValueTypeName=`quaternion`,Tt.prototype.InterpolantFactoryMethodSmooth=void 0;var Et=class extends Y{constructor(e,t,n){super(e,t,n)}};Et.prototype.ValueTypeName=`string`,Et.prototype.ValueBufferType=Array,Et.prototype.DefaultInterpolation=s,Et.prototype.InterpolantFactoryMethodLinear=void 0,Et.prototype.InterpolantFactoryMethodSmooth=void 0;var Dt=class extends Y{constructor(e,t,n,r){super(e,t,n,r)}};Dt.prototype.ValueTypeName=`vector`;var Ot=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},kt=class{constructor(e){this.manager=e===void 0?Ot:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};kt.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var At=new I,jt=new F,X=new I,Mt=class extends it{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new z,this.projectionMatrix=new z,this.projectionMatrixInverse=new z,this.coordinateSystem=v,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(At,jt,X),X.x===1&&X.y===1&&X.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(At,jt,X.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(At,jt,X),X.x===1&&X.y===1&&X.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(At,jt,X.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Nt=new I,Pt=new P,Ft=new P,It=class extends Mt{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=j*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(A*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return j*2*Math.atan(Math.tan(A*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Nt.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nt.x,Nt.y).multiplyScalar(-e/Nt.z),Nt.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nt.x,Nt.y).multiplyScalar(-e/Nt.z)}getViewSize(e,t){return this.getViewBounds(e,Pt,Ft),t.subVectors(Ft,Pt)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(A*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Lt=`\\[\\]\\.:\\/`,Rt=RegExp(`[`+Lt+`]`,`g`),zt=`[^`+Lt+`]`,Bt=`[^`+Lt.replace(`\\.`,``)+`]`,Vt=`((?:WC+[\\/:])*)`.replace(`WC`,zt),Ht=`(WCOD+)?`.replace(`WCOD`,Bt),Ut=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,zt),Wt=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,zt),Gt=RegExp(`^`+Vt+Ht+Ut+Wt+`$`),Kt=[`material`,`materials`,`bones`,`map`],qt=class{constructor(e,t,n){let r=n||Z.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Z=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Rt,``)}static parseTrackName(e){let t=Gt.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Kt.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){w(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){T(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){T(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){T(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){T(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){T(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){T(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){T(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;T(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){T(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){T(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Z.Composite=qt,Z.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Z.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Z.prototype.GetterByBindingType=[Z.prototype._getValue_direct,Z.prototype._getValue_array,Z.prototype._getValue_arrayElement,Z.prototype._getValue_toArray],Z.prototype.SetterByBindingTypeAndVersioning=[[Z.prototype._setValue_direct,Z.prototype._setValue_direct_setNeedsUpdate,Z.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Z.prototype._setValue_array,Z.prototype._setValue_array_setNeedsUpdate,Z.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Z.prototype._setValue_arrayElement,Z.prototype._setValue_arrayElement_setNeedsUpdate,Z.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Z.prototype._setValue_fromArray,Z.prototype._setValue_fromArray_setNeedsUpdate,Z.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jt=new z,Yt=class{constructor(e,t,n=0,r=1/0){this.ray=new mt(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ue,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):T(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Jt.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jt),this}intersectObject(e,t=!0,n=[]){return Zt(e,this,n,t),n.sort(Xt),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Zt(e[r],this,n,t);return n.sort(Xt),n}};function Xt(e,t){return e.distance-t.distance}function Zt(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Zt(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}}),typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?w(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);var Qt=()=>/Android/i.test(navigator.userAgent),$t=()=>/iPad|iPhone|iPod/i.test(navigator.userAgent);function Q(e,t,n,r){t.addEventListener(n,r,{passive:!1}),e._listeners.push(()=>t.removeEventListener(n,r))}var en=1,tn=2,nn=.002,rn=.006,an=.0015,on=.15,sn=.15,cn=.1,ln=2,un=0,dn=500,fn=500,pn=200,mn=400,hn=25,$=1e-4,gn={KeyW:new I(0,0,-1),KeyS:new I(0,0,1),KeyA:new I(-1,0,0),KeyD:new I(1,0,0),KeyE:new I(0,1,0),KeyQ:new I(0,-1,0)},_n={ArrowUp:new I(0,0,-1),ArrowDown:new I(0,0,1),ArrowLeft:new I(-1,0,0),ArrowRight:new I(1,0,0),PageUp:new I(0,1,0),PageDown:new I(0,-1,0)};new I(0,0,1),new I(0,0,-1);var vn={Home:new I(0,-1,0),End:new I(0,1,0),Insert:new I(-1,0,0),Delete:new I(1,0,0)},yn=class{constructor({canvas:e}){this.lastTime=0,this.fpsMovement=new bn({canvas:e}),this.pointerControls=new xn({canvas:e})}update(e,t){let n=performance.now(),r=Math.max(1e-5,Math.min(.1,(n-(this.lastTime||n))/1e3));this.lastTime=n;let i=this.fpsMovement.update(r,e);return this.pointerControls.update(r,e,t)&&(i=!0),i}},bn=class{constructor({canvas:e,moveSpeed:t,rollSpeed:n,stickThreshold:r,rotateSpeed:i,keycodeMoveMapping:a,keycodeRotateMapping:o,gamepadMapping:s,capsMultiplier:c,shiftMultiplier:l,ctrlMultiplier:u,xr:d}={}){this._listeners=[],this.enable=!0,this.extraMove=new I,this.moveSpeed=t??en,this.rollSpeed=n??tn,this.stickThreshold=r??cn,this.rotateSpeed=i??ln,this.keycodeMoveMapping=a??{...gn,..._n},this.keycodeRotateMapping=o??{...vn},this.gamepadMapping=s??{4:`rollLeft`,5:`rollRight`,6:`ctrl`,7:`shift`},this.capsMultiplier=c??10,this.shiftMultiplier=l??5,this.ctrlMultiplier=u??1/5,this.xr=d,this.keydown={},this.keycode={},Q(this,document,`keydown`,t=>{document.activeElement===e&&(this.enable&&(this.keycodeMoveMapping[t.code]||this.keycodeRotateMapping[t.code])&&t.preventDefault(),this.keydown[t.key]=!0,this.keycode[t.code]=!0)}),Q(this,document,`keyup`,e=>{this.keydown[e.key]=!1,this.keycode[e.code]=!1}),Q(this,e,`blur`,()=>{this.keydown={},this.keycode={}}),Q(this,window,`blur`,()=>{this.keydown={},this.keycode={}})}update(e,t){if(!this.enable)return!1;let n=[new P,new P],r=navigator.getGamepads()[0];r&&(n[0].set(r.axes[0],r.axes[1]),n[1].set(r.axes[2],r.axes[3]));let i=r?.buttons.map(e=>e.pressed)||[],a=Array.from(this.xr?.getSession()?.inputSources??[]);for(let e of a){let t=e.gamepad;if(t)switch(e.handedness){case`none`:n[0].x+=t.axes[0],n[0].y+=t.axes[1],n[1].x+=t.axes[2],n[1].y+=t.axes[3];break;case`left`:n[0].x+=t.axes[2],n[0].y+=t.axes[3];break;case`right`:n[1].x+=t.axes[2],n[1].y+=t.axes[3];break}}for(let e of n)e.x=Math.abs(e.x)>=this.stickThreshold?e.x:0,e.y=Math.abs(e.y)>=this.stickThreshold?e.y:0;let o=new I(n[1].x,n[1].y,0).multiplyScalar(this.rotateSpeed);for(let[e,t]of Object.entries(this.keycodeRotateMapping))this.keycode[e]&&o.add(t);for(let e in this.gamepadMapping)if(i[Number.parseInt(e)])switch(this.gamepadMapping[e]){case`rollLeft`:o.z+=1;break;case`rollRight`:--o.z;break}o.multiply(new I(this.rotateSpeed,this.rotateSpeed,this.rollSpeed));let s=o.length()>$;if(o.manhattanLength()>0){o.multiplyScalar(e);let n=new U().setFromQuaternion(t.quaternion,`YXZ`);n.y-=o.x,n.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,n.x-o.y)),n.z=Math.max(-Math.PI,Math.min(Math.PI,n.z+o.z)),t.quaternion.setFromEuler(n)}let c=new I(n[0].x,0,n[0].y);c.add(this.extraMove);for(let[e,t]of Object.entries(this.keycodeMoveMapping))this.keycode[e]&&c.add(t);let l=1;this.keydown.CapsLock&&(l*=this.capsMultiplier),(this.keycode.ShiftLeft||this.keycode.ShiftRight)&&(l*=this.shiftMultiplier),(this.keycode.ControlLeft||this.keycode.ControlRight)&&(l*=this.ctrlMultiplier);for(let e in this.gamepadMapping)if(i[Number.parseInt(e)])switch(this.gamepadMapping[e]){case`shift`:l*=this.shiftMultiplier;break;case`ctrl`:l*=this.ctrlMultiplier;break}return c.length()>$&&(s=!0),c.applyQuaternion(t.quaternion),t.position.add(c.multiplyScalar(this.moveSpeed*l*e)),s}},xn=class{constructor({canvas:e,rotateSpeed:t,slideSpeed:n,scrollSpeed:r,swapRotateSlide:i,reverseRotate:a,reverseSlide:o,reverseSwipe:s,reverseScroll:c,moveInertia:l,rotateInertia:u,pointerRollScale:d,doublePress:f,pressMoveDelayMs:p,pressMoveAccelMs:m,pressMoveSpeed:h,doublePressMoveSpeed:g,triplePressMoveSpeed:_,pressMoveCenter:v}){this._listeners=[],this.enable=!0,this.canvas=e,this.rotateSpeed=t??nn,this.slideSpeed=n??rn,this.scrollSpeed=r??an,this.swapRotateSlide=i??!1,this.reverseRotate=a??(Qt()||$t()),this.reverseSlide=o??!1,this.reverseSwipe=s??!1,this.reverseScroll=c??!1,this.moveInertia=l??sn,this.rotateInertia=u??on,this.pointerRollScale=d??un,this.doublePress=f??(()=>{}),this.doublePressLimitMs=mn,this.doublePressDistance=hn,this.pressMoveDelayMs=p??dn,this.pressMoveAccelMs=m??fn,this.pressMoveSpeed=h??0,this.doublePressMoveSpeed=g??this.pressMoveSpeed*5,this.triplePressMoveSpeed=_??this.doublePressMoveSpeed*5,this.pressMoveCenter=v??!0,this.doublePressed=void 0,this.triplePressed=!1,this.lastUp=null,this.lastLastUp=null,this.rotating=null,this.sliding=null,this.lastDown=null,this.dualPress=!1,this.scroll=new I,this.rotateVelocity=new I,this.moveVelocity=new I,Q(this,e,`pointerdown`,t=>{e.focus({preventScroll:!0});let n=this.getPointerPosition(t),r=n.clone(),i=n.clone(),a=!this.swapRotateSlide&&!this.rotating&&(t.pointerType!==`mouse`||t.button===0)||this.swapRotateSlide&&this.sliding&&!this.rotating&&(t.pointerType!==`mouse`||t.button===1),{pointerId:o}=t,s=performance.now();if(a)this.rotating={initial:r,last:i,position:n,pointerId:o,timeStamp:s},this.lastDown=this.rotating,e.setPointerCapture(t.pointerId),this.dualPress=!1;else if(!this.sliding){let a=t.pointerType===`mouse`?t.button:void 0;this.sliding={initial:r,last:i,position:n,pointerId:o,button:a,timeStamp:s},this.lastDown=this.sliding,e.setPointerCapture(t.pointerId),this.dualPress=this.rotating!=null&&s-this.rotating.timeStamp<pn}if(this.lastUp){let e=this.lastUp.position.distanceTo(n),t=s-this.lastUp.timeStamp;if(e<this.doublePressDistance&&t<this.doublePressLimitMs&&(this.doublePressed=performance.now(),this.triplePressed=!1,this.lastLastUp)){let e=this.lastLastUp.position.distanceTo(this.lastUp.position),t=this.lastUp.timeStamp-this.lastLastUp.timeStamp;e<this.doublePressDistance&&t<this.doublePressLimitMs&&(this.triplePressed=!0)}}});let y=t=>{this.rotating?.pointerId===t.pointerId?(this.rotating=null,e.releasePointerCapture(t.pointerId),this.dualPress&&this.sliding&&(e.releasePointerCapture(this.sliding.pointerId),this.sliding=null)):this.sliding?.pointerId===t.pointerId&&(this.sliding=null,e.releasePointerCapture(t.pointerId),this.dualPress&&this.rotating&&(e.releasePointerCapture(this.rotating.pointerId),this.rotating=null)),this.doublePressed=void 0,this.triplePressed=!1;let n=this.getPointerPosition(t),r=this.lastUp;this.lastLastUp=this.lastUp;let i=performance.now();if(this.lastUp={position:n,timeStamp:i},r&&r.position.distanceTo(n)<this.doublePressDistance){let e=i-r.timeStamp;e<this.doublePressLimitMs&&this.doublePress({position:n,intervalMs:e})}};Q(this,document,`pointerup`,y),Q(this,document,`pointercancel`,y),Q(this,document,`pointermove`,e=>{this.rotating?.pointerId===e.pointerId?this.rotating.position=this.getPointerPosition(e):this.sliding?.pointerId===e.pointerId&&(this.sliding.position=this.getPointerPosition(e))}),Q(this,e,`contextmenu`,e=>{e.preventDefault()}),Q(this,e,`wheel`,e=>{this.scroll.add(new I(e.deltaX,e.deltaY,e.deltaZ)),e.preventDefault()})}getPointerPosition(e){let t=this.canvas.getBoundingClientRect();return new P(e.clientX-t.left,e.clientY-t.top)}update(e,t,n){if(!this.enable)return!1;let r=performance.now(),i=!1;if(this.dualPress&&this.rotating&&this.sliding){let r=[this.rotating.position.clone().sub(this.rotating.last),this.sliding.position.clone().sub(this.sliding.last)],a=r[0].dot(r[1]);if(a>=.2){let n=r[0].clone().add(r[1]),a=new I(n.x,-n.y,0);a.multiplyScalar(this.slideSpeed*(this.reverseSwipe?1:-1)),a.applyQuaternion(t.quaternion),t.position.add(a),this.moveVelocity=a.clone().multiplyScalar(1/e),a.length()>$&&(i=!0)}else if(a<=-.2){let a=this.sliding.last.clone().sub(this.rotating.last),o=a.length();a.multiplyScalar(1/o).normalize();let s=new P(-a.y,a.x),c=[r[0].dot(a),r[1].dot(a)],l=[r[0].dot(s),r[1].dot(s)],u=this.rotating.last.clone().add(this.sliding.last).multiplyScalar(.5),d=new I,f=n??(t instanceof Mt?t:void 0);if(f){let e=new P(u.x/this.canvas.clientWidth*2-1,-(u.y/this.canvas.clientHeight)*2+1),t=new Yt;t.setFromCamera(e,f),d=t.ray.direction}let p=c[1]-c[0],m=d.multiplyScalar(p*this.slideSpeed);t.position.add(m),this.moveVelocity=m.clone().multiplyScalar(1/e),m.length()>$&&(i=!0);let h=[Math.atan(l[0]/(-.5*o)),Math.atan(l[1]/(.5*o))],g=.5*(h[0]+h[1])*this.pointerRollScale,_=new U().setFromQuaternion(t.quaternion,`YXZ`);_.z=Math.max(-Math.PI,Math.min(Math.PI,_.z+.5*g)),t.quaternion.setFromEuler(_),Math.abs(g)>$&&(i=!0)}this.rotating.last.copy(this.rotating.position),this.sliding.last.copy(this.sliding.position)}else{let a=new I;if(this.rotating&&!this.dualPress){let t=this.rotating.position.clone().sub(this.rotating.last);this.rotating.last.copy(this.rotating.position),a.set(t.x,t.y,0),a.multiplyScalar(this.rotateSpeed*(this.reverseRotate?-1:1)),this.rotateVelocity=a.clone().multiplyScalar(1/e),a.length()>$&&(i=!0)}else this.rotateVelocity.multiplyScalar(Math.exp(-e/this.rotateInertia)),a.addScaledVector(this.rotateVelocity,e),this.rotateVelocity.length()*.1>$&&(i=!0);let o=new U().setFromQuaternion(t.quaternion,`YXZ`);if(o.y-=a.x,o.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,o.x-a.y)),o.z*=Math.exp(-0*e),t.quaternion.setFromEuler(o),this.sliding&&!this.dualPress){let n=this.sliding.position.clone().sub(this.sliding.last);this.sliding.last.copy(this.sliding.position);let r=this.sliding.button===2?new I(n.x,-n.y,0):new I(n.x,0,n.y);r.multiplyScalar(this.slideSpeed*(this.reverseSlide?-1:1)),r.applyQuaternion(t.quaternion),t.position.add(r),this.moveVelocity=r.clone().multiplyScalar(1/e),r.length()>$&&(i=!0)}else{let a=new I;if(this.sliding||this.rotating){let e=this.lastDown?.last??new P,i=n??(t instanceof Mt?t:void 0);if(i){let t=this.pressMoveCenter?new P(0,0):new P(e.x/this.canvas.clientWidth*2-1,-(e.y/this.canvas.clientHeight)*2+1),n=new Yt;n.setFromCamera(t,i),a.copy(n.ray.direction).normalize()}if(this.doublePressed){this.pressHeld=!1;let e=(performance.now()-this.doublePressed)/this.pressMoveAccelMs;e=Math.max(0,Math.min(1,e)),a.multiplyScalar((this.triplePressed?this.triplePressMoveSpeed:this.doublePressMoveSpeed)*e)}else{let e=0;this.lastDown&&(e=(r-(this.lastDown?.timeStamp??r)-this.pressMoveDelayMs)/this.pressMoveAccelMs,this.lastDown.position.distanceTo(this.lastDown.initial)<this.doublePressDistance?this.pressHeld===void 0&&e>0&&(this.pressHeld=!0):this.pressHeld===void 0&&(this.pressHeld=!1)),this.pressHeld?a.multiplyScalar(this.pressMoveSpeed*Math.max(0,Math.min(1,e))):a.set(0,0,0)}}else this.pressHeld=void 0;let o=Math.exp(-e/this.moveInertia);this.moveVelocity.lerpVectors(a,this.moveVelocity,o),t.position.addScaledVector(this.moveVelocity,e),this.moveVelocity.length()*.1>$&&(i=!0)}}let a=this.scroll.multiplyScalar(this.scrollSpeed);return a.set(a.x,a.z,a.y),this.reverseScroll&&a.multiplyScalar(-1),a.applyQuaternion(t.quaternion),t.position.add(a),a.length()>$&&(i=!0),this.scroll.set(0,0,0),i}},Sn=class{constructor(e,t,n){this.canvas=e,this.camera=t,this.onChange=n,this.pose=new It(70,1,.01,5e3),this.rotation=new F,this.inverse=new F,this.controls=new yn({canvas:e}),this.configure({})}configure(e){let{fpsMovement:t,pointerControls:n}=this.controls;t.moveSpeed=e.moveSpeed??1,t.shiftMultiplier=3,n.rotateSpeed=e.rotateSpeed??.00125,n.slideSpeed=e.slideSpeed??.0025,n.scrollSpeed=e.scrollSpeed??.0012,n.moveInertia=n.rotateInertia=.08}setWalkMode(e){this.controls.fpsMovement.enable=e,this.controls.pointerControls.reverseRotate=!e,this.stop()}stop(){let{fpsMovement:e,pointerControls:t}=this.controls;e.keydown={},e.keycode={},t.moveVelocity.set(0,0,0),t.rotateVelocity.set(0,0,0),t.scroll.set(0,0,0)}frameFromPose(e,t,n){this.rotation.setFromUnitVectors(new I(n.x,n.y,n.z).normalize(),new I(0,1,0)),this.inverse.copy(this.rotation).invert(),this.pose.position.set(t.x,t.y,t.z).applyQuaternion(this.rotation),this.pose.up.set(0,1,0),this.pose.lookAt(new I(e.x,e.y,e.z).applyQuaternion(this.rotation)),this.stop(),this.apply()}setPose(e,t,{keepInput:n=!1}={}){let[r,i,a,o]=t,s=new z().makeRotationFromQuaternion(new F(i,a,o,r)).multiply(new z().makeScale(1,-1,-1));this.pose.position.set(e[0],e[1],e[2]).applyQuaternion(this.rotation),this.pose.quaternion.copy(this.rotation).multiply(new F().setFromRotationMatrix(s)),n||this.stop(),this.apply()}frame(e,t,n){this.frameFromPose(e,{x:e.x,y:e.y,z:e.z+t},n)}remember(){this.home={position:this.pose.position.clone(),quaternion:this.pose.quaternion.clone()}}restore(){this.home&&(this.stop(),this.pose.position.copy(this.home.position),this.pose.quaternion.copy(this.home.quaternion),this.apply())}roll(e,t=!1){let n=new U().setFromQuaternion(this.pose.quaternion,`YXZ`),r=be.euclideanModulo((t?0:be.radToDeg(n.z))+e+180,360)-180;return n.z=be.degToRad(r),this.pose.quaternion.setFromEuler(n),this.stop(),this.apply(),r}level(){return this.roll(0,!0)}pitch(){return new U().setFromQuaternion(this.pose.quaternion,`YXZ`).x}setPitch(e){let t=new U().setFromQuaternion(this.pose.quaternion,`YXZ`);t.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,e)),this.pose.quaternion.setFromEuler(t),this.apply()}update(){this.pose.aspect=this.canvas.clientWidth/Math.max(this.canvas.clientHeight,1),this.pose.fov=this.verticalFov??70,this.pose.updateProjectionMatrix(),this.controls.update(this.pose)&&this.apply()}apply(){this.pose.updateMatrixWorld(!0);let e=this.pose.position.clone().applyQuaternion(this.inverse),t=this.inverse.clone().multiply(this.pose.quaternion);this.camera.setPosition(e.x,e.y,e.z),this.camera.setRotation(t.x,t.y,t.z,t.w),this.onChange?.()}project(e){let t=new I(...e).applyQuaternion(this.rotation),n=t.clone().applyMatrix4(this.pose.matrixWorldInverse);return t.project(this.pose),{x:(t.x*.5+.5)*this.canvas.clientWidth,y:(-t.y*.5+.5)*this.canvas.clientHeight,visible:n.z<0&&Math.abs(t.z)<=1&&Math.abs(t.x)<=1.12&&Math.abs(t.y)<=1.12}}dispose(){this.stop();for(let e of[this.controls.fpsMovement,this.controls.pointerControls]){for(let t of e._listeners)t();e._listeners.length=0}}},Cn=`
const FLT_EPSILON: f32 = 1.1920929e-7;

// TGUTProjectorParams
const PARTICLE_MIN_SENSOR_Z: f32 = 0.2;
const COVARIANCE_DILATION: f32 = 0.3;
const ALPHA_THRESHOLD: f32 = 0.00392156862745098;   // 1/255
const TILE_BLOCK_X: f32 = 16.0;
const TILE_BLOCK_Y: f32 = 16.0;

// TGUTProjectionParams, with ut_alpha = 1, ut_beta = 2, ut_kappa = 0, D = 3.
const UT_D: f32 = 3.0;
const UT_ALPHA: f32 = 1.0;
const UT_BETA: f32 = 2.0;
const UT_KAPPA: f32 = 0.0;
const UT_LAMBDA: f32 = UT_ALPHA * UT_ALPHA * (UT_D + UT_KAPPA) - UT_D;
const UT_DELTA: f32 = 1.7320508075688772;           // sqrt(alpha^2 * (D + kappa))
const UT_W_MEAN_0: f32 = UT_LAMBDA / (UT_D + UT_LAMBDA);
const UT_W_I: f32 = 1.0 / (2.0 * (UT_D + UT_LAMBDA));
const UT_W_COV_0: f32 = UT_W_MEAN_0 + (1.0 - UT_ALPHA * UT_ALPHA + UT_BETA);
const UT_IMAGE_MARGIN_FACTOR: f32 = 0.1;

// Particle density model
const GAUSSIAN_MAX_ALPHA: f32 = 0.99;

// Spherical harmonics basis, up to band 3.
const SPH_C0: f32 = 0.28209479177387814;
const SPH_C1: f32 = 0.4886025119029199;
const SPH_C2 = array<f32, 5>(
    1.0925484305920792, -1.0925484305920792, 0.31539156525252005,
    -1.0925484305920792, 0.5462742152960396
);
const SPH_C3 = array<f32, 7>(
    -0.5900435899266435, 2.890611442640554, -0.4570457994644658, 0.3731763325901154,
    -0.4570457994644658, 1.445305721320277, -0.5900435899266435
);
`,wn=`
// The fisheye-to-panorama family, in units of the focal length, from
// longitude and latitude. s stretches the azimuthal equidistant (fisheye)
// projection into the Aitoff one: s = 1 is the fisheye, s = 2 Aitoff's 2:1
// oval. w then blends Aitoff into the equirectangular panorama (w = 1).
// Every stage maps the sphere one-to-one onto a convex outline.
fn gutLensFamily(lon: f32, lat: f32, s: f32, w: f32) -> vec2f {
    let l = lon / s;
    let c = acos(clamp(cos(lat) * cos(l), -1.0, 1.0));
    let k = select(c / sin(c), 1.0, c < 1e-4);
    let aitoff = vec2f(s * cos(lat) * sin(l), sin(lat)) * k;
    return mix(aitoff, vec2f(lon, lat), w);
}

// Experimental lens triangle: the pixel offset is a weighted sum of the
// pinhole, equidistant-fisheye and equirectangular positions of a direction.
// w = (pinhole, fisheye, panorama) weights, f = their focal lengths. A
// direction the pinhole cannot see (z <= 0) is invalid while w.x > 0.
fn gutLensTriangle(lon: f32, lat: f32, w: vec3f, f: vec3f) -> vec2f {
    let d = vec3f(cos(lat) * sin(lon), sin(lat), cos(lat) * cos(lon));
    let c = acos(clamp(d.z, -1.0, 1.0));
    let rho = length(d.xy);
    let fish = select(d.xy / rho * c, vec2f(0.0), rho < 1e-9);
    // The pinhole's stretch is capped near 90 degrees (z >= 0.05): unbounded,
    // particles reaching round the camera get footprints so large that their
    // covariance loses all precision and gsplat's rules cull them.
    let pin = d.xy / max(d.z, 0.05);
    return w.x * f.x * pin + w.y * f.y * fish + w.z * f.z * vec2f(lon, lat);
}

`,Tn=`
const GUT_MODEL_FISHEYE: u32 = 0u;
const GUT_MODEL_PINHOLE: u32 = 1u;
// An ideal pinhole: every distortion coefficient is zero, so the whole rational
// polynomial collapses to a divide. Worth a separate path because the unscented
// transform runs this seven times per particle.
const GUT_MODEL_PINHOLE_IDEAL: u32 = 2u;
// An ideal lens between pinhole and equidistant fisheye: pixel radius
// f * tan(k * theta) / k, so k = 1 is the pinhole and k -> 0 the fisheye.
// radialCoeffs.x holds k; maxAngle the widest valid angle.
const GUT_MODEL_LENS_BLEND: u32 = 3u;
// Equirectangular panorama: x = f * longitude, y = f * latitude. Depth is the
// distance from the camera, not z, so particles behind are kept.
const GUT_MODEL_EQUIRECT: u32 = 4u;
// Longitude of the particle being projected: its sigma points are unwrapped
// around it, so a particle on the seam behind the camera does not span the image.
var<private> gutLonRef: f32 = 0.0;
// Between the fisheye and the panorama (gutLensFamily).
// radialCoeffs = (s, unused, focal, w); focalLength = 1.
const GUT_MODEL_FISHEYE_PANO: u32 = 5u;
// Experimental lens triangle (gutLensTriangle): radialCoeffs = (wPinhole, 4,
// wFisheye, wPanorama), radialExtra = (fPinhole, fFisheye, fPanorama, depth
// by distance); focalLength = 1.
const GUT_MODEL_LENS_TRIANGLE: u32 = 6u;

struct GutCamera {
    worldToSensor : mat4x4f,     // rigid world -> sensor transform
    sensorToWorld : mat4x4f,     // its inverse, for turning pixel rays into world rays
    focalLength : vec2f,
    principalPoint : vec2f,
    radialCoeffs : vec4f,        // fisheye k1..k4, or pinhole k1..k4
    radialExtra : vec4f,         // pinhole k5, k6, then tangential p1, p2
    thinPrismCoeffs : vec4f,     // pinhole s1..s4
    resolution : vec2f,
    maxAngle : f32,              // fisheye only
    cameraModel : u32,
    cameraPosition : vec3f,
    kernelDegree : i32,
    shDegree : i32,
    numParticles : u32,
};

fn gutWithinResolution(resolution: vec2f, tolerance: f32, p: vec2f) -> bool {
    let margin = resolution * tolerance;
    return (p.x > -margin.x) && (p.y > -margin.y) &&
           (p.x < resolution.x + margin.x) && (p.y < resolution.y + margin.y);
}

// projectPoint(OpenCVFisheyeProjectionParameters, ...)
fn gutProjectFisheye(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                     projected: ptr<function, vec2f>) -> bool {
    var rho = length(sensorPos.xy);
    if (rho <= 0.0) {
        rho = FLT_EPSILON;
    }
    let thetaFull = atan2(rho, sensorPos.z);
    // Clamping keeps badly conditioned polynomials outside the field of view
    // from folding far-off points back into the image.
    let theta = min(thetaFull, cam.maxAngle);
    let t2 = theta * theta;
    let k = cam.radialCoeffs;
    let poly = k.x + t2 * (k.y + t2 * (k.z + t2 * k.w));
    let delta = (theta * (poly * t2 + 1.0)) / rho;
    *projected = cam.focalLength * sensorPos.xy * delta + cam.principalPoint;
    return (theta < cam.maxAngle) && gutWithinResolution(cam.resolution, tolerance, *projected);
}

// projectPoint(OpenCVPinholeProjectionParameters, ...)
fn gutProjectPinhole(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                     projected: ptr<function, vec2f>) -> bool {
    if (sensorPos.z <= 0.0) {
        *projected = vec2f(0.0);
        return false;
    }
    let uv = sensorPos.xy / sensorPos.z;
    let uvSq = uv * uv;
    let r2 = uvSq.x + uvSq.y;
    let a1 = 2.0 * uv.x * uv.y;
    let a2 = r2 + 2.0 * uvSq.x;
    let a3 = r2 + 2.0 * uvSq.y;

    let k = cam.radialCoeffs;
    let ke = cam.radialExtra;
    let numerator = 1.0 + r2 * (k.x + r2 * (k.y + r2 * k.z));
    let denominator = 1.0 + r2 * (k.w + r2 * (ke.x + r2 * ke.y));
    let icD = numerator / denominator;

    let p1 = ke.z;
    let p2 = ke.w;
    let s = cam.thinPrismCoeffs;
    let tangential = vec2f(
        p1 * a1 + p2 * a2 + r2 * (s.x + r2 * s.y),
        p1 * a3 + p2 * a1 + r2 * (s.z + r2 * s.w)
    );
    let uvND = icD * uv + tangential;

    // Outside these bounds the distortion polynomial is not trustworthy, so the
    // point is pushed well clear of the image and marked invalid.
    let validRadial = (icD > 0.8) && (icD < 1.2);
    if (validRadial) {
        *projected = uvND * cam.focalLength + cam.principalPoint;
    } else {
        let clipRadius = length(cam.resolution);
        *projected = (clipRadius / sqrt(max(r2, FLT_EPSILON))) * uv + cam.principalPoint;
    }
    return validRadial && gutWithinResolution(cam.resolution, tolerance, *projected);
}

fn gutProjectPointIdeal(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                        projected: ptr<function, vec2f>) -> bool {
    if (sensorPos.z <= 0.0) {
        *projected = vec2f(0.0);
        return false;
    }
    *projected = (sensorPos.xy / sensorPos.z) * cam.focalLength + cam.principalPoint;
    return gutWithinResolution(cam.resolution, tolerance, *projected);
}

fn gutLensRadius(k: f32, theta: f32) -> f32 {
    return select(tan(k * theta) / k, theta, k < 1e-4);
}

fn gutProjectLensBlend(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                       projected: ptr<function, vec2f>) -> bool {
    let rho = max(length(sensorPos.xy), FLT_EPSILON);
    let theta = min(atan2(rho, sensorPos.z), cam.maxAngle);
    *projected = cam.focalLength * sensorPos.xy * (gutLensRadius(cam.radialCoeffs.x, theta) / rho) + cam.principalPoint;
    return (theta < cam.maxAngle) && gutWithinResolution(cam.resolution, tolerance, *projected);
}

fn gutProjectEquirect(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                      projected: ptr<function, vec2f>) -> bool {
    let pi = 3.14159265358979;
    var lon = atan2(sensorPos.x, sensorPos.z);
    lon = lon - 2.0 * pi * round((lon - gutLonRef) / (2.0 * pi));
    let lat = atan2(sensorPos.y, length(sensorPos.xz));
    *projected = cam.focalLength * vec2f(lon, lat) + cam.principalPoint;
    return length(sensorPos) > 0.0 && gutWithinResolution(cam.resolution, tolerance, *projected);
}

${wn}
fn gutProjectFisheyePano(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                         projected: ptr<function, vec2f>) -> bool {
    let pi = 3.14159265358979;
    let d = normalize(sensorPos);
    var lon = atan2(d.x, d.z);
    lon = lon - 2.0 * pi * round((lon - gutLonRef) / (2.0 * pi));
    let k = cam.radialCoeffs;   // (s, 3, focal, w)
    *projected = k.z * gutLensFamily(lon, asin(clamp(d.y, -1.0, 1.0)), k.x, k.w) + cam.principalPoint;
    return gutWithinResolution(cam.resolution, tolerance, *projected);
}

fn gutProjectLensTriangle(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                          projected: ptr<function, vec2f>) -> bool {
    let pi = 3.14159265358979;
    let d = normalize(sensorPos);
    var lon = atan2(d.x, d.z);
    lon = lon - 2.0 * pi * round((lon - gutLonRef) / (2.0 * pi));
    let k = cam.radialCoeffs;
    let w = vec3f(k.x, k.z, k.w);
    // Behind the pinhole's image plane a point has no position while the
    // pinhole weighs in: it is invalid, but placed far out in its own
    // direction (not at the image origin), so a particle reaching round the
    // camera widens its footprint where it really is.
    *projected = gutLensTriangle(lon, asin(clamp(d.y, -1.0, 1.0)), w, cam.radialExtra.xyz) + cam.principalPoint;
    return (w.x == 0.0 || d.z > 0.0) && gutWithinResolution(cam.resolution, tolerance, *projected);
}

fn gutProjectPoint(cam: GutCamera, sensorPos: vec3f, tolerance: f32,
                   projected: ptr<function, vec2f>) -> bool {
    if (cam.cameraModel == GUT_MODEL_PINHOLE_IDEAL) {
        return gutProjectPointIdeal(cam, sensorPos, tolerance, projected);
    }
    if (cam.cameraModel == GUT_MODEL_PINHOLE) {
        return gutProjectPinhole(cam, sensorPos, tolerance, projected);
    }
    if (cam.cameraModel == GUT_MODEL_FISHEYE_PANO) {
        return gutProjectFisheyePano(cam, sensorPos, tolerance, projected);
    }
    if (cam.cameraModel == GUT_MODEL_LENS_TRIANGLE) {
        return gutProjectLensTriangle(cam, sensorPos, tolerance, projected);
    }
    if (cam.cameraModel == GUT_MODEL_EQUIRECT) {
        return gutProjectEquirect(cam, sensorPos, tolerance, projected);
    }
    if (cam.cameraModel == GUT_MODEL_LENS_BLEND) {
        return gutProjectLensBlend(cam, sensorPos, tolerance, projected);
    }
    return gutProjectFisheye(cam, sensorPos, tolerance, projected);
}

// Inverse of the projection for an ideal lens (no distortion terms), so an
// interactive viewer needs no per-pixel ray lookup table. Exact for the
// pinhole and equidistant-fisheye lenses the viewer offers.
fn gutRayForPixel(cam: GutCamera, pixel: vec2f) -> vec3f {
    let d = (pixel - cam.principalPoint) / cam.focalLength;
    if (cam.cameraModel == GUT_MODEL_PINHOLE || cam.cameraModel == GUT_MODEL_PINHOLE_IDEAL) {
        return normalize(vec3f(d, 1.0));
    }
    let r = length(d);
    if (r < 1e-6) {
        return vec3f(0.0, 0.0, 1.0);
    }
    // equidistant: the pixel radius is the angle from the axis
    let theta = r;
    return vec3f(sin(theta) * d / r, cos(theta));
}

fn gutWorldToSensor(cam: GutCamera, worldPos: vec3f) -> vec3f {
    return (cam.worldToSensor * vec4f(worldPos, 1.0)).xyz;
}
`,En=`
// Columns are the particle's principal axes expressed in world space, matching
// the layout the CUDA projector indexes when it builds its sigma points.
fn gutQuatToMat3(q: vec4f) -> mat3x3f {
    let r = q.x; let x = q.y; let y = q.z; let z = q.w;
    let xx = x * x; let yy = y * y; let zz = z * z;
    let xy = x * y; let xz = x * z; let yz = y * z;
    let rx = r * x; let ry = r * y; let rz = r * z;
    return mat3x3f(
        vec3f(1.0 - 2.0 * (yy + zz), 2.0 * (xy + rz),       2.0 * (xz - ry)),
        vec3f(2.0 * (xy - rz),       1.0 - 2.0 * (xx + zz), 2.0 * (yz + rx)),
        vec3f(2.0 * (xz + ry),       2.0 * (yz - rx),       1.0 - 2.0 * (xx + yy))
    );
}
`,Dn=`
struct GutProjection {
    valid : bool,
    center : vec2f,          // pixel coordinates
    conic : vec3f,           // inverse of the dilated 2D covariance
    conicOpacity : f32,
    maxPower : f32,          // culling cut-off, log(opacity / alphaThreshold)
    extent : vec2f,          // pixel half-extent of the bounding rectangle
    covariance : vec3f,      // (xx, xy, yy) before dilation
    depth : f32,             // sensor-space z, the global sort key
};

// tileMinParticlePowerResponse: the smallest quadratic form the particle can
// reach anywhere inside one 16x16 tile. 3DGUT skips a tile when even that
// closest point is already below the opacity cut-off.
fn gutTileMinPowerResponse(tileCoords: vec2f, conic: vec3f, mean: vec2f) -> f32 {
    let tileSize = vec2f(TILE_BLOCK_X, TILE_BLOCK_Y);
    let tileMin = tileSize * tileCoords;
    let tileMax = tileSize + tileMin;

    let minOffset = tileMin - mean;
    let leftAbove = vec2f(f32(minOffset.x > 0.0), f32(minOffset.y > 0.0));
    let notInRange = vec2f(leftAbove.x + f32(mean.x > tileMax.x),
                           leftAbove.y + f32(mean.y > tileMax.y));

    if ((notInRange.x + notInRange.y) > 0.0) {
        let p = mix(tileMax, tileMin, leftAbove);
        let dxy = select(-tileSize, tileSize, minOffset >= vec2f(0.0));
        let diff = mean - p;
        let rcp = vec2f(1.0 / (tileSize.x * tileSize.x * conic.x),
                        1.0 / (tileSize.y * tileSize.y * conic.z));

        let tx = notInRange.y * clamp((dxy.x * conic.x * diff.x + dxy.x * conic.y * diff.y) * rcp.x, 0.0, 1.0);
        let ty = notInRange.x * clamp((dxy.y * conic.y * diff.x + dxy.y * conic.z * diff.y) * rcp.y, 0.0, 1.0);

        let d = mean - vec2f(p.x + tx * dxy.x, p.y + ty * dxy.y);
        return 0.5 * (conic.x * d.x * d.x + conic.z * d.y * d.y) + conic.y * d.x * d.y;
    }
    // the centre falls inside the tile
    return 0.0;
}

// gsplat's 3DGUT (ProjectionUT3DGSFused.cu): the same blur and opacity
// cut-off, but whole-pixel radii and an image-rectangle cull.
fn gsplatExtentConicOpacity(covariance: vec3f, opacity: f32, resolution: vec2f,
                            proj: ptr<function, GutProjection>) -> bool {
    let det = covariance.x * covariance.z - covariance.y * covariance.y;
    let blurred = vec3f(covariance.x + COVARIANCE_DILATION, covariance.y, covariance.z + COVARIANCE_DILATION);
    let detBlur = blurred.x * blurred.z - blurred.y * blurred.y;
    if (detBlur <= 0.0 || blurred.x < 0.0 || blurred.z < 0.0) {
        return false;
    }
    (*proj).conic = vec3f(blurred.z, -blurred.y, blurred.x) / detBlur;
    let compensation = sqrt(max(0.000025, det / detBlur));
    let scaledOpacity = opacity * compensation;
    (*proj).conicOpacity = scaledOpacity;
    if (scaledOpacity < ALPHA_THRESHOLD) {
        return false;
    }
    let extend = min(3.33, sqrt(2.0 * log(scaledOpacity / ALPHA_THRESHOLD)));
    let b = 0.5 * (blurred.x + blurred.z);
    let v1 = b + sqrt(max(0.01, b * b - detBlur));
    let r1 = extend * sqrt(v1);
    let radius = ceil(min(extend * sqrt(vec2f(blurred.x, blurred.z)), vec2f(r1)));
    if (radius.x <= 0.0 && radius.y <= 0.0) {
        return false;
    }
    let c = (*proj).center;
    if (c.x + radius.x <= 0.0 || c.x - radius.x >= resolution.x ||
        c.y + radius.y <= 0.0 || c.y - radius.y >= resolution.y) {
        return false;
    }
    (*proj).extent = radius;
    (*proj).maxPower = log(scaledOpacity / ALPHA_THRESHOLD);
    return true;
}

// gsplat with the unscented transform (with_ut) passes no conics to its tile
// intersection (Rendering.cpp), so every tile of the whole-pixel radius box is
// used (IntersectTile.cu, AABB path).
fn gsplatRect(center: vec2f, radius: vec2f, grid: vec2u) -> vec4u {
    let g = vec2i(grid);
    let c = center / 16.0;
    let r = radius / 16.0;
    let lo = min(max(vec2i(0), vec2i(floor(c - r))), g);
    let hi = min(max(vec2i(0), vec2i(ceil(c + r))), g);
    return vec4u(vec2u(lo), vec2u(hi));
}

// Does the particle's record go into this tile (of its tile rectangle)?
// Native: the tile's smallest power against maxPower. gsplat: always.
fn gutTileHit(tile: vec2u, center: vec2f, conic: vec3f, maxPower: f32, grid: vec2u) -> bool {
    if (GUT_FLAVOR_GSPLAT) { return true; }
    return gutTileMinPowerResponse(vec2f(tile), conic, center) < maxPower;
}

fn gutComputeExtentConicOpacity(covariance: vec3f, opacity: f32, kernelDegree: i32,
                                proj: ptr<function, GutProjection>) -> bool {
    let dilated = vec3f(covariance.x + COVARIANCE_DILATION, covariance.y,
                        covariance.z + COVARIANCE_DILATION);
    let dilatedDet = dilated.x * dilated.z - dilated.y * dilated.y;
    if (dilatedDet == 0.0) {
        return false;
    }
    (*proj).conic = vec3f(dilated.z, -dilated.y, dilated.x) / dilatedDet;

    // Mip-Splatting opacity rescaling (Yu et al.); affects culling only, the
    // shading pass uses the raw density.
    let det = covariance.x * covariance.z - covariance.y * covariance.y;
    let convolutionFactor = sqrt(max(0.000025, det / dilatedDet));
    let scaledOpacity = opacity * convolutionFactor;
    (*proj).conicOpacity = scaledOpacity;

    if (scaledOpacity < ALPHA_THRESHOLD) {
        return false;
    }

    let maxPower = log(scaledOpacity / ALPHA_THRESHOLD);
    (*proj).maxPower = maxPower;
    // The tight bound inverts a degree-2 Gaussian. Other degrees fall off on a
    // different curve, so fall back to the loose 3-sigma box rather than
    // under-covering the particle and clipping it at a tile edge.
    let extentFactor = select(3.33, min(3.33, sqrt(2.0 * maxPower)), kernelDegree == 2);
    let minLambda = 0.01;
    let mid = 0.5 * (dilated.x + dilated.z);
    let lambda = mid + sqrt(max(minLambda, mid * mid - dilatedDet));
    let radius = extentFactor * sqrt(lambda);
    // rect_bounding
    (*proj).extent = min(extentFactor * sqrt(vec2f(dilated.x, dilated.z)), vec2f(radius));
    return radius > 0.0;
}

fn gutProjectParticle(cam: GutCamera, position: vec3f, scale: vec3f, quat: vec4f,
                      density: f32, kernelDegree: i32) -> GutProjection {
    var proj: GutProjection;
    proj.valid = false;

    if (density < ALPHA_THRESHOLD) {
        return proj;
    }
    // gsplat culls degenerate particles (near-zero quaternion or scale).
    if (GUT_FLAVOR_GSPLAT && (dot(quat, quat) < FLT_EPSILON || any(abs(scale) < vec3f(FLT_EPSILON)))) {
        return proj;
    }
    let sensorPos = gutWorldToSensor(cam, position);
    // Sort and cull by distance where the view reaches behind the camera
    // (panorama; the fisheye-panorama blend unless radialExtra.w is 0, which
    // keeps the fisheye's centre depth during the cross-fade).
    let triangle = cam.cameraModel == GUT_MODEL_LENS_TRIANGLE;
    let wrap = cam.cameraModel == GUT_MODEL_EQUIRECT || cam.cameraModel == GUT_MODEL_FISHEYE_PANO || triangle;
    let panorama = cam.cameraModel == GUT_MODEL_EQUIRECT ||
                   ((cam.cameraModel == GUT_MODEL_FISHEYE_PANO || triangle) && cam.radialExtra.w != 0.0);
    // Sort key and near-plane test: centre depth along the axis (global_z_order,
    // the default) or distance from the camera (GUT_DISTANCE_SORT, i.e.
    // global_z_order = false; also always for views reaching behind the camera).
    let depth = select(sensorPos.z, length(sensorPos), panorama || GUT_DISTANCE_SORT);
    // Near plane: native 0.2, gsplat 0.01.
    if (depth < select(PARTICLE_MIN_SENSOR_Z, 0.01, GUT_FLAVOR_GSPLAT)) {
        return proj;
    }
    proj.depth = depth;
    if (wrap) { gutLonRef = atan2(sensorPos.x, sensorPos.z); }

    let rot = gutQuatToMat3(quat);

    // Native policy tests all seven sigma points. A centre-only screen reach
    // estimate is not conservative when a sigma point changes camera depth.
    var centerPx: vec2f;
    let centerInside = gutProjectPoint(cam, sensorPos, UT_IMAGE_MARGIN_FACTOR, &centerPx);

    // Fully unrolled with named variables: an indexed array here spills to
    // thread-local memory on some GPUs instead of staying in registers, which
    // costs far more than the arithmetic it holds.
    let d0 = UT_DELTA * scale.x * rot[0];
    let d1 = UT_DELTA * scale.y * rot[1];
    let d2 = UT_DELTA * scale.z * rot[2];

    var numValid = 0;
    var p0: vec2f; var p1: vec2f; var p2: vec2f; var p3: vec2f;
    var p4: vec2f; var p5: vec2f; var p6: vec2f;

    p0 = centerPx;
    if (centerInside) { numValid++; }
    if (gutProjectPoint(cam, gutWorldToSensor(cam, position + d0), UT_IMAGE_MARGIN_FACTOR, &p1)) { numValid++; }
    if (gutProjectPoint(cam, gutWorldToSensor(cam, position - d0), UT_IMAGE_MARGIN_FACTOR, &p2)) { numValid++; }
    if (gutProjectPoint(cam, gutWorldToSensor(cam, position + d1), UT_IMAGE_MARGIN_FACTOR, &p3)) { numValid++; }
    if (gutProjectPoint(cam, gutWorldToSensor(cam, position - d1), UT_IMAGE_MARGIN_FACTOR, &p4)) { numValid++; }
    if (gutProjectPoint(cam, gutWorldToSensor(cam, position + d2), UT_IMAGE_MARGIN_FACTOR, &p5)) { numValid++; }
    if (gutProjectPoint(cam, gutWorldToSensor(cam, position - d2), UT_IMAGE_MARGIN_FACTOR, &p6)) { numValid++; }

    // ut_require_all_sigma_points_valid = false
    if (numValid == 0) {
        return proj;
    }

    // The CUDA kernel accumulates the mean in this order: centre first, then
    // each axis pair as it is produced.
    var mean = p0 * UT_W_MEAN_0;
    mean = mean + UT_W_I * p1;
    mean = mean + UT_W_I * p2;
    mean = mean + UT_W_I * p3;
    mean = mean + UT_W_I * p4;
    mean = mean + UT_W_I * p5;
    mean = mean + UT_W_I * p6;
    proj.center = mean;

    let c0 = p0 - mean;
    var cov = UT_W_COV_0 * vec3f(c0.x * c0.x, c0.x * c0.y, c0.y * c0.y);
    let c1 = p1 - mean; cov = cov + UT_W_I * vec3f(c1.x * c1.x, c1.x * c1.y, c1.y * c1.y);
    let c2 = p2 - mean; cov = cov + UT_W_I * vec3f(c2.x * c2.x, c2.x * c2.y, c2.y * c2.y);
    let c3 = p3 - mean; cov = cov + UT_W_I * vec3f(c3.x * c3.x, c3.x * c3.y, c3.y * c3.y);
    let c4 = p4 - mean; cov = cov + UT_W_I * vec3f(c4.x * c4.x, c4.x * c4.y, c4.y * c4.y);
    let c5 = p5 - mean; cov = cov + UT_W_I * vec3f(c5.x * c5.x, c5.x * c5.y, c5.y * c5.y);
    let c6 = p6 - mean; cov = cov + UT_W_I * vec3f(c6.x * c6.x, c6.x * c6.y, c6.y * c6.y);
    proj.covariance = cov;

    if (GUT_FLAVOR_GSPLAT) {
        proj.valid = gsplatExtentConicOpacity(cov, density, cam.resolution, &proj);
    } else {
        proj.valid = gutComputeExtentConicOpacity(cov, density, kernelDegree, &proj);
    }
    return proj;
}
`,On=`
struct GutHit {
    accepted : bool,
    alpha : f32,
    depth : f32,
};

// particleResponse: a generalised Gaussian of degree n, scaled by -4.5 / 3^n.
// 3DGUT trains at degree 2 (an ordinary Gaussian); 3DGRT here uses degree 4.
fn gutParticleResponse(degree: i32, d2: f32) -> f32 {
    switch degree {
        case 0: {
            return max(1.0 - 0.329630334487 * sqrt(d2), 0.0);
        }
        case 1: {
            return exp(-1.5 * sqrt(d2));
        }
        case 3: {
            return exp(-0.166666666667 * d2 * sqrt(d2));
        }
        case 4: {
            return exp(-0.0555555555556 * d2 * d2);
        }
        case 5: {
            return exp(-0.0185185185185 * d2 * d2 * sqrt(d2));
        }
        case 8: {
            let sq = d2 * d2;
            return exp(-0.000685871056241 * sq * sq);
        }
        default: {
            return exp(-0.5 * d2);
        }
    }
}

// Same maths as gutDensityHit, but with the per-particle work hoisted out.
// The three axes are the rows of the world-to-canonical transform (each
// principal axis divided by its scale) and the origin is the camera already
// expressed in canonical space; both depend only on the particle and the
// camera, never on the pixel. Hoisting them turns a quaternion-to-matrix
// conversion plus two matrix products per fragment into three dot products.
fn gutCanonicalAxes(quat: vec4f) -> mat3x3f {
    return gutQuatToMat3(quat);
}

// The scale divide stays after the dot products, exactly as the CUDA kernel
// orders it, so the result is bit-identical rather than merely close.
fn gutCanonicalPoint(axes: mat3x3f, invScale: vec3f, v: vec3f) -> vec3f {
    return invScale * vec3f(dot(v, axes[0]), dot(v, axes[1]), dot(v, axes[2]));
}

// Cheapest form: the caller supplies the canonical-space ray direction, which
// for an ideal pinhole is a linear function of the pixel and so can be
// interpolated across the quad by the rasteriser instead of recomputed per
// pixel. It need not be normalised -- normalising the direction before or after
// a linear map gives the same unit vector.
fn gutResponseFromDir(canonicalOrigin: vec3f, canonicalDir: vec3f,
                      density: f32, kernelDegree: i32) -> f32 {
    let c = cross(normalize(canonicalDir), canonicalOrigin);
    return min(GAUSSIAN_MAX_ALPHA, gutParticleResponse(kernelDegree, dot(c, c)) * density);
}

fn gutResponsePrepared(canonicalOrigin: vec3f, axes: mat3x3f, invScale: vec3f,
                       rayDirection: vec3f, density: f32, kernelDegree: i32) -> f32 {
    let canonicalDir = normalize(gutCanonicalPoint(axes, invScale, rayDirection));
    let c = cross(canonicalDir, canonicalOrigin);
    let response = gutParticleResponse(kernelDegree, dot(c, c));
    return min(GAUSSIAN_MAX_ALPHA, response * density);
}

fn gutDensityHit(rayOrigin: vec3f, rayDirection: vec3f,
                 position: vec3f, scale: vec3f, quat: vec4f, density: f32,
                 kernelDegree: i32) -> GutHit {
    var hit: GutHit;
    hit.accepted = false;
    hit.alpha = 0.0;
    hit.depth = 0.0;

    let rot = gutQuatToMat3(quat);
    let invScale = vec3f(1.0) / scale;
    // rot is world-from-local, so the transpose takes world vectors to the
    // particle's canonical frame; rayOrigin * rot is that transpose applied.
    let canonicalOrigin = invScale * ((rayOrigin - position) * rot);
    let canonicalDir = normalize(invScale * (rayDirection * rot));

    let c = cross(canonicalDir, canonicalOrigin);
    let response = gutParticleResponse(kernelDegree, dot(c, c));
    hit.alpha = min(GAUSSIAN_MAX_ALPHA, response * density);
    hit.accepted = (response > 0.0) && (hit.alpha > ALPHA_THRESHOLD);
    if (hit.accepted) {
        let canonicalGrds = canonicalDir * dot(canonicalDir, -canonicalOrigin);
        let grds = scale * canonicalGrds;
        hit.depth = sqrt(dot(grds, grds));
    }
    return hit;
}
`,kn=`
fn gutRadianceFromSH(deg: i32, sh: ptr<function, array<vec3f, 16>>, dir: vec3f) -> vec3f {
    var rad = SPH_C0 * (*sh)[0];
    if (deg > 0) {
        let x = dir.x; let y = dir.y; let z = dir.z;
        rad = rad - SPH_C1 * y * (*sh)[1] + SPH_C1 * z * (*sh)[2] - SPH_C1 * x * (*sh)[3];
        if (deg > 1) {
            let xx = x * x; let yy = y * y; let zz = z * z;
            let xy = x * y; let yz = y * z; let xz = x * z;
            rad = rad + SPH_C2[0] * xy * (*sh)[4]
                      + SPH_C2[1] * yz * (*sh)[5]
                      + SPH_C2[2] * (2.0 * zz - xx - yy) * (*sh)[6]
                      + SPH_C2[3] * xz * (*sh)[7]
                      + SPH_C2[4] * (xx - yy) * (*sh)[8];
            if (deg > 2) {
                rad = rad + SPH_C3[0] * y * (3.0 * xx - yy) * (*sh)[9]
                          + SPH_C3[1] * xy * z * (*sh)[10]
                          + SPH_C3[2] * y * (4.0 * zz - xx - yy) * (*sh)[11]
                          + SPH_C3[3] * z * (2.0 * zz - 3.0 * xx - 3.0 * yy) * (*sh)[12]
                          + SPH_C3[4] * x * (4.0 * zz - xx - yy) * (*sh)[13]
                          + SPH_C3[5] * z * (xx - yy) * (*sh)[14]
                          + SPH_C3[6] * x * (xx - 3.0 * yy) * (*sh)[15];
            }
        }
    }
    return max(rad + 0.5, vec3f(0.0));
}
`,An=`
const GUT_BOX_CUTOFF_MARGIN: f32 = 1.01;
const GUT_BOX_SLACK: f32 = 1.002;
const GUT_BOX_MAX_EXTENT: f32 = 8192.0;

struct GutBox {
    valid: bool,
    lo: vec2f,
    hi: vec2f,
};

/** Largest squared ray-to-centre distance whose alpha still clears the cut-off. */
fn gutResponseCutoffSq(degree: i32, density: f32) -> f32 {
    if (density <= ALPHA_THRESHOLD) {
        return -1.0;
    }
    // Positive, because density is above the threshold. The small margin covers
    // the rounding of this inverse against the forward response the shader
    // evaluates, so a pixel sitting exactly on the cut-off is never lost.
    let lnt = log(GUT_BOX_CUTOFF_MARGIN * density / ALPHA_THRESHOLD);
    switch degree {
        case 0: {
            let root = (1.0 - ALPHA_THRESHOLD / (GUT_BOX_CUTOFF_MARGIN * density)) / 0.329630334487;
            return root * root;
        }
        case 1: {
            let root = lnt / 1.5;
            return root * root;
        }
        case 3: {
            return pow(lnt / 0.166666666667, 0.666666666667);
        }
        case 4: {
            return sqrt(lnt / 0.0555555555556);
        }
        case 5: {
            return pow(lnt / 0.0185185185185, 0.4);
        }
        case 8: {
            return pow(lnt / 0.000685871056241, 0.25);
        }
        default: {
            return 2.0 * lnt;
        }
    }
}

/**
 * Bounding box, in the same pixel coordinates the ray builder uses, of every
 * pixel whose alpha can clear the cut-off. Invalid when the region is not a
 * bounded ellipse -- the camera sitting inside the particle's bright region, or
 * the cone grazing the image plane -- in which case the caller must fall back
 * to a coarser bound.
 */
fn gutExactPinholeBox(canonicalOrigin: vec3f, axes: mat3x3f, invScale: vec3f,
                      sensorToWorld: mat4x4f, focal: vec2f, principal: vec2f,
                      centrePx: vec2f, scalePx: f32, cutoffSq: f32) -> GutBox {
    var box: GutBox;
    // An unusable box is returned as an infinite one, so callers that clip
    // against it are simply left with whatever bound they already had.
    box.valid = false;
    box.lo = vec2f(-1.0e30);
    box.hi = vec2f(1.0e30);
    if (cutoffSq < 0.0) {
        return box;
    }

    let o = canonicalOrigin;
    let oLen2 = dot(o, o);
    if (oLen2 <= cutoffSq) {
        return box;      // camera inside the bright region: every ray qualifies
    }
    // Normalising the offset turns the cone condition into
    //     |cross(oHat, d)|^2 <= s2 * |d|^2
    // whose two sides are the same size near the silhouette, instead of two
    // huge nearly equal numbers. Single precision cannot afford the latter.
    let oHat = o * inverseSqrt(oLen2);
    let s2 = cutoffSq / oLen2;

    // Homogeneous pixel -> canonical direction, as a single 3x3.
    let kinv = mat3x3f(vec3f(1.0 / focal.x, 0.0, 0.0),
                       vec3f(0.0, 1.0 / focal.y, 0.0),
                       vec3f(-principal.x / focal.x, -principal.y / focal.y, 1.0));
    let rot = mat3x3f(sensorToWorld[0].xyz, sensorToWorld[1].xyz, sensorToWorld[2].xyz);
    let at = transpose(axes);
    let toCanonical = mat3x3f(invScale * at[0], invScale * at[1], invScale * at[2]);
    let a = toCanonical * rot * kinv;

    // Measure pixels from the projected centre, in units of the particle's own
    // screen size, so every coefficient below is of order one.
    let dc = a * vec3f(centrePx, 1.0);
    let e1 = a[0] * scalePx;
    let e2 = a[1] * scalePx;
    let wc = cross(oHat, dc);
    let w1 = cross(oHat, e1);
    let w2 = cross(oHat, e2);

    let n00 = dot(w1, w1) - s2 * dot(e1, e1);
    let n01 = dot(w1, w2) - s2 * dot(e1, e2);
    let n11 = dot(w2, w2) - s2 * dot(e2, e2);
    let n02 = dot(wc, w1) - s2 * dot(dc, e1);
    let n12 = dot(wc, w2) - s2 * dot(dc, e2);
    let n22 = dot(wc, wc) - s2 * dot(dc, dc);

    // A non-positive-definite quadratic part means a hyperbola or parabola, so
    // the region is unbounded and there is nothing useful to return.
    let det = n00 * n11 - n01 * n01;
    if (n00 <= 0.0 || det <= 0.0) {
        return box;
    }
    let cu = -(n11 * n02 - n01 * n12) / det;
    let cv = -(n00 * n12 - n01 * n02) / det;
    let k = n22 + n02 * cu + n12 * cv;
    if (k >= 0.0) {
        return box;      // the ellipse is empty
    }
    // Support of the ellipse along each axis, from the inverse quadratic form.
    let hu = sqrt(-k * n11 / det);
    let hv = sqrt(-k * n00 / det);
    // A box larger than any plausible framebuffer buys nothing over the
    // tile-aligned bound, and is where the conic is least trustworthy.
    let halfExtent = vec2f(hu, hv) * scalePx;
    if (!all(halfExtent > vec2f(0.0)) || any(halfExtent > vec2f(GUT_BOX_MAX_EXTENT))) {
        return box;
    }

    box.lo = centrePx + vec2f(cu, cv) * scalePx - halfExtent * GUT_BOX_SLACK - 2.0;
    box.hi = centrePx + vec2f(cu, cv) * scalePx + halfExtent * GUT_BOX_SLACK + 2.0;
    box.valid = true;
    return box;
}
`,jn=[`const GUT_FLAVOR_GSPLAT: bool = false;`,`const GUT_DISTANCE_SORT: bool = false;`,Cn,Tn,En,Dn,On,An,kn].join(`
`);export{Dn as a,On as c,wn as i,jn as l,Cn as n,En as o,An as r,kn as s,Tn as t,Sn as u};