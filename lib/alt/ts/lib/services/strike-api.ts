import {ILogIn} from "../../welcome-new-user/lib/services/strike-api";
import {IAnswer} from "../../new-question/lib/services/strike-api";
import {IAssign} from "../../new-question/lib/services/strike-api";
import {ISorry} from "../../new-question/lib/services/strike-api";
import {IWait} from "../../new-question/lib/services/strike-api";
declare const request;
declare const Promise;

var jobs = Promise.resolve();

const Uri = {
  createUser: '/welcome/new',
  createQuestion: '/users/me/q/new',
  logIn: '/in',
  answerQuestion: '/q/:questionId/answer',
  assignUserQuestion: '/q/:questionId/assign',
  waitAnswerQuestion: '/q/:questionId/wait',
  sorryQuestion: '/q/:questionId/sorry'
};

export enum Api{
  CreateUser,
  createQuestion,
  LogIn,
  AnswerQuestion,
  AssignUserQuestion,
  WaitAnswerQuestion,
  SorryQuestion
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

export interface IWait {
  questionId:number
}

export interface ISorry {
  questionId:number
}

function createUser(params:ICreateUser, resolve, reject, queueResolve) {
  request
    .post(Uri.createUser)
    .send({users: params})
    .set('X-CSRF-Token', token())
    .end((err, res)=> {
      if (!!err) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
      queueResolve();
    })
}

function createQuestion(params:ICreateQuestion, resolve, reject, queueResolve) {
  request
    .post(Uri.createQuestion)
    .send({questions: params})
    .set('X-CSRF-Token', token())
    .end((err, res)=> {
      if (!!err) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
      queueResolve();
    })
}

function answerQuestion(params:IAnswer, resolve, reject, queueResolve) {
  let questionId = params.questionId;
  delete params.questionId;
  let uri = Uri.answerQuestion.replace(':questionId', questionId);

  request
    .patch(uri)
    .send({questions: params})
    .set('X-CSRF-Token', token())
    .end((err, res)=> {
      if (!!err) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
      queueResolve();
    })
}

function assignUserQuestion(params:IAssign, resolve, reject, queueResolve) {
  let questionId = params.questionId;
  delete params.questionId;
  let uri = Uri.assignUserQuestion.replace(':questionId', questionId);

  request
    .patch(uri)
    .send({questions: params})
    .set('X-CSRF-Token', token())
    .end((err, res)=> {
      if (!!err) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
      queueResolve();
    })
}

function sorryQuestion(params:ISorry, resolve, reject, queueResolve) {
  let questionId = params.questionId;
  delete params.questionId;
  let uri = Uri.sorryQuestion.replace(':questionId', questionId);

  request
    .patch(uri)
    .set('X-CSRF-Token', token())
    .end((err, res)=> {
      if (!!err) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
      queueResolve();
    })
}

function waitAnswerQuestion(params:IWait, resolve, reject, queueResolve) {
  let questionId = params.questionId;
  delete params.questionId;
  let uri = Uri.waitAnswerQuestion.replace(':questionId', questionId);

  request
    .patch(uri)
    .set('X-CSRF-Token', token())
    .end((err, res)=> {
      if (!!err) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
      queueResolve();
    })
}


function logIn(params:ILogIn, resolve, reject, queueResolve) {
  request
    .post(Uri.logIn)
    .send({user_sessions: params})
    .set('X-CSRF-Token', token())
    .end((err, res)=> {
      if (!!err) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
      queueResolve();
    })
}

function token():string {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}