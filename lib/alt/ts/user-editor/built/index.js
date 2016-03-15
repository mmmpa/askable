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
//# sourceMappingURL=index.js.map