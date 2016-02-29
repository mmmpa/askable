var jobs = Promise.resolve();
var Uri = {
    createUser: '/welcome/new',
    createQuestion: '/users/me/q/new',
    logIn: '/in',
    answerQuestion: '/q/:questionId/answer',
    assignUserQuestion: '/q/:questionId/assign',
    waitAnswerQuestion: '/q/:questionId/wait',
    sorryQuestion: '/q/:questionId/sorry'
};
(function (Api) {
    Api[Api["CreateUser"] = 0] = "CreateUser";
    Api[Api["createQuestion"] = 1] = "createQuestion";
    Api[Api["LogIn"] = 2] = "LogIn";
    Api[Api["AnswerQuestion"] = 3] = "AnswerQuestion";
    Api[Api["AssignUserQuestion"] = 4] = "AssignUserQuestion";
    Api[Api["WaitAnswerQuestion"] = 5] = "WaitAnswerQuestion";
    Api[Api["SorryQuestion"] = 6] = "SorryQuestion";
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
        default:
            throw 'Api not exist';
    }
}
function createUser(params, resolve, reject, queueResolve) {
    request
        .post(Uri.createUser)
        .send({ users: params })
        .set('X-CSRF-Token', token())
        .end(function (err, res) {
        if (!!err) {
            reject(res.body);
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    });
}
function createQuestion(params, resolve, reject, queueResolve) {
    request
        .post(Uri.createQuestion)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(function (err, res) {
        if (!!err) {
            reject(res.body);
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    });
}
function answerQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.answerQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(function (err, res) {
        if (!!err) {
            reject(res.body);
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    });
}
function assignUserQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.assignUserQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .send({ questions: params })
        .set('X-CSRF-Token', token())
        .end(function (err, res) {
        if (!!err) {
            reject(res.body);
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    });
}
function sorryQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.sorryQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .set('X-CSRF-Token', token())
        .end(function (err, res) {
        if (!!err) {
            reject(res.body);
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    });
}
function waitAnswerQuestion(params, resolve, reject, queueResolve) {
    var questionId = params.questionId;
    delete params.questionId;
    var uri = Uri.waitAnswerQuestion.replace(':questionId', questionId);
    request
        .patch(uri)
        .set('X-CSRF-Token', token())
        .end(function (err, res) {
        if (!!err) {
            reject(res.body);
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    });
}
function logIn(params, resolve, reject, queueResolve) {
    request
        .post(Uri.logIn)
        .send({ user_sessions: params })
        .set('X-CSRF-Token', token())
        .end(function (err, res) {
        if (!!err) {
            reject(res.body);
        }
        else {
            resolve(res.body);
        }
        queueResolve();
    });
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