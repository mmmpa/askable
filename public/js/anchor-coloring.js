!function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var o={};return t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,o,r){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=58)}({58:function(e,t,o){e.exports=o(9)},9:function(e,t){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),n=function(){function e(t){var r=this;o(this,e),this.doc=document,this.anchoredColor="#f2f9fc",this.selectedColor="#fff9ea",this.clearColor="#fff",this.colored=[],this.initialize(),_.each(t,function(e){var t=e.getAttribute("data-targetId"),o="#comment-"+t,n=r.getTarget(o);e.addEventListener("click",function(e){location.href=o,r.reload()}),e.addEventListener("mouseover",function(e){r.color(n,r.selectedColor)}),e.addEventListener("mouseout",function(e){r.clear(n)})})}return r(e,[{key:"reload",value:function(e){var t=this;setTimeout(function(){return t.initialize()},1)}},{key:"color",value:function(e,t){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e.style.backgroundColor=t,o&&this.colored.push(e)}},{key:"getTarget",value:function(e){return this.doc.querySelectorAll(e+" .response-comment")[0]}},{key:"clear",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return e===this.anchored?(this.color(e,this.anchoredColor,!1),!1):(e.style.backgroundColor=this.clearColor,void(t&&_.remove(this.colored,e)))}},{key:"clearAll",value:function(){for(var e=void 0;e=this.colored.shift();)this.clear(e,!1);this.colored.push(this.anchored)}},{key:"initialize",value:function(){if(location.hash){this.clearAll();var e=this.getTarget(location.hash);this.anchored=e,this.color(e,this.anchoredColor),this.clearAll()}}}],[{key:"anchor",value:function(t){new e(t)}}]),e}();t.default=n,window.AnchorColoring=n}});