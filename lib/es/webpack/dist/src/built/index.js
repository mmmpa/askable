/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _parcel = __webpack_require__(1);

	var _fa = __webpack_require__(2);

	var _fa2 = _interopRequireDefault(_fa);

	var _submitButton = __webpack_require__(3);

	var _submitButton2 = _interopRequireDefault(_submitButton);

	var _inputForm = __webpack_require__(5);

	var _inputForm2 = _interopRequireDefault(_inputForm);

	var _state2 = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.Welcome = function () {
	  function _class() {
	    _classCallCheck(this, _class);
	  }

	  _createClass(_class, null, [{
	    key: 'start',
	    value: function start(dom) {
	      ReactDOM.render(React.createElement(
	        Context,
	        null,
	        React.createElement(Component, null)
	      ), dom);
	    }
	  }]);

	  return _class;
	}();

	var Context = function (_ContextComponent) {
	  _inherits(Context, _ContextComponent);

	  function Context() {
	    _classCallCheck(this, Context);

	    return _possibleConstructorReturn(this, (Context.__proto__ || Object.getPrototypeOf(Context)).apply(this, arguments));
	  }

	  _createClass(Context, [{
	    key: 'initialState',
	    value: function initialState(props) {
	      return {
	        state: _state2.State.Waiting
	      };
	    }
	  }, {
	    key: 'submit',
	    value: function submit(params) {
	      var _this2 = this;

	      this.setState({ state: _state2.State.Submitting });
	      API.createUser(params).then(function (result) {
	        _this2.setState({ result: result, errors: {}, state: _state2.State.Success });
	      }).catch(function (result) {
	        var errors = result.errors;

	        _this2.setState({ errors: errors, state: _state2.State.Fail });
	      });
	    }
	  }, {
	    key: 'listen',
	    value: function listen(to) {
	      var _this3 = this;

	      to('submit', function (params) {
	        _this3.submit(params);
	      });
	    }
	  }]);

	  return Context;
	}(_parcel.ContextComponent);

	var Component = function (_ComponentComponent) {
	  _inherits(Component, _ComponentComponent);

	  function Component(props) {
	    _classCallCheck(this, Component);

	    var _this4 = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

	    _this4.state = {
	      name: '',
	      login: '',
	      email: '',
	      password: ''
	    };
	    return _this4;
	  }

	  _createClass(Component, [{
	    key: 'writeInput',
	    value: function writeInput(type, name, placeholder, errors) {
	      var _this5 = this;

	      return React.createElement(
	        'section',
	        { className: 'com input-section' },
	        React.createElement(_inputForm2.default, {
	          errors: errors, type: type, name: name, placeholder: placeholder, value: this.state[name],
	          onChange: function onChange(v) {
	            var p = {};
	            p[name] = v;
	            _this5.setState(p);
	          }
	        })
	      );
	    }
	  }, {
	    key: 'writeForm',
	    value: function writeForm() {
	      var _this6 = this;

	      var _props = this.props,
	          state = _props.state,
	          errors = _props.errors;


	      return React.createElement(
	        'article',
	        { className: 'user-register body' },
	        React.createElement(
	          'section',
	          { className: 'com border-box-container' },
	          React.createElement(
	            'h1',
	            { className: 'com border-box-title-area' },
	            '\u767B\u9332\u5185\u5BB9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044'
	          ),
	          React.createElement(
	            'div',
	            { className: 'com form-area' },
	            this.writeInput('text', 'name', '表示する名前', errors),
	            this.writeInput('text', 'login', 'ログイン用ID', errors),
	            this.writeInput('text', 'email', 'メールアドレス', errors),
	            this.writeInput('password', 'password', 'パスワード', errors),
	            React.createElement(
	              'section',
	              { className: 'com submit-section' },
	              React.createElement(_submitButton2.default, {
	                state: state, icon: "send-o", text: "登録する", className: 'submit',
	                onClick: function onClick() {
	                  return _this6.dispatch('submit', _this6.params);
	                }
	              })
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: 'writeResult',
	    value: function writeResult() {
	      var _ref = this.props.result || {},
	          name = _ref.name,
	          login = _ref.login,
	          email = _ref.email;

	      return React.createElement(
	        'article',
	        { className: 'user-registered body' },
	        React.createElement(
	          'section',
	          { className: 'com border-box-container' },
	          React.createElement(
	            'h1',
	            { className: 'com border-box-title-area' },
	            '\u4EE5\u4E0B\u306E\u5185\u5BB9\u3067\u767B\u9332\u3055\u308C\u307E\u3057\u305F'
	          ),
	          React.createElement(
	            'div',
	            { className: 'com form-area' },
	            React.createElement(
	              'section',
	              { className: 'com input-section' },
	              React.createElement(
	                'h1',
	                { className: 'user-registered info-label' },
	                '\u8868\u793A\u3059\u308B\u540D\u524D'
	              ),
	              React.createElement(
	                'p',
	                { className: 'user-registered info' },
	                name
	              )
	            ),
	            React.createElement(
	              'section',
	              { className: 'com input-section' },
	              React.createElement(
	                'h1',
	                { className: 'user-registered info-label' },
	                '\u30ED\u30B0\u30A4\u30F3\u7528ID'
	              ),
	              React.createElement(
	                'p',
	                { className: 'user-registered info' },
	                login
	              )
	            ),
	            React.createElement(
	              'section',
	              { className: 'com input-section' },
	              React.createElement(
	                'h1',
	                { className: 'user-registered info-label' },
	                '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9'
	              ),
	              React.createElement(
	                'p',
	                { className: 'user-registered info' },
	                email
	              )
	            ),
	            React.createElement(
	              'section',
	              { className: 'user-registered link-section' },
	              React.createElement(_fa2.default, { icon: 'sign-in' }),
	              React.createElement(
	                'a',
	                { href: '/in' },
	                '\u30ED\u30B0\u30A4\u30F3'
	              )
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      switch (this.props.state) {
	        case _state2.State.Success:
	          return this.writeResult();
	        case _state2.State.Submitting:
	        case _state2.State.Waiting:
	        case _state2.State.Fail:
	        default:
	          return this.writeForm();
	      }
	    }
	  }, {
	    key: 'params',
	    get: function get() {
	      var _state = this.state,
	          name = _state.name,
	          login = _state.login,
	          email = _state.email,
	          password = _state.password;

	      return { name: name, login: login, email: email, password: password };
	    }
	  }]);

	  return Component;
	}(_parcel.ComponentComponent);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ComponentComponent = exports.ComponentComponent = function (_React$Component) {
	  _inherits(ComponentComponent, _React$Component);

	  function ComponentComponent() {
	    _classCallCheck(this, ComponentComponent);

	    return _possibleConstructorReturn(this, (ComponentComponent.__proto__ || Object.getPrototypeOf(ComponentComponent)).apply(this, arguments));
	  }

	  _createClass(ComponentComponent, [{
	    key: "dispatch",
	    value: function dispatch(event) {
	      var _context$emitter;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return (_context$emitter = this.context.emitter).emit.apply(_context$emitter, [event].concat(args));
	    }
	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setState(this.initialState(this.props));
	    }
	  }, {
	    key: "initialState",
	    value: function initialState(props) {
	      return {};
	    }
	  }]);

	  return ComponentComponent;
	}(React.Component);

	var ContextComponent = exports.ContextComponent = function (_ComponentComponent) {
	  _inherits(ContextComponent, _ComponentComponent);

	  function ContextComponent(props) {
	    _classCallCheck(this, ContextComponent);

	    return _possibleConstructorReturn(this, (ContextComponent.__proto__ || Object.getPrototypeOf(ContextComponent)).call(this, props));
	  }

	  _createClass(ContextComponent, [{
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var _this3 = this;

	      this.addedOnStore.map(function (_ref) {
	        var eventName = _ref.eventName,
	            callback = _ref.callback;

	        _this3.emitter.removeListener(eventName, callback);
	        return eventName;
	      });
	    }
	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      var _this4 = this;

	      _get(ContextComponent.prototype.__proto__ || Object.getPrototypeOf(ContextComponent.prototype), "componentWillMount", this).call(this);

	      if (!this.emitter) {
	        this.emitter = this.context.emitter || new EventEmitter();
	        this.listen(function (eventName, callback) {
	          _this4.addedOnStore.push({ eventName: eventName, callback: callback });
	          _this4.emitter.on(eventName, callback);
	        });
	      }
	    }
	  }, {
	    key: "getChildContext",
	    value: function getChildContext() {
	      return { emitter: this.context.emitter || this.emitter };
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var props = Object.assign({}, this.props, this.state);
	      delete props.children;

	      var children = this.props.children;


	      return React.createElement(
	        "div",
	        { className: "context-wrapper" },
	        children.map(function (child, i) {
	          return React.cloneElement(child, Object.assign(props, { key: i }));
	        })
	      );
	    }
	  }, {
	    key: "addedOnStore",
	    get: function get() {
	      this._addedOnStore || (this._addedOnStore = []);
	      return this._addedOnStore;
	    }
	  }]);

	  return ContextComponent;
	}(ComponentComponent);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Fa = function (_React$Component) {
	  _inherits(Fa, _React$Component);

	  function Fa() {
	    _classCallCheck(this, Fa);

	    return _possibleConstructorReturn(this, (Fa.__proto__ || Object.getPrototypeOf(Fa)).apply(this, arguments));
	  }

	  _createClass(Fa, [{
	    key: "render",
	    value: function render() {
	      var p = this.props;
	      var classes = ['fa'];
	      classes.push("fa-" + p.icon);
	      p.scale && classes.push("fa-" + p.scale + "x");
	      (p.fixedWidth === undefined || p.fixedWidth === true) && classes.push('fa-fw');
	      p.list && classes.push('fa-li');
	      p.border && classes.push('fa-border');
	      p.pull && classes.push("fa-pull-" + p.pull);
	      p.animation && classes.push("fa-" + p.animation);
	      p.rotate && classes.push("fa-rotate-" + p.rotate);
	      p.flip && classes.push("fa-flip-" + p.flip);

	      return React.createElement("i", { className: classes.join(' ') });
	    }
	  }]);

	  return Fa;
	}(React.Component);

	exports.default = Fa;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _parcel = __webpack_require__(1);

	var _state = __webpack_require__(4);

	var _fa = __webpack_require__(2);

	var _fa2 = _interopRequireDefault(_fa);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SubmitButton = function (_ComponentComponent) {
	  _inherits(SubmitButton, _ComponentComponent);

	  function SubmitButton() {
	    _classCallCheck(this, SubmitButton);

	    return _possibleConstructorReturn(this, (SubmitButton.__proto__ || Object.getPrototypeOf(SubmitButton)).apply(this, arguments));
	  }

	  _createClass(SubmitButton, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          text = _props.text,
	          _onClick = _props.onClick,
	          icon = _props.icon,
	          state = _props.state,
	          disabled = _props.disabled;
	      var className = this.className;


	      switch (state) {
	        case _state.State.Submitting:
	          return React.createElement(
	            'button',
	            { className: this.className, disabled: true },
	            React.createElement(_fa2.default, { icon: icon, animation: 'pulse' }),
	            text
	          );
	        case _state.State.Success:
	        case _state.State.Waiting:
	        case _state.State.Fail:
	        default:
	          return React.createElement(
	            'button',
	            { className: className, disabled: disabled, onClick: function onClick(e) {
	                e.preventDefault();
	                _onClick(e);
	              } },
	            React.createElement(_fa2.default, { icon: icon }),
	            text
	          );
	      }
	    }
	  }, {
	    key: 'className',
	    get: function get() {
	      var _props2 = this.props,
	          className = _props2.className,
	          state = _props2.state;

	      return className + (state === _state.State.Submitting ? ' sending' : ' ready');
	    }
	  }]);

	  return SubmitButton;
	}(_parcel.ComponentComponent);

	exports.default = SubmitButton;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var State = exports.State = {
	  Waiting: 0,
	  Submitting: 1,
	  Fail: 2,
	  Success: 3
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _parcel = __webpack_require__(1);

	var _state = __webpack_require__(4);

	var _fa = __webpack_require__(2);

	var _fa2 = _interopRequireDefault(_fa);

	var _errorMessage = __webpack_require__(6);

	var _errorMessage2 = _interopRequireDefault(_errorMessage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InputForm = function (_ComponentComponent) {
	  _inherits(InputForm, _ComponentComponent);

	  function InputForm(props) {
	    _classCallCheck(this, InputForm);

	    var _this = _possibleConstructorReturn(this, (InputForm.__proto__ || Object.getPrototypeOf(InputForm)).call(this, props));

	    _this.state = {
	      value: _this.props.initialValue
	    };
	    return _this;
	  }

	  _createClass(InputForm, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          type = _props.type,
	          name = _props.name,
	          placeholder = _props.placeholder,
	          value = _props.value,
	          _onChange = _props.onChange,
	          errors = _props.errors;


	      var state = !!errors && !!errors[name] ? 'has-error' : 'calm';

	      return React.createElement(
	        'div',
	        { className: 'input-form' },
	        this.label,
	        React.createElement('input', _extends({ className: state }, { type: type, name: name, placeholder: placeholder, value: value, onChange: function onChange(e) {
	            return _onChange(e.target.value);
	          } })),
	        this.error
	      );
	    }
	  }, {
	    key: 'className',
	    get: function get() {
	      var _props2 = this.props,
	          className = _props2.className,
	          state = _props2.state;

	      return className + (state === _state.State.Submitting ? ' sending' : ' ready');
	    }
	  }, {
	    key: 'label',
	    get: function get() {
	      var label = this.props.label;

	      if (!label) {
	        return null;
	      }

	      return React.createElement(
	        'label',
	        { className: 'input-label' },
	        label
	      );
	    }
	  }, {
	    key: 'error',
	    get: function get() {
	      var _props3 = this.props,
	          errors = _props3.errors,
	          name = _props3.name;

	      return React.createElement(_errorMessage2.default, { errors: errors, name: name });
	    }
	  }]);

	  return InputForm;
	}(_parcel.ComponentComponent);

	exports.default = InputForm;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _parcel = __webpack_require__(1);

	var _state = __webpack_require__(4);

	var _fa = __webpack_require__(2);

	var _fa2 = _interopRequireDefault(_fa);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ErrorMessage = function (_ComponentComponent) {
	  _inherits(ErrorMessage, _ComponentComponent);

	  function ErrorMessage() {
	    _classCallCheck(this, ErrorMessage);

	    return _possibleConstructorReturn(this, (ErrorMessage.__proto__ || Object.getPrototypeOf(ErrorMessage)).apply(this, arguments));
	  }

	  _createClass(ErrorMessage, [{
	    key: 'wrap',
	    value: function wrap(errors) {
	      switch (true) {
	        case !errors:
	          return [];
	        case errors.map:
	          return errors;
	        default:
	          return [errors];
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          errors = _props.errors,
	          name = _props.name;

	      if (!errors) {
	        return null;
	      }

	      var myErrors = this.wrap(errors[name]);
	      if (myErrors.length === 0) {
	        return null;
	      }

	      return React.createElement(
	        'ul',
	        { className: 'error-messages' },
	        myErrors.map(function (error, i) {
	          return React.createElement(
	            'li',
	            { className: 'error-message', key: i },
	            error
	          );
	        })
	      );
	    }
	  }]);

	  return ErrorMessage;
	}(_parcel.ComponentComponent);

	exports.default = ErrorMessage;

/***/ }
/******/ ]);