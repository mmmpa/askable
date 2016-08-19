var Notifier = (function () {
    function Notifier() {
    }
    Notifier.risingClass = function (type) {
        return "body notifier " + type + " rising";
    };
    Notifier.fadingClass = function (type) {
        return "body notifier " + type + " rising fading";
    };
    Notifier.createStore = function (type, message) {
        var _this = this;
        setTimeout(function () {
            _this.create(type, message);
        }, 1000);
    };
    Notifier.create = function (type, message) {
        var _this = this;
        var doc = document;
        var div = doc.createElement('div');
        var p = document.createElement('p');
        div.setAttribute('class', "body notifier " + type);
        p.innerText = message;
        div.appendChild(p);
        doc.getElementsByTagName('body')[0].appendChild(div);
        setTimeout(function () {
            div.setAttribute('class', _this.risingClass(type));
            setTimeout(function () {
                div.setAttribute('class', _this.fadingClass(type));
                setTimeout(function () {
                    div.parentNode.removeChild(div);
                }, 200);
            }, 3000);
        }, 1);
    };
    Notifier.alert = function (message) {
        this.createStore('alert', message);
    };
    Notifier.notify = function (message) {
        this.createStore('notify', message);
    };
    return Notifier;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Notifier;
window.Notifier = Notifier;
//# sourceMappingURL=index.js.map