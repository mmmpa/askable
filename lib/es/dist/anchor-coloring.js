/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "javascripts";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ({

/***/ 29:
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnchorColoring = function () {
  function AnchorColoring(anchors) {
    var _this = this;

    _classCallCheck(this, AnchorColoring);

    this.doc = document;
    this.anchoredColor = "#f2f9fc";
    this.selectedColor = "#fff9ea";
    this.clearColor = "#fff";
    this.colored = [];

    this.initialize();

    anchors.forEach(function (anchor) {
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

  _createClass(AnchorColoring, [{
    key: "reload",
    value: function reload(e) {
      var _this2 = this;

      setTimeout(function () {
        return _this2.initialize();
      }, 1);
    }
  }, {
    key: "color",
    value: function color(target, _color) {
      var push = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      target.style.backgroundColor = _color;
      if (push) {
        this.colored.push(target);
      }
    }
  }, {
    key: "getTarget",
    value: function getTarget(locationHash) {
      return this.doc.querySelectorAll(locationHash + ' .response-comment')[0];
    }
  }, {
    key: "clear",
    value: function clear(target) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (target === this.anchored) {
        this.color(target, this.anchoredColor, false);
        return false;
      }
      target.style.backgroundColor = this.clearColor;
      if (remove) {
        _.remove(this.colored, target);
      }
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      var target = void 0;
      while (target = this.colored.shift()) {
        this.clear(target, false);
      }
      this.colored.push(this.anchored);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      if (!location.hash) {
        return;
      }
      this.clearAll();
      var target = this.getTarget(location.hash);
      this.anchored = target;
      this.color(target, this.anchoredColor);
      this.clearAll();
    }
  }], [{
    key: "anchor",
    value: function anchor(anchors) {
      new AnchorColoring(anchors);
    }
  }]);

  return AnchorColoring;
}();

exports.default = AnchorColoring;


window.AnchorColoring = AnchorColoring;

/***/ }

/******/ });