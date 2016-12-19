!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=63)}({0:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){var e=this.props,t=["fa"];return t.push("fa-"+e.icon),e.scale&&t.push("fa-"+e.scale+"x"),(void 0===e.fixedWidth||e.fixedWidth===!0)&&t.push("fa-fw"),e.list&&t.push("fa-li"),e.border&&t.push("fa-border"),e.pull&&t.push("fa-pull-"+e.pull),e.animation&&t.push("fa-"+e.animation),e.rotate&&t.push("fa-rotate-"+e.rotate),e.flip&&t.push("fa-flip-"+e.flip),React.createElement("i",{className:t.join(" ")})}}]),t}(React.Component);t.default=a},1:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=t.ComponentComponent=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),a(t,[{key:"dispatch",value:function(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(t=this.context.emitter).emit.apply(t,[e].concat(r))}},{key:"componentWillMount",value:function(){this.setState(this.initialState(this.props))}},{key:"initialState",value:function(e){return{}}}]),t}(React.Component);t.ContextComponent=function(e){function t(e){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),a(t,[{key:"componentWillUnmount",value:function(){var e=this;this.addedOnStore.map(function(t){var n=t.eventName,r=t.callback;return e.emitter.removeListener(n,r),n})}},{key:"componentWillMount",value:function(){var e=this;i(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentWillMount",this).call(this),this.emitter||(this.emitter=this.context.emitter||new EventEmitter,this.listen(function(t,n){e.addedOnStore.push({eventName:t,callback:n}),e.emitter.on(t,n)}))}},{key:"getChildContext",value:function(){return{emitter:this.context.emitter||this.emitter}}},{key:"render",value:function(){var e=Object.assign({},this.props,this.state);delete e.children;var t=this.props.children;return React.createElement("div",{className:"context-wrapper"},t.map(function(t,n){return React.cloneElement(t,Object.assign(e,{key:n}))}))}},{key:"addedOnStore",get:function(){return this._addedOnStore||(this._addedOnStore=[]),this._addedOnStore}}]),t}(u)},13:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};return React.createElement("section",{className:"com input-section"},React.createElement(a.default,{errors:i,type:t,name:n,placeholder:r,label:o,value:e.state[n],onChange:function(t){var r={};r[n]=t,e.setState(r)}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.writeInput=o;var i=n(7),a=r(i)},14:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.feeder=function(e){e.prototype.dispatch=function(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(t=this.context.emitter).emit.apply(t,[e].concat(r))}},t.boss=function(e){e.prototype={__proto__:e.prototype,get addedOnStore(){return this._addedOnStore||(this._addedOnStore=[]),this._addedOnStore}};var t=e.prototype.componentWillUnmount;e.prototype.componentWillUnmount=function(){var e=this;t&&t.call(this),this.addedOnStore.map(function(t){var n=t.eventName,r=t.callback;return e.emitter.removeListener(n,r),n})};var n=e.prototype.componentWillMount;e.prototype.componentWillMount=function(){var e=this;n&&n.call(this),this.emitter||(this.emitter=this.context.emitter||new EventEmitter,this.listen(function(t,n){e.addedOnStore.push({eventName:t,callback:n}),e.emitter.on(t,n)}))};var r=e.prototype.getChildContext;e.prototype.getChildContext=function(){var e=r?r.call(this):{};return Object.assign(e,{emitter:this.context.emitter||this.emitter})},e.prototype.render=function(){var e=Object.assign({},this.props,this.state);delete e.children;var t=this.props.children;return React.createElement("div",{className:"context-wrapper"},t.map(function(t,n){return React.cloneElement(t,Object.assign(e,{key:n}))}))}}},2:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.State={Waiting:0,Submitting:1,Fail:2,Success:3}},29:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var u,c,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(3),f=r(l),p=n(2),d=n(0),m=r(d),h=n(4),y=r(h),b=n(13),v=(n(47),n(14));window.LogIn=function(){function e(){a(this,e)}return s(e,null,[{key:"start",value:function(e){ReactDOM.render(React.createElement(g,null,React.createElement(_,null)),e)}}]),e}();var g=(0,v.boss)(u=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"componentWillMount",value:function(){this.setState({state:p.State.Waiting,loggedIn:!1})}},{key:"listen",value:function(e){var t=this;e("submit",function(e){return t.submit(e)})}},{key:"succeed",value:function(){location.reload()}},{key:"submit",value:function(e){var t=this;this.setState({state:p.State.Submitting}),f.default.logIn(e).then(function(){t.succeed(),t.setState({loggedIn:!0})}).catch(function(){t.setState({state:p.State.Fail})})}}]),t}(React.Component))||u,_=(0,v.feeder)(c=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"componentWillMount",value:function(){this.setState({login:"",password:""})}},{key:"render",value:function(){var e=this,t=this.props.state;return React.createElement("article",{className:"user-log-in body"},React.createElement("section",{className:"com border-box-container"},React.createElement("h1",{className:"com border-box-title-area"},"Sign in"),React.createElement("form",{className:"com form-area"},(0,b.writeInput)(this,"text","login","ID",null),(0,b.writeInput)(this,"password","password","Password",null),React.createElement("section",{className:"com submit-section"},React.createElement(y.default,{state:t,icon:"sign-in",text:"Sign in",className:"submit",onClick:function(){return e.dispatch("submit",e.params)}}))),this.processMessages))}},{key:"params",get:function(){var e=this.state,t=e.login,n=e.password;return{login:t,password:n}}},{key:"processMessages",get:function(){if(this.props.loggedIn)return React.createElement("p",{className:"com message-area success-message"},React.createElement(m.default,{icon:"paw"}),"Signed in.");switch(this.props.state){case p.State.Fail:return React.createElement("p",{className:"com message-area error-message"},React.createElement(m.default,{icon:"ban"}),"Couldn't sign in.");case p.State.Success:case p.State.Submitting:return React.createElement("p",{className:"com message-area submitting-message"},"Submitting...");case p.State.Waiting:default:return null}}}]),t}(React.Component))||c},3:function(e,t){"use strict";function n(e,t){return new Promise(function(n,o){r(e,t,n,o)})}function r(e,t,n,r){f=f.then(function(){return new Promise(function(i,a){o(e,t,n,r,i)})})}function o(e,t,n,r,o){var a=e.uri;if(a.indexOf(":")!==-1)var u=s(a,t),c=u.normalized,l=u.trimmed;i(n,r,o,c||a,e.method,e.params(l||t))}function i(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};a(r,o).send(i).end(c(e,t,n))}function a(e,t){var n=u(request,e,t);return t===p.Get?n:n.set("X-CSRF-Token",l())}function u(e,t,n){switch(n){case p.Get:return e.get(t);case p.Post:return e.post(t);case p.Patch:return e.patch(t);case p.Put:return e.put(t);case p.Delete:return e.delete(t)}}function c(e,t,n){return function(r,o){r?t(o.body&&o.body.errors?o.body:{errors:{unknown:[r]}}):e(o.body),n()}}function s(e,t){var n=t.questionId;delete t.questionId;var r=t.groupId;delete t.groupId;var o=t.commentId;delete t.commentId;var i=t.invitationId;delete t.invitationId;var a=t.messageId;delete t.messageId;var u=e.replace(":messageId",a).replace(":invitationId",i).replace(":questionId",n).replace(":commentId",o).replace(":groupId",r);return{trimmed:t,normalized:u}}function l(){try{return document.getElementsByName("csrf-token")[0].getAttribute("content")}catch(e){return""}}Object.defineProperty(t,"__esModule",{value:!0}),t.strike=n;var f=Promise.resolve(),p={Get:0,Post:1,Patch:2,Put:3,Delete:4},d={};t.default=d;var m=t.Api={disposeMessage:{uri:"/m/:messageId",method:p.Delete,params:function(e){return e}},invite:{uri:"/g/:groupId/invitation",method:p.Post,params:function(e){return{invitations:e}}},disposeGroup:{uri:"/g/:groupId",method:p.Delete,params:function(e){return e}},createGroup:{uri:"/g/new",method:p.Post,params:function(e){return{groups:e}}},acceptInvitation:{uri:"/i/:invitationId/accept",method:p.Patch,params:function(e){return e}},rejectInvitation:{uri:"/i/:invitationId/reject",method:p.Patch,params:function(e){return e}},blockInvitation:{uri:"/i/:invitationId/block",method:p.Patch,params:function(e){return e}},createQuestion:{uri:"/g/:groupId/me/q/new",method:p.Post,params:function(e){return{questions:e}}},answerQuestion:{uri:"/g/:groupId/q/:questionId/answer",method:p.Patch,params:function(e){return{questions:e}}},assignUserQuestion:{uri:"/g/:groupId/q/:questionId/assign",method:p.Patch,params:function(e){return{questions:e}}},waitAnswerQuestion:{uri:"/g/:groupId/q/:questionId/wait",method:p.Patch,params:function(e){return{}}},sorryQuestion:{uri:"/g/:groupId/q/:questionId/sorry",method:p.Patch,params:function(e){return{}}},replyToReply:{uri:"/g/:groupId/q/:questionId/a/:commentId/res",method:p.Post,params:function(e){return{questions:e}}},finishQuestion:{uri:"/g/:groupId/q/:questionId/finish",method:p.Patch,params:function(e){return{}}},logIn:{uri:"/in",method:p.Post,params:function(e){return{user_sessions:e}}},logOut:{uri:"/out",method:p.Delete,params:function(e){return{}}},createUser:{uri:"/welcome/new",method:p.Post,params:function(e){return{users:e}}},updateUser:{uri:"/me",method:p.Patch,params:function(e){return{users:e}}},destroyUser:{uri:"/me",method:p.Delete,params:function(e){return{}}},changePassword:{uri:"/me/password",method:p.Patch,params:function(e){return e.password_now=e.passwordNow,delete e.passwordNow,{users:e}}}};!function(){var e=function(e){d[e]=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return n.apply(void 0,[m[e]].concat(r))}};for(var t in m)e(t)}()},4:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=n(2),l=n(0),f=r(l),p=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.onClick,r=e.icon,o=e.state,i=e.disabled,a=this.className;switch(o){case s.State.Submitting:return React.createElement("button",{className:this.className,disabled:!0},React.createElement(f.default,{icon:"spinner",animation:"pulse"}),t);case s.State.Success:case s.State.Waiting:case s.State.Fail:default:return React.createElement("button",{className:a,disabled:i,onClick:function(e){e.preventDefault(),n(e)}},React.createElement(f.default,{icon:r}),t)}}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===s.State.Submitting?" sending":" ready")}}]),t}(c.ComponentComponent);t.default=p},47:function(e,t,n){var r,o,i;!function(n,a){o=[t],r=a,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i))}(this,function(e){"use strict";function t(e,t){t=t||e.decorate||n(e);var r=t();return function(){for(var n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];var a=o.length;return(a<2?t:a>2?r:e).apply(void 0,o)}}function n(e){return function(t){return"function"==typeof t?e(t):function(n,r,o){o.value=e(o.value,t,n,r,o)}}}e.__esModule=!0;var r={},o=Object.prototype.hasOwnProperty,i={memoize:function(e){var t=arguments.length<=1||void 0===arguments[1]?r:arguments[1],n=t.cache||{};return function(){for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];var u=String(i[0]);return t.caseSensitive===!1&&(u=u.toLowerCase()),o.call(n,u)?n[u]:n[u]=e.apply(this,i)}},debounce:function(e,t){if("function"==typeof t){var n=e;e=t,t=n}var r=t&&t.delay||t||0,o=void 0,i=void 0,a=void 0;return function(){for(var t=arguments.length,n=Array(t),u=0;u<t;u++)n[u]=arguments[u];o=n,i=this,a||(a=setTimeout(function(){e.apply(i,o),o=i=a=null},r))}},bind:function(e,t,n){var r=n.value;return{configurable:!0,get:function(){var e=r.bind(this);return Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0}),e}}}},a=t(i.memoize),u=t(i.debounce),c=t(function(e,t){return e.bind(t)},function(){return i.bind});e.memoize=a,e.debounce=u,e.bind=c,e.default={memoize:a,debounce:u,bind:c}})},6:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=(n(2),n(0)),l=(r(s),function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"wrap",value:function(e){switch(!0){case!e:return[];case e.map:return e;default:return[e]}}},{key:"render",value:function(){var e=this.props,t=e.errors,n=e.name;if(!t)return null;var r=this.wrap(t[n]);return 0===r.length?null:React.createElement("ul",{className:"error-messages"},r.map(function(e,t){return React.createElement("li",{className:"error-message",key:t},e)}))}}]),t}(c.ComponentComponent));t.default=l},63:function(e,t,n){e.exports=n(29)},7:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),l=n(2),f=n(0),p=(r(f),n(6)),d=r(p),m=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={value:n.props.initialValue},n}return a(t,e),c(t,[{key:"render",value:function(){var e=this.props,t=e.type,n=e.name,r=e.placeholder,o=e.value,i=e.onChange,a=e.errors,c=a&&a[n]?"has-error":"calm";return React.createElement("div",{className:"input-form"},this.label,React.createElement("input",u({className:c},{type:t,name:n,placeholder:r,value:o,onChange:function(e){return i(e.target.value)}})),this.error)}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===l.State.Submitting?" sending":" ready")}},{key:"label",get:function(){var e=this.props.label;return e?React.createElement("label",{className:"input-label"},e):null}},{key:"error",get:function(){var e=this.props,t=e.errors,n=e.name;return React.createElement(d.default,{errors:t,name:n})}}]),t}(s.ComponentComponent);t.default=m}});