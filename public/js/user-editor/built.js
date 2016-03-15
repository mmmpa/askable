(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
var user_1 = require('./lib/models/user');
var submit_button_1 = require('./lib/components/submit-button');
var input_writer_1 = require('./lib/helpers/input-writer');
var Target;
(function (Target) {
    Target[Target["User"] = 0] = "User";
    Target[Target["Password"] = 1] = "Password";
    Target[Target["Disposer"] = 2] = "Disposer";
})(Target || (Target = {}));
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Context.prototype.destroySucceed = function () {
        location.reload();
    };
    Context.prototype.update = function (params) {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.UpdateUser, params)
            .then(function (result) {
            var user = new user_1.default(result);
            _this.setState({ result: result, user: user, errors: {}, state: state_1.State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
        });
    };
    Context.prototype.changePassword = function (params) {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.ChangePassword, params)
            .then(function (result) {
            _this.setState({ result: result, errors: {}, state: state_1.State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            errors.passwordNow = errors.password_now;
            _this.setState({ errors: errors, state: state_1.State.Fail });
        });
    };
    Context.prototype.destroy = function () {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.DestroyUser)
            .then(function (result) {
            _this.destroySucceed();
            _this.setState({ result: result, errors: {}, state: state_1.State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('update', function (params) {
            _this.update(params);
        });
        to('destroy', function () {
            _this.destroy();
        });
        to('changePassword', function (params) {
            _this.changePassword(params);
        });
    };
    Context.prototype.initialState = function (props) {
        return {
            state: state_1.State.Waiting,
            targetNow: null,
            user: props.initial,
            errors: {}
        };
    };
    return Context;
})(eventer_1.Root);
var UserComponent = (function (_super) {
    __extends(UserComponent, _super);
    function UserComponent(props) {
        _super.call(this, props);
        this.state = {
            name: '',
            login: '',
            email: '',
        };
    }
    Object.defineProperty(UserComponent.prototype, "updatingParams", {
        get: function () {
            var _a = this.state, name = _a.name, login = _a.login, email = _a.email;
            return { name: name, login: login, email: email };
        },
        enumerable: true,
        configurable: true
    });
    UserComponent.prototype.componentDidMount = function () {
        this.updateState(this.props);
    };
    UserComponent.prototype.componentWillUpdate = function (props, state) {
        this.updateState(props, this.props);
    };
    UserComponent.prototype.isToSuccess = function (nextProps, props) {
        if (!props) {
            return nextProps.state === state_1.State.Success;
        }
        return props.state !== state_1.State.Success && nextProps.state === state_1.State.Success;
    };
    UserComponent.prototype.updateState = function (nextProps, props) {
        if (props && (nextProps === props || !this.isToSuccess(nextProps, props))) {
            return;
        }
        var _a = nextProps.user, name = _a.name, login = _a.login, email = _a.email;
        this.setState({ name: name, login: login, email: email });
    };
    UserComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, state = _a.state, targetNow = _a.targetNow, errors = _a.errors;
        var _b = this.state, name = _b.name, login = _b.login, email = _b.email;
        return React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "登録内容の変更"), React.createElement("div", {"className": "com form-area"}, input_writer_1.writeInput(this, 'text', 'name', '表示する名前', '表示する名前', errors), input_writer_1.writeInput(this, 'text', 'login', 'ログイン用ID', 'ログイン用ID', errors), input_writer_1.writeInput(this, 'text', 'email', 'メールアドレス', 'メールアドレス', errors), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, targetNow: targetNow, icon: "send-o", text: "変更する", className: 'submit', target: Target.User,
            onClick: function () { return _this.dispatch('update', _this.updatingParams); }
        })))));
    };
    return UserComponent;
})(eventer_1.Node);
var PasswordComponent = (function (_super) {
    __extends(PasswordComponent, _super);
    function PasswordComponent(props) {
        _super.call(this, props);
        this.state = {
            password: '',
            passwordNow: '',
        };
    }
    Object.defineProperty(PasswordComponent.prototype, "passwordParams", {
        get: function () {
            var _a = this.state, passwordNow = _a.passwordNow, password = _a.password;
            return { passwordNow: passwordNow, password: password };
        },
        enumerable: true,
        configurable: true
    });
    PasswordComponent.prototype.componentDidMount = function () {
        this.clearPassword(this.props);
    };
    PasswordComponent.prototype.componentWillUpdate = function (props, state) {
        this.clearPassword(props, this.props);
    };
    PasswordComponent.prototype.isToSuccess = function (nextProps, props) {
        if (!props) {
            return nextProps.state === state_1.State.Success;
        }
        return props.state !== state_1.State.Success && nextProps.state === state_1.State.Success;
    };
    PasswordComponent.prototype.clearPassword = function (nextProps, props) {
        if (this.isToSuccess(nextProps, props)) {
            this.setState({ password: '', passwordNow: '' });
        }
    };
    PasswordComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, state = _a.state, targetNow = _a.targetNow, errors = _a.errors;
        var _b = this.state, passwordNow = _b.passwordNow, password = _b.password;
        return React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "パスワードの変更"), React.createElement("div", {"className": "com form-area"}, input_writer_1.writeInput(this, 'password', 'passwordNow', '旧パスワード', '旧パスワード', errors), input_writer_1.writeInput(this, 'password', 'password', '新パスワード', '新パスワード', errors), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, targetNow: targetNow, icon: "key", text: "パスワードを変更する", className: 'submit', target: Target.Password,
            onClick: function () { return _this.dispatch('changePassword', _this.passwordParams); }
        })))));
    };
    return PasswordComponent;
})(eventer_1.Node);
var DisposerComponent = (function (_super) {
    __extends(DisposerComponent, _super);
    function DisposerComponent(props) {
        _super.call(this, props);
        this.state = {
            yes: false
        };
    }
    DisposerComponent.prototype.destroy = function () {
        this.dispatch('destroy');
    };
    DisposerComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, state = _a.state, targetNow = _a.targetNow;
        var yes = this.state.yes;
        return React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "アカウントの削除"), React.createElement("div", {"className": "com form-area"}, React.createElement("section", {"className": "user-editor dispose-verify"}, React.createElement("label", null, React.createElement("input", {"type": "checkbox", "name": "yes", "checked": yes, "onChange": function () { return _this.setState({ yes: !yes }); }}), "本当に削除する")), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, targetNow: targetNow, icon: "trash", text: "アカウントを削除する", className: 'dispose', disabled: !yes, target: Target.Disposer,
            onClick: function () { return _this.dispatch('destroy'); }
        })))));
    };
    return DisposerComponent;
})(eventer_1.Node);
var UserEditor = (function () {
    function UserEditor() {
    }
    UserEditor.start = function (dom) {
        var initial = new user_1.default(JSON.parse(dom.getAttribute('data-user')));
        ReactDOM.render(React.createElement("article", {"className": "user-editor body"}, React.createElement(Context, React.__spread({}, { initial: initial }), React.createElement(UserComponent, null), React.createElement(PasswordComponent, null), React.createElement(DisposerComponent, null))), dom);
    };
    return UserEditor;
})();
window.UserEditor = UserEditor;

},{"./lib/components/submit-button":4,"./lib/eventer":5,"./lib/helpers/input-writer":7,"./lib/models/state":8,"./lib/models/user":9,"./lib/services/strike-api":10}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('../eventer');
var ErrorMessage = (function (_super) {
    __extends(ErrorMessage, _super);
    function ErrorMessage() {
        _super.apply(this, arguments);
    }
    ErrorMessage.prototype.wrap = function (errors) {
        switch (true) {
            case _.isArray(errors):
                return errors;
            case !errors:
                return [];
            default:
                return [errors];
        }
    };
    ErrorMessage.prototype.render = function () {
        var _a = this.props, errors = _a.errors, name = _a.name;
        if (!errors) {
            return null;
        }
        var myErrors = this.wrap(errors[name]);
        if (myErrors.length === 0) {
            return null;
        }
        return React.createElement("ul", {"className": "error-messages"}, myErrors.map(function (error, i) { return React.createElement("li", {"className": "error-message", "key": i}, error); }));
    };
    return ErrorMessage;
})(eventer_1.Node);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorMessage;

},{"../eventer":5}],3:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('../eventer');
var state_1 = require('../models/state');
var error_message_1 = require('./error-message');
var InputForm = (function (_super) {
    __extends(InputForm, _super);
    function InputForm(props) {
        _super.call(this, props);
        this.state = {
            value: this.props.initialValue
        };
    }
    Object.defineProperty(InputForm.prototype, "className", {
        get: function () {
            var _a = this.props, className = _a.className, state = _a.state;
            return className + (state === state_1.State.Submitting ? ' sending' : ' ready');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputForm.prototype, "label", {
        get: function () {
            var label = this.props.label;
            if (!label) {
                return null;
            }
            return React.createElement("label", {"className": "input-label"}, label);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputForm.prototype, "error", {
        get: function () {
            var _a = this.props, errors = _a.errors, name = _a.name;
            return React.createElement(error_message_1.default, React.__spread({}, { errors: errors, name: name }));
        },
        enumerable: true,
        configurable: true
    });
    InputForm.prototype.render = function () {
        var _a = this.props, type = _a.type, name = _a.name, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange, errors = _a.errors;
        var state = !!errors && !!errors[name] ? 'has-error' : 'calm';
        return React.createElement("div", {"className": "input-form"}, this.label, React.createElement("input", React.__spread({"className": state}, { type: type, name: name, placeholder: placeholder, value: value, onChange: function (e) { return onChange(e.target.value); } })), this.error);
    };
    return InputForm;
})(eventer_1.Node);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InputForm;

},{"../eventer":5,"../models/state":8,"./error-message":2}],4:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('../eventer');
var state_1 = require('../models/state');
var fa_1 = require('../fa');
var SubmitButton = (function (_super) {
    __extends(SubmitButton, _super);
    function SubmitButton() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SubmitButton.prototype, "className", {
        get: function () {
            var _a = this.props, className = _a.className, state = _a.state;
            return className + (state === state_1.State.Submitting ? ' sending' : ' ready');
        },
        enumerable: true,
        configurable: true
    });
    SubmitButton.prototype.render = function () {
        var _a = this.props, text = _a.text, onClick = _a.onClick, icon = _a.icon, state = _a.state, disabled = _a.disabled;
        var className = this.className;
        switch (state) {
            case state_1.State.Submitting:
                return React.createElement("button", {"className": this.className, "disabled": true}, React.createElement(fa_1.default, {"icon": icon}), text);
            case state_1.State.Success:
            case state_1.State.Waiting:
            case state_1.State.Fail:
            default:
                return React.createElement("button", React.__spread({}, { className: className, disabled: disabled, onClick: onClick }), React.createElement(fa_1.default, {"icon": icon}), text);
        }
    };
    return SubmitButton;
})(eventer_1.Node);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubmitButton;

},{"../eventer":5,"../fa":6,"../models/state":8}],5:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
exports.EventingShared = {
    emitter: React.PropTypes.any
};
var Node = (function (_super) {
    __extends(Node, _super);
    function Node() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Node, "contextTypes", {
        get: function () {
            return exports.EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.dispatch = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.context.emitter).emit.apply(_a, [event].concat(args));
        var _a;
    };
    return Node;
})(React.Component);
exports.Node = Node;
var Root = (function (_super) {
    __extends(Root, _super);
    function Root(props) {
        _super.call(this, props);
        this.addedOnStore = [];
        this.state = this.initialState(props);
    }
    Object.defineProperty(Root, "childContextTypes", {
        get: function () {
            return exports.EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    Root.prototype.componentWillUnmount = function () {
        var _this = this;
        var disposed = this.addedOnStore.map(function (_a) {
            var eventName = _a.eventName, callback = _a.callback;
            _this.emitter.removeListener(eventName, callback);
            return eventName;
        });
    };
    Root.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.emitter) {
            this.emitter = this.context.emitter || new EventEmitter();
            this.listen(function (eventName, callback) {
                _this.addedOnStore.push({ eventName: eventName, callback: callback });
                _this.emitter.on(eventName, callback);
            });
        }
    };
    Root.prototype.getChildContext = function () {
        return { emitter: this.context.emitter || this.emitter };
    };
    Root.prototype.render = function () {
        var props = Object.assign({}, this.props, this.state);
        delete props.children;
        var children = this.props.children;
        var elements = !!children.map ? children : [children];
        return React.createElement("div", {"className": "context-wrapper"}, elements.map(function (child, i) { return React.cloneElement(child, Object.assign(props, { key: i })); }));
    };
    return Root;
})(Node);
exports.Root = Root;

},{}],6:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fa = (function (_super) {
    __extends(Fa, _super);
    function Fa() {
        _super.apply(this, arguments);
    }
    Fa.prototype.render = function () {
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
        return React.createElement("i", {"className": classes.join(' ')});
    };
    return Fa;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fa;

},{}],7:[function(require,module,exports){
var input_form_1 = require('../components/input-form');
function writeInput(self, type, name, placeholder, label, errors) {
    if (errors === void 0) { errors = {}; }
    return React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
        errors: errors, type: type, name: name, placeholder: placeholder, label: label, value: self.state[name],
        onChange: function (v) {
            var p = {};
            p[name] = v;
            self.setState(p);
        }
    })));
}
exports.writeInput = writeInput;

},{"../components/input-form":3}],8:[function(require,module,exports){
(function (State) {
    State[State["Waiting"] = 0] = "Waiting";
    State[State["Submitting"] = 1] = "Submitting";
    State[State["Fail"] = 2] = "Fail";
    State[State["Success"] = 3] = "Success";
})(exports.State || (exports.State = {}));
var State = exports.State;

},{}],9:[function(require,module,exports){
var User = (function () {
    function User(params) {
        this.name = params.name;
        this.login = params.login;
        this.email = params.email;
    }
    return User;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;

},{}],10:[function(require,module,exports){
var jobs = Promise.resolve();
var Method;
(function (Method) {
    Method[Method["Get"] = 0] = "Get";
    Method[Method["Post"] = 1] = "Post";
    Method[Method["Patch"] = 2] = "Patch";
    Method[Method["Put"] = 3] = "Put";
    Method[Method["Delete"] = 4] = "Delete";
})(Method || (Method = {}));
exports.Api = {
    DisposeMessage: {
        uri: '/m/:messageId',
        method: Method.Delete,
        params: function (p) { return p; }
    },
    Invite: {
        uri: '/g/:groupId/invitation',
        method: Method.Post,
        params: function (p) { return ({ invitations: p }); }
    },
    DisposeGroup: {
        uri: '/g/:groupId',
        method: Method.Delete,
        params: function (p) { return p; }
    },
    CreateGroup: {
        uri: '/g/new',
        method: Method.Post,
        params: function (p) { return ({ groups: p }); }
    },
    AcceptInvitation: {
        uri: '/i/:invitationId/accept',
        method: Method.Patch,
        params: function (p) { return p; }
    },
    RejectInvitation: {
        uri: '/i/:invitationId/reject',
        method: Method.Patch,
        params: function (p) { return p; }
    },
    BlockInvitation: {
        uri: '/i/:invitationId/block',
        method: Method.Patch,
        params: function (p) { return p; }
    },
    CreateQuestion: {
        uri: '/g/:groupId/me/q/new',
        method: Method.Post,
        params: function (p) { return ({ questions: p }); }
    },
    AnswerQuestion: {
        uri: '/g/:groupId/q/:questionId/answer',
        method: Method.Patch,
        params: function (p) { return ({ questions: p }); }
    },
    AssignUserQuestion: {
        uri: '/g/:groupId/q/:questionId/assign',
        method: Method.Patch,
        params: function (p) { return ({ questions: p }); }
    },
    WaitAnswerQuestion: {
        uri: '/g/:groupId/q/:questionId/wait',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    SorryQuestion: {
        uri: '/g/:groupId/q/:questionId/sorry',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    ReplyToReply: {
        uri: '/g/:groupId/q/:questionId/a/:commentId/res',
        method: Method.Post,
        params: function (p) { return ({ questions: p }); }
    },
    FinishQuestion: {
        uri: '/g/:groupId/q/:questionId/finish',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    LogIn: {
        uri: '/in',
        method: Method.Post,
        params: function (p) { return ({ user_sessions: p }); }
    },
    LogOut: {
        uri: '/out',
        method: Method.Delete,
        params: function (p) { return ({}); }
    },
    CreateUser: {
        uri: '/welcome/new',
        method: Method.Post,
        params: function (p) { return ({ users: p }); }
    },
    UpdateUser: {
        uri: '/me',
        method: Method.Patch,
        params: function (p) { return ({ users: p }); }
    },
    DestroyUser: {
        uri: '/me',
        method: Method.Delete,
        params: function (p) { return ({}); }
    },
    ChangePassword: {
        uri: '/me/password',
        method: Method.Patch,
        params: function (p) {
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
exports.strike = strike;
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
        var _a = normalize(uri, params), normalized = _a.normalized, trimmed = _a.trimmed;
    }
    build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || params));
}
function build(resolve, reject, queueResolve, uri, method, params) {
    if (params === void 0) { params = {}; }
    base(uri, method)
        .send(params)
        .end(finalize(resolve, reject, queueResolve));
}
function base(uri, method) {
    var r = methodEnchantedRequest(request, uri, method);
    return method === Method.Get
        ? r
        : r.set('X-CSRF-Token', token());
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
            }
            else {
                reject(res.body);
            }
        }
        else {
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
    var normalized = uri
        .replace(':messageId', messageId)
        .replace(':invitationId', invitationId)
        .replace(':questionId', questionId)
        .replace(':commentId', commentId)
        .replace(':groupId', groupId);
    return { trimmed: trimmed, normalized: normalized };
}
function token() {
    try {
        return document.getElementsByName('csrf-token')[0].getAttribute('content');
    }
    catch (ex) {
        return '';
    }
}

},{}]},{},[1]);
