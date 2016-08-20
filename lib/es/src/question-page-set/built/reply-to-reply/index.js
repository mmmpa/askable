var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require('./lib/parcel');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
var comment_editor_1 = require('./lib/components/comment-editor');
var submit_button_1 = require('./lib/components/submit-button');
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Context.prototype.succeed = function () {
        location.reload();
    };
    Object.defineProperty(Context.prototype, "commentId", {
        get: function () {
            return this.props.commentId;
        },
        enumerable: true,
        configurable: true
    });
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
        params.commentId = this.commentId;
        return params;
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.ReplyToReply, this.setBase(params))
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
})(parcel_1.ContextComponent);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
        this.state = {
            markdown: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var markdown = this.state.markdown;
            return { markdown: markdown, commentId: null, questionId: null };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.writeResponder = function () {
        var _this = this;
        var _a = this.props, errors = _a.errors, state = _a.state;
        var markdown = this.state.markdown;
        return React.createElement("section", null, React.createElement(comment_editor_1.default, React.__spread({}, { errors: errors, markdown: markdown }, {"title": "not required", "onChange": function (state) { return _this.setState(state); }})), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "reply", text: "返信、または補足する", className: 'reply-to-reply submit',
            onClick: function () { return _this.dispatch('submit', _this.params); }
        }))));
    };
    Component.prototype.render = function () {
        return React.createElement("article", {"className": "reply-to-reply body"}, React.createElement("section", {"className": "reply-to-reply responder-area"}, this.writeResponder()));
    };
    return Component;
})(parcel_1.ComponentComponent);
var ReplyToReply = (function () {
    function ReplyToReply() {
    }
    ReplyToReply.opener = function (doms) {
        _.each(doms, function (dom) {
            var questionId = dom.getAttribute('data-questionId');
            var groupId = dom.getAttribute('data-groupId');
            var commentId = dom.getAttribute('data-commentId');
            dom.addEventListener('click', function (e) {
                ReactDOM.render(React.createElement(Context, React.__spread({}, { commentId: commentId, questionId: questionId, groupId: groupId }), React.createElement(Component, null)), e.target.parentNode);
            });
        });
    };
    return ReplyToReply;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReplyToReply;
window.ReplyToReply = ReplyToReply;
//# sourceMappingURL=index.js.map