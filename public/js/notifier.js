!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=68)}({33:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){n(this,e)}return r(e,null,[{key:"risingClass",value:function(e){return"body notifier "+e+" rising"}},{key:"fadingClass",value:function(e){return"body notifier "+e+" rising fading"}},{key:"createStore",value:function(e,t){var n=this;setTimeout(function(){n.create(e,t)},1e3)}},{key:"create",value:function(e,t){var n=this,r=document,i=r.createElement("div"),o=document.createElement("p");i.setAttribute("class","body notifier "+e),o.innerText=t,i.appendChild(o),r.getElementsByTagName("body")[0].appendChild(i),setTimeout(function(){i.setAttribute("class",n.risingClass(e)),setTimeout(function(){i.setAttribute("class",n.fadingClass(e)),setTimeout(function(){i.parentNode.removeChild(i)},200)},3e3)},1)}},{key:"alert",value:function(e){this.createStore("alert",e)}},{key:"notify",value:function(e){this.createStore("notify",e)}}]),e}();t.default=i,window.Notifier=i},68:function(e,t,n){e.exports=n(33)}});