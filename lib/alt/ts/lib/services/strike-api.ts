declare const request;
declare const Promise;

var jobs = Promise.resolve();

const Uri = {
  createUser: '/welcome/new',
  logIn: '/in',
  logOut: '/out',
  createQuestion: '/g/:groupId/me/q/new',
  answerQuestion: '/g/:groupId/q/:questionId/answer',
  assignUserQuestion: '/g/:groupId/q/:questionId/assign',
  waitAnswerQuestion: '/g/:groupId/q/:questionId/wait',
  sorryQuestion: '/g/:groupId/q/:questionId/sorry',
  replyToReply: '/g/:groupId/q/:questionId/a/:commentId/res',
  finishQuestion: '/g/:groupId/q/:questionId/finish',
  acceptInvitation: '/i/:invitationId/accept',
  rejectInvitation: '/i/:invitationId/reject',
  blockInvitation: '/i/:invitationId/block',
  invite: '/g/:groupId/invitation',
  disposeGroup: '/g/:groupId',
  createGroup: '/g/new'
};

export enum Api{
  CreateUser,
  createQuestion,
  LogIn,
  AnswerQuestion,
  AssignUserQuestion,
  WaitAnswerQuestion,
  SorryQuestion,
  ReplyToReply,
  LogOut,
  FinishQuestion,
  AcceptInvitation,
  RejectInvitation,
  BlockInvitation,
  Invite,
  DisposeGroup,
  CreateGroup
}

export function strikeApi(api:Api, params?:any):Promise {
  return new Promise((resolve, reject)=> {
    addJob(api, params, resolve, reject);
  });
}

function addJob(api, params, resolve, reject) {
  jobs = jobs.then(()=> {
    return new Promise((queueResolve, _)=> {
      detectFunction(api)(params, resolve, reject, queueResolve)
    })
  })
}

function detectFunction(api:Api):(params, resolve, reject, queueResolve)=> void {
  switch (api) {
    case Api.CreateUser:
      return createUser;
    case Api.createQuestion:
      return createQuestion;
    case Api.LogIn:
      return logIn;
    case Api.AnswerQuestion:
      return answerQuestion;
    case Api.AssignUserQuestion:
      return assignUserQuestion;
    case Api.WaitAnswerQuestion:
      return waitAnswerQuestion;
    case Api.SorryQuestion:
      return sorryQuestion;
    case Api.ReplyToReply:
      return replyToReply;
    case Api.LogOut:
      return logOut;
    case Api.FinishQuestion:
      return finishQuestion;
    case Api.AcceptInvitation:
      return acceptInvitation;
    case Api.RejectInvitation:
      return rejectInvitation;
    case Api.BlockInvitation:
      return blockInvitation;
    case Api.Invite:
      return invite;
    case Api.DisposeGroup:
      return disposeGroup;
    case Api.CreateGroup:
      return createGroup;
    default:
      throw 'Api not exist'
  }
}

export interface ICreateUser {
  name:string,
  login:string,
  email:string,
  password:string
}

export interface ICreateQuestion {
  title:string,
  markdown:string,
  assigned:string[]
}

export interface ILogIn {
  login:string,
  password:string
}

export interface IAssign {
  assigned:string[],
  questionId:number
}

export interface IAnswer {
  markdown:string,
  questionId:number
}

export interface IReplyToReply {
  markdown:string,
  commentId:number,
  questionId:number
}

export interface IWait {
  questionId:number
}

export interface ISorry {
  questionId:number
}

function finalize(resolve, reject, queueResolve):(a, b)=> void {
  return (err, res)=> {
    if (!!err) {
      if (!res.body || !res.body.errors) {
        console.log(err)
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

function normalize(uri, params) {
  let questionId = params.questionId;
  delete params.questionId;
  let groupId = params.groupId;
  delete params.groupId;
  let commentId = params.commentId;
  delete params.commentId;
  let invitationId = params.invitationId;
  delete params.invitationId;
  let normalized = uri
    .replace(':invitationId', invitationId)
    .replace(':questionId', questionId)
    .replace(':commentId', commentId)
    .replace(':groupId', groupId);

  return {params, normalized};
}

function logOut(params:any, resolve, reject, queueResolve) {
  request
    .delete(Uri.logOut)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}


function createUser(params:ICreateUser, resolve, reject, queueResolve) {
  request
    .post(Uri.createUser)
    .send({users: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function invite(params:any, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.invite, params);

  request
    .post(normalized)
    .send({invitations: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function disposeGroup(params:any, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.disposeGroup, params);

  request
    .delete(normalized)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function createGroup(params:any, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.createGroup, params);

  request
    .post(normalized)
    .send({groups: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}


function acceptInvitation(params:any, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.acceptInvitation, params);

  request
    .patch(normalized)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function blockInvitation(params:any, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.blockInvitation, params);

  request
    .patch(normalized)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function rejectInvitation(params:any, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.rejectInvitation, params);

  request
    .patch(normalized)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}


function createQuestion(params:ICreateQuestion, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.createQuestion, params);

  request
    .post(normalized)
    .send({questions: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function finishQuestion(params:any, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.finishQuestion, params);

  request
    .patch(normalized)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function answerQuestion(params:IAnswer, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.answerQuestion, params);

  request
    .patch(normalized)
    .send({questions: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function replyToReply(params:IReplyToReply, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.replyToReply, params);

  request
    .post(normalized)
    .send({questions: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function assignUserQuestion(params:IAssign, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.assignUserQuestion, params);

  request
    .patch(normalized)
    .send({questions: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function sorryQuestion(params:ISorry, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.sorryQuestion, params);

  request
    .patch(normalized)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function waitAnswerQuestion(params:IWait, resolve, reject, queueResolve) {
  let {normalized, params} = normalize(Uri.waitAnswerQuestion, params);

  request
    .patch(normalized)
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}


function logIn(params:ILogIn, resolve, reject, queueResolve) {
  request
    .post(Uri.logIn)
    .send({user_sessions: params})
    .set('X-CSRF-Token', token())
    .end(finalize(resolve, reject, queueResolve))
}

function token():string {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}