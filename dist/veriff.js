!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("cordova/exec")):"function"==typeof define&&define.amd?define(["cordova/exec"],r):"object"==typeof exports?exports.VERIFF=r(require("cordova/exec")):e.VERIFF=r(e["cordova/exec"])}(window,(function(e){return function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s=0)}([function(e,r,t){const o=t(1);e.exports={start:function(e){return new Promise((r,t)=>{e?o(e=>{r(e)},e=>{t(e)},"VeriffCordovaPlugin","launchVeriffSDK",[e]):t(new Error("Session URL is required"))})}}},function(r,t){r.exports=e}])}));