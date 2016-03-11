export default class User{
  name:string;
  login:string;
  email:string;

  constructor(params){
    this.name = params.name;
    this.login = params.login;
    this.email = params.email;
  }
}