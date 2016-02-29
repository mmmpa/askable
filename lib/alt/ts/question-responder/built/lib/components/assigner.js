var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('../eventer');
var fa_1 = require('../fa');
var Assigner = (function (_super) {
    __extends(Assigner, _super);
    function Assigner(props) {
        _super.call(this, props);
        this.state = {
            assigned: []
        };
    }
    Assigner.prototype.isAssigned = function (userLogin) {
        return _.includes(this.state.assigned, userLogin);
    };
    Assigner.prototype.isStateChanged = function (state) {
        return this.state.assigned.join(',') !== state.assigned.join(',');
    };
    Assigner.prototype.componentDidUpdate = function (props, state) {
        if (this.isStateChanged(state)) {
            this.props.onChange(this.state);
        }
    };
    Assigner.prototype.assignUser = function (userLogin) {
        var now = this.state.assigned.concat();
        if (_.includes(now, userLogin)) {
            _.remove(now, userLogin);
        }
        else {
            now.push(userLogin);
        }
        this.setState({ assigned: now });
    };
    Assigner.prototype.writeAssigner = function () {
        var _this = this;
        var _a = this.props, user = _a.user, team = _a.team;
        return React.createElement("section", {"className": "assigner team-members"}, React.createElement("section", {"className": "assigner team-member-list"}, team.users.map(function (_a) {
            var login = _a.login, name = _a.name;
            return React.createElement("label", {"className": "assigner team-member", "key": login}, React.createElement("span", {"className": "input-input"}, React.createElement("input", {"type": "checkbox", "name": "assign", "checked": _this.isAssigned(login), "onChange": function () { return _this.assignUser(login); }})), React.createElement("span", {"className": "input-label"}, name));
        })));
    };
    Assigner.prototype.render = function () {
        return React.createElement("article", {"className": "assigner body"}, React.createElement("section", {"className": "assigner tabs tabnav"}, React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": "tabnav-tab selected"}, React.createElement(fa_1.default, {"icon": "hand-o-right"}), "回答をおねがいする"))), this.writeAssigner());
    };
    return Assigner;
})(eventer_1.Node);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Assigner;
//# sourceMappingURL=assigner.js.map