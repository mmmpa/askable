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
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.DisposeGroup, this.setBase({}))
            .then(function (result) {
            _this.succeed();
        })
            .catch(function (result) {
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
            name: ''
        };
    }
    Object.defineProperty(Component.prototype, "text", {
        get: function () {
            return this.props.isOwner ? '解散' : '脱退';
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.render = function () {
        var _this = this;
        var name = this.state.name;
        var state = this.props.state;
        return React.createElement("section", {"className": "disposer body"}, React.createElement("div", {"className": "disposer input-area"}, React.createElement("section", {"className": "disposer login-area"}, React.createElement("input", {"type": "text", "value": name, "placeholder": "グループの名前を入力", "onChange": function (e) { return _this.setState({ name: e.target.value }); }})), React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "trash", text: this.text + 'する', className: 'dispose',
            disabled: this.props.groupName !== name,
            onClick: function () { return _this.dispatch('submit'); }
        }))));
    };
    return Component;
})(eventer_1.Node);
var GroupDisposer = (function () {
    function GroupDisposer() {
    }
    GroupDisposer.start = function (dom) {
        if (!dom) {
            return;
        }
        var groupId = dom.getAttribute('data-id');
        var groupName = dom.getAttribute('data-name');
        var isOwner = dom.getAttribute('data-owner') === 'true';
        ReactDOM.render(React.createElement(Context, React.__spread({}, { groupId: groupId, groupName: groupName, isOwner: isOwner }), React.createElement(Component, null)), dom);
    };
    return GroupDisposer;
})();
window.GroupDisposer = GroupDisposer;
//# sourceMappingURL=index.js.map