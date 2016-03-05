var user_1 = require("./user");
var Team = (function () {
    function Team(params) {
        this.name = '';
        this.users = [];
        this.name = params.name || '';
        this.users = params.users.map(function (user) { return new user_1.default(user); });
    }
    return Team;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Team;
//# sourceMappingURL=team.js.map