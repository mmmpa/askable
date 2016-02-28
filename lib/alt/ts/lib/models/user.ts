export default class User{
  name:string;
  login:string;

  constructor(params){
    this.name = params.name;
    this.login = params.login;
  }
}