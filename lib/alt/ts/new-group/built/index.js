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
    Context.prototype.succeed = function (groupId) {
        location.href = '/g/' + groupId;
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.CreateGroup, params)
            .then(function (result) {
            _this.succeed(result.id);
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
            name: '',
            description: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var _a = this.state, name = _a.name, description = _a.description;
            return { name: name, description: description };
        },
        enumerable: true,
        configurable: true
    });
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
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "submit", "onClick": function () { return _this.dispatch('submit', _this.params); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "作成する");
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        var _a = this.state, name = _a.name, description = _a.description;
        return React.createElement("section", {"className": "new-group body"}, React.createElement("h1", {"className": "new-group registering-title"}, "グループを作成する"), React.createElement("section", {"className": "new-group registering-body"}, React.createElement("section", {"className": "new-group input-section"}, React.createElement("input", {"type": "text", "placeholder": "グループの名前", "value": name, "onChange": function (e) { return _this.setState({ name: e.target.value }); }}), this.writeError('name')), React.createElement("section", {"className": "new-group input-section"}, React.createElement("textarea", {"type": "text", "placeholder": "グループの概要", "value": description, "onChange": function (e) { return _this.setState({ description: e.target.value }); }}), this.writeError('description')), React.createElement("section", {"className": "new-group submit-section"}, this.writeSubmit())));
    };
    return Component;
})(eventer_1.Node);
var NewGroup = (function () {
    function NewGroup() {
    }
    NewGroup.start = function (dom) {
        if (!dom) {
            return;
        }
        ReactDOM.render(React.createElement(Context, null, React.createElement(Component, null)), dom);
    };
    return NewGroup;
})();
window.NewGroup = NewGroup;
//# sourceMappingURL=index.js.map