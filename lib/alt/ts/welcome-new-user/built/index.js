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
var State;
(function (State) {
    State[State["Waiting"] = 0] = "Waiting";
    State[State["Submitting"] = 1] = "Submitting";
    State[State["Fail"] = 2] = "Fail";
    State[State["Success"] = 3] = "Success";
})(State || (State = {}));
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strike(strike_api_1.Api.CreateUser, params)
            .then(function (result) {
            _this.setState({ result: result, errors: {}, state: State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: State.Fail });
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
            state: 'ready'
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
    Component.prototype.writeForm = function () {
        var _this = this;
        var _a = this.props, state = _a.state, errors = _a.errors;
        var _b = this.state, name = _b.name, login = _b.login, email = _b.email, password = _b.password;
        return React.createElement("article", {"className": "user-register body"}, React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "登録内容を入力してください"), React.createElement("div", {"className": "com form-area"}, React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: 'text', name: 'name', placeholder: '表示するなまえ', value: name,
            onChange: function (v) { return _this.setState({ name: v }); }
        }))), React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: 'text', name: 'login', placeholder: 'ログイン用ID', value: login,
            onChange: function (v) { return _this.setState({ login: v }); }
        }))), React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: 'text', name: 'email', placeholder: 'メールアドレス', value: email,
            onChange: function (v) { return _this.setState({ email: v }); }
        }))), React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: 'password', name: 'password', placeholder: 'パスワード', value: password,
            onChange: function (v) { return _this.setState({ password: v }); }
        }))), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
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
            case State.Success:
                return this.writeResult();
            case State.Submitting:
            case State.Waiting:
            case State.Fail:
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