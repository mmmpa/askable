declare const request;
declare const Promise;

var promise = Promise.resolve();

const Uri = {
  createUser: ''
};

export enum Api{
  CreateUser,
}

export function strikeApi(api:Api, params:any):Promise {
  return new Promise((resolve, reject)=> {
    detectFunction(api)(params, resolve, reject);
  });
}

function detectFunction(api:Api):(params, resolve, reject)=> void {
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

function createUser(params:ICreateUser, resolve, reject) {
  console.log('request')
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
    })
}

export function token():string {
  return document.getElementsByName('csrf-token')[0].getAttribute('content');
}