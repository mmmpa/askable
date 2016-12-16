!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=70)}({0:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){var e=this.props,t=["fa"];return t.push("fa-"+e.icon),e.scale&&t.push("fa-"+e.scale+"x"),(void 0===e.fixedWidth||e.fixedWidth===!0)&&t.push("fa-fw"),e.list&&t.push("fa-li"),e.border&&t.push("fa-border"),e.pull&&t.push("fa-pull-"+e.pull),e.animation&&t.push("fa-"+e.animation),e.rotate&&t.push("fa-rotate-"+e.rotate),e.flip&&t.push("fa-flip-"+e.flip),React.createElement("i",{className:t.join(" ")})}}]),t}(React.Component);t.default=u},1:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=t.ComponentComponent=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"dispatch",value:function(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(t=this.context.emitter).emit.apply(t,[e].concat(r))}},{key:"componentWillMount",value:function(){this.setState(this.initialState(this.props))}},{key:"initialState",value:function(e){return{}}}]),t}(React.Component);t.ContextComponent=function(e){function t(e){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),u(t,[{key:"componentWillUnmount",value:function(){var e=this;this.addedOnStore.map(function(t){var n=t.eventName,r=t.callback;return e.emitter.removeListener(n,r),n})}},{key:"componentWillMount",value:function(){var e=this;i(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentWillMount",this).call(this),this.emitter||(this.emitter=this.context.emitter||new EventEmitter,this.listen(function(t,n){e.addedOnStore.push({eventName:t,callback:n}),e.emitter.on(t,n)}))}},{key:"getChildContext",value:function(){return{emitter:this.context.emitter||this.emitter}}},{key:"render",value:function(){var e=Object.assign({},this.props,this.state);delete e.children;var t=this.props.children;return React.createElement("div",{className:"context-wrapper"},t.map(function(t,n){return React.cloneElement(t,Object.assign(e,{key:n}))}))}},{key:"addedOnStore",get:function(){return this._addedOnStore||(this._addedOnStore=[]),this._addedOnStore}}]),t}(a)},10:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),c=n(3),l=(r(c),n(2)),f=n(0),p=(r(f),n(4)),d=r(p),m=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),a(t,[{key:"succeed",value:function(){location.reload()}},{key:"setBase",value:function(e){return e.groupId=this.groupId,e.questionId=this.questionId,e}},{key:"submit",value:function(){var e=this;this.setState({state:l.State.Submitting}),strike(Api.FinishQuestion,this.setBase({})).then(function(){e.succeed()}).catch(function(t){var n=t.errors;e.setState({errors:n,state:l.State.Fail}),e.succeed()})}},{key:"listen",value:function(e){var t=this;e("submit",function(){t.submit()})}},{key:"initialState",value:function(e){return{}}},{key:"questionId",get:function(){return this.props.questionId}},{key:"groupId",get:function(){return this.props.groupId}}]),t}(s.ContextComponent),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),a(t,[{key:"render",value:function(){var e=this,t=this.props.state;return React.createElement("article",{className:"finish body"},React.createElement("section",{className:"finish submit-area"},React.createElement(d.default,{state:t,icon:"thumbs-o-up",text:"質問を終了する",className:"submit",onClick:function(){return e.dispatch("submit")}})))}}]),t}(s.ComponentComponent),v=function(){function e(){o(this,e)}return a(e,null,[{key:"start",value:function(e){if(e){var t=e.getAttribute("data-questionId"),n=e.getAttribute("data-groupId");ReactDOM.render(React.createElement(m,{questionId:t,groupId:n},React.createElement(h,null)),e)}}}]),e}();t.default=v,window.QuestionFinisher=v},11:function(e,t){throw new Error("Module build failed: SyntaxError: enum is a reserved word (84:0)\n\n[0m [90m 82 | [39m}\n [90m 83 | [39m\n[31m[1m>[22m[39m[90m 84 | [39m[36menum[39m [33mMode[39m{\n [90m    | [39m[31m[1m^[22m[39m\n [90m 85 | [39m  [33mAnswering[39m[33m,[39m\n [90m 86 | [39m  [33mAssigning[39m\n [90m 87 | [39m}[0m\n")},12:function(e,t){throw new Error("Module build failed: SyntaxError: Unexpected token, expected ( (63:10)\n\n[0m [90m 61 | [39m\n [90m 62 | [39m[36mclass[39m [33mComponent[39m [36mextends[39m [33mComponentComponent[39m {\n[31m[1m>[22m[39m[90m 63 | [39m  private cm[33m;[39m\n [90m    | [39m          [31m[1m^[22m[39m\n [90m 64 | [39m\n [90m 65 | [39m  constructor(props) {\n [90m 66 | [39m    [36msuper[39m(props)[33m;[39m[0m\n")},2:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.State={Waiting:0,Submitting:1,Fail:2,Success:3}},3:function(e,t){"use strict";function n(e,t){return new Promise(function(n,o){r(e,t,n,o)})}function r(e,t,n,r){f=f.then(function(){return new Promise(function(i,u){o(e,t,n,r,i)})})}function o(e,t,n,r,o){var u=e.uri;if(u.indexOf(":")!==-1)var a=c(u,t),s=a.normalized,l=a.trimmed;i(n,r,o,s||u,e.method,e.params(l||t))}function i(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};u(r,o).send(i).end(s(e,t,n))}function u(e,t){var n=a(request,e,t);return t===p.Get?n:n.set("X-CSRF-Token",l())}function a(e,t,n){switch(n){case p.Get:return e.get(t);case p.Post:return e.post(t);case p.Patch:return e.patch(t);case p.Put:return e.put(t);case p.Delete:return e.delete(t)}}function s(e,t,n){return function(r,o){r?t(o.body&&o.body.errors?o.body:{errors:{unknown:[r]}}):e(o.body),n()}}function c(e,t){var n=t.questionId;delete t.questionId;var r=t.groupId;delete t.groupId;var o=t.commentId;delete t.commentId;var i=t.invitationId;delete t.invitationId;var u=t.messageId;delete t.messageId;var a=e.replace(":messageId",u).replace(":invitationId",i).replace(":questionId",n).replace(":commentId",o).replace(":groupId",r);return{trimmed:t,normalized:a}}function l(){try{return document.getElementsByName("csrf-token")[0].getAttribute("content")}catch(e){return""}}Object.defineProperty(t,"__esModule",{value:!0}),t.strike=n;var f=Promise.resolve(),p={Get:0,Post:1,Patch:2,Put:3,Delete:4},d={};t.default=d;var m=t.Api={disposeMessage:{uri:"/m/:messageId",method:p.Delete,params:function(e){return e}},invite:{uri:"/g/:groupId/invitation",method:p.Post,params:function(e){return{invitations:e}}},disposeGroup:{uri:"/g/:groupId",method:p.Delete,params:function(e){return e}},createGroup:{uri:"/g/new",method:p.Post,params:function(e){return{groups:e}}},acceptInvitation:{uri:"/i/:invitationId/accept",method:p.Patch,params:function(e){return e}},rejectInvitation:{uri:"/i/:invitationId/reject",method:p.Patch,params:function(e){return e}},blockInvitation:{uri:"/i/:invitationId/block",method:p.Patch,params:function(e){return e}},createQuestion:{uri:"/g/:groupId/me/q/new",method:p.Post,params:function(e){return{questions:e}}},answerQuestion:{uri:"/g/:groupId/q/:questionId/answer",method:p.Patch,params:function(e){return{questions:e}}},assignUserQuestion:{uri:"/g/:groupId/q/:questionId/assign",method:p.Patch,params:function(e){return{questions:e}}},waitAnswerQuestion:{uri:"/g/:groupId/q/:questionId/wait",method:p.Patch,params:function(e){return{}}},sorryQuestion:{uri:"/g/:groupId/q/:questionId/sorry",method:p.Patch,params:function(e){return{}}},replyToReply:{uri:"/g/:groupId/q/:questionId/a/:commentId/res",method:p.Post,params:function(e){return{questions:e}}},finishQuestion:{uri:"/g/:groupId/q/:questionId/finish",method:p.Patch,params:function(e){return{}}},logIn:{uri:"/in",method:p.Post,params:function(e){return{user_sessions:e}}},logOut:{uri:"/out",method:p.Delete,params:function(e){return{}}},createUser:{uri:"/welcome/new",method:p.Post,params:function(e){return{users:e}}},updateUser:{uri:"/me",method:p.Patch,params:function(e){return{users:e}}},destroyUser:{uri:"/me",method:p.Delete,params:function(e){return{}}},changePassword:{uri:"/me/password",method:p.Patch,params:function(e){return e.password_now=e.passwordNow,delete e.passwordNow,{users:e}}}};!function(){var e=function(e){d[e]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return n.apply(void 0,[m[e]].concat(r))}};for(var t in m)e(t)}()},34:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(10),i=r(o),u=n(11),a=r(u),s=n(12),c=r(s),l=n(9),f=r(l);window.QuestionFinisher=i.default,window.QuestionResponder=a.default,window.ReplyToReply=c.default,window.AnchorColoring=f.default},4:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),c=n(2),l=n(0),f=r(l),p=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.onClick,r=e.icon,o=e.state,i=e.disabled,u=this.className;switch(o){case c.State.Submitting:return React.createElement("button",{className:this.className,disabled:!0},React.createElement(f.default,{icon:r,animation:"pulse"}),t);case c.State.Success:case c.State.Waiting:case c.State.Fail:default:return React.createElement("button",{className:u,disabled:i,onClick:function(e){e.preventDefault(),n(e)}},React.createElement(f.default,{icon:r}),t)}}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===c.State.Submitting?" sending":" ready")}}]),t}(s.ComponentComponent);t.default=p},70:function(e,t,n){e.exports=n(34)},9:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t){var r=this;n(this,e),this.doc=document,this.anchoredColor="#f2f9fc",this.selectedColor="#fff9ea",this.clearColor="#fff",this.colored=[],this.initialize(),_.each(t,function(e){var t=e.getAttribute("data-targetId"),n="#comment-"+t,o=r.getTarget(n);e.addEventListener("click",function(e){location.href=n,r.reload()}),e.addEventListener("mouseover",function(e){r.color(o,r.selectedColor)}),e.addEventListener("mouseout",function(e){r.clear(o)})})}return r(e,[{key:"reload",value:function(e){var t=this;setTimeout(function(){return t.initialize()},1)}},{key:"color",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e.style.backgroundColor=t,n&&this.colored.push(e)}},{key:"getTarget",value:function(e){return this.doc.querySelectorAll(e+" .response-comment")[0]}},{key:"clear",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return e===this.anchored?(this.color(e,this.anchoredColor,!1),!1):(e.style.backgroundColor=this.clearColor,void(t&&_.remove(this.colored,e)))}},{key:"clearAll",value:function(){for(var e=void 0;e=this.colored.shift();)this.clear(e,!1);this.colored.push(this.anchored)}},{key:"initialize",value:function(){if(location.hash){this.clearAll();var e=this.getTarget(location.hash);this.anchored=e,this.color(e,this.anchoredColor),this.clearAll()}}}],[{key:"anchor",value:function(t){new e(t)}}]),e}();t.default=o,window.AnchorColoring=o}});