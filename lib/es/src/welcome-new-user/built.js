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

},{"../fa":4,"../models/state":5,"../parcel":6}],4:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parcel = require('./lib/parcel');

var _fa = require('./lib/fa');

var _fa2 = _interopRequireDefault(_fa);

var _submitButton = require('./lib/components/submit-button');

var _submitButton2 = _interopRequireDefault(_submitButton);

var _inputForm = require('./lib/components/input-form');

var _inputForm2 = _interopRequireDefault(_inputForm);

var _state2 = require('./lib/models/state');

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

      return h(
        'section',
        { className: 'com input-section' },
        h(_inputForm2.default, {
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


      return h(
        'article',
        { className: 'user-register body' },
        h(
          'section',
          { className: 'com border-box-container' },
          h(
            'h1',
            { className: 'com border-box-title-area' },
            '登録内容を入力してください'
          ),
          h(
            'div',
            { className: 'com form-area' },
            this.writeInput('text', 'name', '表示する名前', errors),
            this.writeInput('text', 'login', 'ログイン用ID', errors),
            this.writeInput('text', 'email', 'メールアドレス', errors),
            this.writeInput('password', 'password', 'パスワード', errors),
            h(
              'section',
              { className: 'com submit-section' },
              h(_submitButton2.default, {
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

      return h(
        'article',
        { className: 'user-registered body' },
        h(
          'section',
          { className: 'com border-box-container' },
          h(
            'h1',
            { className: 'com border-box-title-area' },
            '以下の内容で登録されました'
          ),
          h(
            'div',
            { className: 'com form-area' },
            h(
              'section',
              { className: 'com input-section' },
              h(
                'h1',
                { className: 'user-registered info-label' },
                '表示する名前'
              ),
              h(
                'p',
                { className: 'user-registered info' },
                name
              )
            ),
            h(
              'section',
              { className: 'com input-section' },
              h(
                'h1',
                { className: 'user-registered info-label' },
                'ログイン用ID'
              ),
              h(
                'p',
                { className: 'user-registered info' },
                login
              )
            ),
            h(
              'section',
              { className: 'com input-section' },
              h(
                'h1',
                { className: 'user-registered info-label' },
                'メールアドレス'
              ),
              h(
                'p',
                { className: 'user-registered info' },
                email
              )
            ),
            h(
              'section',
              { className: 'user-registered link-section' },
              h(_fa2.default, { icon: 'sign-in' }),
              h(
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

},{"./lib/components/input-form":2,"./lib/components/submit-button":3,"./lib/fa":4,"./lib/models/state":5,"./lib/parcel":6}]},{},[7]);
