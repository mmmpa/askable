(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
