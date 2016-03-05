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
//# sourceMappingURL=strike-api.js.map