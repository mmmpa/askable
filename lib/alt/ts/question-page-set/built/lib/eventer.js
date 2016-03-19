var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
exports.EventingShared = {
    emitter: React.PropTypes.any
};
var Node = (function (_super) {
    __extends(Node, _super);
    function Node() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Node, "contextTypes", {
        get: function () {
            return exports.EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.dispatch = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.context.emitter).emit.apply(_a, [event].concat(args));
        var _a;
    };
    return Node;
})(React.Component);
exports.Node = Node;
var Root = (function (_super) {
    __extends(Root, _super);
    function Root(props) {
        _super.call(this, props);
        this.addedOnStore = [];
        this.state = this.initialState(props);
    }
    Object.defineProperty(Root, "childContextTypes", {
        get: function () {
            return exports.EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    Root.prototype.componentWillUnmount = function () {
        var _this = this;
        var disposed = this.addedOnStore.map(function (_a) {
            var eventName = _a.eventName, callback = _a.callback;
            _this.emitter.removeListener(eventName, callback);
            return eventName;
        });
    };
    Root.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.emitter) {
            this.emitter = this.context.emitter || new EventEmitter();
            this.listen(function (eventName, callback) {
                _this.addedOnStore.push({ eventName: eventName, callback: callback });
                _this.emitter.on(eventName, callback);
            });
        }
    };
    Root.prototype.getChildContext = function () {
        return { emitter: this.context.emitter || this.emitter };
    };
    Root.prototype.render = function () {
        var props = _.merge(_.clone(this.props), this.state);
        delete props.children;
        var children = this.props.children;
        if (!children.map) {
            children = [children];
        }
        return React.createElement("div", null, children.map(function (child, i) {
            props.key = i;
            return React.cloneElement(child || React.createElement("div", null, "blank"), props);
        }));
    };
    return Root;
})(Node);
exports.Root = Root;
//# sourceMappingURL=parcel.js.map