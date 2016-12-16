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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);


/***/ },

/***/ 9:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.strike = strike;
	var jobs = Promise.resolve();

	var Method = {
	  Get: 0,
	  Post: 1,
	  Patch: 2,
	  Put: 3,
	  Delete: 4
	};

	var methodStore = {};

	exports.default = methodStore;
	var Api = exports.Api = {
	  disposeMessage: {
	    uri: '/m/:messageId',
	    method: Method.Delete,
	    params: function params(p) {
	      return p;
	    }
	  },
	  invite: {
	    uri: '/g/:groupId/invitation',
	    method: Method.Post,
	    params: function params(p) {
	      return { invitations: p };
	    }
	  },
	  disposeGroup: {
	    uri: '/g/:groupId',
	    method: Method.Delete,
	    params: function params(p) {
	      return p;
	    }
	  },
	  createGroup: {
	    uri: '/g/new',
	    method: Method.Post,
	    params: function params(p) {
	      return { groups: p };
	    }
	  },
	  acceptInvitation: {
	    uri: '/i/:invitationId/accept',
	    method: Method.Patch,
	    params: function params(p) {
	      return p;
	    }
	  },
	  rejectInvitation: {
	    uri: '/i/:invitationId/reject',
	    method: Method.Patch,
	    params: function params(p) {
	      return p;
	    }
	  },
	  blockInvitation: {
	    uri: '/i/:invitationId/block',
	    method: Method.Patch,
	    params: function params(p) {
	      return p;
	    }
	  },
	  createQuestion: {
	    uri: '/g/:groupId/me/q/new',
	    method: Method.Post,
	    params: function params(p) {
	      return { questions: p };
	    }
	  },
	  answerQuestion: {
	    uri: '/g/:groupId/q/:questionId/answer',
	    method: Method.Patch,
	    params: function params(p) {
	      return { questions: p };
	    }
	  },
	  assignUserQuestion: {
	    uri: '/g/:groupId/q/:questionId/assign',
	    method: Method.Patch,
	    params: function params(p) {
	      return { questions: p };
	    }
	  },
	  waitAnswerQuestion: {
	    uri: '/g/:groupId/q/:questionId/wait',
	    method: Method.Patch,
	    params: function params(p) {
	      return {};
	    }
	  },
	  sorryQuestion: {
	    uri: '/g/:groupId/q/:questionId/sorry',
	    method: Method.Patch,
	    params: function params(p) {
	      return {};
	    }
	  },
	  replyToReply: {
	    uri: '/g/:groupId/q/:questionId/a/:commentId/res',
	    method: Method.Post,
	    params: function params(p) {
	      return { questions: p };
	    }
	  },
	  finishQuestion: {
	    uri: '/g/:groupId/q/:questionId/finish',
	    method: Method.Patch,
	    params: function params(p) {
	      return {};
	    }
	  },
	  logIn: {
	    uri: '/in',
	    method: Method.Post,
	    params: function params(p) {
	      return { user_sessions: p };
	    }
	  },
	  logOut: {
	    uri: '/out',
	    method: Method.Delete,
	    params: function params(p) {
	      return {};
	    }
	  },
	  createUser: {
	    uri: '/welcome/new',
	    method: Method.Post,
	    params: function params(p) {
	      return { users: p };
	    }
	  },
	  updateUser: {
	    uri: '/me',
	    method: Method.Patch,
	    params: function params(p) {
	      return { users: p };
	    }
	  },
	  destroyUser: {
	    uri: '/me',
	    method: Method.Delete,
	    params: function params(p) {
	      return {};
	    }
	  },
	  changePassword: {
	    uri: '/me/password',
	    method: Method.Patch,
	    params: function params(p) {
	      p.password_now = p.passwordNow;
	      delete p.passwordNow;
	      return { users: p };
	    }
	  }
	};

	(function () {
	  var _loop = function _loop(i) {
	    methodStore[i] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return strike.apply(undefined, [Api[i]].concat(args));
	    };
	  };

	  for (var i in Api) {
	    _loop(i);
	  }
	})();

	function strike(api, params) {
	  return new Promise(function (resolve, reject) {
	    add(api, params, resolve, reject);
	  });
	}

	function add(api, params, resolve, reject) {
	  jobs = jobs.then(function () {
	    return new Promise(function (queueResolve, _) {
	      common(api, params, resolve, reject, queueResolve);
	    });
	  });
	}

	function common(api, params, resolve, reject, queueResolve) {
	  var uri = api.uri;

	  if (uri.indexOf(':') !== -1) {
	    var _normalize = normalize(uri, params),
	        normalized = _normalize.normalized,
	        trimmed = _normalize.trimmed;
	  }

	  build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || params));
	}

	function build(resolve, reject, queueResolve, uri, method) {
	  var params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};


	  base(uri, method).send(params).end(finalize(resolve, reject, queueResolve));
	}

	function base(uri, method) {
	  var r = methodEnchantedRequest(request, uri, method);

	  return method === Method.Get ? r : r.set('X-CSRF-Token', token());
	}

	function methodEnchantedRequest(request, uri, method) {
	  switch (method) {
	    case Method.Get:
	      return request.get(uri);
	    case Method.Post:
	      return request.post(uri);
	    case Method.Patch:
	      return request.patch(uri);
	    case Method.Put:
	      return request.put(uri);
	    case Method.Delete:
	      return request.delete(uri);
	  }
	}

	function finalize(resolve, reject, queueResolve) {
	  return function (err, res) {
	    if (!!err) {
	      if (!res.body || !res.body.errors) {
	        reject({ errors: { unknown: [err] } });
	      } else {
	        reject(res.body);
	      }
	    } else {
	      resolve(res.body);
	    }
	    queueResolve();
	  };
	}

	function normalize(uri, trimmed) {
	  var questionId = trimmed.questionId;
	  delete trimmed.questionId;
	  var groupId = trimmed.groupId;
	  delete trimmed.groupId;
	  var commentId = trimmed.commentId;
	  delete trimmed.commentId;
	  var invitationId = trimmed.invitationId;
	  delete trimmed.invitationId;
	  var messageId = trimmed.messageId;
	  delete trimmed.messageId;
	  var normalized = uri.replace(':messageId', messageId).replace(':invitationId', invitationId).replace(':questionId', questionId).replace(':commentId', commentId).replace(':groupId', groupId);

	  return { trimmed: trimmed, normalized: normalized };
	}

	function token() {
	  try {
	    return document.getElementsByName('csrf-token')[0].getAttribute('content');
	  } catch (ex) {
	    return '';
	  }
	}

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _strikeApi = __webpack_require__(9);

	var _strikeApi2 = _interopRequireDefault(_strikeApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LogOut = function () {
	  function LogOut() {
	    _classCallCheck(this, LogOut);
	  }

	  _createClass(LogOut, null, [{
	    key: 'start',
	    value: function start(doms) {
	      doms.forEach(function (dom) {
	        dom.addEventListener('click', function (e) {
	          e.preventDefault();
	          _strikeApi2.default.logOut({}).then(function () {
	            location.reload();
	          }).catch(function (_ref) {
	            var errors = _ref.errors;

	            console.log(errors);
	          });
	        });
	      });
	    }
	  }]);

	  return LogOut;
	}();

	window.LogOut = LogOut;

/***/ }

/******/ });