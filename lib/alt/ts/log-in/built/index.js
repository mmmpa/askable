var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var fa_1 = require('./lib/fa');
var submit_button_1 = require('./lib/components/submit-button');
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
    Context.prototype.succeed = function () {
        location.reload();
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strike(strike_api_1.Api.LogIn, params)
            .then(function () {
            _this.succeed();
            _this.setState({ state: State.Success });
        })
            .catch(function () {
            _this.setState({ state: State.Fail });
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
            login: '',
            password: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var _a = this.state, login = _a.login, password = _a.password;
            return { login: login, password: password };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.writeError = function (state) {
        switch (state) {
            case State.Fail:
                return React.createElement("p", {"className": "com message-area error-message"}, React.createElement(fa_1.default, {"icon": "ban"}), "ログインに失敗しました");
            case State.Success:
                return React.createElement("p", {"className": "com message-area success-message"}, React.createElement(fa_1.default, {"icon": "paw"}), "ログインに成功しました");
            case State.Submitting:
            case State.Waiting:
            default:
                return null;
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        var state = this.props.state;
        return React.createElement("article", {"className": "user-log-in body"}, React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "ログイン"), React.createElement("div", {"className": "com form-area"}, React.createElement("section", {"className": "com input-section"}, React.createElement("input", {"type": "text", "name": "login", "value": this.state.login, "placeholder": "ログインID", "onChange": function (e) { return _this.setState({ login: e.target.value }); }})), React.createElement("section", {"className": "com input-section"}, React.createElement("input", {"type": "password", "name": "password", "value": this.state.password, "placeholder": "パスワード", "onChange": function (e) { return _this.setState({ password: e.target.value }); }})), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "sign-in", text: "ログインする", className: 'submit',
            onClick: function () { return _this.dispatch('submit', _this.params); }
        })))), this.writeError(state)));
    };
    return Component;
})(eventer_1.Node);
var LogIn = (function () {
    function LogIn() {
    }
    LogIn.start = function (dom) {
        ReactDOM.render(React.createElement(Context, null, React.createElement(Component, null)), dom);
    };
    return LogIn;
})();
window.LogIn = LogIn;
//# sourceMappingURL=index.js.map