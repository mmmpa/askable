const request = require('superagent');

let jobs = Promise.resolve();

const Method = {
  Get: 0,
  Post: 1,
  Patch: 2,
  Put: 3,
  Delete: 4
}

let methodStore = {}

export default methodStore;

export const Api = {
  disposeMessage: {
    uri: '/m/:messageId',
    method: Method.Delete,
    params: (p)=> p
  },
  invite: {
    uri: '/g/:groupId/invitation',
    method: Method.Post,
    params: (p)=> ({ invitations: p })
  },
  disposeGroup: {
    uri: '/g/:groupId',
    method: Method.Delete,
    params: (p)=> p
  },
  createGroup: {
    uri: '/g/new',
    method: Method.Post,
    params: (p)=> ({ groups: p })
  },
  acceptInvitation: {
    uri: '/i/:invitationId/accept',
    method: Method.Patch,
    params: (p)=> p
  },
  rejectInvitation: {
    uri: '/i/:invitationId/reject',
    method: Method.Patch,
    params: (p)=> p
  },
  blockInvitation: {
    uri: '/i/:invitationId/block',
    method: Method.Patch,
    params: (p)=> p
  },
  createQuestion: {
    uri: '/g/:groupId/me/q/new',
    method: Method.Post,
    params: (p)=> ({ questions: p })
  },
  answerQuestion: {
    uri: '/g/:groupId/q/:questionId/answer',
    method: Method.Patch,
    params: (p)=> ({ questions: p })
  },
  assignUserQuestion: {
    uri: '/g/:groupId/q/:questionId/assign',
    method: Method.Patch,
    params: (p)=> ({ questions: p })
  },
  waitAnswerQuestion: {
    uri: '/g/:groupId/q/:questionId/wait',
    method: Method.Patch,
    params: (p)=> ({})
  },
  sorryQuestion: {
    uri: '/g/:groupId/q/:questionId/sorry',
    method: Method.Patch,
    params: (p)=> ({})
  },
  replyToReply: {
    uri: '/g/:groupId/q/:questionId/a/:commentId/res',
    method: Method.Post,
    params: (p)=> ({ questions: p })
  },
  finishQuestion: {
    uri: '/g/:groupId/q/:questionId/finish',
    method: Method.Patch,
    params: (p)=> ({})
  },
  logIn: {
    uri: '/in',
    method: Method.Post,
    params: (p)=> ({ user_sessions: p })
  },
  logOut: {
    uri: '/out',
    method: Method.Delete,
    params: (p)=> ({})
  },
  createUser: {
    uri: '/welcome/new',
    method: Method.Post,
    params: (p)=> ({ users: p })
  },
  updateUser: {
    uri: '/me',
    method: Method.Patch,
    params: (p)=> ({ users: p })
  },
  destroyUser: {
    uri: '/me',
    method: Method.Delete,
    params: (p)=> ({})
  },
  changePassword: {
    uri: '/me/password',
    method: Method.Patch,
    params: (p)=> {
      p.password_now = p.passwordNow;
      delete p.passwordNow;
      return { users: p };
    }
  }
};

(()=> {
  for (let i in Api) {
    methodStore[i] = (...args) => {
      return strike(Api[i], ...args)
    }
  }
})();

export function strike (api, params) {
  return new Promise((resolve, reject)=> {
    add(api, params, resolve, reject);
  });
}

function add (api, params, resolve, reject) {
  jobs = jobs.then(()=> {
    return new Promise((queueResolve, _)=> {
      common(api, params, resolve, reject, queueResolve);
    })
  })
}


function common (api, params, resolve, reject, queueResolve) {
  let { uri } = api;
  if (uri.indexOf(':') !== -1) {
    var { normalized, trimmed } = normalize(uri, params);
  }

  build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || params));
}

function build (resolve, reject, queueResolve, uri, method, params = {}) {

  base(uri, method)
    .send(params)
    .end(finalize(resolve, reject, queueResolve));
}

function base (uri, method) {
  let r = methodEnchantedRequest(request, uri, method);

  return method === Method.Get
    ? r
    : r.set('X-CSRF-Token', token())
}

function methodEnchantedRequest (request, uri, method) {
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

function finalize (resolve, reject, queueResolve) {
  return (err, res)=> {
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
  }
}

function normalize (uri, trimmed) {
  let questionId = trimmed.questionId;
  delete trimmed.questionId;
  let groupId = trimmed.groupId;
  delete trimmed.groupId;
  let commentId = trimmed.commentId;
  delete trimmed.commentId;
  let invitationId = trimmed.invitationId;
  delete trimmed.invitationId;
  let messageId = trimmed.messageId;
  delete trimmed.messageId;
  let normalized = uri
    .replace(':messageId', messageId)
    .replace(':invitationId', invitationId)
    .replace(':questionId', questionId)
    .replace(':commentId', commentId)
    .replace(':groupId', groupId);

  return { trimmed, normalized };
}

function token () {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}