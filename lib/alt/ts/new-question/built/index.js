var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var fa_1 = require('./lib/fa');
var strike_api_1 = require('./lib/services/strike-api');
var marked = require('marked');
var user_1 = require("./lib/models/user");
var team_1 = require("./lib/models/team");
require("codemirror/addon/mode/overlay.js");
require("codemirror/addon/display/placeholder.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/mode/gfm/gfm.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/meta.js");
var CodeMirror = require('codemirror');
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
    Component.prototype.componentDidMount = function () {
        var _this = this;
        this.cm = CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs['editor']), {
            lineNumbers: true,
            mode: "gfm",
            lineWrapping: true
        });
        this.cm.on('change', function (e) { return _this.changeComment(e.doc.getValue()); });
        this.cm.setSize('100%', '300');
        this.cm.setValue(this.state.markdown);
    };
    Component.prototype.changeComment = function (value) {
        this.setState({ markdown: value });
    };
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var _a = this.state, title = _a.title, markdown = _a.markdown, assigned = _a.assigned;
            return { title: title, markdown: markdown, assigned: assigned };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isPreview", {
        get: function () {
            return this.state.preview;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "markedTitle", {
        get: function () {
            return "# " + this.state.title + "\n\n";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "marked", {
        get: function () {
            var markdown = this.state.markdown;
            var __html = marked(this.markedTitle + markdown, { sanitize: true });
            return { __html: __html };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.writeError = function (errors) {
        if (!errors || errors.length === 0) {
            return null;
        }
        return React.createElement("ul", {"className": "new-question error-messages"}, errors.map(function (error) {
            return React.createElement("li", {"className": "error-message"}, error);
        }));
    };
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
    Component.prototype.detectTabClass = function (isPreview) {
        return isPreview === this.state.preview ? 'tabnav-tab selected' : 'tabnav-tab';
    };
    Component.prototype.writeCommentArea = function () {
        var _this = this;
        var errors = this.props.errors;
        var className = this.isPreview
            ? 'new-question entry-area hidden'
            : 'new-question entry-area';
        return React.createElement("section", {"className": className}, React.createElement("section", {"className": "new-question title-area"}, React.createElement("input", {"type": "text", "name": "title", "placeholder": "タイトルを入力", "value": this.state.title, "onChange": function (e) { return _this.setState({ title: e.target.value }); }})), this.writeError(errors.title), React.createElement("section", {"className": "new-question comment-area"}, React.createElement("textarea", {"name": "comment", "ref": "editor", "placeholder": "質問内容をここに入力", "value": this.state.markdown, "onChange": function (e) { return _this.setState({ markdown: e.target.value }); }})), this.writeError(errors.markdown));
    };
    Component.prototype.writePreviewArea = function () {
        if (!this.isPreview) {
            return null;
        }
        if (this.state.markdown === '') {
            return React.createElement("section", {"className": 'new-question preview-area'}, React.createElement("p", {"className": "new-question blank-comment"}, "コメントが入力されていません"));
        }
        return React.createElement("section", {"className": 'new-question preview-area'}, React.createElement("section", {"dangerouslySetInnerHTML": this.marked}));
    };
    Component.prototype.isAssigned = function (userLogin) {
        return _.includes(this.state.assigned, userLogin);
    };
    Component.prototype.assignUser = function (userLogin) {
        var now = this.state.assigned.concat();
        if (_.includes(now, userLogin)) {
            _.remove(now, userLogin);
        }
        else {
            now.push(userLogin);
        }
        this.setState({ assigned: now });
    };
    Component.prototype.writeAssigner = function () {
        var _this = this;
        var _a = this.props, user = _a.user, team = _a.team;
        return React.createElement("section", {"className": "new-question team-members"}, React.createElement("section", {"className": "new-question team-member-list"}, team.users.map(function (_a) {
            var login = _a.login, name = _a.name;
            return React.createElement("label", {"className": "new-question team-member", "key": login}, React.createElement("span", {"className": "input-input"}, React.createElement("input", {"type": "checkbox", "name": "assign", "checked": _this.isAssigned(login), "onChange": function () { return _this.assignUser(login); }})), React.createElement("span", {"className": "input-label"}, name));
        })));
    };
    Component.prototype.render = function () {
        var _this = this;
        if (this.props.state === State.Success) {
            return React.createElement("article", {"className": "new-question body"}, React.createElement("section", {"className": "new-question registered-body"}, React.createElement("p", {"className": "new-question registered-message"}, "投稿完了しました")));
        }
        return React.createElement("article", {"className": "new-question body"}, React.createElement("section", {"className": "new-question box-body"}, React.createElement("h1", {"className": "new-question log-in-title"}, "質問する"), React.createElement("div", {"className": "columns"}, React.createElement("section", {"className": "new-question editor-area"}, React.createElement("section", {"className": "new-question tabs tabnav"}, React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": this.detectTabClass(false), "onClick": function () { return _this.setState({ preview: false }); }}, React.createElement(fa_1.default, {"icon": "pencil"}), "コメントを書く"), React.createElement("a", {"className": this.detectTabClass(true), "onClick": function () { return _this.setState({ preview: true }); }}, React.createElement(fa_1.default, {"icon": "file-text-o"}), "プレビュー"))), React.createElement("div", {"className": "inner form"}, this.writeCommentArea(), this.writePreviewArea(), React.createElement("section", {"className": "new-question submit-section"}, this.writeSubmit()))), React.createElement("section", {"className": "new-question assigning-area"}, React.createElement("section", {"className": "new-question tabs tabnav"}, React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": "tabnav-tab selected"}, React.createElement(fa_1.default, {"icon": "hand-o-right"}), "回答をおねがいする"))), this.writeAssigner()))));
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