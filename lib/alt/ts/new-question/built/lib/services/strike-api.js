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
//# sourceMappingURL=strike-api.js.map