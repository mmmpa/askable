var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var strike_api_1 = require('./lib/services/strike-api');
var submit_button_1 = require('./lib/components/submit-button');
var input_form_1 = require('./lib/components/input-form');
var state_1 = require('./lib/models/state');
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
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.CreateGroup, params)
            .then(function (result) {
            _this.succeed(result.id);
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
    Component.prototype.writeInput = function (type, name, placeholder, errors) {
        var _this = this;
        return React.createElement("section", {"className": "com input-section"}, React.createElement(input_form_1.default, React.__spread({}, {
            errors: errors, type: type, name: name, placeholder: placeholder, value: this.state[name],
            onChange: function (v) {
                var p = {};
                p[name] = v;
                _this.setState(p);
            }
        })));
    };
    Component.prototype.render = function () {
        var _this = this;
        var _a = this.props, state = _a.state, errors = _a.errors;
        return React.createElement("article", {"className": "new-group body"}, React.createElement("div", {"className": "com border-box-container"}, React.createElement("h1", {"className": "com border-box-title-area"}, "グループを作成する"), React.createElement("section", {"className": "com form-area"}, this.writeInput('text', 'name', 'グループの名前', errors), this.writeInput('text', 'description', 'グループの概要', errors), React.createElement("section", {"className": "com submit-section"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "thumbs-o-up", text: "作成する", className: 'submit',
            onClick: function () { return _this.dispatch('submit', _this.params); }
        }))))));
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