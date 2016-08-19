import User from "./user";

export default class Group {
  name:string = '';
  users:User[] = [];

  constructor(params) {
    this.name = params.name || '';
    this.users = params.users.map((user)=> new User(user));
  }
}