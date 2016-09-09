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
        case _.isArray(errors):
          return errors;
        case !errors:
          return [];
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

},{"../fa":4,"../models/state":5,"../parcel":6}],2:[function(require,module,exports){
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

      return React.createElement(
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

      return React.createElement(_errorMessage2.default, { errors: errors, name: name });
    }
  }]);

  return InputForm;
}(_parcel.ComponentComponent);

exports.default = InputForm;

},{"../fa":4,"../models/state":5,"../parcel":6,"./error-message":1}],3:[function(require,module,exports){
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
            { className: className, disabled: disabled, onClick: onClick },
            React.createElement(_fa2.default, { icon: icon }),
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

},{"../fa":4,"../models/state":5,"../parcel":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fa = function (_React) {
  _inherits(Fa, _React);

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

      return React.createElement("i", { className: classes.join(' ') });
    }
  }]);

  return Fa;
}(React);

exports.default = Fa;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventingShared = {
  emitter: React.PropTypes.any
};

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
  }], [{
    key: "contextTypes",
    get: function get() {
      return EventingShared;
    }
  }]);

  return ComponentComponent;
}(React.Component);

var ContextComponent = exports.ContextComponent = function (_ComponentComponent) {
  _inherits(ContextComponent, _ComponentComponent);

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

      if (!this.emitter) {
        this.emitter = this.context.emitter || new EventEmitter();
        this.listen(function (eventName, callback) {
          _this4.addedOnStore.push({ eventName: eventName, callback: callback });
          _this4.emitter.on(eventName, callback);
        });
      }
    }
  }], [{
    key: "childContextTypes",
    get: function get() {
      return EventingShared;
    }
  }]);

  function ContextComponent(props) {
    _classCallCheck(this, ContextComponent);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ContextComponent).call(this, props));

    _this2.state = _this2.initialState(props);
    return _this2;
  }

  _createClass(ContextComponent, [{
    key: "getChildContext",
    value: function getChildContext() {
      return { emitter: this.context.emitter || this.emitter };
    }
  }, {
    key: "render",
    value: function render() {
      var props = _.assign({}, this.props, this.state);
      delete props.children;

      var children = this.props.children;

      var elements = !!children.map ? children : [children];

      return React.createElement(
        "div",
        { className: "context-wrapper" },
        elements.map(function (child, i) {
          return React.cloneElement(child, _.assign(props, { key: i }));
        })
      );
    }
  }]);

  return ContextComponent;
}(ComponentComponent);

},{}],7:[function(require,module,exports){
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

var Api = exports.Api = {
  DisposeMessage: {
    uri: '/m/:messageId',
    method: Method.Delete,
    params: function params(p) {
      return p;
    }
  },
  Invite: {
    uri: '/g/:groupId/invitation',
    method: Method.Post,
    params: function params(p) {
      return { invitations: p };
    }
  },
  DisposeGroup: {
    uri: '/g/:groupId',
    method: Method.Delete,
    params: function params(p) {
      return p;
    }
  },
  CreateGroup: {
    uri: '/g/new',
    method: Method.Post,
    params: function params(p) {
      return { groups: p };
    }
  },
  AcceptInvitation: {
    uri: '/i/:invitationId/accept',
    method: Method.Patch,
    params: function params(p) {
      return p;
    }
  },
  RejectInvitation: {
    uri: '/i/:invitationId/reject',
    method: Method.Patch,
    params: function params(p) {
      return p;
    }
  },
  BlockInvitation: {
    uri: '/i/:invitationId/block',
    method: Method.Patch,
    params: function params(p) {
      return p;
    }
  },
  CreateQuestion: {
    uri: '/g/:groupId/me/q/new',
    method: Method.Post,
    params: function params(p) {
      return { questions: p };
    }
  },
  AnswerQuestion: {
    uri: '/g/:groupId/q/:questionId/answer',
    method: Method.Patch,
    params: function params(p) {
      return { questions: p };
    }
  },
  AssignUserQuestion: {
    uri: '/g/:groupId/q/:questionId/assign',
    method: Method.Patch,
    params: function params(p) {
      return { questions: p };
    }
  },
  WaitAnswerQuestion: {
    uri: '/g/:groupId/q/:questionId/wait',
    method: Method.Patch,
    params: function params(p) {
      return {};
    }
  },
  SorryQuestion: {
    uri: '/g/:groupId/q/:questionId/sorry',
    method: Method.Patch,
    params: function params(p) {
      return {};
    }
  },
  ReplyToReply: {
    uri: '/g/:groupId/q/:questionId/a/:commentId/res',
    method: Method.Post,
    params: function params(p) {
      return { questions: p };
    }
  },
  FinishQuestion: {
    uri: '/g/:groupId/q/:questionId/finish',
    method: Method.Patch,
    params: function params(p) {
      return {};
    }
  },
  LogIn: {
    uri: '/in',
    method: Method.Post,
    params: function params(p) {
      return { user_sessions: p };
    }
  },
  LogOut: {
    uri: '/out',
    method: Method.Delete,
    params: function params(p) {
      return {};
    }
  },
  CreateUser: {
    uri: '/welcome/new',
    method: Method.Post,
    params: function params(p) {
      return { users: p };
    }
  },
  UpdateUser: {
    uri: '/me',
    method: Method.Patch,
    params: function params(p) {
      return { users: p };
    }
  },
  DestroyUser: {
    uri: '/me',
    method: Method.Delete,
    params: function params(p) {
      return {};
    }
  },
  ChangePassword: {
    uri: '/me/password',
    method: Method.Patch,
    params: function params(p) {
      p.password_now = p.passwordNow;
      delete p.passwordNow;
      return { users: p };
    }
  }
};

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
  switch (true) {
    case method === Method.Get:
      return request.get(uri);
    case method === Method.Post:
      return request.post(uri);
    case method === Method.Patch:
      return request.patch(uri);
    case method === Method.Put:
      return request.put(uri);
    case method === Method.Delete:
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

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = require('./lib/parcel');

var _strikeApi = require('./lib/services/strike-api');

var _fa = require('./lib/fa');

var _fa2 = _interopRequireDefault(_fa);

var _submitButton = require('./lib/components/submit-button');

var _submitButton2 = _interopRequireDefault(_submitButton);

var _inputForm = require('./lib/components/input-form');

var _inputForm2 = _interopRequireDefault(_inputForm);

var _state2 = require('./lib/models/state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Context = function (_ContextComponent) {
  _inherits(Context, _ContextComponent);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Context).apply(this, arguments));
  }

  _createClass(Context, [{
    key: 'submit',
    value: function submit(params) {
      var _this2 = this;

      this.setState({ state: _state2.State.Submitting });
      (0, _strikeApi.strike)(_strikeApi.Api.CreateUser, params).then(function (result) {
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
  }, {
    key: 'initialState',
    value: function initialState(props) {
      return {
        state: _state2.State.Waiting
      };
    }
  }]);

  return Context;
}(_parcel.ContextComponent);

var Component = function (_ComponentComponent) {
  _inherits(Component, _ComponentComponent);

  function Component(props) {
    _classCallCheck(this, Component);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props));

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

      var _props = this.props;
      var state = _props.state;
      var errors = _props.errors;


      return React.createElement(
        'article',
        { className: 'user-register body' },
        React.createElement(
          'section',
          { className: 'com border-box-container' },
          React.createElement(
            'h1',
            { className: 'com border-box-title-area' },
            '登録内容を入力してください'
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
      var _ref = this.props.result || {};

      var name = _ref.name;
      var login = _ref.login;
      var email = _ref.email;

      return React.createElement(
        'article',
        { className: 'user-registered body' },
        React.createElement(
          'section',
          { className: 'com border-box-container' },
          React.createElement(
            'h1',
            { className: 'com border-box-title-area' },
            '以下の内容で登録されました'
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
                '表示する名前'
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
                'ログイン用ID'
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
                'メールアドレス'
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
                'ログイン'
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
      var _state = this.state;
      var name = _state.name;
      var login = _state.login;
      var email = _state.email;
      var password = _state.password;

      return { name: name, login: login, email: email, password: password };
    }
  }]);

  return Component;
}(_parcel.ComponentComponent);

var Welcome = function () {
  function Welcome() {
    _classCallCheck(this, Welcome);
  }

  _createClass(Welcome, null, [{
    key: 'start',
    value: function start(dom) {
      ReactDOM.render(React.createElement(
        Context,
        null,
        React.createElement(Component, null)
      ), dom);
    }
  }]);

  return Welcome;
}();

window.Welcome = Welcome;

},{"./lib/components/input-form":2,"./lib/components/submit-button":3,"./lib/fa":4,"./lib/models/state":5,"./lib/parcel":6,"./lib/services/strike-api":7}]},{},[8]);
