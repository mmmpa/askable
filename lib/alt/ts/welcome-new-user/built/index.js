var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var fa_1 = require('./lib/fa');
var submit_button_1 = require('./lib/components/submit-button');
var input_form_1 = require('./lib/components/input-form');
var state_1 = require('./lib/models/state');
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.CreateUser, params)
            .then(function (result) {
            _this.setState({ result: result, errors: {}, state: state_1.State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('submit', function (params) {
            _this.submit(params);
        });
    };
    Context.prototype.initialState = function (props) {
        return {
            state: state_1.State.Waiting
        };
    };
    return Context;
})(eventer_1.Root);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
        this.state = {
            name: '',
            login: '',
            email: '',
            password: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var _a = this.state, name = _a.name, login = _a.login, email = _a.email, password = _a.password;
            return { name: name, login: login, email: email, password: password };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.writeInput = function (type, name, placeholder, errors) {
        var _this = this;
        return React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: type, name: name, placeholder: placeholder, value: this.state[name],
            onChange: function (v) {
                var p = {};
                p[name] = v;
                _this.setState(p);
            }
        })));
    };
    Component.prototype.writeForm = function () {
        var _this = this;
        var _a = this.props, state = _a.state, errors = _a.errors;
        return React.createElement("article", {"className": "user-register body"}, React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "登録内容を入力してください"), React.createElement("div", {"className": "com form-area"}, this.writeInput('text', 'name', '表示する名前', errors), this.writeInput('text', 'login', 'ログイン用ID', errors), this.writeInput('text', 'email', 'メールアドレス', errors), this.writeInput('password', 'password', 'パスワード', errors), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "send-o", text: "登録する", className: 'submit',
            onClick: function () { return _this.dispatch('submit', _this.params); }
        }))))));
    };
    Component.prototype.writeResult = function () {
        var _a = this.props.result || {}, name = _a.name, login = _a.login, email = _a.email;
        return React.createElement("article", {"className": "user-register body"}, React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "以下の内容で登録されました"), React.createElement("div", {"className": "com form-area"}, React.createElement("section", {"className": "com input-section"}, React.createElement("h1", {"className": "user-register info-label"}, "表示するなまえ"), React.createElement("p", {"className": "user-register info"}, name)), React.createElement("section", {"className": "com input-section"}, React.createElement("h1", {"className": "user-register info-label"}, "ログイン用ID"), React.createElement("p", {"className": "user-register info"}, login)), React.createElement("section", {"className": "com input-section"}, React.createElement("h1", {"className": "user-register info-label"}, "メールアドレス"), React.createElement("p", {"className": "user-register info"}, email)), React.createElement("section", {"className": "user-register link-section"}, React.createElement(fa_1.default, {"icon": "sign-in"}), React.createElement("a", {"href": "/in"}, "ログインページヘ")))));
    };
    Component.prototype.render = function () {
        switch (this.props.state) {
            case state_1.State.Success:
                return this.writeResult();
            case state_1.State.Submitting:
            case state_1.State.Waiting:
            case state_1.State.Fail:
            default:
                return this.writeForm();
        }
    };
    return Component;
})(eventer_1.Node);
var Welcome = (function () {
    function Welcome() {
    }
    Welcome.start = function (dom) {
        ReactDOM.render(React.createElement(Context, null, React.createElement(Component, null)), dom);
    };
    return Welcome;
})();
window.Welcome = Welcome;
//# sourceMappingURL=index.js.map