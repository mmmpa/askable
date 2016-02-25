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
    Context.prototype.succeed = function () {
        document.location = this.props.userPage;
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.LogIn, params)
            .then(function () {
            _this.setState({ state: State.Success });
            _this.succeed();
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
            preview: false,
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
        switch (this.props.state) {
            case State.Fail:
                return React.createElement("section", {"className": "new-question error-messages"}, React.createElement("p", {"className": "error-message"}, React.createElement(fa_1.default, {"icon": "ban"}), "ログインに失敗しました"));
            case State.Success:
                return React.createElement("section", {"className": "new-question success-messages"}, React.createElement("p", {"className": "success-message"}, React.createElement(fa_1.default, {"icon": "paw"}), "ログインに成功しました"));
            case State.Submitting:
            case State.Waiting:
            default:
                return null;
        }
    };
    Component.prototype.writeSubmit = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "new-question sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "認証中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "new-question submit", "onClick": function () { return _this.dispatch('submit', _this.params); }}, React.createElement(fa_1.default, {"icon": "sign-in"}), "ログインする");
        }
    };
    Component.prototype.detectTabClass = function (isPreview) {
        return isPreview === this.state.preview ? 'tabnav-tab selected' : 'tabnav-tab';
    };
    Component.prototype.render = function () {
        var _this = this;
        return React.createElement("article", {"className": "new-question body"}, React.createElement("section", {"className": "new-question box-body"}, React.createElement("h1", {"className": "new-question log-in-title"}, "ログイン"), React.createElement("section", {"className": "new-question tabs tabnav"}, React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": this.detectTabClass(false), "onClick": function () { return _this.setState({ preview: false }); }}, React.createElement(fa_1.default, {"icon": "pencil"}), "コメントを書く"), React.createElement("a", {"className": this.detectTabClass(true), "onClick": function () { return _this.setState({ preview: true }); }}, React.createElement(fa_1.default, {"icon": "file-text-o"}), "プレビュー"))), React.createElement("div", {"className": "inner form"}, React.createElement("section", {"className": "new-question input-section"}, React.createElement("input", {"type": "text", "name": "title", "value": this.state.title, "placeholder": "タイトル", "onChange": function (e) { return _this.setState({ login: e.target.value }); }})), React.createElement("section", {"className": "new-question input-section"}, React.createElement("textarea", {"name": "comment"})), this.writeError(), React.createElement("section", {"className": "new-question submit-section"}, this.writeSubmit()))));
    };
    return Component;
})(eventer_1.Node);
var NewQuestion = (function () {
    function NewQuestion() {
    }
    NewQuestion.start = function (dom, user, team) {
        ReactDOM.render(React.createElement(Context, React.__spread({}, { user: user, team: team })), dom);
    };
    return NewQuestion;
})();
window.NewQuestion = NewQuestion;
//# sourceMappingURL=index.js.map