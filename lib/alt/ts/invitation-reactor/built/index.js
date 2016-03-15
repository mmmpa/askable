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
    Object.defineProperty(Context.prototype, "invitationId", {
        get: function () {
            return this.props.invitationId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.succeed = function () {
        location.reload();
    };
    Context.prototype.setBase = function (params) {
        params.invitationId = this.invitationId;
        return params;
    };
    Context.prototype.submit = function (api) {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(api, this.setBase({}))
            .then(function () {
            var result = _this.resultMessage(api);
            location.reload();
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
        });
    };
    Context.prototype.resultMessage = function (api) {
        switch (api) {
            case strike_api_1.Api.AcceptInvitation:
                return '参加しました';
            case strike_api_1.Api.RejectInvitation:
                return 'ことわりました';
            case strike_api_1.Api.BlockInvitation:
                return 'ブロックしました';
        }
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('accept', function () {
            _this.submit(strike_api_1.Api.AcceptInvitation);
        });
        to('reject', function () {
            _this.submit(strike_api_1.Api.RejectInvitation);
        });
        to('block', function () {
            _this.submit(strike_api_1.Api.BlockInvitation);
        });
    };
    Context.prototype.initialState = function (props) {
        return {
            state: state_1.State.Waiting
        };
    };
    return Context;
})(eventer_1.Root);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
    }
    Component.prototype.writeForm = function () {
        var _this = this;
        var state = this.props.state;
        return React.createElement("section", {"className": "reactor body"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "thumbs-o-up", text: "参加する", className: 'submit',
            onClick: function () { return _this.dispatch('accept'); }
        })), React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "trash", text: "ことわる", className: 'reject',
            onClick: function () { return _this.dispatch('reject'); }
        })), React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "ban", text: "ブロック", className: 'block',
            onClick: function () { return _this.dispatch('block'); }
        })));
    };
    Component.prototype.writeResult = function () {
        return React.createElement("section", {"className": "reactor body"}, React.createElement("div", {"className": "com success-message reactor completed"}, this.props.result));
    };
    Component.prototype.render = function () {
        switch (this.props.state) {
            case state_1.State.Success:
                return this.writeResult();
            case state_1.State.Submitting:
            case state_1.State.Waiting:
            case state_1.State.Fail:
            default:
                return this.writeForm();
        }
    };
    return Component;
})(eventer_1.Node);
var InvitationReactor = (function () {
    function InvitationReactor() {
    }
    InvitationReactor.start = function (doms) {
        if (!doms) {
            return;
        }
        _.each(doms, function (dom) {
            var invitationId = dom.getAttribute('data-id');
            ReactDOM.render(React.createElement(Context, React.__spread({}, { invitationId: invitationId }), React.createElement(Component, null)), dom);
        });
    };
    return InvitationReactor;
})();
window.InvitationReactor = InvitationReactor;
//# sourceMappingURL=index.js.map