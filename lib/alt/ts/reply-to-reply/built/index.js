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
    Context.prototype.children = function (props) {
        return React.createElement(Component, React.__spread({}, props));
    };
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
    Context.prototype.submit = function (params) {
        var _this = this;
        params.commentId = this.commentId;
        params.questionId = this.questionId;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.ReplyToReply, params)
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
    ReplyToReply.opener = function (doms, questionId) {
        _.each(doms, function (dom) {
            var commentId = dom.getAttribute('data-id');
            dom.addEventListener('click', function (e) {
                ReactDOM.render(React.createElement(Context, React.__spread({}, { commentId: commentId, questionId: questionId })), e.target.parentNode);
            });
        });
    };
    return ReplyToReply;
})();
var AnchorColoring = (function () {
    function AnchorColoring(anchors) {
        var _this = this;
        this.doc = document;
        this.selectedColor = "#fff9ea";
        this.clearColor = "#fff";
        this.colored = [];
        this.initialize();
        _.each(anchors, function (anchor) {
            var targetId = anchor.getAttribute('data-targetId');
            var idSelector = "#comment-" + targetId;
            var target = document.querySelector(idSelector);
            anchor.addEventListener('click', function (e) {
                location.href = idSelector;
                _this.reload();
            });
            anchor.addEventListener('mouseover', function (e) {
                _this.color(target);
            });
            anchor.addEventListener('mouseout', function (e) {
                _this.clear(target);
            });
        });
    }
    AnchorColoring.prototype.reload = function (e) {
        this.initialize();
    };
    AnchorColoring.prototype.color = function (target) {
        target.style.backgroundColor = this.selectedColor;
        this.colored.push(target);
    };
    AnchorColoring.prototype.clear = function (target, remove) {
        if (remove === void 0) { remove = true; }
        if (target === this.anchored) {
            return false;
        }
        target.style.backgroundColor = this.clearColor;
        if (remove) {
            _.remove(this.colored, target);
        }
    };
    AnchorColoring.prototype.clearAll = function () {
        var target;
        while (target = this.colored.shift()) {
            console.log(target);
            this.clear(target, false);
        }
    };
    AnchorColoring.prototype.initialize = function () {
        var _this = this;
        var target = this.doc.querySelector(location.hash);
        this.anchored = target;
        this.color(target);
        setTimeout(function () { return _this.clearAll(); }, 1);
    };
    AnchorColoring.anchor = function (anchors) {
        new AnchorColoring(anchors);
    };
    return AnchorColoring;
})();
window.ReplyToReply = ReplyToReply;
window.AnchorColoring = AnchorColoring;
//# sourceMappingURL=index.js.map