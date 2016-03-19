var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require('./lib/parcel');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
var fa_1 = require('./lib/fa');
var comment_editor_1 = require('./lib/components/comment-editor');
var assigner_1 = require('./lib/components/assigner');
var user_1 = require("./lib/models/user");
var group_1 = require("./lib/models/group");
var submit_button_1 = require('./lib/components/submit-button');
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
    Context.prototype.answer = function (params) {
        this.submit(strike_api_1.Api.AnswerQuestion, this.setBase(params));
    };
    Context.prototype.assign = function (params) {
        this.submit(strike_api_1.Api.AssignUserQuestion, this.setBase(params));
    };
    Context.prototype.sorry = function () {
        this.submit(strike_api_1.Api.SorryQuestion, this.setBase({}));
    };
    Context.prototype.wait = function () {
        this.submit(strike_api_1.Api.WaitAnswerQuestion, this.setBase({}));
    };
    Context.prototype.submit = function (api, params) {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(api, params)
            .then(function () {
            _this.succeed();
        })
            .catch(function (_a) {
            var errors = _a.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('answer', function (params) {
            _this.answer(params);
        });
        to('assign', function (params) {
            _this.assign(params);
        });
        to('sorry', function () {
            _this.sorry();
        });
        to('wait', function () {
            _this.wait();
        });
    };
    Context.prototype.initialState = function (props) {
        return {
            state: state_1.State.Waiting,
            errors: {}
        };
    };
    return Context;
})(parcel_1.Parcel);
var Mode;
(function (Mode) {
    Mode[Mode["Answering"] = 0] = "Answering";
    Mode[Mode["Assigning"] = 1] = "Assigning";
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
        var _a = this.props, errors = _a.errors, state = _a.state;
        var markdown = this.state.markdown;
        return React.createElement("section", null, React.createElement(comment_editor_1.default, React.__spread({}, { errors: errors, markdown: markdown }, {"title": "not required", "onChange": function (state) { return _this.setState(state); }})), React.createElement("section", {"className": "respond submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "hand-paper-o", text: "この内容で回答する", className: 'submit',
            onClick: function () { return _this.dispatch('answer', _this.answerParams); }
        }))));
    };
    Component.prototype.writeAssignArea = function () {
        var _this = this;
        var assigned = this.state.assigned;
        var _a = this.props, user = _a.user, group = _a.group, errors = _a.errors, already = _a.already, state = _a.state;
        return React.createElement("section", null, React.createElement(assigner_1.default, React.__spread({}, { errors: errors, assigned: assigned, user: user, group: group, already: already }, {"onChange": function (state) { return _this.setState(state); }})), React.createElement("section", {"className": "respond submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "hand-o-right", text: "替わりにおねがいする", className: 'submit',
            onClick: function () { return _this.dispatch('assign', _this.assignParams); }
        }))));
    };
    Component.prototype.detectTabClass = function (base, mode) {
        return mode === this.state.mode
            ? base + " tabnav-tab selected"
            : base + " tabnav-tab";
    };
    Component.prototype.changeMode = function (mode) {
        this.setState({ mode: mode });
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
        var state = this.props.state;
        return [
            React.createElement(submit_button_1.default, React.__spread({"key": "sorry"}, {
                state: state, icon: "paw", text: "力になれません", className: 'respond sorry',
                onClick: function () { return _this.dispatch('sorry'); }
            })),
            React.createElement(submit_button_1.default, React.__spread({"key": "wait"}, {
                state: state, icon: "clock-o", text: "すこし待ってて", className: 'respond wait',
                onClick: function () { return _this.dispatch('wait'); }
            }))
        ];
    };
    Component.prototype.render = function () {
        var _this = this;
        return React.createElement("article", {"className": "respond body"}, React.createElement("section", {"className": "respond box-body"}, this.writeTitle(), React.createElement("section", {"className": "respond response"}, React.createElement("section", {"className": "respond response-type-area"}, React.createElement("div", {"className": "tabnav"}, this.writeResponderButton(), React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": this.detectTabClass('respond answer-tab', Mode.Answering), "onClick": function () { return _this.changeMode(Mode.Answering); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "回答する"), React.createElement("a", {"className": this.detectTabClass('respond assign-tab', Mode.Assigning), "onClick": function () { return _this.changeMode(Mode.Assigning); }}, React.createElement(fa_1.default, {"icon": "group"}), "知ってそうな人を招待する")))), React.createElement("section", {"className": "respond responder-area"}, this.writeResponder()))));
    };
    return Component;
})(parcel_1.Good);
var QuestionResponder = (function () {
    function QuestionResponder() {
    }
    QuestionResponder.start = function (dom) {
        var questionPage = dom.getAttribute('data-questionPage');
        var questionId = dom.getAttribute('data-questionId');
        var groupId = dom.getAttribute('data-groupId');
        var user = new user_1.default(JSON.parse(dom.getAttribute('data-user')));
        var group = new group_1.default(JSON.parse(dom.getAttribute('data-group')));
        var already = JSON.parse(dom.getAttribute('data-already'));
        var responded = dom.getAttribute('data-responded') === 'true';
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionId: questionId, user: user, group: group, already: already, responded: responded, groupId: groupId }), React.createElement(Component, null)), dom);
    };
    QuestionResponder.opener = function (doms, params) {
        var _this = this;
        _.each(doms, function (dom) {
            dom.addEventListener('click', function (e) {
                _this.start(e.target.parentNode, params);
            });
        });
    };
    return QuestionResponder;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionResponder;
window.QuestionResponder = QuestionResponder;
//# sourceMappingURL=index.js.map