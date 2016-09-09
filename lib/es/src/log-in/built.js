(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = require('../parcel');

var _state = require('../models/state');

var _fa = require('../fa');

var _fa2 = _interopRequireDefault(_fa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorMessage = function (_ComponentComponent) {
  _inherits(ErrorMessage, _ComponentComponent);

  function ErrorMessage() {
    _classCallCheck(this, ErrorMessage);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ErrorMessage).apply(this, arguments));
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
      var _props = this.props;
      var errors = _props.errors;
      var name = _props.name;

      if (!errors) {
        return null;
      }

      var myErrors = this.wrap(errors[name]);
      if (myErrors.length === 0) {
        return null;
      }

      return h(
        'ul',
        { className: 'error-messages' },
        myErrors.map(function (error, i) {
          return h(
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

},{"../fa":4,"../models/state":6,"../parcel":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = require('../parcel');

var _state = require('../models/state');

var _fa = require('../fa');

var _fa2 = _interopRequireDefault(_fa);

var _errorMessage = require('./error-message');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputForm = function (_ComponentComponent) {
  _inherits(InputForm, _ComponentComponent);

  function InputForm(props) {
    _classCallCheck(this, InputForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InputForm).call(this, props));

    _this.state = {
      value: _this.props.initialValue
    };
    return _this;
  }

  _createClass(InputForm, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var type = _props.type;
      var name = _props.name;
      var placeholder = _props.placeholder;
      var value = _props.value;
      var _onChange = _props.onChange;
      var errors = _props.errors;


      var state = !!errors && !!errors[name] ? 'has-error' : 'calm';

      return h(
        'div',
        { className: 'input-form' },
        this.label,
        h('input', _extends({ className: state }, { type: type, name: name, placeholder: placeholder, value: value, onChange: function onChange(e) {
            return _onChange(e.target.value);
          } })),
        this.error
      );
    }
  }, {
    key: 'className',
    get: function get() {
      var _props2 = this.props;
      var className = _props2.className;
      var state = _props2.state;

      return className + (state === _state.State.Submitting ? ' sending' : ' ready');
    }
  }, {
    key: 'label',
    get: function get() {
      var label = this.props.label;

      if (!label) {
        return null;
      }

      return h(
        'label',
        { className: 'input-label' },
        label
      );
    }
  }, {
    key: 'error',
    get: function get() {
      var _props3 = this.props;
      var errors = _props3.errors;
      var name = _props3.name;

      return h(_errorMessage2.default, { errors: errors, name: name });
    }
  }]);

  return InputForm;
}(_parcel.ComponentComponent);

exports.default = InputForm;

},{"../fa":4,"../models/state":6,"../parcel":7,"./error-message":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = require('../parcel');

var _state = require('../models/state');

var _fa = require('../fa');

var _fa2 = _interopRequireDefault(_fa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubmitButton = function (_ComponentComponent) {
  _inherits(SubmitButton, _ComponentComponent);

  function SubmitButton() {
    _classCallCheck(this, SubmitButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmitButton).apply(this, arguments));
  }

  _createClass(SubmitButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var text = _props.text;
      var onClick = _props.onClick;
      var icon = _props.icon;
      var state = _props.state;
      var disabled = _props.disabled;
      var className = this.className;


      switch (state) {
        case _state.State.Submitting:
          return h(
            'button',
            { className: this.className, disabled: true },
            h(_fa2.default, { icon: icon, animation: 'pulse' }),
            text
          );
        case _state.State.Success:
        case _state.State.Waiting:
        case _state.State.Fail:
        default:
          return h(
            'button',
            { className: className, disabled: disabled, onClick: onClick },
            h(_fa2.default, { icon: icon }),
            text
          );
      }
    }
  }, {
    key: 'className',
    get: function get() {
      var _props2 = this.props;
      var className = _props2.className;
      var state = _props2.state;

      return className + (state === _state.State.Submitting ? ' sending' : ' ready');
    }
  }]);

  return SubmitButton;
}(_parcel.ComponentComponent);

exports.default = SubmitButton;

},{"../fa":4,"../models/state":6,"../parcel":7}],4:[function(require,module,exports){
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Fa).apply(this, arguments));
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

      return h("i", { className: classes.join(' ') });
    }
  }]);

  return Fa;
}(React.Component);

exports.default = Fa;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeInput = writeInput;

var _inputForm = require("../components/input-form");

var _inputForm2 = _interopRequireDefault(_inputForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeInput(self, type, name, placeholder, label) {
  var errors = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];

  return h(
    "section",
    { className: "com input-section" },
    h(_inputForm2.default, {
      errors: errors, type: type, name: name, placeholder: placeholder, label: label, value: self.state[name],
      onChange: function onChange(v) {
        var p = {};
        p[name] = v;
        self.setState(p);
      }
    })
  );
}

},{"../components/input-form":2}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ComponentComponent).apply(this, arguments));
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContextComponent).call(this, props));
  }

  _createClass(ContextComponent, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      this.addedOnStore.map(function (_ref) {
        var eventName = _ref.eventName;
        var callback = _ref.callback;

        _this3.emitter.removeListener(eventName, callback);
        return eventName;
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this4 = this;

      _get(Object.getPrototypeOf(ContextComponent.prototype), "componentWillMount", this).call(this);

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


      return h(
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

},{}],8:[function(require,module,exports){
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
    var _normalize = normalize(uri, params);

    var normalized = _normalize.normalized;
    var trimmed = _normalize.trimmed;
  }

  build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || params));
}

function build(resolve, reject, queueResolve, uri, method) {
  var params = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];


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

},{}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = require('./lib/parcel');

var _strikeApi = require('./lib/services/strike-api');

var _strikeApi2 = _interopRequireDefault(_strikeApi);

var _state2 = require('./lib/models/state');

var _fa = require('./lib/fa');

var _fa2 = _interopRequireDefault(_fa);

var _submitButton = require('./lib/components/submit-button');

var _submitButton2 = _interopRequireDefault(_submitButton);

var _inputWriter = require('./lib/helpers/input-writer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.LogIn = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'start',
    value: function start(dom) {
      ReactDOM.render(h(
        Context,
        null,
        h(Component, null)
      ), dom);
    }
  }]);

  return _class;
}();

var Context = function (_ContextComponent) {
  _inherits(Context, _ContextComponent);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Context).apply(this, arguments));
  }

  _createClass(Context, [{
    key: 'initialState',
    value: function initialState(props) {
      return {
        state: _state2.State.Waiting,
        loggedIn: false
      };
    }
  }, {
    key: 'succeed',
    value: function succeed() {
      location.reload();
    }
  }, {
    key: 'submit',
    value: function submit(params) {
      var _this2 = this;

      this.setState({ state: _state2.State.Submitting });
      _strikeApi2.default.logIn(params).then(function () {
        _this2.succeed();
        _this2.setState({ loggedIn: true });
      }).catch(function () {
        _this2.setState({ state: _state2.State.Fail });
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

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: 'initialState',
    value: function initialState(props) {
      return {
        login: '',
        password: ''
      };
    }
  }, {
    key: 'writeError',
    value: function writeError() {
      if (this.props.loggedIn) {
        return h(
          'p',
          { className: 'com message-area success-message' },
          h(_fa2.default, { icon: 'paw' }),
          'ログインに成功しました'
        );
      }

      switch (this.props.state) {
        case _state2.State.Fail:
          return h(
            'p',
            { className: 'com message-area error-message' },
            h(_fa2.default, { icon: 'ban' }),
            'ログインに失敗しました'
          );
        case _state2.State.Success:
        case _state2.State.Submitting:
        case _state2.State.Waiting:
        default:
          return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var state = this.props.state;


      return h(
        'article',
        { className: 'user-log-in body' },
        h(
          'section',
          { className: 'com border-box-container' },
          h(
            'h1',
            { className: 'com border-box-title-area' },
            'ログイン'
          ),
          h(
            'form',
            { className: 'com form-area' },
            (0, _inputWriter.writeInput)(this, 'text', 'login', 'ログインID', null),
            (0, _inputWriter.writeInput)(this, 'password', 'password', 'パスワード', null),
            h(
              'section',
              { className: 'com submit-section' },
              h(_submitButton2.default, {
                state: state, icon: "sign-in", text: "ログインする", className: 'submit',
                onClick: function onClick() {
                  return _this5.dispatch('submit', _this5.params);
                }
              })
            )
          ),
          this.writeError()
        )
      );
    }
  }, {
    key: 'params',
    get: function get() {
      var _state = this.state;
      var login = _state.login;
      var password = _state.password;

      return { login: login, password: password };
    }
  }]);

  return Component;
}(_parcel.ComponentComponent);

},{"./lib/components/submit-button":3,"./lib/fa":4,"./lib/helpers/input-writer":5,"./lib/models/state":6,"./lib/parcel":7,"./lib/services/strike-api":8}]},{},[9]);
