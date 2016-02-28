var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var fa_1 = require('./lib/fa');
var comment_editor_1 = require('./lib/components/comment-editor');
var assigner_1 = require('./lib/components/assigner');
var strike_api_1 = require('./lib/services/strike-api');
var user_1 = require("./lib/models/user");
var team_1 = require("./lib/models/team");
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
    Context.prototype.succeed = function (questionId) {
        document.location = this.props.questionPage.replace(':questionId', questionId);
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.createQuestion, params)
            .then(function (_a) {
            var id = _a.id;
            _this.setState({ state: State.Success });
            _this.succeed(id);
        })
            .catch(function (_a) {
            var errors = _a.errors;
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
            state: 'ready',
            errors: {}
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
            markdown: '',
            title: '',
            assigned: []
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var _a = this.state, title = _a.title, markdown = _a.markdown, assigned = _a.assigned;
            return { title: title, markdown: markdown, assigned: assigned };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.writeSubmit = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "new-question sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "new-question submit", "onClick": function () { return _this.dispatch('submit', _this.params); }}, React.createElement(fa_1.default, {"icon": "hand-paper-o"}), "この内容で質問する");
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        if (this.props.state === State.Success) {
            return React.createElement("article", {"className": "new-question body"}, React.createElement("section", {"className": "new-question registered-body"}, React.createElement("p", {"className": "new-question registered-message"}, "投稿完了しました")));
        }
        var _a = this.props, errors = _a.errors, user = _a.user, team = _a.team;
        return React.createElement("article", {"className": "new-question body"}, React.createElement("section", {"className": "new-question box-body"}, React.createElement("h1", {"className": "new-question log-in-title"}, "質問する"), React.createElement("div", {"className": "columns"}, React.createElement("section", {"className": "new-question editor-area"}, React.createElement(comment_editor_1.default, React.__spread({}, { errors: errors }, {"onChange": function (state) { return _this.setState(state); }})), React.createElement("div", {"className": "inner form"}, React.createElement("section", {"className": "new-question submit-section"}, this.writeSubmit()))), React.createElement("section", {"className": "new-question assigning-area"}, React.createElement(assigner_1.default, React.__spread({}, { user: user, team: team }, {"onChange": function (state) { return _this.setState(state); }}))))));
    };
    return Component;
})(eventer_1.Node);
var NewQuestion = (function () {
    function NewQuestion() {
    }
    NewQuestion.start = function (dom, questionPage, userJson, teamJson) {
        var user = new user_1.default(userJson);
        var team = new team_1.default(teamJson);
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionPage: questionPage, user: user, team: team })), dom);
    };
    return NewQuestion;
})();
window.NewQuestion = NewQuestion;
//# sourceMappingURL=index.js.map