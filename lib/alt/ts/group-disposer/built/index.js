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
    Context.prototype.succeed = function () {
        location.reload();
    };
    Context.prototype.setBase = function (params) {
        params.groupId = this.groupId;
        return params;
    };
    Context.prototype.submit = function () {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.DisposeGroup, this.setBase({}))
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
        to('submit', function () {
            _this.submit();
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
            name: ''
        };
    }
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
        if (this.props.groupName !== this.state.name) {
            return React.createElement("button", {"className": "dispose", "disabled": true}, React.createElement(fa_1.default, {"icon": "remove"}), "解散する");
        }
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "解散する");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "dispose", "onClick": function () { return _this.dispatch('submit'); }}, React.createElement(fa_1.default, {"icon": "remove"}), "解散する");
        }
    };
    Component.prototype.writeResult = function () {
        switch (this.props.state) {
            case State.Success:
                return React.createElement("p", {"className": "disposer success"}, "削除しました");
            case State.Submitting:
            case State.Waiting:
            case State.Fail:
            default:
                return null;
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        var login = this.state.login;
        return React.createElement("section", {"className": "disposer body"}, React.createElement("div", {"className": "disposer input-area"}, React.createElement("section", {"className": "disposer login-area"}, React.createElement("input", {"type": "text", "value": login, "placeholder": "グループの名前を入力", "onChange": function (e) { return _this.setState({ name: e.target.value }); }})), this.writeSubmit()), this.writeResult());
    };
    return Component;
})(eventer_1.Node);
var GroupDisposer = (function () {
    function GroupDisposer() {
    }
    GroupDisposer.start = function (dom) {
        var groupId = dom.getAttribute('data-id');
        var groupName = dom.getAttribute('data-name');
        ReactDOM.render(React.createElement(Context, React.__spread({}, { groupId: groupId, groupName: groupName }), React.createElement(Component, null)), dom);
    };
    return GroupDisposer;
})();
window.GroupDisposer = GroupDisposer;
//# sourceMappingURL=index.js.map