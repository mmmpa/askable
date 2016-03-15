var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
var fa_1 = require('./lib/fa');
var submit_button_1 = require('./lib/components/submit-button');
var input_writer_1 = require('./lib/helpers/input-writer');
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
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.LogIn, params)
            .then(function () {
            _this.succeed();
            _this.setState({ loggedIn: true });
        })
            .catch(function () {
            _this.setState({ state: state_1.State.Fail });
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
            state: state_1.State.Waiting,
            loggedIn: false
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
    Component.prototype.writeError = function () {
        if (this.props.loggedIn) {
            return React.createElement("p", {"className": "com message-area success-message"}, React.createElement(fa_1.default, {"icon": "paw"}), "ログインに成功しました");
        }
        switch (this.props.state) {
            case state_1.State.Fail:
                return React.createElement("p", {"className": "com message-area error-message"}, React.createElement(fa_1.default, {"icon": "ban"}), "ログインに失敗しました");
            case state_1.State.Success:
            case state_1.State.Submitting:
            case state_1.State.Waiting:
            default:
                return null;
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        var state = this.props.state;
        var _a = this.state, login = _a.login, password = _a.password;
        return React.createElement("article", {"className": "user-log-in body"}, React.createElement("section", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "ログイン"), React.createElement("div", {"className": "com form-area"}, input_writer_1.writeInput(this, 'text', 'login', 'ログインID', null), input_writer_1.writeInput(this, 'password', 'password', 'パスワード', null), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "sign-in", text: "ログインする", className: 'submit',
            onClick: function () { return _this.dispatch('submit', _this.params); }
        })))), this.writeError()));
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