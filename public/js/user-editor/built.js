(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var user_1 = require('./lib/models/user');
var state_1 = require('./lib/models/state');
var submit_button_1 = require('./lib/components/submit-button');
var input_form_1 = require('./lib/components/input-form');
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
            state: 'ready',
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
        var _a = this.props, state = _a.state, errors = _a.errors;
        var _b = this.state, name = _b.name, login = _b.login, email = _b.email;
        return React.createElement("section", {"className": "user-editor registering-body"}, React.createElement("h1", {"className": "user-editor registering-title"}, "登録内容の変更"), React.createElement("div", {"className": "inner form"}, React.createElement("section", {"className": "user-editor input-section"}, React.createElement(input_form_1.default, React.__spread({}, { errors: errors, type: 'text', name: 'name', label: '表示するなまえ', value: name, onChange: function (v) { return _this.setState({ name: v }); } }))), React.createElement("section", {"className": "user-editor input-section"}, React.createElement(input_form_1.default, React.__spread({}, { errors: errors, type: 'text', name: 'login', label: 'ログイン用ID', value: login, onChange: function (v) { return _this.setState({ login: v }); } }))), React.createElement("section", {"className": "user-editor input-section"}, React.createElement(input_form_1.default, React.__spread({}, { errors: errors, type: 'text', name: 'email', label: 'メールアドレス', value: email, onChange: function (v) { return _this.setState({ email: v }); } }))), React.createElement("section", {"className": "user-editor submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "send-o", text: "変更する", className: 'submit',
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
        var _a = this.props, state = _a.state, errors = _a.errors;
        var _b = this.state, passwordNow = _b.passwordNow, password = _b.password;
        return React.createElement("section", {"className": "user-editor registering-body"}, React.createElement("h1", {"className": "user-editor registering-title"}, "パスワードの変更"), React.createElement("div", {"className": "inner form"}, React.createElement("section", {"className": "user-editor input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: 'password', name: 'passwordNow', label: '旧パスワード', value: passwordNow,
            onChange: function (v) { return _this.setState({ passwordNow: v }); }
        }))), React.createElement("section", {"className": "user-editor input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: 'password', name: 'password', label: '新パスワード', value: password,
            onChange: function (v) { return _this.setState({ password: v }); }
        }))), React.createElement("section", {"className": "user-editor submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "key", text: "パスワードを変更する", className: 'submit',
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
        var state = this.props.state;
        var yes = this.state.yes;
        return React.createElement("section", {"className": "user-editor registering-body"}, React.createElement("h1", {"className": "user-editor registering-title"}, "アカウントの削除"), React.createElement("div", {"className": "inner form"}, React.createElement("section", {"className": "user-editor dispose-verify"}, React.createElement("label", null, React.createElement("input", {"type": "checkbox", "name": "yes", "checked": yes, "onChange": function () { return _this.setState({ yes: !yes }); }}), "本当に削除する")), React.createElement("section", {"className": "user-editor submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "trash", text: "アカウントを削除する", className: 'dispose', disabled: !yes,
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
        ReactDOM.render(React.createElement("article", {"className": "user-editor body"}, React.createElement(Context, React.__spread({}, { initial: initial }), React.createElement(UserComponent, null)), React.createElement(Context, null, React.createElement(PasswordComponent, null)), React.createElement(Context, null, React.createElement(DisposerComponent, null))), dom);
    };
    return UserEditor;
})();
window.UserEditor = UserEditor;

},{"./lib/components/input-form":3,"./lib/components/submit-button":4,"./lib/eventer":5,"./lib/models/state":7,"./lib/models/user":8,"./lib/services/strike-api":9}],2:[function(require,module,exports){
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
        return React.createElement("ul", {"className": "error-messages"}, myErrors.map(function (error) { return React.createElement("li", {"className": "error-message"}, error); }));
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
            return React.createElement("label", null, label);
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

},{"../eventer":5,"../models/state":7,"./error-message":2}],4:[function(require,module,exports){
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

},{"../eventer":5,"../fa":6,"../models/state":7}],5:[function(require,module,exports){
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
        var props = _.merge(_.clone(this.props), this.state);
        delete props.children;
        var children = this.props.children;
        if (!children.map) {
            children = [children];
        }
        return React.createElement("div", null, children.map(function (child) { return React.cloneElement(child || React.createElement("div", null, "blank"), props); }));
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
(function (State) {
    State[State["Waiting"] = 0] = "Waiting";
    State[State["Submitting"] = 1] = "Submitting";
    State[State["Fail"] = 2] = "Fail";
    State[State["Success"] = 3] = "Success";
})(exports.State || (exports.State = {}));
var State = exports.State;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
var jobs = Promise.resolve();
(function (OldApi) {
    OldApi[OldApi["CreateUser"] = 0] = "CreateUser";
    OldApi[OldApi["createQuestion"] = 1] = "createQuestion";
    OldApi[OldApi["LogIn"] = 2] = "LogIn";
    OldApi[OldApi["AnswerQuestion"] = 3] = "AnswerQuestion";
    OldApi[OldApi["AssignUserQuestion"] = 4] = "AssignUserQuestion";
    OldApi[OldApi["WaitAnswerQuestion"] = 5] = "WaitAnswerQuestion";
    OldApi[OldApi["SorryQuestion"] = 6] = "SorryQuestion";
    OldApi[OldApi["ReplyToReply"] = 7] = "ReplyToReply";
    OldApi[OldApi["LogOut"] = 8] = "LogOut";
    OldApi[OldApi["FinishQuestion"] = 9] = "FinishQuestion";
    OldApi[OldApi["AcceptInvitation"] = 10] = "AcceptInvitation";
    OldApi[OldApi["RejectInvitation"] = 11] = "RejectInvitation";
    OldApi[OldApi["BlockInvitation"] = 12] = "BlockInvitation";
    OldApi[OldApi["Invite"] = 13] = "Invite";
    OldApi[OldApi["DisposeGroup"] = 14] = "DisposeGroup";
    OldApi[OldApi["CreateGroup"] = 15] = "CreateGroup";
    OldApi[OldApi["UpdateUser"] = 16] = "UpdateUser";
    OldApi[OldApi["DestroyUser"] = 17] = "DestroyUser";
    OldApi[OldApi["ChangePassword"] = 18] = "ChangePassword";
})(exports.OldApi || (exports.OldApi = {}));
var OldApi = exports.OldApi;
var Method;
(function (Method) {
    Method[Method["Get"] = 0] = "Get";
    Method[Method["Post"] = 1] = "Post";
    Method[Method["Patch"] = 2] = "Patch";
    Method[Method["Put"] = 3] = "Put";
    Method[Method["Delete"] = 4] = "Delete";
})(Method || (Method = {}));
var Uri = {
    createUser: '/welcome/new',
    logIn: '/in',
    logOut: '/out',
    createQuestion: '/g/:groupId/me/q/new',
    answerQuestion: '/g/:groupId/q/:questionId/answer',
    assignUserQuestion: '/g/:groupId/q/:questionId/assign',
    waitAnswerQuestion: '/g/:groupId/q/:questionId/wait',
    sorryQuestion: '/g/:groupId/q/:questionId/sorry',
    replyToReply: '/g/:groupId/q/:questionId/a/:commentId/res',
    finishQuestion: '/g/:groupId/q/:questionId/finish',
    acceptInvitation: '/i/:invitationId/accept',
    rejectInvitation: '/i/:invitationId/reject',
    blockInvitation: '/i/:invitationId/block',
    invite: '/g/:groupId/invitation',
    disposeGroup: '/g/:groupId',
    createGroup: '/g/new',
    updateUser: '/me',
    destroyUser: '/me',
    changePassword: '/me/password'
};
exports.Api = {
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
function strikeApi(api, params) {
    return new Promise(function (resolve, reject) {
        addJob(api, params, resolve, reject);
    });
}
exports.strikeApi = strikeApi;
function addJob(api, params, resolve, reject) {
    jobs = jobs.then(function () {
        return new Promise(function (queueResolve, _) {
            detectFunction(api)(params, resolve, reject, queueResolve);
        });
    });
}
function detectFunction(api) {
    switch (api) {
        case exports.Api.CreateUser:
            return createUser;
        case exports.Api.createQuestion:
            return createQuestion;
        case exports.Api.LogIn:
            return logIn;
        case exports.Api.AnswerQuestion:
            return answerQuestion;
        case exports.Api.AssignUserQuestion:
            return assignUserQuestion;
        case exports.Api.WaitAnswerQuestion:
            return waitAnswerQuestion;
        case exports.Api.SorryQuestion:
            return sorryQuestion;
        case exports.Api.ReplyToReply:
            return replyToReply;
        case exports.Api.LogOut:
            return logOut;
        case exports.Api.FinishQuestion:
            return finishQuestion;
        case exports.Api.AcceptInvitation:
            return acceptInvitation;
        case exports.Api.RejectInvitation:
            return rejectInvitation;
        case exports.Api.BlockInvitation:
            return blockInvitation;
        case exports.Api.Invite:
            return invite;
        case exports.Api.DisposeGroup:
            return disposeGroup;
        case exports.Api.CreateGroup:
            return createGroup;
        case exports.Api.UpdateUser:
            return updateUser;
        case exports.Api.DestroyUser:
            return destroyUser;
        case exports.Api.ChangePassword:
            return changePassword;
        default:
            throw 'Api not exist';
    }
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
function normalize(uri, params) {
    var questionId = params.questionId;
    delete params.questionId;
    var groupId = params.groupId;
    delete params.groupId;
    var commentId = params.commentId;
    delete params.commentId;
    var invitationId = params.invitationId;
    delete params.invitationId;
    var normalized = uri
        .replace(':invitationId', invitationId)
        .replace(':questionId', questionId)
        .replace(':commentId', commentId)
        .replace(':groupId', groupId);
    return { params: params, normalized: normalized };
}
function logOut(params, resolve, reject, queueResolve) {
    request
        .delete(Uri.logOut)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function common(api, params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, api.uri, api.method, api.params(params));
}
function createUser(params, resolve, reject, queueResolve) {
    request
        .post(Uri.createUser)
        .send({ users: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function updateUser(params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, Uri.updateUser, Method.Patch, { users: params });
}
function destroyUser(params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, Uri.destroyUser, Method.Delete);
}
function changePassword(params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, Uri.changePassword, Method.Patch, { users: params });
}
function invite(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.invite, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ invitations: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function disposeGroup(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.disposeGroup, params), normalized = _a.normalized, params = _a.params;
    request
        .delete(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function createGroup(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.createGroup, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ groups: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function acceptInvitation(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.acceptInvitation, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function blockInvitation(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.blockInvitation, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function rejectInvitation(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.rejectInvitation, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function createQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.createQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function finishQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.finishQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function answerQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.answerQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function replyToReply(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.replyToReply, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function assignUserQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.assignUserQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function sorryQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.sorryQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function waitAnswerQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.waitAnswerQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function logIn(params, resolve, reject, queueResolve) {
    request
        .post(Uri.logIn)
        .send({ user_sessions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
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
