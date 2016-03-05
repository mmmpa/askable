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
        location.reload();
    };
    Object.defineProperty(Context.prototype, "questionId", {
        get: function () {
            return this.props.questionId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.submit = function () {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.FinishQuestion, { questionId: this.questionId })
            .then(function () {
            _this.setState({ state: State.Success });
            _this.succeed();
        })
            .catch(function (_a) {
            var errors = _a.errors;
            _this.setState({ errors: errors, state: State.Fail });
            _this.succeed();
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('submit', function () {
            _this.submit();
        });
    };
    Context.prototype.initialState = function (props) {
        return {};
    };
    return Context;
})(eventer_1.Root);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
    }
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
                return React.createElement("button", {"className": "new-question submit", "onClick": function () { return _this.dispatch('submit'); }}, React.createElement(fa_1.default, {"icon": "hand-paper-o"}), "質問を終了する");
        }
    };
    Component.prototype.render = function () {
        if (this.props.state === State.Success) {
            return React.createElement("article", {"className": "finish body"}, React.createElement("section", {"className": "finish registered-body"}, React.createElement("p", {"className": "finish registered-message"}, "送信完了しました")));
        }
        return React.createElement("article", {"className": "finish body"}, React.createElement("section", {"className": "finish submit-area"}, this.writeSubmit()));
    };
    return Component;
})(eventer_1.Node);
var QuestionFinisher = (function () {
    function QuestionFinisher() {
    }
    QuestionFinisher.start = function (dom, _a) {
        var closed = _a.closed, questionId = _a.questionId;
        if (!dom) {
            return;
        }
        if (closed) {
            dom.parentNode.removeChild(dom);
            return;
        }
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionId: questionId })), dom);
    };
    return QuestionFinisher;
})();
window.QuestionFinisher = QuestionFinisher;
//# sourceMappingURL=index.js.map