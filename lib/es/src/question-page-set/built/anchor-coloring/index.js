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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnchorColoring;
window.AnchorColoring = AnchorColoring;
//# sourceMappingURL=index.js.map