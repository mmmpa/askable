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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "javascripts";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

"use strict";
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

/***/ 1:
/***/ function(module, exports) {

"use strict";
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

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = __webpack_require__(1);

var _state = __webpack_require__(2);

var _fa = __webpack_require__(0);

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

/***/ 2:
/***/ function(module, exports) {

"use strict";
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

/***/ 28:
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var feeder = exports.feeder = function feeder(klass) {
  klass.prototype.dispatch = function (event) {
    var _context$emitter;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_context$emitter = this.context.emitter).emit.apply(_context$emitter, [event].concat(args));
  };
};

var boss = exports.boss = function boss(klass) {
  klass.prototype = {
    __proto__: klass.prototype,
    get addedOnStore() {
      this._addedOnStore || (this._addedOnStore = []);
      return this._addedOnStore;
    }
  };

  var componentWillUnmount = klass.prototype.componentWillUnmount;
  klass.prototype.componentWillUnmount = function () {
    var _this = this;

    componentWillUnmount && componentWillUnmount.call(this);

    this.addedOnStore.map(function (_ref) {
      var eventName = _ref.eventName,
          callback = _ref.callback;

      _this.emitter.removeListener(eventName, callback);
      return eventName;
    });
  };

  var componentWillMount = klass.prototype.componentWillMount;

  klass.prototype.componentWillMount = function () {
    var _this2 = this;

    componentWillMount && componentWillMount.call(this);

    if (!this.emitter) {
      this.emitter = this.context.emitter || new EventEmitter();
      this.listen(function (eventName, callback) {
        _this2.addedOnStore.push({ eventName: eventName, callback: callback });
        _this2.emitter.on(eventName, callback);
      });
    }
  };

  var getChildContext = klass.prototype.getChildContext;

  klass.prototype.getChildContext = function () {
    var base = getChildContext ? getChildContext.call(this) : {};

    return Object.assign(base, { emitter: this.context.emitter || this.emitter });
  };

  klass.prototype.render = function () {
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
  };
};

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = __webpack_require__(1);

var _state = __webpack_require__(2);

var _fa = __webpack_require__(0);

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
            React.createElement(_fa2.default, { icon: 'spinner', animation: 'pulse' }),
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

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _class2, _class3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fa = __webpack_require__(0);

var _fa2 = _interopRequireDefault(_fa);

var _submitButton = __webpack_require__(5);

var _submitButton2 = _interopRequireDefault(_submitButton);

var _inputForm = __webpack_require__(10);

var _inputForm2 = _interopRequireDefault(_inputForm);

var _state2 = __webpack_require__(2);

var _hubMixins = __webpack_require__(28);

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

var Context = (0, _hubMixins.boss)(_class2 = function (_React$Component) {
  _inherits(Context, _React$Component);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, (Context.__proto__ || Object.getPrototypeOf(Context)).apply(this, arguments));
  }

  _createClass(Context, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        state: _state2.State.Waiting
      });
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
}(React.Component)) || _class2;

var Component = (0, _hubMixins.feeder)(_class3 = function (_React$Component2) {
  _inherits(Component, _React$Component2);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
  }

  _createClass(Component, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state = {
        name: '',
        login: '',
        email: '',
        password: ''
      };
    }
  }, {
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
    key: 'render',
    value: function render() {
      switch (this.props.state) {
        case _state2.State.Success:
          return this.result;
        case _state2.State.Submitting:
        case _state2.State.Waiting:
        case _state2.State.Fail:
        default:
          return this.form;
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
  }, {
    key: 'form',
    get: function get() {
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
            'Sign up'
          ),
          React.createElement(
            'div',
            { className: 'com form-area' },
            this.writeInput('text', 'name', 'Display name', errors),
            this.writeInput('text', 'login', 'ID to sign in', errors),
            this.writeInput('text', 'email', 'E-mail address', errors),
            this.writeInput('password', 'password', 'Password', errors),
            React.createElement(
              'section',
              { className: 'com submit-section' },
              React.createElement(_submitButton2.default, {
                state: state, icon: "send-o", text: "Sign up !", className: 'submit',
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
    key: 'result',
    get: function get() {
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
            'Completed to sign up'
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
                'Display name'
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
                'ID to sign in'
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
                'E-mail address'
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
              React.createElement(
                'a',
                { href: '/in', className: 'link ready' },
                React.createElement(_fa2.default, { icon: 'sign-in' }),
                'Sign in'
              )
            )
          )
        )
      );
    }
  }]);

  return Component;
}(React.Component)) || _class3;

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = __webpack_require__(1);

var _state = __webpack_require__(2);

var _fa = __webpack_require__(0);

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

/******/ });