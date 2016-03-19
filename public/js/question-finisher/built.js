(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require('./lib/parcel');
var strike_api_1 = require('./lib/services/strike-api');
var state_1 = require('./lib/models/state');
var submit_button_1 = require('./lib/components/submit-button');
var Context = (function (_super) {
    __extends(Context, _super);
    function Context() {
        _super.apply(this, arguments);
    }
    Context.prototype.succeed = function () {
        location.reload();
    };
    Object.defineProperty(Context.prototype, "questionId", {
        get: function () {
            return this.props.questionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "groupId", {
        get: function () {
            return this.props.groupId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.setBase = function (params) {
        params.groupId = this.groupId;
        params.questionId = this.questionId;
        return params;
    };
    Context.prototype.submit = function () {
        var _this = this;
        this.setState({ state: state_1.State.Submitting });
        strike_api_1.strike(strike_api_1.Api.FinishQuestion, this.setBase({}))
            .then(function () {
            _this.succeed();
        })
            .catch(function (_a) {
            var errors = _a.errors;
            _this.setState({ errors: errors, state: state_1.State.Fail });
            _this.succeed();
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('submit', function () {
            _this.submit();
        });
    };
    Context.prototype.initialState = function (props) {
        return {};
    };
    return Context;
})(parcel_1.Parcel);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
    }
    Component.prototype.render = function () {
        var _this = this;
        var state = this.props.state;
        return React.createElement("article", {"className": "finish body"}, React.createElement("section", {"className": "finish submit-area"}, React.createElement(submit_button_1.default, React.__spread({}, {
            state: state, icon: "thumbs-o-up", text: "質問を終了する", className: 'submit',
            onClick: function () { return _this.dispatch('submit'); }
        }))));
    };
    return Component;
})(parcel_1.Good);
var QuestionFinisher = (function () {
    function QuestionFinisher() {
    }
    QuestionFinisher.start = function (dom) {
        if (!dom) {
            return;
        }
        var questionId = dom.getAttribute('data-questionId');
        var groupId = dom.getAttribute('data-groupId');
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionId: questionId, groupId: groupId }), React.createElement(Component, null)), dom);
    };
    return QuestionFinisher;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionFinisher;
window.QuestionFinisher = QuestionFinisher;

},{"./lib/components/submit-button":2,"./lib/models/state":4,"./lib/parcel":5,"./lib/services/strike-api":6}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
                return React.createElement("button", {"className": this.className, "disabled": true}, React.createElement(fa_1.default, {"icon": icon, "animation": "pulse"}), text);
            case state_1.State.Success:
            case state_1.State.Waiting:
            case state_1.State.Fail:
            default:
                return React.createElement("button", React.__spread({}, { className: className, disabled: disabled, onClick: onClick }), React.createElement(fa_1.default, {"icon": icon}), text);
        }
    };
    return SubmitButton;
})(parcel_1.Good);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubmitButton;

},{"../fa":3,"../models/state":4,"../parcel":5}],3:[function(require,module,exports){
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
(function (State) {
    State[State["Waiting"] = 0] = "Waiting";
    State[State["Submitting"] = 1] = "Submitting";
    State[State["Fail"] = 2] = "Fail";
    State[State["Success"] = 3] = "Success";
})(exports.State || (exports.State = {}));
var State = exports.State;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
    DisposeMessage: {
        uri: '/m/:messageId',
        method: Method.Delete,
        params: function (p) { return p; }
    },
    Invite: {
        uri: '/g/:groupId/invitation',
        method: Method.Post,
        params: function (p) { return ({ invitations: p }); }
    },
    DisposeGroup: {
        uri: '/g/:groupId',
        method: Method.Delete,
        params: function (p) { return p; }
    },
    CreateGroup: {
        uri: '/g/new',
        method: Method.Post,
        params: function (p) { return ({ groups: p }); }
    },
    AcceptInvitation: {
        uri: '/i/:invitationId/accept',
        method: Method.Patch,
        params: function (p) { return p; }
    },
    RejectInvitation: {
        uri: '/i/:invitationId/reject',
        method: Method.Patch,
        params: function (p) { return p; }
    },
    BlockInvitation: {
        uri: '/i/:invitationId/block',
        method: Method.Patch,
        params: function (p) { return p; }
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
    var uri = api.uri;
    if (uri.indexOf(':') !== -1) {
        var _a = normalize(uri, params), normalized = _a.normalized, trimmed = _a.trimmed;
    }
    build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || params));
}
function build(resolve, reject, queueResolve, uri, method, params) {
    if (params === void 0) { params = {}; }
    base(uri, method)
        .send(params)
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
    var messageId = trimmed.messageId;
    delete trimmed.messageId;
    var normalized = uri
        .replace(':messageId', messageId)
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
