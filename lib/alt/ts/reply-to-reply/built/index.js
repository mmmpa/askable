var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var fa_1 = require('./lib/fa');
var strike_api_1 = require('./lib/services/strike-api');
var comment_editor_1 = require('./lib/components/comment-editor');
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
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.ReplyToReply, this.setBase(params))
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
        var errors = this.props.errors;
        var markdown = this.state.markdown;
        return React.createElement("section", null, React.createElement(comment_editor_1.default, React.__spread({}, { errors: errors, markdown: markdown }, {"title": "not required", "onChange": function (state) { return _this.setState(state); }})), React.createElement("section", {"className": "reply-to-reply submit-section"}, this.writeSubmit()));
    };
    Component.prototype.writeSubmit = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "reply-to-reply sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "reply-to-reply submit", "onClick": function () { return _this.dispatch('submit', _this.params); }}, React.createElement(fa_1.default, {"icon": "hand-paper-o"}), "返信、もしくは補足する");
        }
    };
    Component.prototype.render = function () {
        if (this.props.state === State.Success) {
            return React.createElement("article", {"className": "reply-to-reply body"}, React.createElement("section", {"className": "reply-to-reply registered-body"}, React.createElement("p", {"className": "reply-to-reply registered-message"}, "投稿完了しました")));
        }
        return React.createElement("article", {"className": "reply-to-reply body"}, React.createElement("section", {"className": "reply-to-reply responder-area"}, this.writeResponder()));
    };
    return Component;
})(eventer_1.Node);
var ReplyToReply = (function () {
    function ReplyToReply() {
    }
    ReplyToReply.opener = function (doms, _a) {
        var closed = _a.closed, questionId = _a.questionId, groupId = _a.groupId;
        if (closed) {
            _.each(doms, function (dom) { return dom.parentNode.parentNode.removeChild(dom.parentNode); });
            return;
        }
        _.each(doms, function (dom) {
            var commentId = dom.getAttribute('data-id');
            dom.addEventListener('click', function (e) {
                ReactDOM.render(React.createElement(Context, React.__spread({}, { commentId: commentId, questionId: questionId, groupId: groupId }), React.createElement(Component, null)), e.target.parentNode);
            });
        });
    };
    return ReplyToReply;
})();
window.ReplyToReply = ReplyToReply;
//# sourceMappingURL=index.js.map