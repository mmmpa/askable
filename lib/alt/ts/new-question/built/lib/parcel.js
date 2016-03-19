var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventingShared = {
    emitter: React.PropTypes.any
};
var Good = (function (_super) {
    __extends(Good, _super);
    function Good() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Good, "contextTypes", {
        get: function () {
            return EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    Good.prototype.dispatch = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.context.emitter).emit.apply(_a, [event].concat(args));
        var _a;
    };
    return Good;
})(React.Component);
exports.Good = Good;
var Parcel = (function (_super) {
    __extends(Parcel, _super);
    function Parcel(props) {
        _super.call(this, props);
        this.addedOnStore = [];
        this.state = this.initialState(props);
    }
    Object.defineProperty(Parcel, "childContextTypes", {
        get: function () {
            return EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    Parcel.prototype.componentWillUnmount = function () {
        var _this = this;
        this.addedOnStore.map(function (_a) {
            var eventName = _a.eventName, callback = _a.callback;
            _this.emitter.removeListener(eventName, callback);
            return eventName;
        });
    };
    Parcel.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.emitter) {
            this.emitter = this.context.emitter || new EventEmitter();
            this.listen(function (eventName, callback) {
                _this.addedOnStore.push({ eventName: eventName, callback: callback });
                _this.emitter.on(eventName, callback);
            });
        }
    };
    Parcel.prototype.getChildContext = function () {
        return { emitter: this.context.emitter || this.emitter };
    };
    Parcel.prototype.render = function () {
        var props = _.assign({}, this.props, this.state);
        delete props.children;
        var children = this.props.children;
        var elements = !!children.map ? children : [children];
        return React.createElement("div", {"className": "context-wrapper"}, elements.map(function (child, i) { return React.cloneElement(child, _.assign(props, { key: i })); }));
    };
    return Parcel;
})(Good);
exports.Parcel = Parcel;
//# sourceMappingURL=parcel.js.map