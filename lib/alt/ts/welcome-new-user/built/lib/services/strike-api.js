var promise = Promise.resolve();
var Uri = {
    createUser: ''
};
(function (Api) {
    Api[Api["CreateUser"] = 0] = "CreateUser";
})(exports.Api || (exports.Api = {}));
var Api = exports.Api;
function strikeApi(api, params) {
    return new Promise(function (resolve, reject) {
        detectFunction(api)(params, resolve, reject);
    });
}
exports.strikeApi = strikeApi;
function detectFunction(api) {
    switch (api) {
        case Api.CreateUser:
            return createUser;
        default:
            throw 'Api not exist';
    }
}
function createUser(params, resolve, reject) {
    console.log('request');
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
    });
}
function token() {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
}
exports.token = token;
//# sourceMappingURL=strike-api.js.map