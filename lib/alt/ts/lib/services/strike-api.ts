declare const request;
declare const Promise;

var jobs = Promise.resolve();

enum Method {
  Get,
  Post,
  Patch,
  Put,
  Delete
}

export const Api = {
  DisposeMessage: {
    uri: '/m/:messageId',
    method: Method.Delete,
    params: (p)=> p
  },
  Invite: {
    uri: '/g/:groupId/invitation',
    method: Method.Post,
    params: (p)=> ({invitations: p})
  },
  DisposeGroup: {
    uri: '/g/:groupId',
    method: Method.Delete,
    params: (p)=> p
  },
  CreateGroup: {
    uri: '/g/new',
    method: Method.Post,
    params: (p)=> ({groups: p})
  },
  AcceptInvitation: {
    uri: '/i/:invitationId/accept',
    method: Method.Patch,
    params: (p)=> p
  },
  RejectInvitation: {
    uri: '/i/:invitationId/reject',
    method: Method.Patch,
    params: (p)=> p
  },
  BlockInvitation: {
    uri: '/i/:invitationId/block',
    method: Method.Patch,
    params: (p)=> p
  },
  CreateQuestion: {
    uri: '/g/:groupId/me/q/new',
    method: Method.Post,
    params: (p)=> ({questions: p})
  },
  AnswerQuestion: {
    uri: '/g/:groupId/q/:questionId/answer',
    method: Method.Patch,
    params: (p)=> ({questions: p})
  },
  AssignUserQuestion: {
    uri: '/g/:groupId/q/:questionId/assign',
    method: Method.Patch,
    params: (p)=> ({questions: p})
  },
  WaitAnswerQuestion: {
    uri: '/g/:groupId/q/:questionId/wait',
    method: Method.Patch,
    params: (p)=> ({})
  },
  SorryQuestion: {
    uri: '/g/:groupId/q/:questionId/sorry',
    method: Method.Patch,
    params: (p)=> ({})
  },
  ReplyToReply: {
    uri: '/g/:groupId/q/:questionId/a/:commentId/res',
    method: Method.Post,
    params: (p)=> ({questions: p})
  },
  FinishQuestion: {
    uri: '/g/:groupId/q/:questionId/finish',
    method: Method.Patch,
    params: (p)=> ({})
  },
  LogIn: {
    uri: '/in',
    method: Method.Post,
    params: (p)=> ({user_sessions: p})
  },
  LogOut: {
    uri: '/out',
    method: Method.Delete,
    params: (p)=> ({})
  },
  CreateUser: {
    uri: '/welcome/new',
    method: Method.Post,
    params: (p)=> ({users: p})
  },
  UpdateUser: {
    uri: '/me',
    method: Method.Patch,
    params: (p)=> ({users: p})
  },
  DestroyUser: {
    uri: '/me',
    method: Method.Delete,
    params: (p)=> ({})
  },
  ChangePassword: {
    uri: '/me/password',
    method: Method.Patch,
    params: (p)=> {
      p.password_now = p.passwordNow;
      delete p.passwordNow;
      return {users: p};
    }
  }
};

export function strike(api, params?:any):Promise {
  return new Promise((resolve, reject)=> {
    add(api, params, resolve, reject);
  });
}

function add(api, params, resolve, reject) {
  jobs = jobs.then(()=> {
    return new Promise((queueResolve, _)=> {
      common(api, params, resolve, reject, queueResolve);
    })
  })
}


function common(api, params, resolve, reject, queueResolve) {
  let {uri} = api;
  if (uri.indexOf(':') !== -1) {
    var {normalized, trimmed} = normalize(uri, params);
  }

  build(resolve, reject, queueResolve, normalized || uri, api.method, api.params(trimmed || params));
}

function build(resolve, reject, queueResolve, uri, method:Method, params = {}) {

  base(uri, method)
    .send(params)
    .end(finalize(resolve, reject, queueResolve));
}

function base(uri, method:Method) {
  let r = methodEnchantedRequest(request, uri, method);

  return method === Method.Get
    ? r
    : r.set('X-CSRF-Token', token())
}

function methodEnchantedRequest(request, uri, method:Method) {
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

function finalize(resolve, reject, queueResolve):(a, b)=> void {
  return (err, res)=> {
    if (!!err) {
      if (!res.body || !res.body.errors) {
        reject({errors: {unknown: [err]}});
      } else {
        reject(res.body);
      }
    } else {
      resolve(res.body);
    }
    queueResolve();
  }
}

function normalize(uri, trimmed) {
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

  return {trimmed, normalized};
}

function token():string {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}