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
    Object.defineProperty(Context.prototype, "questionId", {
        get: function () {
            return this.props.questionId;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.submit = function () {
        var _this = this;
        this.setState({ state: State.Submitting });
        strike_api_1.strikeApi(strike_api_1.Api.FinishQuestion, { questionId: this.questionId })
            .then(function () {
            _this.setState({ state: State.Success });
            _this.succeed();
        })
            .catch(function (_a) {
            var errors = _a.errors;
            _this.setState({ errors: errors, state: State.Fail });
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
})(eventer_1.Root);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
    }
    Component.prototype.writeSubmit = function () {
        var _this = this;
        switch (this.props.state) {
            case State.Submitting:
                return React.createElement("button", {"className": "new-question sending", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "送信中");
            case State.Success:
                return null;
            case State.Waiting:
            case State.Fail:
            default:
                return React.createElement("button", {"className": "new-question submit", "onClick": function () { return _this.dispatch('submit'); }}, React.createElement(fa_1.default, {"icon": "hand-paper-o"}), "質問を終了する");
        }
    };
    Component.prototype.render = function () {
        if (this.props.state === State.Success) {
            return React.createElement("article", {"className": "finish body"}, React.createElement("section", {"className": "finish registered-body"}, React.createElement("p", {"className": "finish registered-message"}, "送信完了しました")));
        }
        return React.createElement("article", {"className": "finish body"}, React.createElement("section", {"className": "finish submit-area"}, this.writeSubmit()));
    };
    return Component;
})(eventer_1.Node);
var QuestionFinisher = (function () {
    function QuestionFinisher() {
    }
    QuestionFinisher.start = function (dom, _a) {
        var closed = _a.closed, questionId = _a.questionId;
        if (!dom) {
            return;
        }
        if (closed) {
            dom.parentNode.removeChild(dom);
            return;
        }
        ReactDOM.render(React.createElement(Context, React.__spread({}, { questionId: questionId }), React.createElement(Component, null)), dom);
    };
    return QuestionFinisher;
})();
window.QuestionFinisher = QuestionFinisher;

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
        return React.cloneElement(this.props.children || React.createElement("div", null, "blank"), props);
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
var Uri = {
    createUser: '/welcome/new',
    createQuestion: '/users/me/q/new',
    logIn: '/in',
    logOut: '/out',
    answerQuestion: '/q/:questionId/answer',
    assignUserQuestion: '/q/:questionId/assign',
    waitAnswerQuestion: '/q/:questionId/wait',
    sorryQuestion: '/q/:questionId/sorry',
    replyToReply: '/q/:questionId/a/:commentId/res',
    finishQuestion: '/q/:questionId/finish'
};
(function (Api) {
    Api[Api["CreateUser"] = 0] = "CreateUser";
    Api[Api["createQuestion"] = 1] = "createQuestion";
    Api[Api["LogIn"] = 2] = "LogIn";
    Api[Api["AnswerQuestion"] = 3] = "AnswerQuestion";
    Api[Api["AssignUserQuestion"] = 4] = "AssignUserQuestion";
    Api[Api["WaitAnswerQuestion"] = 5] = "WaitAnswerQuestion";
    Api[Api["SorryQuestion"] = 6] = "SorryQuestion";
    Api[Api["ReplyToReply"] = 7] = "ReplyToReply";
    Api[Api["LogOut"] = 8] = "LogOut";
    Api[Api["FinishQuestion"] = 9] = "FinishQuestion";
})(exports.Api || (exports.Api = {}));
var Api = exports.Api;
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
        case Api.CreateUser:
            return createUser;
        case Api.createQuestion:
            return createQuestion;
        case Api.LogIn:
            return logIn;
        case Api.AnswerQuestion:
            return answerQuestion;
        case Api.AssignUserQuestion:
            return assignUserQuestion;
        case Api.WaitAnswerQuestion:
            return waitAnswerQuestion;
        case Api.SorryQuestion:
            return sorryQuestion;
        case Api.ReplyToReply:
            return replyToReply;
        case Api.LogOut:
            return logOut;
        case Api.FinishQuestion:
            return finishQuestion;
        default:
            throw 'Api not exist';
    }
}
function finalize(resolve, reject, queueResolve) {
    return function (err, res) {
        if (!!err) {
            if (!res.body || !res.body.errors) {
                console.log(err);
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
function logOut(params, resolve, reject, queueResolve) {
    request
        .delete(Uri.logOut)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function createUser(params, resolve, reject, queueResolve) {
    request
        .post(Uri.createUser)
        .send({ users: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function createQuestion(params, resolve, reject, queueResolve) {
    request
        .post(Uri.createQuestion)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function finishQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.finishQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function answerQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.answerQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function replyToReply(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    var commentId = params.commentId;
    delete params.questionId;
    delete params.targetId;
    var uri = Uri.replyToReply
        .replace(':questionId', questionId)
        .replace(':commentId', commentId);
    request
        .post(uri)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function assignUserQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.assignUserQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function sorryQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.sorryQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .set('X-CSRF-Token', token())
        .end(finalize(resolve, reject, queueResolve));
}
function waitAnswerQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.waitAnswerQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
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