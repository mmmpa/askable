var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
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
    Context.prototype.succeed = function (questionId) {
        document.location = this.props.questionPage.replace(':questionId', questionId);
    };
    Object.defineProperty(Context.prototype, "groupId", {
        get: function () {
            return this.props.groupId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.setBase = function (params) {
        params.groupId = this.groupId;
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setBase(params);
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.CreateQuestion, params)
            .then(function (_a) {
            var id = _a.id;
            _this.succeed(id);
        })
            .catch(function (_a) {
            var errors = _a.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
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
    Component.prototype.render = function () {
        var _this = this;
        var state = this.props.state;
        var _a = this.props, errors = _a.errors, user = _a.user, group = _a.group;
        return React.createElement("article", {"className": "new-question body"}, React.createElement("section", {"className": "new-question box-body"}, React.createElement("div", {"className": "columns"}, React.createElement("section", {"className": "new-question editor-area"}, React.createElement(comment_editor_1.default, React.__spread({}, { errors: errors }, {"onChange": function (state) { return _this.setState(state); }})), React.createElement("div", {"className": "inner form"}, React.createElement("section", {"className": "new-question submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "plus-circle", text: "この内容で質問する", className: 'submit',
            onClick: function () { return _this.dispatch('submit', _this.params); }
        }))))), React.createElement("section", {"className": "new-question assigning-area"}, React.createElement(assigner_1.default, React.__spread({}, { errors: errors, user: user, group: group }, {"onChange": function (state) { return _this.setState(state); }}))))));
    };
    return Component;
})(eventer_1.Node);
var NewQuestion = (function () {
    function NewQuestion() {
    }
    NewQuestion.start = function (dom) {
        var questionPage = dom.getAttribute('data-questionPage');
        var groupId = dom.getAttribute('data-groupId');
        var user = new user_1.default(JSON.parse(dom.getAttribute('data-user')));
        var group = new group_1.default(JSON.parse(dom.getAttribute('data-group')));
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionPage: questionPage, user: user, group: group, groupId: groupId }), React.createElement(Component, null)), dom);
    };
    return NewQuestion;
})();
window.NewQuestion = NewQuestion;
//# sourceMappingURL=index.js.map