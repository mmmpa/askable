!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=66)}({0:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=["fa"];return t.push("fa-"+e.icon),e.scale&&t.push("fa-"+e.scale+"x"),(void 0===e.fixedWidth||e.fixedWidth===!0)&&t.push("fa-fw"),e.list&&t.push("fa-li"),e.border&&t.push("fa-border"),e.pull&&t.push("fa-pull-"+e.pull),e.animation&&t.push("fa-"+e.animation),e.rotate&&t.push("fa-rotate-"+e.rotate),e.flip&&t.push("fa-flip-"+e.flip),React.createElement("i",{className:t.join(" ")})}}]),t}(React.Component);t.default=i},1:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var a=Object.getPrototypeOf(t);return null===a?void 0:e(a,n,r)}if("value"in o)return o.value;var i=o.get;if(void 0!==i)return i.call(r)},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=t.ComponentComponent=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"dispatch",value:function(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(t=this.context.emitter).emit.apply(t,[e].concat(r))}},{key:"componentWillMount",value:function(){this.setState(this.initialState(this.props))}},{key:"initialState",value:function(e){return{}}}]),t}(React.Component);t.ContextComponent=function(e){function t(e){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),i(t,[{key:"componentWillUnmount",value:function(){var e=this;this.addedOnStore.map(function(t){var n=t.eventName,r=t.callback;return e.emitter.removeListener(n,r),n})}},{key:"componentWillMount",value:function(){var e=this;a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentWillMount",this).call(this),this.emitter||(this.emitter=this.context.emitter||new EventEmitter,this.listen(function(t,n){e.addedOnStore.push({eventName:t,callback:n}),e.emitter.on(t,n)}))}},{key:"getChildContext",value:function(){return{emitter:this.context.emitter||this.emitter}}},{key:"render",value:function(){var e=Object.assign({},this.props,this.state);delete e.children;var t=this.props.children;return React.createElement("div",{className:"context-wrapper"},t.map(function(t,n){return React.cloneElement(t,Object.assign(e,{key:n}))}))}},{key:"addedOnStore",get:function(){return this._addedOnStore||(this._addedOnStore=[]),this._addedOnStore}}]),t}(u)},13:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,r,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};return React.createElement("section",{className:"com input-section"},React.createElement(i.default,{errors:a,type:t,name:n,placeholder:r,label:o,value:e.state[n],onChange:function(t){var r={};r[n]=t,e.setState(r)}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.writeInput=o;var a=n(7),i=r(a)},2:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.State={Waiting:0,Submitting:1,Fail:2,Success:3}},3:function(e,t){"use strict";function n(e,t){return new Promise(function(n,o){r(e,t,n,o)})}function r(e,t,n,r){f=f.then(function(){return new Promise(function(a,i){o(e,t,n,r,a)})})}function o(e,t,n,r,o){var i=e.uri;if(i.indexOf(":")!==-1)var u=s(i,t),c=u.normalized,l=u.trimmed;a(n,r,o,c||i,e.method,e.params(l||t))}function a(e,t,n,r,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};i(r,o).send(a).end(c(e,t,n))}function i(e,t){var n=u(request,e,t);return t===p.Get?n:n.set("X-CSRF-Token",l())}function u(e,t,n){switch(n){case p.Get:return e.get(t);case p.Post:return e.post(t);case p.Patch:return e.patch(t);case p.Put:return e.put(t);case p.Delete:return e.delete(t)}}function c(e,t,n){return function(r,o){r?t(o.body&&o.body.errors?o.body:{errors:{unknown:[r]}}):e(o.body),n()}}function s(e,t){var n=t.questionId;delete t.questionId;var r=t.groupId;delete t.groupId;var o=t.commentId;delete t.commentId;var a=t.invitationId;delete t.invitationId;var i=t.messageId;delete t.messageId;var u=e.replace(":messageId",i).replace(":invitationId",a).replace(":questionId",n).replace(":commentId",o).replace(":groupId",r);return{trimmed:t,normalized:u}}function l(){try{return document.getElementsByName("csrf-token")[0].getAttribute("content")}catch(e){return""}}Object.defineProperty(t,"__esModule",{value:!0}),t.strike=n;var f=Promise.resolve(),p={Get:0,Post:1,Patch:2,Put:3,Delete:4},d={};t.default=d;var m=t.Api={disposeMessage:{uri:"/m/:messageId",method:p.Delete,params:function(e){return e}},invite:{uri:"/g/:groupId/invitation",method:p.Post,params:function(e){return{invitations:e}}},disposeGroup:{uri:"/g/:groupId",method:p.Delete,params:function(e){return e}},createGroup:{uri:"/g/new",method:p.Post,params:function(e){return{groups:e}}},acceptInvitation:{uri:"/i/:invitationId/accept",method:p.Patch,params:function(e){return e}},rejectInvitation:{uri:"/i/:invitationId/reject",method:p.Patch,params:function(e){return e}},blockInvitation:{uri:"/i/:invitationId/block",method:p.Patch,params:function(e){return e}},createQuestion:{uri:"/g/:groupId/me/q/new",method:p.Post,params:function(e){return{questions:e}}},answerQuestion:{uri:"/g/:groupId/q/:questionId/answer",method:p.Patch,params:function(e){return{questions:e}}},assignUserQuestion:{uri:"/g/:groupId/q/:questionId/assign",method:p.Patch,params:function(e){return{questions:e}}},waitAnswerQuestion:{uri:"/g/:groupId/q/:questionId/wait",method:p.Patch,params:function(e){return{}}},sorryQuestion:{uri:"/g/:groupId/q/:questionId/sorry",method:p.Patch,params:function(e){return{}}},replyToReply:{uri:"/g/:groupId/q/:questionId/a/:commentId/res",method:p.Post,params:function(e){return{questions:e}}},finishQuestion:{uri:"/g/:groupId/q/:questionId/finish",method:p.Patch,params:function(e){return{}}},logIn:{uri:"/in",method:p.Post,params:function(e){return{user_sessions:e}}},logOut:{uri:"/out",method:p.Delete,params:function(e){return{}}},createUser:{uri:"/welcome/new",method:p.Post,params:function(e){return{users:e}}},updateUser:{uri:"/me",method:p.Patch,params:function(e){return{users:e}}},destroyUser:{uri:"/me",method:p.Delete,params:function(e){return{}}},changePassword:{uri:"/me/password",method:p.Patch,params:function(e){return e.password_now=e.passwordNow,delete e.passwordNow,{users:e}}}};!function(){var e=function(e){d[e]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return n.apply(void 0,[m[e]].concat(r))}};for(var t in m)e(t)}()},31:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=n(2),l=n(3),f=r(l),p=n(0),d=(r(p),n(4)),m=r(d),h=n(13),y=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"succeed",value:function(e){location.href="/g/"+e}},{key:"submit",value:function(e){var t=this;this.setState({state:s.State.Submitting}),f.default.createGroup(e).then(function(e){t.succeed(e.id)}).catch(function(e){var n=e.errors;t.setState({errors:n,state:s.State.Fail})})}},{key:"listen",value:function(e){var t=this;e("submit",function(e){t.submit(e)})}},{key:"initialState",value:function(e){return{state:s.State.Waiting}}}]),t}(c.ContextComponent),b=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={name:"",description:""},n}return i(t,e),u(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.state,r=t.errors;return React.createElement("article",{className:"new-group body"},React.createElement("div",{className:"com border-box-container"},React.createElement("h1",{className:"com border-box-title-area"},"グループを作成する"),React.createElement("section",{className:"com form-area"},(0,h.writeInput)(this,"text","name","グループの名前",null,r),(0,h.writeInput)(this,"text","description","グループの概要",null,r),React.createElement("section",{className:"com submit-section"},React.createElement(m.default,{state:n,icon:"thumbs-o-up",text:"作成する",className:"submit",onClick:function(){return e.dispatch("submit",e.params)}})))))}},{key:"params",get:function(){var e=this.state,t=e.name,n=e.description;return{name:t,description:n}}}]),t}(c.ComponentComponent),v=function(){function e(){o(this,e)}return u(e,null,[{key:"start",value:function(e){e&&ReactDOM.render(React.createElement(y,null,React.createElement(b,null)),e)}}]),e}();window.NewGroup=v},4:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=n(2),l=n(0),f=r(l),p=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.onClick,r=e.icon,o=e.state,a=e.disabled,i=this.className;switch(o){case s.State.Submitting:return React.createElement("button",{className:this.className,disabled:!0},React.createElement(f.default,{icon:r,animation:"pulse"}),t);case s.State.Success:case s.State.Waiting:case s.State.Fail:default:return React.createElement("button",{className:i,disabled:a,onClick:function(e){e.preventDefault(),n(e)}},React.createElement(f.default,{icon:r}),t)}}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===s.State.Submitting?" sending":" ready")}}]),t}(c.ComponentComponent);t.default=p},6:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=(n(2),n(0)),l=(r(s),function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"wrap",value:function(e){switch(!0){case!e:return[];case e.map:return e;default:return[e]}}},{key:"render",value:function(){var e=this.props,t=e.errors,n=e.name;if(!t)return null;var r=this.wrap(t[n]);return 0===r.length?null:React.createElement("ul",{className:"error-messages"},r.map(function(e,t){return React.createElement("li",{className:"error-message",key:t},e)}))}}]),t}(c.ComponentComponent));t.default=l},66:function(e,t,n){e.exports=n(31)},7:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),l=n(2),f=n(0),p=(r(f),n(6)),d=r(p),m=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={value:n.props.initialValue},n}return i(t,e),c(t,[{key:"render",value:function(){var e=this.props,t=e.type,n=e.name,r=e.placeholder,o=e.value,a=e.onChange,i=e.errors,c=i&&i[n]?"has-error":"calm";return React.createElement("div",{className:"input-form"},this.label,React.createElement("input",u({className:c},{type:t,name:n,placeholder:r,value:o,onChange:function(e){return a(e.target.value)}})),this.error)}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===l.State.Submitting?" sending":" ready")}},{key:"label",get:function(){var e=this.props.label;return e?React.createElement("label",{className:"input-label"},e):null}},{key:"error",get:function(){var e=this.props,t=e.errors,n=e.name;return React.createElement(d.default,{errors:t,name:n})}}]),t}(s.ComponentComponent);t.default=m}});