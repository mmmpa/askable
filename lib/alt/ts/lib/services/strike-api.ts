declare const request;
declare const Promise;

var jobs = Promise.resolve();

const Uri = {
  createUser: '/welcome/new'
};

export enum Api{
  CreateUser,
}

export function strikeApi(api:Api, params:any):Promise {
  return new Promise((resolve, reject)=> {
    addJob(api, params, resolve, reject);
  });
}

function addJob(api, params, resolve, reject){
  jobs = jobs.then(()=>{
    return new Promise((queueResolve, _)=>{
      detectFunction(api)(params, resolve, reject, queueResolve)
    })
  })
}

function detectFunction(api:Api):(params, resolve, reject, queueResolve)=> void {
  switch (api) {
    case Api.CreateUser:
      return createUser;
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

export interface ICreatedUser {
  name:string,
  login:string,
  email:string
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

function token():string {
  try{
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  }catch(ex){
    return '';
  }
}