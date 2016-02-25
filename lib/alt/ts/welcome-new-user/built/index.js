var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var fa_1 = require('./lib/fa');
var strike_api_1 = require('./lib/services/strike-api');
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
    Context.prototype.children = function (props) {
        return React.createElement(Component, React.__spread({}, props));
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.CreateUser, params)
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
    Component.prototype.setStateHelper = function (key, value) {
        var hash = {};
        hash[key] = value;
        this.setState(hash);
    };
    Component.prototype.writeInput = function (type, name, placeholder) {
        var _this = this;
        var errors = this.writeError(name);
        var state = !!this.writeError(name) ? 'has-error' : 'calm';
        return React.createElement("div", {"className": "input"}, React.createElement("input", React.__spread({"className": state}, { type: type, name: name, placeholder: placeholder }, {"value": this.state[name], "onChange": function (e) { _this.setStateHelper(name, e.target.value); }})), errors);
    };
    Component.prototype.writeError = function (name) {
        if (!this.props.errors) {
            return null;
        }
        var errors = this.props.errors[name];
        if (!errors) {
            return null;
        }
        return React.createElement("ul", {"className": "error-messages"}, errors.map(function (error) { return React.createElement("li", {"className": "error-message"}, error); }));
    };
    Component.prototype.writeSubmit = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "user-register sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "Sending...");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "user-register submit", "onClick": function () { return _this.dispatch('submit', _this.params); }}, React.createElement(fa_1.default, {"icon": "paw"}), "Submit");
        }
    };
    Component.prototype.writeForm = function () {
        return React.createElement("article", {"className": "user-register body"}, React.createElement("section", {"className": "user-register registering-body"}, React.createElement("h1", {"className": "user-register registering-title"}, "登録内容を入力してください"), React.createElement("div", {"className": "inner form"}, React.createElement("section", {"className": "user-register input-section"}, this.writeInput('text', 'name', '表示するなまえ')), React.createElement("section", {"className": "user-register input-section"}, this.writeInput('text', 'login', 'ログイン用ID')), React.createElement("section", {"className": "user-register input-section"}, this.writeInput('text', 'email', 'メールアドレス')), React.createElement("section", {"className": "user-register input-section"}, this.writeInput('password', 'password', 'パスワード')), React.createElement("section", {"className": "user-register submit-section"}, this.writeSubmit()))));
    };
    Component.prototype.writeResult = function () {
        var _a = this.props.result || {}, name = _a.name, login = _a.login, email = _a.email;
        return React.createElement("article", {"className": "user-register body"}, React.createElement("section", {"className": "user-register registered-body"}, React.createElement("h1", {"className": "user-register registered-title"}, "以下の内容で登録されました"), React.createElement("div", {"className": "inner"}, React.createElement("section", {"className": "user-register info-section"}, React.createElement("h1", {"className": "user-register info-label"}, "表示するなまえ"), React.createElement("p", {"className": "user-register info"}, name)), React.createElement("section", {"className": "user-register info-section"}, React.createElement("h1", {"className": "user-register info-label"}, "ログイン用ID"), React.createElement("p", {"className": "user-register info"}, login)), React.createElement("section", {"className": "user-register info-section"}, React.createElement("h1", {"className": "user-register info-label"}, "メールアドレス"), React.createElement("p", {"className": "user-register info"}, email)))));
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
        ReactDOM.render(React.createElement(Context, null), dom);
    };
    return Welcome;
})();
window.Welcome = Welcome;
//# sourceMappingURL=index.js.map