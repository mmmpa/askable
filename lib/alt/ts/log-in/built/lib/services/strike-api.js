var jobs = Promise.resolve();
var Uri = {
    createUser: '/welcome/new',
    createQuestion: '',
    logIn: '/in'
};
(function (Api) {
    Api[Api["CreateUser"] = 0] = "CreateUser";
    Api[Api["createQuestion"] = 1] = "createQuestion";
    Api[Api["LogIn"] = 2] = "LogIn";
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
        .post(Uri.createUser)
        .send({ questions: {
            title: params.title,
            comment: { markdown: params.markdown },
            assigned: params.assigned
        } })
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