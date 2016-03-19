var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require('../parcel');
var ErrorMessage = (function (_super) {
    __extends(ErrorMessage, _super);
    function ErrorMessage() {
        _super.apply(this, arguments);
    }
    ErrorMessage.prototype.wrap = function (errors) {
        switch (true) {
            case _.isArray(errors):
                return errors;
            case !errors:
                return [];
            default:
                return [errors];
        }
    };
    ErrorMessage.prototype.render = function () {
        var _a = this.props, errors = _a.errors, name = _a.name;
        if (!errors) {
            return null;
        }
        var myErrors = this.wrap(errors[name]);
        if (myErrors.length === 0) {
            return null;
        }
        return React.createElement("ul", {"className": "error-messages"}, myErrors.map(function (error, i) { return React.createElement("li", {"className": "error-message", "key": i}, error); }));
    };
    return ErrorMessage;
})(parcel_1.Good);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorMessage;
//# sourceMappingURL=error-message.js.map