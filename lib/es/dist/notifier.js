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
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
/******/ })
/************************************************************************/
/******/ ({

/***/ 54:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notifier = function () {
  function Notifier() {
    _classCallCheck(this, Notifier);
  }

  _createClass(Notifier, null, [{
    key: 'risingClass',
    value: function risingClass(type) {
      return 'body notifier ' + type + ' rising';
    }
  }, {
    key: 'fadingClass',
    value: function fadingClass(type) {
      return 'body notifier ' + type + ' rising fading';
    }
  }, {
    key: 'createStore',
    value: function createStore(type, message) {
      var _this = this;

      setTimeout(function () {
        _this.create(type, message);
      }, 1000);
    }
  }, {
    key: 'create',
    value: function create(type, message) {
      var _this2 = this;

      var doc = document;
      var div = doc.createElement('div');
      var p = document.createElement('p');

      div.setAttribute('class', 'body notifier ' + type);
      p.innerText = message;

      div.appendChild(p);
      doc.getElementsByTagName('body')[0].appendChild(div);
      setTimeout(function () {
        div.setAttribute('class', _this2.risingClass(type));
        setTimeout(function () {
          div.setAttribute('class', _this2.fadingClass(type));
          setTimeout(function () {
            div.parentNode.removeChild(div);
          }, 200);
        }, 3000);
      }, 1);
    }
  }, {
    key: 'alert',
    value: function alert(message) {
      this.createStore('alert', message);
    }
  }, {
    key: 'notify',
    value: function notify(message) {
      this.createStore('notify', message);
    }
  }]);

  return Notifier;
}();

exports.default = Notifier;


window.Notifier = Notifier;

/***/ }

/******/ });