var strike_api_1 = require('./lib/services/strike-api');
var LogOut = (function () {
    function LogOut() {
    }
    LogOut.start = function (doms) {
        _.each(doms, function (dom) {
            dom.addEventListener('click', function (e) {
                e.preventDefault();
                strike_api_1.strike(strike_api_1.Api.LogOut, {})
                    .then(function () {
                    location.reload();
                })
                    .catch(function (_a) {
                    var errors = _a.errors;
                    console.log(errors);
                });
            });
        });
    };
    return LogOut;
})();
window.LogOut = LogOut;
//# sourceMappingURL=index.js.map