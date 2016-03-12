(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('./lib/eventer');
var fa_1 = require('./lib/fa');
var strike_api_1 = require('./lib/services/strike-api');
var State;
(function (State) {
    State[State["Waiting"] = 0] = "Waiting";
    State[State["Submitting"] = 1] = "Submitting";
    State[State["Fail"] = 2] = "Fail";
    State[State["Success"] = 3] = "Success";
})(State || (State = {}));
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Context.prototype, "groupId", {
        get: function () {
            return this.props.groupId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.setBase = function (params) {
        params.groupId = this.groupId;
        return params;
    };
    Context.prototype.submit = function (params) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.Invite, this.setBase(params))
            .then(function (result) {
            _this.setState({ result: result, errors: {}, state: State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('submit', function (params) {
            _this.submit(params);
        });
    };
    Context.prototype.initialState = function (props) {
        return {
            state: 'ready'
        };
    };
    return Context;
})(eventer_1.Root);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        _super.call(this, props);
        this.state = {
            login: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            return { login: this.state.login };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.componentWillUpdate = function (props) {
        if (this.props.state !== State.Success && props.state === State.Success) {
            this.setState({ login: '' });
        }
    };
    Component.prototype.writeError = function (name) {
        if (!this.props.errors) {
            return null;
        }
        var errors = this.props.errors[name];
        if (!errors) {
            return null;
        }
        return React.createElement("ul", {"className": "error-messages"}, errors.map(function (error) { return React.createElement("li", {"className": "error-message"}, error); }));
    };
    Component.prototype.writeSubmit = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "thumbs-o-up", "animation": "pulse"}), "招待する");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "submit", "onClick": function () { return _this.dispatch('submit', _this.params); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "招待する");
        }
    };
    Component.prototype.writeResult = function () {
        switch (this.props.state) {
            case State.Success:
                return React.createElement("p", {"className": "invitation success"}, "招待しました");
            case State.Submitting:
                return React.createElement("p", {"className": "invitation success"}, " ");
            case State.Waiting:
                return null;
            case State.Fail:
            default:
                return this.writeError('any');
        }
    };
    Component.prototype.render = function () {
        var _this = this;
        var login = this.state.login;
        return React.createElement("section", {"className": "invitation body"}, React.createElement("div", {"className": "invitation input-area"}, React.createElement("section", {"className": "invitation login-area"}, React.createElement("input", {"type": "text", "value": login, "placeholder": "対象ユーザーのログインId", "onChange": function (e) { return _this.setState({ login: e.target.value }); }})), this.writeSubmit()), this.writeResult());
    };
    return Component;
})(eventer_1.Node);
var InvitationCreator = (function () {
    function InvitationCreator() {
    }
    InvitationCreator.start = function (dom) {
        if (!dom) {
            return;
        }
        var groupId = dom.getAttribute('data-id');
        ReactDOM.render(React.createElement(Context, React.__spread({}, { groupId: groupId }), React.createElement(Component, null)), dom);
    };
    return InvitationCreator;
})();
window.InvitationCreator = InvitationCreator;

},{"./lib/eventer":2,"./lib/fa":3,"./lib/services/strike-api":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fa = (function (_super) {
    __extends(Fa, _super);
    function Fa() {
        _super.apply(this, arguments);
    }
    Fa.prototype.render = function () {
        var p = this.props;
        var classes = ['fa'];
        classes.push("fa-" + p.icon);
        p.scale && classes.push("fa-" + p.scale + "x");
        (p.fixedWidth === undefined || p.fixedWidth === true) && classes.push('fa-fw');
        p.list && classes.push('fa-li');
        p.border && classes.push('fa-border');
        p.pull && classes.push("fa-pull-" + p.pull);
        p.animation && classes.push("fa-" + p.animation);
        p.rotate && classes.push("fa-rotate-" + p.rotate);
        p.flip && classes.push("fa-flip-" + p.flip);
        return React.createElement("i", {"className": classes.join(' ')});
    };
    return Fa;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fa;

},{}],4:[function(require,module,exports){
var jobs = Promise.resolve();
var Method;
(function (Method) {
    Method[Method["Get"] = 0] = "Get";
    Method[Method["Post"] = 1] = "Post";
    Method[Method["Patch"] = 2] = "Patch";
    Method[Method["Put"] = 3] = "Put";
    Method[Method["Delete"] = 4] = "Delete";
})(Method || (Method = {}));
exports.Api = {
    Invite: {
        uri: '/g/:groupId/invitation',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    DisposeGroup: {
        uri: '/g/:groupId',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    CreateGroup: {
        uri: '/g/new',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    AcceptInvitation: {
        uri: '/i/:invitationId/accept',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    RejectInvitation: {
        uri: '/i/:invitationId/reject',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    BlockInvitation: {
        uri: '/i/:invitationId/block',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    CreateQuestion: {
        uri: '/g/:groupId/me/q/new',
        method: Method.Post,
        params: function (p) { return ({ questions: p }); }
    },
    AnswerQuestion: {
        uri: '/g/:groupId/q/:questionId/answer',
        method: Method.Patch,
        params: function (p) { return ({ questions: p }); }
    },
    AssignUserQuestion: {
        uri: '/g/:groupId/q/:questionId/assign',
        method: Method.Patch,
        params: function (p) { return ({ questions: p }); }
    },
    WaitAnswerQuestion: {
        uri: '/g/:groupId/q/:questionId/wait',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    SorryQuestion: {
        uri: '/g/:groupId/q/:questionId/sorry',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    ReplyToReply: {
        uri: '/g/:groupId/q/:questionId/a/:commentId/res',
        method: Method.Post,
        params: function (p) { return ({ questions: p }); }
    },
    FinishQuestion: {
        uri: '/g/:groupId/q/:questionId/finish',
        method: Method.Patch,
        params: function (p) { return ({}); }
    },
    LogIn: {
        uri: '/in',
        method: Method.Post,
        params: function (p) { return ({ user_sessions: p }); }
    },
    LogOut: {
        uri: '/out',
        method: Method.Delete,
        params: function (p) { return ({}); }
    },
    CreateUser: {
        uri: '/welcome/new',
        method: Method.Post,
        params: function (p) { return ({ users: p }); }
    },
    UpdateUser: {
        uri: '/me',
        method: Method.Patch,
        params: function (p) { return ({ users: p }); }
    },
    DestroyUser: {
        uri: '/me',
        method: Method.Delete,
        params: function (p) { return ({}); }
    },
    ChangePassword: {
        uri: '/me/password',
        method: Method.Patch,
        params: function (p) {
            p.password_now = p.passwordNow;
            delete p.passwordNow;
            return { users: p };
        }
    }
};
function strike(api, params) {
    return new Promise(function (resolve, reject) {
        add(api, params, resolve, reject);
    });
}
exports.strike = strike;
function add(api, params, resolve, reject) {
    jobs = jobs.then(function () {
        return new Promise(function (queueResolve, _) {
            common(api, params, resolve, reject, queueResolve);
        });
    });
}
function common(api, params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, api.uri, api.method, api.params(params));
}
function build(resolve, reject, queueResolve, uri, method, params) {
    if (params === void 0) { params = {}; }
    if (uri.indexOf(':') !== -1) {
        var _a = normalize(uri, params), normalized = _a.normalized, trimmed = _a.trimmed;
    }
    base(normalized || uri, method)
        .send(trimmed || params)
        .end(finalize(resolve, reject, queueResolve));
}
function base(uri, method) {
    var r = methodEnchantedRequest(request, uri, method);
    return method === Method.Get
        ? r
        : r.set('X-CSRF-Token', token());
}
function methodEnchantedRequest(request, uri, method) {
    switch (method) {
        case Method.Get:
            return request.get(uri);
        case Method.Post:
            return request.post(uri);
        case Method.Patch:
            return request.patch(uri);
        case Method.Put:
            return request.put(uri);
        case Method.Delete:
            return request.delete(uri);
    }
}
function finalize(resolve, reject, queueResolve) {
    return function (err, res) {
        if (!!err) {
            if (!res.body || !res.body.errors) {
                reject({ errors: { unknown: [err] } });
            }
            else {
                reject(res.body);
            }
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    };
}
function normalize(uri, trimmed) {
    var questionId = trimmed.questionId;
    delete trimmed.questionId;
    var groupId = trimmed.groupId;
    delete trimmed.groupId;
    var commentId = trimmed.commentId;
    delete trimmed.commentId;
    var invitationId = trimmed.invitationId;
    delete trimmed.invitationId;
    var normalized = uri
        .replace(':invitationId', invitationId)
        .replace(':questionId', questionId)
        .replace(':commentId', commentId)
        .replace(':groupId', groupId);
    return { trimmed: trimmed, normalized: normalized };
}
function token() {
    try {
        return document.getElementsByName('csrf-token')[0].getAttribute('content');
    }
    catch (ex) {
        return '';
    }
}

},{}]},{},[1]);
