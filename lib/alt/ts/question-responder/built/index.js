var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var fa_1 = require('./lib/fa');
var strike_api_1 = require('./lib/services/strike-api');
var comment_editor_1 = require('./lib/components/comment-editor');
var assigner_1 = require('./lib/components/assigner');
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
    Context.prototype.succeed = function () {
        location.reload();
    };
    Context.prototype.submitAnswer = function (params) {
        this.submit(strike_api_1.Api.AssignUserQuestion, params);
    };
    Context.prototype.submitAssign = function (params) {
        this.submit(strike_api_1.Api.AssignUserQuestion, params);
    };
    Context.prototype.submitSorry = function () {
        this.submit(strike_api_1.Api.SorryQuestion);
    };
    Context.prototype.submitWait = function () {
        this.submit(strike_api_1.Api.WaitAnswerQuestion);
    };
    Context.prototype.submit = function (api, params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(api, params)
            .then(function () {
            _this.setState({ state: State.Success });
            _this.succeed();
        })
            .catch(function (_a) {
            var errors = _a.errors;
            _this.setState({ errors: errors, state: State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('submitAnswer', function (params) {
            _this.submitAnswer(params);
        });
        to('submitAssign', function (params) {
            _this.submitAssign(params);
        });
        to('submitSorry', function () {
            _this.submitSorry();
        });
        to('submitWait', function () {
            _this.submitWait();
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
var Mode;
(function (Mode) {
    Mode[Mode["Answering"] = 0] = "Answering";
    Mode[Mode["Assigning"] = 1] = "Assigning";
    Mode[Mode["Sorrying"] = 2] = "Sorrying";
})(Mode || (Mode = {}));
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
        this.state = {
            preview: false,
            markdown: '',
            assigned: [],
            mode: Mode.Answering
        };
    }
    Component.prototype.writeResponder = function () {
        switch (this.state.mode) {
            case Mode.Answering:
                return this.writeAnswerArea();
            case Mode.Assigning:
                return this.writeAssignArea();
        }
    };
    Object.defineProperty(Component.prototype, "answerParams", {
        get: function () {
            var _a = this.state, title = _a.title, markdown = _a.markdown, assigned = _a.assigned;
            return { title: title, markdown: markdown, assigned: assigned };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "assignParams", {
        get: function () {
            var _a = this.state, title = _a.title, markdown = _a.markdown, assigned = _a.assigned;
            return { title: title, markdown: markdown, assigned: assigned };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.writeAnswerArea = function () {
        var _this = this;
        var errors = this.props.errors;
        var markdown = this.state.markdown;
        return React.createElement("section", null, React.createElement(comment_editor_1.default, React.__spread({}, { errors: errors, markdown: markdown }, {"title": "not required", "onChange": function (state) { return _this.setState(state); }})), React.createElement("section", {"className": "respond submit-section"}, this.writeSubmitAnswer()));
    };
    Component.prototype.writeAssignArea = function () {
        var _this = this;
        var assigned = this.state.assigned;
        var _a = this.props, user = _a.user, team = _a.team;
        return React.createElement("section", null, React.createElement(assigner_1.default, React.__spread({}, { assigned: assigned, user: user, team: team }, {"onChange": function (state) { return _this.setState(state); }})), React.createElement("section", {"className": "respond submit-section"}, this.writeSubmitAssign()));
    };
    Component.prototype.writeSubmitAssign = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "respond sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "respond submit", "onClick": function () { return _this.dispatch('submitAssign', _this.assignParams); }}, React.createElement(fa_1.default, {"icon": "hand-paper-o"}), "替わりにおねがいする");
        }
    };
    Component.prototype.writeSubmitAnswer = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "respond sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "respond submit", "onClick": function () { return _this.dispatch('submitAnswer', _this.answerParams); }}, React.createElement(fa_1.default, {"icon": "hand-paper-o"}), "この内容で回答する");
        }
    };
    Component.prototype.detectTabClass = function (mode) {
        return mode === this.state.mode
            ? 'tabnav-tab selected'
            : 'tabnav-tab';
    };
    Component.prototype.changeMode = function (mode) {
        this.setState({ mode: mode });
    };
    Component.prototype.render = function () {
        var _this = this;
        if (this.props.state === State.Success) {
            return React.createElement("article", {"className": "respond body"}, React.createElement("section", {"className": "respond registered-body"}, React.createElement("p", {"className": "respond registered-message"}, "投稿完了しました")));
        }
        return React.createElement("article", {"className": "respond body"}, React.createElement("section", {"className": "respond box-body"}, React.createElement("h1", {"className": "respond title"}, React.createElement(fa_1.default, {"icon": "graduation-cap "}), "回答をおねがいされています"), React.createElement("section", {"className": "respond response"}, React.createElement("section", {"className": "respond response-type-area"}, React.createElement("div", {"className": "tabnav"}, React.createElement("a", {"className": "respond sorry", "onClick": function () { return _this.dispatch('submitWait'); }}, React.createElement(fa_1.default, {"icon": "paw"}), "すこし待ってて"), React.createElement("a", {"className": "respond sorry", "onClick": function () { return _this.dispatch('submitSorry'); }}, React.createElement(fa_1.default, {"icon": "paw"}), "力になれません"), React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": this.detectTabClass(Mode.Answering), "onClick": function () { return _this.changeMode(Mode.Answering); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "回答する"), React.createElement("a", {"className": this.detectTabClass(Mode.Assigning), "onClick": function () { return _this.changeMode(Mode.Assigning); }}, React.createElement(fa_1.default, {"icon": "group"}), "知ってそうな人を招待する")))), React.createElement("section", {"className": "respond responder-area"}, this.writeResponder()))));
    };
    return Component;
})(eventer_1.Node);
var QuestionResponder = (function () {
    function QuestionResponder() {
    }
    QuestionResponder.start = function (dom, questionId, userJson, teamJson) {
        var user = new user_1.default(userJson);
        var team = new team_1.default(teamJson);
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionId: questionId, user: user, team: team })), dom);
    };
    return QuestionResponder;
})();
window.QuestionResponder = QuestionResponder;
//# sourceMappingURL=index.js.map