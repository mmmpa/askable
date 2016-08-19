"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var parcel_1 = require('../parcel');
var state_1 = require('../models/state');
var fa_1 = require('../fa');
var SubmitButton = (function (_super) {
    __extends(SubmitButton, _super);
    function SubmitButton() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SubmitButton.prototype, "className", {
        get: function () {
            var _a = this.props, className = _a.className, state = _a.state;
            return className + (state === state_1.State.Submitting ? ' sending' : ' ready');
        },
        enumerable: true,
        configurable: true
    });
    SubmitButton.prototype.render = function () {
        var _a = this.props, text = _a.text, onClick = _a.onClick, icon = _a.icon, state = _a.state, disabled = _a.disabled;
        var className = this.className;
        switch (state) {
            case state_1.State.Submitting:
                return React.createElement("button", {className: this.className, disabled: true}, React.createElement(fa_1.default, {icon: icon, animation: "pulse"}), text);
            case state_1.State.Success:
            case state_1.State.Waiting:
            case state_1.State.Fail:
            default:
                return React.createElement("button", __assign({}, { className: className, disabled: disabled, onClick: onClick }), React.createElement(fa_1.default, {icon: icon}), text);
        }
    };
    return SubmitButton;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubmitButton;
//# sourceMappingURL=submit-button.js.map