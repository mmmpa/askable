var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require('../parcel');
var ErrorMessages = (function (_super) {
    __extends(ErrorMessages, _super);
    function ErrorMessages() {
        _super.apply(this, arguments);
    }
    ErrorMessages.prototype.render = function () {
        var errors = this.props.errors[this.props.name];
        if (!errors || errors.length === 0) {
            return null;
        }
        return React.createElement("ul", {"className": "error-messages"}, errors.map(function (error) {
            return React.createElement("li", {"className": "error-message"}, error);
        }));
    };
    return ErrorMessages;
})(parcel_1.ComponentComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorMessages;
//# sourceMappingURL=error-messages.js.map