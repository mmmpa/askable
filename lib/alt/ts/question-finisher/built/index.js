var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
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
    Context.prototype.submit = function () {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.FinishQuestion, this.setBase({}))
            .then(function () {
            _this.succeed();
        })
            .catch(function (_a) {
            var errors = _a.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
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
    Component.prototype.render = function () {
        var _this = this;
        var state = this.props.state;
        return React.createElement("article", {"className": "finish body"}, React.createElement("section", {"className": "finish submit-area"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "thumbs-o-up", text: "質問を終了する", className: 'submit',
            onClick: function () { return _this.dispatch('submit'); }
        }))));
    };
    return Component;
})(eventer_1.Node);
var QuestionFinisher = (function () {
    function QuestionFinisher() {
    }
    QuestionFinisher.start = function (dom) {
        if (!dom) {
            return;
        }
        var questionId = dom.getAttribute('data-questionId');
        var groupId = dom.getAttribute('data-groupId');
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionId: questionId, groupId: groupId }), React.createElement(Component, null)), dom);
    };
    return QuestionFinisher;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionFinisher;
window.QuestionFinisher = QuestionFinisher;
//# sourceMappingURL=index.js.map