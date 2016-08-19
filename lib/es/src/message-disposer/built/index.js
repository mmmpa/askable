var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require('./lib/parcel');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
var submit_button_1 = require('./lib/components/submit-button');
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Context.prototype, "messageId", {
        get: function () {
            return this.props.messageId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.succeed = function () {
        location.href = '/m/index';
    };
    Context.prototype.setBase = function (params) {
        params.messageId = this.messageId;
        return params;
    };
    Context.prototype.submit = function () {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.DisposeMessage, this.setBase({}))
            .then(function () {
            _this.succeed();
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('dispose', function () {
            _this.submit();
        });
    };
    Context.prototype.initialState = function (props) {
        return {
            state: state_1.State.Waiting
        };
    };
    return Context;
})(parcel_1.Parcel);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
    }
    Component.prototype.render = function () {
        var _this = this;
        var state = this.props.state;
        return React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "ban", text: "メッセージを削除する", className: 'dispose',
            onClick: function () { return _this.dispatch('dispose'); }
        }));
    };
    return Component;
})(parcel_1.Good);
var MessageDisposer = (function () {
    function MessageDisposer() {
    }
    MessageDisposer.start = function (dom) {
        if (!dom) {
            return;
        }
        var messageId = dom.getAttribute('data-id');
        ReactDOM.render(React.createElement(Context, React.__spread({}, { messageId: messageId }), React.createElement(Component, null)), dom);
    };
    return MessageDisposer;
})();
window.MessageDisposer = MessageDisposer;
//# sourceMappingURL=index.js.map