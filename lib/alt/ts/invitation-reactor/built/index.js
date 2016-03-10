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
    Context.prototype.succeed = function () {
        location.reload();
    };
    Object.defineProperty(Context.prototype, "invitationId", {
        get: function () {
            return this.props.invitationId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.setBase = function (params) {
        params.invitationId = this.invitationId;
        return params;
    };
    Context.prototype.submit = function (api) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(api, this.setBase({}))
            .then(function (result) {
            _this.succeed();
            _this.setState({ result: result, errors: {}, state: State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('submitAccept', function () {
            _this.submit(strike_api_1.Api.AcceptInvitation);
        });
        to('submitReject', function () {
            _this.submit(strike_api_1.Api.RejectInvitation);
        });
        to('submitBlock', function () {
            _this.submit(strike_api_1.Api.BlockInvitation);
        });
    };
    Context.prototype.initialState = function (props) {
        return {
            state: 'ready'
        };
    };
    return Context;
})(eventer_1.Root);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
        this.state = {
            name: '',
            login: '',
            email: '',
            password: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var _a = this.state, name = _a.name, login = _a.login, email = _a.email, password = _a.password;
            return { name: name, login: login, email: email, password: password };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.setStateHelper = function (key, value) {
        var hash = {};
        hash[key] = value;
        this.setState(hash);
    };
    Component.prototype.writeInput = function (type, name, placeholder) {
        var _this = this;
        var errors = this.writeError(name);
        var state = !!this.writeError(name) ? 'has-error' : 'calm';
        return React.createElement("div", {"className": "input"}, React.createElement("input", React.__spread({"className": state}, { type: type, name: name, placeholder: placeholder }, {"value": this.state[name], "onChange": function (e) { _this.setStateHelper(name, e.target.value); }})), errors);
    };
    Component.prototype.writeError = function (name) {
        if (!this.props.errors) {
            return null;
        }
        var errors = this.props.errors[name];
        if (!errors) {
            return null;
        }
        return React.createElement("ul", {"className": "error-messages"}, errors.map(function (error) { return React.createElement("li", {"className": "error-message"}, error); }));
    };
    Component.prototype.writeAccept = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "thumbs-o-up", "animation": "pulse"}), "参加する");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "submit", "onClick": function () { return _this.dispatch('submitAccept'); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "参加する");
        }
    };
    Component.prototype.writeReject = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "trash", "animation": "pulse"}), "ことわる");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "reject", "onClick": function () { return _this.dispatch('submitReject'); }}, React.createElement(fa_1.default, {"icon": "trash"}), "ことわる");
        }
    };
    Component.prototype.writeBlock = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "ban", "animation": "pulse"}), "ブロック");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "block", "onClick": function () { return _this.dispatch('submitBlock'); }}, React.createElement(fa_1.default, {"icon": "ban"}), "ブロック");
        }
    };
    Component.prototype.writeForm = function () {
        return React.createElement("section", {"className": "reactor body"}, this.writeAccept(), this.writeReject(), this.writeBlock());
    };
    Component.prototype.writeResult = function () {
        var _a = this.props.result || {}, name = _a.name, login = _a.login, email = _a.email;
        return React.createElement("section", {"className": "reactor body"}, React.createElement("p", {"className": "rector message"}, "送信完了しました"));
    };
    Component.prototype.render = function () {
        switch (this.props.state) {
            case State.Success:
                return this.writeResult();
            case State.Submitting:
            case State.Waiting:
            case State.Fail:
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
        _.each(doms, function (dom) {
            var invitationId = dom.getAttribute('data-id');
            ReactDOM.render(React.createElement(Context, React.__spread({}, { invitationId: invitationId }), React.createElement(Component, null)), dom);
        });
    };
    return InvitationReactor;
})();
window.InvitationReactor = InvitationReactor;
//# sourceMappingURL=index.js.map