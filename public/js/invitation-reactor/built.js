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
    Context.prototype.succeed = function () {
        location.reload();
    };
    Object.defineProperty(Context.prototype, "invitationId", {
        get: function () {
            return this.props.invitationId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.setBase = function (params) {
        params.invitationId = this.invitationId;
        return params;
    };
    Context.prototype.submit = function (api) {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(api, this.setBase({}))
            .then(function (result) {
            _this.succeed();
            _this.setState({ result: result, errors: {}, state: State.Success });
        })
            .catch(function (result) {
            var errors = result.errors;
            _this.setState({ errors: errors, state: State.Fail });
        });
    };
    Context.prototype.listen = function (to) {
        var _this = this;
        to('submitAccept', function () {
            _this.submit(strike_api_1.Api.AcceptInvitation);
        });
        to('submitReject', function () {
            _this.submit(strike_api_1.Api.RejectInvitation);
        });
        to('submitBlock', function () {
            _this.submit(strike_api_1.Api.BlockInvitation);
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
            name: '',
            login: '',
            email: '',
            password: ''
        };
    }
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var _a = this.state, name = _a.name, login = _a.login, email = _a.email, password = _a.password;
            return { name: name, login: login, email: email, password: password };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.setStateHelper = function (key, value) {
        var hash = {};
        hash[key] = value;
        this.setState(hash);
    };
    Component.prototype.writeInput = function (type, name, placeholder) {
        var _this = this;
        var errors = this.writeError(name);
        var state = !!this.writeError(name) ? 'has-error' : 'calm';
        return React.createElement("div", {"className": "input"}, React.createElement("input", React.__spread({"className": state}, { type: type, name: name, placeholder: placeholder }, {"value": this.state[name], "onChange": function (e) { _this.setStateHelper(name, e.target.value); }})), errors);
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
    Component.prototype.writeAccept = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "thumbs-o-up", "animation": "pulse"}), "参加する");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "submit", "onClick": function () { return _this.dispatch('submitAccept'); }}, React.createElement(fa_1.default, {"icon": "thumbs-o-up"}), "参加する");
        }
    };
    Component.prototype.writeReject = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "trash", "animation": "pulse"}), "ことわる");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "reject", "onClick": function () { return _this.dispatch('submitReject'); }}, React.createElement(fa_1.default, {"icon": "trash"}), "ことわる");
        }
    };
    Component.prototype.writeBlock = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "ban", "animation": "pulse"}), "ブロック");
            case State.Success:
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "block", "onClick": function () { return _this.dispatch('submitBlock'); }}, React.createElement(fa_1.default, {"icon": "ban"}), "ブロック");
        }
    };
    Component.prototype.writeForm = function () {
        return React.createElement("section", {"className": "reactor body"}, this.writeAccept(), this.writeReject(), this.writeBlock());
    };
    Component.prototype.writeResult = function () {
        var _a = this.props.result || {}, name = _a.name, login = _a.login, email = _a.email;
        return React.createElement("section", {"className": "reactor body"}, React.createElement("p", {"className": "rector message"}, "送信完了しました"));
    };
    Component.prototype.render = function () {
        switch (this.props.state) {
            case State.Success:
                return this.writeResult();
            case State.Submitting:
            case State.Waiting:
            case State.Fail:
            default:
                return this.writeForm();
        }
    };
    return Component;
})(eventer_1.Node);
var InvitationReactor = (function () {
    function InvitationReactor() {
    }
    InvitationReactor.start = function (doms) {
        _.each(doms, function (dom) {
            var invitationId = dom.getAttribute('data-id');
            ReactDOM.render(React.createElement(Context, React.__spread({}, { invitationId: invitationId }), React.createElement(Component, null)), dom);
        });
    };
    return InvitationReactor;
})();
window.InvitationReactor = InvitationReactor;

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
        return React.createElement("div", null, children.map(function (child) { return React.cloneElement(child || React.createElement("div", null, "blank"), props); }));
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
(function (OldApi) {
    OldApi[OldApi["CreateUser"] = 0] = "CreateUser";
    OldApi[OldApi["createQuestion"] = 1] = "createQuestion";
    OldApi[OldApi["LogIn"] = 2] = "LogIn";
    OldApi[OldApi["AnswerQuestion"] = 3] = "AnswerQuestion";
    OldApi[OldApi["AssignUserQuestion"] = 4] = "AssignUserQuestion";
    OldApi[OldApi["WaitAnswerQuestion"] = 5] = "WaitAnswerQuestion";
    OldApi[OldApi["SorryQuestion"] = 6] = "SorryQuestion";
    OldApi[OldApi["ReplyToReply"] = 7] = "ReplyToReply";
    OldApi[OldApi["LogOut"] = 8] = "LogOut";
    OldApi[OldApi["FinishQuestion"] = 9] = "FinishQuestion";
    OldApi[OldApi["AcceptInvitation"] = 10] = "AcceptInvitation";
    OldApi[OldApi["RejectInvitation"] = 11] = "RejectInvitation";
    OldApi[OldApi["BlockInvitation"] = 12] = "BlockInvitation";
    OldApi[OldApi["Invite"] = 13] = "Invite";
    OldApi[OldApi["DisposeGroup"] = 14] = "DisposeGroup";
    OldApi[OldApi["CreateGroup"] = 15] = "CreateGroup";
    OldApi[OldApi["UpdateUser"] = 16] = "UpdateUser";
    OldApi[OldApi["DestroyUser"] = 17] = "DestroyUser";
    OldApi[OldApi["ChangePassword"] = 18] = "ChangePassword";
})(exports.OldApi || (exports.OldApi = {}));
var OldApi = exports.OldApi;
var Method;
(function (Method) {
    Method[Method["Get"] = 0] = "Get";
    Method[Method["Post"] = 1] = "Post";
    Method[Method["Patch"] = 2] = "Patch";
    Method[Method["Put"] = 3] = "Put";
    Method[Method["Delete"] = 4] = "Delete";
})(Method || (Method = {}));
var Uri = {
    createUser: '/welcome/new',
    logIn: '/in',
    logOut: '/out',
    createQuestion: '/g/:groupId/me/q/new',
    answerQuestion: '/g/:groupId/q/:questionId/answer',
    assignUserQuestion: '/g/:groupId/q/:questionId/assign',
    waitAnswerQuestion: '/g/:groupId/q/:questionId/wait',
    sorryQuestion: '/g/:groupId/q/:questionId/sorry',
    replyToReply: '/g/:groupId/q/:questionId/a/:commentId/res',
    finishQuestion: '/g/:groupId/q/:questionId/finish',
    acceptInvitation: '/i/:invitationId/accept',
    rejectInvitation: '/i/:invitationId/reject',
    blockInvitation: '/i/:invitationId/block',
    invite: '/g/:groupId/invitation',
    disposeGroup: '/g/:groupId',
    createGroup: '/g/new',
    updateUser: '/me',
    destroyUser: '/me',
    changePassword: '/me/password'
};
exports.Api = {
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
function strikeApi(api, params) {
    return new Promise(function (resolve, reject) {
        addJob(api, params, resolve, reject);
    });
}
exports.strikeApi = strikeApi;
function addJob(api, params, resolve, reject) {
    jobs = jobs.then(function () {
        return new Promise(function (queueResolve, _) {
            detectFunction(api)(params, resolve, reject, queueResolve);
        });
    });
}
function detectFunction(api) {
    switch (api) {
        case exports.Api.CreateUser:
            return createUser;
        case exports.Api.createQuestion:
            return createQuestion;
        case exports.Api.LogIn:
            return logIn;
        case exports.Api.AnswerQuestion:
            return answerQuestion;
        case exports.Api.AssignUserQuestion:
            return assignUserQuestion;
        case exports.Api.WaitAnswerQuestion:
            return waitAnswerQuestion;
        case exports.Api.SorryQuestion:
            return sorryQuestion;
        case exports.Api.ReplyToReply:
            return replyToReply;
        case exports.Api.LogOut:
            return logOut;
        case exports.Api.FinishQuestion:
            return finishQuestion;
        case exports.Api.AcceptInvitation:
            return acceptInvitation;
        case exports.Api.RejectInvitation:
            return rejectInvitation;
        case exports.Api.BlockInvitation:
            return blockInvitation;
        case exports.Api.Invite:
            return invite;
        case exports.Api.DisposeGroup:
            return disposeGroup;
        case exports.Api.CreateGroup:
            return createGroup;
        case exports.Api.UpdateUser:
            return updateUser;
        case exports.Api.DestroyUser:
            return destroyUser;
        case exports.Api.ChangePassword:
            return changePassword;
        default:
            throw 'Api not exist';
    }
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
function normalize(uri, params) {
    var questionId = params.questionId;
    delete params.questionId;
    var groupId = params.groupId;
    delete params.groupId;
    var commentId = params.commentId;
    delete params.commentId;
    var invitationId = params.invitationId;
    delete params.invitationId;
    var normalized = uri
        .replace(':invitationId', invitationId)
        .replace(':questionId', questionId)
        .replace(':commentId', commentId)
        .replace(':groupId', groupId);
    return { params: params, normalized: normalized };
}
function logOut(params, resolve, reject, queueResolve) {
    request
        .delete(Uri.logOut)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function common(api, params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, api.uri, api.method, api.params(params));
}
function createUser(params, resolve, reject, queueResolve) {
    request
        .post(Uri.createUser)
        .send({ users: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function updateUser(params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, Uri.updateUser, Method.Patch, { users: params });
}
function destroyUser(params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, Uri.destroyUser, Method.Delete);
}
function changePassword(params, resolve, reject, queueResolve) {
    build(resolve, reject, queueResolve, Uri.changePassword, Method.Patch, { users: params });
}
function invite(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.invite, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ invitations: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function disposeGroup(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.disposeGroup, params), normalized = _a.normalized, params = _a.params;
    request
        .delete(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function createGroup(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.createGroup, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ groups: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function acceptInvitation(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.acceptInvitation, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function blockInvitation(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.blockInvitation, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function rejectInvitation(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.rejectInvitation, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function createQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.createQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function finishQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.finishQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function answerQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.answerQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function replyToReply(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.replyToReply, params), normalized = _a.normalized, params = _a.params;
    request
        .post(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function assignUserQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.assignUserQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function sorryQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.sorryQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function waitAnswerQuestion(params, resolve, reject, queueResolve) {
    var _a = normalize(Uri.waitAnswerQuestion, params), normalized = _a.normalized, params = _a.params;
    request
        .patch(normalized)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function logIn(params, resolve, reject, queueResolve) {
    request
        .post(Uri.logIn)
        .send({ user_sessions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
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
