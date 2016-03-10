declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import {Api, strikeApi, ICreateUser} from './lib/services/strike-api'

enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

class Context extends Root {
  succeed() {
    location.reload();
  }

  get invitationId() {
    return this.props.invitationId;
  }

  setBase(params) {
    params.invitationId = this.invitationId;
    return params;
  }

  submit(api:Api) {
    this.setState({state: State.Submitting});
    strikeApi(api, this.setBase({}))
      .then((result)=> {
        this.succeed();
        this.setState({result, errors: {}, state: State.Success});
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, state: State.Fail});
      });
  }

  listen(to) {
    to('submitAccept', ()=> {
      this.submit(Api.AcceptInvitation);
    });

    to('submitReject', ()=> {
      this.submit(Api.RejectInvitation);
    });

    to('submitBlock', ()=> {
      this.submit(Api.BlockInvitation);
    });
  }

  initialState(props) {
    return {
      state: 'ready'
    }
  }
}


class Component extends Node {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      login: '',
      email: '',
      password: ''
    }
  }

  get params():ICreateUser {
    let {name, login, email, password} = this.state;
    return {name, login, email, password};
  }

  setStateHelper(key, value) {
    let hash = {};
    hash[key] = value;
    this.setState(hash);
  }

  writeInput(type:string, name:string, placeholder?:string) {
    let errors = this.writeError(name);
    let state = !!this.writeError(name) ? 'has-error' : 'calm'
    return <div className="input">
      <input className={state} {...{type, name, placeholder}} value={this.state[name]}
             onChange={(e)=> {this.setStateHelper(name, e.target.value)}}/>
      {errors}
    </div>
  }

  writeError(name:string) {
    if (!this.props.errors) {
      return null;
    }
    let errors = this.props.errors[name];
    if (!errors) {
      return null;
    }
    return <ul className="error-messages">
      {errors.map((error)=> <li className="error-message">{error}</li>)}
    </ul>
  }

  writeAccept() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="sending" disabled={true}>
          <Fa icon="thumbs-o-up" animation="pulse"/>
          参加する
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="submit"
                       onClick={()=> this.dispatch('submitAccept')}>
          <Fa icon="thumbs-o-up"/>
          参加する
        </button>;
    }
  }

  writeReject() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="sending" disabled={true}>
          <Fa icon="trash" animation="pulse"/>
          ことわる
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="reject"
                       onClick={()=> this.dispatch('submitReject')}>
          <Fa icon="trash"/>
          ことわる
        </button>;
    }
  }

  writeBlock() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="sending" disabled={true}>
          <Fa icon="ban" animation="pulse"/>
          ブロック
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="block"
                       onClick={()=> this.dispatch('submitBlock')}>
          <Fa icon="ban"/>
          ブロック
        </button>;
    }
  }

  writeForm() {
    return <section className="reactor body">
      {this.writeAccept()}
      {this.writeReject()}
      {this.writeBlock()}
    </section>
  }

  writeResult() {
    let {name, login, email} = this.props.result || {};
    return <section className="reactor body">
      <p className="rector message">送信完了しました</p>
    </section>
  }

  render() {
    switch (this.props.state) {
      case State.Success:
        return this.writeResult();
      case State.Submitting:
      case State.Waiting:
      case State.Fail:
      default:
        return this.writeForm();
    }
  }
}

class InvitationReactor {
  static start(doms) {
    _.each(doms, (dom)=> {
      let invitationId = dom.getAttribute('data-id');
      ReactDOM.render(<Context {...{invitationId}}>
        <Component/>
      </Context>, dom);
    })
  }
}

window.InvitationReactor = InvitationReactor;


