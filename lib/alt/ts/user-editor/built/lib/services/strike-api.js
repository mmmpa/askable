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
//# sourceMappingURL=strike-api.js.map