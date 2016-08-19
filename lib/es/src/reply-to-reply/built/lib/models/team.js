var user_1 = require("./user");
var Group = (function () {
    function Group(params) {
        this.name = '';
        this.users = [];
        this.name = params.name || '';
        this.users = params.users.map(function (user) { return new user_1.default(user); });
    }
    return Group;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Group;
//# sourceMappingURL=team.js.map