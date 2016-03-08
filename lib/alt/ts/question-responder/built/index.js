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
var group_1 = require("./lib/models/group");
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
    Object.defineProperty(Context.prototype, "questionId", {
        get: function () {
            return this.props.questionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "groupId", {
        get: function () {
            return this.props.groupId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.setBase = function (params) {
        params.groupId = this.groupId;
        params.questionId = this.questionId;
        return params;
    };
    Context.prototype.submitAnswer = function (params) {
        this.submit(strike_api_1.Api.AnswerQuestion, this.setBase(params));
    };
    Context.prototype.submitAssign = function (params) {
        this.submit(strike_api_1.Api.AssignUserQuestion, this.setBase(params));
    };
    Context.prototype.submitSorry = function () {
        this.submit(strike_api_1.Api.SorryQuestion, this.setBase({}));
    };
    Context.prototype.submitWait = function () {
        this.submit(strike_api_1.Api.WaitAnswerQuestion, this.setBase({}));
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
            return { title: title, markdown: markdown, assigned: assigned, questionId: null };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "assignParams", {
        get: function () {
            var _a = this.state, title = _a.title, markdown = _a.markdown, assigned = _a.assigned;
            return { title: title, markdown: markdown, assigned: assigned, questionId: null };
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
        var _a = this.props, user = _a.user, group = _a.group, errors = _a.errors, already = _a.already;
        return React.createElement("section", null, React.createElement(assigner_1.default, React.__spread({}, { errors: errors, assigned: assigned, user: user, group: group, already: already }, {"onChange": function (state) { return _this.setState(state); }})), React.createElement("section", {"className": "respond submit-section"}, this.writeSubmitAssign()));
    };
    Component.prototype.writeSubmit = function (text, onClick) {
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "respond sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "respond submit", "onClick": onClick}, React.createElement(fa_1.default, {"icon": "hand-paper-o"}), text);
        }
    };
    Component.prototype.writeSubmitAssign = function () {
        var _this = this;
        return this.writeSubmit('替わりにおねがいする', function () { return _this.dispatch('submitAssign', _this.assignParams); });
    };
    Component.prototype.writeSubmitAnswer = function () {
        var _this = this;
        return this.writeSubmit('この内容で回答する', function () { return _this.dispatch('submitAnswer', _this.answerParams); });
    };
    Component.prototype.detectTabClass = function (base, mode) {
        return mode === this.state.mode
            ? base + " tabnav-tab selected"
            : base + " tabnav-tab";
    };
    Component.prototype.changeMode = function (mode) {
        this.setState({ mode: mode });
    };
    Component.prototype.writeButton = function (text, name, icon, onClick) {
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "respond " + name + " sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "respond " + name, "onClick": onClick}, React.createElement(fa_1.default, {"icon": icon}), text);
        }
    };
    Component.prototype.writeTitle = function () {
        if (this.props.responded) {
            return React.createElement("h1", {"className": "respond title"}, React.createElement(fa_1.default, {"icon": "reply "}), "回答する");
        }
        else {
            return React.createElement("h1", {"className": "respond title"}, React.createElement(fa_1.default, {"icon": "graduation-cap "}), "回答をおねがいされています");
        }
    };
    Component.prototype.writeResponderButton = function () {
        var _this = this;
        if (this.props.responded) {
            return null;
        }
        return [
            this.writeButton('力になれません', 'sorry', 'paw', function () { return _this.dispatch('submitSorry'); }),
            this.writeButton('すこし待ってて', 'wait', 'clock-o', function () { return _this.dispatch('submitWait'); })
        ];
    };
    Component.prototype.writeOpener = function () {
        var _this = this;
        return React.createElement("article", {"className": "respond body"}, React.createElement("button", {"className": "respond opener", "onClick": function () { return _this.setState({ opened: true }); }}, React.createElement(fa_1.default, {"icon": "folder-open-o"}), "回答フォームを表示する"));
    };
    Component.prototype.render = function () {
        var _this = this;
        if (this.props.state === State.Success) {
            return React.createElement("article", {"className": "respond body"}, React.createElement("section", {"className": "respond registered-body"}, React.createElement("p", {"className": "respond registered-message"}, "投稿完了しました")));
        }
        return React.createElement("article", {"className": "respond body"}, React.createElement("section", {"className": "respond box-body"}, this.writeTitle(), React.createElement("section", {"className": "respond response"}, React.createElement("section", {"className": "respond response-type-area"}, React.createElement("div", {"className": "tabnav"}, this.writeResponderButton(), React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": this.detectTabClass('respond answer-tab', Mode.Answering), "onClick": function () { return _this.changeMode(Mode.Answering); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "回答する"), React.createElement("a", {"className": this.detectTabClass('respond assign-tab', Mode.Assigning), "onClick": function () { return _this.changeMode(Mode.Assigning); }}, React.createElement(fa_1.default, {"icon": "group"}), "知ってそうな人を招待する")))), React.createElement("section", {"className": "respond responder-area"}, this.writeResponder()))));
    };
    return Component;
})(eventer_1.Node);
var QuestionResponder = (function () {
    function QuestionResponder() {
    }
    QuestionResponder.start = function (dom, _a) {
        var closed = _a.closed, questionId = _a.questionId, user = _a.user, group = _a.group, already = _a.already, responded = _a.responded, groupId = _a.groupId;
        var user = new user_1.default(user);
        var group = new group_1.default(group);
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionId: questionId, user: user, group: group, already: already, responded: responded, groupId: groupId }), React.createElement(Component, null)), dom);
    };
    QuestionResponder.opener = function (doms, params) {
        var _this = this;
        if (closed) {
            _.each(doms, function (dom) { return dom.parentNode.removeChild(dom); });
            return;
        }
        _.each(doms, function (dom) {
            dom.addEventListener('click', function (e) {
                _this.start(e.target.parentNode, params);
            });
        });
    };
    return QuestionResponder;
})();
window.QuestionResponder = QuestionResponder;
//# sourceMappingURL=index.js.map