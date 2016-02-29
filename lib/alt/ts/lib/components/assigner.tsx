declare const React;
declare const ReactDOM;
declare const _;
import {Root, Node} from '../eventer'
import Fa from '../fa'
import ErrorMessages from './error-messages'
import User from "../models/user";
import Team from "../models/team";

export default class Assigner extends Node {
  constructor(props) {
    super(props);
    this.state = {
      assigned: []
    }
  }

  isAssigned(userLogin:string) {
    return _.includes(this.state.assigned, userLogin)
  }

  isStateChanged(state) {
    return this.state.assigned.join(',') !== state.assigned.join(',')
  }

  componentDidUpdate(props, state) {
    if (this.isStateChanged(state)) {
      this.props.onChange(this.state);
    }
  }

  assignUser(userLogin:string) {
    let now = this.state.assigned.concat();
    if (_.includes(now, userLogin)) {
      _.remove(now, userLogin);
    } else {
      now.push(userLogin);
    }
    this.setState({assigned: now});
  }

  writeAssigner() {
    let {user, team} = this.props;

    return <section className="assigner team-members">
      <section className="assigner team-member-list">
        {team.users.map(({login, name}:User)=>{

          return <label className="assigner team-member" key={login}>
            <span className="input-input">
              <input type="checkbox" name="assign"
                     checked={this.isAssigned(login)}
                     onChange={()=> this.assignUser(login)}/>
            </span>
            <span className="input-label">
              {name}
            </span>
          </label>
          })}
      </section>
    </section>
  }

  render() {
    let {errors} = this.props;
    return <article className="assigner body">
      <section className="assigner tabs tabnav">
        <nav className="tabnav-tabs">
          <a className="tabnav-tab selected">
            <Fa icon="hand-o-right"/>
            回答をおねがいする
          </a>
        </nav>
      </section>
      {this.writeAssigner()}
      <ErrorMessages name="assigned" {...{errors}}/>
    </article>
  }
}