var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventingShared = {
    emitter: React.PropTypes.any
};
var ComponentComponent = (function (_super) {
    __extends(ComponentComponent, _super);
    function ComponentComponent() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ComponentComponent, "contextTypes", {
        get: function () {
            return EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    ComponentComponent.prototype.dispatch = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.context.emitter).emit.apply(_a, [event].concat(args));
        var _a;
    };
    return ComponentComponent;
})(React.Component);
exports.ComponentComponent = ComponentComponent;
var ContextComponent = (function (_super) {
    __extends(ContextComponent, _super);
    function ContextComponent(props) {
        _super.call(this, props);
        this.addedOnStore = [];
        this.state = this.initialState(props);
    }
    Object.defineProperty(ContextComponent, "childContextTypes", {
        get: function () {
            return EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    ContextComponent.prototype.componentWillUnmount = function () {
        var _this = this;
        this.addedOnStore.map(function (_a) {
            var eventName = _a.eventName, callback = _a.callback;
            _this.emitter.removeListener(eventName, callback);
            return eventName;
        });
    };
    ContextComponent.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.emitter) {
            this.emitter = this.context.emitter || new EventEmitter();
            this.listen(function (eventName, callback) {
                _this.addedOnStore.push({ eventName: eventName, callback: callback });
                _this.emitter.on(eventName, callback);
            });
        }
    };
    ContextComponent.prototype.getChildContext = function () {
        return { emitter: this.context.emitter || this.emitter };
    };
    ContextComponent.prototype.render = function () {
        var props = _.assign({}, this.props, this.state);
        delete props.children;
        var children = this.props.children;
        var elements = !!children.map ? children : [children];
        return React.createElement("div", {"className": "context-wrapper"}, elements.map(function (child, i) { return React.cloneElement(child, _.assign(props, { key: i })); }));
    };
    return ContextComponent;
})(ComponentComponent);
exports.ContextComponent = ContextComponent;
//# sourceMappingURL=parcel.js.map