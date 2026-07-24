var z0=a=>{throw TypeError(a)};var Fd=(a,t,i)=>t.has(a)||z0("Cannot "+i);var G=(a,t,i)=>(Fd(a,t,"read from private field"),i?i.call(a):t.get(a)),Qt=(a,t,i)=>t.has(a)?z0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,i),Pt=(a,t,i,r)=>(Fd(a,t,"write to private field"),r?r.call(a,i):t.set(a,i),i),fe=(a,t,i)=>(Fd(a,t,"access private method"),i);var wc=(a,t,i,r)=>({set _(l){Pt(a,t,l,i)},get _(){return G(a,t,r)}});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();var Id={exports:{}},ql={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var F0;function WE(){if(F0)return ql;F0=1;var a=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(r,l,u){var f=null;if(u!==void 0&&(f=""+u),l.key!==void 0&&(f=""+l.key),"key"in l){u={};for(var h in l)h!=="key"&&(u[h]=l[h])}else u=l;return l=u.ref,{$$typeof:a,type:r,key:f,ref:l!==void 0?l:null,props:u}}return ql.Fragment=t,ql.jsx=i,ql.jsxs=i,ql}var I0;function YE(){return I0||(I0=1,Id.exports=WE()),Id.exports}var F=YE(),Bd={exports:{}},re={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B0;function QE(){if(B0)return re;B0=1;var a=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),y=Symbol.iterator;function M(P){return P===null||typeof P!="object"?null:(P=y&&P[y]||P["@@iterator"],typeof P=="function"?P:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,x={};function _(P,at,Et){this.props=P,this.context=at,this.refs=x,this.updater=Et||E}_.prototype.isReactComponent={},_.prototype.setState=function(P,at){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,at,"setState")},_.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function L(){}L.prototype=_.prototype;function D(P,at,Et){this.props=P,this.context=at,this.refs=x,this.updater=Et||E}var R=D.prototype=new L;R.constructor=D,b(R,_.prototype),R.isPureReactComponent=!0;var V=Array.isArray;function z(){}var N={H:null,A:null,T:null,S:null},X=Object.prototype.hasOwnProperty;function U(P,at,Et){var J=Et.ref;return{$$typeof:a,type:P,key:at,ref:J!==void 0?J:null,props:Et}}function w(P,at){return U(P.type,at,P.props)}function k(P){return typeof P=="object"&&P!==null&&P.$$typeof===a}function ut(P){var at={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(Et){return at[Et]})}var ot=/\/+/g;function mt(P,at){return typeof P=="object"&&P!==null&&P.key!=null?ut(""+P.key):at.toString(36)}function ht(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(z,z):(P.status="pending",P.then(function(at){P.status==="pending"&&(P.status="fulfilled",P.value=at)},function(at){P.status==="pending"&&(P.status="rejected",P.reason=at)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function I(P,at,Et,J,dt){var At=typeof P;(At==="undefined"||At==="boolean")&&(P=null);var Mt=!1;if(P===null)Mt=!0;else switch(At){case"bigint":case"string":case"number":Mt=!0;break;case"object":switch(P.$$typeof){case a:case t:Mt=!0;break;case g:return Mt=P._init,I(Mt(P._payload),at,Et,J,dt)}}if(Mt)return dt=dt(P),Mt=J===""?"."+mt(P,0):J,V(dt)?(Et="",Mt!=null&&(Et=Mt.replace(ot,"$&/")+"/"),I(dt,at,Et,"",function(se){return se})):dt!=null&&(k(dt)&&(dt=w(dt,Et+(dt.key==null||P&&P.key===dt.key?"":(""+dt.key).replace(ot,"$&/")+"/")+Mt)),at.push(dt)),1;Mt=0;var Xt=J===""?".":J+":";if(V(P))for(var Vt=0;Vt<P.length;Vt++)J=P[Vt],At=Xt+mt(J,Vt),Mt+=I(J,at,Et,At,dt);else if(Vt=M(P),typeof Vt=="function")for(P=Vt.call(P),Vt=0;!(J=P.next()).done;)J=J.value,At=Xt+mt(J,Vt++),Mt+=I(J,at,Et,At,dt);else if(At==="object"){if(typeof P.then=="function")return I(ht(P),at,Et,J,dt);throw at=String(P),Error("Objects are not valid as a React child (found: "+(at==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":at)+"). If you meant to render a collection of children, use an array instead.")}return Mt}function B(P,at,Et){if(P==null)return P;var J=[],dt=0;return I(P,J,"","",function(At){return at.call(Et,At,dt++)}),J}function W(P){if(P._status===-1){var at=P._result;at=at(),at.then(function(Et){(P._status===0||P._status===-1)&&(P._status=1,P._result=Et)},function(Et){(P._status===0||P._status===-1)&&(P._status=2,P._result=Et)}),P._status===-1&&(P._status=0,P._result=at)}if(P._status===1)return P._result.default;throw P._result}var bt=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var at=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(at))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Rt={map:B,forEach:function(P,at,Et){B(P,function(){at.apply(this,arguments)},Et)},count:function(P){var at=0;return B(P,function(){at++}),at},toArray:function(P){return B(P,function(at){return at})||[]},only:function(P){if(!k(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return re.Activity=v,re.Children=Rt,re.Component=_,re.Fragment=i,re.Profiler=l,re.PureComponent=D,re.StrictMode=r,re.Suspense=p,re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,re.__COMPILER_RUNTIME={__proto__:null,c:function(P){return N.H.useMemoCache(P)}},re.cache=function(P){return function(){return P.apply(null,arguments)}},re.cacheSignal=function(){return null},re.cloneElement=function(P,at,Et){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var J=b({},P.props),dt=P.key;if(at!=null)for(At in at.key!==void 0&&(dt=""+at.key),at)!X.call(at,At)||At==="key"||At==="__self"||At==="__source"||At==="ref"&&at.ref===void 0||(J[At]=at[At]);var At=arguments.length-2;if(At===1)J.children=Et;else if(1<At){for(var Mt=Array(At),Xt=0;Xt<At;Xt++)Mt[Xt]=arguments[Xt+2];J.children=Mt}return U(P.type,dt,J)},re.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:u,_context:P},P},re.createElement=function(P,at,Et){var J,dt={},At=null;if(at!=null)for(J in at.key!==void 0&&(At=""+at.key),at)X.call(at,J)&&J!=="key"&&J!=="__self"&&J!=="__source"&&(dt[J]=at[J]);var Mt=arguments.length-2;if(Mt===1)dt.children=Et;else if(1<Mt){for(var Xt=Array(Mt),Vt=0;Vt<Mt;Vt++)Xt[Vt]=arguments[Vt+2];dt.children=Xt}if(P&&P.defaultProps)for(J in Mt=P.defaultProps,Mt)dt[J]===void 0&&(dt[J]=Mt[J]);return U(P,At,dt)},re.createRef=function(){return{current:null}},re.forwardRef=function(P){return{$$typeof:h,render:P}},re.isValidElement=k,re.lazy=function(P){return{$$typeof:g,_payload:{_status:-1,_result:P},_init:W}},re.memo=function(P,at){return{$$typeof:m,type:P,compare:at===void 0?null:at}},re.startTransition=function(P){var at=N.T,Et={};N.T=Et;try{var J=P(),dt=N.S;dt!==null&&dt(Et,J),typeof J=="object"&&J!==null&&typeof J.then=="function"&&J.then(z,bt)}catch(At){bt(At)}finally{at!==null&&Et.types!==null&&(at.types=Et.types),N.T=at}},re.unstable_useCacheRefresh=function(){return N.H.useCacheRefresh()},re.use=function(P){return N.H.use(P)},re.useActionState=function(P,at,Et){return N.H.useActionState(P,at,Et)},re.useCallback=function(P,at){return N.H.useCallback(P,at)},re.useContext=function(P){return N.H.useContext(P)},re.useDebugValue=function(){},re.useDeferredValue=function(P,at){return N.H.useDeferredValue(P,at)},re.useEffect=function(P,at){return N.H.useEffect(P,at)},re.useEffectEvent=function(P){return N.H.useEffectEvent(P)},re.useId=function(){return N.H.useId()},re.useImperativeHandle=function(P,at,Et){return N.H.useImperativeHandle(P,at,Et)},re.useInsertionEffect=function(P,at){return N.H.useInsertionEffect(P,at)},re.useLayoutEffect=function(P,at){return N.H.useLayoutEffect(P,at)},re.useMemo=function(P,at){return N.H.useMemo(P,at)},re.useOptimistic=function(P,at){return N.H.useOptimistic(P,at)},re.useReducer=function(P,at,Et){return N.H.useReducer(P,at,Et)},re.useRef=function(P){return N.H.useRef(P)},re.useState=function(P){return N.H.useState(P)},re.useSyncExternalStore=function(P,at,Et){return N.H.useSyncExternalStore(P,at,Et)},re.useTransition=function(){return N.H.useTransition()},re.version="19.2.8",re}var H0;function Lm(){return H0||(H0=1,Bd.exports=QE()),Bd.exports}var $=Lm(),Hd={exports:{}},jl={},Gd={exports:{}},Vd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G0;function ZE(){return G0||(G0=1,(function(a){function t(I,B){var W=I.length;I.push(B);t:for(;0<W;){var bt=W-1>>>1,Rt=I[bt];if(0<l(Rt,B))I[bt]=B,I[W]=Rt,W=bt;else break t}}function i(I){return I.length===0?null:I[0]}function r(I){if(I.length===0)return null;var B=I[0],W=I.pop();if(W!==B){I[0]=W;t:for(var bt=0,Rt=I.length,P=Rt>>>1;bt<P;){var at=2*(bt+1)-1,Et=I[at],J=at+1,dt=I[J];if(0>l(Et,W))J<Rt&&0>l(dt,Et)?(I[bt]=dt,I[J]=W,bt=J):(I[bt]=Et,I[at]=W,bt=at);else if(J<Rt&&0>l(dt,W))I[bt]=dt,I[J]=W,bt=J;else break t}}return B}function l(I,B){var W=I.sortIndex-B.sortIndex;return W!==0?W:I.id-B.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;a.unstable_now=function(){return u.now()}}else{var f=Date,h=f.now();a.unstable_now=function(){return f.now()-h}}var p=[],m=[],g=1,v=null,y=3,M=!1,E=!1,b=!1,x=!1,_=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function R(I){for(var B=i(m);B!==null;){if(B.callback===null)r(m);else if(B.startTime<=I)r(m),B.sortIndex=B.expirationTime,t(p,B);else break;B=i(m)}}function V(I){if(b=!1,R(I),!E)if(i(p)!==null)E=!0,z||(z=!0,ut());else{var B=i(m);B!==null&&ht(V,B.startTime-I)}}var z=!1,N=-1,X=5,U=-1;function w(){return x?!0:!(a.unstable_now()-U<X)}function k(){if(x=!1,z){var I=a.unstable_now();U=I;var B=!0;try{t:{E=!1,b&&(b=!1,L(N),N=-1),M=!0;var W=y;try{e:{for(R(I),v=i(p);v!==null&&!(v.expirationTime>I&&w());){var bt=v.callback;if(typeof bt=="function"){v.callback=null,y=v.priorityLevel;var Rt=bt(v.expirationTime<=I);if(I=a.unstable_now(),typeof Rt=="function"){v.callback=Rt,R(I),B=!0;break e}v===i(p)&&r(p),R(I)}else r(p);v=i(p)}if(v!==null)B=!0;else{var P=i(m);P!==null&&ht(V,P.startTime-I),B=!1}}break t}finally{v=null,y=W,M=!1}B=void 0}}finally{B?ut():z=!1}}}var ut;if(typeof D=="function")ut=function(){D(k)};else if(typeof MessageChannel<"u"){var ot=new MessageChannel,mt=ot.port2;ot.port1.onmessage=k,ut=function(){mt.postMessage(null)}}else ut=function(){_(k,0)};function ht(I,B){N=_(function(){I(a.unstable_now())},B)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(I){I.callback=null},a.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):X=0<I?Math.floor(1e3/I):5},a.unstable_getCurrentPriorityLevel=function(){return y},a.unstable_next=function(I){switch(y){case 1:case 2:case 3:var B=3;break;default:B=y}var W=y;y=B;try{return I()}finally{y=W}},a.unstable_requestPaint=function(){x=!0},a.unstable_runWithPriority=function(I,B){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var W=y;y=I;try{return B()}finally{y=W}},a.unstable_scheduleCallback=function(I,B,W){var bt=a.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?bt+W:bt):W=bt,I){case 1:var Rt=-1;break;case 2:Rt=250;break;case 5:Rt=1073741823;break;case 4:Rt=1e4;break;default:Rt=5e3}return Rt=W+Rt,I={id:g++,callback:B,priorityLevel:I,startTime:W,expirationTime:Rt,sortIndex:-1},W>bt?(I.sortIndex=W,t(m,I),i(p)===null&&I===i(m)&&(b?(L(N),N=-1):b=!0,ht(V,W-bt))):(I.sortIndex=Rt,t(p,I),E||M||(E=!0,z||(z=!0,ut()))),I},a.unstable_shouldYield=w,a.unstable_wrapCallback=function(I){var B=y;return function(){var W=y;y=B;try{return I.apply(this,arguments)}finally{y=W}}}})(Vd)),Vd}var V0;function KE(){return V0||(V0=1,Gd.exports=ZE()),Gd.exports}var kd={exports:{}},Pn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var k0;function JE(){if(k0)return Pn;k0=1;var a=Lm();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)m+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(p,m,g){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:p,containerInfo:m,implementation:g}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Pn.createPortal=function(p,m){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return u(p,m,null,g)},Pn.flushSync=function(p){var m=f.T,g=r.p;try{if(f.T=null,r.p=2,p)return p()}finally{f.T=m,r.p=g,r.d.f()}},Pn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(p,m))},Pn.prefetchDNS=function(p){typeof p=="string"&&r.d.D(p)},Pn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var g=m.as,v=h(g,m.crossOrigin),y=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;g==="style"?r.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:v,integrity:y,fetchPriority:M}):g==="script"&&r.d.X(p,{crossOrigin:v,integrity:y,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Pn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var g=h(m.as,m.crossOrigin);r.d.M(p,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&r.d.M(p)},Pn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var g=m.as,v=h(g,m.crossOrigin);r.d.L(p,g,{crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Pn.preloadModule=function(p,m){if(typeof p=="string")if(m){var g=h(m.as,m.crossOrigin);r.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else r.d.m(p)},Pn.requestFormReset=function(p){r.d.r(p)},Pn.unstable_batchedUpdates=function(p,m){return p(m)},Pn.useFormState=function(p,m,g){return f.H.useFormState(p,m,g)},Pn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Pn.version="19.2.8",Pn}var X0;function $E(){if(X0)return kd.exports;X0=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(t){console.error(t)}}return a(),kd.exports=JE(),kd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var q0;function tb(){if(q0)return jl;q0=1;var a=KE(),t=Lm(),i=$E();function r(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)n+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function u(e){var n=e,s=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(s=n.return),e=n.return;while(e)}return n.tag===3?s:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function h(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(u(e)!==e)throw Error(r(188))}function m(e){var n=e.alternate;if(!n){if(n=u(e),n===null)throw Error(r(188));return n!==e?null:e}for(var s=e,o=n;;){var c=s.return;if(c===null)break;var d=c.alternate;if(d===null){if(o=c.return,o!==null){s=o;continue}break}if(c.child===d.child){for(d=c.child;d;){if(d===s)return p(c),e;if(d===o)return p(c),n;d=d.sibling}throw Error(r(188))}if(s.return!==o.return)s=c,o=d;else{for(var S=!1,T=c.child;T;){if(T===s){S=!0,s=c,o=d;break}if(T===o){S=!0,o=c,s=d;break}T=T.sibling}if(!S){for(T=d.child;T;){if(T===s){S=!0,s=d,o=c;break}if(T===o){S=!0,o=d,s=c;break}T=T.sibling}if(!S)throw Error(r(189))}}if(s.alternate!==o)throw Error(r(190))}if(s.tag!==3)throw Error(r(188));return s.stateNode.current===s?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,y=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),b=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),D=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),V=Symbol.for("react.suspense"),z=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),X=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),w=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function ut(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}var ot=Symbol.for("react.client.reference");function mt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ot?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case b:return"Fragment";case _:return"Profiler";case x:return"StrictMode";case V:return"Suspense";case z:return"SuspenseList";case U:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case D:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case R:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case N:return n=e.displayName||null,n!==null?n:mt(e.type)||"Memo";case X:n=e._payload,e=e._init;try{return mt(e(n))}catch{}}return null}var ht=Array.isArray,I=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W={pending:!1,data:null,method:null,action:null},bt=[],Rt=-1;function P(e){return{current:e}}function at(e){0>Rt||(e.current=bt[Rt],bt[Rt]=null,Rt--)}function Et(e,n){Rt++,bt[Rt]=e.current,e.current=n}var J=P(null),dt=P(null),At=P(null),Mt=P(null);function Xt(e,n){switch(Et(At,n),Et(dt,e),Et(J,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?r0(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=r0(n),e=s0(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}at(J),Et(J,e)}function Vt(){at(J),at(dt),at(At)}function se(e){e.memoizedState!==null&&Et(Mt,e);var n=J.current,s=s0(n,e.type);n!==s&&(Et(dt,e),Et(J,s))}function Be(e){dt.current===e&&(at(J),at(dt)),Mt.current===e&&(at(Mt),Gl._currentValue=W)}var me,Ke;function q(e){if(me===void 0)try{throw Error()}catch(s){var n=s.stack.trim().match(/\n( *(at )?)/);me=n&&n[1]||"",Ke=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+me+e+Ke}var Nn=!1;function pe(e,n){if(!e||Nn)return"";Nn=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(ct){var nt=ct}Reflect.construct(e,[],yt)}else{try{yt.call()}catch(ct){nt=ct}e.call(yt.prototype)}}else{try{throw Error()}catch(ct){nt=ct}(yt=e())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(ct){if(ct&&nt&&typeof ct.stack=="string")return[ct.stack,nt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),S=d[0],T=d[1];if(S&&T){var H=S.split(`
`),et=T.split(`
`);for(c=o=0;o<H.length&&!H[o].includes("DetermineComponentFrameRoot");)o++;for(;c<et.length&&!et[c].includes("DetermineComponentFrameRoot");)c++;if(o===H.length||c===et.length)for(o=H.length-1,c=et.length-1;1<=o&&0<=c&&H[o]!==et[c];)c--;for(;1<=o&&0<=c;o--,c--)if(H[o]!==et[c]){if(o!==1||c!==1)do if(o--,c--,0>c||H[o]!==et[c]){var pt=`
`+H[o].replace(" at new "," at ");return e.displayName&&pt.includes("<anonymous>")&&(pt=pt.replace("<anonymous>",e.displayName)),pt}while(1<=o&&0<=c);break}}}finally{Nn=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?q(s):""}function ye(e,n){switch(e.tag){case 26:case 27:case 5:return q(e.type);case 16:return q("Lazy");case 13:return e.child!==n&&n!==null?q("Suspense Fallback"):q("Suspense");case 19:return q("SuspenseList");case 0:case 15:return pe(e.type,!1);case 11:return pe(e.type.render,!1);case 1:return pe(e.type,!0);case 31:return q("Activity");default:return""}}function Zt(e){try{var n="",s=null;do n+=ye(e,s),s=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ze=Object.prototype.hasOwnProperty,Yt=a.unstable_scheduleCallback,O=a.unstable_cancelCallback,A=a.unstable_shouldYield,it=a.unstable_requestPaint,gt=a.unstable_now,Tt=a.unstable_getCurrentPriorityLevel,_t=a.unstable_ImmediatePriority,jt=a.unstable_UserBlockingPriority,Ut=a.unstable_NormalPriority,Bt=a.unstable_LowPriority,xe=a.unstable_IdlePriority,Ct=a.log,Ht=a.unstable_setDisableYieldValue,Kt=null,Wt=null;function zt(e){if(typeof Ct=="function"&&Ht(e),Wt&&typeof Wt.setStrictMode=="function")try{Wt.setStrictMode(Kt,e)}catch{}}var ne=Math.clz32?Math.clz32:Y,oe=Math.log,He=Math.LN2;function Y(e){return e>>>=0,e===0?32:31-(oe(e)/He|0)|0}var wt=256,ft=262144,xt=4194304;function Dt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Lt(e,n,s){var o=e.pendingLanes;if(o===0)return 0;var c=0,d=e.suspendedLanes,S=e.pingedLanes;e=e.warmLanes;var T=o&134217727;return T!==0?(o=T&~d,o!==0?c=Dt(o):(S&=T,S!==0?c=Dt(S):s||(s=T&~e,s!==0&&(c=Dt(s))))):(T=o&~d,T!==0?c=Dt(T):S!==0?c=Dt(S):s||(s=o&~e,s!==0&&(c=Dt(s)))),c===0?0:n!==0&&n!==c&&(n&d)===0&&(d=c&-c,s=n&-n,d>=s||d===32&&(s&4194048)!==0)?n:c}function ie(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Je(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vn(){var e=xt;return xt<<=1,(xt&62914560)===0&&(xt=4194304),e}function Re(e){for(var n=[],s=0;31>s;s++)n.push(e);return n}function Rn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Di(e,n,s,o,c,d){var S=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var T=e.entanglements,H=e.expirationTimes,et=e.hiddenUpdates;for(s=S&~s;0<s;){var pt=31-ne(s),yt=1<<pt;T[pt]=0,H[pt]=-1;var nt=et[pt];if(nt!==null)for(et[pt]=null,pt=0;pt<nt.length;pt++){var ct=nt[pt];ct!==null&&(ct.lane&=-536870913)}s&=~yt}o!==0&&tl(e,o,0),d!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=d&~(S&~n))}function tl(e,n,s){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-ne(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function el(e,n){var s=e.entangledLanes|=n;for(e=e.entanglements;s;){var o=31-ne(s),c=1<<o;c&n|e[o]&n&&(e[o]|=n),s&=~c}}function qi(e,n){var s=n&-n;return s=(s&42)!==0?1:Or(s),(s&(e.suspendedLanes|n))!==0?0:s}function Or(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function As(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function nl(){var e=B.p;return e!==0?e:(e=window.event,e===void 0?32:w0(e.type))}function Pr(e,n){var s=B.p;try{return B.p=e,n()}finally{B.p=s}}var Ui=Math.random().toString(36).slice(2),en="__reactFiber$"+Ui,Cn="__reactProps$"+Ui,ra="__reactContainer$"+Ui,il="__reactEvents$"+Ui,Uf="__reactListeners$"+Ui,Lf="__reactHandles$"+Ui,yu="__reactResources$"+Ui,zr="__reactMarker$"+Ui;function C(e){delete e[en],delete e[Cn],delete e[il],delete e[Uf],delete e[Lf]}function Q(e){var n=e[en];if(n)return n;for(var s=e.parentNode;s;){if(n=s[ra]||s[en]){if(s=n.alternate,n.child!==null||s!==null&&s.child!==null)for(e=d0(e);e!==null;){if(s=e[en])return s;e=d0(e)}return n}e=s,s=e.parentNode}return null}function rt(e){if(e=e[en]||e[ra]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function st(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(r(33))}function Z(e){var n=e[yu];return n||(n=e[yu]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function St(e){e[zr]=!0}var Nt=new Set,It={};function Ft(e,n){te(e,n),te(e+"Capture",n)}function te(e,n){for(It[e]=n,e=0;e<n.length;e++)Nt.add(n[e])}var ae=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Jt={},Se={};function we(e){return ze.call(Se,e)?!0:ze.call(Jt,e)?!1:ae.test(e)?Se[e]=!0:(Jt[e]=!0,!1)}function Ye(e,n,s){if(we(n))if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+s)}}function qe(e,n,s){if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+s)}}function le(e,n,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(n,s,""+o)}}function kt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function fn(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function De(e,n,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,d=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return c.call(this)},set:function(S){s=""+S,d.call(this,S)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(S){s=""+S},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Hn(e){if(!e._valueTracker){var n=fn(e)?"checked":"value";e._valueTracker=De(e,n,""+e[n])}}function sa(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var s=n.getValue(),o="";return e&&(o=fn(e)?e.checked?"true":"false":e.value),e=o,e!==s?(n.setValue(e),!0):!1}function En(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Fr=/[\n"\\]/g;function ge(e){return e.replace(Fr,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function On(e,n,s,o,c,d,S,T){e.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?e.type=S:e.removeAttribute("type"),n!=null?S==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+kt(n)):e.value!==""+kt(n)&&(e.value=""+kt(n)):S!=="submit"&&S!=="reset"||e.removeAttribute("value"),n!=null?_n(e,S,kt(n)):s!=null?_n(e,S,kt(s)):o!=null&&e.removeAttribute("value"),c==null&&d!=null&&(e.defaultChecked=!!d),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),T!=null&&typeof T!="function"&&typeof T!="symbol"&&typeof T!="boolean"?e.name=""+kt(T):e.removeAttribute("name")}function Gn(e,n,s,o,c,d,S,T){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),n!=null||s!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){Hn(e);return}s=s!=null?""+kt(s):"",n=n!=null?""+kt(n):s,T||n===e.value||(e.value=n),e.defaultValue=n}o=o??c,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=T?e.checked:!!o,e.defaultChecked=!!o,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(e.name=S),Hn(e)}function _n(e,n,s){n==="number"&&En(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function sn(e,n,s,o){if(e=e.options,n){n={};for(var c=0;c<s.length;c++)n["$"+s[c]]=!0;for(s=0;s<e.length;s++)c=n.hasOwnProperty("$"+e[s].value),e[s].selected!==c&&(e[s].selected=c),c&&o&&(e[s].defaultSelected=!0)}else{for(s=""+kt(s),n=null,c=0;c<e.length;c++){if(e[c].value===s){e[c].selected=!0,o&&(e[c].defaultSelected=!0);return}n!==null||e[c].disabled||(n=e[c])}n!==null&&(n.selected=!0)}}function Rs(e,n,s){if(n!=null&&(n=""+kt(n),n!==e.value&&(e.value=n),s==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=s!=null?""+kt(s):""}function ji(e,n,s,o){if(n==null){if(o!=null){if(s!=null)throw Error(r(92));if(ht(o)){if(1<o.length)throw Error(r(93));o=o[0]}s=o}s==null&&(s=""),n=s}s=kt(n),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),Hn(e)}function Cs(e,n){if(n){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=n;return}}e.textContent=n}var VS=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ng(e,n,s){var o=n.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,s):typeof s!="number"||s===0||VS.has(n)?n==="float"?e.cssFloat=s:e[n]=(""+s).trim():e[n]=s+"px"}function ig(e,n,s){if(n!=null&&typeof n!="object")throw Error(r(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var c in n)o=n[c],n.hasOwnProperty(c)&&s[c]!==o&&ng(e,c,o)}else for(var d in n)n.hasOwnProperty(d)&&ng(e,d,n[d])}function Nf(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var kS=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),XS=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xu(e){return XS.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function oa(){}var Of=null;function Pf(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ws=null,Ds=null;function ag(e){var n=rt(e);if(n&&(e=n.stateNode)){var s=e[Cn]||null;t:switch(e=n.stateNode,n.type){case"input":if(On(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),n=s.name,s.type==="radio"&&n!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+ge(""+n)+'"][type="radio"]'),n=0;n<s.length;n++){var o=s[n];if(o!==e&&o.form===e.form){var c=o[Cn]||null;if(!c)throw Error(r(90));On(o,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<s.length;n++)o=s[n],o.form===e.form&&sa(o)}break t;case"textarea":Rs(e,s.value,s.defaultValue);break t;case"select":n=s.value,n!=null&&sn(e,!!s.multiple,n,!1)}}}var zf=!1;function rg(e,n,s){if(zf)return e(n,s);zf=!0;try{var o=e(n);return o}finally{if(zf=!1,(ws!==null||Ds!==null)&&(oc(),ws&&(n=ws,e=Ds,Ds=ws=null,ag(n),e)))for(n=0;n<e.length;n++)ag(e[n])}}function al(e,n){var s=e.stateNode;if(s===null)return null;var o=s[Cn]||null;if(o===null)return null;s=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(r(231,n,typeof s));return s}var la=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ff=!1;if(la)try{var rl={};Object.defineProperty(rl,"passive",{get:function(){Ff=!0}}),window.addEventListener("test",rl,rl),window.removeEventListener("test",rl,rl)}catch{Ff=!1}var ka=null,If=null,Su=null;function sg(){if(Su)return Su;var e,n=If,s=n.length,o,c="value"in ka?ka.value:ka.textContent,d=c.length;for(e=0;e<s&&n[e]===c[e];e++);var S=s-e;for(o=1;o<=S&&n[s-o]===c[d-o];o++);return Su=c.slice(e,1<o?1-o:void 0)}function Mu(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Eu(){return!0}function og(){return!1}function jn(e){function n(s,o,c,d,S){this._reactName=s,this._targetInst=c,this.type=o,this.nativeEvent=d,this.target=S,this.currentTarget=null;for(var T in e)e.hasOwnProperty(T)&&(s=e[T],this[T]=s?s(d):d[T]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Eu:og,this.isPropagationStopped=og,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Eu)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Eu)},persist:function(){},isPersistent:Eu}),n}var Ir={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bu=jn(Ir),sl=v({},Ir,{view:0,detail:0}),qS=jn(sl),Bf,Hf,ol,Tu=v({},sl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vf,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ol&&(ol&&e.type==="mousemove"?(Bf=e.screenX-ol.screenX,Hf=e.screenY-ol.screenY):Hf=Bf=0,ol=e),Bf)},movementY:function(e){return"movementY"in e?e.movementY:Hf}}),lg=jn(Tu),jS=v({},Tu,{dataTransfer:0}),WS=jn(jS),YS=v({},sl,{relatedTarget:0}),Gf=jn(YS),QS=v({},Ir,{animationName:0,elapsedTime:0,pseudoElement:0}),ZS=jn(QS),KS=v({},Ir,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),JS=jn(KS),$S=v({},Ir,{data:0}),ug=jn($S),tM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},eM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function iM(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=nM[e])?!!n[e]:!1}function Vf(){return iM}var aM=v({},sl,{key:function(e){if(e.key){var n=tM[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Mu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?eM[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vf,charCode:function(e){return e.type==="keypress"?Mu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Mu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),rM=jn(aM),sM=v({},Tu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cg=jn(sM),oM=v({},sl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vf}),lM=jn(oM),uM=v({},Ir,{propertyName:0,elapsedTime:0,pseudoElement:0}),cM=jn(uM),fM=v({},Tu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hM=jn(fM),dM=v({},Ir,{newState:0,oldState:0}),pM=jn(dM),mM=[9,13,27,32],kf=la&&"CompositionEvent"in window,ll=null;la&&"documentMode"in document&&(ll=document.documentMode);var gM=la&&"TextEvent"in window&&!ll,fg=la&&(!kf||ll&&8<ll&&11>=ll),hg=" ",dg=!1;function pg(e,n){switch(e){case"keyup":return mM.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mg(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Us=!1;function vM(e,n){switch(e){case"compositionend":return mg(n);case"keypress":return n.which!==32?null:(dg=!0,hg);case"textInput":return e=n.data,e===hg&&dg?null:e;default:return null}}function _M(e,n){if(Us)return e==="compositionend"||!kf&&pg(e,n)?(e=sg(),Su=If=ka=null,Us=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return fg&&n.locale!=="ko"?null:n.data;default:return null}}var yM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gg(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!yM[e.type]:n==="textarea"}function vg(e,n,s,o){ws?Ds?Ds.push(o):Ds=[o]:ws=o,n=pc(n,"onChange"),0<n.length&&(s=new bu("onChange","change",null,s,o),e.push({event:s,listeners:n}))}var ul=null,cl=null;function xM(e){$_(e,0)}function Au(e){var n=st(e);if(sa(n))return e}function _g(e,n){if(e==="change")return n}var yg=!1;if(la){var Xf;if(la){var qf="oninput"in document;if(!qf){var xg=document.createElement("div");xg.setAttribute("oninput","return;"),qf=typeof xg.oninput=="function"}Xf=qf}else Xf=!1;yg=Xf&&(!document.documentMode||9<document.documentMode)}function Sg(){ul&&(ul.detachEvent("onpropertychange",Mg),cl=ul=null)}function Mg(e){if(e.propertyName==="value"&&Au(cl)){var n=[];vg(n,cl,e,Pf(e)),rg(xM,n)}}function SM(e,n,s){e==="focusin"?(Sg(),ul=n,cl=s,ul.attachEvent("onpropertychange",Mg)):e==="focusout"&&Sg()}function MM(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Au(cl)}function EM(e,n){if(e==="click")return Au(n)}function bM(e,n){if(e==="input"||e==="change")return Au(n)}function TM(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ai=typeof Object.is=="function"?Object.is:TM;function fl(e,n){if(ai(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var s=Object.keys(e),o=Object.keys(n);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var c=s[o];if(!ze.call(n,c)||!ai(e[c],n[c]))return!1}return!0}function Eg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function bg(e,n){var s=Eg(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=n&&o>=n)return{node:s,offset:n-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=Eg(s)}}function Tg(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Tg(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Ag(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=En(e.document);n instanceof e.HTMLIFrameElement;){try{var s=typeof n.contentWindow.location.href=="string"}catch{s=!1}if(s)e=n.contentWindow;else break;n=En(e.document)}return n}function jf(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var AM=la&&"documentMode"in document&&11>=document.documentMode,Ls=null,Wf=null,hl=null,Yf=!1;function Rg(e,n,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Yf||Ls==null||Ls!==En(o)||(o=Ls,"selectionStart"in o&&jf(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),hl&&fl(hl,o)||(hl=o,o=pc(Wf,"onSelect"),0<o.length&&(n=new bu("onSelect","select",null,n,s),e.push({event:n,listeners:o}),n.target=Ls)))}function Br(e,n){var s={};return s[e.toLowerCase()]=n.toLowerCase(),s["Webkit"+e]="webkit"+n,s["Moz"+e]="moz"+n,s}var Ns={animationend:Br("Animation","AnimationEnd"),animationiteration:Br("Animation","AnimationIteration"),animationstart:Br("Animation","AnimationStart"),transitionrun:Br("Transition","TransitionRun"),transitionstart:Br("Transition","TransitionStart"),transitioncancel:Br("Transition","TransitionCancel"),transitionend:Br("Transition","TransitionEnd")},Qf={},Cg={};la&&(Cg=document.createElement("div").style,"AnimationEvent"in window||(delete Ns.animationend.animation,delete Ns.animationiteration.animation,delete Ns.animationstart.animation),"TransitionEvent"in window||delete Ns.transitionend.transition);function Hr(e){if(Qf[e])return Qf[e];if(!Ns[e])return e;var n=Ns[e],s;for(s in n)if(n.hasOwnProperty(s)&&s in Cg)return Qf[e]=n[s];return e}var wg=Hr("animationend"),Dg=Hr("animationiteration"),Ug=Hr("animationstart"),RM=Hr("transitionrun"),CM=Hr("transitionstart"),wM=Hr("transitioncancel"),Lg=Hr("transitionend"),Ng=new Map,Zf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Zf.push("scrollEnd");function Li(e,n){Ng.set(e,n),Ft(n,[e])}var Ru=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},gi=[],Os=0,Kf=0;function Cu(){for(var e=Os,n=Kf=Os=0;n<e;){var s=gi[n];gi[n++]=null;var o=gi[n];gi[n++]=null;var c=gi[n];gi[n++]=null;var d=gi[n];if(gi[n++]=null,o!==null&&c!==null){var S=o.pending;S===null?c.next=c:(c.next=S.next,S.next=c),o.pending=c}d!==0&&Og(s,c,d)}}function wu(e,n,s,o){gi[Os++]=e,gi[Os++]=n,gi[Os++]=s,gi[Os++]=o,Kf|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Jf(e,n,s,o){return wu(e,n,s,o),Du(e)}function Gr(e,n){return wu(e,null,null,n),Du(e)}function Og(e,n,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var c=!1,d=e.return;d!==null;)d.childLanes|=s,o=d.alternate,o!==null&&(o.childLanes|=s),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(c=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,c&&n!==null&&(c=31-ne(s),e=d.hiddenUpdates,o=e[c],o===null?e[c]=[n]:o.push(n),n.lane=s|536870912),d):null}function Du(e){if(50<Ol)throw Ol=0,od=null,Error(r(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Ps={};function DM(e,n,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,n,s,o){return new DM(e,n,s,o)}function $f(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ua(e,n){var s=e.alternate;return s===null?(s=ri(e.tag,n,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=n,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,n=e.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function Pg(e,n){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,n=s.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Uu(e,n,s,o,c,d){var S=0;if(o=e,typeof e=="function")$f(e)&&(S=1);else if(typeof e=="string")S=PE(e,s,J.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case U:return e=ri(31,s,n,c),e.elementType=U,e.lanes=d,e;case b:return Vr(s.children,c,d,n);case x:S=8,c|=24;break;case _:return e=ri(12,s,n,c|2),e.elementType=_,e.lanes=d,e;case V:return e=ri(13,s,n,c),e.elementType=V,e.lanes=d,e;case z:return e=ri(19,s,n,c),e.elementType=z,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case D:S=10;break t;case L:S=9;break t;case R:S=11;break t;case N:S=14;break t;case X:S=16,o=null;break t}S=29,s=Error(r(130,e===null?"null":typeof e,"")),o=null}return n=ri(S,s,n,c),n.elementType=e,n.type=o,n.lanes=d,n}function Vr(e,n,s,o){return e=ri(7,e,o,n),e.lanes=s,e}function th(e,n,s){return e=ri(6,e,null,n),e.lanes=s,e}function zg(e){var n=ri(18,null,null,0);return n.stateNode=e,n}function eh(e,n,s){return n=ri(4,e.children!==null?e.children:[],e.key,n),n.lanes=s,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Fg=new WeakMap;function vi(e,n){if(typeof e=="object"&&e!==null){var s=Fg.get(e);return s!==void 0?s:(n={value:e,source:n,stack:Zt(n)},Fg.set(e,n),n)}return{value:e,source:n,stack:Zt(n)}}var zs=[],Fs=0,Lu=null,dl=0,_i=[],yi=0,Xa=null,Wi=1,Yi="";function ca(e,n){zs[Fs++]=dl,zs[Fs++]=Lu,Lu=e,dl=n}function Ig(e,n,s){_i[yi++]=Wi,_i[yi++]=Yi,_i[yi++]=Xa,Xa=e;var o=Wi;e=Yi;var c=32-ne(o)-1;o&=~(1<<c),s+=1;var d=32-ne(n)+c;if(30<d){var S=c-c%5;d=(o&(1<<S)-1).toString(32),o>>=S,c-=S,Wi=1<<32-ne(n)+c|s<<c|o,Yi=d+e}else Wi=1<<d|s<<c|o,Yi=e}function nh(e){e.return!==null&&(ca(e,1),Ig(e,1,0))}function ih(e){for(;e===Lu;)Lu=zs[--Fs],zs[Fs]=null,dl=zs[--Fs],zs[Fs]=null;for(;e===Xa;)Xa=_i[--yi],_i[yi]=null,Yi=_i[--yi],_i[yi]=null,Wi=_i[--yi],_i[yi]=null}function Bg(e,n){_i[yi++]=Wi,_i[yi++]=Yi,_i[yi++]=Xa,Wi=n.id,Yi=n.overflow,Xa=e}var wn=null,Qe=null,be=!1,qa=null,xi=!1,ah=Error(r(519));function ja(e){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw pl(vi(n,e)),ah}function Hg(e){var n=e.stateNode,s=e.type,o=e.memoizedProps;switch(n[en]=e,n[Cn]=o,s){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(s=0;s<zl.length;s++)_e(zl[s],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),Gn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),ji(n,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||n.textContent===""+s||o.suppressHydrationWarning===!0||i0(n.textContent,s)?(o.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),o.onScroll!=null&&_e("scroll",n),o.onScrollEnd!=null&&_e("scrollend",n),o.onClick!=null&&(n.onclick=oa),n=!0):n=!1,n||ja(e,!0)}function Gg(e){for(wn=e.return;wn;)switch(wn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:wn=wn.return}}function Is(e){if(e!==wn)return!1;if(!be)return Gg(e),be=!0,!1;var n=e.tag,s;if((s=n!==3&&n!==27)&&((s=n===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||Md(e.type,e.memoizedProps)),s=!s),s&&Qe&&ja(e),Gg(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Qe=h0(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Qe=h0(e)}else n===27?(n=Qe,sr(e.type)?(e=Rd,Rd=null,Qe=e):Qe=n):Qe=wn?Mi(e.stateNode.nextSibling):null;return!0}function kr(){Qe=wn=null,be=!1}function rh(){var e=qa;return e!==null&&(Zn===null?Zn=e:Zn.push.apply(Zn,e),qa=null),e}function pl(e){qa===null?qa=[e]:qa.push(e)}var sh=P(null),Xr=null,fa=null;function Wa(e,n,s){Et(sh,n._currentValue),n._currentValue=s}function ha(e){e._currentValue=sh.current,at(sh)}function oh(e,n,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===s)break;e=e.return}}function lh(e,n,s,o){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var d=c.dependencies;if(d!==null){var S=c.child;d=d.firstContext;t:for(;d!==null;){var T=d;d=c;for(var H=0;H<n.length;H++)if(T.context===n[H]){d.lanes|=s,T=d.alternate,T!==null&&(T.lanes|=s),oh(d.return,s,e),o||(S=null);break t}d=T.next}}else if(c.tag===18){if(S=c.return,S===null)throw Error(r(341));S.lanes|=s,d=S.alternate,d!==null&&(d.lanes|=s),oh(S,s,e),S=null}else S=c.child;if(S!==null)S.return=c;else for(S=c;S!==null;){if(S===e){S=null;break}if(c=S.sibling,c!==null){c.return=S.return,S=c;break}S=S.return}c=S}}function Bs(e,n,s,o){e=null;for(var c=n,d=!1;c!==null;){if(!d){if((c.flags&524288)!==0)d=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var S=c.alternate;if(S===null)throw Error(r(387));if(S=S.memoizedProps,S!==null){var T=c.type;ai(c.pendingProps.value,S.value)||(e!==null?e.push(T):e=[T])}}else if(c===Mt.current){if(S=c.alternate,S===null)throw Error(r(387));S.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Gl):e=[Gl])}c=c.return}e!==null&&lh(n,e,s,o),n.flags|=262144}function Nu(e){for(e=e.firstContext;e!==null;){if(!ai(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function qr(e){Xr=e,fa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Dn(e){return Vg(Xr,e)}function Ou(e,n){return Xr===null&&qr(e),Vg(e,n)}function Vg(e,n){var s=n._currentValue;if(n={context:n,memoizedValue:s,next:null},fa===null){if(e===null)throw Error(r(308));fa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else fa=fa.next=n;return s}var UM=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(s){return s()})}},LM=a.unstable_scheduleCallback,NM=a.unstable_NormalPriority,hn={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function uh(){return{controller:new UM,data:new Map,refCount:0}}function ml(e){e.refCount--,e.refCount===0&&LM(NM,function(){e.controller.abort()})}var gl=null,ch=0,Hs=0,Gs=null;function OM(e,n){if(gl===null){var s=gl=[];ch=0,Hs=dd(),Gs={status:"pending",value:void 0,then:function(o){s.push(o)}}}return ch++,n.then(kg,kg),n}function kg(){if(--ch===0&&gl!==null){Gs!==null&&(Gs.status="fulfilled");var e=gl;gl=null,Hs=0,Gs=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function PM(e,n){var s=[],o={status:"pending",value:null,reason:null,then:function(c){s.push(c)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var c=0;c<s.length;c++)(0,s[c])(n)},function(c){for(o.status="rejected",o.reason=c,c=0;c<s.length;c++)(0,s[c])(void 0)}),o}var Xg=I.S;I.S=function(e,n){R_=gt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&OM(e,n),Xg!==null&&Xg(e,n)};var jr=P(null);function fh(){var e=jr.current;return e!==null?e:je.pooledCache}function Pu(e,n){n===null?Et(jr,jr.current):Et(jr,n.pool)}function qg(){var e=fh();return e===null?null:{parent:hn._currentValue,pool:e}}var Vs=Error(r(460)),hh=Error(r(474)),zu=Error(r(542)),Fu={then:function(){}};function jg(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Wg(e,n,s){switch(s=e[s],s===void 0?e.push(n):s!==n&&(n.then(oa,oa),n=s),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Qg(e),e;default:if(typeof n.status=="string")n.then(oa,oa);else{if(e=je,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=o}},function(o){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Qg(e),e}throw Yr=n,Vs}}function Wr(e){try{var n=e._init;return n(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Yr=s,Vs):s}}var Yr=null;function Yg(){if(Yr===null)throw Error(r(459));var e=Yr;return Yr=null,e}function Qg(e){if(e===Vs||e===zu)throw Error(r(483))}var ks=null,vl=0;function Iu(e){var n=vl;return vl+=1,ks===null&&(ks=[]),Wg(ks,e,n)}function _l(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Bu(e,n){throw n.$$typeof===y?Error(r(525)):(e=Object.prototype.toString.call(n),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Zg(e){function n(K,j){if(e){var tt=K.deletions;tt===null?(K.deletions=[j],K.flags|=16):tt.push(j)}}function s(K,j){if(!e)return null;for(;j!==null;)n(K,j),j=j.sibling;return null}function o(K){for(var j=new Map;K!==null;)K.key!==null?j.set(K.key,K):j.set(K.index,K),K=K.sibling;return j}function c(K,j){return K=ua(K,j),K.index=0,K.sibling=null,K}function d(K,j,tt){return K.index=tt,e?(tt=K.alternate,tt!==null?(tt=tt.index,tt<j?(K.flags|=67108866,j):tt):(K.flags|=67108866,j)):(K.flags|=1048576,j)}function S(K){return e&&K.alternate===null&&(K.flags|=67108866),K}function T(K,j,tt,vt){return j===null||j.tag!==6?(j=th(tt,K.mode,vt),j.return=K,j):(j=c(j,tt),j.return=K,j)}function H(K,j,tt,vt){var $t=tt.type;return $t===b?pt(K,j,tt.props.children,vt,tt.key):j!==null&&(j.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===X&&Wr($t)===j.type)?(j=c(j,tt.props),_l(j,tt),j.return=K,j):(j=Uu(tt.type,tt.key,tt.props,null,K.mode,vt),_l(j,tt),j.return=K,j)}function et(K,j,tt,vt){return j===null||j.tag!==4||j.stateNode.containerInfo!==tt.containerInfo||j.stateNode.implementation!==tt.implementation?(j=eh(tt,K.mode,vt),j.return=K,j):(j=c(j,tt.children||[]),j.return=K,j)}function pt(K,j,tt,vt,$t){return j===null||j.tag!==7?(j=Vr(tt,K.mode,vt,$t),j.return=K,j):(j=c(j,tt),j.return=K,j)}function yt(K,j,tt){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=th(""+j,K.mode,tt),j.return=K,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case M:return tt=Uu(j.type,j.key,j.props,null,K.mode,tt),_l(tt,j),tt.return=K,tt;case E:return j=eh(j,K.mode,tt),j.return=K,j;case X:return j=Wr(j),yt(K,j,tt)}if(ht(j)||ut(j))return j=Vr(j,K.mode,tt,null),j.return=K,j;if(typeof j.then=="function")return yt(K,Iu(j),tt);if(j.$$typeof===D)return yt(K,Ou(K,j),tt);Bu(K,j)}return null}function nt(K,j,tt,vt){var $t=j!==null?j.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return $t!==null?null:T(K,j,""+tt,vt);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case M:return tt.key===$t?H(K,j,tt,vt):null;case E:return tt.key===$t?et(K,j,tt,vt):null;case X:return tt=Wr(tt),nt(K,j,tt,vt)}if(ht(tt)||ut(tt))return $t!==null?null:pt(K,j,tt,vt,null);if(typeof tt.then=="function")return nt(K,j,Iu(tt),vt);if(tt.$$typeof===D)return nt(K,j,Ou(K,tt),vt);Bu(K,tt)}return null}function ct(K,j,tt,vt,$t){if(typeof vt=="string"&&vt!==""||typeof vt=="number"||typeof vt=="bigint")return K=K.get(tt)||null,T(j,K,""+vt,$t);if(typeof vt=="object"&&vt!==null){switch(vt.$$typeof){case M:return K=K.get(vt.key===null?tt:vt.key)||null,H(j,K,vt,$t);case E:return K=K.get(vt.key===null?tt:vt.key)||null,et(j,K,vt,$t);case X:return vt=Wr(vt),ct(K,j,tt,vt,$t)}if(ht(vt)||ut(vt))return K=K.get(tt)||null,pt(j,K,vt,$t,null);if(typeof vt.then=="function")return ct(K,j,tt,Iu(vt),$t);if(vt.$$typeof===D)return ct(K,j,tt,Ou(j,vt),$t);Bu(j,vt)}return null}function Gt(K,j,tt,vt){for(var $t=null,Ue=null,qt=j,ce=j=0,Ee=null;qt!==null&&ce<tt.length;ce++){qt.index>ce?(Ee=qt,qt=null):Ee=qt.sibling;var Le=nt(K,qt,tt[ce],vt);if(Le===null){qt===null&&(qt=Ee);break}e&&qt&&Le.alternate===null&&n(K,qt),j=d(Le,j,ce),Ue===null?$t=Le:Ue.sibling=Le,Ue=Le,qt=Ee}if(ce===tt.length)return s(K,qt),be&&ca(K,ce),$t;if(qt===null){for(;ce<tt.length;ce++)qt=yt(K,tt[ce],vt),qt!==null&&(j=d(qt,j,ce),Ue===null?$t=qt:Ue.sibling=qt,Ue=qt);return be&&ca(K,ce),$t}for(qt=o(qt);ce<tt.length;ce++)Ee=ct(qt,K,ce,tt[ce],vt),Ee!==null&&(e&&Ee.alternate!==null&&qt.delete(Ee.key===null?ce:Ee.key),j=d(Ee,j,ce),Ue===null?$t=Ee:Ue.sibling=Ee,Ue=Ee);return e&&qt.forEach(function(fr){return n(K,fr)}),be&&ca(K,ce),$t}function ee(K,j,tt,vt){if(tt==null)throw Error(r(151));for(var $t=null,Ue=null,qt=j,ce=j=0,Ee=null,Le=tt.next();qt!==null&&!Le.done;ce++,Le=tt.next()){qt.index>ce?(Ee=qt,qt=null):Ee=qt.sibling;var fr=nt(K,qt,Le.value,vt);if(fr===null){qt===null&&(qt=Ee);break}e&&qt&&fr.alternate===null&&n(K,qt),j=d(fr,j,ce),Ue===null?$t=fr:Ue.sibling=fr,Ue=fr,qt=Ee}if(Le.done)return s(K,qt),be&&ca(K,ce),$t;if(qt===null){for(;!Le.done;ce++,Le=tt.next())Le=yt(K,Le.value,vt),Le!==null&&(j=d(Le,j,ce),Ue===null?$t=Le:Ue.sibling=Le,Ue=Le);return be&&ca(K,ce),$t}for(qt=o(qt);!Le.done;ce++,Le=tt.next())Le=ct(qt,K,ce,Le.value,vt),Le!==null&&(e&&Le.alternate!==null&&qt.delete(Le.key===null?ce:Le.key),j=d(Le,j,ce),Ue===null?$t=Le:Ue.sibling=Le,Ue=Le);return e&&qt.forEach(function(jE){return n(K,jE)}),be&&ca(K,ce),$t}function ke(K,j,tt,vt){if(typeof tt=="object"&&tt!==null&&tt.type===b&&tt.key===null&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case M:t:{for(var $t=tt.key;j!==null;){if(j.key===$t){if($t=tt.type,$t===b){if(j.tag===7){s(K,j.sibling),vt=c(j,tt.props.children),vt.return=K,K=vt;break t}}else if(j.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===X&&Wr($t)===j.type){s(K,j.sibling),vt=c(j,tt.props),_l(vt,tt),vt.return=K,K=vt;break t}s(K,j);break}else n(K,j);j=j.sibling}tt.type===b?(vt=Vr(tt.props.children,K.mode,vt,tt.key),vt.return=K,K=vt):(vt=Uu(tt.type,tt.key,tt.props,null,K.mode,vt),_l(vt,tt),vt.return=K,K=vt)}return S(K);case E:t:{for($t=tt.key;j!==null;){if(j.key===$t)if(j.tag===4&&j.stateNode.containerInfo===tt.containerInfo&&j.stateNode.implementation===tt.implementation){s(K,j.sibling),vt=c(j,tt.children||[]),vt.return=K,K=vt;break t}else{s(K,j);break}else n(K,j);j=j.sibling}vt=eh(tt,K.mode,vt),vt.return=K,K=vt}return S(K);case X:return tt=Wr(tt),ke(K,j,tt,vt)}if(ht(tt))return Gt(K,j,tt,vt);if(ut(tt)){if($t=ut(tt),typeof $t!="function")throw Error(r(150));return tt=$t.call(tt),ee(K,j,tt,vt)}if(typeof tt.then=="function")return ke(K,j,Iu(tt),vt);if(tt.$$typeof===D)return ke(K,j,Ou(K,tt),vt);Bu(K,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,j!==null&&j.tag===6?(s(K,j.sibling),vt=c(j,tt),vt.return=K,K=vt):(s(K,j),vt=th(tt,K.mode,vt),vt.return=K,K=vt),S(K)):s(K,j)}return function(K,j,tt,vt){try{vl=0;var $t=ke(K,j,tt,vt);return ks=null,$t}catch(qt){if(qt===Vs||qt===zu)throw qt;var Ue=ri(29,qt,null,K.mode);return Ue.lanes=vt,Ue.return=K,Ue}finally{}}}var Qr=Zg(!0),Kg=Zg(!1),Ya=!1;function dh(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ph(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Qa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Za(e,n,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Oe&2)!==0){var c=o.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),o.pending=n,n=Du(e),Og(e,null,s),n}return wu(e,o,n,s),Du(e)}function yl(e,n,s){if(n=n.updateQueue,n!==null&&(n=n.shared,(s&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,el(e,s)}}function mh(e,n){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var c=null,d=null;if(s=s.firstBaseUpdate,s!==null){do{var S={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};d===null?c=d=S:d=d.next=S,s=s.next}while(s!==null);d===null?c=d=n:d=d.next=n}else c=d=n;s={baseState:o.baseState,firstBaseUpdate:c,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=n:e.next=n,s.lastBaseUpdate=n}var gh=!1;function xl(){if(gh){var e=Gs;if(e!==null)throw e}}function Sl(e,n,s,o){gh=!1;var c=e.updateQueue;Ya=!1;var d=c.firstBaseUpdate,S=c.lastBaseUpdate,T=c.shared.pending;if(T!==null){c.shared.pending=null;var H=T,et=H.next;H.next=null,S===null?d=et:S.next=et,S=H;var pt=e.alternate;pt!==null&&(pt=pt.updateQueue,T=pt.lastBaseUpdate,T!==S&&(T===null?pt.firstBaseUpdate=et:T.next=et,pt.lastBaseUpdate=H))}if(d!==null){var yt=c.baseState;S=0,pt=et=H=null,T=d;do{var nt=T.lane&-536870913,ct=nt!==T.lane;if(ct?(Me&nt)===nt:(o&nt)===nt){nt!==0&&nt===Hs&&(gh=!0),pt!==null&&(pt=pt.next={lane:0,tag:T.tag,payload:T.payload,callback:null,next:null});t:{var Gt=e,ee=T;nt=n;var ke=s;switch(ee.tag){case 1:if(Gt=ee.payload,typeof Gt=="function"){yt=Gt.call(ke,yt,nt);break t}yt=Gt;break t;case 3:Gt.flags=Gt.flags&-65537|128;case 0:if(Gt=ee.payload,nt=typeof Gt=="function"?Gt.call(ke,yt,nt):Gt,nt==null)break t;yt=v({},yt,nt);break t;case 2:Ya=!0}}nt=T.callback,nt!==null&&(e.flags|=64,ct&&(e.flags|=8192),ct=c.callbacks,ct===null?c.callbacks=[nt]:ct.push(nt))}else ct={lane:nt,tag:T.tag,payload:T.payload,callback:T.callback,next:null},pt===null?(et=pt=ct,H=yt):pt=pt.next=ct,S|=nt;if(T=T.next,T===null){if(T=c.shared.pending,T===null)break;ct=T,T=ct.next,ct.next=null,c.lastBaseUpdate=ct,c.shared.pending=null}}while(!0);pt===null&&(H=yt),c.baseState=H,c.firstBaseUpdate=et,c.lastBaseUpdate=pt,d===null&&(c.shared.lanes=0),er|=S,e.lanes=S,e.memoizedState=yt}}function Jg(e,n){if(typeof e!="function")throw Error(r(191,e));e.call(n)}function $g(e,n){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Jg(s[e],n)}var Xs=P(null),Hu=P(0);function tv(e,n){e=Sa,Et(Hu,e),Et(Xs,n),Sa=e|n.baseLanes}function vh(){Et(Hu,Sa),Et(Xs,Xs.current)}function _h(){Sa=Hu.current,at(Xs),at(Hu)}var si=P(null),Si=null;function Ka(e){var n=e.alternate;Et(on,on.current&1),Et(si,e),Si===null&&(n===null||Xs.current!==null||n.memoizedState!==null)&&(Si=e)}function yh(e){Et(on,on.current),Et(si,e),Si===null&&(Si=e)}function ev(e){e.tag===22?(Et(on,on.current),Et(si,e),Si===null&&(Si=e)):Ja()}function Ja(){Et(on,on.current),Et(si,si.current)}function oi(e){at(si),Si===e&&(Si=null),at(on)}var on=P(0);function Gu(e){for(var n=e;n!==null;){if(n.tag===13){var s=n.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||Td(s)||Ad(s)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var da=0,ue=null,Ge=null,dn=null,Vu=!1,qs=!1,Zr=!1,ku=0,Ml=0,js=null,zM=0;function nn(){throw Error(r(321))}function xh(e,n){if(n===null)return!1;for(var s=0;s<n.length&&s<e.length;s++)if(!ai(e[s],n[s]))return!1;return!0}function Sh(e,n,s,o,c,d){return da=d,ue=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,I.H=e===null||e.memoizedState===null?Iv:zh,Zr=!1,d=s(o,c),Zr=!1,qs&&(d=iv(n,s,o,c)),nv(e),d}function nv(e){I.H=Tl;var n=Ge!==null&&Ge.next!==null;if(da=0,dn=Ge=ue=null,Vu=!1,Ml=0,js=null,n)throw Error(r(300));e===null||pn||(e=e.dependencies,e!==null&&Nu(e)&&(pn=!0))}function iv(e,n,s,o){ue=e;var c=0;do{if(qs&&(js=null),Ml=0,qs=!1,25<=c)throw Error(r(301));if(c+=1,dn=Ge=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}I.H=Bv,d=n(s,o)}while(qs);return d}function FM(){var e=I.H,n=e.useState()[0];return n=typeof n.then=="function"?El(n):n,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(ue.flags|=1024),n}function Mh(){var e=ku!==0;return ku=0,e}function Eh(e,n,s){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~s}function bh(e){if(Vu){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Vu=!1}da=0,dn=Ge=ue=null,qs=!1,Ml=ku=0,js=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dn===null?ue.memoizedState=dn=e:dn=dn.next=e,dn}function ln(){if(Ge===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var n=dn===null?ue.memoizedState:dn.next;if(n!==null)dn=n,Ge=e;else{if(e===null)throw ue.alternate===null?Error(r(467)):Error(r(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},dn===null?ue.memoizedState=dn=e:dn=dn.next=e}return dn}function Xu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function El(e){var n=Ml;return Ml+=1,js===null&&(js=[]),e=Wg(js,e,n),n=ue,(dn===null?n.memoizedState:dn.next)===null&&(n=n.alternate,I.H=n===null||n.memoizedState===null?Iv:zh),e}function qu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return El(e);if(e.$$typeof===D)return Dn(e)}throw Error(r(438,String(e)))}function Th(e){var n=null,s=ue.updateQueue;if(s!==null&&(n=s.memoCache),n==null){var o=ue.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),s===null&&(s=Xu(),ue.updateQueue=s),s.memoCache=n,s=n.data[n.index],s===void 0)for(s=n.data[n.index]=Array(e),o=0;o<e;o++)s[o]=w;return n.index++,s}function pa(e,n){return typeof n=="function"?n(e):n}function ju(e){var n=ln();return Ah(n,Ge,e)}function Ah(e,n,s){var o=e.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=s;var c=e.baseQueue,d=o.pending;if(d!==null){if(c!==null){var S=c.next;c.next=d.next,d.next=S}n.baseQueue=c=d,o.pending=null}if(d=e.baseState,c===null)e.memoizedState=d;else{n=c.next;var T=S=null,H=null,et=n,pt=!1;do{var yt=et.lane&-536870913;if(yt!==et.lane?(Me&yt)===yt:(da&yt)===yt){var nt=et.revertLane;if(nt===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null}),yt===Hs&&(pt=!0);else if((da&nt)===nt){et=et.next,nt===Hs&&(pt=!0);continue}else yt={lane:0,revertLane:et.revertLane,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},H===null?(T=H=yt,S=d):H=H.next=yt,ue.lanes|=nt,er|=nt;yt=et.action,Zr&&s(d,yt),d=et.hasEagerState?et.eagerState:s(d,yt)}else nt={lane:yt,revertLane:et.revertLane,gesture:et.gesture,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},H===null?(T=H=nt,S=d):H=H.next=nt,ue.lanes|=yt,er|=yt;et=et.next}while(et!==null&&et!==n);if(H===null?S=d:H.next=T,!ai(d,e.memoizedState)&&(pn=!0,pt&&(s=Gs,s!==null)))throw s;e.memoizedState=d,e.baseState=S,e.baseQueue=H,o.lastRenderedState=d}return c===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Rh(e){var n=ln(),s=n.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=e;var o=s.dispatch,c=s.pending,d=n.memoizedState;if(c!==null){s.pending=null;var S=c=c.next;do d=e(d,S.action),S=S.next;while(S!==c);ai(d,n.memoizedState)||(pn=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),s.lastRenderedState=d}return[d,o]}function av(e,n,s){var o=ue,c=ln(),d=be;if(d){if(s===void 0)throw Error(r(407));s=s()}else s=n();var S=!ai((Ge||c).memoizedState,s);if(S&&(c.memoizedState=s,pn=!0),c=c.queue,Dh(ov.bind(null,o,c,e),[e]),c.getSnapshot!==n||S||dn!==null&&dn.memoizedState.tag&1){if(o.flags|=2048,Ws(9,{destroy:void 0},sv.bind(null,o,c,s,n),null),je===null)throw Error(r(349));d||(da&127)!==0||rv(o,n,s)}return s}function rv(e,n,s){e.flags|=16384,e={getSnapshot:n,value:s},n=ue.updateQueue,n===null?(n=Xu(),ue.updateQueue=n,n.stores=[e]):(s=n.stores,s===null?n.stores=[e]:s.push(e))}function sv(e,n,s,o){n.value=s,n.getSnapshot=o,lv(n)&&uv(e)}function ov(e,n,s){return s(function(){lv(n)&&uv(e)})}function lv(e){var n=e.getSnapshot;e=e.value;try{var s=n();return!ai(e,s)}catch{return!0}}function uv(e){var n=Gr(e,2);n!==null&&Kn(n,e,2)}function Ch(e){var n=Vn();if(typeof e=="function"){var s=e;if(e=s(),Zr){zt(!0);try{s()}finally{zt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:e},n}function cv(e,n,s,o){return e.baseState=s,Ah(e,Ge,typeof o=="function"?o:pa)}function IM(e,n,s,o,c){if(Qu(e))throw Error(r(485));if(e=n.action,e!==null){var d={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){d.listeners.push(S)}};I.T!==null?s(!0):d.isTransition=!1,o(d),s=n.pending,s===null?(d.next=n.pending=d,fv(n,d)):(d.next=s.next,n.pending=s.next=d)}}function fv(e,n){var s=n.action,o=n.payload,c=e.state;if(n.isTransition){var d=I.T,S={};I.T=S;try{var T=s(c,o),H=I.S;H!==null&&H(S,T),hv(e,n,T)}catch(et){wh(e,n,et)}finally{d!==null&&S.types!==null&&(d.types=S.types),I.T=d}}else try{d=s(c,o),hv(e,n,d)}catch(et){wh(e,n,et)}}function hv(e,n,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){dv(e,n,o)},function(o){return wh(e,n,o)}):dv(e,n,s)}function dv(e,n,s){n.status="fulfilled",n.value=s,pv(n),e.state=s,n=e.pending,n!==null&&(s=n.next,s===n?e.pending=null:(s=s.next,n.next=s,fv(e,s)))}function wh(e,n,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=s,pv(n),n=n.next;while(n!==o)}e.action=null}function pv(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function mv(e,n){return n}function gv(e,n){if(be){var s=je.formState;if(s!==null){t:{var o=ue;if(be){if(Qe){e:{for(var c=Qe,d=xi;c.nodeType!==8;){if(!d){c=null;break e}if(c=Mi(c.nextSibling),c===null){c=null;break e}}d=c.data,c=d==="F!"||d==="F"?c:null}if(c){Qe=Mi(c.nextSibling),o=c.data==="F!";break t}}ja(o)}o=!1}o&&(n=s[0])}}return s=Vn(),s.memoizedState=s.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mv,lastRenderedState:n},s.queue=o,s=Pv.bind(null,ue,o),o.dispatch=s,o=Ch(!1),d=Ph.bind(null,ue,!1,o.queue),o=Vn(),c={state:n,dispatch:null,action:e,pending:null},o.queue=c,s=IM.bind(null,ue,c,d,s),c.dispatch=s,o.memoizedState=e,[n,s,!1]}function vv(e){var n=ln();return _v(n,Ge,e)}function _v(e,n,s){if(n=Ah(e,n,mv)[0],e=ju(pa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=El(n)}catch(S){throw S===Vs?zu:S}else o=n;n=ln();var c=n.queue,d=c.dispatch;return s!==n.memoizedState&&(ue.flags|=2048,Ws(9,{destroy:void 0},BM.bind(null,c,s),null)),[o,d,e]}function BM(e,n){e.action=n}function yv(e){var n=ln(),s=Ge;if(s!==null)return _v(n,s,e);ln(),n=n.memoizedState,s=ln();var o=s.queue.dispatch;return s.memoizedState=e,[n,o,!1]}function Ws(e,n,s,o){return e={tag:e,create:s,deps:o,inst:n,next:null},n=ue.updateQueue,n===null&&(n=Xu(),ue.updateQueue=n),s=n.lastEffect,s===null?n.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,n.lastEffect=e),e}function xv(){return ln().memoizedState}function Wu(e,n,s,o){var c=Vn();ue.flags|=e,c.memoizedState=Ws(1|n,{destroy:void 0},s,o===void 0?null:o)}function Yu(e,n,s,o){var c=ln();o=o===void 0?null:o;var d=c.memoizedState.inst;Ge!==null&&o!==null&&xh(o,Ge.memoizedState.deps)?c.memoizedState=Ws(n,d,s,o):(ue.flags|=e,c.memoizedState=Ws(1|n,d,s,o))}function Sv(e,n){Wu(8390656,8,e,n)}function Dh(e,n){Yu(2048,8,e,n)}function HM(e){ue.flags|=4;var n=ue.updateQueue;if(n===null)n=Xu(),ue.updateQueue=n,n.events=[e];else{var s=n.events;s===null?n.events=[e]:s.push(e)}}function Mv(e){var n=ln().memoizedState;return HM({ref:n,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Ev(e,n){return Yu(4,2,e,n)}function bv(e,n){return Yu(4,4,e,n)}function Tv(e,n){if(typeof n=="function"){e=e();var s=n(e);return function(){typeof s=="function"?s():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Av(e,n,s){s=s!=null?s.concat([e]):null,Yu(4,4,Tv.bind(null,n,e),s)}function Uh(){}function Rv(e,n){var s=ln();n=n===void 0?null:n;var o=s.memoizedState;return n!==null&&xh(n,o[1])?o[0]:(s.memoizedState=[e,n],e)}function Cv(e,n){var s=ln();n=n===void 0?null:n;var o=s.memoizedState;if(n!==null&&xh(n,o[1]))return o[0];if(o=e(),Zr){zt(!0);try{e()}finally{zt(!1)}}return s.memoizedState=[o,n],o}function Lh(e,n,s){return s===void 0||(da&1073741824)!==0&&(Me&261930)===0?e.memoizedState=n:(e.memoizedState=s,e=w_(),ue.lanes|=e,er|=e,s)}function wv(e,n,s,o){return ai(s,n)?s:Xs.current!==null?(e=Lh(e,s,o),ai(e,n)||(pn=!0),e):(da&42)===0||(da&1073741824)!==0&&(Me&261930)===0?(pn=!0,e.memoizedState=s):(e=w_(),ue.lanes|=e,er|=e,n)}function Dv(e,n,s,o,c){var d=B.p;B.p=d!==0&&8>d?d:8;var S=I.T,T={};I.T=T,Ph(e,!1,n,s);try{var H=c(),et=I.S;if(et!==null&&et(T,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var pt=PM(H,o);bl(e,n,pt,ci(e))}else bl(e,n,o,ci(e))}catch(yt){bl(e,n,{then:function(){},status:"rejected",reason:yt},ci())}finally{B.p=d,S!==null&&T.types!==null&&(S.types=T.types),I.T=S}}function GM(){}function Nh(e,n,s,o){if(e.tag!==5)throw Error(r(476));var c=Uv(e).queue;Dv(e,c,n,W,s===null?GM:function(){return Lv(e),s(o)})}function Uv(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:W,baseState:W,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:W},next:null};var s={};return n.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:s},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Lv(e){var n=Uv(e);n.next===null&&(n=e.alternate.memoizedState),bl(e,n.next.queue,{},ci())}function Oh(){return Dn(Gl)}function Nv(){return ln().memoizedState}function Ov(){return ln().memoizedState}function VM(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var s=ci();e=Qa(s);var o=Za(n,e,s);o!==null&&(Kn(o,n,s),yl(o,n,s)),n={cache:uh()},e.payload=n;return}n=n.return}}function kM(e,n,s){var o=ci();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Qu(e)?zv(n,s):(s=Jf(e,n,s,o),s!==null&&(Kn(s,e,o),Fv(s,n,o)))}function Pv(e,n,s){var o=ci();bl(e,n,s,o)}function bl(e,n,s,o){var c={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Qu(e))zv(n,c);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var S=n.lastRenderedState,T=d(S,s);if(c.hasEagerState=!0,c.eagerState=T,ai(T,S))return wu(e,n,c,0),je===null&&Cu(),!1}catch{}finally{}if(s=Jf(e,n,c,o),s!==null)return Kn(s,e,o),Fv(s,n,o),!0}return!1}function Ph(e,n,s,o){if(o={lane:2,revertLane:dd(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Qu(e)){if(n)throw Error(r(479))}else n=Jf(e,s,o,2),n!==null&&Kn(n,e,2)}function Qu(e){var n=e.alternate;return e===ue||n!==null&&n===ue}function zv(e,n){qs=Vu=!0;var s=e.pending;s===null?n.next=n:(n.next=s.next,s.next=n),e.pending=n}function Fv(e,n,s){if((s&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,el(e,s)}}var Tl={readContext:Dn,use:qu,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};Tl.useEffectEvent=nn;var Iv={readContext:Dn,use:qu,useCallback:function(e,n){return Vn().memoizedState=[e,n===void 0?null:n],e},useContext:Dn,useEffect:Sv,useImperativeHandle:function(e,n,s){s=s!=null?s.concat([e]):null,Wu(4194308,4,Tv.bind(null,n,e),s)},useLayoutEffect:function(e,n){return Wu(4194308,4,e,n)},useInsertionEffect:function(e,n){Wu(4,2,e,n)},useMemo:function(e,n){var s=Vn();n=n===void 0?null:n;var o=e();if(Zr){zt(!0);try{e()}finally{zt(!1)}}return s.memoizedState=[o,n],o},useReducer:function(e,n,s){var o=Vn();if(s!==void 0){var c=s(n);if(Zr){zt(!0);try{s(n)}finally{zt(!1)}}}else c=n;return o.memoizedState=o.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},o.queue=e,e=e.dispatch=kM.bind(null,ue,e),[o.memoizedState,e]},useRef:function(e){var n=Vn();return e={current:e},n.memoizedState=e},useState:function(e){e=Ch(e);var n=e.queue,s=Pv.bind(null,ue,n);return n.dispatch=s,[e.memoizedState,s]},useDebugValue:Uh,useDeferredValue:function(e,n){var s=Vn();return Lh(s,e,n)},useTransition:function(){var e=Ch(!1);return e=Dv.bind(null,ue,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,s){var o=ue,c=Vn();if(be){if(s===void 0)throw Error(r(407));s=s()}else{if(s=n(),je===null)throw Error(r(349));(Me&127)!==0||rv(o,n,s)}c.memoizedState=s;var d={value:s,getSnapshot:n};return c.queue=d,Sv(ov.bind(null,o,d,e),[e]),o.flags|=2048,Ws(9,{destroy:void 0},sv.bind(null,o,d,s,n),null),s},useId:function(){var e=Vn(),n=je.identifierPrefix;if(be){var s=Yi,o=Wi;s=(o&~(1<<32-ne(o)-1)).toString(32)+s,n="_"+n+"R_"+s,s=ku++,0<s&&(n+="H"+s.toString(32)),n+="_"}else s=zM++,n="_"+n+"r_"+s.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Oh,useFormState:gv,useActionState:gv,useOptimistic:function(e){var n=Vn();n.memoizedState=n.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=s,n=Ph.bind(null,ue,!0,s),s.dispatch=n,[e,n]},useMemoCache:Th,useCacheRefresh:function(){return Vn().memoizedState=VM.bind(null,ue)},useEffectEvent:function(e){var n=Vn(),s={impl:e};return n.memoizedState=s,function(){if((Oe&2)!==0)throw Error(r(440));return s.impl.apply(void 0,arguments)}}},zh={readContext:Dn,use:qu,useCallback:Rv,useContext:Dn,useEffect:Dh,useImperativeHandle:Av,useInsertionEffect:Ev,useLayoutEffect:bv,useMemo:Cv,useReducer:ju,useRef:xv,useState:function(){return ju(pa)},useDebugValue:Uh,useDeferredValue:function(e,n){var s=ln();return wv(s,Ge.memoizedState,e,n)},useTransition:function(){var e=ju(pa)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:El(e),n]},useSyncExternalStore:av,useId:Nv,useHostTransitionStatus:Oh,useFormState:vv,useActionState:vv,useOptimistic:function(e,n){var s=ln();return cv(s,Ge,e,n)},useMemoCache:Th,useCacheRefresh:Ov};zh.useEffectEvent=Mv;var Bv={readContext:Dn,use:qu,useCallback:Rv,useContext:Dn,useEffect:Dh,useImperativeHandle:Av,useInsertionEffect:Ev,useLayoutEffect:bv,useMemo:Cv,useReducer:Rh,useRef:xv,useState:function(){return Rh(pa)},useDebugValue:Uh,useDeferredValue:function(e,n){var s=ln();return Ge===null?Lh(s,e,n):wv(s,Ge.memoizedState,e,n)},useTransition:function(){var e=Rh(pa)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:El(e),n]},useSyncExternalStore:av,useId:Nv,useHostTransitionStatus:Oh,useFormState:yv,useActionState:yv,useOptimistic:function(e,n){var s=ln();return Ge!==null?cv(s,Ge,e,n):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:Th,useCacheRefresh:Ov};Bv.useEffectEvent=Mv;function Fh(e,n,s,o){n=e.memoizedState,s=s(o,n),s=s==null?n:v({},n,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Ih={enqueueSetState:function(e,n,s){e=e._reactInternals;var o=ci(),c=Qa(o);c.payload=n,s!=null&&(c.callback=s),n=Za(e,c,o),n!==null&&(Kn(n,e,o),yl(n,e,o))},enqueueReplaceState:function(e,n,s){e=e._reactInternals;var o=ci(),c=Qa(o);c.tag=1,c.payload=n,s!=null&&(c.callback=s),n=Za(e,c,o),n!==null&&(Kn(n,e,o),yl(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var s=ci(),o=Qa(s);o.tag=2,n!=null&&(o.callback=n),n=Za(e,o,s),n!==null&&(Kn(n,e,s),yl(n,e,s))}};function Hv(e,n,s,o,c,d,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,d,S):n.prototype&&n.prototype.isPureReactComponent?!fl(s,o)||!fl(c,d):!0}function Gv(e,n,s,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(s,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(s,o),n.state!==e&&Ih.enqueueReplaceState(n,n.state,null)}function Kr(e,n){var s=n;if("ref"in n){s={};for(var o in n)o!=="ref"&&(s[o]=n[o])}if(e=e.defaultProps){s===n&&(s=v({},s));for(var c in e)s[c]===void 0&&(s[c]=e[c])}return s}function Vv(e){Ru(e)}function kv(e){console.error(e)}function Xv(e){Ru(e)}function Zu(e,n){try{var s=e.onUncaughtError;s(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function qv(e,n,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Bh(e,n,s){return s=Qa(s),s.tag=3,s.payload={element:null},s.callback=function(){Zu(e,n)},s}function jv(e){return e=Qa(e),e.tag=3,e}function Wv(e,n,s,o){var c=s.type.getDerivedStateFromError;if(typeof c=="function"){var d=o.value;e.payload=function(){return c(d)},e.callback=function(){qv(n,s,o)}}var S=s.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(e.callback=function(){qv(n,s,o),typeof c!="function"&&(nr===null?nr=new Set([this]):nr.add(this));var T=o.stack;this.componentDidCatch(o.value,{componentStack:T!==null?T:""})})}function XM(e,n,s,o,c){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=s.alternate,n!==null&&Bs(n,s,c,!0),s=si.current,s!==null){switch(s.tag){case 31:case 13:return Si===null?lc():s.alternate===null&&an===0&&(an=3),s.flags&=-257,s.flags|=65536,s.lanes=c,o===Fu?s.flags|=16384:(n=s.updateQueue,n===null?s.updateQueue=new Set([o]):n.add(o),cd(e,o,c)),!1;case 22:return s.flags|=65536,o===Fu?s.flags|=16384:(n=s.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=n):(s=n.retryQueue,s===null?n.retryQueue=new Set([o]):s.add(o)),cd(e,o,c)),!1}throw Error(r(435,s.tag))}return cd(e,o,c),lc(),!1}if(be)return n=si.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,o!==ah&&(e=Error(r(422),{cause:o}),pl(vi(e,s)))):(o!==ah&&(n=Error(r(423),{cause:o}),pl(vi(n,s))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,o=vi(o,s),c=Bh(e.stateNode,o,c),mh(e,c),an!==4&&(an=2)),!1;var d=Error(r(520),{cause:o});if(d=vi(d,s),Nl===null?Nl=[d]:Nl.push(d),an!==4&&(an=2),n===null)return!0;o=vi(o,s),s=n;do{switch(s.tag){case 3:return s.flags|=65536,e=c&-c,s.lanes|=e,e=Bh(s.stateNode,o,e),mh(s,e),!1;case 1:if(n=s.type,d=s.stateNode,(s.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(nr===null||!nr.has(d))))return s.flags|=65536,c&=-c,s.lanes|=c,c=jv(c),Wv(c,e,s,o),mh(s,c),!1}s=s.return}while(s!==null);return!1}var Hh=Error(r(461)),pn=!1;function Un(e,n,s,o){n.child=e===null?Kg(n,null,s,o):Qr(n,e.child,s,o)}function Yv(e,n,s,o,c){s=s.render;var d=n.ref;if("ref"in o){var S={};for(var T in o)T!=="ref"&&(S[T]=o[T])}else S=o;return qr(n),o=Sh(e,n,s,S,d,c),T=Mh(),e!==null&&!pn?(Eh(e,n,c),ma(e,n,c)):(be&&T&&nh(n),n.flags|=1,Un(e,n,o,c),n.child)}function Qv(e,n,s,o,c){if(e===null){var d=s.type;return typeof d=="function"&&!$f(d)&&d.defaultProps===void 0&&s.compare===null?(n.tag=15,n.type=d,Zv(e,n,d,o,c)):(e=Uu(s.type,null,o,n,n.mode,c),e.ref=n.ref,e.return=n,n.child=e)}if(d=e.child,!Yh(e,c)){var S=d.memoizedProps;if(s=s.compare,s=s!==null?s:fl,s(S,o)&&e.ref===n.ref)return ma(e,n,c)}return n.flags|=1,e=ua(d,o),e.ref=n.ref,e.return=n,n.child=e}function Zv(e,n,s,o,c){if(e!==null){var d=e.memoizedProps;if(fl(d,o)&&e.ref===n.ref)if(pn=!1,n.pendingProps=o=d,Yh(e,c))(e.flags&131072)!==0&&(pn=!0);else return n.lanes=e.lanes,ma(e,n,c)}return Gh(e,n,s,o,c)}function Kv(e,n,s,o){var c=o.children,d=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|s:s,e!==null){for(o=n.child=e.child,c=0;o!==null;)c=c|o.lanes|o.childLanes,o=o.sibling;o=c&~d}else o=0,n.child=null;return Jv(e,n,d,s,o)}if((s&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Pu(n,d!==null?d.cachePool:null),d!==null?tv(n,d):vh(),ev(n);else return o=n.lanes=536870912,Jv(e,n,d!==null?d.baseLanes|s:s,s,o)}else d!==null?(Pu(n,d.cachePool),tv(n,d),Ja(),n.memoizedState=null):(e!==null&&Pu(n,null),vh(),Ja());return Un(e,n,c,s),n.child}function Al(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Jv(e,n,s,o,c){var d=fh();return d=d===null?null:{parent:hn._currentValue,pool:d},n.memoizedState={baseLanes:s,cachePool:d},e!==null&&Pu(n,null),vh(),ev(n),e!==null&&Bs(e,n,o,!0),n.childLanes=c,null}function Ku(e,n){return n=$u({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function $v(e,n,s){return Qr(n,e.child,null,s),e=Ku(n,n.pendingProps),e.flags|=2,oi(n),n.memoizedState=null,e}function qM(e,n,s){var o=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(be){if(o.mode==="hidden")return e=Ku(n,o),n.lanes=536870912,Al(null,e);if(yh(n),(e=Qe)?(e=f0(e,xi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Xa!==null?{id:Wi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=zg(e),s.return=n,n.child=s,wn=n,Qe=null)):e=null,e===null)throw ja(n);return n.lanes=536870912,null}return Ku(n,o)}var d=e.memoizedState;if(d!==null){var S=d.dehydrated;if(yh(n),c)if(n.flags&256)n.flags&=-257,n=$v(e,n,s);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(r(558));else if(pn||Bs(e,n,s,!1),c=(s&e.childLanes)!==0,pn||c){if(o=je,o!==null&&(S=qi(o,s),S!==0&&S!==d.retryLane))throw d.retryLane=S,Gr(e,S),Kn(o,e,S),Hh;lc(),n=$v(e,n,s)}else e=d.treeContext,Qe=Mi(S.nextSibling),wn=n,be=!0,qa=null,xi=!1,e!==null&&Bg(n,e),n=Ku(n,o),n.flags|=4096;return n}return e=ua(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Ju(e,n){var s=n.ref;if(s===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(r(284));(e===null||e.ref!==s)&&(n.flags|=4194816)}}function Gh(e,n,s,o,c){return qr(n),s=Sh(e,n,s,o,void 0,c),o=Mh(),e!==null&&!pn?(Eh(e,n,c),ma(e,n,c)):(be&&o&&nh(n),n.flags|=1,Un(e,n,s,c),n.child)}function t_(e,n,s,o,c,d){return qr(n),n.updateQueue=null,s=iv(n,o,s,c),nv(e),o=Mh(),e!==null&&!pn?(Eh(e,n,d),ma(e,n,d)):(be&&o&&nh(n),n.flags|=1,Un(e,n,s,d),n.child)}function e_(e,n,s,o,c){if(qr(n),n.stateNode===null){var d=Ps,S=s.contextType;typeof S=="object"&&S!==null&&(d=Dn(S)),d=new s(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Ih,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},dh(n),S=s.contextType,d.context=typeof S=="object"&&S!==null?Dn(S):Ps,d.state=n.memoizedState,S=s.getDerivedStateFromProps,typeof S=="function"&&(Fh(n,s,S,o),d.state=n.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(S=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),S!==d.state&&Ih.enqueueReplaceState(d,d.state,null),Sl(n,o,d,c),xl(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){d=n.stateNode;var T=n.memoizedProps,H=Kr(s,T);d.props=H;var et=d.context,pt=s.contextType;S=Ps,typeof pt=="object"&&pt!==null&&(S=Dn(pt));var yt=s.getDerivedStateFromProps;pt=typeof yt=="function"||typeof d.getSnapshotBeforeUpdate=="function",T=n.pendingProps!==T,pt||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(T||et!==S)&&Gv(n,d,o,S),Ya=!1;var nt=n.memoizedState;d.state=nt,Sl(n,o,d,c),xl(),et=n.memoizedState,T||nt!==et||Ya?(typeof yt=="function"&&(Fh(n,s,yt,o),et=n.memoizedState),(H=Ya||Hv(n,s,H,o,nt,et,S))?(pt||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=et),d.props=o,d.state=et,d.context=S,o=H):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,ph(e,n),S=n.memoizedProps,pt=Kr(s,S),d.props=pt,yt=n.pendingProps,nt=d.context,et=s.contextType,H=Ps,typeof et=="object"&&et!==null&&(H=Dn(et)),T=s.getDerivedStateFromProps,(et=typeof T=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(S!==yt||nt!==H)&&Gv(n,d,o,H),Ya=!1,nt=n.memoizedState,d.state=nt,Sl(n,o,d,c),xl();var ct=n.memoizedState;S!==yt||nt!==ct||Ya||e!==null&&e.dependencies!==null&&Nu(e.dependencies)?(typeof T=="function"&&(Fh(n,s,T,o),ct=n.memoizedState),(pt=Ya||Hv(n,s,pt,o,nt,ct,H)||e!==null&&e.dependencies!==null&&Nu(e.dependencies))?(et||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,ct,H),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,ct,H)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ct),d.props=o,d.state=ct,d.context=H,o=pt):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),o=!1)}return d=o,Ju(e,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,e!==null&&o?(n.child=Qr(n,e.child,null,c),n.child=Qr(n,null,s,c)):Un(e,n,s,c),n.memoizedState=d.state,e=n.child):e=ma(e,n,c),e}function n_(e,n,s,o){return kr(),n.flags|=256,Un(e,n,s,o),n.child}var Vh={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function kh(e){return{baseLanes:e,cachePool:qg()}}function Xh(e,n,s){return e=e!==null?e.childLanes&~s:0,n&&(e|=ui),e}function i_(e,n,s){var o=n.pendingProps,c=!1,d=(n.flags&128)!==0,S;if((S=d)||(S=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),S&&(c=!0,n.flags&=-129),S=(n.flags&32)!==0,n.flags&=-33,e===null){if(be){if(c?Ka(n):Ja(),(e=Qe)?(e=f0(e,xi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Xa!==null?{id:Wi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=zg(e),s.return=n,n.child=s,wn=n,Qe=null)):e=null,e===null)throw ja(n);return Ad(e)?n.lanes=32:n.lanes=536870912,null}var T=o.children;return o=o.fallback,c?(Ja(),c=n.mode,T=$u({mode:"hidden",children:T},c),o=Vr(o,c,s,null),T.return=n,o.return=n,T.sibling=o,n.child=T,o=n.child,o.memoizedState=kh(s),o.childLanes=Xh(e,S,s),n.memoizedState=Vh,Al(null,o)):(Ka(n),qh(n,T))}var H=e.memoizedState;if(H!==null&&(T=H.dehydrated,T!==null)){if(d)n.flags&256?(Ka(n),n.flags&=-257,n=jh(e,n,s)):n.memoizedState!==null?(Ja(),n.child=e.child,n.flags|=128,n=null):(Ja(),T=o.fallback,c=n.mode,o=$u({mode:"visible",children:o.children},c),T=Vr(T,c,s,null),T.flags|=2,o.return=n,T.return=n,o.sibling=T,n.child=o,Qr(n,e.child,null,s),o=n.child,o.memoizedState=kh(s),o.childLanes=Xh(e,S,s),n.memoizedState=Vh,n=Al(null,o));else if(Ka(n),Ad(T)){if(S=T.nextSibling&&T.nextSibling.dataset,S)var et=S.dgst;S=et,o=Error(r(419)),o.stack="",o.digest=S,pl({value:o,source:null,stack:null}),n=jh(e,n,s)}else if(pn||Bs(e,n,s,!1),S=(s&e.childLanes)!==0,pn||S){if(S=je,S!==null&&(o=qi(S,s),o!==0&&o!==H.retryLane))throw H.retryLane=o,Gr(e,o),Kn(S,e,o),Hh;Td(T)||lc(),n=jh(e,n,s)}else Td(T)?(n.flags|=192,n.child=e.child,n=null):(e=H.treeContext,Qe=Mi(T.nextSibling),wn=n,be=!0,qa=null,xi=!1,e!==null&&Bg(n,e),n=qh(n,o.children),n.flags|=4096);return n}return c?(Ja(),T=o.fallback,c=n.mode,H=e.child,et=H.sibling,o=ua(H,{mode:"hidden",children:o.children}),o.subtreeFlags=H.subtreeFlags&65011712,et!==null?T=ua(et,T):(T=Vr(T,c,s,null),T.flags|=2),T.return=n,o.return=n,o.sibling=T,n.child=o,Al(null,o),o=n.child,T=e.child.memoizedState,T===null?T=kh(s):(c=T.cachePool,c!==null?(H=hn._currentValue,c=c.parent!==H?{parent:H,pool:H}:c):c=qg(),T={baseLanes:T.baseLanes|s,cachePool:c}),o.memoizedState=T,o.childLanes=Xh(e,S,s),n.memoizedState=Vh,Al(e.child,o)):(Ka(n),s=e.child,e=s.sibling,s=ua(s,{mode:"visible",children:o.children}),s.return=n,s.sibling=null,e!==null&&(S=n.deletions,S===null?(n.deletions=[e],n.flags|=16):S.push(e)),n.child=s,n.memoizedState=null,s)}function qh(e,n){return n=$u({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function $u(e,n){return e=ri(22,e,null,n),e.lanes=0,e}function jh(e,n,s){return Qr(n,e.child,null,s),e=qh(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function a_(e,n,s){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),oh(e.return,n,s)}function Wh(e,n,s,o,c,d){var S=e.memoizedState;S===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:c,treeForkCount:d}:(S.isBackwards=n,S.rendering=null,S.renderingStartTime=0,S.last=o,S.tail=s,S.tailMode=c,S.treeForkCount=d)}function r_(e,n,s){var o=n.pendingProps,c=o.revealOrder,d=o.tail;o=o.children;var S=on.current,T=(S&2)!==0;if(T?(S=S&1|2,n.flags|=128):S&=1,Et(on,S),Un(e,n,o,s),o=be?dl:0,!T&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&a_(e,s,n);else if(e.tag===19)a_(e,s,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(s=n.child,c=null;s!==null;)e=s.alternate,e!==null&&Gu(e)===null&&(c=s),s=s.sibling;s=c,s===null?(c=n.child,n.child=null):(c=s.sibling,s.sibling=null),Wh(n,!1,c,s,d,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,c=n.child,n.child=null;c!==null;){if(e=c.alternate,e!==null&&Gu(e)===null){n.child=c;break}e=c.sibling,c.sibling=s,s=c,c=e}Wh(n,!0,s,null,d,o);break;case"together":Wh(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ma(e,n,s){if(e!==null&&(n.dependencies=e.dependencies),er|=n.lanes,(s&n.childLanes)===0)if(e!==null){if(Bs(e,n,s,!1),(s&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(r(153));if(n.child!==null){for(e=n.child,s=ua(e,e.pendingProps),n.child=s,s.return=n;e.sibling!==null;)e=e.sibling,s=s.sibling=ua(e,e.pendingProps),s.return=n;s.sibling=null}return n.child}function Yh(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Nu(e)))}function jM(e,n,s){switch(n.tag){case 3:Xt(n,n.stateNode.containerInfo),Wa(n,hn,e.memoizedState.cache),kr();break;case 27:case 5:se(n);break;case 4:Xt(n,n.stateNode.containerInfo);break;case 10:Wa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,yh(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Ka(n),n.flags|=128,null):(s&n.child.childLanes)!==0?i_(e,n,s):(Ka(n),e=ma(e,n,s),e!==null?e.sibling:null);Ka(n);break;case 19:var c=(e.flags&128)!==0;if(o=(s&n.childLanes)!==0,o||(Bs(e,n,s,!1),o=(s&n.childLanes)!==0),c){if(o)return r_(e,n,s);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Et(on,on.current),o)break;return null;case 22:return n.lanes=0,Kv(e,n,s,n.pendingProps);case 24:Wa(n,hn,e.memoizedState.cache)}return ma(e,n,s)}function s_(e,n,s){if(e!==null)if(e.memoizedProps!==n.pendingProps)pn=!0;else{if(!Yh(e,s)&&(n.flags&128)===0)return pn=!1,jM(e,n,s);pn=(e.flags&131072)!==0}else pn=!1,be&&(n.flags&1048576)!==0&&Ig(n,dl,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Wr(n.elementType),n.type=e,typeof e=="function")$f(e)?(o=Kr(e,o),n.tag=1,n=e_(null,n,e,o,s)):(n.tag=0,n=Gh(null,n,e,o,s));else{if(e!=null){var c=e.$$typeof;if(c===R){n.tag=11,n=Yv(null,n,e,o,s);break t}else if(c===N){n.tag=14,n=Qv(null,n,e,o,s);break t}}throw n=mt(e)||e,Error(r(306,n,""))}}return n;case 0:return Gh(e,n,n.type,n.pendingProps,s);case 1:return o=n.type,c=Kr(o,n.pendingProps),e_(e,n,o,c,s);case 3:t:{if(Xt(n,n.stateNode.containerInfo),e===null)throw Error(r(387));o=n.pendingProps;var d=n.memoizedState;c=d.element,ph(e,n),Sl(n,o,null,s);var S=n.memoizedState;if(o=S.cache,Wa(n,hn,o),o!==d.cache&&lh(n,[hn],s,!0),xl(),o=S.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:S.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=n_(e,n,o,s);break t}else if(o!==c){c=vi(Error(r(424)),n),pl(c),n=n_(e,n,o,s);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Qe=Mi(e.firstChild),wn=n,be=!0,qa=null,xi=!0,s=Kg(n,null,o,s),n.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(kr(),o===c){n=ma(e,n,s);break t}Un(e,n,o,s)}n=n.child}return n;case 26:return Ju(e,n),e===null?(s=v0(n.type,null,n.pendingProps,null))?n.memoizedState=s:be||(s=n.type,e=n.pendingProps,o=mc(At.current).createElement(s),o[en]=n,o[Cn]=e,Ln(o,s,e),St(o),n.stateNode=o):n.memoizedState=v0(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return se(n),e===null&&be&&(o=n.stateNode=p0(n.type,n.pendingProps,At.current),wn=n,xi=!0,c=Qe,sr(n.type)?(Rd=c,Qe=Mi(o.firstChild)):Qe=c),Un(e,n,n.pendingProps.children,s),Ju(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&be&&((c=o=Qe)&&(o=ME(o,n.type,n.pendingProps,xi),o!==null?(n.stateNode=o,wn=n,Qe=Mi(o.firstChild),xi=!1,c=!0):c=!1),c||ja(n)),se(n),c=n.type,d=n.pendingProps,S=e!==null?e.memoizedProps:null,o=d.children,Md(c,d)?o=null:S!==null&&Md(c,S)&&(n.flags|=32),n.memoizedState!==null&&(c=Sh(e,n,FM,null,null,s),Gl._currentValue=c),Ju(e,n),Un(e,n,o,s),n.child;case 6:return e===null&&be&&((e=s=Qe)&&(s=EE(s,n.pendingProps,xi),s!==null?(n.stateNode=s,wn=n,Qe=null,e=!0):e=!1),e||ja(n)),null;case 13:return i_(e,n,s);case 4:return Xt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=Qr(n,null,o,s):Un(e,n,o,s),n.child;case 11:return Yv(e,n,n.type,n.pendingProps,s);case 7:return Un(e,n,n.pendingProps,s),n.child;case 8:return Un(e,n,n.pendingProps.children,s),n.child;case 12:return Un(e,n,n.pendingProps.children,s),n.child;case 10:return o=n.pendingProps,Wa(n,n.type,o.value),Un(e,n,o.children,s),n.child;case 9:return c=n.type._context,o=n.pendingProps.children,qr(n),c=Dn(c),o=o(c),n.flags|=1,Un(e,n,o,s),n.child;case 14:return Qv(e,n,n.type,n.pendingProps,s);case 15:return Zv(e,n,n.type,n.pendingProps,s);case 19:return r_(e,n,s);case 31:return qM(e,n,s);case 22:return Kv(e,n,s,n.pendingProps);case 24:return qr(n),o=Dn(hn),e===null?(c=fh(),c===null&&(c=je,d=uh(),c.pooledCache=d,d.refCount++,d!==null&&(c.pooledCacheLanes|=s),c=d),n.memoizedState={parent:o,cache:c},dh(n),Wa(n,hn,c)):((e.lanes&s)!==0&&(ph(e,n),Sl(n,null,null,s),xl()),c=e.memoizedState,d=n.memoizedState,c.parent!==o?(c={parent:o,cache:o},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Wa(n,hn,o)):(o=d.cache,Wa(n,hn,o),o!==c.cache&&lh(n,[hn],s,!0))),Un(e,n,n.pendingProps.children,s),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function ga(e){e.flags|=4}function Qh(e,n,s,o,c){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(N_())e.flags|=8192;else throw Yr=Fu,hh}else e.flags&=-16777217}function o_(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!M0(n))if(N_())e.flags|=8192;else throw Yr=Fu,hh}function tc(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?vn():536870912,e.lanes|=n,Ks|=n)}function Rl(e,n){if(!be)switch(e.tailMode){case"hidden":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ze(e){var n=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(n)for(var c=e.child;c!==null;)s|=c.lanes|c.childLanes,o|=c.subtreeFlags&65011712,o|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)s|=c.lanes|c.childLanes,o|=c.subtreeFlags,o|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=o,e.childLanes=s,n}function WM(e,n,s){var o=n.pendingProps;switch(ih(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(n),null;case 1:return Ze(n),null;case 3:return s=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ha(hn),Vt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Is(n)?ga(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,rh())),Ze(n),null;case 26:var c=n.type,d=n.memoizedState;return e===null?(ga(n),d!==null?(Ze(n),o_(n,d)):(Ze(n),Qh(n,c,null,o,s))):d?d!==e.memoizedState?(ga(n),Ze(n),o_(n,d)):(Ze(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ga(n),Ze(n),Qh(n,c,e,o,s)),null;case 27:if(Be(n),s=At.current,c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ga(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Ze(n),null}e=J.current,Is(n)?Hg(n):(e=p0(c,o,s),n.stateNode=e,ga(n))}return Ze(n),null;case 5:if(Be(n),c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ga(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Ze(n),null}if(d=J.current,Is(n))Hg(n);else{var S=mc(At.current);switch(d){case 1:d=S.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:d=S.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":d=S.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":d=S.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":d=S.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?S.createElement("select",{is:o.is}):S.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?S.createElement(c,{is:o.is}):S.createElement(c)}}d[en]=n,d[Cn]=o;t:for(S=n.child;S!==null;){if(S.tag===5||S.tag===6)d.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===n)break t;for(;S.sibling===null;){if(S.return===null||S.return===n)break t;S=S.return}S.sibling.return=S.return,S=S.sibling}n.stateNode=d;t:switch(Ln(d,c,o),c){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ga(n)}}return Ze(n),Qh(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,s),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ga(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(e=At.current,Is(n)){if(e=n.stateNode,s=n.memoizedProps,o=null,c=wn,c!==null)switch(c.tag){case 27:case 5:o=c.memoizedProps}e[en]=n,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||i0(e.nodeValue,s)),e||ja(n,!0)}else e=mc(e).createTextNode(o),e[en]=n,n.stateNode=e}return Ze(n),null;case 31:if(s=n.memoizedState,e===null||e.memoizedState!==null){if(o=Is(n),s!==null){if(e===null){if(!o)throw Error(r(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[en]=n}else kr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),e=!1}else s=rh(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return n.flags&256?(oi(n),n):(oi(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Ze(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=Is(n),o!==null&&o.dehydrated!==null){if(e===null){if(!c)throw Error(r(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(r(317));c[en]=n}else kr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),c=!1}else c=rh(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(oi(n),n):(oi(n),null)}return oi(n),(n.flags&128)!==0?(n.lanes=s,n):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=n.child,c=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(c=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==c&&(o.flags|=2048)),s!==e&&s&&(n.child.flags|=8192),tc(n,n.updateQueue),Ze(n),null);case 4:return Vt(),e===null&&vd(n.stateNode.containerInfo),Ze(n),null;case 10:return ha(n.type),Ze(n),null;case 19:if(at(on),o=n.memoizedState,o===null)return Ze(n),null;if(c=(n.flags&128)!==0,d=o.rendering,d===null)if(c)Rl(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(d=Gu(e),d!==null){for(n.flags|=128,Rl(o,!1),e=d.updateQueue,n.updateQueue=e,tc(n,e),n.subtreeFlags=0,e=s,s=n.child;s!==null;)Pg(s,e),s=s.sibling;return Et(on,on.current&1|2),be&&ca(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&gt()>rc&&(n.flags|=128,c=!0,Rl(o,!1),n.lanes=4194304)}else{if(!c)if(e=Gu(d),e!==null){if(n.flags|=128,c=!0,e=e.updateQueue,n.updateQueue=e,tc(n,e),Rl(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!be)return Ze(n),null}else 2*gt()-o.renderingStartTime>rc&&s!==536870912&&(n.flags|=128,c=!0,Rl(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(e=o.last,e!==null?e.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=gt(),e.sibling=null,s=on.current,Et(on,c?s&1|2:s&1),be&&ca(n,o.treeForkCount),e):(Ze(n),null);case 22:case 23:return oi(n),_h(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(s&536870912)!==0&&(n.flags&128)===0&&(Ze(n),n.subtreeFlags&6&&(n.flags|=8192)):Ze(n),s=n.updateQueue,s!==null&&tc(n,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==s&&(n.flags|=2048),e!==null&&at(jr),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),ha(hn),Ze(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function YM(e,n){switch(ih(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ha(hn),Vt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Be(n),null;case 31:if(n.memoizedState!==null){if(oi(n),n.alternate===null)throw Error(r(340));kr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(oi(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(r(340));kr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return at(on),null;case 4:return Vt(),null;case 10:return ha(n.type),null;case 22:case 23:return oi(n),_h(),e!==null&&at(jr),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ha(hn),null;case 25:return null;default:return null}}function l_(e,n){switch(ih(n),n.tag){case 3:ha(hn),Vt();break;case 26:case 27:case 5:Be(n);break;case 4:Vt();break;case 31:n.memoizedState!==null&&oi(n);break;case 13:oi(n);break;case 19:at(on);break;case 10:ha(n.type);break;case 22:case 23:oi(n),_h(),e!==null&&at(jr);break;case 24:ha(hn)}}function Cl(e,n){try{var s=n.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var c=o.next;s=c;do{if((s.tag&e)===e){o=void 0;var d=s.create,S=s.inst;o=d(),S.destroy=o}s=s.next}while(s!==c)}}catch(T){Ie(n,n.return,T)}}function $a(e,n,s){try{var o=n.updateQueue,c=o!==null?o.lastEffect:null;if(c!==null){var d=c.next;o=d;do{if((o.tag&e)===e){var S=o.inst,T=S.destroy;if(T!==void 0){S.destroy=void 0,c=n;var H=s,et=T;try{et()}catch(pt){Ie(c,H,pt)}}}o=o.next}while(o!==d)}}catch(pt){Ie(n,n.return,pt)}}function u_(e){var n=e.updateQueue;if(n!==null){var s=e.stateNode;try{$g(n,s)}catch(o){Ie(e,e.return,o)}}}function c_(e,n,s){s.props=Kr(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){Ie(e,n,o)}}function wl(e,n){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(c){Ie(e,n,c)}}function Qi(e,n){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(c){Ie(e,n,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(c){Ie(e,n,c)}else s.current=null}function f_(e){var n=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(c){Ie(e,e.return,c)}}function Zh(e,n,s){try{var o=e.stateNode;gE(o,e.type,s,n),o[Cn]=n}catch(c){Ie(e,e.return,c)}}function h_(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&sr(e.type)||e.tag===4}function Kh(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||h_(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&sr(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Jh(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,n):(n=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,n.appendChild(e),s=s._reactRootContainer,s!=null||n.onclick!==null||(n.onclick=oa));else if(o!==4&&(o===27&&sr(e.type)&&(s=e.stateNode,n=null),e=e.child,e!==null))for(Jh(e,n,s),e=e.sibling;e!==null;)Jh(e,n,s),e=e.sibling}function ec(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?s.insertBefore(e,n):s.appendChild(e);else if(o!==4&&(o===27&&sr(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(ec(e,n,s),e=e.sibling;e!==null;)ec(e,n,s),e=e.sibling}function d_(e){var n=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);Ln(n,o,s),n[en]=e,n[Cn]=s}catch(d){Ie(e,e.return,d)}}var va=!1,mn=!1,$h=!1,p_=typeof WeakSet=="function"?WeakSet:Set,bn=null;function QM(e,n){if(e=e.containerInfo,xd=Mc,e=Ag(e),jf(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var c=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{s.nodeType,d.nodeType}catch{s=null;break t}var S=0,T=-1,H=-1,et=0,pt=0,yt=e,nt=null;e:for(;;){for(var ct;yt!==s||c!==0&&yt.nodeType!==3||(T=S+c),yt!==d||o!==0&&yt.nodeType!==3||(H=S+o),yt.nodeType===3&&(S+=yt.nodeValue.length),(ct=yt.firstChild)!==null;)nt=yt,yt=ct;for(;;){if(yt===e)break e;if(nt===s&&++et===c&&(T=S),nt===d&&++pt===o&&(H=S),(ct=yt.nextSibling)!==null)break;yt=nt,nt=yt.parentNode}yt=ct}s=T===-1||H===-1?null:{start:T,end:H}}else s=null}s=s||{start:0,end:0}}else s=null;for(Sd={focusedElem:e,selectionRange:s},Mc=!1,bn=n;bn!==null;)if(n=bn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,bn=e;else for(;bn!==null;){switch(n=bn,d=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)c=e[s],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,s=n,c=d.memoizedProps,d=d.memoizedState,o=s.stateNode;try{var Gt=Kr(s.type,c);e=o.getSnapshotBeforeUpdate(Gt,d),o.__reactInternalSnapshotBeforeUpdate=e}catch(ee){Ie(s,s.return,ee)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,s=e.nodeType,s===9)bd(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":bd(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=n.sibling,e!==null){e.return=n.return,bn=e;break}bn=n.return}}function m_(e,n,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:ya(e,s),o&4&&Cl(5,s);break;case 1:if(ya(e,s),o&4)if(e=s.stateNode,n===null)try{e.componentDidMount()}catch(S){Ie(s,s.return,S)}else{var c=Kr(s.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(c,n,e.__reactInternalSnapshotBeforeUpdate)}catch(S){Ie(s,s.return,S)}}o&64&&u_(s),o&512&&wl(s,s.return);break;case 3:if(ya(e,s),o&64&&(e=s.updateQueue,e!==null)){if(n=null,s.child!==null)switch(s.child.tag){case 27:case 5:n=s.child.stateNode;break;case 1:n=s.child.stateNode}try{$g(e,n)}catch(S){Ie(s,s.return,S)}}break;case 27:n===null&&o&4&&d_(s);case 26:case 5:ya(e,s),n===null&&o&4&&f_(s),o&512&&wl(s,s.return);break;case 12:ya(e,s);break;case 31:ya(e,s),o&4&&__(e,s);break;case 13:ya(e,s),o&4&&y_(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=aE.bind(null,s),bE(e,s))));break;case 22:if(o=s.memoizedState!==null||va,!o){n=n!==null&&n.memoizedState!==null||mn,c=va;var d=mn;va=o,(mn=n)&&!d?xa(e,s,(s.subtreeFlags&8772)!==0):ya(e,s),va=c,mn=d}break;case 30:break;default:ya(e,s)}}function g_(e){var n=e.alternate;n!==null&&(e.alternate=null,g_(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&C(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,Wn=!1;function _a(e,n,s){for(s=s.child;s!==null;)v_(e,n,s),s=s.sibling}function v_(e,n,s){if(Wt&&typeof Wt.onCommitFiberUnmount=="function")try{Wt.onCommitFiberUnmount(Kt,s)}catch{}switch(s.tag){case 26:mn||Qi(s,n),_a(e,n,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:mn||Qi(s,n);var o=$e,c=Wn;sr(s.type)&&($e=s.stateNode,Wn=!1),_a(e,n,s),Il(s.stateNode),$e=o,Wn=c;break;case 5:mn||Qi(s,n);case 6:if(o=$e,c=Wn,$e=null,_a(e,n,s),$e=o,Wn=c,$e!==null)if(Wn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(s.stateNode)}catch(d){Ie(s,n,d)}else try{$e.removeChild(s.stateNode)}catch(d){Ie(s,n,d)}break;case 18:$e!==null&&(Wn?(e=$e,u0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),ro(e)):u0($e,s.stateNode));break;case 4:o=$e,c=Wn,$e=s.stateNode.containerInfo,Wn=!0,_a(e,n,s),$e=o,Wn=c;break;case 0:case 11:case 14:case 15:$a(2,s,n),mn||$a(4,s,n),_a(e,n,s);break;case 1:mn||(Qi(s,n),o=s.stateNode,typeof o.componentWillUnmount=="function"&&c_(s,n,o)),_a(e,n,s);break;case 21:_a(e,n,s);break;case 22:mn=(o=mn)||s.memoizedState!==null,_a(e,n,s),mn=o;break;default:_a(e,n,s)}}function __(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ro(e)}catch(s){Ie(n,n.return,s)}}}function y_(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ro(e)}catch(s){Ie(n,n.return,s)}}function ZM(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new p_),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new p_),n;default:throw Error(r(435,e.tag))}}function nc(e,n){var s=ZM(e);n.forEach(function(o){if(!s.has(o)){s.add(o);var c=rE.bind(null,e,o);o.then(c,c)}})}function Yn(e,n){var s=n.deletions;if(s!==null)for(var o=0;o<s.length;o++){var c=s[o],d=e,S=n,T=S;t:for(;T!==null;){switch(T.tag){case 27:if(sr(T.type)){$e=T.stateNode,Wn=!1;break t}break;case 5:$e=T.stateNode,Wn=!1;break t;case 3:case 4:$e=T.stateNode.containerInfo,Wn=!0;break t}T=T.return}if($e===null)throw Error(r(160));v_(d,S,c),$e=null,Wn=!1,d=c.alternate,d!==null&&(d.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)x_(n,e),n=n.sibling}var Ni=null;function x_(e,n){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Yn(n,e),Qn(e),o&4&&($a(3,e,e.return),Cl(3,e),$a(5,e,e.return));break;case 1:Yn(n,e),Qn(e),o&512&&(mn||s===null||Qi(s,s.return)),o&64&&va&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var c=Ni;if(Yn(n,e),Qn(e),o&512&&(mn||s===null||Qi(s,s.return)),o&4){var d=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,c=c.ownerDocument||c;e:switch(o){case"title":d=c.getElementsByTagName("title")[0],(!d||d[zr]||d[en]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=c.createElement(o),c.head.insertBefore(d,c.querySelector("head > title"))),Ln(d,o,s),d[en]=e,St(d),o=d;break t;case"link":var S=x0("link","href",c).get(o+(s.href||""));if(S){for(var T=0;T<S.length;T++)if(d=S[T],d.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&d.getAttribute("rel")===(s.rel==null?null:s.rel)&&d.getAttribute("title")===(s.title==null?null:s.title)&&d.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){S.splice(T,1);break e}}d=c.createElement(o),Ln(d,o,s),c.head.appendChild(d);break;case"meta":if(S=x0("meta","content",c).get(o+(s.content||""))){for(T=0;T<S.length;T++)if(d=S[T],d.getAttribute("content")===(s.content==null?null:""+s.content)&&d.getAttribute("name")===(s.name==null?null:s.name)&&d.getAttribute("property")===(s.property==null?null:s.property)&&d.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&d.getAttribute("charset")===(s.charSet==null?null:s.charSet)){S.splice(T,1);break e}}d=c.createElement(o),Ln(d,o,s),c.head.appendChild(d);break;default:throw Error(r(468,o))}d[en]=e,St(d),o=d}e.stateNode=o}else S0(c,e.type,e.stateNode);else e.stateNode=y0(c,o,e.memoizedProps);else d!==o?(d===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):d.count--,o===null?S0(c,e.type,e.stateNode):y0(c,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Zh(e,e.memoizedProps,s.memoizedProps)}break;case 27:Yn(n,e),Qn(e),o&512&&(mn||s===null||Qi(s,s.return)),s!==null&&o&4&&Zh(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Yn(n,e),Qn(e),o&512&&(mn||s===null||Qi(s,s.return)),e.flags&32){c=e.stateNode;try{Cs(c,"")}catch(Gt){Ie(e,e.return,Gt)}}o&4&&e.stateNode!=null&&(c=e.memoizedProps,Zh(e,c,s!==null?s.memoizedProps:c)),o&1024&&($h=!0);break;case 6:if(Yn(n,e),Qn(e),o&4){if(e.stateNode===null)throw Error(r(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(Gt){Ie(e,e.return,Gt)}}break;case 3:if(_c=null,c=Ni,Ni=gc(n.containerInfo),Yn(n,e),Ni=c,Qn(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{ro(n.containerInfo)}catch(Gt){Ie(e,e.return,Gt)}$h&&($h=!1,S_(e));break;case 4:o=Ni,Ni=gc(e.stateNode.containerInfo),Yn(n,e),Qn(e),Ni=o;break;case 12:Yn(n,e),Qn(e);break;case 31:Yn(n,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,nc(e,o)));break;case 13:Yn(n,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(ac=gt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,nc(e,o)));break;case 22:c=e.memoizedState!==null;var H=s!==null&&s.memoizedState!==null,et=va,pt=mn;if(va=et||c,mn=pt||H,Yn(n,e),mn=pt,va=et,Qn(e),o&8192)t:for(n=e.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(s===null||H||va||mn||Jr(e)),s=null,n=e;;){if(n.tag===5||n.tag===26){if(s===null){H=s=n;try{if(d=H.stateNode,c)S=d.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{T=H.stateNode;var yt=H.memoizedProps.style,nt=yt!=null&&yt.hasOwnProperty("display")?yt.display:null;T.style.display=nt==null||typeof nt=="boolean"?"":(""+nt).trim()}}catch(Gt){Ie(H,H.return,Gt)}}}else if(n.tag===6){if(s===null){H=n;try{H.stateNode.nodeValue=c?"":H.memoizedProps}catch(Gt){Ie(H,H.return,Gt)}}}else if(n.tag===18){if(s===null){H=n;try{var ct=H.stateNode;c?c0(ct,!0):c0(H.stateNode,!1)}catch(Gt){Ie(H,H.return,Gt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;s===n&&(s=null),n=n.return}s===n&&(s=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,nc(e,s))));break;case 19:Yn(n,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,nc(e,o)));break;case 30:break;case 21:break;default:Yn(n,e),Qn(e)}}function Qn(e){var n=e.flags;if(n&2){try{for(var s,o=e.return;o!==null;){if(h_(o)){s=o;break}o=o.return}if(s==null)throw Error(r(160));switch(s.tag){case 27:var c=s.stateNode,d=Kh(e);ec(e,d,c);break;case 5:var S=s.stateNode;s.flags&32&&(Cs(S,""),s.flags&=-33);var T=Kh(e);ec(e,T,S);break;case 3:case 4:var H=s.stateNode.containerInfo,et=Kh(e);Jh(e,et,H);break;default:throw Error(r(161))}}catch(pt){Ie(e,e.return,pt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function S_(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;S_(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ya(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)m_(e,n.alternate,n),n=n.sibling}function Jr(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:$a(4,n,n.return),Jr(n);break;case 1:Qi(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&c_(n,n.return,s),Jr(n);break;case 27:Il(n.stateNode);case 26:case 5:Qi(n,n.return),Jr(n);break;case 22:n.memoizedState===null&&Jr(n);break;case 30:Jr(n);break;default:Jr(n)}e=e.sibling}}function xa(e,n,s){for(s=s&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,c=e,d=n,S=d.flags;switch(d.tag){case 0:case 11:case 15:xa(c,d,s),Cl(4,d);break;case 1:if(xa(c,d,s),o=d,c=o.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(et){Ie(o,o.return,et)}if(o=d,c=o.updateQueue,c!==null){var T=o.stateNode;try{var H=c.shared.hiddenCallbacks;if(H!==null)for(c.shared.hiddenCallbacks=null,c=0;c<H.length;c++)Jg(H[c],T)}catch(et){Ie(o,o.return,et)}}s&&S&64&&u_(d),wl(d,d.return);break;case 27:d_(d);case 26:case 5:xa(c,d,s),s&&o===null&&S&4&&f_(d),wl(d,d.return);break;case 12:xa(c,d,s);break;case 31:xa(c,d,s),s&&S&4&&__(c,d);break;case 13:xa(c,d,s),s&&S&4&&y_(c,d);break;case 22:d.memoizedState===null&&xa(c,d,s),wl(d,d.return);break;case 30:break;default:xa(c,d,s)}n=n.sibling}}function td(e,n){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&ml(s))}function ed(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&ml(e))}function Oi(e,n,s,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)M_(e,n,s,o),n=n.sibling}function M_(e,n,s,o){var c=n.flags;switch(n.tag){case 0:case 11:case 15:Oi(e,n,s,o),c&2048&&Cl(9,n);break;case 1:Oi(e,n,s,o);break;case 3:Oi(e,n,s,o),c&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&ml(e)));break;case 12:if(c&2048){Oi(e,n,s,o),e=n.stateNode;try{var d=n.memoizedProps,S=d.id,T=d.onPostCommit;typeof T=="function"&&T(S,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(H){Ie(n,n.return,H)}}else Oi(e,n,s,o);break;case 31:Oi(e,n,s,o);break;case 13:Oi(e,n,s,o);break;case 23:break;case 22:d=n.stateNode,S=n.alternate,n.memoizedState!==null?d._visibility&2?Oi(e,n,s,o):Dl(e,n):d._visibility&2?Oi(e,n,s,o):(d._visibility|=2,Ys(e,n,s,o,(n.subtreeFlags&10256)!==0||!1)),c&2048&&td(S,n);break;case 24:Oi(e,n,s,o),c&2048&&ed(n.alternate,n);break;default:Oi(e,n,s,o)}}function Ys(e,n,s,o,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=e,S=n,T=s,H=o,et=S.flags;switch(S.tag){case 0:case 11:case 15:Ys(d,S,T,H,c),Cl(8,S);break;case 23:break;case 22:var pt=S.stateNode;S.memoizedState!==null?pt._visibility&2?Ys(d,S,T,H,c):Dl(d,S):(pt._visibility|=2,Ys(d,S,T,H,c)),c&&et&2048&&td(S.alternate,S);break;case 24:Ys(d,S,T,H,c),c&&et&2048&&ed(S.alternate,S);break;default:Ys(d,S,T,H,c)}n=n.sibling}}function Dl(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var s=e,o=n,c=o.flags;switch(o.tag){case 22:Dl(s,o),c&2048&&td(o.alternate,o);break;case 24:Dl(s,o),c&2048&&ed(o.alternate,o);break;default:Dl(s,o)}n=n.sibling}}var Ul=8192;function Qs(e,n,s){if(e.subtreeFlags&Ul)for(e=e.child;e!==null;)E_(e,n,s),e=e.sibling}function E_(e,n,s){switch(e.tag){case 26:Qs(e,n,s),e.flags&Ul&&e.memoizedState!==null&&zE(s,Ni,e.memoizedState,e.memoizedProps);break;case 5:Qs(e,n,s);break;case 3:case 4:var o=Ni;Ni=gc(e.stateNode.containerInfo),Qs(e,n,s),Ni=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Ul,Ul=16777216,Qs(e,n,s),Ul=o):Qs(e,n,s));break;default:Qs(e,n,s)}}function b_(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Ll(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];bn=o,A_(o,e)}b_(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)T_(e),e=e.sibling}function T_(e){switch(e.tag){case 0:case 11:case 15:Ll(e),e.flags&2048&&$a(9,e,e.return);break;case 3:Ll(e);break;case 12:Ll(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,ic(e)):Ll(e);break;default:Ll(e)}}function ic(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];bn=o,A_(o,e)}b_(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:$a(8,n,n.return),ic(n);break;case 22:s=n.stateNode,s._visibility&2&&(s._visibility&=-3,ic(n));break;default:ic(n)}e=e.sibling}}function A_(e,n){for(;bn!==null;){var s=bn;switch(s.tag){case 0:case 11:case 15:$a(8,s,n);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:ml(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,bn=o;else t:for(s=e;bn!==null;){o=bn;var c=o.sibling,d=o.return;if(g_(o),o===s){bn=null;break t}if(c!==null){c.return=d,bn=c;break t}bn=d}}}var KM={getCacheForType:function(e){var n=Dn(hn),s=n.data.get(e);return s===void 0&&(s=e(),n.data.set(e,s)),s},cacheSignal:function(){return Dn(hn).controller.signal}},JM=typeof WeakMap=="function"?WeakMap:Map,Oe=0,je=null,ve=null,Me=0,Fe=0,li=null,tr=!1,Zs=!1,nd=!1,Sa=0,an=0,er=0,$r=0,id=0,ui=0,Ks=0,Nl=null,Zn=null,ad=!1,ac=0,R_=0,rc=1/0,sc=null,nr=null,yn=0,ir=null,Js=null,Ma=0,rd=0,sd=null,C_=null,Ol=0,od=null;function ci(){return(Oe&2)!==0&&Me!==0?Me&-Me:I.T!==null?dd():nl()}function w_(){if(ui===0)if((Me&536870912)===0||be){var e=ft;ft<<=1,(ft&3932160)===0&&(ft=262144),ui=e}else ui=536870912;return e=si.current,e!==null&&(e.flags|=32),ui}function Kn(e,n,s){(e===je&&(Fe===2||Fe===9)||e.cancelPendingCommit!==null)&&($s(e,0),ar(e,Me,ui,!1)),Rn(e,s),((Oe&2)===0||e!==je)&&(e===je&&((Oe&2)===0&&($r|=s),an===4&&ar(e,Me,ui,!1)),Zi(e))}function D_(e,n,s){if((Oe&6)!==0)throw Error(r(327));var o=!s&&(n&127)===0&&(n&e.expiredLanes)===0||ie(e,n),c=o?eE(e,n):ud(e,n,!0),d=o;do{if(c===0){Zs&&!o&&ar(e,n,0,!1);break}else{if(s=e.current.alternate,d&&!$M(s)){c=ud(e,n,!1),d=!1;continue}if(c===2){if(d=n,e.errorRecoveryDisabledLanes&d)var S=0;else S=e.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){n=S;t:{var T=e;c=Nl;var H=T.current.memoizedState.isDehydrated;if(H&&($s(T,S).flags|=256),S=ud(T,S,!1),S!==2){if(nd&&!H){T.errorRecoveryDisabledLanes|=d,$r|=d,c=4;break t}d=Zn,Zn=c,d!==null&&(Zn===null?Zn=d:Zn.push.apply(Zn,d))}c=S}if(d=!1,c!==2)continue}}if(c===1){$s(e,0),ar(e,n,0,!0);break}t:{switch(o=e,d=c,d){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:ar(o,n,ui,!tr);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(c=ac+300-gt(),10<c)){if(ar(o,n,ui,!tr),Lt(o,0,!0)!==0)break t;Ma=n,o.timeoutHandle=o0(U_.bind(null,o,s,Zn,sc,ad,n,ui,$r,Ks,tr,d,"Throttled",-0,0),c);break t}U_(o,s,Zn,sc,ad,n,ui,$r,Ks,tr,d,null,-0,0)}}break}while(!0);Zi(e)}function U_(e,n,s,o,c,d,S,T,H,et,pt,yt,nt,ct){if(e.timeoutHandle=-1,yt=n.subtreeFlags,yt&8192||(yt&16785408)===16785408){yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:oa},E_(n,d,yt);var Gt=(d&62914560)===d?ac-gt():(d&4194048)===d?R_-gt():0;if(Gt=FE(yt,Gt),Gt!==null){Ma=d,e.cancelPendingCommit=Gt(B_.bind(null,e,n,d,s,o,c,S,T,H,pt,yt,null,nt,ct)),ar(e,d,S,!et);return}}B_(e,n,d,s,o,c,S,T,H)}function $M(e){for(var n=e;;){var s=n.tag;if((s===0||s===11||s===15)&&n.flags&16384&&(s=n.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var c=s[o],d=c.getSnapshot;c=c.value;try{if(!ai(d(),c))return!1}catch{return!1}}if(s=n.child,n.subtreeFlags&16384&&s!==null)s.return=n,n=s;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ar(e,n,s,o){n&=~id,n&=~$r,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var c=n;0<c;){var d=31-ne(c),S=1<<d;o[d]=-1,c&=~S}s!==0&&tl(e,s,n)}function oc(){return(Oe&6)===0?(Pl(0),!1):!0}function ld(){if(ve!==null){if(Fe===0)var e=ve.return;else e=ve,fa=Xr=null,bh(e),ks=null,vl=0,e=ve;for(;e!==null;)l_(e.alternate,e),e=e.return;ve=null}}function $s(e,n){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,yE(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),Ma=0,ld(),je=e,ve=s=ua(e.current,null),Me=n,Fe=0,li=null,tr=!1,Zs=ie(e,n),nd=!1,Ks=ui=id=$r=er=an=0,Zn=Nl=null,ad=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var c=31-ne(o),d=1<<c;n|=e[c],o&=~d}return Sa=n,Cu(),s}function L_(e,n){ue=null,I.H=Tl,n===Vs||n===zu?(n=Yg(),Fe=3):n===hh?(n=Yg(),Fe=4):Fe=n===Hh?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,li=n,ve===null&&(an=1,Zu(e,vi(n,e.current)))}function N_(){var e=si.current;return e===null?!0:(Me&4194048)===Me?Si===null:(Me&62914560)===Me||(Me&536870912)!==0?e===Si:!1}function O_(){var e=I.H;return I.H=Tl,e===null?Tl:e}function P_(){var e=I.A;return I.A=KM,e}function lc(){an=4,tr||(Me&4194048)!==Me&&si.current!==null||(Zs=!0),(er&134217727)===0&&($r&134217727)===0||je===null||ar(je,Me,ui,!1)}function ud(e,n,s){var o=Oe;Oe|=2;var c=O_(),d=P_();(je!==e||Me!==n)&&(sc=null,$s(e,n)),n=!1;var S=an;t:do try{if(Fe!==0&&ve!==null){var T=ve,H=li;switch(Fe){case 8:ld(),S=6;break t;case 3:case 2:case 9:case 6:si.current===null&&(n=!0);var et=Fe;if(Fe=0,li=null,to(e,T,H,et),s&&Zs){S=0;break t}break;default:et=Fe,Fe=0,li=null,to(e,T,H,et)}}tE(),S=an;break}catch(pt){L_(e,pt)}while(!0);return n&&e.shellSuspendCounter++,fa=Xr=null,Oe=o,I.H=c,I.A=d,ve===null&&(je=null,Me=0,Cu()),S}function tE(){for(;ve!==null;)z_(ve)}function eE(e,n){var s=Oe;Oe|=2;var o=O_(),c=P_();je!==e||Me!==n?(sc=null,rc=gt()+500,$s(e,n)):Zs=ie(e,n);t:do try{if(Fe!==0&&ve!==null){n=ve;var d=li;e:switch(Fe){case 1:Fe=0,li=null,to(e,n,d,1);break;case 2:case 9:if(jg(d)){Fe=0,li=null,F_(n);break}n=function(){Fe!==2&&Fe!==9||je!==e||(Fe=7),Zi(e)},d.then(n,n);break t;case 3:Fe=7;break t;case 4:Fe=5;break t;case 7:jg(d)?(Fe=0,li=null,F_(n)):(Fe=0,li=null,to(e,n,d,7));break;case 5:var S=null;switch(ve.tag){case 26:S=ve.memoizedState;case 5:case 27:var T=ve;if(S?M0(S):T.stateNode.complete){Fe=0,li=null;var H=T.sibling;if(H!==null)ve=H;else{var et=T.return;et!==null?(ve=et,uc(et)):ve=null}break e}}Fe=0,li=null,to(e,n,d,5);break;case 6:Fe=0,li=null,to(e,n,d,6);break;case 8:ld(),an=6;break t;default:throw Error(r(462))}}nE();break}catch(pt){L_(e,pt)}while(!0);return fa=Xr=null,I.H=o,I.A=c,Oe=s,ve!==null?0:(je=null,Me=0,Cu(),an)}function nE(){for(;ve!==null&&!A();)z_(ve)}function z_(e){var n=s_(e.alternate,e,Sa);e.memoizedProps=e.pendingProps,n===null?uc(e):ve=n}function F_(e){var n=e,s=n.alternate;switch(n.tag){case 15:case 0:n=t_(s,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=t_(s,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:bh(n);default:l_(s,n),n=ve=Pg(n,Sa),n=s_(s,n,Sa)}e.memoizedProps=e.pendingProps,n===null?uc(e):ve=n}function to(e,n,s,o){fa=Xr=null,bh(n),ks=null,vl=0;var c=n.return;try{if(XM(e,c,n,s,Me)){an=1,Zu(e,vi(s,e.current)),ve=null;return}}catch(d){if(c!==null)throw ve=c,d;an=1,Zu(e,vi(s,e.current)),ve=null;return}n.flags&32768?(be||o===1?e=!0:Zs||(Me&536870912)!==0?e=!1:(tr=e=!0,(o===2||o===9||o===3||o===6)&&(o=si.current,o!==null&&o.tag===13&&(o.flags|=16384))),I_(n,e)):uc(n)}function uc(e){var n=e;do{if((n.flags&32768)!==0){I_(n,tr);return}e=n.return;var s=WM(n.alternate,n,Sa);if(s!==null){ve=s;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=e}while(n!==null);an===0&&(an=5)}function I_(e,n){do{var s=YM(e.alternate,e);if(s!==null){s.flags&=32767,ve=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!n&&(e=e.sibling,e!==null)){ve=e;return}ve=e=s}while(e!==null);an=6,ve=null}function B_(e,n,s,o,c,d,S,T,H){e.cancelPendingCommit=null;do cc();while(yn!==0);if((Oe&6)!==0)throw Error(r(327));if(n!==null){if(n===e.current)throw Error(r(177));if(d=n.lanes|n.childLanes,d|=Kf,Di(e,s,d,S,T,H),e===je&&(ve=je=null,Me=0),Js=n,ir=e,Ma=s,rd=d,sd=c,C_=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,sE(Ut,function(){return X_(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=I.T,I.T=null,c=B.p,B.p=2,S=Oe,Oe|=4;try{QM(e,n,s)}finally{Oe=S,B.p=c,I.T=o}}yn=1,H_(),G_(),V_()}}function H_(){if(yn===1){yn=0;var e=ir,n=Js,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=I.T,I.T=null;var o=B.p;B.p=2;var c=Oe;Oe|=4;try{x_(n,e);var d=Sd,S=Ag(e.containerInfo),T=d.focusedElem,H=d.selectionRange;if(S!==T&&T&&T.ownerDocument&&Tg(T.ownerDocument.documentElement,T)){if(H!==null&&jf(T)){var et=H.start,pt=H.end;if(pt===void 0&&(pt=et),"selectionStart"in T)T.selectionStart=et,T.selectionEnd=Math.min(pt,T.value.length);else{var yt=T.ownerDocument||document,nt=yt&&yt.defaultView||window;if(nt.getSelection){var ct=nt.getSelection(),Gt=T.textContent.length,ee=Math.min(H.start,Gt),ke=H.end===void 0?ee:Math.min(H.end,Gt);!ct.extend&&ee>ke&&(S=ke,ke=ee,ee=S);var K=bg(T,ee),j=bg(T,ke);if(K&&j&&(ct.rangeCount!==1||ct.anchorNode!==K.node||ct.anchorOffset!==K.offset||ct.focusNode!==j.node||ct.focusOffset!==j.offset)){var tt=yt.createRange();tt.setStart(K.node,K.offset),ct.removeAllRanges(),ee>ke?(ct.addRange(tt),ct.extend(j.node,j.offset)):(tt.setEnd(j.node,j.offset),ct.addRange(tt))}}}}for(yt=[],ct=T;ct=ct.parentNode;)ct.nodeType===1&&yt.push({element:ct,left:ct.scrollLeft,top:ct.scrollTop});for(typeof T.focus=="function"&&T.focus(),T=0;T<yt.length;T++){var vt=yt[T];vt.element.scrollLeft=vt.left,vt.element.scrollTop=vt.top}}Mc=!!xd,Sd=xd=null}finally{Oe=c,B.p=o,I.T=s}}e.current=n,yn=2}}function G_(){if(yn===2){yn=0;var e=ir,n=Js,s=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||s){s=I.T,I.T=null;var o=B.p;B.p=2;var c=Oe;Oe|=4;try{m_(e,n.alternate,n)}finally{Oe=c,B.p=o,I.T=s}}yn=3}}function V_(){if(yn===4||yn===3){yn=0,it();var e=ir,n=Js,s=Ma,o=C_;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?yn=5:(yn=0,Js=ir=null,k_(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(nr=null),As(s),n=n.stateNode,Wt&&typeof Wt.onCommitFiberRoot=="function")try{Wt.onCommitFiberRoot(Kt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=I.T,c=B.p,B.p=2,I.T=null;try{for(var d=e.onRecoverableError,S=0;S<o.length;S++){var T=o[S];d(T.value,{componentStack:T.stack})}}finally{I.T=n,B.p=c}}(Ma&3)!==0&&cc(),Zi(e),c=e.pendingLanes,(s&261930)!==0&&(c&42)!==0?e===od?Ol++:(Ol=0,od=e):Ol=0,Pl(0)}}function k_(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,ml(n)))}function cc(){return H_(),G_(),V_(),X_()}function X_(){if(yn!==5)return!1;var e=ir,n=rd;rd=0;var s=As(Ma),o=I.T,c=B.p;try{B.p=32>s?32:s,I.T=null,s=sd,sd=null;var d=ir,S=Ma;if(yn=0,Js=ir=null,Ma=0,(Oe&6)!==0)throw Error(r(331));var T=Oe;if(Oe|=4,T_(d.current),M_(d,d.current,S,s),Oe=T,Pl(0,!1),Wt&&typeof Wt.onPostCommitFiberRoot=="function")try{Wt.onPostCommitFiberRoot(Kt,d)}catch{}return!0}finally{B.p=c,I.T=o,k_(e,n)}}function q_(e,n,s){n=vi(s,n),n=Bh(e.stateNode,n,2),e=Za(e,n,2),e!==null&&(Rn(e,2),Zi(e))}function Ie(e,n,s){if(e.tag===3)q_(e,e,s);else for(;n!==null;){if(n.tag===3){q_(n,e,s);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(nr===null||!nr.has(o))){e=vi(s,e),s=jv(2),o=Za(n,s,2),o!==null&&(Wv(s,o,n,e),Rn(o,2),Zi(o));break}}n=n.return}}function cd(e,n,s){var o=e.pingCache;if(o===null){o=e.pingCache=new JM;var c=new Set;o.set(n,c)}else c=o.get(n),c===void 0&&(c=new Set,o.set(n,c));c.has(s)||(nd=!0,c.add(s),e=iE.bind(null,e,n,s),n.then(e,e))}function iE(e,n,s){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,je===e&&(Me&s)===s&&(an===4||an===3&&(Me&62914560)===Me&&300>gt()-ac?(Oe&2)===0&&$s(e,0):id|=s,Ks===Me&&(Ks=0)),Zi(e)}function j_(e,n){n===0&&(n=vn()),e=Gr(e,n),e!==null&&(Rn(e,n),Zi(e))}function aE(e){var n=e.memoizedState,s=0;n!==null&&(s=n.retryLane),j_(e,s)}function rE(e,n){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,c=e.memoizedState;c!==null&&(s=c.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),j_(e,s)}function sE(e,n){return Yt(e,n)}var fc=null,eo=null,fd=!1,hc=!1,hd=!1,rr=0;function Zi(e){e!==eo&&e.next===null&&(eo===null?fc=eo=e:eo=eo.next=e),hc=!0,fd||(fd=!0,lE())}function Pl(e,n){if(!hd&&hc){hd=!0;do for(var s=!1,o=fc;o!==null;){if(e!==0){var c=o.pendingLanes;if(c===0)var d=0;else{var S=o.suspendedLanes,T=o.pingedLanes;d=(1<<31-ne(42|e)+1)-1,d&=c&~(S&~T),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(s=!0,Z_(o,d))}else d=Me,d=Lt(o,o===je?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||ie(o,d)||(s=!0,Z_(o,d));o=o.next}while(s);hd=!1}}function oE(){W_()}function W_(){hc=fd=!1;var e=0;rr!==0&&_E()&&(e=rr);for(var n=gt(),s=null,o=fc;o!==null;){var c=o.next,d=Y_(o,n);d===0?(o.next=null,s===null?fc=c:s.next=c,c===null&&(eo=s)):(s=o,(e!==0||(d&3)!==0)&&(hc=!0)),o=c}yn!==0&&yn!==5||Pl(e),rr!==0&&(rr=0)}function Y_(e,n){for(var s=e.suspendedLanes,o=e.pingedLanes,c=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var S=31-ne(d),T=1<<S,H=c[S];H===-1?((T&s)===0||(T&o)!==0)&&(c[S]=Je(T,n)):H<=n&&(e.expiredLanes|=T),d&=~T}if(n=je,s=Me,s=Lt(e,e===n?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===n&&(Fe===2||Fe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&O(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||ie(e,s)){if(n=s&-s,n===e.callbackPriority)return n;switch(o!==null&&O(o),As(s)){case 2:case 8:s=jt;break;case 32:s=Ut;break;case 268435456:s=xe;break;default:s=Ut}return o=Q_.bind(null,e),s=Yt(s,o),e.callbackPriority=n,e.callbackNode=s,n}return o!==null&&o!==null&&O(o),e.callbackPriority=2,e.callbackNode=null,2}function Q_(e,n){if(yn!==0&&yn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(cc()&&e.callbackNode!==s)return null;var o=Me;return o=Lt(e,e===je?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(D_(e,o,n),Y_(e,gt()),e.callbackNode!=null&&e.callbackNode===s?Q_.bind(null,e):null)}function Z_(e,n){if(cc())return null;D_(e,n,!0)}function lE(){xE(function(){(Oe&6)!==0?Yt(_t,oE):W_()})}function dd(){if(rr===0){var e=Hs;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),rr=e}return rr}function K_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:xu(""+e)}function J_(e,n){var s=n.ownerDocument.createElement("input");return s.name=n.name,s.value=n.value,e.id&&s.setAttribute("form",e.id),n.parentNode.insertBefore(s,n),e=new FormData(e),s.parentNode.removeChild(s),e}function uE(e,n,s,o,c){if(n==="submit"&&s&&s.stateNode===c){var d=K_((c[Cn]||null).action),S=o.submitter;S&&(n=(n=S[Cn]||null)?K_(n.formAction):S.getAttribute("formAction"),n!==null&&(d=n,S=null));var T=new bu("action","action",null,o,c);e.push({event:T,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(rr!==0){var H=S?J_(c,S):new FormData(c);Nh(s,{pending:!0,data:H,method:c.method,action:d},null,H)}}else typeof d=="function"&&(T.preventDefault(),H=S?J_(c,S):new FormData(c),Nh(s,{pending:!0,data:H,method:c.method,action:d},d,H))},currentTarget:c}]})}}for(var pd=0;pd<Zf.length;pd++){var md=Zf[pd],cE=md.toLowerCase(),fE=md[0].toUpperCase()+md.slice(1);Li(cE,"on"+fE)}Li(wg,"onAnimationEnd"),Li(Dg,"onAnimationIteration"),Li(Ug,"onAnimationStart"),Li("dblclick","onDoubleClick"),Li("focusin","onFocus"),Li("focusout","onBlur"),Li(RM,"onTransitionRun"),Li(CM,"onTransitionStart"),Li(wM,"onTransitionCancel"),Li(Lg,"onTransitionEnd"),te("onMouseEnter",["mouseout","mouseover"]),te("onMouseLeave",["mouseout","mouseover"]),te("onPointerEnter",["pointerout","pointerover"]),te("onPointerLeave",["pointerout","pointerover"]),Ft("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ft("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ft("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ft("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ft("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ft("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zl));function $_(e,n){n=(n&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],c=o.event;o=o.listeners;t:{var d=void 0;if(n)for(var S=o.length-1;0<=S;S--){var T=o[S],H=T.instance,et=T.currentTarget;if(T=T.listener,H!==d&&c.isPropagationStopped())break t;d=T,c.currentTarget=et;try{d(c)}catch(pt){Ru(pt)}c.currentTarget=null,d=H}else for(S=0;S<o.length;S++){if(T=o[S],H=T.instance,et=T.currentTarget,T=T.listener,H!==d&&c.isPropagationStopped())break t;d=T,c.currentTarget=et;try{d(c)}catch(pt){Ru(pt)}c.currentTarget=null,d=H}}}}function _e(e,n){var s=n[il];s===void 0&&(s=n[il]=new Set);var o=e+"__bubble";s.has(o)||(t0(n,e,2,!1),s.add(o))}function gd(e,n,s){var o=0;n&&(o|=4),t0(s,e,o,n)}var dc="_reactListening"+Math.random().toString(36).slice(2);function vd(e){if(!e[dc]){e[dc]=!0,Nt.forEach(function(s){s!=="selectionchange"&&(hE.has(s)||gd(s,!1,e),gd(s,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[dc]||(n[dc]=!0,gd("selectionchange",!1,n))}}function t0(e,n,s,o){switch(w0(n)){case 2:var c=HE;break;case 8:c=GE;break;default:c=Ld}s=c.bind(null,n,s,e),c=void 0,!Ff||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),o?c!==void 0?e.addEventListener(n,s,{capture:!0,passive:c}):e.addEventListener(n,s,!0):c!==void 0?e.addEventListener(n,s,{passive:c}):e.addEventListener(n,s,!1)}function _d(e,n,s,o,c){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var S=o.tag;if(S===3||S===4){var T=o.stateNode.containerInfo;if(T===c)break;if(S===4)for(S=o.return;S!==null;){var H=S.tag;if((H===3||H===4)&&S.stateNode.containerInfo===c)return;S=S.return}for(;T!==null;){if(S=Q(T),S===null)return;if(H=S.tag,H===5||H===6||H===26||H===27){o=d=S;continue t}T=T.parentNode}}o=o.return}rg(function(){var et=d,pt=Pf(s),yt=[];t:{var nt=Ng.get(e);if(nt!==void 0){var ct=bu,Gt=e;switch(e){case"keypress":if(Mu(s)===0)break t;case"keydown":case"keyup":ct=rM;break;case"focusin":Gt="focus",ct=Gf;break;case"focusout":Gt="blur",ct=Gf;break;case"beforeblur":case"afterblur":ct=Gf;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ct=lg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ct=WS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ct=lM;break;case wg:case Dg:case Ug:ct=ZS;break;case Lg:ct=cM;break;case"scroll":case"scrollend":ct=qS;break;case"wheel":ct=hM;break;case"copy":case"cut":case"paste":ct=JS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ct=cg;break;case"toggle":case"beforetoggle":ct=pM}var ee=(n&4)!==0,ke=!ee&&(e==="scroll"||e==="scrollend"),K=ee?nt!==null?nt+"Capture":null:nt;ee=[];for(var j=et,tt;j!==null;){var vt=j;if(tt=vt.stateNode,vt=vt.tag,vt!==5&&vt!==26&&vt!==27||tt===null||K===null||(vt=al(j,K),vt!=null&&ee.push(Fl(j,vt,tt))),ke)break;j=j.return}0<ee.length&&(nt=new ct(nt,Gt,null,s,pt),yt.push({event:nt,listeners:ee}))}}if((n&7)===0){t:{if(nt=e==="mouseover"||e==="pointerover",ct=e==="mouseout"||e==="pointerout",nt&&s!==Of&&(Gt=s.relatedTarget||s.fromElement)&&(Q(Gt)||Gt[ra]))break t;if((ct||nt)&&(nt=pt.window===pt?pt:(nt=pt.ownerDocument)?nt.defaultView||nt.parentWindow:window,ct?(Gt=s.relatedTarget||s.toElement,ct=et,Gt=Gt?Q(Gt):null,Gt!==null&&(ke=u(Gt),ee=Gt.tag,Gt!==ke||ee!==5&&ee!==27&&ee!==6)&&(Gt=null)):(ct=null,Gt=et),ct!==Gt)){if(ee=lg,vt="onMouseLeave",K="onMouseEnter",j="mouse",(e==="pointerout"||e==="pointerover")&&(ee=cg,vt="onPointerLeave",K="onPointerEnter",j="pointer"),ke=ct==null?nt:st(ct),tt=Gt==null?nt:st(Gt),nt=new ee(vt,j+"leave",ct,s,pt),nt.target=ke,nt.relatedTarget=tt,vt=null,Q(pt)===et&&(ee=new ee(K,j+"enter",Gt,s,pt),ee.target=tt,ee.relatedTarget=ke,vt=ee),ke=vt,ct&&Gt)e:{for(ee=dE,K=ct,j=Gt,tt=0,vt=K;vt;vt=ee(vt))tt++;vt=0;for(var $t=j;$t;$t=ee($t))vt++;for(;0<tt-vt;)K=ee(K),tt--;for(;0<vt-tt;)j=ee(j),vt--;for(;tt--;){if(K===j||j!==null&&K===j.alternate){ee=K;break e}K=ee(K),j=ee(j)}ee=null}else ee=null;ct!==null&&e0(yt,nt,ct,ee,!1),Gt!==null&&ke!==null&&e0(yt,ke,Gt,ee,!0)}}t:{if(nt=et?st(et):window,ct=nt.nodeName&&nt.nodeName.toLowerCase(),ct==="select"||ct==="input"&&nt.type==="file")var Ue=_g;else if(gg(nt))if(yg)Ue=bM;else{Ue=MM;var qt=SM}else ct=nt.nodeName,!ct||ct.toLowerCase()!=="input"||nt.type!=="checkbox"&&nt.type!=="radio"?et&&Nf(et.elementType)&&(Ue=_g):Ue=EM;if(Ue&&(Ue=Ue(e,et))){vg(yt,Ue,s,pt);break t}qt&&qt(e,nt,et),e==="focusout"&&et&&nt.type==="number"&&et.memoizedProps.value!=null&&_n(nt,"number",nt.value)}switch(qt=et?st(et):window,e){case"focusin":(gg(qt)||qt.contentEditable==="true")&&(Ls=qt,Wf=et,hl=null);break;case"focusout":hl=Wf=Ls=null;break;case"mousedown":Yf=!0;break;case"contextmenu":case"mouseup":case"dragend":Yf=!1,Rg(yt,s,pt);break;case"selectionchange":if(AM)break;case"keydown":case"keyup":Rg(yt,s,pt)}var ce;if(kf)t:{switch(e){case"compositionstart":var Ee="onCompositionStart";break t;case"compositionend":Ee="onCompositionEnd";break t;case"compositionupdate":Ee="onCompositionUpdate";break t}Ee=void 0}else Us?pg(e,s)&&(Ee="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(Ee="onCompositionStart");Ee&&(fg&&s.locale!=="ko"&&(Us||Ee!=="onCompositionStart"?Ee==="onCompositionEnd"&&Us&&(ce=sg()):(ka=pt,If="value"in ka?ka.value:ka.textContent,Us=!0)),qt=pc(et,Ee),0<qt.length&&(Ee=new ug(Ee,e,null,s,pt),yt.push({event:Ee,listeners:qt}),ce?Ee.data=ce:(ce=mg(s),ce!==null&&(Ee.data=ce)))),(ce=gM?vM(e,s):_M(e,s))&&(Ee=pc(et,"onBeforeInput"),0<Ee.length&&(qt=new ug("onBeforeInput","beforeinput",null,s,pt),yt.push({event:qt,listeners:Ee}),qt.data=ce)),uE(yt,e,et,s,pt)}$_(yt,n)})}function Fl(e,n,s){return{instance:e,listener:n,currentTarget:s}}function pc(e,n){for(var s=n+"Capture",o=[];e!==null;){var c=e,d=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||d===null||(c=al(e,s),c!=null&&o.unshift(Fl(e,c,d)),c=al(e,n),c!=null&&o.push(Fl(e,c,d))),e.tag===3)return o;e=e.return}return[]}function dE(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function e0(e,n,s,o,c){for(var d=n._reactName,S=[];s!==null&&s!==o;){var T=s,H=T.alternate,et=T.stateNode;if(T=T.tag,H!==null&&H===o)break;T!==5&&T!==26&&T!==27||et===null||(H=et,c?(et=al(s,d),et!=null&&S.unshift(Fl(s,et,H))):c||(et=al(s,d),et!=null&&S.push(Fl(s,et,H)))),s=s.return}S.length!==0&&e.push({event:n,listeners:S})}var pE=/\r\n?/g,mE=/\u0000|\uFFFD/g;function n0(e){return(typeof e=="string"?e:""+e).replace(pE,`
`).replace(mE,"")}function i0(e,n){return n=n0(n),n0(e)===n}function Ve(e,n,s,o,c,d){switch(s){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Cs(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Cs(e,""+o);break;case"className":qe(e,"class",o);break;case"tabIndex":qe(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":qe(e,s,o);break;case"style":ig(e,o,d);break;case"data":if(n!=="object"){qe(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=xu(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(s==="formAction"?(n!=="input"&&Ve(e,n,"name",c.name,c,null),Ve(e,n,"formEncType",c.formEncType,c,null),Ve(e,n,"formMethod",c.formMethod,c,null),Ve(e,n,"formTarget",c.formTarget,c,null)):(Ve(e,n,"encType",c.encType,c,null),Ve(e,n,"method",c.method,c,null),Ve(e,n,"target",c.target,c,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=xu(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=oa);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(s=o.__html,s!=null){if(c.children!=null)throw Error(r(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=xu(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Ye(e,"popover",o);break;case"xlinkActuate":le(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":le(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":le(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":le(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":le(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":le(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":le(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":le(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":le(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ye(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=kS.get(s)||s,Ye(e,s,o))}}function yd(e,n,s,o,c,d){switch(s){case"style":ig(e,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(s=o.__html,s!=null){if(c.children!=null)throw Error(r(60));e.innerHTML=s}}break;case"children":typeof o=="string"?Cs(e,o):(typeof o=="number"||typeof o=="bigint")&&Cs(e,""+o);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"onClick":o!=null&&(e.onclick=oa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!It.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(c=s.endsWith("Capture"),n=s.slice(2,c?s.length-7:void 0),d=e[Cn]||null,d=d!=null?d[s]:null,typeof d=="function"&&e.removeEventListener(n,d,c),typeof o=="function")){typeof d!="function"&&d!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(n,o,c);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):Ye(e,s,o)}}}function Ln(e,n,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var o=!1,c=!1,d;for(d in s)if(s.hasOwnProperty(d)){var S=s[d];if(S!=null)switch(d){case"src":o=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Ve(e,n,d,S,s,null)}}c&&Ve(e,n,"srcSet",s.srcSet,s,null),o&&Ve(e,n,"src",s.src,s,null);return;case"input":_e("invalid",e);var T=d=S=c=null,H=null,et=null;for(o in s)if(s.hasOwnProperty(o)){var pt=s[o];if(pt!=null)switch(o){case"name":c=pt;break;case"type":S=pt;break;case"checked":H=pt;break;case"defaultChecked":et=pt;break;case"value":d=pt;break;case"defaultValue":T=pt;break;case"children":case"dangerouslySetInnerHTML":if(pt!=null)throw Error(r(137,n));break;default:Ve(e,n,o,pt,s,null)}}Gn(e,d,T,H,et,S,c,!1);return;case"select":_e("invalid",e),o=S=d=null;for(c in s)if(s.hasOwnProperty(c)&&(T=s[c],T!=null))switch(c){case"value":d=T;break;case"defaultValue":S=T;break;case"multiple":o=T;default:Ve(e,n,c,T,s,null)}n=d,s=S,e.multiple=!!o,n!=null?sn(e,!!o,n,!1):s!=null&&sn(e,!!o,s,!0);return;case"textarea":_e("invalid",e),d=c=o=null;for(S in s)if(s.hasOwnProperty(S)&&(T=s[S],T!=null))switch(S){case"value":o=T;break;case"defaultValue":c=T;break;case"children":d=T;break;case"dangerouslySetInnerHTML":if(T!=null)throw Error(r(91));break;default:Ve(e,n,S,T,s,null)}ji(e,o,c,d);return;case"option":for(H in s)if(s.hasOwnProperty(H)&&(o=s[H],o!=null))switch(H){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Ve(e,n,H,o,s,null)}return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(o=0;o<zl.length;o++)_e(zl[o],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(et in s)if(s.hasOwnProperty(et)&&(o=s[et],o!=null))switch(et){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Ve(e,n,et,o,s,null)}return;default:if(Nf(n)){for(pt in s)s.hasOwnProperty(pt)&&(o=s[pt],o!==void 0&&yd(e,n,pt,o,s,void 0));return}}for(T in s)s.hasOwnProperty(T)&&(o=s[T],o!=null&&Ve(e,n,T,o,s,null))}function gE(e,n,s,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,d=null,S=null,T=null,H=null,et=null,pt=null;for(ct in s){var yt=s[ct];if(s.hasOwnProperty(ct)&&yt!=null)switch(ct){case"checked":break;case"value":break;case"defaultValue":H=yt;default:o.hasOwnProperty(ct)||Ve(e,n,ct,null,o,yt)}}for(var nt in o){var ct=o[nt];if(yt=s[nt],o.hasOwnProperty(nt)&&(ct!=null||yt!=null))switch(nt){case"type":d=ct;break;case"name":c=ct;break;case"checked":et=ct;break;case"defaultChecked":pt=ct;break;case"value":S=ct;break;case"defaultValue":T=ct;break;case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(r(137,n));break;default:ct!==yt&&Ve(e,n,nt,ct,o,yt)}}On(e,S,T,H,et,pt,d,c);return;case"select":ct=S=T=nt=null;for(d in s)if(H=s[d],s.hasOwnProperty(d)&&H!=null)switch(d){case"value":break;case"multiple":ct=H;default:o.hasOwnProperty(d)||Ve(e,n,d,null,o,H)}for(c in o)if(d=o[c],H=s[c],o.hasOwnProperty(c)&&(d!=null||H!=null))switch(c){case"value":nt=d;break;case"defaultValue":T=d;break;case"multiple":S=d;default:d!==H&&Ve(e,n,c,d,o,H)}n=T,s=S,o=ct,nt!=null?sn(e,!!s,nt,!1):!!o!=!!s&&(n!=null?sn(e,!!s,n,!0):sn(e,!!s,s?[]:"",!1));return;case"textarea":ct=nt=null;for(T in s)if(c=s[T],s.hasOwnProperty(T)&&c!=null&&!o.hasOwnProperty(T))switch(T){case"value":break;case"children":break;default:Ve(e,n,T,null,o,c)}for(S in o)if(c=o[S],d=s[S],o.hasOwnProperty(S)&&(c!=null||d!=null))switch(S){case"value":nt=c;break;case"defaultValue":ct=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(r(91));break;default:c!==d&&Ve(e,n,S,c,o,d)}Rs(e,nt,ct);return;case"option":for(var Gt in s)if(nt=s[Gt],s.hasOwnProperty(Gt)&&nt!=null&&!o.hasOwnProperty(Gt))switch(Gt){case"selected":e.selected=!1;break;default:Ve(e,n,Gt,null,o,nt)}for(H in o)if(nt=o[H],ct=s[H],o.hasOwnProperty(H)&&nt!==ct&&(nt!=null||ct!=null))switch(H){case"selected":e.selected=nt&&typeof nt!="function"&&typeof nt!="symbol";break;default:Ve(e,n,H,nt,o,ct)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ee in s)nt=s[ee],s.hasOwnProperty(ee)&&nt!=null&&!o.hasOwnProperty(ee)&&Ve(e,n,ee,null,o,nt);for(et in o)if(nt=o[et],ct=s[et],o.hasOwnProperty(et)&&nt!==ct&&(nt!=null||ct!=null))switch(et){case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(r(137,n));break;default:Ve(e,n,et,nt,o,ct)}return;default:if(Nf(n)){for(var ke in s)nt=s[ke],s.hasOwnProperty(ke)&&nt!==void 0&&!o.hasOwnProperty(ke)&&yd(e,n,ke,void 0,o,nt);for(pt in o)nt=o[pt],ct=s[pt],!o.hasOwnProperty(pt)||nt===ct||nt===void 0&&ct===void 0||yd(e,n,pt,nt,o,ct);return}}for(var K in s)nt=s[K],s.hasOwnProperty(K)&&nt!=null&&!o.hasOwnProperty(K)&&Ve(e,n,K,null,o,nt);for(yt in o)nt=o[yt],ct=s[yt],!o.hasOwnProperty(yt)||nt===ct||nt==null&&ct==null||Ve(e,n,yt,nt,o,ct)}function a0(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function vE(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var c=s[o],d=c.transferSize,S=c.initiatorType,T=c.duration;if(d&&T&&a0(S)){for(S=0,T=c.responseEnd,o+=1;o<s.length;o++){var H=s[o],et=H.startTime;if(et>T)break;var pt=H.transferSize,yt=H.initiatorType;pt&&a0(yt)&&(H=H.responseEnd,S+=pt*(H<T?1:(T-et)/(H-et)))}if(--o,n+=8*(d+S)/(c.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var xd=null,Sd=null;function mc(e){return e.nodeType===9?e:e.ownerDocument}function r0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function s0(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Md(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ed=null;function _E(){var e=window.event;return e&&e.type==="popstate"?e===Ed?!1:(Ed=e,!0):(Ed=null,!1)}var o0=typeof setTimeout=="function"?setTimeout:void 0,yE=typeof clearTimeout=="function"?clearTimeout:void 0,l0=typeof Promise=="function"?Promise:void 0,xE=typeof queueMicrotask=="function"?queueMicrotask:typeof l0<"u"?function(e){return l0.resolve(null).then(e).catch(SE)}:o0;function SE(e){setTimeout(function(){throw e})}function sr(e){return e==="head"}function u0(e,n){var s=n,o=0;do{var c=s.nextSibling;if(e.removeChild(s),c&&c.nodeType===8)if(s=c.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(c),ro(n);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")Il(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Il(s);for(var d=s.firstChild;d;){var S=d.nextSibling,T=d.nodeName;d[zr]||T==="SCRIPT"||T==="STYLE"||T==="LINK"&&d.rel.toLowerCase()==="stylesheet"||s.removeChild(d),d=S}}else s==="body"&&Il(e.ownerDocument.body);s=c}while(s);ro(n)}function c0(e,n){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?n?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(n?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function bd(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var s=n;switch(n=n.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":bd(s),C(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function ME(e,n,s,o){for(;e.nodeType===1;){var c=s;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[zr])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var d=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Mi(e.nextSibling),e===null)break}return null}function EE(e,n,s){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Mi(e.nextSibling),e===null))return null;return e}function f0(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Mi(e.nextSibling),e===null))return null;return e}function Td(e){return e.data==="$?"||e.data==="$~"}function Ad(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function bE(e,n){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||s.readyState!=="loading")n();else{var o=function(){n(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Mi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Rd=null;function h0(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(n===0)return Mi(e.nextSibling);n--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||n++}e=e.nextSibling}return null}function d0(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(n===0)return e;n--}else s!=="/$"&&s!=="/&"||n++}e=e.previousSibling}return null}function p0(e,n,s){switch(n=mc(s),e){case"html":if(e=n.documentElement,!e)throw Error(r(452));return e;case"head":if(e=n.head,!e)throw Error(r(453));return e;case"body":if(e=n.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function Il(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);C(e)}var Ei=new Map,m0=new Set;function gc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ea=B.d;B.d={f:TE,r:AE,D:RE,C:CE,L:wE,m:DE,X:LE,S:UE,M:NE};function TE(){var e=Ea.f(),n=oc();return e||n}function AE(e){var n=rt(e);n!==null&&n.tag===5&&n.type==="form"?Lv(n):Ea.r(e)}var no=typeof document>"u"?null:document;function g0(e,n,s){var o=no;if(o&&typeof n=="string"&&n){var c=ge(n);c='link[rel="'+e+'"][href="'+c+'"]',typeof s=="string"&&(c+='[crossorigin="'+s+'"]'),m0.has(c)||(m0.add(c),e={rel:e,crossOrigin:s,href:n},o.querySelector(c)===null&&(n=o.createElement("link"),Ln(n,"link",e),St(n),o.head.appendChild(n)))}}function RE(e){Ea.D(e),g0("dns-prefetch",e,null)}function CE(e,n){Ea.C(e,n),g0("preconnect",e,n)}function wE(e,n,s){Ea.L(e,n,s);var o=no;if(o&&e&&n){var c='link[rel="preload"][as="'+ge(n)+'"]';n==="image"&&s&&s.imageSrcSet?(c+='[imagesrcset="'+ge(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(c+='[imagesizes="'+ge(s.imageSizes)+'"]')):c+='[href="'+ge(e)+'"]';var d=c;switch(n){case"style":d=io(e);break;case"script":d=ao(e)}Ei.has(d)||(e=v({rel:"preload",href:n==="image"&&s&&s.imageSrcSet?void 0:e,as:n},s),Ei.set(d,e),o.querySelector(c)!==null||n==="style"&&o.querySelector(Bl(d))||n==="script"&&o.querySelector(Hl(d))||(n=o.createElement("link"),Ln(n,"link",e),St(n),o.head.appendChild(n)))}}function DE(e,n){Ea.m(e,n);var s=no;if(s&&e){var o=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+ge(o)+'"][href="'+ge(e)+'"]',d=c;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=ao(e)}if(!Ei.has(d)&&(e=v({rel:"modulepreload",href:e},n),Ei.set(d,e),s.querySelector(c)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Hl(d)))return}o=s.createElement("link"),Ln(o,"link",e),St(o),s.head.appendChild(o)}}}function UE(e,n,s){Ea.S(e,n,s);var o=no;if(o&&e){var c=Z(o).hoistableStyles,d=io(e);n=n||"default";var S=c.get(d);if(!S){var T={loading:0,preload:null};if(S=o.querySelector(Bl(d)))T.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},s),(s=Ei.get(d))&&Cd(e,s);var H=S=o.createElement("link");St(H),Ln(H,"link",e),H._p=new Promise(function(et,pt){H.onload=et,H.onerror=pt}),H.addEventListener("load",function(){T.loading|=1}),H.addEventListener("error",function(){T.loading|=2}),T.loading|=4,vc(S,n,o)}S={type:"stylesheet",instance:S,count:1,state:T},c.set(d,S)}}}function LE(e,n){Ea.X(e,n);var s=no;if(s&&e){var o=Z(s).hoistableScripts,c=ao(e),d=o.get(c);d||(d=s.querySelector(Hl(c)),d||(e=v({src:e,async:!0},n),(n=Ei.get(c))&&wd(e,n),d=s.createElement("script"),St(d),Ln(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(c,d))}}function NE(e,n){Ea.M(e,n);var s=no;if(s&&e){var o=Z(s).hoistableScripts,c=ao(e),d=o.get(c);d||(d=s.querySelector(Hl(c)),d||(e=v({src:e,async:!0,type:"module"},n),(n=Ei.get(c))&&wd(e,n),d=s.createElement("script"),St(d),Ln(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(c,d))}}function v0(e,n,s,o){var c=(c=At.current)?gc(c):null;if(!c)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(n=io(s.href),s=Z(c).hoistableStyles,o=s.get(n),o||(o={type:"style",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=io(s.href);var d=Z(c).hoistableStyles,S=d.get(e);if(S||(c=c.ownerDocument||c,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,S),(d=c.querySelector(Bl(e)))&&!d._p&&(S.instance=d,S.state.loading=5),Ei.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ei.set(e,s),d||OE(c,e,s,S.state))),n&&o===null)throw Error(r(528,""));return S}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=s.async,s=s.src,typeof s=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ao(s),s=Z(c).hoistableScripts,o=s.get(n),o||(o={type:"script",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function io(e){return'href="'+ge(e)+'"'}function Bl(e){return'link[rel="stylesheet"]['+e+"]"}function _0(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function OE(e,n,s,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Ln(n,"link",s),St(n),e.head.appendChild(n))}function ao(e){return'[src="'+ge(e)+'"]'}function Hl(e){return"script[async]"+e}function y0(e,n,s){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+ge(s.href)+'"]');if(o)return n.instance=o,St(o),o;var c=v({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),St(o),Ln(o,"style",c),vc(o,s.precedence,e),n.instance=o;case"stylesheet":c=io(s.href);var d=e.querySelector(Bl(c));if(d)return n.state.loading|=4,n.instance=d,St(d),d;o=_0(s),(c=Ei.get(c))&&Cd(o,c),d=(e.ownerDocument||e).createElement("link"),St(d);var S=d;return S._p=new Promise(function(T,H){S.onload=T,S.onerror=H}),Ln(d,"link",o),n.state.loading|=4,vc(d,s.precedence,e),n.instance=d;case"script":return d=ao(s.src),(c=e.querySelector(Hl(d)))?(n.instance=c,St(c),c):(o=s,(c=Ei.get(d))&&(o=v({},s),wd(o,c)),e=e.ownerDocument||e,c=e.createElement("script"),St(c),Ln(c,"link",o),e.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,vc(o,s.precedence,e));return n.instance}function vc(e,n,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=o.length?o[o.length-1]:null,d=c,S=0;S<o.length;S++){var T=o[S];if(T.dataset.precedence===n)d=T;else if(d!==c)break}d?d.parentNode.insertBefore(e,d.nextSibling):(n=s.nodeType===9?s.head:s,n.insertBefore(e,n.firstChild))}function Cd(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function wd(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var _c=null;function x0(e,n,s){if(_c===null){var o=new Map,c=_c=new Map;c.set(s,o)}else c=_c,o=c.get(s),o||(o=new Map,c.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),c=0;c<s.length;c++){var d=s[c];if(!(d[zr]||d[en]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var S=d.getAttribute(n)||"";S=e+S;var T=o.get(S);T?T.push(d):o.set(S,[d])}}return o}function S0(e,n,s){e=e.ownerDocument||e,e.head.insertBefore(s,n==="title"?e.querySelector("head > title"):null)}function PE(e,n,s){if(s===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function M0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function zE(e,n,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var c=io(o.href),d=n.querySelector(Bl(c));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=yc.bind(e),n.then(e,e)),s.state.loading|=4,s.instance=d,St(d);return}d=n.ownerDocument||n,o=_0(o),(c=Ei.get(c))&&Cd(o,c),d=d.createElement("link"),St(d);var S=d;S._p=new Promise(function(T,H){S.onload=T,S.onerror=H}),Ln(d,"link",o),s.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,n),(n=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=yc.bind(e),n.addEventListener("load",s),n.addEventListener("error",s))}}var Dd=0;function FE(e,n){return e.stylesheets&&e.count===0&&Sc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&Sc(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+n);0<e.imgBytes&&Dd===0&&(Dd=62500*vE());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Sc(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Dd?50:800)+n);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(c)}}:null}function yc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Sc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var xc=null;function Sc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,xc=new Map,n.forEach(IE,e),xc=null,yc.call(e))}function IE(e,n){if(!(n.state.loading&4)){var s=xc.get(e);if(s)var o=s.get(null);else{s=new Map,xc.set(e,s);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<c.length;d++){var S=c[d];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(s.set(S.dataset.precedence,S),o=S)}o&&s.set(null,o)}c=n.instance,S=c.getAttribute("data-precedence"),d=s.get(S)||o,d===o&&s.set(null,c),s.set(S,c),this.count++,o=yc.bind(this),c.addEventListener("load",o),c.addEventListener("error",o),d?d.parentNode.insertBefore(c,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),n.state.loading|=4}}var Gl={$$typeof:D,Provider:null,Consumer:null,_currentValue:W,_currentValue2:W,_threadCount:0};function BE(e,n,s,o,c,d,S,T,H){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Re(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Re(0),this.hiddenUpdates=Re(null),this.identifierPrefix=o,this.onUncaughtError=c,this.onCaughtError=d,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function E0(e,n,s,o,c,d,S,T,H,et,pt,yt){return e=new BE(e,n,s,S,H,et,pt,yt,T),n=1,d===!0&&(n|=24),d=ri(3,null,null,n),e.current=d,d.stateNode=e,n=uh(),n.refCount++,e.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:s,cache:n},dh(d),e}function b0(e){return e?(e=Ps,e):Ps}function T0(e,n,s,o,c,d){c=b0(c),o.context===null?o.context=c:o.pendingContext=c,o=Qa(n),o.payload={element:s},d=d===void 0?null:d,d!==null&&(o.callback=d),s=Za(e,o,n),s!==null&&(Kn(s,e,n),yl(s,e,n))}function A0(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<n?s:n}}function Ud(e,n){A0(e,n),(e=e.alternate)&&A0(e,n)}function R0(e){if(e.tag===13||e.tag===31){var n=Gr(e,67108864);n!==null&&Kn(n,e,67108864),Ud(e,67108864)}}function C0(e){if(e.tag===13||e.tag===31){var n=ci();n=Or(n);var s=Gr(e,n);s!==null&&Kn(s,e,n),Ud(e,n)}}var Mc=!0;function HE(e,n,s,o){var c=I.T;I.T=null;var d=B.p;try{B.p=2,Ld(e,n,s,o)}finally{B.p=d,I.T=c}}function GE(e,n,s,o){var c=I.T;I.T=null;var d=B.p;try{B.p=8,Ld(e,n,s,o)}finally{B.p=d,I.T=c}}function Ld(e,n,s,o){if(Mc){var c=Nd(o);if(c===null)_d(e,n,o,Ec,s),D0(e,o);else if(kE(c,e,n,s,o))o.stopPropagation();else if(D0(e,o),n&4&&-1<VE.indexOf(e)){for(;c!==null;){var d=rt(c);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var S=Dt(d.pendingLanes);if(S!==0){var T=d;for(T.pendingLanes|=2,T.entangledLanes|=2;S;){var H=1<<31-ne(S);T.entanglements[1]|=H,S&=~H}Zi(d),(Oe&6)===0&&(rc=gt()+500,Pl(0))}}break;case 31:case 13:T=Gr(d,2),T!==null&&Kn(T,d,2),oc(),Ud(d,2)}if(d=Nd(o),d===null&&_d(e,n,o,Ec,s),d===c)break;c=d}c!==null&&o.stopPropagation()}else _d(e,n,o,null,s)}}function Nd(e){return e=Pf(e),Od(e)}var Ec=null;function Od(e){if(Ec=null,e=Q(e),e!==null){var n=u(e);if(n===null)e=null;else{var s=n.tag;if(s===13){if(e=f(n),e!==null)return e;e=null}else if(s===31){if(e=h(n),e!==null)return e;e=null}else if(s===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Ec=e,null}function w0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Tt()){case _t:return 2;case jt:return 8;case Ut:case Bt:return 32;case xe:return 268435456;default:return 32}default:return 32}}var Pd=!1,or=null,lr=null,ur=null,Vl=new Map,kl=new Map,cr=[],VE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function D0(e,n){switch(e){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":ur=null;break;case"pointerover":case"pointerout":Vl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":kl.delete(n.pointerId)}}function Xl(e,n,s,o,c,d){return e===null||e.nativeEvent!==d?(e={blockedOn:n,domEventName:s,eventSystemFlags:o,nativeEvent:d,targetContainers:[c]},n!==null&&(n=rt(n),n!==null&&R0(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),e)}function kE(e,n,s,o,c){switch(n){case"focusin":return or=Xl(or,e,n,s,o,c),!0;case"dragenter":return lr=Xl(lr,e,n,s,o,c),!0;case"mouseover":return ur=Xl(ur,e,n,s,o,c),!0;case"pointerover":var d=c.pointerId;return Vl.set(d,Xl(Vl.get(d)||null,e,n,s,o,c)),!0;case"gotpointercapture":return d=c.pointerId,kl.set(d,Xl(kl.get(d)||null,e,n,s,o,c)),!0}return!1}function U0(e){var n=Q(e.target);if(n!==null){var s=u(n);if(s!==null){if(n=s.tag,n===13){if(n=f(s),n!==null){e.blockedOn=n,Pr(e.priority,function(){C0(s)});return}}else if(n===31){if(n=h(s),n!==null){e.blockedOn=n,Pr(e.priority,function(){C0(s)});return}}else if(n===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function bc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var s=Nd(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);Of=o,s.target.dispatchEvent(o),Of=null}else return n=rt(s),n!==null&&R0(n),e.blockedOn=s,!1;n.shift()}return!0}function L0(e,n,s){bc(e)&&s.delete(n)}function XE(){Pd=!1,or!==null&&bc(or)&&(or=null),lr!==null&&bc(lr)&&(lr=null),ur!==null&&bc(ur)&&(ur=null),Vl.forEach(L0),kl.forEach(L0)}function Tc(e,n){e.blockedOn===n&&(e.blockedOn=null,Pd||(Pd=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,XE)))}var Ac=null;function N0(e){Ac!==e&&(Ac=e,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){Ac===e&&(Ac=null);for(var n=0;n<e.length;n+=3){var s=e[n],o=e[n+1],c=e[n+2];if(typeof o!="function"){if(Od(o||s)===null)continue;break}var d=rt(s);d!==null&&(e.splice(n,3),n-=3,Nh(d,{pending:!0,data:c,method:s.method,action:o},o,c))}}))}function ro(e){function n(H){return Tc(H,e)}or!==null&&Tc(or,e),lr!==null&&Tc(lr,e),ur!==null&&Tc(ur,e),Vl.forEach(n),kl.forEach(n);for(var s=0;s<cr.length;s++){var o=cr[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<cr.length&&(s=cr[0],s.blockedOn===null);)U0(s),s.blockedOn===null&&cr.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var c=s[o],d=s[o+1],S=c[Cn]||null;if(typeof d=="function")S||N0(s);else if(S){var T=null;if(d&&d.hasAttribute("formAction")){if(c=d,S=d[Cn]||null)T=S.formAction;else if(Od(c)!==null)continue}else T=S.action;typeof T=="function"?s[o+1]=T:(s.splice(o,3),o-=3),N0(s)}}}function O0(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(S){return c=S})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function zd(e){this._internalRoot=e}Rc.prototype.render=zd.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(r(409));var s=n.current,o=ci();T0(s,o,e,n,null,null)},Rc.prototype.unmount=zd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;T0(e.current,2,null,e,null,null),oc(),n[ra]=null}};function Rc(e){this._internalRoot=e}Rc.prototype.unstable_scheduleHydration=function(e){if(e){var n=nl();e={blockedOn:null,target:e,priority:n};for(var s=0;s<cr.length&&n!==0&&n<cr[s].priority;s++);cr.splice(s,0,e),s===0&&U0(e)}};var P0=t.version;if(P0!=="19.2.8")throw Error(r(527,P0,"19.2.8"));B.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=m(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var qE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:I,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Cc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Cc.isDisabled&&Cc.supportsFiber)try{Kt=Cc.inject(qE),Wt=Cc}catch{}}return jl.createRoot=function(e,n){if(!l(e))throw Error(r(299));var s=!1,o="",c=Vv,d=kv,S=Xv;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(S=n.onRecoverableError)),n=E0(e,1,!1,null,null,s,o,null,c,d,S,O0),e[ra]=n.current,vd(e),new zd(n)},jl.hydrateRoot=function(e,n,s){if(!l(e))throw Error(r(299));var o=!1,c="",d=Vv,S=kv,T=Xv,H=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(c=s.identifierPrefix),s.onUncaughtError!==void 0&&(d=s.onUncaughtError),s.onCaughtError!==void 0&&(S=s.onCaughtError),s.onRecoverableError!==void 0&&(T=s.onRecoverableError),s.formState!==void 0&&(H=s.formState)),n=E0(e,1,!0,n,s??null,o,c,H,d,S,T,O0),n.context=b0(null),s=n.current,o=ci(),o=Or(o),c=Qa(o),c.callback=null,Za(s,c,o),s=o,n.current.lanes=s,Rn(n,s),Zi(n),e[ra]=n.current,vd(e),new Rc(n)},jl.version="19.2.8",jl}var j0;function eb(){if(j0)return Hd.exports;j0=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(t){console.error(t)}}return a(),Hd.exports=tb(),Hd.exports}var nb=eb(),Wo=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(a){return this.listeners.add(a),this.onSubscribe(),()=>{this.listeners.delete(a),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},ps,xr,Ao,dx,ib=(dx=class extends Wo{constructor(){super();Qt(this,ps);Qt(this,xr);Qt(this,Ao);Pt(this,Ao,t=>{if(typeof window<"u"&&window.addEventListener){const i=()=>t();return window.addEventListener("visibilitychange",i,!1),()=>{window.removeEventListener("visibilitychange",i)}}})}onSubscribe(){G(this,xr)||this.setEventListener(G(this,Ao))}onUnsubscribe(){var t;this.hasListeners()||((t=G(this,xr))==null||t.call(this),Pt(this,xr,void 0))}setEventListener(t){var i;Pt(this,Ao,t),(i=G(this,xr))==null||i.call(this),Pt(this,xr,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){G(this,ps)!==t&&(Pt(this,ps,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(i=>{i(t)})}isFocused(){var t;return typeof G(this,ps)=="boolean"?G(this,ps):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},ps=new WeakMap,xr=new WeakMap,Ao=new WeakMap,dx),Nm=new ib,ab={setTimeout:(a,t)=>setTimeout(a,t),clearTimeout:a=>clearTimeout(a),setInterval:(a,t)=>setInterval(a,t),clearInterval:a=>clearInterval(a)},Sr,Um,px,rb=(px=class{constructor(){Qt(this,Sr,ab);Qt(this,Um,!1)}setTimeoutProvider(a){Pt(this,Sr,a)}setTimeout(a,t){return G(this,Sr).setTimeout(a,t)}clearTimeout(a){G(this,Sr).clearTimeout(a)}setInterval(a,t){return G(this,Sr).setInterval(a,t)}clearInterval(a){G(this,Sr).clearInterval(a)}},Sr=new WeakMap,Um=new WeakMap,px),cs=new rb;function sb(a){setTimeout(a,0)}var ob=typeof window>"u"||"Deno"in globalThis;function qn(){}function lb(a,t){return typeof a=="function"?a(t):a}function Tp(a){return typeof a=="number"&&a>=0&&a!==1/0}function bx(a,t){return Math.max(a+(t||0)-Date.now(),0)}function wr(a,t){return typeof a=="function"?a(t):a}function pi(a,t){return typeof a=="function"?a(t):a}function W0(a,t){const{type:i="all",exact:r,fetchStatus:l,predicate:u,queryKey:f,stale:h}=a;if(f){if(r){if(t.queryHash!==Om(f,t.options))return!1}else if(!Bo(t.queryKey,f))return!1}if(i!=="all"){const p=t.isActive();if(i==="active"&&!p||i==="inactive"&&p)return!1}return!(typeof h=="boolean"&&t.isStale()!==h||l&&l!==t.state.fetchStatus||u&&!u(t))}function Y0(a,t){const{exact:i,status:r,predicate:l,mutationKey:u}=a;if(u){if(!t.options.mutationKey)return!1;if(i){if(Es(t.options.mutationKey)!==Es(u))return!1}else if(!Bo(t.options.mutationKey,u))return!1}return!(r&&t.state.status!==r||l&&!l(t))}function Om(a,t){return((t==null?void 0:t.queryKeyHashFn)||Es)(a)}function Es(a){return JSON.stringify(a,(t,i)=>Ap(i)?Object.keys(i).sort().reduce((r,l)=>(r[l]=i[l],r),{}):i)}function Bo(a,t){if(a===t)return!0;if(typeof a!=typeof t)return!1;if(a&&t&&typeof a=="object"&&typeof t=="object"){if(Array.isArray(a)&&Array.isArray(t)){for(let r=0;r<t.length;r++)if(!Bo(a[r],t[r]))return!1;return!0}const i=Object.keys(t);for(const r of i)if(!Bo(a[r],t[r]))return!1;return!0}return!1}var ub=Object.prototype.hasOwnProperty;function Tx(a,t,i=0){if(a===t)return a;if(i>500)return t;const r=Q0(a)&&Q0(t);if(!r&&!(Ap(a)&&Ap(t)))return t;const u=(r?a:Object.keys(a)).length,f=r?t:Object.keys(t),h=f.length,p=r?new Array(h):{};let m=0;for(let g=0;g<h;g++){const v=r?g:f[g],y=a[v],M=t[v];if(y===M){p[v]=y,(r?g<u:ub.call(a,v))&&m++;continue}if(y===null||M===null||typeof y!="object"||typeof M!="object"){p[v]=M;continue}const E=Tx(y,M,i+1);p[v]=E,E===y&&m++}return u===h&&m===u?a:p}function hf(a,t){if(!t||Object.keys(a).length!==Object.keys(t).length)return!1;for(const i in a)if(a[i]!==t[i])return!1;return!0}function Q0(a){return Array.isArray(a)&&a.length===Object.keys(a).length}function Ap(a){if(!Z0(a))return!1;const t=a.constructor;if(t===void 0)return!0;const i=t.prototype;return!(!Z0(i)||!i.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(a)!==Object.prototype)}function Z0(a){return Object.prototype.toString.call(a)==="[object Object]"}function cb(a){return new Promise(t=>{cs.setTimeout(t,a)})}function Rp(a,t,i){return typeof i.structuralSharing=="function"?i.structuralSharing(a,t):i.structuralSharing!==!1?Tx(a,t):t}function fb(a,t,i=0){const r=[...a,t];return i&&r.length>i?r.slice(1):r}function hb(a,t,i=0){const r=[t,...a];return i&&r.length>i?r.slice(0,-1):r}var Pm=Symbol();function Ax(a,t){return!a.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!a.queryFn||a.queryFn===Pm?()=>Promise.reject(new Error(`Missing queryFn: '${a.queryHash}'`)):a.queryFn}function zm(a,t){return typeof a=="function"?a(...t):!!a}function db(a,t,i){let r=!1,l;return Object.defineProperty(a,"signal",{enumerable:!0,get:()=>(l??(l=t()),r||(r=!0,l.aborted?i():l.addEventListener("abort",i,{once:!0})),l)}),a}var au=(()=>{let a=()=>ob;return{isServer(){return a()},setIsServer(t){a=t}}})();function Cp(){let a,t;const i=new Promise((l,u)=>{a=l,t=u});i.status="pending",i.catch(()=>{});function r(l){Object.assign(i,l),delete i.resolve,delete i.reject}return i.resolve=l=>{r({status:"fulfilled",value:l}),a(l)},i.reject=l=>{r({status:"rejected",reason:l}),t(l)},i}var pb=sb;function mb(){let a=[],t=0,i=h=>{h()},r=h=>{h()},l=pb;const u=h=>{t?a.push(h):l(()=>{i(h)})},f=()=>{const h=a;a=[],h.length&&l(()=>{r(()=>{h.forEach(p=>{i(p)})})})};return{batch:h=>{let p;t++;try{p=h()}finally{t--,t||f()}return p},batchCalls:h=>(...p)=>{u(()=>{h(...p)})},schedule:u,setNotifyFunction:h=>{i=h},setBatchNotifyFunction:h=>{r=h},setScheduler:h=>{l=h}}}var xn=mb(),Ro,Mr,Co,mx,gb=(mx=class extends Wo{constructor(){super();Qt(this,Ro,!0);Qt(this,Mr);Qt(this,Co);Pt(this,Co,t=>{if(typeof window<"u"&&window.addEventListener){const i=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",i,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",i),window.removeEventListener("offline",r)}}})}onSubscribe(){G(this,Mr)||this.setEventListener(G(this,Co))}onUnsubscribe(){var t;this.hasListeners()||((t=G(this,Mr))==null||t.call(this),Pt(this,Mr,void 0))}setEventListener(t){var i;Pt(this,Co,t),(i=G(this,Mr))==null||i.call(this),Pt(this,Mr,t(this.setOnline.bind(this)))}setOnline(t){G(this,Ro)!==t&&(Pt(this,Ro,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return G(this,Ro)}},Ro=new WeakMap,Mr=new WeakMap,Co=new WeakMap,mx),df=new gb;function vb(a){return Math.min(1e3*2**a,3e4)}function Rx(a){return(a??"online")==="online"?df.isOnline():!0}var wp=class extends Error{constructor(a){super("CancelledError"),this.revert=a==null?void 0:a.revert,this.silent=a==null?void 0:a.silent}};function Cx(a){let t=!1,i=0,r;const l=Cp(),u=()=>l.status!=="pending",f=b=>{var x;if(!u()){const _=new wp(b);y(_),(x=a.onCancel)==null||x.call(a,_)}},h=()=>{t=!0},p=()=>{t=!1},m=()=>Nm.isFocused()&&(a.networkMode==="always"||df.isOnline())&&a.canRun(),g=()=>Rx(a.networkMode)&&a.canRun(),v=b=>{u()||(r==null||r(),l.resolve(b))},y=b=>{u()||(r==null||r(),l.reject(b))},M=()=>new Promise(b=>{var x;r=_=>{(u()||m())&&b(_)},(x=a.onPause)==null||x.call(a)}).then(()=>{var b;r=void 0,u()||(b=a.onContinue)==null||b.call(a)}),E=()=>{if(u())return;let b;const x=i===0?a.initialPromise:void 0;try{b=x??a.fn()}catch(_){b=Promise.reject(_)}Promise.resolve(b).then(v).catch(_=>{var z;if(u())return;const L=a.retry??(au.isServer()?0:3),D=a.retryDelay??vb,R=typeof D=="function"?D(i,_):D,V=L===!0||typeof L=="number"&&i<L||typeof L=="function"&&L(i,_);if(t||!V){y(_);return}i++,(z=a.onFail)==null||z.call(a,i,_),cb(R).then(()=>m()?void 0:M()).then(()=>{t?y(_):E()})})};return{promise:l,status:()=>l.status,cancel:f,continue:()=>(r==null||r(),l),cancelRetry:h,continueRetry:p,canStart:g,start:()=>(g()?E():M().then(E),l)}}var ms,gx,wx=(gx=class{constructor(){Qt(this,ms)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Tp(this.gcTime)&&Pt(this,ms,cs.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(a){this.gcTime=Math.max(this.gcTime||0,a??(au.isServer()?1/0:300*1e3))}clearGcTimeout(){G(this,ms)!==void 0&&(cs.clearTimeout(G(this,ms)),Pt(this,ms,void 0))}},ms=new WeakMap,gx);function _b(a){return{onFetch:(t,i)=>{var g,v,y,M,E;const r=t.options,l=(y=(v=(g=t.fetchOptions)==null?void 0:g.meta)==null?void 0:v.fetchMore)==null?void 0:y.direction,u=((M=t.state.data)==null?void 0:M.pages)||[],f=((E=t.state.data)==null?void 0:E.pageParams)||[];let h={pages:[],pageParams:[]},p=0;const m=async()=>{let b=!1;const x=D=>{db(D,()=>t.signal,()=>b=!0)},_=Ax(t.options,t.fetchOptions),L=async(D,R,V)=>{if(b)return Promise.reject(t.signal.reason);if(R==null&&D.pages.length)return Promise.resolve(D);const N=(()=>{const k={client:t.client,queryKey:t.queryKey,pageParam:R,direction:V?"backward":"forward",meta:t.options.meta};return x(k),k})(),X=await _(N),{maxPages:U}=t.options,w=V?hb:fb;return{pages:w(D.pages,X,U),pageParams:w(D.pageParams,R,U)}};if(l&&u.length){const D=l==="backward",R=D?yb:K0,V={pages:u,pageParams:f},z=R(r,V);h=await L(V,z,D)}else{const D=a??u.length;do{const R=p===0?f[0]??r.initialPageParam:K0(r,h);if(p>0&&R==null)break;h=await L(h,R),p++}while(p<D)}return h};t.options.persister?t.fetchFn=()=>{var b,x;return(x=(b=t.options).persister)==null?void 0:x.call(b,m,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},i)}:t.fetchFn=m}}}function K0(a,{pages:t,pageParams:i}){const r=t.length-1;return t.length>0?a.getNextPageParam(t[r],t,i[r],i):void 0}function yb(a,{pages:t,pageParams:i}){var r;return t.length>0?(r=a.getPreviousPageParam)==null?void 0:r.call(a,t[0],t,i[0],i):void 0}var wo,gs,Do,Ti,vs,An,ou,_s,di,Dx,wa,vx,xb=(vx=class extends wx{constructor(t){super();Qt(this,di);Qt(this,wo);Qt(this,gs);Qt(this,Do);Qt(this,Ti);Qt(this,vs);Qt(this,An);Qt(this,ou);Qt(this,_s);Pt(this,_s,!1),Pt(this,ou,t.defaultOptions),this.setOptions(t.options),this.observers=[],Pt(this,vs,t.client),Pt(this,Ti,G(this,vs).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,Pt(this,gs,$0(this.options)),this.state=t.state??G(this,gs),this.scheduleGc()}get meta(){return this.options.meta}get queryType(){return G(this,wo)}get promise(){var t;return(t=G(this,An))==null?void 0:t.promise}setOptions(t){if(this.options={...G(this,ou),...t},t!=null&&t._type&&Pt(this,wo,t._type),this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const i=$0(this.options);i.data!==void 0&&(this.setState(J0(i.data,i.dataUpdatedAt)),Pt(this,gs,i))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&G(this,Ti).remove(this)}setData(t,i){const r=Rp(this.state.data,t,this.options);return fe(this,di,wa).call(this,{data:r,type:"success",dataUpdatedAt:i==null?void 0:i.updatedAt,manual:i==null?void 0:i.manual}),r}setState(t){fe(this,di,wa).call(this,{type:"setState",state:t})}cancel(t){var r,l;const i=(r=G(this,An))==null?void 0:r.promise;return(l=G(this,An))==null||l.cancel(t),i?i.then(qn).catch(qn):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}get resetState(){return G(this,gs)}reset(){this.destroy(),this.setState(this.resetState)}isActive(){return this.observers.some(t=>pi(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Pm||!this.isFetched()}isFetched(){return this.state.dataUpdateCount+this.state.errorUpdateCount>0}isStatic(){return this.getObserversCount()>0?this.observers.some(t=>wr(t.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(t=0){return this.state.data===void 0?!0:t==="static"?!1:this.state.isInvalidated?!0:!bx(this.state.dataUpdatedAt,t)}onFocus(){var i;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(i=G(this,An))==null||i.continue()}onOnline(){var i;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(i=G(this,An))==null||i.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),G(this,Ti).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(i=>i!==t),this.observers.length||(G(this,An)&&(G(this,_s)||fe(this,di,Dx).call(this)?G(this,An).cancel({revert:!0}):G(this,An).cancelRetry()),this.scheduleGc()),G(this,Ti).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||fe(this,di,wa).call(this,{type:"invalidate"})}async fetch(t,i){var m,g,v,y,M,E,b,x,_,L,D;if(this.state.fetchStatus!=="idle"&&((m=G(this,An))==null?void 0:m.status())!=="rejected"){if(this.state.data!==void 0&&(i!=null&&i.cancelRefetch))this.cancel({silent:!0});else if(G(this,An))return G(this,An).continueRetry(),G(this,An).promise}if(t&&this.setOptions(t),!this.options.queryFn){const R=this.observers.find(V=>V.options.queryFn);R&&this.setOptions(R.options)}const r=new AbortController,l=R=>{Object.defineProperty(R,"signal",{enumerable:!0,get:()=>(Pt(this,_s,!0),r.signal)})},u=()=>{const R=Ax(this.options,i),z=(()=>{const N={client:G(this,vs),queryKey:this.queryKey,meta:this.meta};return l(N),N})();return Pt(this,_s,!1),this.options.persister?this.options.persister(R,z,this):R(z)},h=(()=>{const R={fetchOptions:i,options:this.options,queryKey:this.queryKey,client:G(this,vs),state:this.state,fetchFn:u};return l(R),R})(),p=G(this,wo)==="infinite"?_b(this.options.pages):this.options.behavior;p==null||p.onFetch(h,this),Pt(this,Do,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((g=h.fetchOptions)==null?void 0:g.meta))&&fe(this,di,wa).call(this,{type:"fetch",meta:(v=h.fetchOptions)==null?void 0:v.meta}),Pt(this,An,Cx({initialPromise:i==null?void 0:i.initialPromise,fn:h.fetchFn,onCancel:R=>{R instanceof wp&&R.revert&&this.setState({...G(this,Do),fetchStatus:"idle"}),r.abort()},onFail:(R,V)=>{fe(this,di,wa).call(this,{type:"failed",failureCount:R,error:V})},onPause:()=>{fe(this,di,wa).call(this,{type:"pause"})},onContinue:()=>{fe(this,di,wa).call(this,{type:"continue"})},retry:h.options.retry,retryDelay:h.options.retryDelay,networkMode:h.options.networkMode,canRun:()=>!0}));try{const R=await G(this,An).start();if(R===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(R),(M=(y=G(this,Ti).config).onSuccess)==null||M.call(y,R,this),(b=(E=G(this,Ti).config).onSettled)==null||b.call(E,R,this.state.error,this),R}catch(R){if(R instanceof wp){if(R.silent)return G(this,An).promise;if(R.revert){if(this.state.data===void 0)throw R;return this.state.data}}throw fe(this,di,wa).call(this,{type:"error",error:R}),(_=(x=G(this,Ti).config).onError)==null||_.call(x,R,this),(D=(L=G(this,Ti).config).onSettled)==null||D.call(L,this.state.data,R,this),R}finally{this.scheduleGc()}}},wo=new WeakMap,gs=new WeakMap,Do=new WeakMap,Ti=new WeakMap,vs=new WeakMap,An=new WeakMap,ou=new WeakMap,_s=new WeakMap,di=new WeakSet,Dx=function(){return this.state.fetchStatus==="paused"&&this.state.status==="pending"},wa=function(t){const i=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...Ux(r.data,this.options),fetchMeta:t.meta??null};case"success":const l={...r,...J0(t.data,t.dataUpdatedAt),dataUpdateCount:r.dataUpdateCount+1,...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return Pt(this,Do,t.manual?l:void 0),l;case"error":const u=t.error;return{...r,error:u,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:u,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=i(this.state),xn.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),G(this,Ti).notify({query:this,type:"updated",action:t})})},vx);function Ux(a,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:Rx(t.networkMode)?"fetching":"paused",...a===void 0&&{error:null,status:"pending"}}}function J0(a,t){return{data:a,dataUpdatedAt:t??Date.now(),error:null,isInvalidated:!1,status:"success"}}function $0(a){const t=typeof a.initialData=="function"?a.initialData():a.initialData,i=t!==void 0,r=i?typeof a.initialDataUpdatedAt=="function"?a.initialDataUpdatedAt():a.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:i?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:i?"success":"pending",fetchStatus:"idle"}}var $n,Te,lu,Xn,ys,Uo,Ua,Er,uu,Lo,No,xs,Ss,br,Oo,Pe,eu,Dp,Up,Lp,Np,Op,Pp,zp,Lx,_x,Sb=(_x=class extends Wo{constructor(t,i){super();Qt(this,Pe);Qt(this,$n);Qt(this,Te);Qt(this,lu);Qt(this,Xn);Qt(this,ys);Qt(this,Uo);Qt(this,Ua);Qt(this,Er);Qt(this,uu);Qt(this,Lo);Qt(this,No);Qt(this,xs);Qt(this,Ss);Qt(this,br);Qt(this,Oo,new Set);this.options=i,Pt(this,$n,t),Pt(this,Er,null),Pt(this,Ua,Cp()),this.bindMethods(),this.setOptions(i)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(G(this,Te).addObserver(this),ty(G(this,Te),this.options)?fe(this,Pe,eu).call(this):this.updateResult(),fe(this,Pe,Np).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Fp(G(this,Te),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Fp(G(this,Te),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,fe(this,Pe,Op).call(this),fe(this,Pe,Pp).call(this),G(this,Te).removeObserver(this)}setOptions(t){const i=this.options,r=G(this,Te);if(this.options=G(this,$n).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof pi(this.options.enabled,G(this,Te))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");fe(this,Pe,zp).call(this),G(this,Te).setOptions(this.options),i._defaulted&&!hf(this.options,i)&&G(this,$n).getQueryCache().notify({type:"observerOptionsUpdated",query:G(this,Te),observer:this});const l=this.hasListeners();l&&ey(G(this,Te),r,this.options,i)&&fe(this,Pe,eu).call(this),this.updateResult(),l&&(G(this,Te)!==r||pi(this.options.enabled,G(this,Te))!==pi(i.enabled,G(this,Te))||wr(this.options.staleTime,G(this,Te))!==wr(i.staleTime,G(this,Te)))&&fe(this,Pe,Dp).call(this);const u=fe(this,Pe,Up).call(this);l&&(G(this,Te)!==r||pi(this.options.enabled,G(this,Te))!==pi(i.enabled,G(this,Te))||u!==G(this,br))&&fe(this,Pe,Lp).call(this,u)}getOptimisticResult(t){const i=G(this,$n).getQueryCache().build(G(this,$n),t),r=this.createResult(i,t);return Eb(this,r)&&(Pt(this,Xn,r),Pt(this,Uo,this.options),Pt(this,ys,G(this,Te).state)),r}getCurrentResult(){return G(this,Xn)}trackResult(t,i){return new Proxy(t,{get:(r,l)=>(this.trackProp(l),i==null||i(l),l==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&G(this,Ua).status==="pending"&&G(this,Ua).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(r,l))})}trackProp(t){G(this,Oo).add(t)}getCurrentQuery(){return G(this,Te)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const i=G(this,$n).defaultQueryOptions(t),r=G(this,$n).getQueryCache().build(G(this,$n),i);return r.fetch().then(()=>this.createResult(r,i))}fetch(t){return fe(this,Pe,eu).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),G(this,Xn)))}createResult(t,i){var U;const r=G(this,Te),l=this.options,u=G(this,Xn),f=G(this,ys),h=G(this,Uo),m=t!==r?t.state:G(this,lu),{state:g}=t;let v={...g},y=!1,M;if(i._optimisticResults){const w=this.hasListeners(),k=!w&&ty(t,i),ut=w&&ey(t,r,i,l);(k||ut)&&(v={...v,...Ux(g.data,t.options)}),i._optimisticResults==="isRestoring"&&(v.fetchStatus="idle")}let{error:E,errorUpdatedAt:b,status:x}=v;M=v.data;let _=!1;if(i.placeholderData!==void 0&&M===void 0&&x==="pending"){let w;u!=null&&u.isPlaceholderData&&i.placeholderData===(h==null?void 0:h.placeholderData)?(w=u.data,_=!0):w=typeof i.placeholderData=="function"?i.placeholderData((U=G(this,No))==null?void 0:U.state.data,G(this,No)):i.placeholderData,w!==void 0&&(x="success",M=Rp(u==null?void 0:u.data,w,i),y=!0)}if(i.select&&M!==void 0&&!_)if(u&&M===(f==null?void 0:f.data)&&i.select===G(this,uu))M=G(this,Lo);else try{Pt(this,uu,i.select),M=i.select(M),M=Rp(u==null?void 0:u.data,M,i),Pt(this,Lo,M),Pt(this,Er,null)}catch(w){Pt(this,Er,w)}G(this,Er)&&(E=G(this,Er),M=G(this,Lo),b=Date.now(),x="error");const L=v.fetchStatus==="fetching",D=x==="pending",R=x==="error",V=D&&L,z=M!==void 0,X={status:x,fetchStatus:v.fetchStatus,isPending:D,isSuccess:x==="success",isError:R,isInitialLoading:V,isLoading:V,data:M,dataUpdatedAt:v.dataUpdatedAt,error:E,errorUpdatedAt:b,failureCount:v.fetchFailureCount,failureReason:v.fetchFailureReason,errorUpdateCount:v.errorUpdateCount,isFetched:t.isFetched(),isFetchedAfterMount:v.dataUpdateCount>m.dataUpdateCount||v.errorUpdateCount>m.errorUpdateCount,isFetching:L,isRefetching:L&&!D,isLoadingError:R&&!z,isPaused:v.fetchStatus==="paused",isPlaceholderData:y,isRefetchError:R&&z,isStale:Fm(t,i),refetch:this.refetch,promise:G(this,Ua),isEnabled:pi(i.enabled,t)!==!1};if(this.options.experimental_prefetchInRender){const w=X.data!==void 0,k=X.status==="error"&&!w,ut=ht=>{k?ht.reject(X.error):w&&ht.resolve(X.data)},ot=()=>{const ht=Pt(this,Ua,X.promise=Cp());ut(ht)},mt=G(this,Ua);switch(mt.status){case"pending":t.queryHash===r.queryHash&&ut(mt);break;case"fulfilled":(k||X.data!==mt.value)&&ot();break;case"rejected":(!k||X.error!==mt.reason)&&ot();break}}return X}updateResult(){const t=G(this,Xn),i=this.createResult(G(this,Te),this.options);if(Pt(this,ys,G(this,Te).state),Pt(this,Uo,this.options),G(this,ys).data!==void 0&&Pt(this,No,G(this,Te)),hf(i,t))return;Pt(this,Xn,i);const r=()=>{if(!t)return!0;const{notifyOnChangeProps:l}=this.options,u=typeof l=="function"?l():l;if(u==="all"||!u&&!G(this,Oo).size)return!0;const f=new Set(u??G(this,Oo));return this.options.throwOnError&&f.add("error"),Object.keys(G(this,Xn)).some(h=>{const p=h;return G(this,Xn)[p]!==t[p]&&f.has(p)})};fe(this,Pe,Lx).call(this,{listeners:r()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&fe(this,Pe,Np).call(this)}},$n=new WeakMap,Te=new WeakMap,lu=new WeakMap,Xn=new WeakMap,ys=new WeakMap,Uo=new WeakMap,Ua=new WeakMap,Er=new WeakMap,uu=new WeakMap,Lo=new WeakMap,No=new WeakMap,xs=new WeakMap,Ss=new WeakMap,br=new WeakMap,Oo=new WeakMap,Pe=new WeakSet,eu=function(t){fe(this,Pe,zp).call(this);let i=G(this,Te).fetch(this.options,t);return t!=null&&t.throwOnError||(i=i.catch(qn)),i},Dp=function(){fe(this,Pe,Op).call(this);const t=wr(this.options.staleTime,G(this,Te));if(au.isServer()||G(this,Xn).isStale||!Tp(t))return;const r=bx(G(this,Xn).dataUpdatedAt,t)+1;Pt(this,xs,cs.setTimeout(()=>{G(this,Xn).isStale||this.updateResult()},r))},Up=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(G(this,Te)):this.options.refetchInterval)??!1},Lp=function(t){fe(this,Pe,Pp).call(this),Pt(this,br,t),!(au.isServer()||pi(this.options.enabled,G(this,Te))===!1||!Tp(G(this,br))||G(this,br)===0)&&Pt(this,Ss,cs.setInterval(()=>{(this.options.refetchIntervalInBackground||Nm.isFocused())&&fe(this,Pe,eu).call(this)},G(this,br)))},Np=function(){fe(this,Pe,Dp).call(this),fe(this,Pe,Lp).call(this,fe(this,Pe,Up).call(this))},Op=function(){G(this,xs)!==void 0&&(cs.clearTimeout(G(this,xs)),Pt(this,xs,void 0))},Pp=function(){G(this,Ss)!==void 0&&(cs.clearInterval(G(this,Ss)),Pt(this,Ss,void 0))},zp=function(){const t=G(this,$n).getQueryCache().build(G(this,$n),this.options);if(t===G(this,Te))return;const i=G(this,Te);Pt(this,Te,t),Pt(this,lu,t.state),this.hasListeners()&&(i==null||i.removeObserver(this),t.addObserver(this))},Lx=function(t){xn.batch(()=>{t.listeners&&this.listeners.forEach(i=>{i(G(this,Xn))}),G(this,$n).getQueryCache().notify({query:G(this,Te),type:"observerResultsUpdated"})})},_x);function Mb(a,t){return pi(t.enabled,a)!==!1&&a.state.data===void 0&&!(a.state.status==="error"&&pi(t.retryOnMount,a)===!1)}function ty(a,t){return Mb(a,t)||a.state.data!==void 0&&Fp(a,t,t.refetchOnMount)}function Fp(a,t,i){if(pi(t.enabled,a)!==!1&&wr(t.staleTime,a)!=="static"){const r=typeof i=="function"?i(a):i;return r==="always"||r!==!1&&Fm(a,t)}return!1}function ey(a,t,i,r){return(a!==t||pi(r.enabled,a)===!1)&&(!i.suspense||a.state.status!=="error")&&Fm(a,i)}function Fm(a,t){return pi(t.enabled,a)!==!1&&a.isStaleByTime(wr(t.staleTime,a))}function Eb(a,t){return!hf(a.getCurrentResult(),t)}var cu,Ki,In,Ms,Ji,_r,yx,bb=(yx=class extends wx{constructor(t){super();Qt(this,Ji);Qt(this,cu);Qt(this,Ki);Qt(this,In);Qt(this,Ms);Pt(this,cu,t.client),this.mutationId=t.mutationId,Pt(this,In,t.mutationCache),Pt(this,Ki,[]),this.state=t.state||Nx(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){G(this,Ki).includes(t)||(G(this,Ki).push(t),this.clearGcTimeout(),G(this,In).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){Pt(this,Ki,G(this,Ki).filter(i=>i!==t)),this.scheduleGc(),G(this,In).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){G(this,Ki).length||(this.state.status==="pending"?this.scheduleGc():G(this,In).remove(this))}continue(){var t;return((t=G(this,Ms))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var f,h,p,m,g,v,y,M,E,b,x,_,L,D,R,V,z,N;const i=()=>{fe(this,Ji,_r).call(this,{type:"continue"})},r={client:G(this,cu),meta:this.options.meta,mutationKey:this.options.mutationKey};Pt(this,Ms,Cx({fn:()=>this.options.mutationFn?this.options.mutationFn(t,r):Promise.reject(new Error("No mutationFn found")),onFail:(X,U)=>{fe(this,Ji,_r).call(this,{type:"failed",failureCount:X,error:U})},onPause:()=>{fe(this,Ji,_r).call(this,{type:"pause"})},onContinue:i,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>G(this,In).canRun(this)}));const l=this.state.status==="pending",u=!G(this,Ms).canStart();try{if(l)i();else{fe(this,Ji,_r).call(this,{type:"pending",variables:t,isPaused:u}),G(this,In).config.onMutate&&await G(this,In).config.onMutate(t,this,r);const U=await((h=(f=this.options).onMutate)==null?void 0:h.call(f,t,r));U!==this.state.context&&fe(this,Ji,_r).call(this,{type:"pending",context:U,variables:t,isPaused:u})}const X=await G(this,Ms).start();return await((m=(p=G(this,In).config).onSuccess)==null?void 0:m.call(p,X,t,this.state.context,this,r)),await((v=(g=this.options).onSuccess)==null?void 0:v.call(g,X,t,this.state.context,r)),await((M=(y=G(this,In).config).onSettled)==null?void 0:M.call(y,X,null,this.state.variables,this.state.context,this,r)),await((b=(E=this.options).onSettled)==null?void 0:b.call(E,X,null,t,this.state.context,r)),fe(this,Ji,_r).call(this,{type:"success",data:X}),X}catch(X){try{await((_=(x=G(this,In).config).onError)==null?void 0:_.call(x,X,t,this.state.context,this,r))}catch(U){Promise.reject(U)}try{await((D=(L=this.options).onError)==null?void 0:D.call(L,X,t,this.state.context,r))}catch(U){Promise.reject(U)}try{await((V=(R=G(this,In).config).onSettled)==null?void 0:V.call(R,void 0,X,this.state.variables,this.state.context,this,r))}catch(U){Promise.reject(U)}try{await((N=(z=this.options).onSettled)==null?void 0:N.call(z,void 0,X,t,this.state.context,r))}catch(U){Promise.reject(U)}throw fe(this,Ji,_r).call(this,{type:"error",error:X}),X}finally{G(this,In).runNext(this)}}},cu=new WeakMap,Ki=new WeakMap,In=new WeakMap,Ms=new WeakMap,Ji=new WeakSet,_r=function(t){const i=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=i(this.state),xn.batch(()=>{G(this,Ki).forEach(r=>{r.onMutationUpdate(t)}),G(this,In).notify({mutation:this,type:"updated",action:t})})},yx);function Nx(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var La,Ii,fu,xx,Tb=(xx=class extends Wo{constructor(t={}){super();Qt(this,La);Qt(this,Ii);Qt(this,fu);this.config=t,Pt(this,La,new Set),Pt(this,Ii,new Map),Pt(this,fu,0)}build(t,i,r){const l=new bb({client:t,mutationCache:this,mutationId:++wc(this,fu)._,options:t.defaultMutationOptions(i),state:r});return this.add(l),l}add(t){G(this,La).add(t);const i=Dc(t);if(typeof i=="string"){const r=G(this,Ii).get(i);r?r.push(t):G(this,Ii).set(i,[t])}this.notify({type:"added",mutation:t})}remove(t){if(G(this,La).delete(t)){const i=Dc(t);if(typeof i=="string"){const r=G(this,Ii).get(i);if(r)if(r.length>1){const l=r.indexOf(t);l!==-1&&r.splice(l,1)}else r[0]===t&&G(this,Ii).delete(i)}}this.notify({type:"removed",mutation:t})}canRun(t){const i=Dc(t);if(typeof i=="string"){const r=G(this,Ii).get(i),l=r==null?void 0:r.find(u=>u.state.status==="pending");return!l||l===t}else return!0}runNext(t){var r;const i=Dc(t);if(typeof i=="string"){const l=(r=G(this,Ii).get(i))==null?void 0:r.find(u=>u!==t&&u.state.isPaused);return(l==null?void 0:l.continue())??Promise.resolve()}else return Promise.resolve()}clear(){xn.batch(()=>{G(this,La).forEach(t=>{this.notify({type:"removed",mutation:t})}),G(this,La).clear(),G(this,Ii).clear()})}getAll(){return Array.from(G(this,La))}find(t){const i={exact:!0,...t};return this.getAll().find(r=>Y0(i,r))}findAll(t={}){return this.getAll().filter(i=>Y0(t,i))}notify(t){xn.batch(()=>{this.listeners.forEach(i=>{i(t)})})}resumePausedMutations(){const t=this.getAll().filter(i=>i.state.isPaused);return xn.batch(()=>Promise.all(t.map(i=>i.continue().catch(qn))))}},La=new WeakMap,Ii=new WeakMap,fu=new WeakMap,xx);function Dc(a){var t;return(t=a.options.scope)==null?void 0:t.id}var Na,Tr,ti,Oa,Ba,ef,Ip,Sx,Ab=(Sx=class extends Wo{constructor(i,r){super();Qt(this,Ba);Qt(this,Na);Qt(this,Tr);Qt(this,ti);Qt(this,Oa);Pt(this,Na,i),this.setOptions(r),this.bindMethods(),fe(this,Ba,ef).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(i){var l;const r=this.options;this.options=G(this,Na).defaultMutationOptions(i),hf(this.options,r)||G(this,Na).getMutationCache().notify({type:"observerOptionsUpdated",mutation:G(this,ti),observer:this}),r!=null&&r.mutationKey&&this.options.mutationKey&&Es(r.mutationKey)!==Es(this.options.mutationKey)?this.reset():((l=G(this,ti))==null?void 0:l.state.status)==="pending"&&G(this,ti).setOptions(this.options)}onUnsubscribe(){var i;this.hasListeners()||(i=G(this,ti))==null||i.removeObserver(this)}onMutationUpdate(i){fe(this,Ba,ef).call(this),fe(this,Ba,Ip).call(this,i)}getCurrentResult(){return G(this,Tr)}reset(){var i;(i=G(this,ti))==null||i.removeObserver(this),Pt(this,ti,void 0),fe(this,Ba,ef).call(this),fe(this,Ba,Ip).call(this)}mutate(i,r){var l;return Pt(this,Oa,r),(l=G(this,ti))==null||l.removeObserver(this),Pt(this,ti,G(this,Na).getMutationCache().build(G(this,Na),this.options)),G(this,ti).addObserver(this),G(this,ti).execute(i)}},Na=new WeakMap,Tr=new WeakMap,ti=new WeakMap,Oa=new WeakMap,Ba=new WeakSet,ef=function(){var r;const i=((r=G(this,ti))==null?void 0:r.state)??Nx();Pt(this,Tr,{...i,isPending:i.status==="pending",isSuccess:i.status==="success",isError:i.status==="error",isIdle:i.status==="idle",mutate:this.mutate,reset:this.reset})},Ip=function(i){xn.batch(()=>{var r,l,u,f,h,p,m,g;if(G(this,Oa)&&this.hasListeners()){const v=G(this,Tr).variables,y=G(this,Tr).context,M={client:G(this,Na),meta:this.options.meta,mutationKey:this.options.mutationKey};if((i==null?void 0:i.type)==="success"){try{(l=(r=G(this,Oa)).onSuccess)==null||l.call(r,i.data,v,y,M)}catch(E){Promise.reject(E)}try{(f=(u=G(this,Oa)).onSettled)==null||f.call(u,i.data,null,v,y,M)}catch(E){Promise.reject(E)}}else if((i==null?void 0:i.type)==="error"){try{(p=(h=G(this,Oa)).onError)==null||p.call(h,i.error,v,y,M)}catch(E){Promise.reject(E)}try{(g=(m=G(this,Oa)).onSettled)==null||g.call(m,void 0,i.error,v,y,M)}catch(E){Promise.reject(E)}}}this.listeners.forEach(v=>{v(G(this,Tr))})})},Sx),$i,Mx,Rb=(Mx=class extends Wo{constructor(t={}){super();Qt(this,$i);this.config=t,Pt(this,$i,new Map)}build(t,i,r){const l=i.queryKey,u=i.queryHash??Om(l,i);let f=this.get(u);return f||(f=new xb({client:t,queryKey:l,queryHash:u,options:t.defaultQueryOptions(i),state:r,defaultOptions:t.getQueryDefaults(l)}),this.add(f)),f}add(t){G(this,$i).has(t.queryHash)||(G(this,$i).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const i=G(this,$i).get(t.queryHash);i&&(t.destroy(),i===t&&G(this,$i).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){xn.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return G(this,$i).get(t)}getAll(){return[...G(this,$i).values()]}find(t){const i={exact:!0,...t};return this.getAll().find(r=>W0(i,r))}findAll(t={}){const i=this.getAll();return Object.keys(t).length>0?i.filter(r=>W0(t,r)):i}notify(t){xn.batch(()=>{this.listeners.forEach(i=>{i(t)})})}onFocus(){xn.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){xn.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},$i=new WeakMap,Mx),rn,Ar,Rr,Po,zo,Cr,Fo,Io,Ex,Cb=(Ex=class{constructor(a={}){Qt(this,rn);Qt(this,Ar);Qt(this,Rr);Qt(this,Po);Qt(this,zo);Qt(this,Cr);Qt(this,Fo);Qt(this,Io);Pt(this,rn,a.queryCache||new Rb),Pt(this,Ar,a.mutationCache||new Tb),Pt(this,Rr,a.defaultOptions||{}),Pt(this,Po,new Map),Pt(this,zo,new Map),Pt(this,Cr,0)}mount(){wc(this,Cr)._++,G(this,Cr)===1&&(Pt(this,Fo,Nm.subscribe(async a=>{a&&(await this.resumePausedMutations(),G(this,rn).onFocus())})),Pt(this,Io,df.subscribe(async a=>{a&&(await this.resumePausedMutations(),G(this,rn).onOnline())})))}unmount(){var a,t;wc(this,Cr)._--,G(this,Cr)===0&&((a=G(this,Fo))==null||a.call(this),Pt(this,Fo,void 0),(t=G(this,Io))==null||t.call(this),Pt(this,Io,void 0))}isFetching(a){return G(this,rn).findAll({...a,fetchStatus:"fetching"}).length}isMutating(a){return G(this,Ar).findAll({...a,status:"pending"}).length}getQueryData(a){var i;const t=this.defaultQueryOptions({queryKey:a});return(i=G(this,rn).get(t.queryHash))==null?void 0:i.state.data}ensureQueryData(a){const t=this.defaultQueryOptions(a),i=G(this,rn).build(this,t),r=i.state.data;return r===void 0?this.fetchQuery(a):(a.revalidateIfStale&&i.isStaleByTime(wr(t.staleTime,i))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(a){return G(this,rn).findAll(a).map(({queryKey:t,state:i})=>{const r=i.data;return[t,r]})}setQueryData(a,t,i){const r=this.defaultQueryOptions({queryKey:a}),l=G(this,rn).get(r.queryHash),u=l==null?void 0:l.state.data,f=lb(t,u);if(f!==void 0)return G(this,rn).build(this,r).setData(f,{...i,manual:!0})}setQueriesData(a,t,i){return xn.batch(()=>G(this,rn).findAll(a).map(({queryKey:r})=>[r,this.setQueryData(r,t,i)]))}getQueryState(a){var i;const t=this.defaultQueryOptions({queryKey:a});return(i=G(this,rn).get(t.queryHash))==null?void 0:i.state}removeQueries(a){const t=G(this,rn);xn.batch(()=>{t.findAll(a).forEach(i=>{t.remove(i)})})}resetQueries(a,t){const i=G(this,rn);return xn.batch(()=>(i.findAll(a).forEach(r=>{r.reset()}),this.refetchQueries({type:"active",...a},t)))}cancelQueries(a,t={}){const i={revert:!0,...t},r=xn.batch(()=>G(this,rn).findAll(a).map(l=>l.cancel(i)));return Promise.all(r).then(qn).catch(qn)}invalidateQueries(a,t={}){return xn.batch(()=>(G(this,rn).findAll(a).forEach(i=>{i.invalidate()}),(a==null?void 0:a.refetchType)==="none"?Promise.resolve():this.refetchQueries({...a,type:(a==null?void 0:a.refetchType)??(a==null?void 0:a.type)??"active"},t)))}refetchQueries(a,t={}){const i={...t,cancelRefetch:t.cancelRefetch??!0},r=xn.batch(()=>G(this,rn).findAll(a).filter(l=>!l.isDisabled()&&!l.isStatic()).map(l=>{let u=l.fetch(void 0,i);return i.throwOnError||(u=u.catch(qn)),l.state.fetchStatus==="paused"?Promise.resolve():u}));return Promise.all(r).then(qn)}fetchQuery(a){const t=this.defaultQueryOptions(a);t.retry===void 0&&(t.retry=!1);const i=G(this,rn).build(this,t);return i.isStaleByTime(wr(t.staleTime,i))?i.fetch(t):Promise.resolve(i.state.data)}prefetchQuery(a){return this.fetchQuery(a).then(qn).catch(qn)}fetchInfiniteQuery(a){return a._type="infinite",this.fetchQuery(a)}prefetchInfiniteQuery(a){return this.fetchInfiniteQuery(a).then(qn).catch(qn)}ensureInfiniteQueryData(a){return a._type="infinite",this.ensureQueryData(a)}resumePausedMutations(){return df.isOnline()?G(this,Ar).resumePausedMutations():Promise.resolve()}getQueryCache(){return G(this,rn)}getMutationCache(){return G(this,Ar)}getDefaultOptions(){return G(this,Rr)}setDefaultOptions(a){Pt(this,Rr,a)}setQueryDefaults(a,t){G(this,Po).set(Es(a),{queryKey:a,defaultOptions:t})}getQueryDefaults(a){const t=[...G(this,Po).values()],i={};return t.forEach(r=>{Bo(a,r.queryKey)&&Object.assign(i,r.defaultOptions)}),i}setMutationDefaults(a,t){G(this,zo).set(Es(a),{mutationKey:a,defaultOptions:t})}getMutationDefaults(a){const t=[...G(this,zo).values()],i={};return t.forEach(r=>{Bo(a,r.mutationKey)&&Object.assign(i,r.defaultOptions)}),i}defaultQueryOptions(a){if(a._defaulted)return a;const t={...G(this,Rr).queries,...this.getQueryDefaults(a.queryKey),...a,_defaulted:!0};return t.queryHash||(t.queryHash=Om(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Pm&&(t.enabled=!1),t}defaultMutationOptions(a){return a!=null&&a._defaulted?a:{...G(this,Rr).mutations,...(a==null?void 0:a.mutationKey)&&this.getMutationDefaults(a.mutationKey),...a,_defaulted:!0}}clear(){G(this,rn).clear(),G(this,Ar).clear()}},rn=new WeakMap,Ar=new WeakMap,Rr=new WeakMap,Po=new WeakMap,zo=new WeakMap,Cr=new WeakMap,Fo=new WeakMap,Io=new WeakMap,Ex),Ox=$.createContext(void 0),Im=a=>{const t=$.useContext(Ox);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},wb=({client:a,children:t})=>($.useEffect(()=>(a.mount(),()=>{a.unmount()}),[a]),F.jsx(Ox.Provider,{value:a,children:t})),Px=$.createContext(!1),Db=()=>$.useContext(Px);Px.Provider;function Ub(){let a=!1;return{clearReset:()=>{a=!1},reset:()=>{a=!0},isReset:()=>a}}var Lb=$.createContext(Ub()),Nb=()=>$.useContext(Lb),Ob=(a,t,i)=>{const r=i!=null&&i.state.error&&typeof a.throwOnError=="function"?zm(a.throwOnError,[i.state.error,i]):a.throwOnError;(a.suspense||a.experimental_prefetchInRender||r)&&(t.isReset()||(a.retryOnMount=!1))},Pb=a=>{$.useEffect(()=>{a.clearReset()},[a])},zb=({result:a,errorResetBoundary:t,throwOnError:i,query:r,suspense:l})=>a.isError&&!t.isReset()&&!a.isFetching&&r&&(l&&a.data===void 0||zm(i,[a.error,r])),Fb=a=>{if(a.suspense){const i=l=>l==="static"?l:Math.max(l??1e3,1e3),r=a.staleTime;a.staleTime=typeof r=="function"?(...l)=>i(r(...l)):i(r),typeof a.gcTime=="number"&&(a.gcTime=Math.max(a.gcTime,1e3))}},Ib=(a,t)=>a.isLoading&&a.isFetching&&!t,Bb=(a,t)=>(a==null?void 0:a.suspense)&&t.isPending,ny=(a,t,i)=>t.fetchOptimistic(a).catch(()=>{i.clearReset()});function Hb(a,t,i){var M,E,b,x;const r=Db(),l=Nb(),u=Im(),f=u.defaultQueryOptions(a);(E=(M=u.getDefaultOptions().queries)==null?void 0:M._experimental_beforeQuery)==null||E.call(M,f);const h=u.getQueryCache().get(f.queryHash),p=a.subscribed!==!1;f._optimisticResults=r?"isRestoring":p?"optimistic":void 0,Fb(f),Ob(f,l,h),Pb(l);const m=!u.getQueryCache().get(f.queryHash),[g]=$.useState(()=>new t(u,f)),v=g.getOptimisticResult(f),y=!r&&p;if($.useSyncExternalStore($.useCallback(_=>{const L=y?g.subscribe(xn.batchCalls(_)):qn;return g.updateResult(),L},[g,y]),()=>g.getCurrentResult(),()=>g.getCurrentResult()),$.useEffect(()=>{g.setOptions(f)},[f,g]),Bb(f,v))throw ny(f,g,l);if(zb({result:v,errorResetBoundary:l,throwOnError:f.throwOnError,query:h,suspense:f.suspense}))throw v.error;if((x=(b=u.getDefaultOptions().queries)==null?void 0:b._experimental_afterQuery)==null||x.call(b,f,v),f.experimental_prefetchInRender&&!au.isServer()&&Ib(v,r)){const _=m?ny(f,g,l):h==null?void 0:h.promise;_==null||_.catch(qn).finally(()=>{g.updateResult()})}return f.notifyOnChangeProps?v:g.trackResult(v)}function nf(a,t){return Hb(a,Sb)}function iy(a,t){const i=Im(),[r]=$.useState(()=>new Ab(i,a));$.useEffect(()=>{r.setOptions(a)},[r,a]);const l=$.useSyncExternalStore($.useCallback(f=>r.subscribe(xn.batchCalls(f)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),u=$.useCallback((f,h)=>{r.mutate(f,h).catch(qn)},[r]);if(l.error&&zm(r.options.throwOnError,[l.error]))throw l.error;return{...l,mutate:u,mutateAsync:l.mutate}}/**
 * react-router v7.18.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Bm=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,zx=/^[\\/]{2}/;function Gb(a,t){return t+a.replace(/\\/g,"/")}var ay="popstate";function ry(a){return typeof a=="object"&&a!=null&&"pathname"in a&&"search"in a&&"hash"in a&&"state"in a&&"key"in a}function Vb(a={}){function t(r,l){var m;let u=(m=l.state)==null?void 0:m.masked,{pathname:f,search:h,hash:p}=u||r.location;return Bp("",{pathname:f,search:h,hash:p},l.state&&l.state.usr||null,l.state&&l.state.key||"default",u?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function i(r,l){return typeof l=="string"?l:ru(l)}return Xb(t,i,null,a)}function tn(a,t){if(a===!1||a===null||typeof a>"u")throw new Error(t)}function Xi(a,t){if(!a){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function kb(){return Math.random().toString(36).substring(2,10)}function sy(a,t){return{usr:a.state,key:a.key,idx:t,masked:a.mask?{pathname:a.pathname,search:a.search,hash:a.hash}:void 0}}function Bp(a,t,i=null,r,l){return{pathname:typeof a=="string"?a:a.pathname,search:"",hash:"",...typeof t=="string"?Yo(t):t,state:i,key:t&&t.key||r||kb(),mask:l}}function ru({pathname:a="/",search:t="",hash:i=""}){return t&&t!=="?"&&(a+=t.charAt(0)==="?"?t:"?"+t),i&&i!=="#"&&(a+=i.charAt(0)==="#"?i:"#"+i),a}function Yo(a){let t={};if(a){let i=a.indexOf("#");i>=0&&(t.hash=a.substring(i),a=a.substring(0,i));let r=a.indexOf("?");r>=0&&(t.search=a.substring(r),a=a.substring(0,r)),a&&(t.pathname=a)}return t}function Xb(a,t,i,r={}){let{window:l=document.defaultView,v5Compat:u=!1}=r,f=l.history,h="POP",p=null,m=g();m==null&&(m=0,f.replaceState({...f.state,idx:m},""));function g(){return(f.state||{idx:null}).idx}function v(){h="POP";let x=g(),_=x==null?null:x-m;m=x,p&&p({action:h,location:b.location,delta:_})}function y(x,_){h="PUSH";let L=ry(x)?x:Bp(b.location,x,_);m=g()+1;let D=sy(L,m),R=b.createHref(L.mask||L);try{f.pushState(D,"",R)}catch(V){if(V instanceof DOMException&&V.name==="DataCloneError")throw V;l.location.assign(R)}u&&p&&p({action:h,location:b.location,delta:1})}function M(x,_){h="REPLACE";let L=ry(x)?x:Bp(b.location,x,_);m=g();let D=sy(L,m),R=b.createHref(L.mask||L);f.replaceState(D,"",R),u&&p&&p({action:h,location:b.location,delta:0})}function E(x){return qb(l,x)}let b={get action(){return h},get location(){return a(l,f)},listen(x){if(p)throw new Error("A history only accepts one active listener");return l.addEventListener(ay,v),p=x,()=>{l.removeEventListener(ay,v),p=null}},createHref(x){return t(l,x)},createURL:E,encodeLocation(x){let _=E(x);return{pathname:_.pathname,search:_.search,hash:_.hash}},push:y,replace:M,go(x){return f.go(x)}};return b}function qb(a,t,i=!1){let r="http://localhost";a&&(r=a.location.origin!=="null"?a.location.origin:a.location.href),tn(r,"No window.location.(origin|href) available to create URL");let l=typeof t=="string"?t:ru(t);return l=l.replace(/ $/,"%20"),!i&&zx.test(l)&&(l=r+l),new URL(l,r)}function Fx(a,t,i="/"){return jb(a,t,i,!1)}function jb(a,t,i,r,l){let u=typeof t=="string"?Yo(t):t,f=Ha(u.pathname||"/",i);if(f==null)return null;let h=Wb(a),p=null,m=aT(f);for(let g=0;p==null&&g<h.length;++g)p=iT(h[g],m,r);return p}function Wb(a){let t=Ix(a);return Yb(t),t}function Ix(a,t=[],i=[],r="",l=!1){let u=(f,h,p=l,m)=>{let g={relativePath:m===void 0?f.path||"":m,caseSensitive:f.caseSensitive===!0,childrenIndex:h,route:f};if(g.relativePath.startsWith("/")){if(!g.relativePath.startsWith(r)&&p)return;tn(g.relativePath.startsWith(r),`Absolute route path "${g.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),g.relativePath=g.relativePath.slice(r.length)}let v=Vi([r,g.relativePath]),y=i.concat(g);f.children&&f.children.length>0&&(tn(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${v}".`),Ix(f.children,t,y,v,p)),!(f.path==null&&!f.index)&&t.push({path:v,score:eT(v,f.index),routesMeta:y.map((M,E)=>{let[b,x]=Gx(M.relativePath,M.caseSensitive,E===y.length-1);return{...M,matcher:b,compiledParams:x}})})};return a.forEach((f,h)=>{var p;if(f.path===""||!((p=f.path)!=null&&p.includes("?")))u(f,h);else for(let m of Bx(f.path))u(f,h,!0,m)}),t}function Bx(a){let t=a.split("/");if(t.length===0)return[];let[i,...r]=t,l=i.endsWith("?"),u=i.replace(/\?$/,"");if(r.length===0)return l?[u,""]:[u];let f=Bx(r.join("/")),h=[];return h.push(...f.map(p=>p===""?u:[u,p].join("/"))),l&&h.push(...f),h.map(p=>a.startsWith("/")&&p===""?"/":p)}function Yb(a){a.sort((t,i)=>t.score!==i.score?i.score-t.score:nT(t.routesMeta.map(r=>r.childrenIndex),i.routesMeta.map(r=>r.childrenIndex)))}var Qb=/^:[\w-]+$/,Zb=3,Kb=2,Jb=1,$b=10,tT=-2,oy=a=>a==="*";function eT(a,t){let i=a.split("/"),r=i.length;return i.some(oy)&&(r+=tT),t&&(r+=Kb),i.filter(l=>!oy(l)).reduce((l,u)=>l+(Qb.test(u)?Zb:u===""?Jb:$b),r)}function nT(a,t){return a.length===t.length&&a.slice(0,-1).every((r,l)=>r===t[l])?a[a.length-1]-t[t.length-1]:0}function iT(a,t,i=!1){let{routesMeta:r}=a,l={},u="/",f=[];for(let h=0;h<r.length;++h){let p=r[h],m=h===r.length-1,g=u==="/"?t:t.slice(u.length)||"/",v={path:p.relativePath,caseSensitive:p.caseSensitive,end:m},y=p.matcher&&p.compiledParams?Hx(v,g,p.matcher,p.compiledParams):pf(v,g),M=p.route;if(!y&&m&&i&&!r[r.length-1].route.index&&(y=pf({path:p.relativePath,caseSensitive:p.caseSensitive,end:!1},g)),!y)return null;Object.assign(l,y.params),f.push({params:l,pathname:Vi([u,y.pathname]),pathnameBase:oT(Vi([u,y.pathnameBase])),route:M}),y.pathnameBase!=="/"&&(u=Vi([u,y.pathnameBase]))}return f}function pf(a,t){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[i,r]=Gx(a.path,a.caseSensitive,a.end);return Hx(a,t,i,r)}function Hx(a,t,i,r){let l=t.match(i);if(!l)return null;let u=l[0],f=u.replace(/(.)\/+$/,"$1"),h=l.slice(1);return{params:r.reduce((m,{paramName:g,isOptional:v},y)=>{if(g==="*"){let E=h[y]||"";f=u.slice(0,u.length-E.length).replace(/(.)\/+$/,"$1")}const M=h[y];return v&&!M?m[g]=void 0:m[g]=(M||"").replace(/%2F/g,"/"),m},{}),pathname:u,pathnameBase:f,pattern:a}}function Gx(a,t=!1,i=!0){Xi(a==="*"||!a.endsWith("*")||a.endsWith("/*"),`Route path "${a}" will be treated as if it were "${a.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/,"/*")}".`);let r=[],l="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,h,p,m,g)=>{if(r.push({paramName:h,isOptional:p!=null}),p){let v=g.charAt(m+f.length);return v&&v!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return a.endsWith("*")?(r.push({paramName:"*"}),l+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?l+="\\/*$":a!==""&&a!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,t?void 0:"i"),r]}function aT(a){try{return a.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Xi(!1,`The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),a}}function Ha(a,t){if(t==="/")return a;if(!a.toLowerCase().startsWith(t.toLowerCase()))return null;let i=t.endsWith("/")?t.length-1:t.length,r=a.charAt(i);return r&&r!=="/"?null:a.slice(i)||"/"}function rT(a,t="/"){let{pathname:i,search:r="",hash:l=""}=typeof a=="string"?Yo(a):a,u;return i?(i=Vx(i),i.startsWith("/")?u=ly(i.substring(1),"/"):u=ly(i,t)):u=t,{pathname:u,search:lT(r),hash:uT(l)}}function ly(a,t){let i=mf(t).split("/");return a.split("/").forEach(l=>{l===".."?i.length>1&&i.pop():l!=="."&&i.push(l)}),i.length>1?i.join("/"):"/"}function Xd(a,t,i,r){return`Cannot include a '${a}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function sT(a){return a.filter((t,i)=>i===0||t.route.path&&t.route.path.length>0)}function Hm(a){let t=sT(a);return t.map((i,r)=>r===t.length-1?i.pathname:i.pathnameBase)}function Mf(a,t,i,r=!1){let l;typeof a=="string"?l=Yo(a):(l={...a},tn(!l.pathname||!l.pathname.includes("?"),Xd("?","pathname","search",l)),tn(!l.pathname||!l.pathname.includes("#"),Xd("#","pathname","hash",l)),tn(!l.search||!l.search.includes("#"),Xd("#","search","hash",l)));let u=a===""||l.pathname==="",f=u?"/":l.pathname,h;if(f==null)h=i;else{let v=t.length-1;if(!r&&f.startsWith("..")){let y=f.split("/");for(;y[0]==="..";)y.shift(),v-=1;l.pathname=y.join("/")}h=v>=0?t[v]:"/"}let p=rT(l,h),m=f&&f!=="/"&&f.endsWith("/"),g=(u||f===".")&&i.endsWith("/");return!p.pathname.endsWith("/")&&(m||g)&&(p.pathname+="/"),p}var Vx=a=>a.replace(/[\\/]{2,}/g,"/"),Vi=a=>Vx(a.join("/")),mf=a=>a.replace(/\/+$/,""),oT=a=>mf(a).replace(/^\/*/,"/"),lT=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,uT=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a,cT=class{constructor(a,t,i,r=!1){this.status=a,this.statusText=t||"",this.internal=r,i instanceof Error?(this.data=i.toString(),this.error=i):this.data=i}};function fT(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}function hT(a){let t=a.map(i=>i.route.path).filter(Boolean);return Vi(t)||"/"}var kx=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Xx(a,t){let i=a;if(typeof i!="string"||!Bm.test(i))return{absoluteURL:void 0,isExternal:!1,to:i};let r=i,l=!1;if(kx)try{let u=new URL(window.location.href),f=zx.test(i)?new URL(Gb(i,u.protocol)):new URL(i),h=Ha(f.pathname,t);f.origin===u.origin&&h!=null?i=h+f.search+f.hash:l=!0}catch{Xi(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:l,to:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var qx=["POST","PUT","PATCH","DELETE"];new Set(qx);var dT=["GET",...qx];new Set(dT);var pT=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function mT(a){try{return pT.includes(new URL(a).protocol)}catch{return!1}}var Qo=$.createContext(null);Qo.displayName="DataRouter";var Ef=$.createContext(null);Ef.displayName="DataRouterState";var jx=$.createContext(!1);function gT(){return $.useContext(jx)}var Wx=$.createContext({isTransitioning:!1});Wx.displayName="ViewTransition";var vT=$.createContext(new Map);vT.displayName="Fetchers";var _T=$.createContext(null);_T.displayName="Await";var mi=$.createContext(null);mi.displayName="Navigation";var hu=$.createContext(null);hu.displayName="Location";var ia=$.createContext({outlet:null,matches:[],isDataRoute:!1});ia.displayName="Route";var Gm=$.createContext(null);Gm.displayName="RouteError";var Yx="REACT_ROUTER_ERROR",yT="REDIRECT",xT="ROUTE_ERROR_RESPONSE";function ST(a){if(a.startsWith(`${Yx}:${yT}:{`))try{let t=JSON.parse(a.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function MT(a){if(a.startsWith(`${Yx}:${xT}:{`))try{let t=JSON.parse(a.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new cT(t.status,t.statusText,t.data)}catch{}}function ET(a,{relative:t}={}){tn(Zo(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:r}=$.useContext(mi),{hash:l,pathname:u,search:f}=du(a,{relative:t}),h=u;return i!=="/"&&(h=u==="/"?i:Vi([i,u])),r.createHref({pathname:h,search:f,hash:l})}function Zo(){return $.useContext(hu)!=null}function aa(){return tn(Zo(),"useLocation() may be used only in the context of a <Router> component."),$.useContext(hu).location}var Qx="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Zx(a){$.useContext(mi).static||$.useLayoutEffect(a)}function Kx(){let{isDataRoute:a}=$.useContext(ia);return a?zT():bT()}function bT(){tn(Zo(),"useNavigate() may be used only in the context of a <Router> component.");let a=$.useContext(Qo),{basename:t,navigator:i}=$.useContext(mi),{matches:r}=$.useContext(ia),{pathname:l}=aa(),u=JSON.stringify(Hm(r)),f=$.useRef(!1);return Zx(()=>{f.current=!0}),$.useCallback((p,m={})=>{if(Xi(f.current,Qx),!f.current)return;if(typeof p=="number"){i.go(p);return}let g=Mf(p,JSON.parse(u),l,m.relative==="path");a==null&&t!=="/"&&(g.pathname=g.pathname==="/"?t:Vi([t,g.pathname])),(m.replace?i.replace:i.push)(g,m.state,m)},[t,i,u,l,a])}$.createContext(null);function du(a,{relative:t}={}){let{matches:i}=$.useContext(ia),{pathname:r}=aa(),l=JSON.stringify(Hm(i));return $.useMemo(()=>Mf(a,JSON.parse(l),r,t==="path"),[a,l,r,t])}function TT(a,t){return Jx(a,t)}function Jx(a,t,i){var x;tn(Zo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=$.useContext(mi),{matches:l}=$.useContext(ia),u=l[l.length-1],f=u?u.params:{},h=u?u.pathname:"/",p=u?u.pathnameBase:"/",m=u&&u.route;{let _=m&&m.path||"";tS(h,!m||_.endsWith("*")||_.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_==="/"?"*":`${_}/*`}">.`)}let g=aa(),v;if(t){let _=typeof t=="string"?Yo(t):t;tn(p==="/"||((x=_.pathname)==null?void 0:x.startsWith(p)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${_.pathname}" was given in the \`location\` prop.`),v=_}else v=g;let y=v.pathname||"/",M=y;if(p!=="/"){let _=p.replace(/^\//,"").split("/");M="/"+y.replace(/^\//,"").split("/").slice(_.length).join("/")}let E=i&&i.state.matches.length?i.state.matches.map(_=>Object.assign(_,{route:i.manifest[_.route.id]||_.route})):Fx(a,{pathname:M});Xi(m||E!=null,`No routes matched location "${v.pathname}${v.search}${v.hash}" `),Xi(E==null||E[E.length-1].route.element!==void 0||E[E.length-1].route.Component!==void 0||E[E.length-1].route.lazy!==void 0,`Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let b=DT(E&&E.map(_=>Object.assign({},_,{params:Object.assign({},f,_.params),pathname:Vi([p,r.encodeLocation?r.encodeLocation(_.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:_.pathname]),pathnameBase:_.pathnameBase==="/"?p:Vi([p,r.encodeLocation?r.encodeLocation(_.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:_.pathnameBase])})),l,i);return t&&b?$.createElement(hu.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...v},navigationType:"POP"}},b):b}function AT(){let a=PT(),t=fT(a)?`${a.status} ${a.statusText}`:a instanceof Error?a.message:JSON.stringify(a),i=a instanceof Error?a.stack:null,r="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:r},u={padding:"2px 4px",backgroundColor:r},f=null;return console.error("Error handled by React Router default ErrorBoundary:",a),f=$.createElement($.Fragment,null,$.createElement("p",null,"💿 Hey developer 👋"),$.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",$.createElement("code",{style:u},"ErrorBoundary")," or"," ",$.createElement("code",{style:u},"errorElement")," prop on your route.")),$.createElement($.Fragment,null,$.createElement("h2",null,"Unexpected Application Error!"),$.createElement("h3",{style:{fontStyle:"italic"}},t),i?$.createElement("pre",{style:l},i):null,f)}var RT=$.createElement(AT,null),$x=class extends $.Component{constructor(a){super(a),this.state={location:a.location,revalidation:a.revalidation,error:a.error}}static getDerivedStateFromError(a){return{error:a}}static getDerivedStateFromProps(a,t){return t.location!==a.location||t.revalidation!=="idle"&&a.revalidation==="idle"?{error:a.error,location:a.location,revalidation:a.revalidation}:{error:a.error!==void 0?a.error:t.error,location:t.location,revalidation:a.revalidation||t.revalidation}}componentDidCatch(a,t){this.props.onError?this.props.onError(a,t):console.error("React Router caught the following error during render",a)}render(){let a=this.state.error;if(this.context&&typeof a=="object"&&a&&"digest"in a&&typeof a.digest=="string"){const i=MT(a.digest);i&&(a=i)}let t=a!==void 0?$.createElement(ia.Provider,{value:this.props.routeContext},$.createElement(Gm.Provider,{value:a,children:this.props.component})):this.props.children;return this.context?$.createElement(CT,{error:a},t):t}};$x.contextType=jx;var qd=new WeakMap;function CT({children:a,error:t}){let{basename:i}=$.useContext(mi);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=ST(t.digest);if(r){let l=qd.get(t);if(l)throw l;let u=Xx(r.location,i),f=u.absoluteURL||u.to;if(mT(f))throw new Error("Invalid redirect location");if(kx&&!qd.get(t))if(u.isExternal||r.reloadDocument)window.location.href=f;else{const h=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(u.to,{replace:r.replace}));throw qd.set(t,h),h}return $.createElement("meta",{httpEquiv:"refresh",content:`0;url=${f}`})}}return a}function wT({routeContext:a,match:t,children:i}){let r=$.useContext(Qo);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),$.createElement(ia.Provider,{value:a},i)}function DT(a,t=[],i){let r=i==null?void 0:i.state;if(a==null){if(!r)return null;if(r.errors)a=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)a=r.matches;else return null}let l=a,u=r==null?void 0:r.errors;if(u!=null){let g=l.findIndex(v=>v.route.id&&(u==null?void 0:u[v.route.id])!==void 0);tn(g>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),l=l.slice(0,Math.min(l.length,g+1))}let f=!1,h=-1;if(i&&r){f=r.renderFallback;for(let g=0;g<l.length;g++){let v=l[g];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(h=g),v.route.id){let{loaderData:y,errors:M}=r,E=v.route.loader&&!y.hasOwnProperty(v.route.id)&&(!M||M[v.route.id]===void 0);if(v.route.lazy||E){i.isStatic&&(f=!0),h>=0?l=l.slice(0,h+1):l=[l[0]];break}}}}let p=i==null?void 0:i.onError,m=r&&p?(g,v)=>{var y,M;p(g,{location:r.location,params:((M=(y=r.matches)==null?void 0:y[0])==null?void 0:M.params)??{},pattern:hT(r.matches),errorInfo:v})}:void 0;return l.reduceRight((g,v,y)=>{let M,E=!1,b=null,x=null;r&&(M=u&&v.route.id?u[v.route.id]:void 0,b=v.route.errorElement||RT,f&&(h<0&&y===0?(tS("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),E=!0,x=null):h===y&&(E=!0,x=v.route.hydrateFallbackElement||null)));let _=t.concat(l.slice(0,y+1)),L=()=>{let D;return M?D=b:E?D=x:v.route.Component?D=$.createElement(v.route.Component,null):v.route.element?D=v.route.element:D=g,$.createElement(wT,{match:v,routeContext:{outlet:g,matches:_,isDataRoute:r!=null},children:D})};return r&&(v.route.ErrorBoundary||v.route.errorElement||y===0)?$.createElement($x,{location:r.location,revalidation:r.revalidation,component:b,error:M,children:L(),routeContext:{outlet:null,matches:_,isDataRoute:!0},onError:m}):L()},null)}function Vm(a){return`${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function UT(a){let t=$.useContext(Qo);return tn(t,Vm(a)),t}function LT(a){let t=$.useContext(Ef);return tn(t,Vm(a)),t}function NT(a){let t=$.useContext(ia);return tn(t,Vm(a)),t}function km(a){let t=NT(a),i=t.matches[t.matches.length-1];return tn(i.route.id,`${a} can only be used on routes that contain a unique "id"`),i.route.id}function OT(){return km("useRouteId")}function PT(){var r;let a=$.useContext(Gm),t=LT("useRouteError"),i=km("useRouteError");return a!==void 0?a:(r=t.errors)==null?void 0:r[i]}function zT(){let{router:a}=UT("useNavigate"),t=km("useNavigate"),i=$.useRef(!1);return Zx(()=>{i.current=!0}),$.useCallback(async(l,u={})=>{Xi(i.current,Qx),i.current&&(typeof l=="number"?await a.navigate(l):await a.navigate(l,{fromRouteId:t,...u}))},[a,t])}var uy={};function tS(a,t,i){!t&&!uy[a]&&(uy[a]=!0,Xi(!1,i))}$.memo(FT);function FT({routes:a,manifest:t,future:i,state:r,isStatic:l,onError:u}){return Jx(a,void 0,{manifest:t,state:r,isStatic:l,onError:u})}function IT({to:a,replace:t,state:i,relative:r}){tn(Zo(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=$.useContext(mi);Xi(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:u}=$.useContext(ia),{pathname:f}=aa(),h=Kx(),p=Mf(a,Hm(u),f,r==="path"),m=JSON.stringify(p);return $.useEffect(()=>{h(JSON.parse(m),{replace:t,state:i,relative:r})},[h,m,r,t,i]),null}function Hp(a){tn(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function BT({basename:a="/",children:t=null,location:i,navigationType:r="POP",navigator:l,static:u=!1,useTransitions:f}){tn(!Zo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let h=a.replace(/^\/*/,"/"),p=$.useMemo(()=>({basename:h,navigator:l,static:u,useTransitions:f,future:{}}),[h,l,u,f]);typeof i=="string"&&(i=Yo(i));let{pathname:m="/",search:g="",hash:v="",state:y=null,key:M="default",mask:E}=i,b=$.useMemo(()=>{let x=Ha(m,h);return x==null?null:{location:{pathname:x,search:g,hash:v,state:y,key:M,mask:E},navigationType:r}},[h,m,g,v,y,M,r,E]);return Xi(b!=null,`<Router basename="${h}"> is not able to match the URL "${m}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`),b==null?null:$.createElement(mi.Provider,{value:p},$.createElement(hu.Provider,{children:t,value:b}))}function HT({children:a,location:t}){return TT(Gp(a),t)}function Gp(a,t=[]){let i=[];return $.Children.forEach(a,(r,l)=>{if(!$.isValidElement(r))return;let u=[...t,l];if(r.type===$.Fragment){i.push.apply(i,Gp(r.props.children,u));return}tn(r.type===Hp,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),tn(!r.props.index||!r.props.children,"An index route cannot have child routes.");let f={id:r.props.id||u.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(f.children=Gp(r.props.children,u)),i.push(f)}),i}var af="get",rf="application/x-www-form-urlencoded";function bf(a){return typeof HTMLElement<"u"&&a instanceof HTMLElement}function GT(a){return bf(a)&&a.tagName.toLowerCase()==="button"}function VT(a){return bf(a)&&a.tagName.toLowerCase()==="form"}function kT(a){return bf(a)&&a.tagName.toLowerCase()==="input"}function XT(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function qT(a,t){return a.button===0&&(!t||t==="_self")&&!XT(a)}var Uc=null;function jT(){if(Uc===null)try{new FormData(document.createElement("form"),0),Uc=!1}catch{Uc=!0}return Uc}var WT=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function jd(a){return a!=null&&!WT.has(a)?(Xi(!1,`"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${rf}"`),null):a}function YT(a,t){let i,r,l,u,f;if(VT(a)){let h=a.getAttribute("action");r=h?Ha(h,t):null,i=a.getAttribute("method")||af,l=jd(a.getAttribute("enctype"))||rf,u=new FormData(a)}else if(GT(a)||kT(a)&&(a.type==="submit"||a.type==="image")){let h=a.form;if(h==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let p=a.getAttribute("formaction")||h.getAttribute("action");if(r=p?Ha(p,t):null,i=a.getAttribute("formmethod")||h.getAttribute("method")||af,l=jd(a.getAttribute("formenctype"))||jd(h.getAttribute("enctype"))||rf,u=new FormData(h,a),!jT()){let{name:m,type:g,value:v}=a;if(g==="image"){let y=m?`${m}.`:"";u.append(`${y}x`,"0"),u.append(`${y}y`,"0")}else m&&u.append(m,v)}}else{if(bf(a))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=af,r=null,l=rf,f=a}return u&&l==="text/plain"&&(f=u,u=void 0),{action:r,method:i.toLowerCase(),encType:l,formData:u,body:f}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Xm(a,t){if(a===!1||a===null||typeof a>"u")throw new Error(t)}function eS(a,t,i,r){let l=typeof a=="string"?new URL(a,typeof window>"u"?"server://singlefetch/":window.location.origin):a;return i?l.pathname.endsWith("/")?l.pathname=`${l.pathname}_.${r}`:l.pathname=`${l.pathname}.${r}`:l.pathname==="/"?l.pathname=`_root.${r}`:t&&Ha(l.pathname,t)==="/"?l.pathname=`${mf(t)}/_root.${r}`:l.pathname=`${mf(l.pathname)}.${r}`,l}async function QT(a,t){if(a.id in t)return t[a.id];try{let i=await import(a.module);return t[a.id]=i,i}catch(i){return console.error(`Error loading route module \`${a.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ZT(a){return a==null?!1:a.href==null?a.rel==="preload"&&typeof a.imageSrcSet=="string"&&typeof a.imageSizes=="string":typeof a.rel=="string"&&typeof a.href=="string"}async function KT(a,t,i){let r=await Promise.all(a.map(async l=>{let u=t.routes[l.route.id];if(u){let f=await QT(u,i);return f.links?f.links():[]}return[]}));return eA(r.flat(1).filter(ZT).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function cy(a,t,i,r,l,u){let f=(p,m)=>i[m]?p.route.id!==i[m].route.id:!0,h=(p,m)=>{var g;return i[m].pathname!==p.pathname||((g=i[m].route.path)==null?void 0:g.endsWith("*"))&&i[m].params["*"]!==p.params["*"]};return u==="assets"?t.filter((p,m)=>f(p,m)||h(p,m)):u==="data"?t.filter((p,m)=>{var v;let g=r.routes[p.route.id];if(!g||!g.hasLoader)return!1;if(f(p,m)||h(p,m))return!0;if(p.route.shouldRevalidate){let y=p.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:((v=i[0])==null?void 0:v.params)||{},nextUrl:new URL(a,window.origin),nextParams:p.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function JT(a,t,{includeHydrateFallback:i}={}){return $T(a.map(r=>{let l=t.routes[r.route.id];if(!l)return[];let u=[l.module];return l.clientActionModule&&(u=u.concat(l.clientActionModule)),l.clientLoaderModule&&(u=u.concat(l.clientLoaderModule)),i&&l.hydrateFallbackModule&&(u=u.concat(l.hydrateFallbackModule)),l.imports&&(u=u.concat(l.imports)),u}).flat(1))}function $T(a){return[...new Set(a)]}function tA(a){let t={},i=Object.keys(a).sort();for(let r of i)t[r]=a[r];return t}function eA(a,t){let i=new Set;return new Set(t),a.reduce((r,l)=>{let u=JSON.stringify(tA(l));return i.has(u)||(i.add(u),r.push({key:u,link:l})),r},[])}function qm(){let a=$.useContext(Qo);return Xm(a,"You must render this element inside a <DataRouterContext.Provider> element"),a}function nA(){let a=$.useContext(Ef);return Xm(a,"You must render this element inside a <DataRouterStateContext.Provider> element"),a}var jm=$.createContext(void 0);jm.displayName="FrameworkContext";function Tf(){let a=$.useContext(jm);return Xm(a,"You must render this element inside a <HydratedRouter> element"),a}function iA(a,t){let i=$.useContext(jm),[r,l]=$.useState(!1),[u,f]=$.useState(!1),{onFocus:h,onBlur:p,onMouseEnter:m,onMouseLeave:g,onTouchStart:v}=t,y=$.useRef(null);$.useEffect(()=>{if(a==="render"&&f(!0),a==="viewport"){let b=_=>{_.forEach(L=>{f(L.isIntersecting)})},x=new IntersectionObserver(b,{threshold:.5});return y.current&&x.observe(y.current),()=>{x.disconnect()}}},[a]),$.useEffect(()=>{if(r){let b=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(b)}}},[r]);let M=()=>{l(!0)},E=()=>{l(!1),f(!1)};return i?a!=="intent"?[u,y,{}]:[u,y,{onFocus:Wl(h,M),onBlur:Wl(p,E),onMouseEnter:Wl(m,M),onMouseLeave:Wl(g,E),onTouchStart:Wl(v,M)}]:[!1,y,{}]}function Wl(a,t){return i=>{a&&a(i),i.defaultPrevented||t(i)}}function aA({page:a,...t}){let i=gT(),{nonce:r}=Tf(),{router:l}=qm(),u=$.useMemo(()=>Fx(l.routes,a,l.basename),[l.routes,a,l.basename]);return u?(t.nonce==null&&r&&(t={...t,nonce:r}),i?$.createElement(sA,{page:a,matches:u,...t}):$.createElement(oA,{page:a,matches:u,...t})):null}function rA(a){let{manifest:t,routeModules:i}=Tf(),[r,l]=$.useState([]);return $.useEffect(()=>{let u=!1;return KT(a,t,i).then(f=>{u||l(f)}),()=>{u=!0}},[a,t,i]),r}function sA({page:a,matches:t,...i}){let r=aa(),{future:l}=Tf(),{basename:u}=qm(),f=$.useMemo(()=>{if(a===r.pathname+r.search+r.hash)return[];let h=eS(a,u,l.v8_trailingSlashAwareDataRequests,"rsc"),p=!1,m=[];for(let g of t)typeof g.route.shouldRevalidate=="function"?p=!0:m.push(g.route.id);return p&&m.length>0&&h.searchParams.set("_routes",m.join(",")),[h.pathname+h.search]},[u,l.v8_trailingSlashAwareDataRequests,a,r,t]);return $.createElement($.Fragment,null,f.map(h=>$.createElement("link",{key:h,rel:"prefetch",as:"fetch",href:h,...i})))}function oA({page:a,matches:t,...i}){let r=aa(),{future:l,manifest:u,routeModules:f}=Tf(),{basename:h}=qm(),{loaderData:p,matches:m}=nA(),g=$.useMemo(()=>cy(a,t,m,u,r,"data"),[a,t,m,u,r]),v=$.useMemo(()=>cy(a,t,m,u,r,"assets"),[a,t,m,u,r]),y=$.useMemo(()=>{if(a===r.pathname+r.search+r.hash)return[];let b=new Set,x=!1;if(t.forEach(L=>{var R;let D=u.routes[L.route.id];!D||!D.hasLoader||(!g.some(V=>V.route.id===L.route.id)&&L.route.id in p&&((R=f[L.route.id])!=null&&R.shouldRevalidate)||D.hasClientLoader?x=!0:b.add(L.route.id))}),b.size===0)return[];let _=eS(a,h,l.v8_trailingSlashAwareDataRequests,"data");return x&&b.size>0&&_.searchParams.set("_routes",t.filter(L=>b.has(L.route.id)).map(L=>L.route.id).join(",")),[_.pathname+_.search]},[h,l.v8_trailingSlashAwareDataRequests,p,r,u,g,t,a,f]),M=$.useMemo(()=>JT(v,u),[v,u]),E=rA(v);return $.createElement($.Fragment,null,y.map(b=>$.createElement("link",{key:b,rel:"prefetch",as:"fetch",href:b,...i})),M.map(b=>$.createElement("link",{key:b,rel:"modulepreload",href:b,...i})),E.map(({key:b,link:x})=>$.createElement("link",{key:b,nonce:i.nonce,...x,crossOrigin:x.crossOrigin??i.crossOrigin})))}function lA(...a){return t=>{a.forEach(i=>{typeof i=="function"?i(t):i!=null&&(i.current=t)})}}var uA=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{uA&&(window.__reactRouterVersion="7.18.1")}catch{}function cA({basename:a,children:t,useTransitions:i,window:r}){let l=$.useRef();l.current==null&&(l.current=Vb({window:r,v5Compat:!0}));let u=l.current,[f,h]=$.useState({action:u.action,location:u.location}),p=$.useCallback(m=>{i===!1?h(m):$.startTransition(()=>h(m))},[i]);return $.useLayoutEffect(()=>u.listen(p),[u,p]),$.createElement(BT,{basename:a,children:t,location:f.location,navigationType:f.action,navigator:u,useTransitions:i})}var nS=$.forwardRef(function({onClick:t,discover:i="render",prefetch:r="none",relative:l,reloadDocument:u,replace:f,mask:h,state:p,target:m,to:g,preventScrollReset:v,viewTransition:y,defaultShouldRevalidate:M,...E},b){let{basename:x,navigator:_,useTransitions:L}=$.useContext(mi),D=typeof g=="string"&&Bm.test(g),R=Xx(g,x);g=R.to;let V=ET(g,{relative:l}),z=aa(),N=null;if(h){let ht=Mf(h,[],z.mask?z.mask.pathname:"/",!0);x!=="/"&&(ht.pathname=ht.pathname==="/"?x:Vi([x,ht.pathname])),N=_.createHref(ht)}let[X,U,w]=iA(r,E),k=dA(g,{replace:f,mask:h,state:p,target:m,preventScrollReset:v,relative:l,viewTransition:y,defaultShouldRevalidate:M,useTransitions:L});function ut(ht){t&&t(ht),ht.defaultPrevented||k(ht)}let ot=!(R.isExternal||u),mt=$.createElement("a",{...E,...w,href:(ot?N:void 0)||R.absoluteURL||V,onClick:ot?ut:t,ref:lA(b,U),target:m,"data-discover":!D&&i==="render"?"true":void 0});return X&&!D?$.createElement($.Fragment,null,mt,$.createElement(aA,{page:V})):mt});nS.displayName="Link";var iS=$.forwardRef(function({"aria-current":t="page",caseSensitive:i=!1,className:r="",end:l=!1,style:u,to:f,viewTransition:h,children:p,...m},g){let v=du(f,{relative:m.relative}),y=aa(),M=$.useContext(Ef),{navigator:E,basename:b}=$.useContext(mi),x=M!=null&&_A(v)&&h===!0,_=E.encodeLocation?E.encodeLocation(v).pathname:v.pathname,L=y.pathname,D=M&&M.navigation&&M.navigation.location?M.navigation.location.pathname:null;i||(L=L.toLowerCase(),D=D?D.toLowerCase():null,_=_.toLowerCase()),D&&b&&(D=Ha(D,b)||D);const R=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let V=L===_||!l&&L.startsWith(_)&&L.charAt(R)==="/",z=D!=null&&(D===_||!l&&D.startsWith(_)&&D.charAt(_.length)==="/"),N={isActive:V,isPending:z,isTransitioning:x},X=V?t:void 0,U;typeof r=="function"?U=r(N):U=[r,V?"active":null,z?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let w=typeof u=="function"?u(N):u;return $.createElement(nS,{...m,"aria-current":X,className:U,ref:g,style:w,to:f,viewTransition:h},typeof p=="function"?p(N):p)});iS.displayName="NavLink";var fA=$.forwardRef(({discover:a="render",fetcherKey:t,navigate:i,reloadDocument:r,replace:l,state:u,method:f=af,action:h,onSubmit:p,relative:m,preventScrollReset:g,viewTransition:v,defaultShouldRevalidate:y,...M},E)=>{let{useTransitions:b}=$.useContext(mi),x=gA(),_=vA(h,{relative:m}),L=f.toLowerCase()==="get"?"get":"post",D=typeof h=="string"&&Bm.test(h),R=V=>{if(p&&p(V),V.defaultPrevented)return;V.preventDefault();let z=V.nativeEvent.submitter,N=(z==null?void 0:z.getAttribute("formmethod"))||f,X=()=>x(z||V.currentTarget,{fetcherKey:t,method:N,navigate:i,replace:l,state:u,relative:m,preventScrollReset:g,viewTransition:v,defaultShouldRevalidate:y});b&&i!==!1?$.startTransition(()=>X()):X()};return $.createElement("form",{ref:E,method:L,action:_,onSubmit:r?p:R,...M,"data-discover":!D&&a==="render"?"true":void 0})});fA.displayName="Form";function hA(a){return`${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function aS(a){let t=$.useContext(Qo);return tn(t,hA(a)),t}function dA(a,{target:t,replace:i,mask:r,state:l,preventScrollReset:u,relative:f,viewTransition:h,defaultShouldRevalidate:p,useTransitions:m}={}){let g=Kx(),v=aa(),y=du(a,{relative:f});return $.useCallback(M=>{if(qT(M,t)){M.preventDefault();let E=i!==void 0?i:ru(v)===ru(y),b=()=>g(a,{replace:E,mask:r,state:l,preventScrollReset:u,relative:f,viewTransition:h,defaultShouldRevalidate:p});m?$.startTransition(()=>b()):b()}},[v,g,y,i,r,l,t,a,u,f,h,p,m])}var pA=0,mA=()=>`__${String(++pA)}__`;function gA(){let{router:a}=aS("useSubmit"),{basename:t}=$.useContext(mi),i=OT(),r=a.fetch,l=a.navigate;return $.useCallback(async(u,f={})=>{let{action:h,method:p,encType:m,formData:g,body:v}=YT(u,t);if(f.navigate===!1){let y=f.fetcherKey||mA();await r(y,i,f.action||h,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:g,body:v,formMethod:f.method||p,formEncType:f.encType||m,flushSync:f.flushSync})}else await l(f.action||h,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:g,body:v,formMethod:f.method||p,formEncType:f.encType||m,replace:f.replace,state:f.state,fromRouteId:i,flushSync:f.flushSync,viewTransition:f.viewTransition})},[r,l,t,i])}function vA(a,{relative:t}={}){let{basename:i}=$.useContext(mi),r=$.useContext(ia);tn(r,"useFormAction must be used inside a RouteContext");let[l]=r.matches.slice(-1),u={...du(a||".",{relative:t})},f=aa();if(a==null){u.search=f.search;let h=new URLSearchParams(u.search),p=h.getAll("index");if(p.some(g=>g==="")){h.delete("index"),p.filter(v=>v).forEach(v=>h.append("index",v));let g=h.toString();u.search=g?`?${g}`:""}}return(!a||a===".")&&l.route.index&&(u.search=u.search?u.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(u.pathname=u.pathname==="/"?i:Vi([i,u.pathname])),ru(u)}function _A(a,{relative:t}={}){let i=$.useContext(Wx);tn(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=aS("useViewTransitionState"),l=du(a,{relative:t});if(!i.isTransitioning)return!1;let u=Ha(i.currentLocation.pathname,r)||i.currentLocation.pathname,f=Ha(i.nextLocation.pathname,r)||i.nextLocation.pathname;return pf(l.pathname,f)!=null||pf(l.pathname,u)!=null}/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yA=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),rS=(...a)=>a.filter((t,i,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===i).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var xA={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SA=$.forwardRef(({color:a="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:l="",children:u,iconNode:f,...h},p)=>$.createElement("svg",{ref:p,...xA,width:t,height:t,stroke:a,strokeWidth:r?Number(i)*24/Number(t):i,className:rS("lucide",l),...h},[...f.map(([m,g])=>$.createElement(m,g)),...Array.isArray(u)?u:[u]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ci=(a,t)=>{const i=$.forwardRef(({className:r,...l},u)=>$.createElement(SA,{ref:u,iconNode:t,className:rS(`lucide-${yA(a)}`,r),...l}));return i.displayName=`${a}`,i};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MA=Ci("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yl=Ci("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EA=Ci("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy=Ci("FileVideo",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bA=Ci("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TA=Ci("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hy=Ci("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AA=Ci("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RA=Ci("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=Ci("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CA=Ci("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sS=Ci("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),wA="/api";class DA extends Error{constructor(t,i,r="UNKNOWN_ERROR"){super(t),this.status=i,this.code=r}}async function fs(a,t){const i=await fetch(`${wA}${a}`,{...t,headers:{Accept:"application/json",...(t==null?void 0:t.body)instanceof FormData?{}:{"Content-Type":"application/json"},...t==null?void 0:t.headers}});if(!i.ok){const r=await i.json().catch(()=>null);throw new DA((r==null?void 0:r.message)??"请求失败，请稍后重试",i.status,r==null?void 0:r.code)}return i.json()}function UA({children:a}){var l;const[t,i]=$.useState(!1),r=nf({queryKey:["api-health"],queryFn:()=>fs("/health"),refetchInterval:15e3,retry:!1});return F.jsxs("div",{className:"app-shell",children:[F.jsxs("header",{className:"topbar",children:[F.jsxs(iS,{to:"/",className:"brand","aria-label":"CAM TRACE 首页",children:[F.jsx("span",{className:"brand-mark",children:"C//T"}),F.jsx("span",{children:"CAM//TRACE"})]}),F.jsxs("nav",{className:t?"nav nav-open":"nav","aria-label":"页面导航",children:[F.jsx("a",{href:"#workspace",onClick:()=>i(!1),children:"开始重建"}),F.jsx("a",{href:"#queue",onClick:()=>i(!1),children:"任务队列"}),F.jsx("a",{href:"#about",onClick:()=>i(!1),children:"数据说明"})]}),F.jsxs("div",{className:`system-badge ${r.isError?"system-offline":""}`,children:[F.jsx("i",{})," ",((l=r.data)==null?void 0:l.status)==="ok"?"API ONLINE":r.isError?"API OFFLINE":"API CHECKING"]}),F.jsx("button",{className:"menu-button",onClick:()=>i(!t),"aria-label":"切换导航",children:t?F.jsx(sS,{}):F.jsx(bA,{})})]}),F.jsx("main",{children:a}),F.jsxs("footer",{children:[F.jsx("strong",{children:"CAM//TRACE © 2026"}),F.jsx("span",{children:"CAMERA MOTION, MADE VISIBLE."}),F.jsx("span",{children:"DATA SOURCE: MEGASAM"})]})]})}const LA={list:(a={})=>{const t=new URLSearchParams;return a.status&&t.set("status",a.status),a.limit&&t.set("limit",String(a.limit)),a.cursor&&t.set("cursor",a.cursor),fs(`/jobs?${t}`)},create:({video:a})=>{const t=new FormData;return t.append("video",a),fs("/jobs",{method:"POST",body:t})},get:a=>fs(`/jobs/${a}`),cancel:a=>fs(`/jobs/${a}/cancel`,{method:"POST"})},NA={getByJob:a=>fs(`/jobs/${a}/trajectory`),parseLocal:async a=>{const t=new FormData;return t.append("trajectory",a),fs("/trajectories/parse",{method:"POST",body:t})}},Wd=LA,dy=NA,OA={uploaded:"已上传",validating:"校验中",queued:"排队中",reconstructing:"重建中",packaging:"打包中",succeeded:"已完成",failed:"失败"};function oS({status:a}){return F.jsxs("span",{className:`status-badge status-${a}`,children:[F.jsx("i",{})," ",OA[a]]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wm="171",PA=0,py=1,zA=2,lS=1,FA=2,Da=3,Lr=0,ei=1,Pa=2,Dr=0,Eo=1,my=2,gy=3,vy=4,IA=5,ls=100,BA=101,HA=102,GA=103,VA=104,kA=200,XA=201,qA=202,jA=203,kp=204,Xp=205,WA=206,YA=207,QA=208,ZA=209,KA=210,JA=211,$A=212,t1=213,e1=214,qp=0,jp=1,Wp=2,Ho=3,Yp=4,Qp=5,Zp=6,Kp=7,uS=0,n1=1,i1=2,Ur=0,a1=1,r1=2,s1=3,o1=4,l1=5,u1=6,c1=7,cS=300,Go=301,Vo=302,Jp=303,$p=304,Af=306,tm=1e3,hs=1001,em=1002,ki=1003,f1=1004,Lc=1005,ea=1006,Yd=1007,ds=1008,Ga=1009,fS=1010,hS=1011,su=1012,Ym=1013,bs=1014,za=1015,pu=1016,Qm=1017,Zm=1018,ko=1020,dS=35902,pS=1021,mS=1022,Hi=1023,gS=1024,vS=1025,bo=1026,Xo=1027,_S=1028,Km=1029,yS=1030,Jm=1031,$m=1033,sf=33776,of=33777,lf=33778,uf=33779,nm=35840,im=35841,am=35842,rm=35843,sm=36196,om=37492,lm=37496,um=37808,cm=37809,fm=37810,hm=37811,dm=37812,pm=37813,mm=37814,gm=37815,vm=37816,_m=37817,ym=37818,xm=37819,Sm=37820,Mm=37821,cf=36492,Em=36494,bm=36495,xS=36283,Tm=36284,Am=36285,Rm=36286,h1=3200,d1=3201,p1=0,m1=1,yr="",Ai="srgb",qo="srgb-linear",gf="linear",Xe="srgb",so=7680,_y=519,g1=512,v1=513,_1=514,SS=515,y1=516,x1=517,S1=518,M1=519,yy=35044,xy="300 es",Fa=2e3,vf=2001;class Ko{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[t]===void 0&&(r[t]=[]),r[t].indexOf(i)===-1&&r[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const r=this._listeners;return r[t]!==void 0&&r[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const r=this._listeners[t.type];if(r!==void 0){t.target=this;const l=r.slice(0);for(let u=0,f=l.length;u<f;u++)l[u].call(this,t);t.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qd=Math.PI/180,Cm=180/Math.PI;function mu(){const a=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(zn[a&255]+zn[a>>8&255]+zn[a>>16&255]+zn[a>>24&255]+"-"+zn[t&255]+zn[t>>8&255]+"-"+zn[t>>16&15|64]+zn[t>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]).toLowerCase()}function Ae(a,t,i){return Math.max(t,Math.min(i,a))}function E1(a,t){return(a%t+t)%t}function Zd(a,t,i){return(1-i)*a+i*t}function Ql(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function Jn(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}class We{constructor(t=0,i=0){We.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,r=this.y,l=t.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Ae(this.x,t.x,i.x),this.y=Ae(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=Ae(this.x,t,i),this.y=Ae(this.y,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ae(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(Ae(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const r=Math.cos(i),l=Math.sin(i),u=this.x-t.x,f=this.y-t.y;return this.x=u*r-f*l+t.x,this.y=u*l+f*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class he{constructor(t,i,r,l,u,f,h,p,m){he.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,l,u,f,h,p,m)}set(t,i,r,l,u,f,h,p,m){const g=this.elements;return g[0]=t,g[1]=l,g[2]=h,g[3]=i,g[4]=u,g[5]=p,g[6]=r,g[7]=f,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,u=this.elements,f=r[0],h=r[3],p=r[6],m=r[1],g=r[4],v=r[7],y=r[2],M=r[5],E=r[8],b=l[0],x=l[3],_=l[6],L=l[1],D=l[4],R=l[7],V=l[2],z=l[5],N=l[8];return u[0]=f*b+h*L+p*V,u[3]=f*x+h*D+p*z,u[6]=f*_+h*R+p*N,u[1]=m*b+g*L+v*V,u[4]=m*x+g*D+v*z,u[7]=m*_+g*R+v*N,u[2]=y*b+M*L+E*V,u[5]=y*x+M*D+E*z,u[8]=y*_+M*R+E*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8];return i*f*g-i*h*m-r*u*g+r*h*p+l*u*m-l*f*p}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],v=g*f-h*m,y=h*p-g*u,M=m*u-f*p,E=i*v+r*y+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/E;return t[0]=v*b,t[1]=(l*m-g*r)*b,t[2]=(h*r-l*f)*b,t[3]=y*b,t[4]=(g*i-l*p)*b,t[5]=(l*u-h*i)*b,t[6]=M*b,t[7]=(r*p-m*i)*b,t[8]=(f*i-r*u)*b,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,l,u,f,h){const p=Math.cos(u),m=Math.sin(u);return this.set(r*p,r*m,-r*(p*f+m*h)+f+t,-l*m,l*p,-l*(-m*f+p*h)+h+i,0,0,1),this}scale(t,i){return this.premultiply(Kd.makeScale(t,i)),this}rotate(t){return this.premultiply(Kd.makeRotation(-t)),this}translate(t,i){return this.premultiply(Kd.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kd=new he;function MS(a){for(let t=a.length-1;t>=0;--t)if(a[t]>=65535)return!0;return!1}function _f(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function b1(){const a=_f("canvas");return a.style.display="block",a}const Sy={};function So(a){a in Sy||(Sy[a]=!0,console.warn(a))}function T1(a,t,i){return new Promise(function(r,l){function u(){switch(a.clientWaitSync(t,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:l();break;case a.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:r()}}setTimeout(u,i)})}function A1(a){const t=a.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function R1(a){const t=a.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const My=new he().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ey=new he().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function C1(){const a={enabled:!0,workingColorSpace:qo,spaces:{},convert:function(l,u,f){return this.enabled===!1||u===f||!u||!f||(this.spaces[u].transfer===Xe&&(l.r=Ia(l.r),l.g=Ia(l.g),l.b=Ia(l.b)),this.spaces[u].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Xe&&(l.r=To(l.r),l.g=To(l.g),l.b=To(l.b))),l},fromWorkingColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},toWorkingColorSpace:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===yr?gf:this.spaces[l].transfer},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,f){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return a.define({[qo]:{primaries:t,whitePoint:r,transfer:gf,toXYZ:My,fromXYZ:Ey,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Ai},outputColorSpaceConfig:{drawingBufferColorSpace:Ai}},[Ai]:{primaries:t,whitePoint:r,transfer:Xe,toXYZ:My,fromXYZ:Ey,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Ai}}}),a}const Ne=C1();function Ia(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function To(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let oo;class w1{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{oo===void 0&&(oo=_f("canvas")),oo.width=t.width,oo.height=t.height;const r=oo.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=oo}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=_f("canvas");i.width=t.width,i.height=t.height;const r=i.getContext("2d");r.drawImage(t,0,0,t.width,t.height);const l=r.getImageData(0,0,t.width,t.height),u=l.data;for(let f=0;f<u.length;f++)u[f]=Ia(u[f]/255)*255;return r.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Ia(i[r]/255)*255):i[r]=Ia(i[r]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let D1=0;class ES{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:D1++}),this.uuid=mu(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?u.push(Jd(l[f].image)):u.push(Jd(l[f]))}else u=Jd(l);r.url=u}return i||(t.images[this.uuid]=r),r}}function Jd(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?w1.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let U1=0;class ni extends Ko{constructor(t=ni.DEFAULT_IMAGE,i=ni.DEFAULT_MAPPING,r=hs,l=hs,u=ea,f=ds,h=Hi,p=Ga,m=ni.DEFAULT_ANISOTROPY,g=yr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:U1++}),this.uuid=mu(),this.name="",this.source=new ES(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=u,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==cS)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case tm:t.x=t.x-Math.floor(t.x);break;case hs:t.x=t.x<0?0:1;break;case em:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case tm:t.y=t.y-Math.floor(t.y);break;case hs:t.y=t.y<0?0:1;break;case em:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ni.DEFAULT_IMAGE=null;ni.DEFAULT_MAPPING=cS;ni.DEFAULT_ANISOTROPY=1;class un{constructor(t=0,i=0,r=0,l=1){un.prototype.isVector4=!0,this.x=t,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,l){return this.x=t,this.y=i,this.z=r,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,u=this.w,f=t.elements;return this.x=f[0]*i+f[4]*r+f[8]*l+f[12]*u,this.y=f[1]*i+f[5]*r+f[9]*l+f[13]*u,this.z=f[2]*i+f[6]*r+f[10]*l+f[14]*u,this.w=f[3]*i+f[7]*r+f[11]*l+f[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,l,u;const p=t.elements,m=p[0],g=p[4],v=p[8],y=p[1],M=p[5],E=p[9],b=p[2],x=p[6],_=p[10];if(Math.abs(g-y)<.01&&Math.abs(v-b)<.01&&Math.abs(E-x)<.01){if(Math.abs(g+y)<.1&&Math.abs(v+b)<.1&&Math.abs(E+x)<.1&&Math.abs(m+M+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const D=(m+1)/2,R=(M+1)/2,V=(_+1)/2,z=(g+y)/4,N=(v+b)/4,X=(E+x)/4;return D>R&&D>V?D<.01?(r=0,l=.707106781,u=.707106781):(r=Math.sqrt(D),l=z/r,u=N/r):R>V?R<.01?(r=.707106781,l=0,u=.707106781):(l=Math.sqrt(R),r=z/l,u=X/l):V<.01?(r=.707106781,l=.707106781,u=0):(u=Math.sqrt(V),r=N/u,l=X/u),this.set(r,l,u,i),this}let L=Math.sqrt((x-E)*(x-E)+(v-b)*(v-b)+(y-g)*(y-g));return Math.abs(L)<.001&&(L=1),this.x=(x-E)/L,this.y=(v-b)/L,this.z=(y-g)/L,this.w=Math.acos((m+M+_-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Ae(this.x,t.x,i.x),this.y=Ae(this.y,t.y,i.y),this.z=Ae(this.z,t.z,i.z),this.w=Ae(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=Ae(this.x,t,i),this.y=Ae(this.y,t,i),this.z=Ae(this.z,t,i),this.w=Ae(this.w,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ae(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class L1 extends Ko{constructor(t=1,i=1,r={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new un(0,0,t,i),this.scissorTest=!1,this.viewport=new un(0,0,t,i);const l={width:t,height:i,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ea,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const u=new ni(l,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);u.flipY=!1,u.generateMipmaps=r.generateMipmaps,u.internalFormat=r.internalFormat,this.textures=[];const f=r.count;for(let h=0;h<f;h++)this.textures[h]=u.clone(),this.textures[h].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,i,r=1){if(this.width!==t||this.height!==i||this.depth!==r){this.width=t,this.height=i,this.depth=r;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=r;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let r=0,l=t.textures.length;r<l;r++)this.textures[r]=t.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const i=Object.assign({},t.texture.image);return this.texture.source=new ES(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ts extends L1{constructor(t=1,i=1,r={}){super(t,i,r),this.isWebGLRenderTarget=!0}}class bS extends ni{constructor(t=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=ki,this.minFilter=ki,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class N1 extends ni{constructor(t=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=ki,this.minFilter=ki,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gu{constructor(t=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=r,this._w=l}static slerpFlat(t,i,r,l,u,f,h){let p=r[l+0],m=r[l+1],g=r[l+2],v=r[l+3];const y=u[f+0],M=u[f+1],E=u[f+2],b=u[f+3];if(h===0){t[i+0]=p,t[i+1]=m,t[i+2]=g,t[i+3]=v;return}if(h===1){t[i+0]=y,t[i+1]=M,t[i+2]=E,t[i+3]=b;return}if(v!==b||p!==y||m!==M||g!==E){let x=1-h;const _=p*y+m*M+g*E+v*b,L=_>=0?1:-1,D=1-_*_;if(D>Number.EPSILON){const V=Math.sqrt(D),z=Math.atan2(V,_*L);x=Math.sin(x*z)/V,h=Math.sin(h*z)/V}const R=h*L;if(p=p*x+y*R,m=m*x+M*R,g=g*x+E*R,v=v*x+b*R,x===1-h){const V=1/Math.sqrt(p*p+m*m+g*g+v*v);p*=V,m*=V,g*=V,v*=V}}t[i]=p,t[i+1]=m,t[i+2]=g,t[i+3]=v}static multiplyQuaternionsFlat(t,i,r,l,u,f){const h=r[l],p=r[l+1],m=r[l+2],g=r[l+3],v=u[f],y=u[f+1],M=u[f+2],E=u[f+3];return t[i]=h*E+g*v+p*M-m*y,t[i+1]=p*E+g*y+m*v-h*M,t[i+2]=m*E+g*M+h*y-p*v,t[i+3]=g*E-h*v-p*y-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,r,l){return this._x=t,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const r=t._x,l=t._y,u=t._z,f=t._order,h=Math.cos,p=Math.sin,m=h(r/2),g=h(l/2),v=h(u/2),y=p(r/2),M=p(l/2),E=p(u/2);switch(f){case"XYZ":this._x=y*g*v+m*M*E,this._y=m*M*v-y*g*E,this._z=m*g*E+y*M*v,this._w=m*g*v-y*M*E;break;case"YXZ":this._x=y*g*v+m*M*E,this._y=m*M*v-y*g*E,this._z=m*g*E-y*M*v,this._w=m*g*v+y*M*E;break;case"ZXY":this._x=y*g*v-m*M*E,this._y=m*M*v+y*g*E,this._z=m*g*E+y*M*v,this._w=m*g*v-y*M*E;break;case"ZYX":this._x=y*g*v-m*M*E,this._y=m*M*v+y*g*E,this._z=m*g*E-y*M*v,this._w=m*g*v+y*M*E;break;case"YZX":this._x=y*g*v+m*M*E,this._y=m*M*v+y*g*E,this._z=m*g*E-y*M*v,this._w=m*g*v-y*M*E;break;case"XZY":this._x=y*g*v-m*M*E,this._y=m*M*v-y*g*E,this._z=m*g*E+y*M*v,this._w=m*g*v+y*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const r=i/2,l=Math.sin(r);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,r=i[0],l=i[4],u=i[8],f=i[1],h=i[5],p=i[9],m=i[2],g=i[6],v=i[10],y=r+h+v;if(y>0){const M=.5/Math.sqrt(y+1);this._w=.25/M,this._x=(g-p)*M,this._y=(u-m)*M,this._z=(f-l)*M}else if(r>h&&r>v){const M=2*Math.sqrt(1+r-h-v);this._w=(g-p)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(u+m)/M}else if(h>v){const M=2*Math.sqrt(1+h-r-v);this._w=(u-m)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(p+g)/M}else{const M=2*Math.sqrt(1+v-r-h);this._w=(f-l)/M,this._x=(u+m)/M,this._y=(p+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let r=t.dot(i)+1;return r<Number.EPSILON?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,i){const r=this.angleTo(t);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const r=t._x,l=t._y,u=t._z,f=t._w,h=i._x,p=i._y,m=i._z,g=i._w;return this._x=r*g+f*h+l*m-u*p,this._y=l*g+f*p+u*h-r*m,this._z=u*g+f*m+r*p-l*h,this._w=f*g-r*h-l*p-u*m,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const r=this._x,l=this._y,u=this._z,f=this._w;let h=f*t._w+r*t._x+l*t._y+u*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=f,this._x=r,this._y=l,this._z=u,this;const p=1-h*h;if(p<=Number.EPSILON){const M=1-i;return this._w=M*f+i*this._w,this._x=M*r+i*this._x,this._y=M*l+i*this._y,this._z=M*u+i*this._z,this.normalize(),this}const m=Math.sqrt(p),g=Math.atan2(m,h),v=Math.sin((1-i)*g)/m,y=Math.sin(i*g)/m;return this._w=f*v+this._w*y,this._x=r*v+this._x*y,this._y=l*v+this._y*y,this._z=u*v+this._z*y,this._onChangeCallback(),this}slerpQuaternions(t,i,r){return this.copy(t).slerp(i,r)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(l*Math.sin(t),l*Math.cos(t),u*Math.sin(i),u*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class lt{constructor(t=0,i=0,r=0){lt.prototype.isVector3=!0,this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(by.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(by.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,r=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[3]*r+u[6]*l,this.y=u[1]*i+u[4]*r+u[7]*l,this.z=u[2]*i+u[5]*r+u[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,u=t.elements,f=1/(u[3]*i+u[7]*r+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*r+u[8]*l+u[12])*f,this.y=(u[1]*i+u[5]*r+u[9]*l+u[13])*f,this.z=(u[2]*i+u[6]*r+u[10]*l+u[14])*f,this}applyQuaternion(t){const i=this.x,r=this.y,l=this.z,u=t.x,f=t.y,h=t.z,p=t.w,m=2*(f*l-h*r),g=2*(h*i-u*l),v=2*(u*r-f*i);return this.x=i+p*m+f*v-h*g,this.y=r+p*g+h*m-u*v,this.z=l+p*v+u*g-f*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,r=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[4]*r+u[8]*l,this.y=u[1]*i+u[5]*r+u[9]*l,this.z=u[2]*i+u[6]*r+u[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Ae(this.x,t.x,i.x),this.y=Ae(this.y,t.y,i.y),this.z=Ae(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=Ae(this.x,t,i),this.y=Ae(this.y,t,i),this.z=Ae(this.z,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ae(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const r=t.x,l=t.y,u=t.z,f=i.x,h=i.y,p=i.z;return this.x=l*p-u*h,this.y=u*f-r*p,this.z=r*h-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return $d.copy(this).projectOnVector(t),this.sub($d)}reflect(t){return this.sub($d.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(Ae(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y,l=this.z-t.z;return i*i+r*r+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){const l=Math.sin(i)*t;return this.x=l*Math.sin(r),this.y=Math.cos(i)*t,this.z=l*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $d=new lt,by=new gu;class vu{constructor(t=new lt(1/0,1/0,1/0),i=new lt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i+=3)this.expandByPoint(Pi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,r=t.count;i<r;i++)this.expandByPoint(Pi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const r=Pi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const r=t.geometry;if(r!==void 0){const u=r.getAttribute("position");if(i===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let f=0,h=u.count;f<h;f++)t.isMesh===!0?t.getVertexPosition(f,Pi):Pi.fromBufferAttribute(u,f),Pi.applyMatrix4(t.matrixWorld),this.expandByPoint(Pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Nc.copy(t.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Nc.copy(r.boundingBox)),Nc.applyMatrix4(t.matrixWorld),this.union(Nc)}const l=t.children;for(let u=0,f=l.length;u<f;u++)this.expandByObject(l[u],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pi),Pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,r;return t.normal.x>0?(i=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),i<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zl),Oc.subVectors(this.max,Zl),lo.subVectors(t.a,Zl),uo.subVectors(t.b,Zl),co.subVectors(t.c,Zl),hr.subVectors(uo,lo),dr.subVectors(co,uo),ts.subVectors(lo,co);let i=[0,-hr.z,hr.y,0,-dr.z,dr.y,0,-ts.z,ts.y,hr.z,0,-hr.x,dr.z,0,-dr.x,ts.z,0,-ts.x,-hr.y,hr.x,0,-dr.y,dr.x,0,-ts.y,ts.x,0];return!tp(i,lo,uo,co,Oc)||(i=[1,0,0,0,1,0,0,0,1],!tp(i,lo,uo,co,Oc))?!1:(Pc.crossVectors(hr,dr),i=[Pc.x,Pc.y,Pc.z],tp(i,lo,uo,co,Oc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ba[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ba[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ba[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ba[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ba[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ba[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ba[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ba[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ba),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ba=[new lt,new lt,new lt,new lt,new lt,new lt,new lt,new lt],Pi=new lt,Nc=new vu,lo=new lt,uo=new lt,co=new lt,hr=new lt,dr=new lt,ts=new lt,Zl=new lt,Oc=new lt,Pc=new lt,es=new lt;function tp(a,t,i,r,l){for(let u=0,f=a.length-3;u<=f;u+=3){es.fromArray(a,u);const h=l.x*Math.abs(es.x)+l.y*Math.abs(es.y)+l.z*Math.abs(es.z),p=t.dot(es),m=i.dot(es),g=r.dot(es);if(Math.max(-Math.max(p,m,g),Math.min(p,m,g))>h)return!1}return!0}const O1=new vu,Kl=new lt,ep=new lt;class Rf{constructor(t=new lt,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const r=this.center;i!==void 0?r.copy(i):O1.setFromPoints(t).getCenter(r);let l=0;for(let u=0,f=t.length;u<f;u++)l=Math.max(l,r.distanceToSquared(t[u]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const r=this.center.distanceToSquared(t);return i.copy(t),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Kl.subVectors(t,this.center);const i=Kl.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(Kl,l/r),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ep.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Kl.copy(t.center).add(ep)),this.expandByPoint(Kl.copy(t.center).sub(ep))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ta=new lt,np=new lt,zc=new lt,pr=new lt,ip=new lt,Fc=new lt,ap=new lt;class TS{constructor(t=new lt,i=new lt(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ta)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=Ta.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(Ta.copy(this.origin).addScaledVector(this.direction,i),Ta.distanceToSquared(t))}distanceSqToSegment(t,i,r,l){np.copy(t).add(i).multiplyScalar(.5),zc.copy(i).sub(t).normalize(),pr.copy(this.origin).sub(np);const u=t.distanceTo(i)*.5,f=-this.direction.dot(zc),h=pr.dot(this.direction),p=-pr.dot(zc),m=pr.lengthSq(),g=Math.abs(1-f*f);let v,y,M,E;if(g>0)if(v=f*p-h,y=f*h-p,E=u*g,v>=0)if(y>=-E)if(y<=E){const b=1/g;v*=b,y*=b,M=v*(v+f*y+2*h)+y*(f*v+y+2*p)+m}else y=u,v=Math.max(0,-(f*y+h)),M=-v*v+y*(y+2*p)+m;else y=-u,v=Math.max(0,-(f*y+h)),M=-v*v+y*(y+2*p)+m;else y<=-E?(v=Math.max(0,-(-f*u+h)),y=v>0?-u:Math.min(Math.max(-u,-p),u),M=-v*v+y*(y+2*p)+m):y<=E?(v=0,y=Math.min(Math.max(-u,-p),u),M=y*(y+2*p)+m):(v=Math.max(0,-(f*u+h)),y=v>0?u:Math.min(Math.max(-u,-p),u),M=-v*v+y*(y+2*p)+m);else y=f>0?-u:u,v=Math.max(0,-(f*y+h)),M=-v*v+y*(y+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(np).addScaledVector(zc,y),M}intersectSphere(t,i){Ta.subVectors(t.center,this.origin);const r=Ta.dot(this.direction),l=Ta.dot(Ta)-r*r,u=t.radius*t.radius;if(l>u)return null;const f=Math.sqrt(u-l),h=r-f,p=r+f;return p<0?null:h<0?this.at(p,i):this.at(h,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(t.normal)+t.constant)/i;return r>=0?r:null}intersectPlane(t,i){const r=this.distanceToPlane(t);return r===null?null:this.at(r,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let r,l,u,f,h,p;const m=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,y=this.origin;return m>=0?(r=(t.min.x-y.x)*m,l=(t.max.x-y.x)*m):(r=(t.max.x-y.x)*m,l=(t.min.x-y.x)*m),g>=0?(u=(t.min.y-y.y)*g,f=(t.max.y-y.y)*g):(u=(t.max.y-y.y)*g,f=(t.min.y-y.y)*g),r>f||u>l||((u>r||isNaN(r))&&(r=u),(f<l||isNaN(l))&&(l=f),v>=0?(h=(t.min.z-y.z)*v,p=(t.max.z-y.z)*v):(h=(t.max.z-y.z)*v,p=(t.min.z-y.z)*v),r>p||h>l)||((h>r||r!==r)&&(r=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(t){return this.intersectBox(t,Ta)!==null}intersectTriangle(t,i,r,l,u){ip.subVectors(i,t),Fc.subVectors(r,t),ap.crossVectors(ip,Fc);let f=this.direction.dot(ap),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;pr.subVectors(this.origin,t);const p=h*this.direction.dot(Fc.crossVectors(pr,Fc));if(p<0)return null;const m=h*this.direction.dot(ip.cross(pr));if(m<0||p+m>f)return null;const g=-h*pr.dot(ap);return g<0?null:this.at(g/f,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class cn{constructor(t,i,r,l,u,f,h,p,m,g,v,y,M,E,b,x){cn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,l,u,f,h,p,m,g,v,y,M,E,b,x)}set(t,i,r,l,u,f,h,p,m,g,v,y,M,E,b,x){const _=this.elements;return _[0]=t,_[4]=i,_[8]=r,_[12]=l,_[1]=u,_[5]=f,_[9]=h,_[13]=p,_[2]=m,_[6]=g,_[10]=v,_[14]=y,_[3]=M,_[7]=E,_[11]=b,_[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cn().fromArray(this.elements)}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){const i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,r=t.elements,l=1/fo.setFromMatrixColumn(t,0).length(),u=1/fo.setFromMatrixColumn(t,1).length(),f=1/fo.setFromMatrixColumn(t,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*u,i[5]=r[5]*u,i[6]=r[6]*u,i[7]=0,i[8]=r[8]*f,i[9]=r[9]*f,i[10]=r[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,r=t.x,l=t.y,u=t.z,f=Math.cos(r),h=Math.sin(r),p=Math.cos(l),m=Math.sin(l),g=Math.cos(u),v=Math.sin(u);if(t.order==="XYZ"){const y=f*g,M=f*v,E=h*g,b=h*v;i[0]=p*g,i[4]=-p*v,i[8]=m,i[1]=M+E*m,i[5]=y-b*m,i[9]=-h*p,i[2]=b-y*m,i[6]=E+M*m,i[10]=f*p}else if(t.order==="YXZ"){const y=p*g,M=p*v,E=m*g,b=m*v;i[0]=y+b*h,i[4]=E*h-M,i[8]=f*m,i[1]=f*v,i[5]=f*g,i[9]=-h,i[2]=M*h-E,i[6]=b+y*h,i[10]=f*p}else if(t.order==="ZXY"){const y=p*g,M=p*v,E=m*g,b=m*v;i[0]=y-b*h,i[4]=-f*v,i[8]=E+M*h,i[1]=M+E*h,i[5]=f*g,i[9]=b-y*h,i[2]=-f*m,i[6]=h,i[10]=f*p}else if(t.order==="ZYX"){const y=f*g,M=f*v,E=h*g,b=h*v;i[0]=p*g,i[4]=E*m-M,i[8]=y*m+b,i[1]=p*v,i[5]=b*m+y,i[9]=M*m-E,i[2]=-m,i[6]=h*p,i[10]=f*p}else if(t.order==="YZX"){const y=f*p,M=f*m,E=h*p,b=h*m;i[0]=p*g,i[4]=b-y*v,i[8]=E*v+M,i[1]=v,i[5]=f*g,i[9]=-h*g,i[2]=-m*g,i[6]=M*v+E,i[10]=y-b*v}else if(t.order==="XZY"){const y=f*p,M=f*m,E=h*p,b=h*m;i[0]=p*g,i[4]=-v,i[8]=m*g,i[1]=y*v+b,i[5]=f*g,i[9]=M*v-E,i[2]=E*v-M,i[6]=h*g,i[10]=b*v+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(P1,t,z1)}lookAt(t,i,r){const l=this.elements;return fi.subVectors(t,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),mr.crossVectors(r,fi),mr.lengthSq()===0&&(Math.abs(r.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),mr.crossVectors(r,fi)),mr.normalize(),Ic.crossVectors(fi,mr),l[0]=mr.x,l[4]=Ic.x,l[8]=fi.x,l[1]=mr.y,l[5]=Ic.y,l[9]=fi.y,l[2]=mr.z,l[6]=Ic.z,l[10]=fi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,u=this.elements,f=r[0],h=r[4],p=r[8],m=r[12],g=r[1],v=r[5],y=r[9],M=r[13],E=r[2],b=r[6],x=r[10],_=r[14],L=r[3],D=r[7],R=r[11],V=r[15],z=l[0],N=l[4],X=l[8],U=l[12],w=l[1],k=l[5],ut=l[9],ot=l[13],mt=l[2],ht=l[6],I=l[10],B=l[14],W=l[3],bt=l[7],Rt=l[11],P=l[15];return u[0]=f*z+h*w+p*mt+m*W,u[4]=f*N+h*k+p*ht+m*bt,u[8]=f*X+h*ut+p*I+m*Rt,u[12]=f*U+h*ot+p*B+m*P,u[1]=g*z+v*w+y*mt+M*W,u[5]=g*N+v*k+y*ht+M*bt,u[9]=g*X+v*ut+y*I+M*Rt,u[13]=g*U+v*ot+y*B+M*P,u[2]=E*z+b*w+x*mt+_*W,u[6]=E*N+b*k+x*ht+_*bt,u[10]=E*X+b*ut+x*I+_*Rt,u[14]=E*U+b*ot+x*B+_*P,u[3]=L*z+D*w+R*mt+V*W,u[7]=L*N+D*k+R*ht+V*bt,u[11]=L*X+D*ut+R*I+V*Rt,u[15]=L*U+D*ot+R*B+V*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[4],l=t[8],u=t[12],f=t[1],h=t[5],p=t[9],m=t[13],g=t[2],v=t[6],y=t[10],M=t[14],E=t[3],b=t[7],x=t[11],_=t[15];return E*(+u*p*v-l*m*v-u*h*y+r*m*y+l*h*M-r*p*M)+b*(+i*p*M-i*m*y+u*f*y-l*f*M+l*m*g-u*p*g)+x*(+i*m*v-i*h*M-u*f*v+r*f*M+u*h*g-r*m*g)+_*(-l*h*g-i*p*v+i*h*y+l*f*v-r*f*y+r*p*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=r),this}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],v=t[9],y=t[10],M=t[11],E=t[12],b=t[13],x=t[14],_=t[15],L=v*x*m-b*y*m+b*p*M-h*x*M-v*p*_+h*y*_,D=E*y*m-g*x*m-E*p*M+f*x*M+g*p*_-f*y*_,R=g*b*m-E*v*m+E*h*M-f*b*M-g*h*_+f*v*_,V=E*v*p-g*b*p-E*h*y+f*b*y+g*h*x-f*v*x,z=i*L+r*D+l*R+u*V;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/z;return t[0]=L*N,t[1]=(b*y*u-v*x*u-b*l*M+r*x*M+v*l*_-r*y*_)*N,t[2]=(h*x*u-b*p*u+b*l*m-r*x*m-h*l*_+r*p*_)*N,t[3]=(v*p*u-h*y*u-v*l*m+r*y*m+h*l*M-r*p*M)*N,t[4]=D*N,t[5]=(g*x*u-E*y*u+E*l*M-i*x*M-g*l*_+i*y*_)*N,t[6]=(E*p*u-f*x*u-E*l*m+i*x*m+f*l*_-i*p*_)*N,t[7]=(f*y*u-g*p*u+g*l*m-i*y*m-f*l*M+i*p*M)*N,t[8]=R*N,t[9]=(E*v*u-g*b*u-E*r*M+i*b*M+g*r*_-i*v*_)*N,t[10]=(f*b*u-E*h*u+E*r*m-i*b*m-f*r*_+i*h*_)*N,t[11]=(g*h*u-f*v*u-g*r*m+i*v*m+f*r*M-i*h*M)*N,t[12]=V*N,t[13]=(g*b*l-E*v*l+E*r*y-i*b*y-g*r*x+i*v*x)*N,t[14]=(E*h*l-f*b*l-E*r*p+i*b*p+f*r*x-i*h*x)*N,t[15]=(f*v*l-g*h*l+g*r*p-i*v*p-f*r*y+i*h*y)*N,this}scale(t){const i=this.elements,r=t.x,l=t.y,u=t.z;return i[0]*=r,i[4]*=l,i[8]*=u,i[1]*=r,i[5]*=l,i[9]*=u,i[2]*=r,i[6]*=l,i[10]*=u,i[3]*=r,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const r=Math.cos(i),l=Math.sin(i),u=1-r,f=t.x,h=t.y,p=t.z,m=u*f,g=u*h;return this.set(m*f+r,m*h-l*p,m*p+l*h,0,m*h+l*p,g*h+r,g*p-l*f,0,m*p-l*h,g*p+l*f,u*p*p+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,l,u,f){return this.set(1,r,u,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,r){const l=this.elements,u=i._x,f=i._y,h=i._z,p=i._w,m=u+u,g=f+f,v=h+h,y=u*m,M=u*g,E=u*v,b=f*g,x=f*v,_=h*v,L=p*m,D=p*g,R=p*v,V=r.x,z=r.y,N=r.z;return l[0]=(1-(b+_))*V,l[1]=(M+R)*V,l[2]=(E-D)*V,l[3]=0,l[4]=(M-R)*z,l[5]=(1-(y+_))*z,l[6]=(x+L)*z,l[7]=0,l[8]=(E+D)*N,l[9]=(x-L)*N,l[10]=(1-(y+b))*N,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,r){const l=this.elements;let u=fo.set(l[0],l[1],l[2]).length();const f=fo.set(l[4],l[5],l[6]).length(),h=fo.set(l[8],l[9],l[10]).length();this.determinant()<0&&(u=-u),t.x=l[12],t.y=l[13],t.z=l[14],zi.copy(this);const m=1/u,g=1/f,v=1/h;return zi.elements[0]*=m,zi.elements[1]*=m,zi.elements[2]*=m,zi.elements[4]*=g,zi.elements[5]*=g,zi.elements[6]*=g,zi.elements[8]*=v,zi.elements[9]*=v,zi.elements[10]*=v,i.setFromRotationMatrix(zi),r.x=u,r.y=f,r.z=h,this}makePerspective(t,i,r,l,u,f,h=Fa){const p=this.elements,m=2*u/(i-t),g=2*u/(r-l),v=(i+t)/(i-t),y=(r+l)/(r-l);let M,E;if(h===Fa)M=-(f+u)/(f-u),E=-2*f*u/(f-u);else if(h===vf)M=-f/(f-u),E=-f*u/(f-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=g,p[9]=y,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,r,l,u,f,h=Fa){const p=this.elements,m=1/(i-t),g=1/(r-l),v=1/(f-u),y=(i+t)*m,M=(r+l)*g;let E,b;if(h===Fa)E=(f+u)*v,b=-2*v;else if(h===vf)E=u*v,b=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-y,p[1]=0,p[5]=2*g,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=b,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}}const fo=new lt,zi=new cn,P1=new lt(0,0,0),z1=new lt(1,1,1),mr=new lt,Ic=new lt,fi=new lt,Ty=new cn,Ay=new gu;class Va{constructor(t=0,i=0,r=0,l=Va.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,l=this._order){return this._x=t,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){const l=t.elements,u=l[0],f=l[4],h=l[8],p=l[1],m=l[5],g=l[9],v=l[2],y=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Ae(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-f,u)):(this._x=Math.atan2(y,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-v,u),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-v,M),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,u));break;case"ZYX":this._y=Math.asin(-Ae(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(y,M),this._z=Math.atan2(p,u)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(Ae(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-v,u)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-Ae(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(y,m),this._y=Math.atan2(h,u)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Ty.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ty,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Ay.setFromEuler(this),this.setFromQuaternion(Ay,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Va.DEFAULT_ORDER="XYZ";class AS{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let F1=0;const Ry=new lt,ho=new gu,Aa=new cn,Bc=new lt,Jl=new lt,I1=new lt,B1=new gu,Cy=new lt(1,0,0),wy=new lt(0,1,0),Dy=new lt(0,0,1),Uy={type:"added"},H1={type:"removed"},po={type:"childadded",child:null},rp={type:"childremoved",child:null};class ii extends Ko{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:F1++}),this.uuid=mu(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ii.DEFAULT_UP.clone();const t=new lt,i=new Va,r=new gu,l=new lt(1,1,1);function u(){r.setFromEuler(i,!1)}function f(){i.setFromQuaternion(r,void 0,!1)}i._onChange(u),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new cn},normalMatrix:{value:new he}}),this.matrix=new cn,this.matrixWorld=new cn,this.matrixAutoUpdate=ii.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ii.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new AS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return ho.setFromAxisAngle(t,i),this.quaternion.multiply(ho),this}rotateOnWorldAxis(t,i){return ho.setFromAxisAngle(t,i),this.quaternion.premultiply(ho),this}rotateX(t){return this.rotateOnAxis(Cy,t)}rotateY(t){return this.rotateOnAxis(wy,t)}rotateZ(t){return this.rotateOnAxis(Dy,t)}translateOnAxis(t,i){return Ry.copy(t).applyQuaternion(this.quaternion),this.position.add(Ry.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Cy,t)}translateY(t){return this.translateOnAxis(wy,t)}translateZ(t){return this.translateOnAxis(Dy,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Aa.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Bc.copy(t):Bc.set(t,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Jl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Aa.lookAt(Jl,Bc,this.up):Aa.lookAt(Bc,Jl,this.up),this.quaternion.setFromRotationMatrix(Aa),l&&(Aa.extractRotation(l.matrixWorld),ho.setFromRotationMatrix(Aa),this.quaternion.premultiply(ho.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uy),po.child=t,this.dispatchEvent(po),po.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(H1),rp.child=t,this.dispatchEvent(rp),rp.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Aa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Aa.multiply(t.parent.matrixWorld)),t.applyMatrix4(Aa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uy),po.child=t,this.dispatchEvent(po),po.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const f=this.children[r].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);const l=this.children;for(let u=0,f=l.length;u<f;u++)l[u].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jl,t,I1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jl,B1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let u=0,f=l.length;u<f;u++)l[u].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function u(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,g=p.length;m<g;m++){const v=p[m];u(t.shapes,v)}else u(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(u(t.materials,this.material[p]));l.material=h}else l.material=u(t.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(u(t.animations,p))}}if(i){const h=f(t.geometries),p=f(t.materials),m=f(t.textures),g=f(t.images),v=f(t.shapes),y=f(t.skeletons),M=f(t.animations),E=f(t.nodes);h.length>0&&(r.geometries=h),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),g.length>0&&(r.images=g),v.length>0&&(r.shapes=v),y.length>0&&(r.skeletons=y),M.length>0&&(r.animations=M),E.length>0&&(r.nodes=E)}return r.object=l,r;function f(h){const p=[];for(const m in h){const g=h[m];delete g.metadata,p.push(g)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){const l=t.children[r];this.add(l.clone())}return this}}ii.DEFAULT_UP=new lt(0,1,0);ii.DEFAULT_MATRIX_AUTO_UPDATE=!0;ii.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fi=new lt,Ra=new lt,sp=new lt,Ca=new lt,mo=new lt,go=new lt,Ly=new lt,op=new lt,lp=new lt,up=new lt,cp=new un,fp=new un,hp=new un;class Bi{constructor(t=new lt,i=new lt,r=new lt){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,l){l.subVectors(r,i),Fi.subVectors(t,i),l.cross(Fi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(t,i,r,l,u){Fi.subVectors(l,i),Ra.subVectors(r,i),sp.subVectors(t,i);const f=Fi.dot(Fi),h=Fi.dot(Ra),p=Fi.dot(sp),m=Ra.dot(Ra),g=Ra.dot(sp),v=f*m-h*h;if(v===0)return u.set(0,0,0),null;const y=1/v,M=(m*p-h*g)*y,E=(f*g-h*p)*y;return u.set(1-M-E,E,M)}static containsPoint(t,i,r,l){return this.getBarycoord(t,i,r,l,Ca)===null?!1:Ca.x>=0&&Ca.y>=0&&Ca.x+Ca.y<=1}static getInterpolation(t,i,r,l,u,f,h,p){return this.getBarycoord(t,i,r,l,Ca)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(u,Ca.x),p.addScaledVector(f,Ca.y),p.addScaledVector(h,Ca.z),p)}static getInterpolatedAttribute(t,i,r,l,u,f){return cp.setScalar(0),fp.setScalar(0),hp.setScalar(0),cp.fromBufferAttribute(t,i),fp.fromBufferAttribute(t,r),hp.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(cp,u.x),f.addScaledVector(fp,u.y),f.addScaledVector(hp,u.z),f}static isFrontFacing(t,i,r,l){return Fi.subVectors(r,i),Ra.subVectors(t,i),Fi.cross(Ra).dot(l)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,l){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,r,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fi.subVectors(this.c,this.b),Ra.subVectors(this.a,this.b),Fi.cross(Ra).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Bi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,l,u){return Bi.getInterpolation(t,this.a,this.b,this.c,i,r,l,u)}containsPoint(t){return Bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const r=this.a,l=this.b,u=this.c;let f,h;mo.subVectors(l,r),go.subVectors(u,r),op.subVectors(t,r);const p=mo.dot(op),m=go.dot(op);if(p<=0&&m<=0)return i.copy(r);lp.subVectors(t,l);const g=mo.dot(lp),v=go.dot(lp);if(g>=0&&v<=g)return i.copy(l);const y=p*v-g*m;if(y<=0&&p>=0&&g<=0)return f=p/(p-g),i.copy(r).addScaledVector(mo,f);up.subVectors(t,u);const M=mo.dot(up),E=go.dot(up);if(E>=0&&M<=E)return i.copy(u);const b=M*m-p*E;if(b<=0&&m>=0&&E<=0)return h=m/(m-E),i.copy(r).addScaledVector(go,h);const x=g*E-M*v;if(x<=0&&v-g>=0&&M-E>=0)return Ly.subVectors(u,l),h=(v-g)/(v-g+(M-E)),i.copy(l).addScaledVector(Ly,h);const _=1/(x+b+y);return f=b*_,h=y*_,i.copy(r).addScaledVector(mo,f).addScaledVector(go,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const RS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gr={h:0,s:0,l:0},Hc={h:0,s:0,l:0};function dp(a,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?a+(t-a)*6*i:i<1/2?t:i<2/3?a+(t-a)*6*(2/3-i):a}class Ce{constructor(t,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,r)}set(t,i,r){if(i===void 0&&r===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,r);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=Ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ne.toWorkingColorSpace(this,i),this}setRGB(t,i,r,l=Ne.workingColorSpace){return this.r=t,this.g=i,this.b=r,Ne.toWorkingColorSpace(this,l),this}setHSL(t,i,r,l=Ne.workingColorSpace){if(t=E1(t,1),i=Ae(i,0,1),r=Ae(r,0,1),i===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+i):r+i-r*i,f=2*r-u;this.r=dp(f,u,t+1/3),this.g=dp(f,u,t),this.b=dp(f,u,t-1/3)}return Ne.toWorkingColorSpace(this,l),this}setStyle(t,i=Ai){function r(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=l[1],f=u.length;if(f===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(u,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=Ai){const r=RS[t.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ia(t.r),this.g=Ia(t.g),this.b=Ia(t.b),this}copyLinearToSRGB(t){return this.r=To(t.r),this.g=To(t.g),this.b=To(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ai){return Ne.fromWorkingColorSpace(Fn.copy(this),t),Math.round(Ae(Fn.r*255,0,255))*65536+Math.round(Ae(Fn.g*255,0,255))*256+Math.round(Ae(Fn.b*255,0,255))}getHexString(t=Ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ne.workingColorSpace){Ne.fromWorkingColorSpace(Fn.copy(this),i);const r=Fn.r,l=Fn.g,u=Fn.b,f=Math.max(r,l,u),h=Math.min(r,l,u);let p,m;const g=(h+f)/2;if(h===f)p=0,m=0;else{const v=f-h;switch(m=g<=.5?v/(f+h):v/(2-f-h),f){case r:p=(l-u)/v+(l<u?6:0);break;case l:p=(u-r)/v+2;break;case u:p=(r-l)/v+4;break}p/=6}return t.h=p,t.s=m,t.l=g,t}getRGB(t,i=Ne.workingColorSpace){return Ne.fromWorkingColorSpace(Fn.copy(this),i),t.r=Fn.r,t.g=Fn.g,t.b=Fn.b,t}getStyle(t=Ai){Ne.fromWorkingColorSpace(Fn.copy(this),t);const i=Fn.r,r=Fn.g,l=Fn.b;return t!==Ai?`color(${t} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(t,i,r){return this.getHSL(gr),this.setHSL(gr.h+t,gr.s+i,gr.l+r)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,r){return this.r=t.r+(i.r-t.r)*r,this.g=t.g+(i.g-t.g)*r,this.b=t.b+(i.b-t.b)*r,this}lerpHSL(t,i){this.getHSL(gr),t.getHSL(Hc);const r=Zd(gr.h,Hc.h,i),l=Zd(gr.s,Hc.s,i),u=Zd(gr.l,Hc.l,i);return this.setHSL(r,l,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,r=this.g,l=this.b,u=t.elements;return this.r=u[0]*i+u[3]*r+u[6]*l,this.g=u[1]*i+u[4]*r+u[7]*l,this.b=u[2]*i+u[5]*r+u[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fn=new Ce;Ce.NAMES=RS;let G1=0;class _u extends Ko{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:G1++}),this.uuid=mu(),this.name="",this.type="Material",this.blending=Eo,this.side=Lr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kp,this.blendDst=Xp,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=Ho,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_y,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=so,this.stencilZFail=so,this.stencilZPass=so,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const r=t[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(t).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(t).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(t).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(t).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(t).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Eo&&(r.blending=this.blending),this.side!==Lr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==kp&&(r.blendSrc=this.blendSrc),this.blendDst!==Xp&&(r.blendDst=this.blendDst),this.blendEquation!==ls&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Ho&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_y&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==so&&(r.stencilFail=this.stencilFail),this.stencilZFail!==so&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==so&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(u){const f=[];for(const h in u){const p=u[h];delete p.metadata,f.push(p)}return f}if(i){const u=l(t.textures),f=l(t.images);u.length>0&&(r.textures=u),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let u=0;u!==l;++u)r[u]=i[u].clone()}return this.clippingPlanes=r,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class yf extends _u{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Va,this.combine=uS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const gn=new lt,Gc=new We;class na{constructor(t,i,r=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=r,this.usage=yy,this.updateRanges=[],this.gpuType=za,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,r){t*=this.itemSize,r*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[t+l]=i.array[r+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)Gc.fromBufferAttribute(this,i),Gc.applyMatrix3(t),this.setXY(i,Gc.x,Gc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)gn.fromBufferAttribute(this,i),gn.applyMatrix3(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}applyMatrix4(t){for(let i=0,r=this.count;i<r;i++)gn.fromBufferAttribute(this,i),gn.applyMatrix4(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)gn.fromBufferAttribute(this,i),gn.applyNormalMatrix(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)gn.fromBufferAttribute(this,i),gn.transformDirection(t),this.setXYZ(i,gn.x,gn.y,gn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let r=this.array[t*this.itemSize+i];return this.normalized&&(r=Ql(r,this.array)),r}setComponent(t,i,r){return this.normalized&&(r=Jn(r,this.array)),this.array[t*this.itemSize+i]=r,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Ql(i,this.array)),i}setX(t,i){return this.normalized&&(i=Jn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Ql(i,this.array)),i}setY(t,i){return this.normalized&&(i=Jn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Ql(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Jn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Ql(i,this.array)),i}setW(t,i){return this.normalized&&(i=Jn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,r){return t*=this.itemSize,this.normalized&&(i=Jn(i,this.array),r=Jn(r,this.array)),this.array[t+0]=i,this.array[t+1]=r,this}setXYZ(t,i,r,l){return t*=this.itemSize,this.normalized&&(i=Jn(i,this.array),r=Jn(r,this.array),l=Jn(l,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this}setXYZW(t,i,r,l,u){return t*=this.itemSize,this.normalized&&(i=Jn(i,this.array),r=Jn(r,this.array),l=Jn(l,this.array),u=Jn(u,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yy&&(t.usage=this.usage),t}}class CS extends na{constructor(t,i,r){super(new Uint16Array(t),i,r)}}class wS extends na{constructor(t,i,r){super(new Uint32Array(t),i,r)}}class Bn extends na{constructor(t,i,r){super(new Float32Array(t),i,r)}}let V1=0;const bi=new cn,pp=new ii,vo=new lt,hi=new vu,$l=new vu,Tn=new lt;class wi extends Ko{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:V1++}),this.uuid=mu(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(MS(t)?wS:CS)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new he().getNormalMatrix(t);r.applyNormalMatrix(u),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bi.makeRotationFromQuaternion(t),this.applyMatrix4(bi),this}rotateX(t){return bi.makeRotationX(t),this.applyMatrix4(bi),this}rotateY(t){return bi.makeRotationY(t),this.applyMatrix4(bi),this}rotateZ(t){return bi.makeRotationZ(t),this.applyMatrix4(bi),this}translate(t,i,r){return bi.makeTranslation(t,i,r),this.applyMatrix4(bi),this}scale(t,i,r){return bi.makeScale(t,i,r),this.applyMatrix4(bi),this}lookAt(t){return pp.lookAt(t),pp.updateMatrix(),this.applyMatrix4(pp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vo).negate(),this.translate(vo.x,vo.y,vo.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,u=t.length;l<u;l++){const f=t[l];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Bn(r,3))}else{const r=Math.min(t.length,i.count);for(let l=0;l<r;l++){const u=t[l];i.setXYZ(l,u.x,u.y,u.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vu);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new lt(-1/0,-1/0,-1/0),new lt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,l=i.length;r<l;r++){const u=i[r];hi.setFromBufferAttribute(u),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rf);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new lt,1/0);return}if(t){const r=this.boundingSphere.center;if(hi.setFromBufferAttribute(t),i)for(let u=0,f=i.length;u<f;u++){const h=i[u];$l.setFromBufferAttribute(h),this.morphTargetsRelative?(Tn.addVectors(hi.min,$l.min),hi.expandByPoint(Tn),Tn.addVectors(hi.max,$l.max),hi.expandByPoint(Tn)):(hi.expandByPoint($l.min),hi.expandByPoint($l.max))}hi.getCenter(r);let l=0;for(let u=0,f=t.count;u<f;u++)Tn.fromBufferAttribute(t,u),l=Math.max(l,r.distanceToSquared(Tn));if(i)for(let u=0,f=i.length;u<f;u++){const h=i[u],p=this.morphTargetsRelative;for(let m=0,g=h.count;m<g;m++)Tn.fromBufferAttribute(h,m),p&&(vo.fromBufferAttribute(t,m),Tn.add(vo)),l=Math.max(l,r.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,u=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new na(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),h=[],p=[];for(let X=0;X<r.count;X++)h[X]=new lt,p[X]=new lt;const m=new lt,g=new lt,v=new lt,y=new We,M=new We,E=new We,b=new lt,x=new lt;function _(X,U,w){m.fromBufferAttribute(r,X),g.fromBufferAttribute(r,U),v.fromBufferAttribute(r,w),y.fromBufferAttribute(u,X),M.fromBufferAttribute(u,U),E.fromBufferAttribute(u,w),g.sub(m),v.sub(m),M.sub(y),E.sub(y);const k=1/(M.x*E.y-E.x*M.y);isFinite(k)&&(b.copy(g).multiplyScalar(E.y).addScaledVector(v,-M.y).multiplyScalar(k),x.copy(v).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(k),h[X].add(b),h[U].add(b),h[w].add(b),p[X].add(x),p[U].add(x),p[w].add(x))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let X=0,U=L.length;X<U;++X){const w=L[X],k=w.start,ut=w.count;for(let ot=k,mt=k+ut;ot<mt;ot+=3)_(t.getX(ot+0),t.getX(ot+1),t.getX(ot+2))}const D=new lt,R=new lt,V=new lt,z=new lt;function N(X){V.fromBufferAttribute(l,X),z.copy(V);const U=h[X];D.copy(U),D.sub(V.multiplyScalar(V.dot(U))).normalize(),R.crossVectors(z,U);const k=R.dot(p[X])<0?-1:1;f.setXYZW(X,D.x,D.y,D.z,k)}for(let X=0,U=L.length;X<U;++X){const w=L[X],k=w.start,ut=w.count;for(let ot=k,mt=k+ut;ot<mt;ot+=3)N(t.getX(ot+0)),N(t.getX(ot+1)),N(t.getX(ot+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new na(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let y=0,M=r.count;y<M;y++)r.setXYZ(y,0,0,0);const l=new lt,u=new lt,f=new lt,h=new lt,p=new lt,m=new lt,g=new lt,v=new lt;if(t)for(let y=0,M=t.count;y<M;y+=3){const E=t.getX(y+0),b=t.getX(y+1),x=t.getX(y+2);l.fromBufferAttribute(i,E),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,x),g.subVectors(f,u),v.subVectors(l,u),g.cross(v),h.fromBufferAttribute(r,E),p.fromBufferAttribute(r,b),m.fromBufferAttribute(r,x),h.add(g),p.add(g),m.add(g),r.setXYZ(E,h.x,h.y,h.z),r.setXYZ(b,p.x,p.y,p.z),r.setXYZ(x,m.x,m.y,m.z)}else for(let y=0,M=i.count;y<M;y+=3)l.fromBufferAttribute(i,y+0),u.fromBufferAttribute(i,y+1),f.fromBufferAttribute(i,y+2),g.subVectors(f,u),v.subVectors(l,u),g.cross(v),r.setXYZ(y+0,g.x,g.y,g.z),r.setXYZ(y+1,g.x,g.y,g.z),r.setXYZ(y+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)Tn.fromBufferAttribute(t,i),Tn.normalize(),t.setXYZ(i,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(h,p){const m=h.array,g=h.itemSize,v=h.normalized,y=new m.constructor(p.length*g);let M=0,E=0;for(let b=0,x=p.length;b<x;b++){h.isInterleavedBufferAttribute?M=p[b]*h.data.stride+h.offset:M=p[b]*g;for(let _=0;_<g;_++)y[E++]=m[M++]}return new na(y,g,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new wi,r=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=t(p,r);i.setAttribute(h,m)}const u=this.morphAttributes;for(const h in u){const p=[],m=u[h];for(let g=0,v=m.length;g<v;g++){const y=m[g],M=t(y,r);p.push(M)}i.morphAttributes[h]=p}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const p in r){const m=r[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let u=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],g=[];for(let v=0,y=m.length;v<y;v++){const M=m[v];g.push(M.toJSON(t.data))}g.length>0&&(l[p]=g,u=!0)}u&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const r=t.index;r!==null&&this.setIndex(r.clone(i));const l=t.attributes;for(const m in l){const g=l[m];this.setAttribute(m,g.clone(i))}const u=t.morphAttributes;for(const m in u){const g=[],v=u[m];for(let y=0,M=v.length;y<M;y++)g.push(v[y].clone(i));this.morphAttributes[m]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let m=0,g=f.length;m<g;m++){const v=f[m];this.addGroup(v.start,v.count,v.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ny=new cn,ns=new TS,Vc=new Rf,Oy=new lt,kc=new lt,Xc=new lt,qc=new lt,mp=new lt,jc=new lt,Py=new lt,Wc=new lt;class Gi extends ii{constructor(t=new wi,i=new yf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=l.length;u<f;u++){const h=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=u}}}}getVertexPosition(t,i){const r=this.geometry,l=r.attributes.position,u=r.morphAttributes.position,f=r.morphTargetsRelative;i.fromBufferAttribute(l,t);const h=this.morphTargetInfluences;if(u&&h){jc.set(0,0,0);for(let p=0,m=u.length;p<m;p++){const g=h[p],v=u[p];g!==0&&(mp.fromBufferAttribute(v,t),f?jc.addScaledVector(mp,g):jc.addScaledVector(mp.sub(i),g))}i.add(jc)}return i}raycast(t,i){const r=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Vc.copy(r.boundingSphere),Vc.applyMatrix4(u),ns.copy(t.ray).recast(t.near),!(Vc.containsPoint(ns.origin)===!1&&(ns.intersectSphere(Vc,Oy)===null||ns.origin.distanceToSquared(Oy)>(t.far-t.near)**2))&&(Ny.copy(u).invert(),ns.copy(t.ray).applyMatrix4(Ny),!(r.boundingBox!==null&&ns.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(t,i,ns)))}_computeIntersections(t,i,r){let l;const u=this.geometry,f=this.material,h=u.index,p=u.attributes.position,m=u.attributes.uv,g=u.attributes.uv1,v=u.attributes.normal,y=u.groups,M=u.drawRange;if(h!==null)if(Array.isArray(f))for(let E=0,b=y.length;E<b;E++){const x=y[E],_=f[x.materialIndex],L=Math.max(x.start,M.start),D=Math.min(h.count,Math.min(x.start+x.count,M.start+M.count));for(let R=L,V=D;R<V;R+=3){const z=h.getX(R),N=h.getX(R+1),X=h.getX(R+2);l=Yc(this,_,t,r,m,g,v,z,N,X),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),b=Math.min(h.count,M.start+M.count);for(let x=E,_=b;x<_;x+=3){const L=h.getX(x),D=h.getX(x+1),R=h.getX(x+2);l=Yc(this,f,t,r,m,g,v,L,D,R),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let E=0,b=y.length;E<b;E++){const x=y[E],_=f[x.materialIndex],L=Math.max(x.start,M.start),D=Math.min(p.count,Math.min(x.start+x.count,M.start+M.count));for(let R=L,V=D;R<V;R+=3){const z=R,N=R+1,X=R+2;l=Yc(this,_,t,r,m,g,v,z,N,X),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),b=Math.min(p.count,M.start+M.count);for(let x=E,_=b;x<_;x+=3){const L=x,D=x+1,R=x+2;l=Yc(this,f,t,r,m,g,v,L,D,R),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function k1(a,t,i,r,l,u,f,h){let p;if(t.side===ei?p=r.intersectTriangle(f,u,l,!0,h):p=r.intersectTriangle(l,u,f,t.side===Lr,h),p===null)return null;Wc.copy(h),Wc.applyMatrix4(a.matrixWorld);const m=i.ray.origin.distanceTo(Wc);return m<i.near||m>i.far?null:{distance:m,point:Wc.clone(),object:a}}function Yc(a,t,i,r,l,u,f,h,p,m){a.getVertexPosition(h,kc),a.getVertexPosition(p,Xc),a.getVertexPosition(m,qc);const g=k1(a,t,i,r,kc,Xc,qc,Py);if(g){const v=new lt;Bi.getBarycoord(Py,kc,Xc,qc,v),l&&(g.uv=Bi.getInterpolatedAttribute(l,h,p,m,v,new We)),u&&(g.uv1=Bi.getInterpolatedAttribute(u,h,p,m,v,new We)),f&&(g.normal=Bi.getInterpolatedAttribute(f,h,p,m,v,new lt),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const y={a:h,b:p,c:m,normal:new lt,materialIndex:0};Bi.getNormal(kc,Xc,qc,y.normal),g.face=y,g.barycoord=v}return g}class Jo extends wi{constructor(t=1,i=1,r=1,l=1,u=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:l,heightSegments:u,depthSegments:f};const h=this;l=Math.floor(l),u=Math.floor(u),f=Math.floor(f);const p=[],m=[],g=[],v=[];let y=0,M=0;E("z","y","x",-1,-1,r,i,t,f,u,0),E("z","y","x",1,-1,r,i,-t,f,u,1),E("x","z","y",1,1,t,r,i,l,f,2),E("x","z","y",1,-1,t,r,-i,l,f,3),E("x","y","z",1,-1,t,i,r,l,u,4),E("x","y","z",-1,-1,t,i,-r,l,u,5),this.setIndex(p),this.setAttribute("position",new Bn(m,3)),this.setAttribute("normal",new Bn(g,3)),this.setAttribute("uv",new Bn(v,2));function E(b,x,_,L,D,R,V,z,N,X,U){const w=R/N,k=V/X,ut=R/2,ot=V/2,mt=z/2,ht=N+1,I=X+1;let B=0,W=0;const bt=new lt;for(let Rt=0;Rt<I;Rt++){const P=Rt*k-ot;for(let at=0;at<ht;at++){const Et=at*w-ut;bt[b]=Et*L,bt[x]=P*D,bt[_]=mt,m.push(bt.x,bt.y,bt.z),bt[b]=0,bt[x]=0,bt[_]=z>0?1:-1,g.push(bt.x,bt.y,bt.z),v.push(at/N),v.push(1-Rt/X),B+=1}}for(let Rt=0;Rt<X;Rt++)for(let P=0;P<N;P++){const at=y+P+ht*Rt,Et=y+P+ht*(Rt+1),J=y+(P+1)+ht*(Rt+1),dt=y+(P+1)+ht*Rt;p.push(at,Et,dt),p.push(Et,J,dt),W+=6}h.addGroup(M,W,U),M+=W,y+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function jo(a){const t={};for(const i in a){t[i]={};for(const r in a[i]){const l=a[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=l.clone():Array.isArray(l)?t[i][r]=l.slice():t[i][r]=l}}return t}function kn(a){const t={};for(let i=0;i<a.length;i++){const r=jo(a[i]);for(const l in r)t[l]=r[l]}return t}function X1(a){const t=[];for(let i=0;i<a.length;i++)t.push(a[i].clone());return t}function DS(a){const t=a.getRenderTarget();return t===null?a.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ne.workingColorSpace}const q1={clone:jo,merge:kn};var j1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,W1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nr extends _u{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=j1,this.fragmentShader=W1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=jo(t.uniforms),this.uniformsGroups=X1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class US extends ii{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new cn,this.projectionMatrix=new cn,this.projectionMatrixInverse=new cn,this.coordinateSystem=Fa}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vr=new lt,zy=new We,Fy=new We;class Ri extends US{constructor(t=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Cm*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Qd*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cm*2*Math.atan(Math.tan(Qd*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,r){vr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vr.x,vr.y).multiplyScalar(-t/vr.z),vr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(vr.x,vr.y).multiplyScalar(-t/vr.z)}getViewSize(t,i){return this.getViewBounds(t,zy,Fy),i.subVectors(Fy,zy)}setViewOffset(t,i,r,l,u,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Qd*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,u=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;u+=f.offsetX*l/p,i-=f.offsetY*r/m,l*=f.width/p,r*=f.height/m}const h=this.filmOffset;h!==0&&(u+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-r,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const _o=-90,yo=1;class Y1 extends ii{constructor(t,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ri(_o,yo,t,i);l.layers=this.layers,this.add(l);const u=new Ri(_o,yo,t,i);u.layers=this.layers,this.add(u);const f=new Ri(_o,yo,t,i);f.layers=this.layers,this.add(f);const h=new Ri(_o,yo,t,i);h.layers=this.layers,this.add(h);const p=new Ri(_o,yo,t,i);p.layers=this.layers,this.add(p);const m=new Ri(_o,yo,t,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[r,l,u,f,h,p]=i;for(const m of i)this.remove(m);if(t===Fa)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===vf)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of i)this.add(m),m.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,f,h,p,m,g]=this.children,v=t.getRenderTarget(),y=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const b=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,t.setRenderTarget(r,0,l),t.render(i,u),t.setRenderTarget(r,1,l),t.render(i,f),t.setRenderTarget(r,2,l),t.render(i,h),t.setRenderTarget(r,3,l),t.render(i,p),t.setRenderTarget(r,4,l),t.render(i,m),r.texture.generateMipmaps=b,t.setRenderTarget(r,5,l),t.render(i,g),t.setRenderTarget(v,y,M),t.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class LS extends ni{constructor(t,i,r,l,u,f,h,p,m,g){t=t!==void 0?t:[],i=i!==void 0?i:Go,super(t,i,r,l,u,f,h,p,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Q1 extends Ts{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const r={width:t,height:t,depth:1},l=[r,r,r,r,r,r];this.texture=new LS(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:ea}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Jo(5,5,5),u=new Nr({name:"CubemapFromEquirect",uniforms:jo(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:ei,blending:Dr});u.uniforms.tEquirect.value=i;const f=new Gi(l,u),h=i.minFilter;return i.minFilter===ds&&(i.minFilter=ea),new Y1(1,10,this).update(t,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(t,i,r,l){const u=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,r,l);t.setRenderTarget(u)}}class Z1 extends ii{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Va,this.environmentIntensity=1,this.environmentRotation=new Va,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const gp=new lt,K1=new lt,J1=new he;class ss{constructor(t=new lt(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,r,l){return this.normal.set(t,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,r){const l=gp.subVectors(r,i).cross(K1.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const r=t.delta(gp),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/l;return u<0||u>1?null:i.copy(t.start).addScaledVector(r,u)}intersectsLine(t){const i=this.distanceToPoint(t.start),r=this.distanceToPoint(t.end);return i<0&&r>0||r<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const r=i||J1.getNormalMatrix(t),l=this.coplanarPoint(gp).applyMatrix4(t),u=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const is=new Rf,Qc=new lt;class NS{constructor(t=new ss,i=new ss,r=new ss,l=new ss,u=new ss,f=new ss){this.planes=[t,i,r,l,u,f]}set(t,i,r,l,u,f){const h=this.planes;return h[0].copy(t),h[1].copy(i),h[2].copy(r),h[3].copy(l),h[4].copy(u),h[5].copy(f),this}copy(t){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(t.planes[r]);return this}setFromProjectionMatrix(t,i=Fa){const r=this.planes,l=t.elements,u=l[0],f=l[1],h=l[2],p=l[3],m=l[4],g=l[5],v=l[6],y=l[7],M=l[8],E=l[9],b=l[10],x=l[11],_=l[12],L=l[13],D=l[14],R=l[15];if(r[0].setComponents(p-u,y-m,x-M,R-_).normalize(),r[1].setComponents(p+u,y+m,x+M,R+_).normalize(),r[2].setComponents(p+f,y+g,x+E,R+L).normalize(),r[3].setComponents(p-f,y-g,x-E,R-L).normalize(),r[4].setComponents(p-h,y-v,x-b,R-D).normalize(),i===Fa)r[5].setComponents(p+h,y+v,x+b,R+D).normalize();else if(i===vf)r[5].setComponents(h,v,b,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),is.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(t){return is.center.set(0,0,0),is.radius=.7071067811865476,is.applyMatrix4(t.matrixWorld),this.intersectsSphere(is)}intersectsSphere(t){const i=this.planes,r=t.center,l=-t.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(r)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Qc.x=l.normal.x>0?t.max.x:t.min.x,Qc.y=l.normal.y>0?t.max.y:t.min.y,Qc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Qc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cf extends _u{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xf=new lt,Sf=new lt,Iy=new cn,tu=new TS,Zc=new Rf,vp=new lt,By=new lt;class OS extends ii{constructor(t=new wi,i=new Cf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,r=[0];for(let l=1,u=i.count;l<u;l++)xf.fromBufferAttribute(i,l-1),Sf.fromBufferAttribute(i,l),r[l]=r[l-1],r[l]+=xf.distanceTo(Sf);t.setAttribute("lineDistance",new Bn(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const r=this.geometry,l=this.matrixWorld,u=t.params.Line.threshold,f=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Zc.copy(r.boundingSphere),Zc.applyMatrix4(l),Zc.radius+=u,t.ray.intersectsSphere(Zc)===!1)return;Iy.copy(l).invert(),tu.copy(t.ray).applyMatrix4(Iy);const h=u/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,g=r.index,y=r.attributes.position;if(g!==null){const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let b=M,x=E-1;b<x;b+=m){const _=g.getX(b),L=g.getX(b+1),D=Kc(this,t,tu,p,_,L);D&&i.push(D)}if(this.isLineLoop){const b=g.getX(E-1),x=g.getX(M),_=Kc(this,t,tu,p,b,x);_&&i.push(_)}}else{const M=Math.max(0,f.start),E=Math.min(y.count,f.start+f.count);for(let b=M,x=E-1;b<x;b+=m){const _=Kc(this,t,tu,p,b,b+1);_&&i.push(_)}if(this.isLineLoop){const b=Kc(this,t,tu,p,E-1,M);b&&i.push(b)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=l.length;u<f;u++){const h=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=u}}}}}function Kc(a,t,i,r,l,u){const f=a.geometry.attributes.position;if(xf.fromBufferAttribute(f,l),Sf.fromBufferAttribute(f,u),i.distanceSqToSegment(xf,Sf,vp,By)>r)return;vp.applyMatrix4(a.matrixWorld);const p=t.ray.origin.distanceTo(vp);if(!(p<t.near||p>t.far))return{distance:p,point:By.clone().applyMatrix4(a.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:a}}const Hy=new lt,Gy=new lt;class PS extends OS{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,r=[];for(let l=0,u=i.count;l<u;l+=2)Hy.fromBufferAttribute(i,l),Gy.fromBufferAttribute(i,l+1),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+Hy.distanceTo(Gy);t.setAttribute("lineDistance",new Bn(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nu extends ii{constructor(){super(),this.isGroup=!0,this.type="Group"}}class zS extends ni{constructor(t,i,r,l,u,f,h,p,m,g=bo){if(g!==bo&&g!==Xo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&g===bo&&(r=bs),r===void 0&&g===Xo&&(r=ko),super(null,l,u,f,h,p,g,r,m),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=h!==void 0?h:ki,this.minFilter=p!==void 0?p:ki,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class wf extends wi{constructor(t=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:l};const u=t/2,f=i/2,h=Math.floor(r),p=Math.floor(l),m=h+1,g=p+1,v=t/h,y=i/p,M=[],E=[],b=[],x=[];for(let _=0;_<g;_++){const L=_*y-f;for(let D=0;D<m;D++){const R=D*v-u;E.push(R,-L,0),b.push(0,0,1),x.push(D/h),x.push(1-_/p)}}for(let _=0;_<p;_++)for(let L=0;L<h;L++){const D=L+m*_,R=L+m*(_+1),V=L+1+m*(_+1),z=L+1+m*_;M.push(D,R,z),M.push(R,V,z)}this.setIndex(M),this.setAttribute("position",new Bn(E,3)),this.setAttribute("normal",new Bn(b,3)),this.setAttribute("uv",new Bn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wf(t.width,t.height,t.widthSegments,t.heightSegments)}}class tg extends wi{constructor(t=1,i=32,r=16,l=0,u=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:r,phiStart:l,phiLength:u,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));const p=Math.min(f+h,Math.PI);let m=0;const g=[],v=new lt,y=new lt,M=[],E=[],b=[],x=[];for(let _=0;_<=r;_++){const L=[],D=_/r;let R=0;_===0&&f===0?R=.5/i:_===r&&p===Math.PI&&(R=-.5/i);for(let V=0;V<=i;V++){const z=V/i;v.x=-t*Math.cos(l+z*u)*Math.sin(f+D*h),v.y=t*Math.cos(f+D*h),v.z=t*Math.sin(l+z*u)*Math.sin(f+D*h),E.push(v.x,v.y,v.z),y.copy(v).normalize(),b.push(y.x,y.y,y.z),x.push(z+R,1-D),L.push(m++)}g.push(L)}for(let _=0;_<r;_++)for(let L=0;L<i;L++){const D=g[_][L+1],R=g[_][L],V=g[_+1][L],z=g[_+1][L+1];(_!==0||f>0)&&M.push(D,R,z),(_!==r-1||p<Math.PI)&&M.push(R,V,z)}this.setIndex(M),this.setAttribute("position",new Bn(E,3)),this.setAttribute("normal",new Bn(b,3)),this.setAttribute("uv",new Bn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tg(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class $1 extends _u{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=h1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class tR extends _u{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class eR extends US{constructor(t=-1,i=1,r=1,l=-1,u=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=r,this.bottom=l,this.near=u,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,r,l,u,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=r-t,f=r+t,h=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=m*this.view.offsetX,f=u+m*this.view.width,h-=g*this.view.offsetY,p=h-g*this.view.height}this.projectionMatrix.makeOrthographic(u,f,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class nR extends Ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class iR extends PS{constructor(t=10,i=10,r=4473924,l=8947848){r=new Ce(r),l=new Ce(l);const u=i/2,f=t/i,h=t/2,p=[],m=[];for(let y=0,M=0,E=-h;y<=i;y++,E+=f){p.push(-h,0,E,h,0,E),p.push(E,0,-h,E,0,h);const b=y===u?r:l;b.toArray(m,M),M+=3,b.toArray(m,M),M+=3,b.toArray(m,M),M+=3,b.toArray(m,M),M+=3}const g=new wi;g.setAttribute("position",new Bn(p,3)),g.setAttribute("color",new Bn(m,3));const v=new Cf({vertexColors:!0,toneMapped:!1});super(g,v),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class aR extends PS{constructor(t=1){const i=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],r=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],l=new wi;l.setAttribute("position",new Bn(i,3)),l.setAttribute("color",new Bn(r,3));const u=new Cf({vertexColors:!0,toneMapped:!1});super(l,u),this.type="AxesHelper"}setColors(t,i,r){const l=new Ce,u=this.geometry.attributes.color.array;return l.set(t),l.toArray(u,0),l.toArray(u,3),l.set(i),l.toArray(u,6),l.toArray(u,9),l.set(r),l.toArray(u,12),l.toArray(u,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function Vy(a,t,i,r){const l=rR(r);switch(i){case pS:return a*t;case gS:return a*t;case vS:return a*t*2;case _S:return a*t/l.components*l.byteLength;case Km:return a*t/l.components*l.byteLength;case yS:return a*t*2/l.components*l.byteLength;case Jm:return a*t*2/l.components*l.byteLength;case mS:return a*t*3/l.components*l.byteLength;case Hi:return a*t*4/l.components*l.byteLength;case $m:return a*t*4/l.components*l.byteLength;case sf:case of:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case lf:case uf:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case im:case rm:return Math.max(a,16)*Math.max(t,8)/4;case nm:case am:return Math.max(a,8)*Math.max(t,8)/2;case sm:case om:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case lm:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case um:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case cm:return Math.floor((a+4)/5)*Math.floor((t+3)/4)*16;case fm:return Math.floor((a+4)/5)*Math.floor((t+4)/5)*16;case hm:return Math.floor((a+5)/6)*Math.floor((t+4)/5)*16;case dm:return Math.floor((a+5)/6)*Math.floor((t+5)/6)*16;case pm:return Math.floor((a+7)/8)*Math.floor((t+4)/5)*16;case mm:return Math.floor((a+7)/8)*Math.floor((t+5)/6)*16;case gm:return Math.floor((a+7)/8)*Math.floor((t+7)/8)*16;case vm:return Math.floor((a+9)/10)*Math.floor((t+4)/5)*16;case _m:return Math.floor((a+9)/10)*Math.floor((t+5)/6)*16;case ym:return Math.floor((a+9)/10)*Math.floor((t+7)/8)*16;case xm:return Math.floor((a+9)/10)*Math.floor((t+9)/10)*16;case Sm:return Math.floor((a+11)/12)*Math.floor((t+9)/10)*16;case Mm:return Math.floor((a+11)/12)*Math.floor((t+11)/12)*16;case cf:case Em:case bm:return Math.ceil(a/4)*Math.ceil(t/4)*16;case xS:case Tm:return Math.ceil(a/4)*Math.ceil(t/4)*8;case Am:case Rm:return Math.ceil(a/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function rR(a){switch(a){case Ga:case fS:return{byteLength:1,components:1};case su:case hS:case pu:return{byteLength:2,components:1};case Qm:case Zm:return{byteLength:2,components:4};case bs:case Ym:case za:return{byteLength:4,components:1};case dS:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wm}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wm);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function FS(){let a=null,t=!1,i=null,r=null;function l(u,f){i(u,f),r=a.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(r=a.requestAnimationFrame(l),t=!0)},stop:function(){a.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(u){i=u},setContext:function(u){a=u}}}function sR(a){const t=new WeakMap;function i(h,p){const m=h.array,g=h.usage,v=m.byteLength,y=a.createBuffer();a.bindBuffer(p,y),a.bufferData(p,m,g),h.onUploadCallback();let M;if(m instanceof Float32Array)M=a.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=a.HALF_FLOAT:M=a.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=a.SHORT;else if(m instanceof Uint32Array)M=a.UNSIGNED_INT;else if(m instanceof Int32Array)M=a.INT;else if(m instanceof Int8Array)M=a.BYTE;else if(m instanceof Uint8Array)M=a.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:y,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:v}}function r(h,p,m){const g=p.array,v=p.updateRanges;if(a.bindBuffer(m,h),v.length===0)a.bufferSubData(m,0,g);else{v.sort((M,E)=>M.start-E.start);let y=0;for(let M=1;M<v.length;M++){const E=v[y],b=v[M];b.start<=E.start+E.count+1?E.count=Math.max(E.count,b.start+b.count-E.start):(++y,v[y]=b)}v.length=y+1;for(let M=0,E=v.length;M<E;M++){const b=v[M];a.bufferSubData(m,b.start*g.BYTES_PER_ELEMENT,g,b.start,b.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function u(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=t.get(h);p&&(a.deleteBuffer(p.buffer),t.delete(h))}function f(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=t.get(h);(!g||g.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=t.get(h);if(m===void 0)t.set(h,i(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,h,p),m.version=h.version}}return{get:l,remove:u,update:f}}var oR=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lR=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,uR=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cR=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fR=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hR=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dR=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pR=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mR=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gR=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vR=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_R=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yR=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xR=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,SR=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,MR=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ER=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bR=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,TR=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,AR=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,RR=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,CR=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wR=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,DR=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,UR=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,LR=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,NR=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,OR=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,PR=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zR=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FR="gl_FragColor = linearToOutputTexel( gl_FragColor );",IR=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,BR=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,HR=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,GR=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,VR=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kR=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,XR=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qR=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jR=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,WR=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,YR=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,QR=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ZR=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,KR=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,JR=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$R=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eC=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,iC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sC=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,oC=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uC=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cC=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fC=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hC=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dC=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pC=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gC=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vC=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_C=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yC=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xC=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,SC=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,MC=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,EC=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bC=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,TC=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,AC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CC=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wC=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,DC=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,UC=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,LC=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,NC=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OC=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PC=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,zC=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,FC=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,IC=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,BC=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,HC=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GC=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,VC=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kC=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,XC=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qC=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,jC=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WC=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,YC=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QC=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ZC=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,KC=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,JC=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$C=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ew=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,iw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ow=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_w=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ew=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Aw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ww=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Uw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ow=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Iw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,de={alphahash_fragment:oR,alphahash_pars_fragment:lR,alphamap_fragment:uR,alphamap_pars_fragment:cR,alphatest_fragment:fR,alphatest_pars_fragment:hR,aomap_fragment:dR,aomap_pars_fragment:pR,batching_pars_vertex:mR,batching_vertex:gR,begin_vertex:vR,beginnormal_vertex:_R,bsdfs:yR,iridescence_fragment:xR,bumpmap_pars_fragment:SR,clipping_planes_fragment:MR,clipping_planes_pars_fragment:ER,clipping_planes_pars_vertex:bR,clipping_planes_vertex:TR,color_fragment:AR,color_pars_fragment:RR,color_pars_vertex:CR,color_vertex:wR,common:DR,cube_uv_reflection_fragment:UR,defaultnormal_vertex:LR,displacementmap_pars_vertex:NR,displacementmap_vertex:OR,emissivemap_fragment:PR,emissivemap_pars_fragment:zR,colorspace_fragment:FR,colorspace_pars_fragment:IR,envmap_fragment:BR,envmap_common_pars_fragment:HR,envmap_pars_fragment:GR,envmap_pars_vertex:VR,envmap_physical_pars_fragment:$R,envmap_vertex:kR,fog_vertex:XR,fog_pars_vertex:qR,fog_fragment:jR,fog_pars_fragment:WR,gradientmap_pars_fragment:YR,lightmap_pars_fragment:QR,lights_lambert_fragment:ZR,lights_lambert_pars_fragment:KR,lights_pars_begin:JR,lights_toon_fragment:tC,lights_toon_pars_fragment:eC,lights_phong_fragment:nC,lights_phong_pars_fragment:iC,lights_physical_fragment:aC,lights_physical_pars_fragment:rC,lights_fragment_begin:sC,lights_fragment_maps:oC,lights_fragment_end:lC,logdepthbuf_fragment:uC,logdepthbuf_pars_fragment:cC,logdepthbuf_pars_vertex:fC,logdepthbuf_vertex:hC,map_fragment:dC,map_pars_fragment:pC,map_particle_fragment:mC,map_particle_pars_fragment:gC,metalnessmap_fragment:vC,metalnessmap_pars_fragment:_C,morphinstance_vertex:yC,morphcolor_vertex:xC,morphnormal_vertex:SC,morphtarget_pars_vertex:MC,morphtarget_vertex:EC,normal_fragment_begin:bC,normal_fragment_maps:TC,normal_pars_fragment:AC,normal_pars_vertex:RC,normal_vertex:CC,normalmap_pars_fragment:wC,clearcoat_normal_fragment_begin:DC,clearcoat_normal_fragment_maps:UC,clearcoat_pars_fragment:LC,iridescence_pars_fragment:NC,opaque_fragment:OC,packing:PC,premultiplied_alpha_fragment:zC,project_vertex:FC,dithering_fragment:IC,dithering_pars_fragment:BC,roughnessmap_fragment:HC,roughnessmap_pars_fragment:GC,shadowmap_pars_fragment:VC,shadowmap_pars_vertex:kC,shadowmap_vertex:XC,shadowmask_pars_fragment:qC,skinbase_vertex:jC,skinning_pars_vertex:WC,skinning_vertex:YC,skinnormal_vertex:QC,specularmap_fragment:ZC,specularmap_pars_fragment:KC,tonemapping_fragment:JC,tonemapping_pars_fragment:$C,transmission_fragment:tw,transmission_pars_fragment:ew,uv_pars_fragment:nw,uv_pars_vertex:iw,uv_vertex:aw,worldpos_vertex:rw,background_vert:sw,background_frag:ow,backgroundCube_vert:lw,backgroundCube_frag:uw,cube_vert:cw,cube_frag:fw,depth_vert:hw,depth_frag:dw,distanceRGBA_vert:pw,distanceRGBA_frag:mw,equirect_vert:gw,equirect_frag:vw,linedashed_vert:_w,linedashed_frag:yw,meshbasic_vert:xw,meshbasic_frag:Sw,meshlambert_vert:Mw,meshlambert_frag:Ew,meshmatcap_vert:bw,meshmatcap_frag:Tw,meshnormal_vert:Aw,meshnormal_frag:Rw,meshphong_vert:Cw,meshphong_frag:ww,meshphysical_vert:Dw,meshphysical_frag:Uw,meshtoon_vert:Lw,meshtoon_frag:Nw,points_vert:Ow,points_frag:Pw,shadow_vert:zw,shadow_frag:Fw,sprite_vert:Iw,sprite_frag:Bw},Ot={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},ta={basic:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Ce(0)}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:kn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:kn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new Ce(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:kn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:kn([Ot.points,Ot.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:kn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:kn([Ot.common,Ot.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:kn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:kn([Ot.sprite,Ot.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distanceRGBA:{uniforms:kn([Ot.common,Ot.displacementmap,{referencePosition:{value:new lt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distanceRGBA_vert,fragmentShader:de.distanceRGBA_frag},shadow:{uniforms:kn([Ot.lights,Ot.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};ta.physical={uniforms:kn([ta.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const Jc={r:0,b:0,g:0},as=new Va,Hw=new cn;function Gw(a,t,i,r,l,u,f){const h=new Ce(0);let p=u===!0?0:1,m,g,v=null,y=0,M=null;function E(D){let R=D.isScene===!0?D.background:null;return R&&R.isTexture&&(R=(D.backgroundBlurriness>0?i:t).get(R)),R}function b(D){let R=!1;const V=E(D);V===null?_(h,p):V&&V.isColor&&(_(V,1),R=!0);const z=a.xr.getEnvironmentBlendMode();z==="additive"?r.buffers.color.setClear(0,0,0,1,f):z==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(a.autoClear||R)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function x(D,R){const V=E(R);V&&(V.isCubeTexture||V.mapping===Af)?(g===void 0&&(g=new Gi(new Jo(1,1,1),new Nr({name:"BackgroundCubeMaterial",uniforms:jo(ta.backgroundCube.uniforms),vertexShader:ta.backgroundCube.vertexShader,fragmentShader:ta.backgroundCube.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(z,N,X){this.matrixWorld.copyPosition(X.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),as.copy(R.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,V.isCubeTexture&&V.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),g.material.uniforms.envMap.value=V,g.material.uniforms.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(Hw.makeRotationFromEuler(as)),g.material.toneMapped=Ne.getTransfer(V.colorSpace)!==Xe,(v!==V||y!==V.version||M!==a.toneMapping)&&(g.material.needsUpdate=!0,v=V,y=V.version,M=a.toneMapping),g.layers.enableAll(),D.unshift(g,g.geometry,g.material,0,0,null)):V&&V.isTexture&&(m===void 0&&(m=new Gi(new wf(2,2),new Nr({name:"BackgroundMaterial",uniforms:jo(ta.background.uniforms),vertexShader:ta.background.vertexShader,fragmentShader:ta.background.fragmentShader,side:Lr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=V,m.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,m.material.toneMapped=Ne.getTransfer(V.colorSpace)!==Xe,V.matrixAutoUpdate===!0&&V.updateMatrix(),m.material.uniforms.uvTransform.value.copy(V.matrix),(v!==V||y!==V.version||M!==a.toneMapping)&&(m.material.needsUpdate=!0,v=V,y=V.version,M=a.toneMapping),m.layers.enableAll(),D.unshift(m,m.geometry,m.material,0,0,null))}function _(D,R){D.getRGB(Jc,DS(a)),r.buffers.color.setClear(Jc.r,Jc.g,Jc.b,R,f)}function L(){g!==void 0&&(g.geometry.dispose(),g.material.dispose()),m!==void 0&&(m.geometry.dispose(),m.material.dispose())}return{getClearColor:function(){return h},setClearColor:function(D,R=1){h.set(D),p=R,_(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(D){p=D,_(h,p)},render:b,addToRenderList:x,dispose:L}}function Vw(a,t){const i=a.getParameter(a.MAX_VERTEX_ATTRIBS),r={},l=y(null);let u=l,f=!1;function h(w,k,ut,ot,mt){let ht=!1;const I=v(ot,ut,k);u!==I&&(u=I,m(u.object)),ht=M(w,ot,ut,mt),ht&&E(w,ot,ut,mt),mt!==null&&t.update(mt,a.ELEMENT_ARRAY_BUFFER),(ht||f)&&(f=!1,R(w,k,ut,ot),mt!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,t.get(mt).buffer))}function p(){return a.createVertexArray()}function m(w){return a.bindVertexArray(w)}function g(w){return a.deleteVertexArray(w)}function v(w,k,ut){const ot=ut.wireframe===!0;let mt=r[w.id];mt===void 0&&(mt={},r[w.id]=mt);let ht=mt[k.id];ht===void 0&&(ht={},mt[k.id]=ht);let I=ht[ot];return I===void 0&&(I=y(p()),ht[ot]=I),I}function y(w){const k=[],ut=[],ot=[];for(let mt=0;mt<i;mt++)k[mt]=0,ut[mt]=0,ot[mt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:ut,attributeDivisors:ot,object:w,attributes:{},index:null}}function M(w,k,ut,ot){const mt=u.attributes,ht=k.attributes;let I=0;const B=ut.getAttributes();for(const W in B)if(B[W].location>=0){const Rt=mt[W];let P=ht[W];if(P===void 0&&(W==="instanceMatrix"&&w.instanceMatrix&&(P=w.instanceMatrix),W==="instanceColor"&&w.instanceColor&&(P=w.instanceColor)),Rt===void 0||Rt.attribute!==P||P&&Rt.data!==P.data)return!0;I++}return u.attributesNum!==I||u.index!==ot}function E(w,k,ut,ot){const mt={},ht=k.attributes;let I=0;const B=ut.getAttributes();for(const W in B)if(B[W].location>=0){let Rt=ht[W];Rt===void 0&&(W==="instanceMatrix"&&w.instanceMatrix&&(Rt=w.instanceMatrix),W==="instanceColor"&&w.instanceColor&&(Rt=w.instanceColor));const P={};P.attribute=Rt,Rt&&Rt.data&&(P.data=Rt.data),mt[W]=P,I++}u.attributes=mt,u.attributesNum=I,u.index=ot}function b(){const w=u.newAttributes;for(let k=0,ut=w.length;k<ut;k++)w[k]=0}function x(w){_(w,0)}function _(w,k){const ut=u.newAttributes,ot=u.enabledAttributes,mt=u.attributeDivisors;ut[w]=1,ot[w]===0&&(a.enableVertexAttribArray(w),ot[w]=1),mt[w]!==k&&(a.vertexAttribDivisor(w,k),mt[w]=k)}function L(){const w=u.newAttributes,k=u.enabledAttributes;for(let ut=0,ot=k.length;ut<ot;ut++)k[ut]!==w[ut]&&(a.disableVertexAttribArray(ut),k[ut]=0)}function D(w,k,ut,ot,mt,ht,I){I===!0?a.vertexAttribIPointer(w,k,ut,mt,ht):a.vertexAttribPointer(w,k,ut,ot,mt,ht)}function R(w,k,ut,ot){b();const mt=ot.attributes,ht=ut.getAttributes(),I=k.defaultAttributeValues;for(const B in ht){const W=ht[B];if(W.location>=0){let bt=mt[B];if(bt===void 0&&(B==="instanceMatrix"&&w.instanceMatrix&&(bt=w.instanceMatrix),B==="instanceColor"&&w.instanceColor&&(bt=w.instanceColor)),bt!==void 0){const Rt=bt.normalized,P=bt.itemSize,at=t.get(bt);if(at===void 0)continue;const Et=at.buffer,J=at.type,dt=at.bytesPerElement,At=J===a.INT||J===a.UNSIGNED_INT||bt.gpuType===Ym;if(bt.isInterleavedBufferAttribute){const Mt=bt.data,Xt=Mt.stride,Vt=bt.offset;if(Mt.isInstancedInterleavedBuffer){for(let se=0;se<W.locationSize;se++)_(W.location+se,Mt.meshPerAttribute);w.isInstancedMesh!==!0&&ot._maxInstanceCount===void 0&&(ot._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let se=0;se<W.locationSize;se++)x(W.location+se);a.bindBuffer(a.ARRAY_BUFFER,Et);for(let se=0;se<W.locationSize;se++)D(W.location+se,P/W.locationSize,J,Rt,Xt*dt,(Vt+P/W.locationSize*se)*dt,At)}else{if(bt.isInstancedBufferAttribute){for(let Mt=0;Mt<W.locationSize;Mt++)_(W.location+Mt,bt.meshPerAttribute);w.isInstancedMesh!==!0&&ot._maxInstanceCount===void 0&&(ot._maxInstanceCount=bt.meshPerAttribute*bt.count)}else for(let Mt=0;Mt<W.locationSize;Mt++)x(W.location+Mt);a.bindBuffer(a.ARRAY_BUFFER,Et);for(let Mt=0;Mt<W.locationSize;Mt++)D(W.location+Mt,P/W.locationSize,J,Rt,P*dt,P/W.locationSize*Mt*dt,At)}}else if(I!==void 0){const Rt=I[B];if(Rt!==void 0)switch(Rt.length){case 2:a.vertexAttrib2fv(W.location,Rt);break;case 3:a.vertexAttrib3fv(W.location,Rt);break;case 4:a.vertexAttrib4fv(W.location,Rt);break;default:a.vertexAttrib1fv(W.location,Rt)}}}}L()}function V(){X();for(const w in r){const k=r[w];for(const ut in k){const ot=k[ut];for(const mt in ot)g(ot[mt].object),delete ot[mt];delete k[ut]}delete r[w]}}function z(w){if(r[w.id]===void 0)return;const k=r[w.id];for(const ut in k){const ot=k[ut];for(const mt in ot)g(ot[mt].object),delete ot[mt];delete k[ut]}delete r[w.id]}function N(w){for(const k in r){const ut=r[k];if(ut[w.id]===void 0)continue;const ot=ut[w.id];for(const mt in ot)g(ot[mt].object),delete ot[mt];delete ut[w.id]}}function X(){U(),f=!0,u!==l&&(u=l,m(u.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:X,resetDefaultState:U,dispose:V,releaseStatesOfGeometry:z,releaseStatesOfProgram:N,initAttributes:b,enableAttribute:x,disableUnusedAttributes:L}}function kw(a,t,i){let r;function l(m){r=m}function u(m,g){a.drawArrays(r,m,g),i.update(g,r,1)}function f(m,g,v){v!==0&&(a.drawArraysInstanced(r,m,g,v),i.update(g,r,v))}function h(m,g,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,g,0,v);let M=0;for(let E=0;E<v;E++)M+=g[E];i.update(M,r,1)}function p(m,g,v,y){if(v===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<m.length;E++)f(m[E],g[E],y[E]);else{M.multiDrawArraysInstancedWEBGL(r,m,0,g,0,y,0,v);let E=0;for(let b=0;b<v;b++)E+=g[b]*y[b];i.update(E,r,1)}}this.setMode=l,this.render=u,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function Xw(a,t,i,r){let l;function u(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const N=t.get("EXT_texture_filter_anisotropic");l=a.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(N){return!(N!==Hi&&r.convert(N)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(N){const X=N===pu&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(N!==Ga&&r.convert(N)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==za&&!X)}function p(N){if(N==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const g=p(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const v=i.logarithmicDepthBuffer===!0,y=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),E=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=a.getParameter(a.MAX_TEXTURE_SIZE),x=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),_=a.getParameter(a.MAX_VERTEX_ATTRIBS),L=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),D=a.getParameter(a.MAX_VARYING_VECTORS),R=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),V=E>0,z=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:v,reverseDepthBuffer:y,maxTextures:M,maxVertexTextures:E,maxTextureSize:b,maxCubemapSize:x,maxAttributes:_,maxVertexUniforms:L,maxVaryings:D,maxFragmentUniforms:R,vertexTextures:V,maxSamples:z}}function qw(a){const t=this;let i=null,r=0,l=!1,u=!1;const f=new ss,h=new he,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(v,y){const M=v.length!==0||y||r!==0||l;return l=y,r=v.length,M},this.beginShadows=function(){u=!0,g(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(v,y){i=g(v,y,0)},this.setState=function(v,y,M){const E=v.clippingPlanes,b=v.clipIntersection,x=v.clipShadows,_=a.get(v);if(!l||E===null||E.length===0||u&&!x)u?g(null):m();else{const L=u?0:r,D=L*4;let R=_.clippingState||null;p.value=R,R=g(E,y,D,M);for(let V=0;V!==D;++V)R[V]=i[V];_.clippingState=R,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=L}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function g(v,y,M,E){const b=v!==null?v.length:0;let x=null;if(b!==0){if(x=p.value,E!==!0||x===null){const _=M+b*4,L=y.matrixWorldInverse;h.getNormalMatrix(L),(x===null||x.length<_)&&(x=new Float32Array(_));for(let D=0,R=M;D!==b;++D,R+=4)f.copy(v[D]).applyMatrix4(L,h),f.normal.toArray(x,R),x[R+3]=f.constant}p.value=x,p.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,x}}function jw(a){let t=new WeakMap;function i(f,h){return h===Jp?f.mapping=Go:h===$p&&(f.mapping=Vo),f}function r(f){if(f&&f.isTexture){const h=f.mapping;if(h===Jp||h===$p)if(t.has(f)){const p=t.get(f).texture;return i(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new Q1(p.height);return m.fromEquirectangularTexture(a,f),t.set(f,m),f.addEventListener("dispose",l),i(m.texture,f.mapping)}else return null}}return f}function l(f){const h=f.target;h.removeEventListener("dispose",l);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function u(){t=new WeakMap}return{get:r,dispose:u}}const Mo=4,ky=[.125,.215,.35,.446,.526,.582],us=20,_p=new eR,Xy=new Ce;let yp=null,xp=0,Sp=0,Mp=!1;const os=(1+Math.sqrt(5))/2,xo=1/os,qy=[new lt(-os,xo,0),new lt(os,xo,0),new lt(-xo,0,os),new lt(xo,0,os),new lt(0,os,-xo),new lt(0,os,xo),new lt(-1,1,-1),new lt(1,1,-1),new lt(-1,1,1),new lt(1,1,1)];class jy{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,r=.1,l=100){yp=this._renderer.getRenderTarget(),xp=this._renderer.getActiveCubeFace(),Sp=this._renderer.getActiveMipmapLevel(),Mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(t,r,l,u),i>0&&this._blur(u,0,0,i),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qy(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yy(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(yp,xp,Sp),this._renderer.xr.enabled=Mp,t.scissorTest=!1,$c(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Go||t.mapping===Vo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yp=this._renderer.getRenderTarget(),xp=this._renderer.getActiveCubeFace(),Sp=this._renderer.getActiveMipmapLevel(),Mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(t,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:ea,minFilter:ea,generateMipmaps:!1,type:pu,format:Hi,colorSpace:qo,depthBuffer:!1},l=Wy(t,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wy(t,i,r);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ww(u)),this._blurMaterial=Yw(u,t,i)}return l}_compileMaterial(t){const i=new Gi(this._lodPlanes[0],t);this._renderer.compile(i,_p)}_sceneToCubeUV(t,i,r,l){const h=new Ri(90,1,i,r),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,v=g.autoClear,y=g.toneMapping;g.getClearColor(Xy),g.toneMapping=Ur,g.autoClear=!1;const M=new yf({name:"PMREM.Background",side:ei,depthWrite:!1,depthTest:!1}),E=new Gi(new Jo,M);let b=!1;const x=t.background;x?x.isColor&&(M.color.copy(x),t.background=null,b=!0):(M.color.copy(Xy),b=!0);for(let _=0;_<6;_++){const L=_%3;L===0?(h.up.set(0,p[_],0),h.lookAt(m[_],0,0)):L===1?(h.up.set(0,0,p[_]),h.lookAt(0,m[_],0)):(h.up.set(0,p[_],0),h.lookAt(0,0,m[_]));const D=this._cubeSize;$c(l,L*D,_>2?D:0,D,D),g.setRenderTarget(l),b&&g.render(E,h),g.render(t,h)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=y,g.autoClear=v,t.background=x}_textureToCubeUV(t,i){const r=this._renderer,l=t.mapping===Go||t.mapping===Vo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qy()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yy());const u=l?this._cubemapMaterial:this._equirectMaterial,f=new Gi(this._lodPlanes[0],u),h=u.uniforms;h.envMap.value=t;const p=this._cubeSize;$c(i,0,0,3*p,2*p),r.setRenderTarget(i),r.render(f,_p)}_applyPMREM(t){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let u=1;u<l;u++){const f=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),h=qy[(l-u-1)%qy.length];this._blur(t,u-1,u,f,h)}i.autoClear=r}_blur(t,i,r,l,u){const f=this._pingPongRenderTarget;this._halfBlur(t,f,i,r,l,"latitudinal",u),this._halfBlur(f,t,r,r,l,"longitudinal",u)}_halfBlur(t,i,r,l,u,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,v=new Gi(this._lodPlanes[l],m),y=m.uniforms,M=this._sizeLods[r]-1,E=isFinite(u)?Math.PI/(2*M):2*Math.PI/(2*us-1),b=u/E,x=isFinite(u)?1+Math.floor(g*b):us;x>us&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${us}`);const _=[];let L=0;for(let N=0;N<us;++N){const X=N/b,U=Math.exp(-X*X/2);_.push(U),N===0?L+=U:N<x&&(L+=2*U)}for(let N=0;N<_.length;N++)_[N]=_[N]/L;y.envMap.value=t.texture,y.samples.value=x,y.weights.value=_,y.latitudinal.value=f==="latitudinal",h&&(y.poleAxis.value=h);const{_lodMax:D}=this;y.dTheta.value=E,y.mipInt.value=D-r;const R=this._sizeLods[l],V=3*R*(l>D-Mo?l-D+Mo:0),z=4*(this._cubeSize-R);$c(i,V,z,3*R,2*R),p.setRenderTarget(i),p.render(v,_p)}}function Ww(a){const t=[],i=[],r=[];let l=a;const u=a-Mo+1+ky.length;for(let f=0;f<u;f++){const h=Math.pow(2,l);i.push(h);let p=1/h;f>a-Mo?p=ky[f-a+Mo-1]:f===0&&(p=0),r.push(p);const m=1/(h-2),g=-m,v=1+m,y=[g,g,v,g,v,v,g,g,v,v,g,v],M=6,E=6,b=3,x=2,_=1,L=new Float32Array(b*E*M),D=new Float32Array(x*E*M),R=new Float32Array(_*E*M);for(let z=0;z<M;z++){const N=z%3*2/3-1,X=z>2?0:-1,U=[N,X,0,N+2/3,X,0,N+2/3,X+1,0,N,X,0,N+2/3,X+1,0,N,X+1,0];L.set(U,b*E*z),D.set(y,x*E*z);const w=[z,z,z,z,z,z];R.set(w,_*E*z)}const V=new wi;V.setAttribute("position",new na(L,b)),V.setAttribute("uv",new na(D,x)),V.setAttribute("faceIndex",new na(R,_)),t.push(V),l>Mo&&l--}return{lodPlanes:t,sizeLods:i,sigmas:r}}function Wy(a,t,i){const r=new Ts(a,t,i);return r.texture.mapping=Af,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function $c(a,t,i,r,l){a.viewport.set(t,i,r,l),a.scissor.set(t,i,r,l)}function Yw(a,t,i){const r=new Float32Array(us),l=new lt(0,1,0);return new Nr({name:"SphericalGaussianBlur",defines:{n:us,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:eg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function Yy(){return new Nr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function Qy(){return new Nr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function eg(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Qw(a){let t=new WeakMap,i=null;function r(h){if(h&&h.isTexture){const p=h.mapping,m=p===Jp||p===$p,g=p===Go||p===Vo;if(m||g){let v=t.get(h);const y=v!==void 0?v.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==y)return i===null&&(i=new jy(a)),v=m?i.fromEquirectangular(h,v):i.fromCubemap(h,v),v.texture.pmremVersion=h.pmremVersion,t.set(h,v),v.texture;if(v!==void 0)return v.texture;{const M=h.image;return m&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new jy(a)),v=m?i.fromEquirectangular(h):i.fromCubemap(h),v.texture.pmremVersion=h.pmremVersion,t.set(h,v),h.addEventListener("dispose",u),v.texture):null}}}return h}function l(h){let p=0;const m=6;for(let g=0;g<m;g++)h[g]!==void 0&&p++;return p===m}function u(h){const p=h.target;p.removeEventListener("dispose",u);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Zw(a){const t={};function i(r){if(t[r]!==void 0)return t[r];let l;switch(r){case"WEBGL_depth_texture":l=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=a.getExtension(r)}return t[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&So("THREE.WebGLRenderer: "+r+" extension not supported."),l}}}function Kw(a,t,i,r){const l={},u=new WeakMap;function f(v){const y=v.target;y.index!==null&&t.remove(y.index);for(const E in y.attributes)t.remove(y.attributes[E]);y.removeEventListener("dispose",f),delete l[y.id];const M=u.get(y);M&&(t.remove(M),u.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function h(v,y){return l[y.id]===!0||(y.addEventListener("dispose",f),l[y.id]=!0,i.memory.geometries++),y}function p(v){const y=v.attributes;for(const M in y)t.update(y[M],a.ARRAY_BUFFER)}function m(v){const y=[],M=v.index,E=v.attributes.position;let b=0;if(M!==null){const L=M.array;b=M.version;for(let D=0,R=L.length;D<R;D+=3){const V=L[D+0],z=L[D+1],N=L[D+2];y.push(V,z,z,N,N,V)}}else if(E!==void 0){const L=E.array;b=E.version;for(let D=0,R=L.length/3-1;D<R;D+=3){const V=D+0,z=D+1,N=D+2;y.push(V,z,z,N,N,V)}}else return;const x=new(MS(y)?wS:CS)(y,1);x.version=b;const _=u.get(v);_&&t.remove(_),u.set(v,x)}function g(v){const y=u.get(v);if(y){const M=v.index;M!==null&&y.version<M.version&&m(v)}else m(v);return u.get(v)}return{get:h,update:p,getWireframeAttribute:g}}function Jw(a,t,i){let r;function l(y){r=y}let u,f;function h(y){u=y.type,f=y.bytesPerElement}function p(y,M){a.drawElements(r,M,u,y*f),i.update(M,r,1)}function m(y,M,E){E!==0&&(a.drawElementsInstanced(r,M,u,y*f,E),i.update(M,r,E))}function g(y,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,u,y,0,E);let x=0;for(let _=0;_<E;_++)x+=M[_];i.update(x,r,1)}function v(y,M,E,b){if(E===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let _=0;_<y.length;_++)m(y[_]/f,M[_],b[_]);else{x.multiDrawElementsInstancedWEBGL(r,M,0,u,y,0,b,0,E);let _=0;for(let L=0;L<E;L++)_+=M[L]*b[L];i.update(_,r,1)}}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=v}function $w(a){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,f,h){switch(i.calls++,f){case a.TRIANGLES:i.triangles+=h*(u/3);break;case a.LINES:i.lines+=h*(u/2);break;case a.LINE_STRIP:i.lines+=h*(u-1);break;case a.LINE_LOOP:i.lines+=h*u;break;case a.POINTS:i.points+=h*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:r}}function t2(a,t,i){const r=new WeakMap,l=new un;function u(f,h,p){const m=f.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=g!==void 0?g.length:0;let y=r.get(h);if(y===void 0||y.count!==v){let w=function(){X.dispose(),r.delete(h),h.removeEventListener("dispose",w)};var M=w;y!==void 0&&y.texture.dispose();const E=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,_=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],D=h.morphAttributes.color||[];let R=0;E===!0&&(R=1),b===!0&&(R=2),x===!0&&(R=3);let V=h.attributes.position.count*R,z=1;V>t.maxTextureSize&&(z=Math.ceil(V/t.maxTextureSize),V=t.maxTextureSize);const N=new Float32Array(V*z*4*v),X=new bS(N,V,z,v);X.type=za,X.needsUpdate=!0;const U=R*4;for(let k=0;k<v;k++){const ut=_[k],ot=L[k],mt=D[k],ht=V*z*4*k;for(let I=0;I<ut.count;I++){const B=I*U;E===!0&&(l.fromBufferAttribute(ut,I),N[ht+B+0]=l.x,N[ht+B+1]=l.y,N[ht+B+2]=l.z,N[ht+B+3]=0),b===!0&&(l.fromBufferAttribute(ot,I),N[ht+B+4]=l.x,N[ht+B+5]=l.y,N[ht+B+6]=l.z,N[ht+B+7]=0),x===!0&&(l.fromBufferAttribute(mt,I),N[ht+B+8]=l.x,N[ht+B+9]=l.y,N[ht+B+10]=l.z,N[ht+B+11]=mt.itemSize===4?l.w:1)}}y={count:v,texture:X,size:new We(V,z)},r.set(h,y),h.addEventListener("dispose",w)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(a,"morphTexture",f.morphTexture,i);else{let E=0;for(let x=0;x<m.length;x++)E+=m[x];const b=h.morphTargetsRelative?1:1-E;p.getUniforms().setValue(a,"morphTargetBaseInfluence",b),p.getUniforms().setValue(a,"morphTargetInfluences",m)}p.getUniforms().setValue(a,"morphTargetsTexture",y.texture,i),p.getUniforms().setValue(a,"morphTargetsTextureSize",y.size)}return{update:u}}function e2(a,t,i,r){let l=new WeakMap;function u(p){const m=r.render.frame,g=p.geometry,v=t.get(p,g);if(l.get(v)!==m&&(t.update(v),l.set(v,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),l.get(p)!==m&&(i.update(p.instanceMatrix,a.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,a.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const y=p.skeleton;l.get(y)!==m&&(y.update(),l.set(y,m))}return v}function f(){l=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:u,dispose:f}}const IS=new ni,Zy=new zS(1,1),BS=new bS,HS=new N1,GS=new LS,Ky=[],Jy=[],$y=new Float32Array(16),tx=new Float32Array(9),ex=new Float32Array(4);function $o(a,t,i){const r=a[0];if(r<=0||r>0)return a;const l=t*i;let u=Ky[l];if(u===void 0&&(u=new Float32Array(l),Ky[l]=u),t!==0){r.toArray(u,0);for(let f=1,h=0;f!==t;++f)h+=i,a[f].toArray(u,h)}return u}function Sn(a,t){if(a.length!==t.length)return!1;for(let i=0,r=a.length;i<r;i++)if(a[i]!==t[i])return!1;return!0}function Mn(a,t){for(let i=0,r=t.length;i<r;i++)a[i]=t[i]}function Df(a,t){let i=Jy[t];i===void 0&&(i=new Int32Array(t),Jy[t]=i);for(let r=0;r!==t;++r)i[r]=a.allocateTextureUnit();return i}function n2(a,t){const i=this.cache;i[0]!==t&&(a.uniform1f(this.addr,t),i[0]=t)}function i2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(a.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;a.uniform2fv(this.addr,t),Mn(i,t)}}function a2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(a.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(a.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Sn(i,t))return;a.uniform3fv(this.addr,t),Mn(i,t)}}function r2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(a.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;a.uniform4fv(this.addr,t),Mn(i,t)}}function s2(a,t){const i=this.cache,r=t.elements;if(r===void 0){if(Sn(i,t))return;a.uniformMatrix2fv(this.addr,!1,t),Mn(i,t)}else{if(Sn(i,r))return;ex.set(r),a.uniformMatrix2fv(this.addr,!1,ex),Mn(i,r)}}function o2(a,t){const i=this.cache,r=t.elements;if(r===void 0){if(Sn(i,t))return;a.uniformMatrix3fv(this.addr,!1,t),Mn(i,t)}else{if(Sn(i,r))return;tx.set(r),a.uniformMatrix3fv(this.addr,!1,tx),Mn(i,r)}}function l2(a,t){const i=this.cache,r=t.elements;if(r===void 0){if(Sn(i,t))return;a.uniformMatrix4fv(this.addr,!1,t),Mn(i,t)}else{if(Sn(i,r))return;$y.set(r),a.uniformMatrix4fv(this.addr,!1,$y),Mn(i,r)}}function u2(a,t){const i=this.cache;i[0]!==t&&(a.uniform1i(this.addr,t),i[0]=t)}function c2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(a.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;a.uniform2iv(this.addr,t),Mn(i,t)}}function f2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(a.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Sn(i,t))return;a.uniform3iv(this.addr,t),Mn(i,t)}}function h2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(a.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;a.uniform4iv(this.addr,t),Mn(i,t)}}function d2(a,t){const i=this.cache;i[0]!==t&&(a.uniform1ui(this.addr,t),i[0]=t)}function p2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(a.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;a.uniform2uiv(this.addr,t),Mn(i,t)}}function m2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(a.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Sn(i,t))return;a.uniform3uiv(this.addr,t),Mn(i,t)}}function g2(a,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(a.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;a.uniform4uiv(this.addr,t),Mn(i,t)}}function v2(a,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(a.uniform1i(this.addr,l),r[0]=l);let u;this.type===a.SAMPLER_2D_SHADOW?(Zy.compareFunction=SS,u=Zy):u=IS,i.setTexture2D(t||u,l)}function _2(a,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(a.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(t||HS,l)}function y2(a,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(a.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(t||GS,l)}function x2(a,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(a.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(t||BS,l)}function S2(a){switch(a){case 5126:return n2;case 35664:return i2;case 35665:return a2;case 35666:return r2;case 35674:return s2;case 35675:return o2;case 35676:return l2;case 5124:case 35670:return u2;case 35667:case 35671:return c2;case 35668:case 35672:return f2;case 35669:case 35673:return h2;case 5125:return d2;case 36294:return p2;case 36295:return m2;case 36296:return g2;case 35678:case 36198:case 36298:case 36306:case 35682:return v2;case 35679:case 36299:case 36307:return _2;case 35680:case 36300:case 36308:case 36293:return y2;case 36289:case 36303:case 36311:case 36292:return x2}}function M2(a,t){a.uniform1fv(this.addr,t)}function E2(a,t){const i=$o(t,this.size,2);a.uniform2fv(this.addr,i)}function b2(a,t){const i=$o(t,this.size,3);a.uniform3fv(this.addr,i)}function T2(a,t){const i=$o(t,this.size,4);a.uniform4fv(this.addr,i)}function A2(a,t){const i=$o(t,this.size,4);a.uniformMatrix2fv(this.addr,!1,i)}function R2(a,t){const i=$o(t,this.size,9);a.uniformMatrix3fv(this.addr,!1,i)}function C2(a,t){const i=$o(t,this.size,16);a.uniformMatrix4fv(this.addr,!1,i)}function w2(a,t){a.uniform1iv(this.addr,t)}function D2(a,t){a.uniform2iv(this.addr,t)}function U2(a,t){a.uniform3iv(this.addr,t)}function L2(a,t){a.uniform4iv(this.addr,t)}function N2(a,t){a.uniform1uiv(this.addr,t)}function O2(a,t){a.uniform2uiv(this.addr,t)}function P2(a,t){a.uniform3uiv(this.addr,t)}function z2(a,t){a.uniform4uiv(this.addr,t)}function F2(a,t,i){const r=this.cache,l=t.length,u=Df(i,l);Sn(r,u)||(a.uniform1iv(this.addr,u),Mn(r,u));for(let f=0;f!==l;++f)i.setTexture2D(t[f]||IS,u[f])}function I2(a,t,i){const r=this.cache,l=t.length,u=Df(i,l);Sn(r,u)||(a.uniform1iv(this.addr,u),Mn(r,u));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||HS,u[f])}function B2(a,t,i){const r=this.cache,l=t.length,u=Df(i,l);Sn(r,u)||(a.uniform1iv(this.addr,u),Mn(r,u));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||GS,u[f])}function H2(a,t,i){const r=this.cache,l=t.length,u=Df(i,l);Sn(r,u)||(a.uniform1iv(this.addr,u),Mn(r,u));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||BS,u[f])}function G2(a){switch(a){case 5126:return M2;case 35664:return E2;case 35665:return b2;case 35666:return T2;case 35674:return A2;case 35675:return R2;case 35676:return C2;case 5124:case 35670:return w2;case 35667:case 35671:return D2;case 35668:case 35672:return U2;case 35669:case 35673:return L2;case 5125:return N2;case 36294:return O2;case 36295:return P2;case 36296:return z2;case 35678:case 36198:case 36298:case 36306:case 35682:return F2;case 35679:case 36299:case 36307:return I2;case 35680:case 36300:case 36308:case 36293:return B2;case 36289:case 36303:case 36311:case 36292:return H2}}class V2{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.setValue=S2(i.type)}}class k2{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=G2(i.type)}}class X2{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,r){const l=this.seq;for(let u=0,f=l.length;u!==f;++u){const h=l[u];h.setValue(t,i[h.id],r)}}}const Ep=/(\w+)(\])?(\[|\.)?/g;function nx(a,t){a.seq.push(t),a.map[t.id]=t}function q2(a,t,i){const r=a.name,l=r.length;for(Ep.lastIndex=0;;){const u=Ep.exec(r),f=Ep.lastIndex;let h=u[1];const p=u[2]==="]",m=u[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===l){nx(i,m===void 0?new V2(h,a,t):new k2(h,a,t));break}else{let v=i.map[h];v===void 0&&(v=new X2(h),nx(i,v)),i=v}}}class ff{constructor(t,i){this.seq=[],this.map={};const r=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const u=t.getActiveUniform(i,l),f=t.getUniformLocation(i,u.name);q2(u,f,this)}}setValue(t,i,r,l){const u=this.map[i];u!==void 0&&u.setValue(t,r,l)}setOptional(t,i,r){const l=i[r];l!==void 0&&this.setValue(t,r,l)}static upload(t,i,r,l){for(let u=0,f=i.length;u!==f;++u){const h=i[u],p=r[h.id];p.needsUpdate!==!1&&h.setValue(t,p.value,l)}}static seqWithValue(t,i){const r=[];for(let l=0,u=t.length;l!==u;++l){const f=t[l];f.id in i&&r.push(f)}return r}}function ix(a,t,i){const r=a.createShader(t);return a.shaderSource(r,i),a.compileShader(r),r}const j2=37297;let W2=0;function Y2(a,t){const i=a.split(`
`),r=[],l=Math.max(t-6,0),u=Math.min(t+6,i.length);for(let f=l;f<u;f++){const h=f+1;r.push(`${h===t?">":" "} ${h}: ${i[f]}`)}return r.join(`
`)}const ax=new he;function Q2(a){Ne._getMatrix(ax,Ne.workingColorSpace,a);const t=`mat3( ${ax.elements.map(i=>i.toFixed(4))} )`;switch(Ne.getTransfer(a)){case gf:return[t,"LinearTransferOETF"];case Xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",a),[t,"LinearTransferOETF"]}}function rx(a,t,i){const r=a.getShaderParameter(t,a.COMPILE_STATUS),l=a.getShaderInfoLog(t).trim();if(r&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const f=parseInt(u[1]);return i.toUpperCase()+`

`+l+`

`+Y2(a.getShaderSource(t),f)}else return l}function Z2(a,t){const i=Q2(t);return[`vec4 ${a}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function K2(a,t){let i;switch(t){case a1:i="Linear";break;case r1:i="Reinhard";break;case s1:i="Cineon";break;case o1:i="ACESFilmic";break;case u1:i="AgX";break;case c1:i="Neutral";break;case l1:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+a+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const tf=new lt;function J2(){Ne.getLuminanceCoefficients(tf);const a=tf.x.toFixed(4),t=tf.y.toFixed(4),i=tf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $2(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(iu).join(`
`)}function tD(a){const t=[];for(const i in a){const r=a[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function eD(a,t){const i={},r=a.getProgramParameter(t,a.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const u=a.getActiveAttrib(t,l),f=u.name;let h=1;u.type===a.FLOAT_MAT2&&(h=2),u.type===a.FLOAT_MAT3&&(h=3),u.type===a.FLOAT_MAT4&&(h=4),i[f]={type:u.type,location:a.getAttribLocation(t,f),locationSize:h}}return i}function iu(a){return a!==""}function sx(a,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ox(a,t){return a.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const nD=/^[ \t]*#include +<([\w\d./]+)>/gm;function wm(a){return a.replace(nD,aD)}const iD=new Map;function aD(a,t){let i=de[t];if(i===void 0){const r=iD.get(t);if(r!==void 0)i=de[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("Can not resolve #include <"+t+">")}return wm(i)}const rD=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lx(a){return a.replace(rD,sD)}function sD(a,t,i,r){let l="";for(let u=parseInt(t);u<parseInt(i);u++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function ux(a){let t=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?t+=`
#define HIGH_PRECISION`:a.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function oD(a){let t="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===lS?t="SHADOWMAP_TYPE_PCF":a.shadowMapType===FA?t="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===Da&&(t="SHADOWMAP_TYPE_VSM"),t}function lD(a){let t="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Go:case Vo:t="ENVMAP_TYPE_CUBE";break;case Af:t="ENVMAP_TYPE_CUBE_UV";break}return t}function uD(a){let t="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case Vo:t="ENVMAP_MODE_REFRACTION";break}return t}function cD(a){let t="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case uS:t="ENVMAP_BLENDING_MULTIPLY";break;case n1:t="ENVMAP_BLENDING_MIX";break;case i1:t="ENVMAP_BLENDING_ADD";break}return t}function fD(a){const t=a.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function hD(a,t,i,r){const l=a.getContext(),u=i.defines;let f=i.vertexShader,h=i.fragmentShader;const p=oD(i),m=lD(i),g=uD(i),v=cD(i),y=fD(i),M=$2(i),E=tD(u),b=l.createProgram();let x,_,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(iu).join(`
`),x.length>0&&(x+=`
`),_=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(iu).join(`
`),_.length>0&&(_+=`
`)):(x=[ux(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(iu).join(`
`),_=[ux(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+g:"",i.envMap?"#define "+v:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ur?"#define TONE_MAPPING":"",i.toneMapping!==Ur?de.tonemapping_pars_fragment:"",i.toneMapping!==Ur?K2("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,Z2("linearToOutputTexel",i.outputColorSpace),J2(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(iu).join(`
`)),f=wm(f),f=sx(f,i),f=ox(f,i),h=wm(h),h=sx(h,i),h=ox(h,i),f=lx(f),h=lx(h),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,_=["#define varying in",i.glslVersion===xy?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===xy?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const D=L+x+f,R=L+_+h,V=ix(l,l.VERTEX_SHADER,D),z=ix(l,l.FRAGMENT_SHADER,R);l.attachShader(b,V),l.attachShader(b,z),i.index0AttributeName!==void 0?l.bindAttribLocation(b,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(b,0,"position"),l.linkProgram(b);function N(k){if(a.debug.checkShaderErrors){const ut=l.getProgramInfoLog(b).trim(),ot=l.getShaderInfoLog(V).trim(),mt=l.getShaderInfoLog(z).trim();let ht=!0,I=!0;if(l.getProgramParameter(b,l.LINK_STATUS)===!1)if(ht=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(l,b,V,z);else{const B=rx(l,V,"vertex"),W=rx(l,z,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(b,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+ut+`
`+B+`
`+W)}else ut!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ut):(ot===""||mt==="")&&(I=!1);I&&(k.diagnostics={runnable:ht,programLog:ut,vertexShader:{log:ot,prefix:x},fragmentShader:{log:mt,prefix:_}})}l.deleteShader(V),l.deleteShader(z),X=new ff(l,b),U=eD(l,b)}let X;this.getUniforms=function(){return X===void 0&&N(this),X};let U;this.getAttributes=function(){return U===void 0&&N(this),U};let w=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=l.getProgramParameter(b,j2)),w},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(b),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=W2++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=V,this.fragmentShader=z,this}let dD=0;class pD{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,r=t.fragmentShader,l=this._getShaderStage(i),u=this._getShaderStage(r),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(u)===!1&&(f.add(u),u.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let r=i.get(t);return r===void 0&&(r=new Set,i.set(t,r)),r}_getShaderStage(t){const i=this.shaderCache;let r=i.get(t);return r===void 0&&(r=new mD(t),i.set(t,r)),r}}class mD{constructor(t){this.id=dD++,this.code=t,this.usedTimes=0}}function gD(a,t,i,r,l,u,f){const h=new AS,p=new pD,m=new Set,g=[],v=l.logarithmicDepthBuffer,y=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(U){return m.add(U),U===0?"uv":`uv${U}`}function x(U,w,k,ut,ot){const mt=ut.fog,ht=ot.geometry,I=U.isMeshStandardMaterial?ut.environment:null,B=(U.isMeshStandardMaterial?i:t).get(U.envMap||I),W=B&&B.mapping===Af?B.image.height:null,bt=E[U.type];U.precision!==null&&(M=l.getMaxPrecision(U.precision),M!==U.precision&&console.warn("THREE.WebGLProgram.getParameters:",U.precision,"not supported, using",M,"instead."));const Rt=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,P=Rt!==void 0?Rt.length:0;let at=0;ht.morphAttributes.position!==void 0&&(at=1),ht.morphAttributes.normal!==void 0&&(at=2),ht.morphAttributes.color!==void 0&&(at=3);let Et,J,dt,At;if(bt){const Re=ta[bt];Et=Re.vertexShader,J=Re.fragmentShader}else Et=U.vertexShader,J=U.fragmentShader,p.update(U),dt=p.getVertexShaderID(U),At=p.getFragmentShaderID(U);const Mt=a.getRenderTarget(),Xt=a.state.buffers.depth.getReversed(),Vt=ot.isInstancedMesh===!0,se=ot.isBatchedMesh===!0,Be=!!U.map,me=!!U.matcap,Ke=!!B,q=!!U.aoMap,Nn=!!U.lightMap,pe=!!U.bumpMap,ye=!!U.normalMap,Zt=!!U.displacementMap,ze=!!U.emissiveMap,Yt=!!U.metalnessMap,O=!!U.roughnessMap,A=U.anisotropy>0,it=U.clearcoat>0,gt=U.dispersion>0,Tt=U.iridescence>0,_t=U.sheen>0,jt=U.transmission>0,Ut=A&&!!U.anisotropyMap,Bt=it&&!!U.clearcoatMap,xe=it&&!!U.clearcoatNormalMap,Ct=it&&!!U.clearcoatRoughnessMap,Ht=Tt&&!!U.iridescenceMap,Kt=Tt&&!!U.iridescenceThicknessMap,Wt=_t&&!!U.sheenColorMap,zt=_t&&!!U.sheenRoughnessMap,ne=!!U.specularMap,oe=!!U.specularColorMap,He=!!U.specularIntensityMap,Y=jt&&!!U.transmissionMap,wt=jt&&!!U.thicknessMap,ft=!!U.gradientMap,xt=!!U.alphaMap,Dt=U.alphaTest>0,Lt=!!U.alphaHash,ie=!!U.extensions;let Je=Ur;U.toneMapped&&(Mt===null||Mt.isXRRenderTarget===!0)&&(Je=a.toneMapping);const vn={shaderID:bt,shaderType:U.type,shaderName:U.name,vertexShader:Et,fragmentShader:J,defines:U.defines,customVertexShaderID:dt,customFragmentShaderID:At,isRawShaderMaterial:U.isRawShaderMaterial===!0,glslVersion:U.glslVersion,precision:M,batching:se,batchingColor:se&&ot._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&ot.instanceColor!==null,instancingMorph:Vt&&ot.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:Mt===null?a.outputColorSpace:Mt.isXRRenderTarget===!0?Mt.texture.colorSpace:qo,alphaToCoverage:!!U.alphaToCoverage,map:Be,matcap:me,envMap:Ke,envMapMode:Ke&&B.mapping,envMapCubeUVHeight:W,aoMap:q,lightMap:Nn,bumpMap:pe,normalMap:ye,displacementMap:y&&Zt,emissiveMap:ze,normalMapObjectSpace:ye&&U.normalMapType===m1,normalMapTangentSpace:ye&&U.normalMapType===p1,metalnessMap:Yt,roughnessMap:O,anisotropy:A,anisotropyMap:Ut,clearcoat:it,clearcoatMap:Bt,clearcoatNormalMap:xe,clearcoatRoughnessMap:Ct,dispersion:gt,iridescence:Tt,iridescenceMap:Ht,iridescenceThicknessMap:Kt,sheen:_t,sheenColorMap:Wt,sheenRoughnessMap:zt,specularMap:ne,specularColorMap:oe,specularIntensityMap:He,transmission:jt,transmissionMap:Y,thicknessMap:wt,gradientMap:ft,opaque:U.transparent===!1&&U.blending===Eo&&U.alphaToCoverage===!1,alphaMap:xt,alphaTest:Dt,alphaHash:Lt,combine:U.combine,mapUv:Be&&b(U.map.channel),aoMapUv:q&&b(U.aoMap.channel),lightMapUv:Nn&&b(U.lightMap.channel),bumpMapUv:pe&&b(U.bumpMap.channel),normalMapUv:ye&&b(U.normalMap.channel),displacementMapUv:Zt&&b(U.displacementMap.channel),emissiveMapUv:ze&&b(U.emissiveMap.channel),metalnessMapUv:Yt&&b(U.metalnessMap.channel),roughnessMapUv:O&&b(U.roughnessMap.channel),anisotropyMapUv:Ut&&b(U.anisotropyMap.channel),clearcoatMapUv:Bt&&b(U.clearcoatMap.channel),clearcoatNormalMapUv:xe&&b(U.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&b(U.clearcoatRoughnessMap.channel),iridescenceMapUv:Ht&&b(U.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&b(U.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&b(U.sheenColorMap.channel),sheenRoughnessMapUv:zt&&b(U.sheenRoughnessMap.channel),specularMapUv:ne&&b(U.specularMap.channel),specularColorMapUv:oe&&b(U.specularColorMap.channel),specularIntensityMapUv:He&&b(U.specularIntensityMap.channel),transmissionMapUv:Y&&b(U.transmissionMap.channel),thicknessMapUv:wt&&b(U.thicknessMap.channel),alphaMapUv:xt&&b(U.alphaMap.channel),vertexTangents:!!ht.attributes.tangent&&(ye||A),vertexColors:U.vertexColors,vertexAlphas:U.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,pointsUvs:ot.isPoints===!0&&!!ht.attributes.uv&&(Be||xt),fog:!!mt,useFog:U.fog===!0,fogExp2:!!mt&&mt.isFogExp2,flatShading:U.flatShading===!0,sizeAttenuation:U.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:Xt,skinning:ot.isSkinnedMesh===!0,morphTargets:ht.morphAttributes.position!==void 0,morphNormals:ht.morphAttributes.normal!==void 0,morphColors:ht.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:at,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:U.dithering,shadowMapEnabled:a.shadowMap.enabled&&k.length>0,shadowMapType:a.shadowMap.type,toneMapping:Je,decodeVideoTexture:Be&&U.map.isVideoTexture===!0&&Ne.getTransfer(U.map.colorSpace)===Xe,decodeVideoTextureEmissive:ze&&U.emissiveMap.isVideoTexture===!0&&Ne.getTransfer(U.emissiveMap.colorSpace)===Xe,premultipliedAlpha:U.premultipliedAlpha,doubleSided:U.side===Pa,flipSided:U.side===ei,useDepthPacking:U.depthPacking>=0,depthPacking:U.depthPacking||0,index0AttributeName:U.index0AttributeName,extensionClipCullDistance:ie&&U.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&U.extensions.multiDraw===!0||se)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:U.customProgramCacheKey()};return vn.vertexUv1s=m.has(1),vn.vertexUv2s=m.has(2),vn.vertexUv3s=m.has(3),m.clear(),vn}function _(U){const w=[];if(U.shaderID?w.push(U.shaderID):(w.push(U.customVertexShaderID),w.push(U.customFragmentShaderID)),U.defines!==void 0)for(const k in U.defines)w.push(k),w.push(U.defines[k]);return U.isRawShaderMaterial===!1&&(L(w,U),D(w,U),w.push(a.outputColorSpace)),w.push(U.customProgramCacheKey),w.join()}function L(U,w){U.push(w.precision),U.push(w.outputColorSpace),U.push(w.envMapMode),U.push(w.envMapCubeUVHeight),U.push(w.mapUv),U.push(w.alphaMapUv),U.push(w.lightMapUv),U.push(w.aoMapUv),U.push(w.bumpMapUv),U.push(w.normalMapUv),U.push(w.displacementMapUv),U.push(w.emissiveMapUv),U.push(w.metalnessMapUv),U.push(w.roughnessMapUv),U.push(w.anisotropyMapUv),U.push(w.clearcoatMapUv),U.push(w.clearcoatNormalMapUv),U.push(w.clearcoatRoughnessMapUv),U.push(w.iridescenceMapUv),U.push(w.iridescenceThicknessMapUv),U.push(w.sheenColorMapUv),U.push(w.sheenRoughnessMapUv),U.push(w.specularMapUv),U.push(w.specularColorMapUv),U.push(w.specularIntensityMapUv),U.push(w.transmissionMapUv),U.push(w.thicknessMapUv),U.push(w.combine),U.push(w.fogExp2),U.push(w.sizeAttenuation),U.push(w.morphTargetsCount),U.push(w.morphAttributeCount),U.push(w.numDirLights),U.push(w.numPointLights),U.push(w.numSpotLights),U.push(w.numSpotLightMaps),U.push(w.numHemiLights),U.push(w.numRectAreaLights),U.push(w.numDirLightShadows),U.push(w.numPointLightShadows),U.push(w.numSpotLightShadows),U.push(w.numSpotLightShadowsWithMaps),U.push(w.numLightProbes),U.push(w.shadowMapType),U.push(w.toneMapping),U.push(w.numClippingPlanes),U.push(w.numClipIntersection),U.push(w.depthPacking)}function D(U,w){h.disableAll(),w.supportsVertexTextures&&h.enable(0),w.instancing&&h.enable(1),w.instancingColor&&h.enable(2),w.instancingMorph&&h.enable(3),w.matcap&&h.enable(4),w.envMap&&h.enable(5),w.normalMapObjectSpace&&h.enable(6),w.normalMapTangentSpace&&h.enable(7),w.clearcoat&&h.enable(8),w.iridescence&&h.enable(9),w.alphaTest&&h.enable(10),w.vertexColors&&h.enable(11),w.vertexAlphas&&h.enable(12),w.vertexUv1s&&h.enable(13),w.vertexUv2s&&h.enable(14),w.vertexUv3s&&h.enable(15),w.vertexTangents&&h.enable(16),w.anisotropy&&h.enable(17),w.alphaHash&&h.enable(18),w.batching&&h.enable(19),w.dispersion&&h.enable(20),w.batchingColor&&h.enable(21),U.push(h.mask),h.disableAll(),w.fog&&h.enable(0),w.useFog&&h.enable(1),w.flatShading&&h.enable(2),w.logarithmicDepthBuffer&&h.enable(3),w.reverseDepthBuffer&&h.enable(4),w.skinning&&h.enable(5),w.morphTargets&&h.enable(6),w.morphNormals&&h.enable(7),w.morphColors&&h.enable(8),w.premultipliedAlpha&&h.enable(9),w.shadowMapEnabled&&h.enable(10),w.doubleSided&&h.enable(11),w.flipSided&&h.enable(12),w.useDepthPacking&&h.enable(13),w.dithering&&h.enable(14),w.transmission&&h.enable(15),w.sheen&&h.enable(16),w.opaque&&h.enable(17),w.pointsUvs&&h.enable(18),w.decodeVideoTexture&&h.enable(19),w.decodeVideoTextureEmissive&&h.enable(20),w.alphaToCoverage&&h.enable(21),U.push(h.mask)}function R(U){const w=E[U.type];let k;if(w){const ut=ta[w];k=q1.clone(ut.uniforms)}else k=U.uniforms;return k}function V(U,w){let k;for(let ut=0,ot=g.length;ut<ot;ut++){const mt=g[ut];if(mt.cacheKey===w){k=mt,++k.usedTimes;break}}return k===void 0&&(k=new hD(a,w,U,u),g.push(k)),k}function z(U){if(--U.usedTimes===0){const w=g.indexOf(U);g[w]=g[g.length-1],g.pop(),U.destroy()}}function N(U){p.remove(U)}function X(){p.dispose()}return{getParameters:x,getProgramCacheKey:_,getUniforms:R,acquireProgram:V,releaseProgram:z,releaseShaderCache:N,programs:g,dispose:X}}function vD(){let a=new WeakMap;function t(f){return a.has(f)}function i(f){let h=a.get(f);return h===void 0&&(h={},a.set(f,h)),h}function r(f){a.delete(f)}function l(f,h,p){a.get(f)[h]=p}function u(){a=new WeakMap}return{has:t,get:i,remove:r,update:l,dispose:u}}function _D(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.material.id!==t.material.id?a.material.id-t.material.id:a.z!==t.z?a.z-t.z:a.id-t.id}function cx(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.z!==t.z?t.z-a.z:a.id-t.id}function fx(){const a=[];let t=0;const i=[],r=[],l=[];function u(){t=0,i.length=0,r.length=0,l.length=0}function f(v,y,M,E,b,x){let _=a[t];return _===void 0?(_={id:v.id,object:v,geometry:y,material:M,groupOrder:E,renderOrder:v.renderOrder,z:b,group:x},a[t]=_):(_.id=v.id,_.object=v,_.geometry=y,_.material=M,_.groupOrder=E,_.renderOrder=v.renderOrder,_.z=b,_.group=x),t++,_}function h(v,y,M,E,b,x){const _=f(v,y,M,E,b,x);M.transmission>0?r.push(_):M.transparent===!0?l.push(_):i.push(_)}function p(v,y,M,E,b,x){const _=f(v,y,M,E,b,x);M.transmission>0?r.unshift(_):M.transparent===!0?l.unshift(_):i.unshift(_)}function m(v,y){i.length>1&&i.sort(v||_D),r.length>1&&r.sort(y||cx),l.length>1&&l.sort(y||cx)}function g(){for(let v=t,y=a.length;v<y;v++){const M=a[v];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:r,transparent:l,init:u,push:h,unshift:p,finish:g,sort:m}}function yD(){let a=new WeakMap;function t(r,l){const u=a.get(r);let f;return u===void 0?(f=new fx,a.set(r,[f])):l>=u.length?(f=new fx,u.push(f)):f=u[l],f}function i(){a=new WeakMap}return{get:t,dispose:i}}function xD(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new lt,color:new Ce};break;case"SpotLight":i={position:new lt,direction:new lt,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new lt,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":i={direction:new lt,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":i={color:new Ce,position:new lt,halfWidth:new lt,halfHeight:new lt};break}return a[t.id]=i,i}}}function SD(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[t.id]=i,i}}}let MD=0;function ED(a,t){return(t.castShadow?2:0)-(a.castShadow?2:0)+(t.map?1:0)-(a.map?1:0)}function bD(a){const t=new xD,i=SD(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new lt);const l=new lt,u=new cn,f=new cn;function h(m){let g=0,v=0,y=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let M=0,E=0,b=0,x=0,_=0,L=0,D=0,R=0,V=0,z=0,N=0;m.sort(ED);for(let U=0,w=m.length;U<w;U++){const k=m[U],ut=k.color,ot=k.intensity,mt=k.distance,ht=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)g+=ut.r*ot,v+=ut.g*ot,y+=ut.b*ot;else if(k.isLightProbe){for(let I=0;I<9;I++)r.probe[I].addScaledVector(k.sh.coefficients[I],ot);N++}else if(k.isDirectionalLight){const I=t.get(k);if(I.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const B=k.shadow,W=i.get(k);W.shadowIntensity=B.intensity,W.shadowBias=B.bias,W.shadowNormalBias=B.normalBias,W.shadowRadius=B.radius,W.shadowMapSize=B.mapSize,r.directionalShadow[M]=W,r.directionalShadowMap[M]=ht,r.directionalShadowMatrix[M]=k.shadow.matrix,L++}r.directional[M]=I,M++}else if(k.isSpotLight){const I=t.get(k);I.position.setFromMatrixPosition(k.matrixWorld),I.color.copy(ut).multiplyScalar(ot),I.distance=mt,I.coneCos=Math.cos(k.angle),I.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),I.decay=k.decay,r.spot[b]=I;const B=k.shadow;if(k.map&&(r.spotLightMap[V]=k.map,V++,B.updateMatrices(k),k.castShadow&&z++),r.spotLightMatrix[b]=B.matrix,k.castShadow){const W=i.get(k);W.shadowIntensity=B.intensity,W.shadowBias=B.bias,W.shadowNormalBias=B.normalBias,W.shadowRadius=B.radius,W.shadowMapSize=B.mapSize,r.spotShadow[b]=W,r.spotShadowMap[b]=ht,R++}b++}else if(k.isRectAreaLight){const I=t.get(k);I.color.copy(ut).multiplyScalar(ot),I.halfWidth.set(k.width*.5,0,0),I.halfHeight.set(0,k.height*.5,0),r.rectArea[x]=I,x++}else if(k.isPointLight){const I=t.get(k);if(I.color.copy(k.color).multiplyScalar(k.intensity),I.distance=k.distance,I.decay=k.decay,k.castShadow){const B=k.shadow,W=i.get(k);W.shadowIntensity=B.intensity,W.shadowBias=B.bias,W.shadowNormalBias=B.normalBias,W.shadowRadius=B.radius,W.shadowMapSize=B.mapSize,W.shadowCameraNear=B.camera.near,W.shadowCameraFar=B.camera.far,r.pointShadow[E]=W,r.pointShadowMap[E]=ht,r.pointShadowMatrix[E]=k.shadow.matrix,D++}r.point[E]=I,E++}else if(k.isHemisphereLight){const I=t.get(k);I.skyColor.copy(k.color).multiplyScalar(ot),I.groundColor.copy(k.groundColor).multiplyScalar(ot),r.hemi[_]=I,_++}}x>0&&(a.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ot.LTC_FLOAT_1,r.rectAreaLTC2=Ot.LTC_FLOAT_2):(r.rectAreaLTC1=Ot.LTC_HALF_1,r.rectAreaLTC2=Ot.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=v,r.ambient[2]=y;const X=r.hash;(X.directionalLength!==M||X.pointLength!==E||X.spotLength!==b||X.rectAreaLength!==x||X.hemiLength!==_||X.numDirectionalShadows!==L||X.numPointShadows!==D||X.numSpotShadows!==R||X.numSpotMaps!==V||X.numLightProbes!==N)&&(r.directional.length=M,r.spot.length=b,r.rectArea.length=x,r.point.length=E,r.hemi.length=_,r.directionalShadow.length=L,r.directionalShadowMap.length=L,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=L,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=R+V-z,r.spotLightMap.length=V,r.numSpotLightShadowsWithMaps=z,r.numLightProbes=N,X.directionalLength=M,X.pointLength=E,X.spotLength=b,X.rectAreaLength=x,X.hemiLength=_,X.numDirectionalShadows=L,X.numPointShadows=D,X.numSpotShadows=R,X.numSpotMaps=V,X.numLightProbes=N,r.version=MD++)}function p(m,g){let v=0,y=0,M=0,E=0,b=0;const x=g.matrixWorldInverse;for(let _=0,L=m.length;_<L;_++){const D=m[_];if(D.isDirectionalLight){const R=r.directional[v];R.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(x),v++}else if(D.isSpotLight){const R=r.spot[M];R.position.setFromMatrixPosition(D.matrixWorld),R.position.applyMatrix4(x),R.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(x),M++}else if(D.isRectAreaLight){const R=r.rectArea[E];R.position.setFromMatrixPosition(D.matrixWorld),R.position.applyMatrix4(x),f.identity(),u.copy(D.matrixWorld),u.premultiply(x),f.extractRotation(u),R.halfWidth.set(D.width*.5,0,0),R.halfHeight.set(0,D.height*.5,0),R.halfWidth.applyMatrix4(f),R.halfHeight.applyMatrix4(f),E++}else if(D.isPointLight){const R=r.point[y];R.position.setFromMatrixPosition(D.matrixWorld),R.position.applyMatrix4(x),y++}else if(D.isHemisphereLight){const R=r.hemi[b];R.direction.setFromMatrixPosition(D.matrixWorld),R.direction.transformDirection(x),b++}}}return{setup:h,setupView:p,state:r}}function hx(a){const t=new bD(a),i=[],r=[];function l(g){m.camera=g,i.length=0,r.length=0}function u(g){i.push(g)}function f(g){r.push(g)}function h(){t.setup(i)}function p(g){t.setupView(i,g)}const m={lightsArray:i,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:h,setupLightsView:p,pushLight:u,pushShadow:f}}function TD(a){let t=new WeakMap;function i(l,u=0){const f=t.get(l);let h;return f===void 0?(h=new hx(a),t.set(l,[h])):u>=f.length?(h=new hx(a),f.push(h)):h=f[u],h}function r(){t=new WeakMap}return{get:i,dispose:r}}const AD=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,RD=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function CD(a,t,i){let r=new NS;const l=new We,u=new We,f=new un,h=new $1({depthPacking:d1}),p=new tR,m={},g=i.maxTextureSize,v={[Lr]:ei,[ei]:Lr,[Pa]:Pa},y=new Nr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:AD,fragmentShader:RD}),M=y.clone();M.defines.HORIZONTAL_PASS=1;const E=new wi;E.setAttribute("position",new na(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Gi(E,y),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lS;let _=this.type;this.render=function(z,N,X){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||z.length===0)return;const U=a.getRenderTarget(),w=a.getActiveCubeFace(),k=a.getActiveMipmapLevel(),ut=a.state;ut.setBlending(Dr),ut.buffers.color.setClear(1,1,1,1),ut.buffers.depth.setTest(!0),ut.setScissorTest(!1);const ot=_!==Da&&this.type===Da,mt=_===Da&&this.type!==Da;for(let ht=0,I=z.length;ht<I;ht++){const B=z[ht],W=B.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;l.copy(W.mapSize);const bt=W.getFrameExtents();if(l.multiply(bt),u.copy(W.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(u.x=Math.floor(g/bt.x),l.x=u.x*bt.x,W.mapSize.x=u.x),l.y>g&&(u.y=Math.floor(g/bt.y),l.y=u.y*bt.y,W.mapSize.y=u.y)),W.map===null||ot===!0||mt===!0){const P=this.type!==Da?{minFilter:ki,magFilter:ki}:{};W.map!==null&&W.map.dispose(),W.map=new Ts(l.x,l.y,P),W.map.texture.name=B.name+".shadowMap",W.camera.updateProjectionMatrix()}a.setRenderTarget(W.map),a.clear();const Rt=W.getViewportCount();for(let P=0;P<Rt;P++){const at=W.getViewport(P);f.set(u.x*at.x,u.y*at.y,u.x*at.z,u.y*at.w),ut.viewport(f),W.updateMatrices(B,P),r=W.getFrustum(),R(N,X,W.camera,B,this.type)}W.isPointLightShadow!==!0&&this.type===Da&&L(W,X),W.needsUpdate=!1}_=this.type,x.needsUpdate=!1,a.setRenderTarget(U,w,k)};function L(z,N){const X=t.update(b);y.defines.VSM_SAMPLES!==z.blurSamples&&(y.defines.VSM_SAMPLES=z.blurSamples,M.defines.VSM_SAMPLES=z.blurSamples,y.needsUpdate=!0,M.needsUpdate=!0),z.mapPass===null&&(z.mapPass=new Ts(l.x,l.y)),y.uniforms.shadow_pass.value=z.map.texture,y.uniforms.resolution.value=z.mapSize,y.uniforms.radius.value=z.radius,a.setRenderTarget(z.mapPass),a.clear(),a.renderBufferDirect(N,null,X,y,b,null),M.uniforms.shadow_pass.value=z.mapPass.texture,M.uniforms.resolution.value=z.mapSize,M.uniforms.radius.value=z.radius,a.setRenderTarget(z.map),a.clear(),a.renderBufferDirect(N,null,X,M,b,null)}function D(z,N,X,U){let w=null;const k=X.isPointLight===!0?z.customDistanceMaterial:z.customDepthMaterial;if(k!==void 0)w=k;else if(w=X.isPointLight===!0?p:h,a.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const ut=w.uuid,ot=N.uuid;let mt=m[ut];mt===void 0&&(mt={},m[ut]=mt);let ht=mt[ot];ht===void 0&&(ht=w.clone(),mt[ot]=ht,N.addEventListener("dispose",V)),w=ht}if(w.visible=N.visible,w.wireframe=N.wireframe,U===Da?w.side=N.shadowSide!==null?N.shadowSide:N.side:w.side=N.shadowSide!==null?N.shadowSide:v[N.side],w.alphaMap=N.alphaMap,w.alphaTest=N.alphaTest,w.map=N.map,w.clipShadows=N.clipShadows,w.clippingPlanes=N.clippingPlanes,w.clipIntersection=N.clipIntersection,w.displacementMap=N.displacementMap,w.displacementScale=N.displacementScale,w.displacementBias=N.displacementBias,w.wireframeLinewidth=N.wireframeLinewidth,w.linewidth=N.linewidth,X.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const ut=a.properties.get(w);ut.light=X}return w}function R(z,N,X,U,w){if(z.visible===!1)return;if(z.layers.test(N.layers)&&(z.isMesh||z.isLine||z.isPoints)&&(z.castShadow||z.receiveShadow&&w===Da)&&(!z.frustumCulled||r.intersectsObject(z))){z.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,z.matrixWorld);const ot=t.update(z),mt=z.material;if(Array.isArray(mt)){const ht=ot.groups;for(let I=0,B=ht.length;I<B;I++){const W=ht[I],bt=mt[W.materialIndex];if(bt&&bt.visible){const Rt=D(z,bt,U,w);z.onBeforeShadow(a,z,N,X,ot,Rt,W),a.renderBufferDirect(X,null,ot,Rt,z,W),z.onAfterShadow(a,z,N,X,ot,Rt,W)}}}else if(mt.visible){const ht=D(z,mt,U,w);z.onBeforeShadow(a,z,N,X,ot,ht,null),a.renderBufferDirect(X,null,ot,ht,z,null),z.onAfterShadow(a,z,N,X,ot,ht,null)}}const ut=z.children;for(let ot=0,mt=ut.length;ot<mt;ot++)R(ut[ot],N,X,U,w)}function V(z){z.target.removeEventListener("dispose",V);for(const X in m){const U=m[X],w=z.target.uuid;w in U&&(U[w].dispose(),delete U[w])}}}const wD={[qp]:jp,[Wp]:Zp,[Yp]:Kp,[Ho]:Qp,[jp]:qp,[Zp]:Wp,[Kp]:Yp,[Qp]:Ho};function DD(a,t){function i(){let Y=!1;const wt=new un;let ft=null;const xt=new un(0,0,0,0);return{setMask:function(Dt){ft!==Dt&&!Y&&(a.colorMask(Dt,Dt,Dt,Dt),ft=Dt)},setLocked:function(Dt){Y=Dt},setClear:function(Dt,Lt,ie,Je,vn){vn===!0&&(Dt*=Je,Lt*=Je,ie*=Je),wt.set(Dt,Lt,ie,Je),xt.equals(wt)===!1&&(a.clearColor(Dt,Lt,ie,Je),xt.copy(wt))},reset:function(){Y=!1,ft=null,xt.set(-1,0,0,0)}}}function r(){let Y=!1,wt=!1,ft=null,xt=null,Dt=null;return{setReversed:function(Lt){if(wt!==Lt){const ie=t.get("EXT_clip_control");wt?ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.ZERO_TO_ONE_EXT):ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.NEGATIVE_ONE_TO_ONE_EXT);const Je=Dt;Dt=null,this.setClear(Je)}wt=Lt},getReversed:function(){return wt},setTest:function(Lt){Lt?Mt(a.DEPTH_TEST):Xt(a.DEPTH_TEST)},setMask:function(Lt){ft!==Lt&&!Y&&(a.depthMask(Lt),ft=Lt)},setFunc:function(Lt){if(wt&&(Lt=wD[Lt]),xt!==Lt){switch(Lt){case qp:a.depthFunc(a.NEVER);break;case jp:a.depthFunc(a.ALWAYS);break;case Wp:a.depthFunc(a.LESS);break;case Ho:a.depthFunc(a.LEQUAL);break;case Yp:a.depthFunc(a.EQUAL);break;case Qp:a.depthFunc(a.GEQUAL);break;case Zp:a.depthFunc(a.GREATER);break;case Kp:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}xt=Lt}},setLocked:function(Lt){Y=Lt},setClear:function(Lt){Dt!==Lt&&(wt&&(Lt=1-Lt),a.clearDepth(Lt),Dt=Lt)},reset:function(){Y=!1,ft=null,xt=null,Dt=null,wt=!1}}}function l(){let Y=!1,wt=null,ft=null,xt=null,Dt=null,Lt=null,ie=null,Je=null,vn=null;return{setTest:function(Re){Y||(Re?Mt(a.STENCIL_TEST):Xt(a.STENCIL_TEST))},setMask:function(Re){wt!==Re&&!Y&&(a.stencilMask(Re),wt=Re)},setFunc:function(Re,Rn,Di){(ft!==Re||xt!==Rn||Dt!==Di)&&(a.stencilFunc(Re,Rn,Di),ft=Re,xt=Rn,Dt=Di)},setOp:function(Re,Rn,Di){(Lt!==Re||ie!==Rn||Je!==Di)&&(a.stencilOp(Re,Rn,Di),Lt=Re,ie=Rn,Je=Di)},setLocked:function(Re){Y=Re},setClear:function(Re){vn!==Re&&(a.clearStencil(Re),vn=Re)},reset:function(){Y=!1,wt=null,ft=null,xt=null,Dt=null,Lt=null,ie=null,Je=null,vn=null}}}const u=new i,f=new r,h=new l,p=new WeakMap,m=new WeakMap;let g={},v={},y=new WeakMap,M=[],E=null,b=!1,x=null,_=null,L=null,D=null,R=null,V=null,z=null,N=new Ce(0,0,0),X=0,U=!1,w=null,k=null,ut=null,ot=null,mt=null;const ht=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,B=0;const W=a.getParameter(a.VERSION);W.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(W)[1]),I=B>=1):W.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),I=B>=2);let bt=null,Rt={};const P=a.getParameter(a.SCISSOR_BOX),at=a.getParameter(a.VIEWPORT),Et=new un().fromArray(P),J=new un().fromArray(at);function dt(Y,wt,ft,xt){const Dt=new Uint8Array(4),Lt=a.createTexture();a.bindTexture(Y,Lt),a.texParameteri(Y,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(Y,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let ie=0;ie<ft;ie++)Y===a.TEXTURE_3D||Y===a.TEXTURE_2D_ARRAY?a.texImage3D(wt,0,a.RGBA,1,1,xt,0,a.RGBA,a.UNSIGNED_BYTE,Dt):a.texImage2D(wt+ie,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Dt);return Lt}const At={};At[a.TEXTURE_2D]=dt(a.TEXTURE_2D,a.TEXTURE_2D,1),At[a.TEXTURE_CUBE_MAP]=dt(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[a.TEXTURE_2D_ARRAY]=dt(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),At[a.TEXTURE_3D]=dt(a.TEXTURE_3D,a.TEXTURE_3D,1,1),u.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Mt(a.DEPTH_TEST),f.setFunc(Ho),pe(!1),ye(py),Mt(a.CULL_FACE),q(Dr);function Mt(Y){g[Y]!==!0&&(a.enable(Y),g[Y]=!0)}function Xt(Y){g[Y]!==!1&&(a.disable(Y),g[Y]=!1)}function Vt(Y,wt){return v[Y]!==wt?(a.bindFramebuffer(Y,wt),v[Y]=wt,Y===a.DRAW_FRAMEBUFFER&&(v[a.FRAMEBUFFER]=wt),Y===a.FRAMEBUFFER&&(v[a.DRAW_FRAMEBUFFER]=wt),!0):!1}function se(Y,wt){let ft=M,xt=!1;if(Y){ft=y.get(wt),ft===void 0&&(ft=[],y.set(wt,ft));const Dt=Y.textures;if(ft.length!==Dt.length||ft[0]!==a.COLOR_ATTACHMENT0){for(let Lt=0,ie=Dt.length;Lt<ie;Lt++)ft[Lt]=a.COLOR_ATTACHMENT0+Lt;ft.length=Dt.length,xt=!0}}else ft[0]!==a.BACK&&(ft[0]=a.BACK,xt=!0);xt&&a.drawBuffers(ft)}function Be(Y){return E!==Y?(a.useProgram(Y),E=Y,!0):!1}const me={[ls]:a.FUNC_ADD,[BA]:a.FUNC_SUBTRACT,[HA]:a.FUNC_REVERSE_SUBTRACT};me[GA]=a.MIN,me[VA]=a.MAX;const Ke={[kA]:a.ZERO,[XA]:a.ONE,[qA]:a.SRC_COLOR,[kp]:a.SRC_ALPHA,[KA]:a.SRC_ALPHA_SATURATE,[QA]:a.DST_COLOR,[WA]:a.DST_ALPHA,[jA]:a.ONE_MINUS_SRC_COLOR,[Xp]:a.ONE_MINUS_SRC_ALPHA,[ZA]:a.ONE_MINUS_DST_COLOR,[YA]:a.ONE_MINUS_DST_ALPHA,[JA]:a.CONSTANT_COLOR,[$A]:a.ONE_MINUS_CONSTANT_COLOR,[t1]:a.CONSTANT_ALPHA,[e1]:a.ONE_MINUS_CONSTANT_ALPHA};function q(Y,wt,ft,xt,Dt,Lt,ie,Je,vn,Re){if(Y===Dr){b===!0&&(Xt(a.BLEND),b=!1);return}if(b===!1&&(Mt(a.BLEND),b=!0),Y!==IA){if(Y!==x||Re!==U){if((_!==ls||R!==ls)&&(a.blendEquation(a.FUNC_ADD),_=ls,R=ls),Re)switch(Y){case Eo:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case my:a.blendFunc(a.ONE,a.ONE);break;case gy:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case vy:a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}else switch(Y){case Eo:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case my:a.blendFunc(a.SRC_ALPHA,a.ONE);break;case gy:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case vy:a.blendFunc(a.ZERO,a.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}L=null,D=null,V=null,z=null,N.set(0,0,0),X=0,x=Y,U=Re}return}Dt=Dt||wt,Lt=Lt||ft,ie=ie||xt,(wt!==_||Dt!==R)&&(a.blendEquationSeparate(me[wt],me[Dt]),_=wt,R=Dt),(ft!==L||xt!==D||Lt!==V||ie!==z)&&(a.blendFuncSeparate(Ke[ft],Ke[xt],Ke[Lt],Ke[ie]),L=ft,D=xt,V=Lt,z=ie),(Je.equals(N)===!1||vn!==X)&&(a.blendColor(Je.r,Je.g,Je.b,vn),N.copy(Je),X=vn),x=Y,U=!1}function Nn(Y,wt){Y.side===Pa?Xt(a.CULL_FACE):Mt(a.CULL_FACE);let ft=Y.side===ei;wt&&(ft=!ft),pe(ft),Y.blending===Eo&&Y.transparent===!1?q(Dr):q(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),f.setFunc(Y.depthFunc),f.setTest(Y.depthTest),f.setMask(Y.depthWrite),u.setMask(Y.colorWrite);const xt=Y.stencilWrite;h.setTest(xt),xt&&(h.setMask(Y.stencilWriteMask),h.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),h.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),ze(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?Mt(a.SAMPLE_ALPHA_TO_COVERAGE):Xt(a.SAMPLE_ALPHA_TO_COVERAGE)}function pe(Y){w!==Y&&(Y?a.frontFace(a.CW):a.frontFace(a.CCW),w=Y)}function ye(Y){Y!==PA?(Mt(a.CULL_FACE),Y!==k&&(Y===py?a.cullFace(a.BACK):Y===zA?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):Xt(a.CULL_FACE),k=Y}function Zt(Y){Y!==ut&&(I&&a.lineWidth(Y),ut=Y)}function ze(Y,wt,ft){Y?(Mt(a.POLYGON_OFFSET_FILL),(ot!==wt||mt!==ft)&&(a.polygonOffset(wt,ft),ot=wt,mt=ft)):Xt(a.POLYGON_OFFSET_FILL)}function Yt(Y){Y?Mt(a.SCISSOR_TEST):Xt(a.SCISSOR_TEST)}function O(Y){Y===void 0&&(Y=a.TEXTURE0+ht-1),bt!==Y&&(a.activeTexture(Y),bt=Y)}function A(Y,wt,ft){ft===void 0&&(bt===null?ft=a.TEXTURE0+ht-1:ft=bt);let xt=Rt[ft];xt===void 0&&(xt={type:void 0,texture:void 0},Rt[ft]=xt),(xt.type!==Y||xt.texture!==wt)&&(bt!==ft&&(a.activeTexture(ft),bt=ft),a.bindTexture(Y,wt||At[Y]),xt.type=Y,xt.texture=wt)}function it(){const Y=Rt[bt];Y!==void 0&&Y.type!==void 0&&(a.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function gt(){try{a.compressedTexImage2D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Tt(){try{a.compressedTexImage3D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function _t(){try{a.texSubImage2D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function jt(){try{a.texSubImage3D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Ut(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Bt(){try{a.compressedTexSubImage3D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function xe(){try{a.texStorage2D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Ct(){try{a.texStorage3D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Ht(){try{a.texImage2D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Kt(){try{a.texImage3D.apply(a,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Wt(Y){Et.equals(Y)===!1&&(a.scissor(Y.x,Y.y,Y.z,Y.w),Et.copy(Y))}function zt(Y){J.equals(Y)===!1&&(a.viewport(Y.x,Y.y,Y.z,Y.w),J.copy(Y))}function ne(Y,wt){let ft=m.get(wt);ft===void 0&&(ft=new WeakMap,m.set(wt,ft));let xt=ft.get(Y);xt===void 0&&(xt=a.getUniformBlockIndex(wt,Y.name),ft.set(Y,xt))}function oe(Y,wt){const xt=m.get(wt).get(Y);p.get(wt)!==xt&&(a.uniformBlockBinding(wt,xt,Y.__bindingPointIndex),p.set(wt,xt))}function He(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),f.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),g={},bt=null,Rt={},v={},y=new WeakMap,M=[],E=null,b=!1,x=null,_=null,L=null,D=null,R=null,V=null,z=null,N=new Ce(0,0,0),X=0,U=!1,w=null,k=null,ut=null,ot=null,mt=null,Et.set(0,0,a.canvas.width,a.canvas.height),J.set(0,0,a.canvas.width,a.canvas.height),u.reset(),f.reset(),h.reset()}return{buffers:{color:u,depth:f,stencil:h},enable:Mt,disable:Xt,bindFramebuffer:Vt,drawBuffers:se,useProgram:Be,setBlending:q,setMaterial:Nn,setFlipSided:pe,setCullFace:ye,setLineWidth:Zt,setPolygonOffset:ze,setScissorTest:Yt,activeTexture:O,bindTexture:A,unbindTexture:it,compressedTexImage2D:gt,compressedTexImage3D:Tt,texImage2D:Ht,texImage3D:Kt,updateUBOMapping:ne,uniformBlockBinding:oe,texStorage2D:xe,texStorage3D:Ct,texSubImage2D:_t,texSubImage3D:jt,compressedTexSubImage2D:Ut,compressedTexSubImage3D:Bt,scissor:Wt,viewport:zt,reset:He}}function UD(a,t,i,r,l,u,f){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new We,g=new WeakMap;let v;const y=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(O,A){return M?new OffscreenCanvas(O,A):_f("canvas")}function b(O,A,it){let gt=1;const Tt=Yt(O);if((Tt.width>it||Tt.height>it)&&(gt=it/Math.max(Tt.width,Tt.height)),gt<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const _t=Math.floor(gt*Tt.width),jt=Math.floor(gt*Tt.height);v===void 0&&(v=E(_t,jt));const Ut=A?E(_t,jt):v;return Ut.width=_t,Ut.height=jt,Ut.getContext("2d").drawImage(O,0,0,_t,jt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Tt.width+"x"+Tt.height+") to ("+_t+"x"+jt+")."),Ut}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Tt.width+"x"+Tt.height+")."),O;return O}function x(O){return O.generateMipmaps}function _(O){a.generateMipmap(O)}function L(O){return O.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?a.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function D(O,A,it,gt,Tt=!1){if(O!==null){if(a[O]!==void 0)return a[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let _t=A;if(A===a.RED&&(it===a.FLOAT&&(_t=a.R32F),it===a.HALF_FLOAT&&(_t=a.R16F),it===a.UNSIGNED_BYTE&&(_t=a.R8)),A===a.RED_INTEGER&&(it===a.UNSIGNED_BYTE&&(_t=a.R8UI),it===a.UNSIGNED_SHORT&&(_t=a.R16UI),it===a.UNSIGNED_INT&&(_t=a.R32UI),it===a.BYTE&&(_t=a.R8I),it===a.SHORT&&(_t=a.R16I),it===a.INT&&(_t=a.R32I)),A===a.RG&&(it===a.FLOAT&&(_t=a.RG32F),it===a.HALF_FLOAT&&(_t=a.RG16F),it===a.UNSIGNED_BYTE&&(_t=a.RG8)),A===a.RG_INTEGER&&(it===a.UNSIGNED_BYTE&&(_t=a.RG8UI),it===a.UNSIGNED_SHORT&&(_t=a.RG16UI),it===a.UNSIGNED_INT&&(_t=a.RG32UI),it===a.BYTE&&(_t=a.RG8I),it===a.SHORT&&(_t=a.RG16I),it===a.INT&&(_t=a.RG32I)),A===a.RGB_INTEGER&&(it===a.UNSIGNED_BYTE&&(_t=a.RGB8UI),it===a.UNSIGNED_SHORT&&(_t=a.RGB16UI),it===a.UNSIGNED_INT&&(_t=a.RGB32UI),it===a.BYTE&&(_t=a.RGB8I),it===a.SHORT&&(_t=a.RGB16I),it===a.INT&&(_t=a.RGB32I)),A===a.RGBA_INTEGER&&(it===a.UNSIGNED_BYTE&&(_t=a.RGBA8UI),it===a.UNSIGNED_SHORT&&(_t=a.RGBA16UI),it===a.UNSIGNED_INT&&(_t=a.RGBA32UI),it===a.BYTE&&(_t=a.RGBA8I),it===a.SHORT&&(_t=a.RGBA16I),it===a.INT&&(_t=a.RGBA32I)),A===a.RGB&&it===a.UNSIGNED_INT_5_9_9_9_REV&&(_t=a.RGB9_E5),A===a.RGBA){const jt=Tt?gf:Ne.getTransfer(gt);it===a.FLOAT&&(_t=a.RGBA32F),it===a.HALF_FLOAT&&(_t=a.RGBA16F),it===a.UNSIGNED_BYTE&&(_t=jt===Xe?a.SRGB8_ALPHA8:a.RGBA8),it===a.UNSIGNED_SHORT_4_4_4_4&&(_t=a.RGBA4),it===a.UNSIGNED_SHORT_5_5_5_1&&(_t=a.RGB5_A1)}return(_t===a.R16F||_t===a.R32F||_t===a.RG16F||_t===a.RG32F||_t===a.RGBA16F||_t===a.RGBA32F)&&t.get("EXT_color_buffer_float"),_t}function R(O,A){let it;return O?A===null||A===bs||A===ko?it=a.DEPTH24_STENCIL8:A===za?it=a.DEPTH32F_STENCIL8:A===su&&(it=a.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===bs||A===ko?it=a.DEPTH_COMPONENT24:A===za?it=a.DEPTH_COMPONENT32F:A===su&&(it=a.DEPTH_COMPONENT16),it}function V(O,A){return x(O)===!0||O.isFramebufferTexture&&O.minFilter!==ki&&O.minFilter!==ea?Math.log2(Math.max(A.width,A.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?A.mipmaps.length:1}function z(O){const A=O.target;A.removeEventListener("dispose",z),X(A),A.isVideoTexture&&g.delete(A)}function N(O){const A=O.target;A.removeEventListener("dispose",N),w(A)}function X(O){const A=r.get(O);if(A.__webglInit===void 0)return;const it=O.source,gt=y.get(it);if(gt){const Tt=gt[A.__cacheKey];Tt.usedTimes--,Tt.usedTimes===0&&U(O),Object.keys(gt).length===0&&y.delete(it)}r.remove(O)}function U(O){const A=r.get(O);a.deleteTexture(A.__webglTexture);const it=O.source,gt=y.get(it);delete gt[A.__cacheKey],f.memory.textures--}function w(O){const A=r.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),r.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let gt=0;gt<6;gt++){if(Array.isArray(A.__webglFramebuffer[gt]))for(let Tt=0;Tt<A.__webglFramebuffer[gt].length;Tt++)a.deleteFramebuffer(A.__webglFramebuffer[gt][Tt]);else a.deleteFramebuffer(A.__webglFramebuffer[gt]);A.__webglDepthbuffer&&a.deleteRenderbuffer(A.__webglDepthbuffer[gt])}else{if(Array.isArray(A.__webglFramebuffer))for(let gt=0;gt<A.__webglFramebuffer.length;gt++)a.deleteFramebuffer(A.__webglFramebuffer[gt]);else a.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&a.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&a.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let gt=0;gt<A.__webglColorRenderbuffer.length;gt++)A.__webglColorRenderbuffer[gt]&&a.deleteRenderbuffer(A.__webglColorRenderbuffer[gt]);A.__webglDepthRenderbuffer&&a.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const it=O.textures;for(let gt=0,Tt=it.length;gt<Tt;gt++){const _t=r.get(it[gt]);_t.__webglTexture&&(a.deleteTexture(_t.__webglTexture),f.memory.textures--),r.remove(it[gt])}r.remove(O)}let k=0;function ut(){k=0}function ot(){const O=k;return O>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),k+=1,O}function mt(O){const A=[];return A.push(O.wrapS),A.push(O.wrapT),A.push(O.wrapR||0),A.push(O.magFilter),A.push(O.minFilter),A.push(O.anisotropy),A.push(O.internalFormat),A.push(O.format),A.push(O.type),A.push(O.generateMipmaps),A.push(O.premultiplyAlpha),A.push(O.flipY),A.push(O.unpackAlignment),A.push(O.colorSpace),A.join()}function ht(O,A){const it=r.get(O);if(O.isVideoTexture&&Zt(O),O.isRenderTargetTexture===!1&&O.version>0&&it.__version!==O.version){const gt=O.image;if(gt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(gt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(it,O,A);return}}i.bindTexture(a.TEXTURE_2D,it.__webglTexture,a.TEXTURE0+A)}function I(O,A){const it=r.get(O);if(O.version>0&&it.__version!==O.version){J(it,O,A);return}i.bindTexture(a.TEXTURE_2D_ARRAY,it.__webglTexture,a.TEXTURE0+A)}function B(O,A){const it=r.get(O);if(O.version>0&&it.__version!==O.version){J(it,O,A);return}i.bindTexture(a.TEXTURE_3D,it.__webglTexture,a.TEXTURE0+A)}function W(O,A){const it=r.get(O);if(O.version>0&&it.__version!==O.version){dt(it,O,A);return}i.bindTexture(a.TEXTURE_CUBE_MAP,it.__webglTexture,a.TEXTURE0+A)}const bt={[tm]:a.REPEAT,[hs]:a.CLAMP_TO_EDGE,[em]:a.MIRRORED_REPEAT},Rt={[ki]:a.NEAREST,[f1]:a.NEAREST_MIPMAP_NEAREST,[Lc]:a.NEAREST_MIPMAP_LINEAR,[ea]:a.LINEAR,[Yd]:a.LINEAR_MIPMAP_NEAREST,[ds]:a.LINEAR_MIPMAP_LINEAR},P={[g1]:a.NEVER,[M1]:a.ALWAYS,[v1]:a.LESS,[SS]:a.LEQUAL,[_1]:a.EQUAL,[S1]:a.GEQUAL,[y1]:a.GREATER,[x1]:a.NOTEQUAL};function at(O,A){if(A.type===za&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===ea||A.magFilter===Yd||A.magFilter===Lc||A.magFilter===ds||A.minFilter===ea||A.minFilter===Yd||A.minFilter===Lc||A.minFilter===ds)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(O,a.TEXTURE_WRAP_S,bt[A.wrapS]),a.texParameteri(O,a.TEXTURE_WRAP_T,bt[A.wrapT]),(O===a.TEXTURE_3D||O===a.TEXTURE_2D_ARRAY)&&a.texParameteri(O,a.TEXTURE_WRAP_R,bt[A.wrapR]),a.texParameteri(O,a.TEXTURE_MAG_FILTER,Rt[A.magFilter]),a.texParameteri(O,a.TEXTURE_MIN_FILTER,Rt[A.minFilter]),A.compareFunction&&(a.texParameteri(O,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(O,a.TEXTURE_COMPARE_FUNC,P[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===ki||A.minFilter!==Lc&&A.minFilter!==ds||A.type===za&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||r.get(A).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");a.texParameterf(O,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),r.get(A).__currentAnisotropy=A.anisotropy}}}function Et(O,A){let it=!1;O.__webglInit===void 0&&(O.__webglInit=!0,A.addEventListener("dispose",z));const gt=A.source;let Tt=y.get(gt);Tt===void 0&&(Tt={},y.set(gt,Tt));const _t=mt(A);if(_t!==O.__cacheKey){Tt[_t]===void 0&&(Tt[_t]={texture:a.createTexture(),usedTimes:0},f.memory.textures++,it=!0),Tt[_t].usedTimes++;const jt=Tt[O.__cacheKey];jt!==void 0&&(Tt[O.__cacheKey].usedTimes--,jt.usedTimes===0&&U(A)),O.__cacheKey=_t,O.__webglTexture=Tt[_t].texture}return it}function J(O,A,it){let gt=a.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(gt=a.TEXTURE_2D_ARRAY),A.isData3DTexture&&(gt=a.TEXTURE_3D);const Tt=Et(O,A),_t=A.source;i.bindTexture(gt,O.__webglTexture,a.TEXTURE0+it);const jt=r.get(_t);if(_t.version!==jt.__version||Tt===!0){i.activeTexture(a.TEXTURE0+it);const Ut=Ne.getPrimaries(Ne.workingColorSpace),Bt=A.colorSpace===yr?null:Ne.getPrimaries(A.colorSpace),xe=A.colorSpace===yr||Ut===Bt?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,A.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,A.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let Ct=b(A.image,!1,l.maxTextureSize);Ct=ze(A,Ct);const Ht=u.convert(A.format,A.colorSpace),Kt=u.convert(A.type);let Wt=D(A.internalFormat,Ht,Kt,A.colorSpace,A.isVideoTexture);at(gt,A);let zt;const ne=A.mipmaps,oe=A.isVideoTexture!==!0,He=jt.__version===void 0||Tt===!0,Y=_t.dataReady,wt=V(A,Ct);if(A.isDepthTexture)Wt=R(A.format===Xo,A.type),He&&(oe?i.texStorage2D(a.TEXTURE_2D,1,Wt,Ct.width,Ct.height):i.texImage2D(a.TEXTURE_2D,0,Wt,Ct.width,Ct.height,0,Ht,Kt,null));else if(A.isDataTexture)if(ne.length>0){oe&&He&&i.texStorage2D(a.TEXTURE_2D,wt,Wt,ne[0].width,ne[0].height);for(let ft=0,xt=ne.length;ft<xt;ft++)zt=ne[ft],oe?Y&&i.texSubImage2D(a.TEXTURE_2D,ft,0,0,zt.width,zt.height,Ht,Kt,zt.data):i.texImage2D(a.TEXTURE_2D,ft,Wt,zt.width,zt.height,0,Ht,Kt,zt.data);A.generateMipmaps=!1}else oe?(He&&i.texStorage2D(a.TEXTURE_2D,wt,Wt,Ct.width,Ct.height),Y&&i.texSubImage2D(a.TEXTURE_2D,0,0,0,Ct.width,Ct.height,Ht,Kt,Ct.data)):i.texImage2D(a.TEXTURE_2D,0,Wt,Ct.width,Ct.height,0,Ht,Kt,Ct.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){oe&&He&&i.texStorage3D(a.TEXTURE_2D_ARRAY,wt,Wt,ne[0].width,ne[0].height,Ct.depth);for(let ft=0,xt=ne.length;ft<xt;ft++)if(zt=ne[ft],A.format!==Hi)if(Ht!==null)if(oe){if(Y)if(A.layerUpdates.size>0){const Dt=Vy(zt.width,zt.height,A.format,A.type);for(const Lt of A.layerUpdates){const ie=zt.data.subarray(Lt*Dt/zt.data.BYTES_PER_ELEMENT,(Lt+1)*Dt/zt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,ft,0,0,Lt,zt.width,zt.height,1,Ht,ie)}A.clearLayerUpdates()}else i.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,ft,0,0,0,zt.width,zt.height,Ct.depth,Ht,zt.data)}else i.compressedTexImage3D(a.TEXTURE_2D_ARRAY,ft,Wt,zt.width,zt.height,Ct.depth,0,zt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?Y&&i.texSubImage3D(a.TEXTURE_2D_ARRAY,ft,0,0,0,zt.width,zt.height,Ct.depth,Ht,Kt,zt.data):i.texImage3D(a.TEXTURE_2D_ARRAY,ft,Wt,zt.width,zt.height,Ct.depth,0,Ht,Kt,zt.data)}else{oe&&He&&i.texStorage2D(a.TEXTURE_2D,wt,Wt,ne[0].width,ne[0].height);for(let ft=0,xt=ne.length;ft<xt;ft++)zt=ne[ft],A.format!==Hi?Ht!==null?oe?Y&&i.compressedTexSubImage2D(a.TEXTURE_2D,ft,0,0,zt.width,zt.height,Ht,zt.data):i.compressedTexImage2D(a.TEXTURE_2D,ft,Wt,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?Y&&i.texSubImage2D(a.TEXTURE_2D,ft,0,0,zt.width,zt.height,Ht,Kt,zt.data):i.texImage2D(a.TEXTURE_2D,ft,Wt,zt.width,zt.height,0,Ht,Kt,zt.data)}else if(A.isDataArrayTexture)if(oe){if(He&&i.texStorage3D(a.TEXTURE_2D_ARRAY,wt,Wt,Ct.width,Ct.height,Ct.depth),Y)if(A.layerUpdates.size>0){const ft=Vy(Ct.width,Ct.height,A.format,A.type);for(const xt of A.layerUpdates){const Dt=Ct.data.subarray(xt*ft/Ct.data.BYTES_PER_ELEMENT,(xt+1)*ft/Ct.data.BYTES_PER_ELEMENT);i.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,xt,Ct.width,Ct.height,1,Ht,Kt,Dt)}A.clearLayerUpdates()}else i.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,Ct.width,Ct.height,Ct.depth,Ht,Kt,Ct.data)}else i.texImage3D(a.TEXTURE_2D_ARRAY,0,Wt,Ct.width,Ct.height,Ct.depth,0,Ht,Kt,Ct.data);else if(A.isData3DTexture)oe?(He&&i.texStorage3D(a.TEXTURE_3D,wt,Wt,Ct.width,Ct.height,Ct.depth),Y&&i.texSubImage3D(a.TEXTURE_3D,0,0,0,0,Ct.width,Ct.height,Ct.depth,Ht,Kt,Ct.data)):i.texImage3D(a.TEXTURE_3D,0,Wt,Ct.width,Ct.height,Ct.depth,0,Ht,Kt,Ct.data);else if(A.isFramebufferTexture){if(He)if(oe)i.texStorage2D(a.TEXTURE_2D,wt,Wt,Ct.width,Ct.height);else{let ft=Ct.width,xt=Ct.height;for(let Dt=0;Dt<wt;Dt++)i.texImage2D(a.TEXTURE_2D,Dt,Wt,ft,xt,0,Ht,Kt,null),ft>>=1,xt>>=1}}else if(ne.length>0){if(oe&&He){const ft=Yt(ne[0]);i.texStorage2D(a.TEXTURE_2D,wt,Wt,ft.width,ft.height)}for(let ft=0,xt=ne.length;ft<xt;ft++)zt=ne[ft],oe?Y&&i.texSubImage2D(a.TEXTURE_2D,ft,0,0,Ht,Kt,zt):i.texImage2D(a.TEXTURE_2D,ft,Wt,Ht,Kt,zt);A.generateMipmaps=!1}else if(oe){if(He){const ft=Yt(Ct);i.texStorage2D(a.TEXTURE_2D,wt,Wt,ft.width,ft.height)}Y&&i.texSubImage2D(a.TEXTURE_2D,0,0,0,Ht,Kt,Ct)}else i.texImage2D(a.TEXTURE_2D,0,Wt,Ht,Kt,Ct);x(A)&&_(gt),jt.__version=_t.version,A.onUpdate&&A.onUpdate(A)}O.__version=A.version}function dt(O,A,it){if(A.image.length!==6)return;const gt=Et(O,A),Tt=A.source;i.bindTexture(a.TEXTURE_CUBE_MAP,O.__webglTexture,a.TEXTURE0+it);const _t=r.get(Tt);if(Tt.version!==_t.__version||gt===!0){i.activeTexture(a.TEXTURE0+it);const jt=Ne.getPrimaries(Ne.workingColorSpace),Ut=A.colorSpace===yr?null:Ne.getPrimaries(A.colorSpace),Bt=A.colorSpace===yr||jt===Ut?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,A.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,A.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt);const xe=A.isCompressedTexture||A.image[0].isCompressedTexture,Ct=A.image[0]&&A.image[0].isDataTexture,Ht=[];for(let xt=0;xt<6;xt++)!xe&&!Ct?Ht[xt]=b(A.image[xt],!0,l.maxCubemapSize):Ht[xt]=Ct?A.image[xt].image:A.image[xt],Ht[xt]=ze(A,Ht[xt]);const Kt=Ht[0],Wt=u.convert(A.format,A.colorSpace),zt=u.convert(A.type),ne=D(A.internalFormat,Wt,zt,A.colorSpace),oe=A.isVideoTexture!==!0,He=_t.__version===void 0||gt===!0,Y=Tt.dataReady;let wt=V(A,Kt);at(a.TEXTURE_CUBE_MAP,A);let ft;if(xe){oe&&He&&i.texStorage2D(a.TEXTURE_CUBE_MAP,wt,ne,Kt.width,Kt.height);for(let xt=0;xt<6;xt++){ft=Ht[xt].mipmaps;for(let Dt=0;Dt<ft.length;Dt++){const Lt=ft[Dt];A.format!==Hi?Wt!==null?oe?Y&&i.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt,0,0,Lt.width,Lt.height,Wt,Lt.data):i.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt,ne,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?Y&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt,0,0,Lt.width,Lt.height,Wt,zt,Lt.data):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt,ne,Lt.width,Lt.height,0,Wt,zt,Lt.data)}}}else{if(ft=A.mipmaps,oe&&He){ft.length>0&&wt++;const xt=Yt(Ht[0]);i.texStorage2D(a.TEXTURE_CUBE_MAP,wt,ne,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(Ct){oe?Y&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Ht[xt].width,Ht[xt].height,Wt,zt,Ht[xt].data):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ne,Ht[xt].width,Ht[xt].height,0,Wt,zt,Ht[xt].data);for(let Dt=0;Dt<ft.length;Dt++){const ie=ft[Dt].image[xt].image;oe?Y&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt+1,0,0,ie.width,ie.height,Wt,zt,ie.data):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt+1,ne,ie.width,ie.height,0,Wt,zt,ie.data)}}else{oe?Y&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Wt,zt,Ht[xt]):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ne,Wt,zt,Ht[xt]);for(let Dt=0;Dt<ft.length;Dt++){const Lt=ft[Dt];oe?Y&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt+1,0,0,Wt,zt,Lt.image[xt]):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Dt+1,ne,Wt,zt,Lt.image[xt])}}}x(A)&&_(a.TEXTURE_CUBE_MAP),_t.__version=Tt.version,A.onUpdate&&A.onUpdate(A)}O.__version=A.version}function At(O,A,it,gt,Tt,_t){const jt=u.convert(it.format,it.colorSpace),Ut=u.convert(it.type),Bt=D(it.internalFormat,jt,Ut,it.colorSpace),xe=r.get(A),Ct=r.get(it);if(Ct.__renderTarget=A,!xe.__hasExternalTextures){const Ht=Math.max(1,A.width>>_t),Kt=Math.max(1,A.height>>_t);Tt===a.TEXTURE_3D||Tt===a.TEXTURE_2D_ARRAY?i.texImage3D(Tt,_t,Bt,Ht,Kt,A.depth,0,jt,Ut,null):i.texImage2D(Tt,_t,Bt,Ht,Kt,0,jt,Ut,null)}i.bindFramebuffer(a.FRAMEBUFFER,O),ye(A)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,gt,Tt,Ct.__webglTexture,0,pe(A)):(Tt===a.TEXTURE_2D||Tt>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&Tt<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,gt,Tt,Ct.__webglTexture,_t),i.bindFramebuffer(a.FRAMEBUFFER,null)}function Mt(O,A,it){if(a.bindRenderbuffer(a.RENDERBUFFER,O),A.depthBuffer){const gt=A.depthTexture,Tt=gt&&gt.isDepthTexture?gt.type:null,_t=R(A.stencilBuffer,Tt),jt=A.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Ut=pe(A);ye(A)?h.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Ut,_t,A.width,A.height):it?a.renderbufferStorageMultisample(a.RENDERBUFFER,Ut,_t,A.width,A.height):a.renderbufferStorage(a.RENDERBUFFER,_t,A.width,A.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,jt,a.RENDERBUFFER,O)}else{const gt=A.textures;for(let Tt=0;Tt<gt.length;Tt++){const _t=gt[Tt],jt=u.convert(_t.format,_t.colorSpace),Ut=u.convert(_t.type),Bt=D(_t.internalFormat,jt,Ut,_t.colorSpace),xe=pe(A);it&&ye(A)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,xe,Bt,A.width,A.height):ye(A)?h.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,xe,Bt,A.width,A.height):a.renderbufferStorage(a.RENDERBUFFER,Bt,A.width,A.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Xt(O,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(a.FRAMEBUFFER,O),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const gt=r.get(A.depthTexture);gt.__renderTarget=A,(!gt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),ht(A.depthTexture,0);const Tt=gt.__webglTexture,_t=pe(A);if(A.depthTexture.format===bo)ye(A)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,Tt,0,_t):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,Tt,0);else if(A.depthTexture.format===Xo)ye(A)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,Tt,0,_t):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,Tt,0);else throw new Error("Unknown depthTexture format")}function Vt(O){const A=r.get(O),it=O.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==O.depthTexture){const gt=O.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),gt){const Tt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,gt.removeEventListener("dispose",Tt)};gt.addEventListener("dispose",Tt),A.__depthDisposeCallback=Tt}A.__boundDepthTexture=gt}if(O.depthTexture&&!A.__autoAllocateDepthBuffer){if(it)throw new Error("target.depthTexture not supported in Cube render targets");Xt(A.__webglFramebuffer,O)}else if(it){A.__webglDepthbuffer=[];for(let gt=0;gt<6;gt++)if(i.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer[gt]),A.__webglDepthbuffer[gt]===void 0)A.__webglDepthbuffer[gt]=a.createRenderbuffer(),Mt(A.__webglDepthbuffer[gt],O,!1);else{const Tt=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,_t=A.__webglDepthbuffer[gt];a.bindRenderbuffer(a.RENDERBUFFER,_t),a.framebufferRenderbuffer(a.FRAMEBUFFER,Tt,a.RENDERBUFFER,_t)}}else if(i.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=a.createRenderbuffer(),Mt(A.__webglDepthbuffer,O,!1);else{const gt=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Tt=A.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,Tt),a.framebufferRenderbuffer(a.FRAMEBUFFER,gt,a.RENDERBUFFER,Tt)}i.bindFramebuffer(a.FRAMEBUFFER,null)}function se(O,A,it){const gt=r.get(O);A!==void 0&&At(gt.__webglFramebuffer,O,O.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),it!==void 0&&Vt(O)}function Be(O){const A=O.texture,it=r.get(O),gt=r.get(A);O.addEventListener("dispose",N);const Tt=O.textures,_t=O.isWebGLCubeRenderTarget===!0,jt=Tt.length>1;if(jt||(gt.__webglTexture===void 0&&(gt.__webglTexture=a.createTexture()),gt.__version=A.version,f.memory.textures++),_t){it.__webglFramebuffer=[];for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0){it.__webglFramebuffer[Ut]=[];for(let Bt=0;Bt<A.mipmaps.length;Bt++)it.__webglFramebuffer[Ut][Bt]=a.createFramebuffer()}else it.__webglFramebuffer[Ut]=a.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){it.__webglFramebuffer=[];for(let Ut=0;Ut<A.mipmaps.length;Ut++)it.__webglFramebuffer[Ut]=a.createFramebuffer()}else it.__webglFramebuffer=a.createFramebuffer();if(jt)for(let Ut=0,Bt=Tt.length;Ut<Bt;Ut++){const xe=r.get(Tt[Ut]);xe.__webglTexture===void 0&&(xe.__webglTexture=a.createTexture(),f.memory.textures++)}if(O.samples>0&&ye(O)===!1){it.__webglMultisampledFramebuffer=a.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(a.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let Ut=0;Ut<Tt.length;Ut++){const Bt=Tt[Ut];it.__webglColorRenderbuffer[Ut]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,it.__webglColorRenderbuffer[Ut]);const xe=u.convert(Bt.format,Bt.colorSpace),Ct=u.convert(Bt.type),Ht=D(Bt.internalFormat,xe,Ct,Bt.colorSpace,O.isXRRenderTarget===!0),Kt=pe(O);a.renderbufferStorageMultisample(a.RENDERBUFFER,Kt,Ht,O.width,O.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ut,a.RENDERBUFFER,it.__webglColorRenderbuffer[Ut])}a.bindRenderbuffer(a.RENDERBUFFER,null),O.depthBuffer&&(it.__webglDepthRenderbuffer=a.createRenderbuffer(),Mt(it.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(a.FRAMEBUFFER,null)}}if(_t){i.bindTexture(a.TEXTURE_CUBE_MAP,gt.__webglTexture),at(a.TEXTURE_CUBE_MAP,A);for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0)for(let Bt=0;Bt<A.mipmaps.length;Bt++)At(it.__webglFramebuffer[Ut][Bt],O,A,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,Bt);else At(it.__webglFramebuffer[Ut],O,A,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0);x(A)&&_(a.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(jt){for(let Ut=0,Bt=Tt.length;Ut<Bt;Ut++){const xe=Tt[Ut],Ct=r.get(xe);i.bindTexture(a.TEXTURE_2D,Ct.__webglTexture),at(a.TEXTURE_2D,xe),At(it.__webglFramebuffer,O,xe,a.COLOR_ATTACHMENT0+Ut,a.TEXTURE_2D,0),x(xe)&&_(a.TEXTURE_2D)}i.unbindTexture()}else{let Ut=a.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ut=O.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),i.bindTexture(Ut,gt.__webglTexture),at(Ut,A),A.mipmaps&&A.mipmaps.length>0)for(let Bt=0;Bt<A.mipmaps.length;Bt++)At(it.__webglFramebuffer[Bt],O,A,a.COLOR_ATTACHMENT0,Ut,Bt);else At(it.__webglFramebuffer,O,A,a.COLOR_ATTACHMENT0,Ut,0);x(A)&&_(Ut),i.unbindTexture()}O.depthBuffer&&Vt(O)}function me(O){const A=O.textures;for(let it=0,gt=A.length;it<gt;it++){const Tt=A[it];if(x(Tt)){const _t=L(O),jt=r.get(Tt).__webglTexture;i.bindTexture(_t,jt),_(_t),i.unbindTexture()}}}const Ke=[],q=[];function Nn(O){if(O.samples>0){if(ye(O)===!1){const A=O.textures,it=O.width,gt=O.height;let Tt=a.COLOR_BUFFER_BIT;const _t=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,jt=r.get(O),Ut=A.length>1;if(Ut)for(let Bt=0;Bt<A.length;Bt++)i.bindFramebuffer(a.FRAMEBUFFER,jt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Bt,a.RENDERBUFFER,null),i.bindFramebuffer(a.FRAMEBUFFER,jt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Bt,a.TEXTURE_2D,null,0);i.bindFramebuffer(a.READ_FRAMEBUFFER,jt.__webglMultisampledFramebuffer),i.bindFramebuffer(a.DRAW_FRAMEBUFFER,jt.__webglFramebuffer);for(let Bt=0;Bt<A.length;Bt++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(Tt|=a.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(Tt|=a.STENCIL_BUFFER_BIT)),Ut){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,jt.__webglColorRenderbuffer[Bt]);const xe=r.get(A[Bt]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,xe,0)}a.blitFramebuffer(0,0,it,gt,0,0,it,gt,Tt,a.NEAREST),p===!0&&(Ke.length=0,q.length=0,Ke.push(a.COLOR_ATTACHMENT0+Bt),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Ke.push(_t),q.push(_t),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,q)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Ke))}if(i.bindFramebuffer(a.READ_FRAMEBUFFER,null),i.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),Ut)for(let Bt=0;Bt<A.length;Bt++){i.bindFramebuffer(a.FRAMEBUFFER,jt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Bt,a.RENDERBUFFER,jt.__webglColorRenderbuffer[Bt]);const xe=r.get(A[Bt]).__webglTexture;i.bindFramebuffer(a.FRAMEBUFFER,jt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Bt,a.TEXTURE_2D,xe,0)}i.bindFramebuffer(a.DRAW_FRAMEBUFFER,jt.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&p){const A=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[A])}}}function pe(O){return Math.min(l.maxSamples,O.samples)}function ye(O){const A=r.get(O);return O.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Zt(O){const A=f.render.frame;g.get(O)!==A&&(g.set(O,A),O.update())}function ze(O,A){const it=O.colorSpace,gt=O.format,Tt=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||it!==qo&&it!==yr&&(Ne.getTransfer(it)===Xe?(gt!==Hi||Tt!==Ga)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",it)),A}function Yt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(m.width=O.naturalWidth||O.width,m.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(m.width=O.displayWidth,m.height=O.displayHeight):(m.width=O.width,m.height=O.height),m}this.allocateTextureUnit=ot,this.resetTextureUnits=ut,this.setTexture2D=ht,this.setTexture2DArray=I,this.setTexture3D=B,this.setTextureCube=W,this.rebindTextures=se,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=Nn,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=ye}function LD(a,t){function i(r,l=yr){let u;const f=Ne.getTransfer(l);if(r===Ga)return a.UNSIGNED_BYTE;if(r===Qm)return a.UNSIGNED_SHORT_4_4_4_4;if(r===Zm)return a.UNSIGNED_SHORT_5_5_5_1;if(r===dS)return a.UNSIGNED_INT_5_9_9_9_REV;if(r===fS)return a.BYTE;if(r===hS)return a.SHORT;if(r===su)return a.UNSIGNED_SHORT;if(r===Ym)return a.INT;if(r===bs)return a.UNSIGNED_INT;if(r===za)return a.FLOAT;if(r===pu)return a.HALF_FLOAT;if(r===pS)return a.ALPHA;if(r===mS)return a.RGB;if(r===Hi)return a.RGBA;if(r===gS)return a.LUMINANCE;if(r===vS)return a.LUMINANCE_ALPHA;if(r===bo)return a.DEPTH_COMPONENT;if(r===Xo)return a.DEPTH_STENCIL;if(r===_S)return a.RED;if(r===Km)return a.RED_INTEGER;if(r===yS)return a.RG;if(r===Jm)return a.RG_INTEGER;if(r===$m)return a.RGBA_INTEGER;if(r===sf||r===of||r===lf||r===uf)if(f===Xe)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===sf)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===of)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===lf)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===uf)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===sf)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===of)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===lf)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===uf)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===nm||r===im||r===am||r===rm)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===nm)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===im)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===am)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===rm)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===sm||r===om||r===lm)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(r===sm||r===om)return f===Xe?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===lm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===um||r===cm||r===fm||r===hm||r===dm||r===pm||r===mm||r===gm||r===vm||r===_m||r===ym||r===xm||r===Sm||r===Mm)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(r===um)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===cm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===fm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===hm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===dm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===pm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===mm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===gm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===vm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===_m)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ym)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===xm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Sm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Mm)return f===Xe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===cf||r===Em||r===bm)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(r===cf)return f===Xe?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Em)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===bm)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===xS||r===Tm||r===Am||r===Rm)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(r===cf)return u.COMPRESSED_RED_RGTC1_EXT;if(r===Tm)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Am)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Rm)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ko?a.UNSIGNED_INT_24_8:a[r]!==void 0?a[r]:null}return{convert:i}}const ND={type:"move"};class bp{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new lt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new lt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new lt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new lt),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const r of t.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,r){let l=null,u=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(m&&t.hand){f=!0;for(const b of t.hand.values()){const x=i.getJointPose(b,r),_=this._getHandJoint(m,b);x!==null&&(_.matrix.fromArray(x.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=x.radius),_.visible=x!==null}const g=m.joints["index-finger-tip"],v=m.joints["thumb-tip"],y=g.position.distanceTo(v.position),M=.02,E=.005;m.inputState.pinching&&y>M+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&y<=M-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(u=i.getPose(t.gripSpace,r),u!==null&&(p.matrix.fromArray(u.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,u.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(u.linearVelocity)):p.hasLinearVelocity=!1,u.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(u.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(l=i.getPose(t.targetRaySpace,r),l===null&&u!==null&&(l=u),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(ND)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=u!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const r=new nu;r.matrixAutoUpdate=!1,r.visible=!1,t.joints[i.jointName]=r,t.add(r)}return t.joints[i.jointName]}}const OD=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PD=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class zD{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,r){if(this.texture===null){const l=new ni,u=t.properties.get(l);u.__webglTexture=i.texture,(i.depthNear!=r.depthNear||i.depthFar!=r.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,r=new Nr({vertexShader:OD,fragmentShader:PD,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Gi(new wf(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class FD extends Ko{constructor(t,i){super();const r=this;let l=null,u=1,f=null,h="local-floor",p=1,m=null,g=null,v=null,y=null,M=null,E=null;const b=new zD,x=i.getContextAttributes();let _=null,L=null;const D=[],R=[],V=new We;let z=null;const N=new Ri;N.viewport=new un;const X=new Ri;X.viewport=new un;const U=[N,X],w=new nR;let k=null,ut=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let dt=D[J];return dt===void 0&&(dt=new bp,D[J]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(J){let dt=D[J];return dt===void 0&&(dt=new bp,D[J]=dt),dt.getGripSpace()},this.getHand=function(J){let dt=D[J];return dt===void 0&&(dt=new bp,D[J]=dt),dt.getHandSpace()};function ot(J){const dt=R.indexOf(J.inputSource);if(dt===-1)return;const At=D[dt];At!==void 0&&(At.update(J.inputSource,J.frame,m||f),At.dispatchEvent({type:J.type,data:J.inputSource}))}function mt(){l.removeEventListener("select",ot),l.removeEventListener("selectstart",ot),l.removeEventListener("selectend",ot),l.removeEventListener("squeeze",ot),l.removeEventListener("squeezestart",ot),l.removeEventListener("squeezeend",ot),l.removeEventListener("end",mt),l.removeEventListener("inputsourceschange",ht);for(let J=0;J<D.length;J++){const dt=R[J];dt!==null&&(R[J]=null,D[J].disconnect(dt))}k=null,ut=null,b.reset(),t.setRenderTarget(_),M=null,y=null,v=null,l=null,L=null,Et.stop(),r.isPresenting=!1,t.setPixelRatio(z),t.setSize(V.width,V.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){u=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){h=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(J){m=J},this.getBaseLayer=function(){return y!==null?y:M},this.getBinding=function(){return v},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(J){if(l=J,l!==null){if(_=t.getRenderTarget(),l.addEventListener("select",ot),l.addEventListener("selectstart",ot),l.addEventListener("selectend",ot),l.addEventListener("squeeze",ot),l.addEventListener("squeezestart",ot),l.addEventListener("squeezeend",ot),l.addEventListener("end",mt),l.addEventListener("inputsourceschange",ht),x.xrCompatible!==!0&&await i.makeXRCompatible(),z=t.getPixelRatio(),t.getSize(V),l.renderState.layers===void 0){const dt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,dt),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),L=new Ts(M.framebufferWidth,M.framebufferHeight,{format:Hi,type:Ga,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let dt=null,At=null,Mt=null;x.depth&&(Mt=x.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,dt=x.stencil?Xo:bo,At=x.stencil?ko:bs);const Xt={colorFormat:i.RGBA8,depthFormat:Mt,scaleFactor:u};v=new XRWebGLBinding(l,i),y=v.createProjectionLayer(Xt),l.updateRenderState({layers:[y]}),t.setPixelRatio(1),t.setSize(y.textureWidth,y.textureHeight,!1),L=new Ts(y.textureWidth,y.textureHeight,{format:Hi,type:Ga,depthTexture:new zS(y.textureWidth,y.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(h),Et.setContext(l),Et.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function ht(J){for(let dt=0;dt<J.removed.length;dt++){const At=J.removed[dt],Mt=R.indexOf(At);Mt>=0&&(R[Mt]=null,D[Mt].disconnect(At))}for(let dt=0;dt<J.added.length;dt++){const At=J.added[dt];let Mt=R.indexOf(At);if(Mt===-1){for(let Vt=0;Vt<D.length;Vt++)if(Vt>=R.length){R.push(At),Mt=Vt;break}else if(R[Vt]===null){R[Vt]=At,Mt=Vt;break}if(Mt===-1)break}const Xt=D[Mt];Xt&&Xt.connect(At)}}const I=new lt,B=new lt;function W(J,dt,At){I.setFromMatrixPosition(dt.matrixWorld),B.setFromMatrixPosition(At.matrixWorld);const Mt=I.distanceTo(B),Xt=dt.projectionMatrix.elements,Vt=At.projectionMatrix.elements,se=Xt[14]/(Xt[10]-1),Be=Xt[14]/(Xt[10]+1),me=(Xt[9]+1)/Xt[5],Ke=(Xt[9]-1)/Xt[5],q=(Xt[8]-1)/Xt[0],Nn=(Vt[8]+1)/Vt[0],pe=se*q,ye=se*Nn,Zt=Mt/(-q+Nn),ze=Zt*-q;if(dt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ze),J.translateZ(Zt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Xt[10]===-1)J.projectionMatrix.copy(dt.projectionMatrix),J.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const Yt=se+Zt,O=Be+Zt,A=pe-ze,it=ye+(Mt-ze),gt=me*Be/O*Yt,Tt=Ke*Be/O*Yt;J.projectionMatrix.makePerspective(A,it,gt,Tt,Yt,O),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function bt(J,dt){dt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(dt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(l===null)return;let dt=J.near,At=J.far;b.texture!==null&&(b.depthNear>0&&(dt=b.depthNear),b.depthFar>0&&(At=b.depthFar)),w.near=X.near=N.near=dt,w.far=X.far=N.far=At,(k!==w.near||ut!==w.far)&&(l.updateRenderState({depthNear:w.near,depthFar:w.far}),k=w.near,ut=w.far),N.layers.mask=J.layers.mask|2,X.layers.mask=J.layers.mask|4,w.layers.mask=N.layers.mask|X.layers.mask;const Mt=J.parent,Xt=w.cameras;bt(w,Mt);for(let Vt=0;Vt<Xt.length;Vt++)bt(Xt[Vt],Mt);Xt.length===2?W(w,N,X):w.projectionMatrix.copy(N.projectionMatrix),Rt(J,w,Mt)};function Rt(J,dt,At){At===null?J.matrix.copy(dt.matrixWorld):(J.matrix.copy(At.matrixWorld),J.matrix.invert(),J.matrix.multiply(dt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(dt.projectionMatrix),J.projectionMatrixInverse.copy(dt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Cm*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(y===null&&M===null))return p},this.setFoveation=function(J){p=J,y!==null&&(y.fixedFoveation=J),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=J)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(w)};let P=null;function at(J,dt){if(g=dt.getViewerPose(m||f),E=dt,g!==null){const At=g.views;M!==null&&(t.setRenderTargetFramebuffer(L,M.framebuffer),t.setRenderTarget(L));let Mt=!1;At.length!==w.cameras.length&&(w.cameras.length=0,Mt=!0);for(let Vt=0;Vt<At.length;Vt++){const se=At[Vt];let Be=null;if(M!==null)Be=M.getViewport(se);else{const Ke=v.getViewSubImage(y,se);Be=Ke.viewport,Vt===0&&(t.setRenderTargetTextures(L,Ke.colorTexture,y.ignoreDepthValues?void 0:Ke.depthStencilTexture),t.setRenderTarget(L))}let me=U[Vt];me===void 0&&(me=new Ri,me.layers.enable(Vt),me.viewport=new un,U[Vt]=me),me.matrix.fromArray(se.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(se.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Be.x,Be.y,Be.width,Be.height),Vt===0&&(w.matrix.copy(me.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),Mt===!0&&w.cameras.push(me)}const Xt=l.enabledFeatures;if(Xt&&Xt.includes("depth-sensing")){const Vt=v.getDepthInformation(At[0]);Vt&&Vt.isValid&&Vt.texture&&b.init(t,Vt,l.renderState)}}for(let At=0;At<D.length;At++){const Mt=R[At],Xt=D[At];Mt!==null&&Xt!==void 0&&Xt.update(Mt,dt,m||f)}P&&P(J,dt),dt.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:dt}),E=null}const Et=new FS;Et.setAnimationLoop(at),this.setAnimationLoop=function(J){P=J},this.dispose=function(){}}}const rs=new Va,ID=new cn;function BD(a,t){function i(x,_){x.matrixAutoUpdate===!0&&x.updateMatrix(),_.value.copy(x.matrix)}function r(x,_){_.color.getRGB(x.fogColor.value,DS(a)),_.isFog?(x.fogNear.value=_.near,x.fogFar.value=_.far):_.isFogExp2&&(x.fogDensity.value=_.density)}function l(x,_,L,D,R){_.isMeshBasicMaterial||_.isMeshLambertMaterial?u(x,_):_.isMeshToonMaterial?(u(x,_),v(x,_)):_.isMeshPhongMaterial?(u(x,_),g(x,_)):_.isMeshStandardMaterial?(u(x,_),y(x,_),_.isMeshPhysicalMaterial&&M(x,_,R)):_.isMeshMatcapMaterial?(u(x,_),E(x,_)):_.isMeshDepthMaterial?u(x,_):_.isMeshDistanceMaterial?(u(x,_),b(x,_)):_.isMeshNormalMaterial?u(x,_):_.isLineBasicMaterial?(f(x,_),_.isLineDashedMaterial&&h(x,_)):_.isPointsMaterial?p(x,_,L,D):_.isSpriteMaterial?m(x,_):_.isShadowMaterial?(x.color.value.copy(_.color),x.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function u(x,_){x.opacity.value=_.opacity,_.color&&x.diffuse.value.copy(_.color),_.emissive&&x.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(x.map.value=_.map,i(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,i(_.alphaMap,x.alphaMapTransform)),_.bumpMap&&(x.bumpMap.value=_.bumpMap,i(_.bumpMap,x.bumpMapTransform),x.bumpScale.value=_.bumpScale,_.side===ei&&(x.bumpScale.value*=-1)),_.normalMap&&(x.normalMap.value=_.normalMap,i(_.normalMap,x.normalMapTransform),x.normalScale.value.copy(_.normalScale),_.side===ei&&x.normalScale.value.negate()),_.displacementMap&&(x.displacementMap.value=_.displacementMap,i(_.displacementMap,x.displacementMapTransform),x.displacementScale.value=_.displacementScale,x.displacementBias.value=_.displacementBias),_.emissiveMap&&(x.emissiveMap.value=_.emissiveMap,i(_.emissiveMap,x.emissiveMapTransform)),_.specularMap&&(x.specularMap.value=_.specularMap,i(_.specularMap,x.specularMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest);const L=t.get(_),D=L.envMap,R=L.envMapRotation;D&&(x.envMap.value=D,rs.copy(R),rs.x*=-1,rs.y*=-1,rs.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(rs.y*=-1,rs.z*=-1),x.envMapRotation.value.setFromMatrix4(ID.makeRotationFromEuler(rs)),x.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=_.reflectivity,x.ior.value=_.ior,x.refractionRatio.value=_.refractionRatio),_.lightMap&&(x.lightMap.value=_.lightMap,x.lightMapIntensity.value=_.lightMapIntensity,i(_.lightMap,x.lightMapTransform)),_.aoMap&&(x.aoMap.value=_.aoMap,x.aoMapIntensity.value=_.aoMapIntensity,i(_.aoMap,x.aoMapTransform))}function f(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,_.map&&(x.map.value=_.map,i(_.map,x.mapTransform))}function h(x,_){x.dashSize.value=_.dashSize,x.totalSize.value=_.dashSize+_.gapSize,x.scale.value=_.scale}function p(x,_,L,D){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.size.value=_.size*L,x.scale.value=D*.5,_.map&&(x.map.value=_.map,i(_.map,x.uvTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,i(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function m(x,_){x.diffuse.value.copy(_.color),x.opacity.value=_.opacity,x.rotation.value=_.rotation,_.map&&(x.map.value=_.map,i(_.map,x.mapTransform)),_.alphaMap&&(x.alphaMap.value=_.alphaMap,i(_.alphaMap,x.alphaMapTransform)),_.alphaTest>0&&(x.alphaTest.value=_.alphaTest)}function g(x,_){x.specular.value.copy(_.specular),x.shininess.value=Math.max(_.shininess,1e-4)}function v(x,_){_.gradientMap&&(x.gradientMap.value=_.gradientMap)}function y(x,_){x.metalness.value=_.metalness,_.metalnessMap&&(x.metalnessMap.value=_.metalnessMap,i(_.metalnessMap,x.metalnessMapTransform)),x.roughness.value=_.roughness,_.roughnessMap&&(x.roughnessMap.value=_.roughnessMap,i(_.roughnessMap,x.roughnessMapTransform)),_.envMap&&(x.envMapIntensity.value=_.envMapIntensity)}function M(x,_,L){x.ior.value=_.ior,_.sheen>0&&(x.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),x.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(x.sheenColorMap.value=_.sheenColorMap,i(_.sheenColorMap,x.sheenColorMapTransform)),_.sheenRoughnessMap&&(x.sheenRoughnessMap.value=_.sheenRoughnessMap,i(_.sheenRoughnessMap,x.sheenRoughnessMapTransform))),_.clearcoat>0&&(x.clearcoat.value=_.clearcoat,x.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(x.clearcoatMap.value=_.clearcoatMap,i(_.clearcoatMap,x.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,i(_.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(x.clearcoatNormalMap.value=_.clearcoatNormalMap,i(_.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===ei&&x.clearcoatNormalScale.value.negate())),_.dispersion>0&&(x.dispersion.value=_.dispersion),_.iridescence>0&&(x.iridescence.value=_.iridescence,x.iridescenceIOR.value=_.iridescenceIOR,x.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(x.iridescenceMap.value=_.iridescenceMap,i(_.iridescenceMap,x.iridescenceMapTransform)),_.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=_.iridescenceThicknessMap,i(_.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),_.transmission>0&&(x.transmission.value=_.transmission,x.transmissionSamplerMap.value=L.texture,x.transmissionSamplerSize.value.set(L.width,L.height),_.transmissionMap&&(x.transmissionMap.value=_.transmissionMap,i(_.transmissionMap,x.transmissionMapTransform)),x.thickness.value=_.thickness,_.thicknessMap&&(x.thicknessMap.value=_.thicknessMap,i(_.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=_.attenuationDistance,x.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(x.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(x.anisotropyMap.value=_.anisotropyMap,i(_.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=_.specularIntensity,x.specularColor.value.copy(_.specularColor),_.specularColorMap&&(x.specularColorMap.value=_.specularColorMap,i(_.specularColorMap,x.specularColorMapTransform)),_.specularIntensityMap&&(x.specularIntensityMap.value=_.specularIntensityMap,i(_.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,_){_.matcap&&(x.matcap.value=_.matcap)}function b(x,_){const L=t.get(_).light;x.referencePosition.value.setFromMatrixPosition(L.matrixWorld),x.nearDistance.value=L.shadow.camera.near,x.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function HD(a,t,i,r){let l={},u={},f=[];const h=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function p(L,D){const R=D.program;r.uniformBlockBinding(L,R)}function m(L,D){let R=l[L.id];R===void 0&&(E(L),R=g(L),l[L.id]=R,L.addEventListener("dispose",x));const V=D.program;r.updateUBOMapping(L,V);const z=t.render.frame;u[L.id]!==z&&(y(L),u[L.id]=z)}function g(L){const D=v();L.__bindingPointIndex=D;const R=a.createBuffer(),V=L.__size,z=L.usage;return a.bindBuffer(a.UNIFORM_BUFFER,R),a.bufferData(a.UNIFORM_BUFFER,V,z),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,D,R),R}function v(){for(let L=0;L<h;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(L){const D=l[L.id],R=L.uniforms,V=L.__cache;a.bindBuffer(a.UNIFORM_BUFFER,D);for(let z=0,N=R.length;z<N;z++){const X=Array.isArray(R[z])?R[z]:[R[z]];for(let U=0,w=X.length;U<w;U++){const k=X[U];if(M(k,z,U,V)===!0){const ut=k.__offset,ot=Array.isArray(k.value)?k.value:[k.value];let mt=0;for(let ht=0;ht<ot.length;ht++){const I=ot[ht],B=b(I);typeof I=="number"||typeof I=="boolean"?(k.__data[0]=I,a.bufferSubData(a.UNIFORM_BUFFER,ut+mt,k.__data)):I.isMatrix3?(k.__data[0]=I.elements[0],k.__data[1]=I.elements[1],k.__data[2]=I.elements[2],k.__data[3]=0,k.__data[4]=I.elements[3],k.__data[5]=I.elements[4],k.__data[6]=I.elements[5],k.__data[7]=0,k.__data[8]=I.elements[6],k.__data[9]=I.elements[7],k.__data[10]=I.elements[8],k.__data[11]=0):(I.toArray(k.__data,mt),mt+=B.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,ut,k.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function M(L,D,R,V){const z=L.value,N=D+"_"+R;if(V[N]===void 0)return typeof z=="number"||typeof z=="boolean"?V[N]=z:V[N]=z.clone(),!0;{const X=V[N];if(typeof z=="number"||typeof z=="boolean"){if(X!==z)return V[N]=z,!0}else if(X.equals(z)===!1)return X.copy(z),!0}return!1}function E(L){const D=L.uniforms;let R=0;const V=16;for(let N=0,X=D.length;N<X;N++){const U=Array.isArray(D[N])?D[N]:[D[N]];for(let w=0,k=U.length;w<k;w++){const ut=U[w],ot=Array.isArray(ut.value)?ut.value:[ut.value];for(let mt=0,ht=ot.length;mt<ht;mt++){const I=ot[mt],B=b(I),W=R%V,bt=W%B.boundary,Rt=W+bt;R+=bt,Rt!==0&&V-Rt<B.storage&&(R+=V-Rt),ut.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),ut.__offset=R,R+=B.storage}}}const z=R%V;return z>0&&(R+=V-z),L.__size=R,L.__cache={},this}function b(L){const D={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(D.boundary=4,D.storage=4):L.isVector2?(D.boundary=8,D.storage=8):L.isVector3||L.isColor?(D.boundary=16,D.storage=12):L.isVector4?(D.boundary=16,D.storage=16):L.isMatrix3?(D.boundary=48,D.storage=48):L.isMatrix4?(D.boundary=64,D.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),D}function x(L){const D=L.target;D.removeEventListener("dispose",x);const R=f.indexOf(D.__bindingPointIndex);f.splice(R,1),a.deleteBuffer(l[D.id]),delete l[D.id],delete u[D.id]}function _(){for(const L in l)a.deleteBuffer(l[L]);f=[],l={},u={}}return{bind:p,update:m,dispose:_}}class GD{constructor(t={}){const{canvas:i=b1(),context:r=null,depth:l=!0,stencil:u=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:y=!1}=t;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),b=new Int32Array(4);let x=null,_=null;const L=[],D=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ai,this.toneMapping=Ur,this.toneMappingExposure=1;const R=this;let V=!1,z=0,N=0,X=null,U=-1,w=null;const k=new un,ut=new un;let ot=null;const mt=new Ce(0);let ht=0,I=i.width,B=i.height,W=1,bt=null,Rt=null;const P=new un(0,0,I,B),at=new un(0,0,I,B);let Et=!1;const J=new NS;let dt=!1,At=!1;const Mt=new cn,Xt=new cn,Vt=new lt,se=new un,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Ke(){return X===null?W:1}let q=r;function Nn(C,Q){return i.getContext(C,Q)}try{const C={alpha:!0,depth:l,stencil:u,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Wm}`),i.addEventListener("webglcontextlost",xt,!1),i.addEventListener("webglcontextrestored",Dt,!1),i.addEventListener("webglcontextcreationerror",Lt,!1),q===null){const Q="webgl2";if(q=Nn(Q,C),q===null)throw Nn(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let pe,ye,Zt,ze,Yt,O,A,it,gt,Tt,_t,jt,Ut,Bt,xe,Ct,Ht,Kt,Wt,zt,ne,oe,He,Y;function wt(){pe=new Zw(q),pe.init(),oe=new LD(q,pe),ye=new Xw(q,pe,t,oe),Zt=new DD(q,pe),ye.reverseDepthBuffer&&y&&Zt.buffers.depth.setReversed(!0),ze=new $w(q),Yt=new vD,O=new UD(q,pe,Zt,Yt,ye,oe,ze),A=new jw(R),it=new Qw(R),gt=new sR(q),He=new Vw(q,gt),Tt=new Kw(q,gt,ze,He),_t=new e2(q,Tt,gt,ze),Wt=new t2(q,ye,O),Ct=new qw(Yt),jt=new gD(R,A,it,pe,ye,He,Ct),Ut=new BD(R,Yt),Bt=new yD,xe=new TD(pe),Kt=new Gw(R,A,it,Zt,_t,M,p),Ht=new CD(R,_t,ye),Y=new HD(q,ze,ye,Zt),zt=new kw(q,pe,ze),ne=new Jw(q,pe,ze),ze.programs=jt.programs,R.capabilities=ye,R.extensions=pe,R.properties=Yt,R.renderLists=Bt,R.shadowMap=Ht,R.state=Zt,R.info=ze}wt();const ft=new FD(R,q);this.xr=ft,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const C=pe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=pe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(C){C!==void 0&&(W=C,this.setSize(I,B,!1))},this.getSize=function(C){return C.set(I,B)},this.setSize=function(C,Q,rt=!0){if(ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=C,B=Q,i.width=Math.floor(C*W),i.height=Math.floor(Q*W),rt===!0&&(i.style.width=C+"px",i.style.height=Q+"px"),this.setViewport(0,0,C,Q)},this.getDrawingBufferSize=function(C){return C.set(I*W,B*W).floor()},this.setDrawingBufferSize=function(C,Q,rt){I=C,B=Q,W=rt,i.width=Math.floor(C*rt),i.height=Math.floor(Q*rt),this.setViewport(0,0,C,Q)},this.getCurrentViewport=function(C){return C.copy(k)},this.getViewport=function(C){return C.copy(P)},this.setViewport=function(C,Q,rt,st){C.isVector4?P.set(C.x,C.y,C.z,C.w):P.set(C,Q,rt,st),Zt.viewport(k.copy(P).multiplyScalar(W).round())},this.getScissor=function(C){return C.copy(at)},this.setScissor=function(C,Q,rt,st){C.isVector4?at.set(C.x,C.y,C.z,C.w):at.set(C,Q,rt,st),Zt.scissor(ut.copy(at).multiplyScalar(W).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(C){Zt.setScissorTest(Et=C)},this.setOpaqueSort=function(C){bt=C},this.setTransparentSort=function(C){Rt=C},this.getClearColor=function(C){return C.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(C=!0,Q=!0,rt=!0){let st=0;if(C){let Z=!1;if(X!==null){const St=X.texture.format;Z=St===$m||St===Jm||St===Km}if(Z){const St=X.texture.type,Nt=St===Ga||St===bs||St===su||St===ko||St===Qm||St===Zm,It=Kt.getClearColor(),Ft=Kt.getClearAlpha(),te=It.r,ae=It.g,Jt=It.b;Nt?(E[0]=te,E[1]=ae,E[2]=Jt,E[3]=Ft,q.clearBufferuiv(q.COLOR,0,E)):(b[0]=te,b[1]=ae,b[2]=Jt,b[3]=Ft,q.clearBufferiv(q.COLOR,0,b))}else st|=q.COLOR_BUFFER_BIT}Q&&(st|=q.DEPTH_BUFFER_BIT),rt&&(st|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",xt,!1),i.removeEventListener("webglcontextrestored",Dt,!1),i.removeEventListener("webglcontextcreationerror",Lt,!1),Kt.dispose(),Bt.dispose(),xe.dispose(),Yt.dispose(),A.dispose(),it.dispose(),_t.dispose(),He.dispose(),Y.dispose(),jt.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",tl),ft.removeEventListener("sessionend",el),qi.stop()};function xt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function Dt(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;const C=ze.autoReset,Q=Ht.enabled,rt=Ht.autoUpdate,st=Ht.needsUpdate,Z=Ht.type;wt(),ze.autoReset=C,Ht.enabled=Q,Ht.autoUpdate=rt,Ht.needsUpdate=st,Ht.type=Z}function Lt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ie(C){const Q=C.target;Q.removeEventListener("dispose",ie),Je(Q)}function Je(C){vn(C),Yt.remove(C)}function vn(C){const Q=Yt.get(C).programs;Q!==void 0&&(Q.forEach(function(rt){jt.releaseProgram(rt)}),C.isShaderMaterial&&jt.releaseShaderCache(C))}this.renderBufferDirect=function(C,Q,rt,st,Z,St){Q===null&&(Q=Be);const Nt=Z.isMesh&&Z.matrixWorld.determinant()<0,It=il(C,Q,rt,st,Z);Zt.setMaterial(st,Nt);let Ft=rt.index,te=1;if(st.wireframe===!0){if(Ft=Tt.getWireframeAttribute(rt),Ft===void 0)return;te=2}const ae=rt.drawRange,Jt=rt.attributes.position;let Se=ae.start*te,we=(ae.start+ae.count)*te;St!==null&&(Se=Math.max(Se,St.start*te),we=Math.min(we,(St.start+St.count)*te)),Ft!==null?(Se=Math.max(Se,0),we=Math.min(we,Ft.count)):Jt!=null&&(Se=Math.max(Se,0),we=Math.min(we,Jt.count));const Ye=we-Se;if(Ye<0||Ye===1/0)return;He.setup(Z,st,It,rt,Ft);let qe,le=zt;if(Ft!==null&&(qe=gt.get(Ft),le=ne,le.setIndex(qe)),Z.isMesh)st.wireframe===!0?(Zt.setLineWidth(st.wireframeLinewidth*Ke()),le.setMode(q.LINES)):le.setMode(q.TRIANGLES);else if(Z.isLine){let kt=st.linewidth;kt===void 0&&(kt=1),Zt.setLineWidth(kt*Ke()),Z.isLineSegments?le.setMode(q.LINES):Z.isLineLoop?le.setMode(q.LINE_LOOP):le.setMode(q.LINE_STRIP)}else Z.isPoints?le.setMode(q.POINTS):Z.isSprite&&le.setMode(q.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)le.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(pe.get("WEBGL_multi_draw"))le.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const kt=Z._multiDrawStarts,fn=Z._multiDrawCounts,De=Z._multiDrawCount,Hn=Ft?gt.get(Ft).bytesPerElement:1,sa=Yt.get(st).currentProgram.getUniforms();for(let En=0;En<De;En++)sa.setValue(q,"_gl_DrawID",En),le.render(kt[En]/Hn,fn[En])}else if(Z.isInstancedMesh)le.renderInstances(Se,Ye,Z.count);else if(rt.isInstancedBufferGeometry){const kt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,fn=Math.min(rt.instanceCount,kt);le.renderInstances(Se,Ye,fn)}else le.render(Se,Ye)};function Re(C,Q,rt){C.transparent===!0&&C.side===Pa&&C.forceSinglePass===!1?(C.side=ei,C.needsUpdate=!0,en(C,Q,rt),C.side=Lr,C.needsUpdate=!0,en(C,Q,rt),C.side=Pa):en(C,Q,rt)}this.compile=function(C,Q,rt=null){rt===null&&(rt=C),_=xe.get(rt),_.init(Q),D.push(_),rt.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Q.layers)&&(_.pushLight(Z),Z.castShadow&&_.pushShadow(Z))}),C!==rt&&C.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Q.layers)&&(_.pushLight(Z),Z.castShadow&&_.pushShadow(Z))}),_.setupLights();const st=new Set;return C.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const St=Z.material;if(St)if(Array.isArray(St))for(let Nt=0;Nt<St.length;Nt++){const It=St[Nt];Re(It,rt,Z),st.add(It)}else Re(St,rt,Z),st.add(St)}),D.pop(),_=null,st},this.compileAsync=function(C,Q,rt=null){const st=this.compile(C,Q,rt);return new Promise(Z=>{function St(){if(st.forEach(function(Nt){Yt.get(Nt).currentProgram.isReady()&&st.delete(Nt)}),st.size===0){Z(C);return}setTimeout(St,10)}pe.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let Rn=null;function Di(C){Rn&&Rn(C)}function tl(){qi.stop()}function el(){qi.start()}const qi=new FS;qi.setAnimationLoop(Di),typeof self<"u"&&qi.setContext(self),this.setAnimationLoop=function(C){Rn=C,ft.setAnimationLoop(C),C===null?qi.stop():qi.start()},ft.addEventListener("sessionstart",tl),ft.addEventListener("sessionend",el),this.render=function(C,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(Q),Q=ft.getCamera()),C.isScene===!0&&C.onBeforeRender(R,C,Q,X),_=xe.get(C,D.length),_.init(Q),D.push(_),Xt.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),J.setFromProjectionMatrix(Xt),At=this.localClippingEnabled,dt=Ct.init(this.clippingPlanes,At),x=Bt.get(C,L.length),x.init(),L.push(x),ft.enabled===!0&&ft.isPresenting===!0){const St=R.xr.getDepthSensingMesh();St!==null&&Or(St,Q,-1/0,R.sortObjects)}Or(C,Q,0,R.sortObjects),x.finish(),R.sortObjects===!0&&x.sort(bt,Rt),me=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,me&&Kt.addToRenderList(x,C),this.info.render.frame++,dt===!0&&Ct.beginShadows();const rt=_.state.shadowsArray;Ht.render(rt,C,Q),dt===!0&&Ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const st=x.opaque,Z=x.transmissive;if(_.setupLights(),Q.isArrayCamera){const St=Q.cameras;if(Z.length>0)for(let Nt=0,It=St.length;Nt<It;Nt++){const Ft=St[Nt];nl(st,Z,C,Ft)}me&&Kt.render(C);for(let Nt=0,It=St.length;Nt<It;Nt++){const Ft=St[Nt];As(x,C,Ft,Ft.viewport)}}else Z.length>0&&nl(st,Z,C,Q),me&&Kt.render(C),As(x,C,Q);X!==null&&(O.updateMultisampleRenderTarget(X),O.updateRenderTargetMipmap(X)),C.isScene===!0&&C.onAfterRender(R,C,Q),He.resetDefaultState(),U=-1,w=null,D.pop(),D.length>0?(_=D[D.length-1],dt===!0&&Ct.setGlobalState(R.clippingPlanes,_.state.camera)):_=null,L.pop(),L.length>0?x=L[L.length-1]:x=null};function Or(C,Q,rt,st){if(C.visible===!1)return;if(C.layers.test(Q.layers)){if(C.isGroup)rt=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(Q);else if(C.isLight)_.pushLight(C),C.castShadow&&_.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||J.intersectsSprite(C)){st&&se.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Xt);const Nt=_t.update(C),It=C.material;It.visible&&x.push(C,Nt,It,rt,se.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||J.intersectsObject(C))){const Nt=_t.update(C),It=C.material;if(st&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),se.copy(C.boundingSphere.center)):(Nt.boundingSphere===null&&Nt.computeBoundingSphere(),se.copy(Nt.boundingSphere.center)),se.applyMatrix4(C.matrixWorld).applyMatrix4(Xt)),Array.isArray(It)){const Ft=Nt.groups;for(let te=0,ae=Ft.length;te<ae;te++){const Jt=Ft[te],Se=It[Jt.materialIndex];Se&&Se.visible&&x.push(C,Nt,Se,rt,se.z,Jt)}}else It.visible&&x.push(C,Nt,It,rt,se.z,null)}}const St=C.children;for(let Nt=0,It=St.length;Nt<It;Nt++)Or(St[Nt],Q,rt,st)}function As(C,Q,rt,st){const Z=C.opaque,St=C.transmissive,Nt=C.transparent;_.setupLightsView(rt),dt===!0&&Ct.setGlobalState(R.clippingPlanes,rt),st&&Zt.viewport(k.copy(st)),Z.length>0&&Pr(Z,Q,rt),St.length>0&&Pr(St,Q,rt),Nt.length>0&&Pr(Nt,Q,rt),Zt.buffers.depth.setTest(!0),Zt.buffers.depth.setMask(!0),Zt.buffers.color.setMask(!0),Zt.setPolygonOffset(!1)}function nl(C,Q,rt,st){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[st.id]===void 0&&(_.state.transmissionRenderTarget[st.id]=new Ts(1,1,{generateMipmaps:!0,type:pe.has("EXT_color_buffer_half_float")||pe.has("EXT_color_buffer_float")?pu:Ga,minFilter:ds,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ne.workingColorSpace}));const St=_.state.transmissionRenderTarget[st.id],Nt=st.viewport||k;St.setSize(Nt.z,Nt.w);const It=R.getRenderTarget();R.setRenderTarget(St),R.getClearColor(mt),ht=R.getClearAlpha(),ht<1&&R.setClearColor(16777215,.5),R.clear(),me&&Kt.render(rt);const Ft=R.toneMapping;R.toneMapping=Ur;const te=st.viewport;if(st.viewport!==void 0&&(st.viewport=void 0),_.setupLightsView(st),dt===!0&&Ct.setGlobalState(R.clippingPlanes,st),Pr(C,rt,st),O.updateMultisampleRenderTarget(St),O.updateRenderTargetMipmap(St),pe.has("WEBGL_multisampled_render_to_texture")===!1){let ae=!1;for(let Jt=0,Se=Q.length;Jt<Se;Jt++){const we=Q[Jt],Ye=we.object,qe=we.geometry,le=we.material,kt=we.group;if(le.side===Pa&&Ye.layers.test(st.layers)){const fn=le.side;le.side=ei,le.needsUpdate=!0,Ui(Ye,rt,st,qe,le,kt),le.side=fn,le.needsUpdate=!0,ae=!0}}ae===!0&&(O.updateMultisampleRenderTarget(St),O.updateRenderTargetMipmap(St))}R.setRenderTarget(It),R.setClearColor(mt,ht),te!==void 0&&(st.viewport=te),R.toneMapping=Ft}function Pr(C,Q,rt){const st=Q.isScene===!0?Q.overrideMaterial:null;for(let Z=0,St=C.length;Z<St;Z++){const Nt=C[Z],It=Nt.object,Ft=Nt.geometry,te=st===null?Nt.material:st,ae=Nt.group;It.layers.test(rt.layers)&&Ui(It,Q,rt,Ft,te,ae)}}function Ui(C,Q,rt,st,Z,St){C.onBeforeRender(R,Q,rt,st,Z,St),C.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Z.onBeforeRender(R,Q,rt,st,C,St),Z.transparent===!0&&Z.side===Pa&&Z.forceSinglePass===!1?(Z.side=ei,Z.needsUpdate=!0,R.renderBufferDirect(rt,Q,st,Z,C,St),Z.side=Lr,Z.needsUpdate=!0,R.renderBufferDirect(rt,Q,st,Z,C,St),Z.side=Pa):R.renderBufferDirect(rt,Q,st,Z,C,St),C.onAfterRender(R,Q,rt,st,Z,St)}function en(C,Q,rt){Q.isScene!==!0&&(Q=Be);const st=Yt.get(C),Z=_.state.lights,St=_.state.shadowsArray,Nt=Z.state.version,It=jt.getParameters(C,Z.state,St,Q,rt),Ft=jt.getProgramCacheKey(It);let te=st.programs;st.environment=C.isMeshStandardMaterial?Q.environment:null,st.fog=Q.fog,st.envMap=(C.isMeshStandardMaterial?it:A).get(C.envMap||st.environment),st.envMapRotation=st.environment!==null&&C.envMap===null?Q.environmentRotation:C.envMapRotation,te===void 0&&(C.addEventListener("dispose",ie),te=new Map,st.programs=te);let ae=te.get(Ft);if(ae!==void 0){if(st.currentProgram===ae&&st.lightsStateVersion===Nt)return ra(C,It),ae}else It.uniforms=jt.getUniforms(C),C.onBeforeCompile(It,R),ae=jt.acquireProgram(It,Ft),te.set(Ft,ae),st.uniforms=It.uniforms;const Jt=st.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Jt.clippingPlanes=Ct.uniform),ra(C,It),st.needsLights=Lf(C),st.lightsStateVersion=Nt,st.needsLights&&(Jt.ambientLightColor.value=Z.state.ambient,Jt.lightProbe.value=Z.state.probe,Jt.directionalLights.value=Z.state.directional,Jt.directionalLightShadows.value=Z.state.directionalShadow,Jt.spotLights.value=Z.state.spot,Jt.spotLightShadows.value=Z.state.spotShadow,Jt.rectAreaLights.value=Z.state.rectArea,Jt.ltc_1.value=Z.state.rectAreaLTC1,Jt.ltc_2.value=Z.state.rectAreaLTC2,Jt.pointLights.value=Z.state.point,Jt.pointLightShadows.value=Z.state.pointShadow,Jt.hemisphereLights.value=Z.state.hemi,Jt.directionalShadowMap.value=Z.state.directionalShadowMap,Jt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Jt.spotShadowMap.value=Z.state.spotShadowMap,Jt.spotLightMatrix.value=Z.state.spotLightMatrix,Jt.spotLightMap.value=Z.state.spotLightMap,Jt.pointShadowMap.value=Z.state.pointShadowMap,Jt.pointShadowMatrix.value=Z.state.pointShadowMatrix),st.currentProgram=ae,st.uniformsList=null,ae}function Cn(C){if(C.uniformsList===null){const Q=C.currentProgram.getUniforms();C.uniformsList=ff.seqWithValue(Q.seq,C.uniforms)}return C.uniformsList}function ra(C,Q){const rt=Yt.get(C);rt.outputColorSpace=Q.outputColorSpace,rt.batching=Q.batching,rt.batchingColor=Q.batchingColor,rt.instancing=Q.instancing,rt.instancingColor=Q.instancingColor,rt.instancingMorph=Q.instancingMorph,rt.skinning=Q.skinning,rt.morphTargets=Q.morphTargets,rt.morphNormals=Q.morphNormals,rt.morphColors=Q.morphColors,rt.morphTargetsCount=Q.morphTargetsCount,rt.numClippingPlanes=Q.numClippingPlanes,rt.numIntersection=Q.numClipIntersection,rt.vertexAlphas=Q.vertexAlphas,rt.vertexTangents=Q.vertexTangents,rt.toneMapping=Q.toneMapping}function il(C,Q,rt,st,Z){Q.isScene!==!0&&(Q=Be),O.resetTextureUnits();const St=Q.fog,Nt=st.isMeshStandardMaterial?Q.environment:null,It=X===null?R.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:qo,Ft=(st.isMeshStandardMaterial?it:A).get(st.envMap||Nt),te=st.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,ae=!!rt.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),Jt=!!rt.morphAttributes.position,Se=!!rt.morphAttributes.normal,we=!!rt.morphAttributes.color;let Ye=Ur;st.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Ye=R.toneMapping);const qe=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,le=qe!==void 0?qe.length:0,kt=Yt.get(st),fn=_.state.lights;if(dt===!0&&(At===!0||C!==w)){const _n=C===w&&st.id===U;Ct.setState(st,C,_n)}let De=!1;st.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==fn.state.version||kt.outputColorSpace!==It||Z.isBatchedMesh&&kt.batching===!1||!Z.isBatchedMesh&&kt.batching===!0||Z.isBatchedMesh&&kt.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&kt.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&kt.instancing===!1||!Z.isInstancedMesh&&kt.instancing===!0||Z.isSkinnedMesh&&kt.skinning===!1||!Z.isSkinnedMesh&&kt.skinning===!0||Z.isInstancedMesh&&kt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&kt.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&kt.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&kt.instancingMorph===!1&&Z.morphTexture!==null||kt.envMap!==Ft||st.fog===!0&&kt.fog!==St||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==Ct.numPlanes||kt.numIntersection!==Ct.numIntersection)||kt.vertexAlphas!==te||kt.vertexTangents!==ae||kt.morphTargets!==Jt||kt.morphNormals!==Se||kt.morphColors!==we||kt.toneMapping!==Ye||kt.morphTargetsCount!==le)&&(De=!0):(De=!0,kt.__version=st.version);let Hn=kt.currentProgram;De===!0&&(Hn=en(st,Q,Z));let sa=!1,En=!1,Fr=!1;const ge=Hn.getUniforms(),On=kt.uniforms;if(Zt.useProgram(Hn.program)&&(sa=!0,En=!0,Fr=!0),st.id!==U&&(U=st.id,En=!0),sa||w!==C){Zt.buffers.depth.getReversed()?(Mt.copy(C.projectionMatrix),A1(Mt),R1(Mt),ge.setValue(q,"projectionMatrix",Mt)):ge.setValue(q,"projectionMatrix",C.projectionMatrix),ge.setValue(q,"viewMatrix",C.matrixWorldInverse);const sn=ge.map.cameraPosition;sn!==void 0&&sn.setValue(q,Vt.setFromMatrixPosition(C.matrixWorld)),ye.logarithmicDepthBuffer&&ge.setValue(q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&ge.setValue(q,"isOrthographic",C.isOrthographicCamera===!0),w!==C&&(w=C,En=!0,Fr=!0)}if(Z.isSkinnedMesh){ge.setOptional(q,Z,"bindMatrix"),ge.setOptional(q,Z,"bindMatrixInverse");const _n=Z.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),ge.setValue(q,"boneTexture",_n.boneTexture,O))}Z.isBatchedMesh&&(ge.setOptional(q,Z,"batchingTexture"),ge.setValue(q,"batchingTexture",Z._matricesTexture,O),ge.setOptional(q,Z,"batchingIdTexture"),ge.setValue(q,"batchingIdTexture",Z._indirectTexture,O),ge.setOptional(q,Z,"batchingColorTexture"),Z._colorsTexture!==null&&ge.setValue(q,"batchingColorTexture",Z._colorsTexture,O));const Gn=rt.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&Wt.update(Z,rt,Hn),(En||kt.receiveShadow!==Z.receiveShadow)&&(kt.receiveShadow=Z.receiveShadow,ge.setValue(q,"receiveShadow",Z.receiveShadow)),st.isMeshGouraudMaterial&&st.envMap!==null&&(On.envMap.value=Ft,On.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),st.isMeshStandardMaterial&&st.envMap===null&&Q.environment!==null&&(On.envMapIntensity.value=Q.environmentIntensity),En&&(ge.setValue(q,"toneMappingExposure",R.toneMappingExposure),kt.needsLights&&Uf(On,Fr),St&&st.fog===!0&&Ut.refreshFogUniforms(On,St),Ut.refreshMaterialUniforms(On,st,W,B,_.state.transmissionRenderTarget[C.id]),ff.upload(q,Cn(kt),On,O)),st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(ff.upload(q,Cn(kt),On,O),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&ge.setValue(q,"center",Z.center),ge.setValue(q,"modelViewMatrix",Z.modelViewMatrix),ge.setValue(q,"normalMatrix",Z.normalMatrix),ge.setValue(q,"modelMatrix",Z.matrixWorld),st.isShaderMaterial||st.isRawShaderMaterial){const _n=st.uniformsGroups;for(let sn=0,Rs=_n.length;sn<Rs;sn++){const ji=_n[sn];Y.update(ji,Hn),Y.bind(ji,Hn)}}return Hn}function Uf(C,Q){C.ambientLightColor.needsUpdate=Q,C.lightProbe.needsUpdate=Q,C.directionalLights.needsUpdate=Q,C.directionalLightShadows.needsUpdate=Q,C.pointLights.needsUpdate=Q,C.pointLightShadows.needsUpdate=Q,C.spotLights.needsUpdate=Q,C.spotLightShadows.needsUpdate=Q,C.rectAreaLights.needsUpdate=Q,C.hemisphereLights.needsUpdate=Q}function Lf(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(C,Q,rt){Yt.get(C.texture).__webglTexture=Q,Yt.get(C.depthTexture).__webglTexture=rt;const st=Yt.get(C);st.__hasExternalTextures=!0,st.__autoAllocateDepthBuffer=rt===void 0,st.__autoAllocateDepthBuffer||pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),st.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,Q){const rt=Yt.get(C);rt.__webglFramebuffer=Q,rt.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(C,Q=0,rt=0){X=C,z=Q,N=rt;let st=!0,Z=null,St=!1,Nt=!1;if(C){const Ft=Yt.get(C);if(Ft.__useDefaultFramebuffer!==void 0)Zt.bindFramebuffer(q.FRAMEBUFFER,null),st=!1;else if(Ft.__webglFramebuffer===void 0)O.setupRenderTarget(C);else if(Ft.__hasExternalTextures)O.rebindTextures(C,Yt.get(C.texture).__webglTexture,Yt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Jt=C.depthTexture;if(Ft.__boundDepthTexture!==Jt){if(Jt!==null&&Yt.has(Jt)&&(C.width!==Jt.image.width||C.height!==Jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(C)}}const te=C.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(Nt=!0);const ae=Yt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(ae[Q])?Z=ae[Q][rt]:Z=ae[Q],St=!0):C.samples>0&&O.useMultisampledRTT(C)===!1?Z=Yt.get(C).__webglMultisampledFramebuffer:Array.isArray(ae)?Z=ae[rt]:Z=ae,k.copy(C.viewport),ut.copy(C.scissor),ot=C.scissorTest}else k.copy(P).multiplyScalar(W).floor(),ut.copy(at).multiplyScalar(W).floor(),ot=Et;if(Zt.bindFramebuffer(q.FRAMEBUFFER,Z)&&st&&Zt.drawBuffers(C,Z),Zt.viewport(k),Zt.scissor(ut),Zt.setScissorTest(ot),St){const Ft=Yt.get(C.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ft.__webglTexture,rt)}else if(Nt){const Ft=Yt.get(C.texture),te=Q||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ft.__webglTexture,rt||0,te)}U=-1},this.readRenderTargetPixels=function(C,Q,rt,st,Z,St,Nt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=Yt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Nt!==void 0&&(It=It[Nt]),It){Zt.bindFramebuffer(q.FRAMEBUFFER,It);try{const Ft=C.texture,te=Ft.format,ae=Ft.type;if(!ye.textureFormatReadable(te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ye.textureTypeReadable(ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=C.width-st&&rt>=0&&rt<=C.height-Z&&q.readPixels(Q,rt,st,Z,oe.convert(te),oe.convert(ae),St)}finally{const Ft=X!==null?Yt.get(X).__webglFramebuffer:null;Zt.bindFramebuffer(q.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(C,Q,rt,st,Z,St,Nt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=Yt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Nt!==void 0&&(It=It[Nt]),It){const Ft=C.texture,te=Ft.format,ae=Ft.type;if(!ye.textureFormatReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ye.textureTypeReadable(ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Q>=0&&Q<=C.width-st&&rt>=0&&rt<=C.height-Z){Zt.bindFramebuffer(q.FRAMEBUFFER,It);const Jt=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Jt),q.bufferData(q.PIXEL_PACK_BUFFER,St.byteLength,q.STREAM_READ),q.readPixels(Q,rt,st,Z,oe.convert(te),oe.convert(ae),0);const Se=X!==null?Yt.get(X).__webglFramebuffer:null;Zt.bindFramebuffer(q.FRAMEBUFFER,Se);const we=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await T1(q,we,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Jt),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,St),q.deleteBuffer(Jt),q.deleteSync(we),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,Q=null,rt=0){C.isTexture!==!0&&(So("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Q=arguments[0]||null,C=arguments[1]);const st=Math.pow(2,-rt),Z=Math.floor(C.image.width*st),St=Math.floor(C.image.height*st),Nt=Q!==null?Q.x:0,It=Q!==null?Q.y:0;O.setTexture2D(C,0),q.copyTexSubImage2D(q.TEXTURE_2D,rt,0,0,Nt,It,Z,St),Zt.unbindTexture()};const yu=q.createFramebuffer(),zr=q.createFramebuffer();this.copyTextureToTexture=function(C,Q,rt=null,st=null,Z=0,St=null){C.isTexture!==!0&&(So("WebGLRenderer: copyTextureToTexture function signature has changed."),st=arguments[0]||null,C=arguments[1],Q=arguments[2],St=arguments[3]||0,rt=null),St===null&&(Z!==0?(So("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),St=Z,Z=0):St=0);let Nt,It,Ft,te,ae,Jt,Se,we,Ye;const qe=C.isCompressedTexture?C.mipmaps[St]:C.image;if(rt!==null)Nt=rt.max.x-rt.min.x,It=rt.max.y-rt.min.y,Ft=rt.isBox3?rt.max.z-rt.min.z:1,te=rt.min.x,ae=rt.min.y,Jt=rt.isBox3?rt.min.z:0;else{const Gn=Math.pow(2,-Z);Nt=Math.floor(qe.width*Gn),It=Math.floor(qe.height*Gn),C.isDataArrayTexture?Ft=qe.depth:C.isData3DTexture?Ft=Math.floor(qe.depth*Gn):Ft=1,te=0,ae=0,Jt=0}st!==null?(Se=st.x,we=st.y,Ye=st.z):(Se=0,we=0,Ye=0);const le=oe.convert(Q.format),kt=oe.convert(Q.type);let fn;Q.isData3DTexture?(O.setTexture3D(Q,0),fn=q.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(O.setTexture2DArray(Q,0),fn=q.TEXTURE_2D_ARRAY):(O.setTexture2D(Q,0),fn=q.TEXTURE_2D),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,Q.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,Q.unpackAlignment);const De=q.getParameter(q.UNPACK_ROW_LENGTH),Hn=q.getParameter(q.UNPACK_IMAGE_HEIGHT),sa=q.getParameter(q.UNPACK_SKIP_PIXELS),En=q.getParameter(q.UNPACK_SKIP_ROWS),Fr=q.getParameter(q.UNPACK_SKIP_IMAGES);q.pixelStorei(q.UNPACK_ROW_LENGTH,qe.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,qe.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,te),q.pixelStorei(q.UNPACK_SKIP_ROWS,ae),q.pixelStorei(q.UNPACK_SKIP_IMAGES,Jt);const ge=C.isDataArrayTexture||C.isData3DTexture,On=Q.isDataArrayTexture||Q.isData3DTexture;if(C.isDepthTexture){const Gn=Yt.get(C),_n=Yt.get(Q),sn=Yt.get(Gn.__renderTarget),Rs=Yt.get(_n.__renderTarget);Zt.bindFramebuffer(q.READ_FRAMEBUFFER,sn.__webglFramebuffer),Zt.bindFramebuffer(q.DRAW_FRAMEBUFFER,Rs.__webglFramebuffer);for(let ji=0;ji<Ft;ji++)ge&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Yt.get(C).__webglTexture,Z,Jt+ji),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Yt.get(Q).__webglTexture,St,Ye+ji)),q.blitFramebuffer(te,ae,Nt,It,Se,we,Nt,It,q.DEPTH_BUFFER_BIT,q.NEAREST);Zt.bindFramebuffer(q.READ_FRAMEBUFFER,null),Zt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(Z!==0||C.isRenderTargetTexture||Yt.has(C)){const Gn=Yt.get(C),_n=Yt.get(Q);Zt.bindFramebuffer(q.READ_FRAMEBUFFER,yu),Zt.bindFramebuffer(q.DRAW_FRAMEBUFFER,zr);for(let sn=0;sn<Ft;sn++)ge?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Gn.__webglTexture,Z,Jt+sn):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Gn.__webglTexture,Z),On?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,_n.__webglTexture,St,Ye+sn):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,_n.__webglTexture,St),Z!==0?q.blitFramebuffer(te,ae,Nt,It,Se,we,Nt,It,q.COLOR_BUFFER_BIT,q.NEAREST):On?q.copyTexSubImage3D(fn,St,Se,we,Ye+sn,te,ae,Nt,It):q.copyTexSubImage2D(fn,St,Se,we,te,ae,Nt,It);Zt.bindFramebuffer(q.READ_FRAMEBUFFER,null),Zt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else On?C.isDataTexture||C.isData3DTexture?q.texSubImage3D(fn,St,Se,we,Ye,Nt,It,Ft,le,kt,qe.data):Q.isCompressedArrayTexture?q.compressedTexSubImage3D(fn,St,Se,we,Ye,Nt,It,Ft,le,qe.data):q.texSubImage3D(fn,St,Se,we,Ye,Nt,It,Ft,le,kt,qe):C.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,St,Se,we,Nt,It,le,kt,qe.data):C.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,St,Se,we,qe.width,qe.height,le,qe.data):q.texSubImage2D(q.TEXTURE_2D,St,Se,we,Nt,It,le,kt,qe);q.pixelStorei(q.UNPACK_ROW_LENGTH,De),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Hn),q.pixelStorei(q.UNPACK_SKIP_PIXELS,sa),q.pixelStorei(q.UNPACK_SKIP_ROWS,En),q.pixelStorei(q.UNPACK_SKIP_IMAGES,Fr),St===0&&Q.generateMipmaps&&q.generateMipmap(fn),Zt.unbindTexture()},this.copyTextureToTexture3D=function(C,Q,rt=null,st=null,Z=0){return C.isTexture!==!0&&(So("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,st=arguments[1]||null,C=arguments[2],Q=arguments[3],Z=arguments[4]||0),So('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,Q,rt,st,Z)},this.initRenderTarget=function(C){Yt.get(C).__webglFramebuffer===void 0&&O.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?O.setTextureCube(C,0):C.isData3DTexture?O.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?O.setTexture2DArray(C,0):O.setTexture2D(C,0),Zt.unbindTexture()},this.resetState=function(){z=0,N=0,X=null,Zt.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=Ne._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ne._getUnpackColorSpace()}}function VD({trajectory:a,activeIndex:t}){const i=$.useRef(null),r=$.useRef(null);return $.useEffect(()=>{const l=i.current;if(!l)return;const u=new Z1;u.background=new Ce("#171717");const f=new Ri(48,l.clientWidth/l.clientHeight,.1,100);f.position.set(5.2,4.2,6.5),f.lookAt(1,.4,0);const h=new GD({antialias:!0});h.setPixelRatio(Math.min(window.devicePixelRatio,2)),h.setSize(l.clientWidth,l.clientHeight),l.appendChild(h.domElement);const p=a.points.map(N=>new lt(...N.positionXYZ)),m=new wi().setFromPoints(p);u.add(new OS(m,new Cf({color:"#70f000"})));const g=new iR(12,12,"#f5f0e8","#444444");g.position.y=-1.4,u.add(g),u.add(new aR(1.2));const v=new Gi(new Jo(.24,.24,.24),new yf({color:"#ff5c35"}));r.current=v,u.add(v);const y=new Gi(new tg(.12),new yf({color:"#70f000"}));y.position.copy(p[0]),u.add(y);let M=!1,E=0,b=0;const x=new nu;u.children.filter(N=>N!==f).forEach(N=>x.add(N)),u.add(x);const _=N=>{M=!0,E=N.clientX,b=N.clientY},L=N=>{M&&(x.rotation.y+=(N.clientX-E)*.008,x.rotation.x+=(N.clientY-b)*.005,E=N.clientX,b=N.clientY)},D=()=>{M=!1};h.domElement.addEventListener("pointerdown",_),window.addEventListener("pointermove",L),window.addEventListener("pointerup",D);let R=0;const V=()=>{h.render(u,f),R=requestAnimationFrame(V)};V();const z=()=>{f.aspect=l.clientWidth/l.clientHeight,f.updateProjectionMatrix(),h.setSize(l.clientWidth,l.clientHeight)};return window.addEventListener("resize",z),()=>{cancelAnimationFrame(R),window.removeEventListener("resize",z),window.removeEventListener("pointermove",L),window.removeEventListener("pointerup",D),h.domElement.removeEventListener("pointerdown",_),m.dispose(),h.dispose(),l.replaceChildren()}},[a]),$.useEffect(()=>{const l=a.points[Math.min(t,a.points.length-1)];r.current&&l&&r.current.position.set(...l.positionXYZ)},[t,a]),F.jsx("div",{className:"trajectory-canvas",ref:i,"aria-label":"可交互三维相机轨迹"})}const kD=["video/mp4","video/quicktime","video/webm","video/x-matroska"],Dm=a=>`${(a/1024/1024).toFixed(1)} MB`,XD=a=>new Intl.DateTimeFormat("zh-CN",{hour:"2-digit",minute:"2-digit"}).format(new Date(a));function qD(){return F.jsxs("div",{className:"side-state requirements-state",children:[F.jsx("span",{className:"panel-kicker",children:"BEFORE YOU START"}),F.jsx("h2",{children:"视频要求"}),F.jsx("p",{className:"side-intro",children:"文件满足以下条件，才能进入 GPU 重建队列。"}),F.jsxs("ul",{className:"rule-list",children:[F.jsxs("li",{children:[F.jsx(Yl,{}),F.jsxs("span",{children:[F.jsx("strong",{children:"视频格式"}),"MP4 / MOV / MKV / AVI / WEBM"]})]}),F.jsxs("li",{children:[F.jsx(Yl,{}),F.jsxs("span",{children:[F.jsx("strong",{children:"文件大小"}),"不超过 200 MB"]})]}),F.jsxs("li",{children:[F.jsx(Yl,{}),F.jsxs("span",{children:[F.jsx("strong",{children:"视频长度"}),"不超过 60 秒"]})]}),F.jsxs("li",{children:[F.jsx(Yl,{}),F.jsxs("span",{children:[F.jsx("strong",{children:"帧数范围"}),"8～1000 帧"]})]}),F.jsxs("li",{children:[F.jsx(Yl,{}),F.jsxs("span",{children:[F.jsx("strong",{children:"最高分辨率"}),"3840 × 2160"]})]})]}),F.jsxs("div",{className:"safety-note",children:[F.jsx(Vp,{}),F.jsxs("p",{children:[F.jsx("strong",{children:"注意"}),"输出是相机重建轨迹，不能直接作为机器人执行指令。"]})]})]})}function jD(){return F.jsx("span",{className:"skeleton-value","aria-label":"正在解析"})}function WD({job:a}){const t=[["文件大小",Dm(a.source.sizeBytes)],["视频编码",a.source.codec!=="pending"?a.source.codec.toUpperCase():null],["视频时长",a.source.durationSeconds?`${a.source.durationSeconds.toFixed(1)} 秒`:null],["分辨率",a.source.width?`${a.source.width} × ${a.source.height}`:null],["视频帧数",a.source.frameCount?`${a.source.frameCount} 帧`:null],["平均帧率",a.source.fps?`${a.source.fps} FPS`:null]];return F.jsxs("div",{className:"side-state analysis-state",children:[F.jsx("span",{className:"panel-kicker",children:"LIVE ANALYSIS"}),F.jsxs("div",{className:"side-title-row",children:[F.jsx("h2",{children:"视频参数"}),F.jsx(oS,{status:a.status})]}),F.jsx("p",{className:"side-intro",children:"参数由后端逐项探测，未完成的项目会自动保持 Loading 状态。"}),F.jsx("div",{className:"parameter-grid",children:t.map(([i,r])=>F.jsxs("div",{children:[F.jsx("span",{children:i}),r?F.jsx("strong",{children:r}):F.jsx(jD,{})]},i))}),F.jsxs("div",{className:"side-progress",children:[F.jsxs("div",{children:[F.jsx("span",{children:a.progress.stageLabel}),F.jsxs("strong",{children:[a.progress.percent,"%"]})]}),F.jsx("div",{className:"big-progress",children:F.jsx("i",{style:{width:`${a.progress.percent}%`}})})]})]})}function YD(){var ot,mt,ht,I;const a=Im(),t=$.useRef(null),i=$.useRef(null),[r,l]=$.useState(null),[u,f]=$.useState(""),[h,p]=$.useState(null),[m,g]=$.useState(0),[v,y]=$.useState(!1),[M,E]=$.useState(1),[b,x]=$.useState(null),_=nf({queryKey:["jobs"],queryFn:()=>Wd.list({limit:8}),refetchInterval:5e3}),L=nf({queryKey:["job",h],queryFn:()=>Wd.get(h),enabled:!!h,refetchInterval:B=>{var W;return((W=B.state.data)==null?void 0:W.status)==="succeeded"?!1:1200}}),D=nf({queryKey:["trajectory",h],queryFn:()=>dy.getByJob(h),enabled:((ot=L.data)==null?void 0:ot.status)==="succeeded"&&!!h}),R=iy({mutationFn:Wd.create,onSuccess:B=>{p(B.id),a.setQueryData(["job",B.id],B),a.invalidateQueries({queryKey:["jobs"]})}}),V=iy({mutationFn:dy.parseLocal,onSuccess:B=>{var W;x(B),p(null),l(null),g(0),(W=document.querySelector("#workspace"))==null||W.scrollIntoView({behavior:"smooth"})}}),z=L.data,N=b??D.data,X=!!b||(z==null?void 0:z.status)==="succeeded",U=N==null?void 0:N.points[m];$.useEffect(()=>{if(!v||!N)return;const B=window.setInterval(()=>g(W=>W>=N.points.length-1?0:W+1),1e3/Math.max(N.fps,1)/M);return()=>window.clearInterval(B)},[v,M,N]);const w=B=>{if(f(""),!!B){if(B.size>200*1024*1024)return f("文件超过 200 MB 限制");if(!kD.includes(B.type)&&!/\.(mp4|mov|mkv|avi|webm|m4v)$/i.test(B.name))return f("不支持这个视频格式");l(B)}},k=()=>{l(null),p(null),x(null),g(0),y(!1),f("")},ut=X?"result":h?"processing":"upload";return F.jsxs("div",{className:"page single-page",children:[F.jsxs("header",{className:"single-hero",children:[F.jsxs("div",{children:[F.jsx("p",{className:"eyebrow",children:"VIDEO → CAMERA MOTION"}),F.jsxs("h1",{children:["一个页面，",F.jsx("br",{}),"跑完整条轨迹。"]})]}),F.jsxs("div",{className:"hero-side",children:[F.jsx("p",{children:"上传视频，等待解析，在同一个工作区检查三维相机运动。没有页面跳转，没有隐藏步骤。"}),F.jsx("input",{ref:i,hidden:!0,type:"file",accept:".zip,.csv,.json,.jsonl",onChange:B=>{var W;return((W=B.target.files)==null?void 0:W[0])&&V.mutate(B.target.files[0])}}),F.jsxs("button",{className:"button button-light",onClick:()=>{var B;return(B=i.current)==null?void 0:B.click()},children:[F.jsx(RA,{})," ",V.isPending?"正在解析轨迹…":"导入已有轨迹"]})]})]}),F.jsxs("section",{className:"workflow",id:"workspace",children:[F.jsxs("div",{className:"workflow-label",children:[F.jsx("span",{children:"01"}),F.jsx("strong",{children:"重建工作区"}),F.jsx("i",{children:ut==="upload"?"等待视频":ut==="processing"?"正在解析":"轨迹就绪"})]}),F.jsxs("div",{className:"workspace-grid",children:[F.jsxs("div",{className:"workspace-main",children:[ut==="upload"&&F.jsxs("div",{className:"upload-stage",children:[F.jsxs("div",{className:"drop-zone main-drop",onDragOver:B=>B.preventDefault(),onDrop:B=>{B.preventDefault(),w(B.dataTransfer.files[0])},onClick:()=>{var B;return!r&&((B=t.current)==null?void 0:B.click())},children:[F.jsx("input",{ref:t,type:"file",accept:"video/*,.mkv,.m4v",hidden:!0,onChange:B=>{var W;return w((W=B.target.files)==null?void 0:W[0])}}),r?F.jsxs(F.Fragment,{children:[F.jsx(fy,{className:"file-hero-icon"}),F.jsx("span",{className:"drop-number",children:"READY TO SEND"}),F.jsx("h2",{children:r.name}),F.jsxs("p",{children:[Dm(r.size)," · 等待提交"]}),F.jsxs("button",{className:"remove-file",onClick:B=>{B.stopPropagation(),l(null)},children:[F.jsx(sS,{})," 重新选择"]})]}):F.jsxs(F.Fragment,{children:[F.jsx("div",{className:"drop-icon",children:F.jsx(CA,{size:42})}),F.jsx("span",{className:"drop-number",children:"01 / DROP"}),F.jsx("h2",{children:"上传一个视频"}),F.jsx("p",{children:"拖到这里，或者点击选择文件"}),F.jsx("button",{className:"button button-dark",type:"button",children:"选择视频"})]})]}),u&&F.jsxs("div",{className:"alert error",children:[F.jsx(Vp,{}),u]}),F.jsxs("button",{className:"button button-primary workflow-submit",disabled:!r||R.isPending,onClick:()=>r&&R.mutate({video:r}),children:[R.isPending?"正在提交…":"开始解析与重建"," ",F.jsx(MA,{})]})]}),ut==="processing"&&z&&z.status!=="failed"&&F.jsxs("div",{className:"processing-stage",children:[F.jsxs("div",{className:"processing-visual",children:[F.jsxs("div",{className:"scan-frame",children:[F.jsx(fy,{}),F.jsx("div",{className:"scan-line"})]}),F.jsxs("span",{children:[String(z.progress.percent).padStart(2,"0"),"%"]}),F.jsx("h2",{children:z.progress.stageLabel}),F.jsx("p",{children:z.source.originalName})]}),F.jsx("div",{className:"stage-track",children:["上传完成","视频校验","等待 GPU","轨迹重建","验证打包"].map((B,W)=>F.jsxs("div",{className:z.progress.percent>=W*22?"done":"",children:[F.jsx("i",{children:z.progress.percent>=W*22?"✓":W+1}),F.jsx("span",{children:B})]},B))})]}),(z==null?void 0:z.status)==="failed"&&F.jsx("div",{className:"processing-stage failed-stage",children:F.jsxs("div",{className:"processing-visual",children:[F.jsx(Vp,{}),F.jsx("span",{children:"FAILED"}),F.jsx("h2",{children:((mt=z.error)==null?void 0:mt.message)??"算法任务执行失败"}),F.jsx("p",{children:z.id}),F.jsx("button",{className:"button button-light",onClick:k,children:"处理新视频"})]})}),ut==="result"&&N&&U&&F.jsxs("div",{className:"result-stage",children:[F.jsxs("div",{className:"canvas-top",children:[F.jsx("span",{children:"3D CAMERA TRAJECTORY"}),F.jsxs("div",{children:[F.jsx("i",{className:"green-dot"})," START ",F.jsx("i",{className:"orange-dot"})," CURRENT"]})]}),F.jsx(VD,{trajectory:N,activeIndex:m}),F.jsxs("div",{className:"transport",children:[F.jsx("button",{className:"transport-button",onClick:()=>y(!v),children:v?F.jsx(TA,{}):F.jsx(hy,{})}),F.jsx("button",{className:"transport-button",onClick:()=>g(0),children:F.jsx(AA,{})}),F.jsxs("span",{className:"timecode",children:[U.timeFromStartS.toFixed(2),"s"]}),F.jsx("input",{type:"range",min:"0",max:N.points.length-1,value:m,onChange:B=>g(Number(B.target.value))}),F.jsxs("span",{children:[(ht=N.points.at(-1))==null?void 0:ht.timeFromStartS.toFixed(2),"s"]}),F.jsxs("select",{value:M,onChange:B=>E(Number(B.target.value)),children:[F.jsx("option",{value:"0.5",children:"0.5×"}),F.jsx("option",{value:"1",children:"1×"}),F.jsx("option",{value:"2",children:"2×"}),F.jsx("option",{value:"4",children:"4×"})]})]})]}),ut==="result"&&!N&&F.jsx("div",{className:"processing-stage",children:F.jsxs("div",{className:"processing-visual",children:[F.jsx("div",{className:"loader-square"}),F.jsx("h2",{children:"正在加载轨迹数据"})]})})]}),F.jsxs("aside",{className:"workspace-side",children:[ut==="upload"&&F.jsx(qD,{}),ut==="processing"&&z&&F.jsx(WD,{job:z}),ut==="result"&&N&&U&&F.jsxs("div",{className:"side-state coordinate-state",children:[F.jsx("span",{className:"panel-kicker",children:"LIVE COORDINATES"}),F.jsxs("div",{className:"side-title-row",children:[F.jsx("h2",{children:"XYZ 位姿"}),F.jsxs("strong",{className:"frame-chip",children:["#",U.frameIndex]})]}),F.jsx("div",{className:"coordinate-stack",children:["X","Y","Z"].map((B,W)=>F.jsxs("div",{children:[F.jsx("span",{className:`axis axis-${B.toLowerCase()}`,children:B}),F.jsx("strong",{children:U.positionXYZ[W].toFixed(5)}),F.jsx("small",{children:N.lengthUnit})]},B))}),F.jsx("h3",{className:"quaternion-title",children:"QUATERNION / XYZW"}),F.jsx("div",{className:"quat-grid",children:U.orientationXYZW.map((B,W)=>F.jsxs("div",{children:[F.jsxs("span",{children:["Q",["X","Y","Z","W"][W]]}),F.jsx("strong",{children:B.toFixed(4)})]},W))}),F.jsxs("dl",{className:"trajectory-meta",children:[F.jsxs("div",{children:[F.jsx("dt",{children:"FRAME ID"}),F.jsx("dd",{children:N.frameId})]}),F.jsxs("div",{children:[F.jsx("dt",{children:"TIME"}),F.jsxs("dd",{children:[U.timeFromStartS.toFixed(3),"s"]})]}),F.jsxs("div",{children:[F.jsx("dt",{children:"ROBOT READY"}),F.jsx("dd",{children:"FALSE"})]})]}),F.jsx("button",{className:"button button-light new-run",onClick:k,children:"处理新视频"})]})]})]})]}),F.jsxs("section",{className:"queue-section",id:"queue",children:[F.jsxs("div",{className:"section-heading",children:[F.jsxs("div",{children:[F.jsx("span",{className:"section-index",children:"02"}),F.jsx("h2",{children:"任务队列"})]}),F.jsxs("span",{className:"queue-live",children:[F.jsx("i",{})," LIVE · 5S REFRESH"]})]}),F.jsx("div",{className:"job-table-wrap",children:F.jsxs("table",{className:"job-table",children:[F.jsx("thead",{children:F.jsxs("tr",{children:[F.jsx("th",{children:"任务 / 文件"}),F.jsx("th",{children:"状态"}),F.jsx("th",{children:"进度"}),F.jsx("th",{children:"视频信息"}),F.jsx("th",{children:"时间"}),F.jsx("th",{})]})}),F.jsxs("tbody",{children:[_.isLoading&&F.jsx("tr",{children:F.jsx("td",{colSpan:6,className:"empty-cell",children:"正在读取任务队列…"})}),(((I=_.data)==null?void 0:I.items)??[]).map(B=>F.jsxs("tr",{className:h===B.id?"active-row":"",children:[F.jsxs("td",{children:[F.jsx("strong",{children:B.source.originalName}),F.jsx("small",{children:B.id})]}),F.jsx("td",{children:F.jsx(oS,{status:B.status})}),F.jsxs("td",{children:[F.jsx("div",{className:"mini-progress",children:F.jsx("span",{style:{width:`${B.progress.percent}%`}})}),F.jsxs("small",{children:[B.progress.percent,"% · ",B.progress.stageLabel]})]}),F.jsxs("td",{children:[F.jsxs("strong",{children:[B.source.width||"—"," × ",B.source.height||"—"]}),F.jsx("small",{children:Dm(B.source.sizeBytes)})]}),F.jsx("td",{children:XD(B.createdAt)}),F.jsx("td",{children:F.jsx("button",{className:"icon-button","aria-label":"在工作区打开",onClick:()=>{var W;p(B.id),l(null),(W=document.querySelector("#workspace"))==null||W.scrollIntoView({behavior:"smooth"})},children:B.status==="succeeded"?F.jsx(hy,{}):F.jsx(EA,{})})})]},B.id))]})]})})]}),F.jsxs("section",{className:"single-about",id:"about",children:[F.jsx("span",{className:"section-index",children:"03"}),F.jsx("h2",{children:"关于输出"}),F.jsxs("p",{children:["所有轨迹都以第一帧相机坐标系为基准，四元数顺序为 XYZW。未完成外部尺度、坐标系与手眼标定之前，数据始终标记为 ",F.jsx("strong",{children:"robot_execution_ready: false"}),"。"]})]})]})}function QD(){return F.jsx(UA,{children:F.jsxs(HT,{children:[F.jsx(Hp,{path:"/",element:F.jsx(YD,{})}),F.jsx(Hp,{path:"*",element:F.jsx(IT,{to:"/",replace:!0})})]})})}const ZD=new Cb({defaultOptions:{queries:{retry:1,staleTime:1e4}}});nb.createRoot(document.getElementById("root")).render(F.jsx($.StrictMode,{children:F.jsx(wb,{client:ZD,children:F.jsx(cA,{children:F.jsx(QD,{})})})}));
