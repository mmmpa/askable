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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
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

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeInput = writeInput;

var _inputForm = __webpack_require__(10);

var _inputForm2 = _interopRequireDefault(_inputForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeInput(self, type, name, placeholder, label) {
  var errors = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  return React.createElement(
    "section",
    { className: "com input-section" },
    React.createElement(_inputForm2.default, {
      errors: errors, type: type, name: name, placeholder: placeholder, label: label, value: self.state[name],
      onChange: function onChange(v) {
        var p = {};
        p[name] = v;
        self.setState(p);
      }
    })
  );
}

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

/***/ 4:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strike = strike;
var jobs = Promise.resolve();

var Method = {
  Get: 0,
  Post: 1,
  Patch: 2,
  Put: 3,
  Delete: 4
};

var methodStore = {};

exports.default = methodStore;
var Api = exports.Api = {
  disposeMessage: {
    uri: '/m/:messageId',
    method: Method.Delete,
    params: function params(p) {
      return p;
    }
  },
  invite: {
    uri: '/g/:groupId/invitation',
    method: Method.Post,
    params: function params(p) {
      return { invitations: p };
    }
  },
  disposeGroup: {
    uri: '/g/:groupId',
    method: Method.Delete,
    params: function params(p) {
      return p;
    }
  },
  createGroup: {
    uri: '/g/new',
    method: Method.Post,
    params: function params(p) {
      return { groups: p };
    }
  },
  acceptInvitation: {
    uri: '/i/:invitationId/accept',
    method: Method.Patch,
    params: function params(p) {
      return p;
    }
  },
  rejectInvitation: {
    uri: '/i/:invitationId/reject',
    method: Method.Patch,
    params: function params(p) {
      return p;
    }
  },
  blockInvitation: {
    uri: '/i/:invitationId/block',
    method: Method.Patch,
    params: function params(p) {
      return p;
    }
  },
  createQuestion: {
    uri: '/g/:groupId/me/q/new',
    method: Method.Post,
    params: function params(p) {
      return { questions: p };
    }
  },
  answerQuestion: {
    uri: '/g/:groupId/q/:questionId/answer',
    method: Method.Patch,
    params: function params(p) {
      return { questions: p };
    }
  },
  assignUserQuestion: {
    uri: '/g/:groupId/q/:questionId/assign',
    method: Method.Patch,
    params: function params(p) {
      return { questions: p };
    }
  },
  waitAnswerQuestion: {
    uri: '/g/:groupId/q/:questionId/wait',
    method: Method.Patch,
    params: function params(p) {
      return {};
    }
  },
  sorryQuestion: {
    uri: '/g/:groupId/q/:questionId/sorry',
    method: Method.Patch,
    params: function params(p) {
      return {};
    }
  },
  replyToReply: {
    uri: '/g/:groupId/q/:questionId/a/:commentId/res',
    method: Method.Post,
    params: function params(p) {
      return { questions: p };
    }
  },
  finishQuestion: {
    uri: '/g/:groupId/q/:questionId/finish',
    method: Method.Patch,
    params: function params(p) {
      return {};
    }
  },
  logIn: {
    uri: '/in',
    method: Method.Post,
    params: function params(p) {
      return { user_sessions: p };
    }
  },
  logOut: {
    uri: '/out',
    method: Method.Delete,
    params: function params(p) {
      return {};
    }
  },
  createUser: {
    uri: '/welcome/new',
    method: Method.Post,
    params: function params(p) {
      return { users: p };
    }
  },
  updateUser: {
    uri: '/me',
    method: Method.Patch,
    params: function params(p) {
      return { users: p };
    }
  },
  destroyUser: {
    uri: '/me',
    method: Method.Delete,
    params: function params(p) {
      return {};
    }
  },
  changePassword: {
    uri: '/me/password',
    method: Method.Patch,
    params: function params(p) {
      p.password_now = p.passwordNow;
      delete p.passwordNow;
      return { users: p };
    }
  }
};

(function () {
  var _loop = function _loop(i) {
    methodStore[i] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return strike.apply(undefined, [Api[i]].concat(args));
    };
  };

  for (var i in Api) {
    _loop(i);
  }
})();

function strike(api, params) {
  return new Promise(function (resolve, reject) {
    add(api, params, resolve, reject);
  });
}

function add(api, params, resolve, reject) {
  jobs = jobs.then(function () {
    return new Promise(function (queueResolve, _) {
      common(api, params, resolve, reject, queueResolve);
    });
  });
}

function common(api, params, resolve, reject, queueResolve) {
  var uri = api.uri;

  if (uri.indexOf(':') !== -1) {
    var _normalize = normalize(uri, params),
        normalized = _normalize.normalized,
        trimmed = _normalize.trimmed;
  }

  build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || params));
}

function build(resolve, reject, queueResolve, uri, method) {
  var params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};


  base(uri, method).send(params).end(finalize(resolve, reject, queueResolve));
}

function base(uri, method) {
  var r = methodEnchantedRequest(request, uri, method);

  return method === Method.Get ? r : r.set('X-CSRF-Token', token());
}

function methodEnchantedRequest(request, uri, method) {
  switch (method) {
    case Method.Get:
      return request.get(uri);
    case Method.Post:
      return request.post(uri);
    case Method.Patch:
      return request.patch(uri);
    case Method.Put:
      return request.put(uri);
    case Method.Delete:
      return request.delete(uri);
  }
}

function finalize(resolve, reject, queueResolve) {
  return function (err, res) {
    if (!!err) {
      if (!res.body || !res.body.errors) {
        reject({ errors: { unknown: [err] } });
      } else {
        reject(res.body);
      }
    } else {
      resolve(res.body);
    }
    queueResolve();
  };
}

function normalize(uri, trimmed) {
  var questionId = trimmed.questionId;
  delete trimmed.questionId;
  var groupId = trimmed.groupId;
  delete trimmed.groupId;
  var commentId = trimmed.commentId;
  delete trimmed.commentId;
  var invitationId = trimmed.invitationId;
  delete trimmed.invitationId;
  var messageId = trimmed.messageId;
  delete trimmed.messageId;
  var normalized = uri.replace(':messageId', messageId).replace(':invitationId', invitationId).replace(':questionId', questionId).replace(':commentId', commentId).replace(':groupId', groupId);

  return { trimmed: trimmed, normalized: normalized };
}

function token() {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}

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

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = __webpack_require__(1);

var _strikeApi = __webpack_require__(4);

var _strikeApi2 = _interopRequireDefault(_strikeApi);

var _state5 = __webpack_require__(2);

var _fa = __webpack_require__(0);

var _fa2 = _interopRequireDefault(_fa);

var _user = __webpack_require__(7);

var _user2 = _interopRequireDefault(_user);

var _submitButton = __webpack_require__(5);

var _submitButton2 = _interopRequireDefault(_submitButton);

var _inputForm = __webpack_require__(10);

var _inputForm2 = _interopRequireDefault(_inputForm);

var _inputWriter = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Target = {
  User: 'User',
  Password: 'Password',
  Disposer: 'Disposer'
};

var Context = function (_ContextComponent) {
  _inherits(Context, _ContextComponent);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, (Context.__proto__ || Object.getPrototypeOf(Context)).apply(this, arguments));
  }

  _createClass(Context, [{
    key: 'destroySucceed',
    value: function destroySucceed() {
      location.reload();
    }
  }, {
    key: 'target',
    value: function target(api) {
      this.setState({ targetNow: this.detectTarget(api) });
    }
  }, {
    key: 'detectTarget',
    value: function detectTarget(api) {
      switch (api) {
        case _strikeApi2.default.UpdateUser:
          return Target.User;
        case _strikeApi2.default.ChangePassword:
          return Target.Password;
        case _strikeApi2.default.DestroyUser:
          return Target.Disposer;
        default:
          return null;
      }
    }
  }, {
    key: 'update',
    value: function update(params) {
      var _this2 = this;

      this.setState({ updatingState: _state5.State.Submitting, updatingMessage: '' });
      this.target(_strikeApi2.default.UpdateUser);
      _strikeApi2.default.updateUser(params).then(function (result) {
        var user = new _user2.default(result);
        _this2.setState({
          result: result,
          user: user,
          errors: {},
          updatingState: _state5.State.Success,
          updatingMessage: 'Updated !'
        });
      }).catch(function (result) {
        var errors = result.errors;

        _this2.setState({
          errors: errors,
          updatingState: _state5.State.Fail,
          passwordMessage: 'Fail to update.'
        });
      });
    }
  }, {
    key: 'changePassword',
    value: function changePassword(params) {
      var _this3 = this;

      this.setState({ passwordState: _state5.State.Submitting, passwordMessage: '' });
      this.target(_strikeApi2.default.ChangePassword);
      _strikeApi2.default.changePassword(params).then(function (result) {
        _this3.setState({
          result: result,
          errors: {},
          passwordState: _state5.State.Success,
          passwordMessage: 'Changed !'
        });
      }).catch(function (result) {
        var errors = result.errors;

        errors.passwordNow = errors.password_now;
        _this3.setState({
          errors: errors,
          passwordState: _state5.State.Fail,
          passwordMessage: 'Fail to change.'
        });
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this4 = this;

      this.setState({ destroyState: _state5.State.Submitting });
      this.target(_strikeApi2.default.DestroyUser);
      _strikeApi2.default.destroyUser().then(function (result) {
        _this4.destroySucceed();
      }).catch(function (result) {
        var errors = result.errors;

        _this4.setState({ errors: errors, destroyState: _state5.State.Fail });
      });
    }
  }, {
    key: 'listen',
    value: function listen(to) {
      var _this5 = this;

      to('update', function (params) {
        _this5.update(params);
      });

      to('destroy', function () {
        _this5.destroy();
      });

      to('changePassword', function (params) {
        _this5.changePassword(params);
      });
    }
  }, {
    key: 'initialState',
    value: function initialState(props) {
      return {
        updatingState: _state5.State.Waiting,
        passwordState: _state5.State.Waiting,
        destroyState: _state5.State.Waiting,
        updatingMessage: '',
        passwordMessage: '',
        destroyMessage: '',
        targetNow: null,
        user: props.initial,
        errors: {}
      };
    }
  }]);

  return Context;
}(_parcel.ContextComponent);

var UserComponent = function (_ComponentComponent) {
  _inherits(UserComponent, _ComponentComponent);

  function UserComponent(props) {
    _classCallCheck(this, UserComponent);

    var _this6 = _possibleConstructorReturn(this, (UserComponent.__proto__ || Object.getPrototypeOf(UserComponent)).call(this, props));

    _this6.state = {
      name: '',
      login: '',
      email: ''
    };
    return _this6;
  }

  _createClass(UserComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateState(this.props);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      this.updateState(props, this.props);
    }
  }, {
    key: 'isToSuccess',
    value: function isToSuccess(nextProps, props) {
      if (!props) {
        return nextProps.state === _state5.State.Success;
      }
      return props.state !== _state5.State.Success && nextProps.state === _state5.State.Success;
    }
  }, {
    key: 'updateState',
    value: function updateState(nextProps, props) {
      if (props && (nextProps === props || !this.isToSuccess(nextProps, props))) {
        return;
      }

      var _nextProps$user = nextProps.user,
          name = _nextProps$user.name,
          login = _nextProps$user.login,
          email = _nextProps$user.email;

      this.setState({ name: name, login: login, email: email });
    }
  }, {
    key: 'writeMessage',
    value: function writeMessage() {
      switch (this.props.updatingState) {
        case _state5.State.Success:
          return React.createElement(
            'p',
            { className: 'com success-message' },
            this.props.updatingMessage
          );
        case _state5.State.Submitting:
          return React.createElement(
            'p',
            null,
            React.createElement(_fa2.default, { icon: 'spinner', animation: 'pulse' }),
            'sending...'
          );
        case _state5.State.Fail:
          return React.createElement(
            'p',
            { className: 'com error-message' },
            this.props.updatingMessage
          );
        case _state5.State.Waiting:
        default:
          return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _props = this.props,
          updatingState = _props.updatingState,
          errors = _props.errors;
      var _state = this.state,
          name = _state.name,
          login = _state.login,
          email = _state.email;


      return React.createElement(
        'section',
        { className: 'user-editor border-box-container' },
        React.createElement(
          'div',
          { className: 'com border-box-container' },
          React.createElement(
            'h1',
            { className: 'com border-box-title-area' },
            'Update information about you'
          ),
          React.createElement(
            'form',
            { className: 'com form-area' },
            (0, _inputWriter.writeInput)(this, 'text', 'name', 'Display name', 'Display name', errors),
            (0, _inputWriter.writeInput)(this, 'text', 'login', 'ID', 'ID', errors),
            (0, _inputWriter.writeInput)(this, 'text', 'email', 'E-mail address', 'E-mail address', errors),
            React.createElement(
              'section',
              { className: 'com submit-section' },
              React.createElement(_submitButton2.default, {
                state: updatingState,
                icon: "send-o",
                text: "Update",
                className: 'submit',
                onClick: function onClick() {
                  return _this7.dispatch('update', _this7.updatingParams);
                }
              })
            ),
            this.writeMessage()
          )
        )
      );
    }
  }, {
    key: 'updatingParams',
    get: function get() {
      var _state2 = this.state,
          name = _state2.name,
          login = _state2.login,
          email = _state2.email;

      return { name: name, login: login, email: email };
    }
  }]);

  return UserComponent;
}(_parcel.ComponentComponent);

var PasswordComponent = function (_ComponentComponent2) {
  _inherits(PasswordComponent, _ComponentComponent2);

  function PasswordComponent() {
    _classCallCheck(this, PasswordComponent);

    return _possibleConstructorReturn(this, (PasswordComponent.__proto__ || Object.getPrototypeOf(PasswordComponent)).apply(this, arguments));
  }

  _createClass(PasswordComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state = {
        password: '',
        passwordNow: ''
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.clearPassword(this.props);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      this.clearPassword(props, this.props);
    }
  }, {
    key: 'isToSuccess',
    value: function isToSuccess(nextProps, props) {
      if (!props) {
        return nextProps.state === _state5.State.Success;
      }
      console.log(nextProps.passwordState, _state5.State.Success);
      return props.passwordState !== _state5.State.Success && nextProps.passwordState === _state5.State.Success;
    }
  }, {
    key: 'clearPassword',
    value: function clearPassword(nextProps, props) {
      if (this.isToSuccess(nextProps, props)) {
        this.setState({ password: '', passwordNow: '' });
      }
    }
  }, {
    key: 'writeMessage',
    value: function writeMessage() {
      switch (this.props.passwordState) {
        case _state5.State.Success:
          return React.createElement(
            'p',
            { className: 'com success-message' },
            this.props.passwordMessage
          );
        case _state5.State.Submitting:
          return React.createElement(
            'p',
            null,
            React.createElement(_fa2.default, { icon: 'spinner', animation: 'pulse' }),
            'sending...'
          );
        case _state5.State.Fail:
          return React.createElement(
            'p',
            { className: 'com error-message' },
            this.props.passwordMessage
          );
        case _state5.State.Waiting:
        default:
          return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var _props2 = this.props,
          passwordState = _props2.passwordState,
          errors = _props2.errors;
      var _state3 = this.state,
          passwordNow = _state3.passwordNow,
          password = _state3.password;


      return React.createElement(
        'section',
        { className: 'user-editor border-box-container' },
        React.createElement(
          'div',
          { className: 'com border-box-container' },
          React.createElement(
            'h1',
            { className: 'com border-box-title-area' },
            'Change password'
          ),
          React.createElement(
            'form',
            { className: 'com form-area' },
            (0, _inputWriter.writeInput)(this, 'password', 'passwordNow', 'Old password', '', errors),
            (0, _inputWriter.writeInput)(this, 'password', 'password', 'New password', '', errors),
            React.createElement(
              'section',
              { className: 'com submit-section' },
              React.createElement(_submitButton2.default, {
                state: passwordState,
                icon: "key",
                text: "Change",
                className: 'submit',
                onClick: function onClick() {
                  return _this9.dispatch('changePassword', _this9.passwordParams);
                }
              })
            ),
            this.writeMessage()
          )
        )
      );
    }
  }, {
    key: 'passwordParams',
    get: function get() {
      var _state4 = this.state,
          passwordNow = _state4.passwordNow,
          password = _state4.password;

      return { passwordNow: passwordNow, password: password };
    }
  }]);

  return PasswordComponent;
}(_parcel.ComponentComponent);

var DisposerComponent = function (_ComponentComponent3) {
  _inherits(DisposerComponent, _ComponentComponent3);

  function DisposerComponent(props) {
    _classCallCheck(this, DisposerComponent);

    var _this10 = _possibleConstructorReturn(this, (DisposerComponent.__proto__ || Object.getPrototypeOf(DisposerComponent)).call(this, props));

    _this10.state = {
      yes: false
    };
    return _this10;
  }

  _createClass(DisposerComponent, [{
    key: 'destroy',
    value: function destroy() {
      this.dispatch('destroy');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this11 = this;

      var destroyState = this.props.destroyState;
      var yes = this.state.yes;


      return React.createElement(
        'section',
        { className: 'user-editor border-box-container' },
        React.createElement(
          'div',
          { className: 'com border-box-container' },
          React.createElement(
            'h1',
            { className: 'com border-box-title-area' },
            'Dispose your account'
          ),
          React.createElement(
            'div',
            { className: 'com form-area' },
            React.createElement(
              'section',
              { className: 'user-editor dispose-verify' },
              React.createElement(
                'label',
                null,
                React.createElement('input', { type: 'checkbox', name: 'yes', checked: yes, onChange: function onChange() {
                    return _this11.setState({ yes: !yes });
                  } }),
                'Ensure to dispose your account'
              )
            ),
            React.createElement(
              'section',
              { className: 'com submit-section' },
              React.createElement(_submitButton2.default, {
                state: destroyState,
                icon: "trash",
                text: "Dispose",
                className: 'dispose',
                disabled: !yes,
                onClick: function onClick() {
                  return _this11.dispatch('destroy');
                }
              })
            )
          )
        )
      );
    }
  }]);

  return DisposerComponent;
}(_parcel.ComponentComponent);

var UserEditor = function () {
  function UserEditor() {
    _classCallCheck(this, UserEditor);
  }

  _createClass(UserEditor, null, [{
    key: 'start',
    value: function start(dom) {
      var initial = new _user2.default(JSON.parse(dom.getAttribute('data-user')));
      ReactDOM.render(React.createElement(
        'article',
        { className: 'user-editor body' },
        React.createElement(
          'div',
          { className: 'user-editor box-wrapper' },
          React.createElement(
            Context,
            { initial: initial },
            React.createElement(UserComponent, null),
            React.createElement(PasswordComponent, null),
            React.createElement(DisposerComponent, null)
          )
        )
      ), dom);
    }
  }]);

  return UserEditor;
}();

window.UserEditor = UserEditor;

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

/***/ },

/***/ 7:
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(params) {
  _classCallCheck(this, User);

  this.name = params.name;
  this.login = params.login;
  this.email = params.email;
};

exports.default = User;

/***/ }

/******/ });