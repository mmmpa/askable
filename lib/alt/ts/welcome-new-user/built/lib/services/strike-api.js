var jobs = Promise.resolve();
var Uri = {
    createUser: '/welcome/new'
};
(function (Api) {
    Api[Api["CreateUser"] = 0] = "CreateUser";
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
function token() {
    try {
        return document.getElementsByName('csrf-token')[0].getAttribute('content');
    }
    catch (ex) {
        return '';
    }
}
//# sourceMappingURL=strike-api.js.map