var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
var submit_button_1 = require('./lib/components/submit-button');
var input_form_1 = require('./lib/components/input-form');
var error_message_1 = require('./lib/components/error-message');
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Context.prototype, "groupId", {
        get: function () {
            return this.props.groupId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.setBase = function (params) {
        params.groupId = this.groupId;
        return params;
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.Invite, this.setBase(params))
            .then(function (result) {
            _this.setState({ result: result, errors: {}, state: state_1.State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
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
            state: state_1.State.Waiting
        };
    };
    return Context;
})(eventer_1.Root);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
        this.state = {
            login: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            return { login: this.state.login };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.componentWillUpdate = function (props) {
        if (this.props.state !== state_1.State.Success && props.state === state_1.State.Success) {
            this.setState({ login: '' });
        }
    };
    Component.prototype.writeResult = function () {
        switch (this.props.state) {
            case state_1.State.Success:
                return React.createElement("div", {"className": "invitation message-area"}, React.createElement("p", {"className": "com success-message"}, "招待しました"));
            case state_1.State.Submitting:
                return React.createElement("div", {"className": "invitation message-area"});
            case state_1.State.Waiting:
                return null;
            case state_1.State.Fail:
            default:
                var errors = this.props.errors;
                var name_1 = 'any';
                return React.createElement("div", {"className": "invitation message-area"}, React.createElement(error_message_1.default, React.__spread({}, { errors: errors, name: name_1 })));
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        var login = this.state.login;
        var state = this.props.state;
        return React.createElement("section", {"className": "invitation body"}, React.createElement("div", {"className": "invitation input-area"}, React.createElement("section", {"className": "invitation login-area"}, React.createElement(input_form_1.default, React.__spread({}, {
            type: 'text', name: 'login', placeholder: '対象ユーザーのログインId', value: login,
            onChange: function (v) { return _this.setState({ login: v }); }
        }))), React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "thumbs-o-up", text: "招待する", className: 'submit',
            onClick: function () { return _this.dispatch('submit', _this.params); }
        })), this.writeResult()));
    };
    return Component;
})(eventer_1.Node);
var InvitationCreator = (function () {
    function InvitationCreator() {
    }
    InvitationCreator.start = function (dom) {
        if (!dom) {
            return;
        }
        var groupId = dom.getAttribute('data-id');
        ReactDOM.render(React.createElement(Context, React.__spread({}, { groupId: groupId }), React.createElement(Component, null)), dom);
    };
    return InvitationCreator;
})();
window.InvitationCreator = InvitationCreator;
//# sourceMappingURL=index.js.map