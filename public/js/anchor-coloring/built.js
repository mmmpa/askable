(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AnchorColoring = (function () {
    function AnchorColoring(anchors) {
        var _this = this;
        this.doc = document;
        this.anchoredColor = "#f2f9fc";
        this.selectedColor = "#fff9ea";
        this.clearColor = "#fff";
        this.colored = [];
        this.initialize();
        _.each(anchors, function (anchor) {
            var targetId = anchor.getAttribute('data-targetId');
            var idSelector = "#comment-" + targetId;
            var target = _this.getTarget(idSelector);
            anchor.addEventListener('click', function (e) {
                location.href = idSelector;
                _this.reload();
            });
            anchor.addEventListener('mouseover', function (e) {
                _this.color(target, _this.selectedColor);
            });
            anchor.addEventListener('mouseout', function (e) {
                _this.clear(target);
            });
        });
    }
    AnchorColoring.prototype.reload = function (e) {
        var _this = this;
        setTimeout(function () {
            return _this.initialize();
        }, 1);
    };
    AnchorColoring.prototype.color = function (target, color, push) {
        if (push === void 0) { push = true; }
        target.style.backgroundColor = color;
        if (push) {
            this.colored.push(target);
        }
    };
    AnchorColoring.prototype.getTarget = function (locationHash) {
        return this.doc.querySelectorAll(locationHash + ' .response-comment')[0];
    };
    AnchorColoring.prototype.clear = function (target, remove) {
        if (remove === void 0) { remove = true; }
        if (target === this.anchored) {
            this.color(target, this.anchoredColor, false);
            return false;
        }
        target.style.backgroundColor = this.clearColor;
        if (remove) {
            _.remove(this.colored, target);
        }
    };
    AnchorColoring.prototype.clearAll = function () {
        var target;
        while (target = this.colored.shift()) {
            this.clear(target, false);
        }
        this.colored.push(this.anchored);
    };
    AnchorColoring.prototype.initialize = function () {
        if (!location.hash) {
            return;
        }
        this.clearAll();
        var target = this.getTarget(location.hash);
        this.anchored = target;
        this.color(target, this.anchoredColor);
        this.clearAll();
    };
    AnchorColoring.anchor = function (anchors) {
        new AnchorColoring(anchors);
    };
    return AnchorColoring;
})();
window.AnchorColoring = AnchorColoring;

},{}]},{},[1]);
