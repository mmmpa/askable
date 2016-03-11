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
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.Invite, this.setBase(params))
            .then(function (result) {
            _this.setState({ result: result, errors: {}, state: State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
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
        if (this.props.state !== State.Success && props.state === State.Success) {
            this.setState({ login: '' });
        }
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
    Component.prototype.writeSubmit = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "thumbs-o-up", "animation": "pulse"}), "招待する");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "submit", "onClick": function () { return _this.dispatch('submit', _this.params); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "招待する");
        }
    };
    Component.prototype.writeResult = function () {
        switch (this.props.state) {
            case State.Success:
                return React.createElement("p", {"className": "invitation success"}, "招待しました");
            case State.Submitting:
                return React.createElement("p", {"className": "invitation success"}, " ");
            case State.Waiting:
                return null;
            case State.Fail:
            default:
                return this.writeError('any');
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        var login = this.state.login;
        return React.createElement("section", {"className": "invitation body"}, React.createElement("div", {"className": "invitation input-area"}, React.createElement("section", {"className": "invitation login-area"}, React.createElement("input", {"type": "text", "value": login, "placeholder": "対象ユーザーのログインId", "onChange": function (e) { return _this.setState({ login: e.target.value }); }})), this.writeSubmit()), this.writeResult());
    };
    return Component;
})(eventer_1.Node);
var InvitationCreator = (function () {
    function InvitationCreator() {
    }
    InvitationCreator.start = function (dom) {
        var groupId = dom.getAttribute('data-id');
        ReactDOM.render(React.createElement(Context, React.__spread({}, { groupId: groupId }), React.createElement(Component, null)), dom);
    };
    return InvitationCreator;
})();
window.InvitationCreator = InvitationCreator;
//# sourceMappingURL=index.js.map