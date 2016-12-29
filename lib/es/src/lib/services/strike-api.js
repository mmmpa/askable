const request = require('superagent');

let jobs = Promise.resolve();

const Method = {
  Get: 0,
  Post: 1,
  Patch: 2,
  Put: 3,
  Delete: 4,
};

const methodStore = {};

export default methodStore;

export const Api = {
  disposeMessage: {
    uri: '/m/:messageId',
    method: Method.Delete,
    params: p => p,
  },
  invite: {
    uri: '/g/:groupId/invitation',
    method: Method.Post,
    params: p => ({ invitations: p }),
  },
  disposeGroup: {
    uri: '/g/:groupId',
    method: Method.Delete,
    params: p => p,
  },
  createGroup: {
    uri: '/g/new',
    method: Method.Post,
    params: p => ({ groups: p }),
  },
  acceptInvitation: {
    uri: '/i/:invitationId/accept',
    method: Method.Patch,
    params: p => p,
  },
  rejectInvitation: {
    uri: '/i/:invitationId/reject',
    method: Method.Patch,
    params: p => p,
  },
  blockInvitation: {
    uri: '/i/:invitationId/block',
    method: Method.Patch,
    params: p => p,
  },
  createQuestion: {
    uri: '/g/:groupId/me/q/new',
    method: Method.Post,
    params: p => ({ questions: p }),
  },
  answerQuestion: {
    uri: '/g/:groupId/q/:questionId/answer',
    method: Method.Patch,
    params: p => ({ questions: p }),
  },
  assignUserQuestion: {
    uri: '/g/:groupId/q/:questionId/assign',
    method: Method.Patch,
    params: p => ({ questions: p }),
  },
  waitAnswerQuestion: {
    uri: '/g/:groupId/q/:questionId/wait',
    method: Method.Patch,
    params: () => ({}),
  },
  sorryQuestion: {
    uri: '/g/:groupId/q/:questionId/sorry',
    method: Method.Patch,
    params: () => ({}),
  },
  replyToReply: {
    uri: '/g/:groupId/q/:questionId/a/:commentId/res',
    method: Method.Post,
    params: p => ({ questions: p }),
  },
  finishQuestion: {
    uri: '/g/:groupId/q/:questionId/finish',
    method: Method.Patch,
    params: () => ({}),
  },
  logIn: {
    uri: '/in',
    method: Method.Post,
    params: p => ({ user_sessions: p }),
  },
  logOut: {
    uri: '/out',
    method: Method.Delete,
    params: () => ({}),
  },
  createUser: {
    uri: '/welcome/new',
    method: Method.Post,
    params: p => ({ users: p }),
  },
  updateUser: {
    uri: '/me',
    method: Method.Patch,
    params: p => ({ users: p }),
  },
  destroyUser: {
    uri: '/me',
    method: Method.Delete,
    params: () => ({}),
  },
  updatePassword: {
    uri: '/me/password',
    method: Method.Patch,
    params: (p) => {
      const {
        passwordNow,
        ...others
      } = p;
      return { users: Object.assign({ passwordNow }, others) };
    },
  },
};

function normalize (uri, raw) {
  if (uri.indexOf(':') === -1) {
    return { uri, raw };
  }

  const {
    questionId,
    groupId,
    commentId,
    invitationId,
    messageId,
  } = raw;

  const normalized = uri
    .replace(':messageId', messageId)
    .replace(':invitationId', invitationId)
    .replace(':questionId', questionId)
    .replace(':commentId', commentId)
    .replace(':groupId', groupId);

  return { normalized, raw };
}

function finalize (resolve, reject, queueResolve) {
  return (err, res) => {
    if (err) {
      if (res.body && res.body.errors) {
        reject(res.body);
      } else {
        reject({ errors: { unknown: [err] } });
      }
    } else {
      resolve(res.body);
    }
    queueResolve();
  };
}

function token () {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}

function methodEnchantedRequest (r, uri, method) {
  switch (method) {
    case Method.Get:
      return r.get(uri);
    case Method.Post:
      return r.post(uri);
    case Method.Patch:
      return r.patch(uri);
    case Method.Put:
      return r.put(uri);
    case Method.Delete:
      return r.delete(uri);
    default:
      return r;
  }
}

function base (uri, method) {
  const r = methodEnchantedRequest(request, uri, method);

  return method === Method.Get
    ? r
    : r.set('X-CSRF-Token', token());
}

function build (resolve, reject, queueResolve, uri, method, params = {}) {
  base(uri, method)
    .send(params)
    .end(finalize(resolve, reject, queueResolve));
}

function common (api, params, resolve, reject, queueResolve) {
  const { uri, normalized, trimmed, raw } = normalize(api.uri, params);

  build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || raw));
}

function add (api, params, resolve, reject) {
  jobs = jobs.then(() => new Promise((queueResolve) => {
    common(api, params, resolve, reject, queueResolve);
  }));
}

export function strike (api, params) {
  return new Promise((resolve, reject) => {
    add(api, params, resolve, reject);
  });
}

(() => {
  Object.keys(Api).forEach((key) => {
    methodStore[key] = (...args) => strike(Api[key], ...args);
  });
})();

