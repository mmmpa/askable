var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('../eventer');
var state_1 = require('../models/state');
var error_message_1 = require('./error-message');
var InputForm = (function (_super) {
    __extends(InputForm, _super);
    function InputForm(props) {
        _super.call(this, props);
        this.state = {
            value: this.props.initialValue
        };
    }
    Object.defineProperty(InputForm.prototype, "className", {
        get: function () {
            var _a = this.props, className = _a.className, state = _a.state;
            return className + (state === state_1.State.Submitting ? ' sending' : ' ready');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputForm.prototype, "label", {
        get: function () {
            var label = this.props.label;
            if (!label) {
                return null;
            }
            return React.createElement("label", null, label);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputForm.prototype, "error", {
        get: function () {
            var _a = this.props, errors = _a.errors, name = _a.name;
            return React.createElement(error_message_1.default, React.__spread({}, { errors: errors, name: name }));
        },
        enumerable: true,
        configurable: true
    });
    InputForm.prototype.render = function () {
        var _a = this.props, type = _a.type, name = _a.name, placeholder = _a.placeholder, value = _a.value, onChange = _a.onChange, errors = _a.errors;
        var state = !!errors && !!errors[name] ? 'has-error' : 'calm';
        return React.createElement("div", {"className": "input-form"}, this.label, React.createElement("input", React.__spread({"className": state}, { type: type, name: name, placeholder: placeholder, value: value, onChange: function (e) { return onChange(e.target.value); } })), this.error);
    };
    return InputForm;
})(eventer_1.Node);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InputForm;
//# sourceMappingURL=input-form.js.map