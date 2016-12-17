!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=74)}({0:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),a(t,[{key:"render",value:function(){var e=this.props,t=["fa"];return t.push("fa-"+e.icon),e.scale&&t.push("fa-"+e.scale+"x"),(void 0===e.fixedWidth||e.fixedWidth===!0)&&t.push("fa-fw"),e.list&&t.push("fa-li"),e.border&&t.push("fa-border"),e.pull&&t.push("fa-pull-"+e.pull),e.animation&&t.push("fa-"+e.animation),e.rotate&&t.push("fa-rotate-"+e.rotate),e.flip&&t.push("fa-flip-"+e.flip),React.createElement("i",{className:t.join(" ")})}}]),t}(React.Component);t.default=i},1:function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var a=Object.getPrototypeOf(t);return null===a?void 0:e(a,n,r)}if("value"in o)return o.value;var i=o.get;if(void 0!==i)return i.call(r)},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=t.ComponentComponent=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),i(t,[{key:"dispatch",value:function(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(t=this.context.emitter).emit.apply(t,[e].concat(r))}},{key:"componentWillMount",value:function(){this.setState(this.initialState(this.props))}},{key:"initialState",value:function(e){return{}}}]),t}(React.Component);t.ContextComponent=function(e){function t(e){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),i(t,[{key:"componentWillUnmount",value:function(){var e=this;this.addedOnStore.map(function(t){var n=t.eventName,r=t.callback;return e.emitter.removeListener(n,r),n})}},{key:"componentWillMount",value:function(){var e=this;a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"componentWillMount",this).call(this),this.emitter||(this.emitter=this.context.emitter||new EventEmitter,this.listen(function(t,n){e.addedOnStore.push({eventName:t,callback:n}),e.emitter.on(t,n)}))}},{key:"getChildContext",value:function(){return{emitter:this.context.emitter||this.emitter}}},{key:"render",value:function(){var e=Object.assign({},this.props,this.state);delete e.children;var t=this.props.children;return React.createElement("div",{className:"context-wrapper"},t.map(function(t,n){return React.cloneElement(t,Object.assign(e,{key:n}))}))}},{key:"addedOnStore",get:function(){return this._addedOnStore||(this._addedOnStore=[]),this._addedOnStore}}]),t}(c)},2:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.State={Waiting:0,Submitting:1,Fail:2,Success:3}},36:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c,s,u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),f=r(l),p=n(4),m=r(p),h=n(7),d=r(h),b=n(2),y=n(40);window.Welcome=function(){function e(){i(this,e)}return u(e,null,[{key:"start",value:function(e){ReactDOM.render(React.createElement(v,null,React.createElement(_,null)),e)}}]),e}();var v=(0,y.boss)(c=function(e){function t(){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.setState({state:b.State.Waiting})}},{key:"submit",value:function(e){var t=this;this.setState({state:b.State.Submitting}),API.createUser(e).then(function(e){t.setState({result:e,errors:{},state:b.State.Success})}).catch(function(e){var n=e.errors;t.setState({errors:n,state:b.State.Fail})})}},{key:"listen",value:function(e){var t=this;e("submit",function(e){t.submit(e)})}}]),t}(React.Component))||c,_=(0,y.feeder)(s=function(e){function t(){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.state={name:"",login:"",email:"",password:""}}},{key:"writeInput",value:function(e,t,n,r){var o=this;return React.createElement("section",{className:"com input-section"},React.createElement(d.default,{errors:r,type:e,name:t,placeholder:n,value:this.state[t],onChange:function(e){var n={};n[t]=e,o.setState(n)}}))}},{key:"writeForm",value:function(){var e=this,t=this.props,n=t.state,r=t.errors;return React.createElement("article",{className:"user-register body"},React.createElement("section",{className:"com border-box-container"},React.createElement("h1",{className:"com border-box-title-area"},"登録内容を入力してください"),React.createElement("div",{className:"com form-area"},this.writeInput("text","name","表示する名前",r),this.writeInput("text","login","ログイン用ID",r),this.writeInput("text","email","メールアドレス",r),this.writeInput("password","password","パスワード",r),React.createElement("section",{className:"com submit-section"},React.createElement(m.default,{state:n,icon:"send-o",text:"登録する",className:"submit",onClick:function(){return e.dispatch("submit",e.params)}})))))}},{key:"writeResult",value:function(){var e=this.props.result||{},t=e.name,n=e.login,r=e.email;return React.createElement("article",{className:"user-registered body"},React.createElement("section",{className:"com border-box-container"},React.createElement("h1",{className:"com border-box-title-area"},"以下の内容で登録されました"),React.createElement("div",{className:"com form-area"},React.createElement("section",{className:"com input-section"},React.createElement("h1",{className:"user-registered info-label"},"表示する名前"),React.createElement("p",{className:"user-registered info"},t)),React.createElement("section",{className:"com input-section"},React.createElement("h1",{className:"user-registered info-label"},"ログイン用ID"),React.createElement("p",{className:"user-registered info"},n)),React.createElement("section",{className:"com input-section"},React.createElement("h1",{className:"user-registered info-label"},"メールアドレス"),React.createElement("p",{className:"user-registered info"},r)),React.createElement("section",{className:"user-registered link-section"},React.createElement(f.default,{icon:"sign-in"}),React.createElement("a",{href:"/in"},"ログイン")))))}},{key:"render",value:function(){switch(this.props.state){case b.State.Success:return this.writeResult();case b.State.Submitting:case b.State.Waiting:case b.State.Fail:default:return this.writeForm()}}},{key:"params",get:function(){var e=this.state,t=e.name,n=e.login,r=e.email,o=e.password;return{name:t,login:n,email:r,password:o}}}]),t}(React.Component))||s},4:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),u=n(2),l=n(0),f=r(l),p=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.onClick,r=e.icon,o=e.state,a=e.disabled,i=this.className;switch(o){case u.State.Submitting:return React.createElement("button",{className:this.className,disabled:!0},React.createElement(f.default,{icon:r,animation:"pulse"}),t);case u.State.Success:case u.State.Waiting:case u.State.Fail:default:return React.createElement("button",{className:i,disabled:a,onClick:function(e){e.preventDefault(),n(e)}},React.createElement(f.default,{icon:r}),t)}}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===u.State.Submitting?" sending":" ready")}}]),t}(s.ComponentComponent);t.default=p},40:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.feeder=function(e){e.prototype.dispatch=function(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(t=this.context.emitter).emit.apply(t,[e].concat(r))}},t.boss=function(e){e.prototype={__proto__:e.prototype,get addedOnStore(){return this._addedOnStore||(this._addedOnStore=[]),this._addedOnStore}};var t=e.prototype.componentWillUnmount;e.prototype.componentWillUnmount=function(){var e=this;t&&t.call(this),this.addedOnStore.map(function(t){var n=t.eventName,r=t.callback;return e.emitter.removeListener(n,r),n})};var n=e.prototype.componentWillMount;e.prototype.componentWillMount=function(){var e=this;n&&n.call(this),this.emitter||(this.emitter=this.context.emitter||new EventEmitter,this.listen(function(t,n){e.addedOnStore.push({eventName:t,callback:n}),e.emitter.on(t,n)}))};var r=e.prototype.getChildContext;e.prototype.getChildContext=function(){var e=r?r.call(this):{};return Object.assign(e,{emitter:this.context.emitter||this.emitter})},e.prototype.render=function(){var e=Object.assign({},this.props,this.state);delete e.children;var t=this.props.children;return React.createElement("div",{className:"context-wrapper"},t.map(function(t,n){return React.cloneElement(t,Object.assign(e,{key:n}))}))}}},6:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),u=(n(2),n(0)),l=(r(u),function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"wrap",value:function(e){switch(!0){case!e:return[];case e.map:return e;default:return[e]}}},{key:"render",value:function(){var e=this.props,t=e.errors,n=e.name;if(!t)return null;var r=this.wrap(t[n]);return 0===r.length?null:React.createElement("ul",{className:"error-messages"},r.map(function(e,t){return React.createElement("li",{className:"error-message",key:t},e)}))}}]),t}(s.ComponentComponent));t.default=l},7:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(1),l=n(2),f=n(0),p=(r(f),n(6)),m=r(p),h=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={value:n.props.initialValue},n}return i(t,e),s(t,[{key:"render",value:function(){var e=this.props,t=e.type,n=e.name,r=e.placeholder,o=e.value,a=e.onChange,i=e.errors,s=i&&i[n]?"has-error":"calm";return React.createElement("div",{className:"input-form"},this.label,React.createElement("input",c({className:s},{type:t,name:n,placeholder:r,value:o,onChange:function(e){return a(e.target.value)}})),this.error)}},{key:"className",get:function(){var e=this.props,t=e.className,n=e.state;return t+(n===l.State.Submitting?" sending":" ready")}},{key:"label",get:function(){var e=this.props.label;return e?React.createElement("label",{className:"input-label"},e):null}},{key:"error",get:function(){var e=this.props,t=e.errors,n=e.name;return React.createElement(m.default,{errors:t,name:n})}}]),t}(u.ComponentComponent);t.default=h},74:function(e,t,n){e.exports=n(36)}});