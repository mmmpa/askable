!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=65)}({0:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){var e=this.props,t=["fa"];return t.push("fa-"+e.icon),e.scale&&t.push("fa-"+e.scale+"x"),(void 0===e.fixedWidth||e.fixedWidth===!0)&&t.push("fa-fw"),e.list&&t.push("fa-li"),e.border&&t.push("fa-border"),e.pull&&t.push("fa-pull-"+e.pull),e.animation&&t.push("fa-"+e.animation),e.rotate&&t.push("fa-rotate-"+e.rotate),e.flip&&t.push("fa-flip-"+e.flip),React.createElement("i",{className:t.join(" ")})}}]),t}(React.Component);t.default=u},1:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=t.ComponentComponent=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"dispatch",value:function(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(t=this.context.emitter).emit.apply(t,[e].concat(r))}},{key:"componentWillMount",value:function(){this.setState(this.initialState(this.props))}},{key:"initialState",value:function(e){return{}}}]),t}(React.Component);t.ContextComponent=function(e){function t(e){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),u(t,[{key:"componentWillUnmount",value:function(){var e=this;this.addedOnStore.map(function(t){var n=t.eventName,r=t.callback;return e.emitter.removeListener(n,r),n})}},{key:"componentWillMount",value:function(){var e=this;i(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentWillMount",this).call(this),this.emitter||(this.emitter=this.context.emitter||new EventEmitter,this.listen(function(t,n){e.addedOnStore.push({eventName:t,callback:n}),e.emitter.on(t,n)}))}},{key:"getChildContext",value:function(){return{emitter:this.context.emitter||this.emitter}}},{key:"render",value:function(){var e=Object.assign({},this.props,this.state);delete e.children;var t=this.props.children;return React.createElement("div",{className:"context-wrapper"},t.map(function(t,n){return React.cloneElement(t,Object.assign(e,{key:n}))}))}},{key:"addedOnStore",get:function(){return this._addedOnStore||(this._addedOnStore=[]),this._addedOnStore}}]),t}(a)},2:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.State={Waiting:0,Submitting:1,Fail:2,Success:3}},3:function(e,t){"use strict";function n(e,t){return new Promise(function(n,o){r(e,t,n,o)})}function r(e,t,n,r){l=l.then(function(){return new Promise(function(i,u){o(e,t,n,r,i)})})}function o(e,t,n,r,o){var u=e.uri;if(u.indexOf(":")!==-1)var a=c(u,t),s=a.normalized,f=a.trimmed;i(n,r,o,s||u,e.method,e.params(f||t))}function i(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};u(r,o).send(i).end(s(e,t,n))}function u(e,t){var n=a(request,e,t);return t===p.Get?n:n.set("X-CSRF-Token",f())}function a(e,t,n){switch(n){case p.Get:return e.get(t);case p.Post:return e.post(t);case p.Patch:return e.patch(t);case p.Put:return e.put(t);case p.Delete:return e.delete(t)}}function s(e,t,n){return function(r,o){r?t(o.body&&o.body.errors?o.body:{errors:{unknown:[r]}}):e(o.body),n()}}function c(e,t){var n=t.questionId;delete t.questionId;var r=t.groupId;delete t.groupId;var o=t.commentId;delete t.commentId;var i=t.invitationId;delete t.invitationId;var u=t.messageId;delete t.messageId;var a=e.replace(":messageId",u).replace(":invitationId",i).replace(":questionId",n).replace(":commentId",o).replace(":groupId",r);return{trimmed:t,normalized:a}}function f(){try{return document.getElementsByName("csrf-token")[0].getAttribute("content")}catch(e){return""}}Object.defineProperty(t,"__esModule",{value:!0}),t.strike=n;var l=Promise.resolve(),p={Get:0,Post:1,Patch:2,Put:3,Delete:4},d={};t.default=d;var m=t.Api={disposeMessage:{uri:"/m/:messageId",method:p.Delete,params:function(e){return e}},invite:{uri:"/g/:groupId/invitation",method:p.Post,params:function(e){return{invitations:e}}},disposeGroup:{uri:"/g/:groupId",method:p.Delete,params:function(e){return e}},createGroup:{uri:"/g/new",method:p.Post,params:function(e){return{groups:e}}},acceptInvitation:{uri:"/i/:invitationId/accept",method:p.Patch,params:function(e){return e}},rejectInvitation:{uri:"/i/:invitationId/reject",method:p.Patch,params:function(e){return e}},blockInvitation:{uri:"/i/:invitationId/block",method:p.Patch,params:function(e){return e}},createQuestion:{uri:"/g/:groupId/me/q/new",method:p.Post,params:function(e){return{questions:e}}},answerQuestion:{uri:"/g/:groupId/q/:questionId/answer",method:p.Patch,params:function(e){return{questions:e}}},assignUserQuestion:{uri:"/g/:groupId/q/:questionId/assign",method:p.Patch,params:function(e){return{questions:e}}},waitAnswerQuestion:{uri:"/g/:groupId/q/:questionId/wait",method:p.Patch,params:function(e){return{}}},sorryQuestion:{uri:"/g/:groupId/q/:questionId/sorry",method:p.Patch,params:function(e){return{}}},replyToReply:{uri:"/g/:groupId/q/:questionId/a/:commentId/res",method:p.Post,params:function(e){return{questions:e}}},finishQuestion:{uri:"/g/:groupId/q/:questionId/finish",method:p.Patch,params:function(e){return{}}},logIn:{uri:"/in",method:p.Post,params:function(e){return{user_sessions:e}}},logOut:{uri:"/out",method:p.Delete,params:function(e){return{}}},createUser:{uri:"/welcome/new",method:p.Post,params:function(e){return{users:e}}},updateUser:{uri:"/me",method:p.Patch,params:function(e){return{users:e}}},destroyUser:{uri:"/me",method:p.Delete,params:function(e){return{}}},changePassword:{uri:"/me/password",method:p.Patch,params:function(e){return e.password_now=e.passwordNow,delete e.passwordNow,{users:e}}}};!function(){var e=function(e){d[e]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return n.apply(void 0,[m[e]].concat(r))}};for(var t in m)e(t)}()},30:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),c=n(3),f=(r(c),n(2)),l=n(0),p=(r(l),n(4)),d=r(p),m=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),a(t,[{key:"succeed",value:function(){location.href="/m/index"}},{key:"setBase",value:function(e){return e.messageId=this.messageId,e}},{key:"submit",value:function(){var e=this;this.setState({state:f.State.Submitting}),strike(Api.DisposeMessage,this.setBase({})).then(function(){e.succeed()}).catch(function(t){var n=t.errors;e.setState({errors:n,state:f.State.Fail})})}},{key:"listen",value:function(e){var t=this;e("dispose",function(){t.submit()})}},{key:"initialState",value:function(e){return{state:f.State.Waiting}}},{key:"messageId",get:function(){return this.props.messageId}}]),t}(s.ContextComponent),h=function(e){function t(e){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return u(t,e),a(t,[{key:"render",value:function(){var e=this,t=this.props.state;return React.createElement(d.default,{state:t,icon:"ban",text:"メッセージを削除する",className:"dispose",onClick:function(){return e.dispatch("dispose")}})}}]),t}(s.ComponentComponent),y=function(){function e(){o(this,e)}return a(e,null,[{key:"start",value:function(e){if(e){var t=e.getAttribute("data-id");ReactDOM.render(React.createElement(m,{messageId:t},React.createElement(h,null)),e)}}}]),e}();window.MessageDisposer=y},4:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),c=n(2),f=n(0),l=r(f),p=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.onClick,r=e.icon,o=e.state,i=e.disabled,u=this.className;switch(o){case c.State.Submitting:return React.createElement("button",{className:this.className,disabled:!0},React.createElement(l.default,{icon:r,animation:"pulse"}),t);case c.State.Success:case c.State.Waiting:case c.State.Fail:default:return React.createElement("button",{className:u,disabled:i,onClick:function(e){e.preventDefault(),n(e)}},React.createElement(l.default,{icon:r}),t)}}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===c.State.Submitting?" sending":" ready")}}]),t}(s.ComponentComponent);t.default=p},65:function(e,t,n){e.exports=n(30)}});