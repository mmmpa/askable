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
  get groupId() {
    return this.props.groupId;
  }

  setBase(params) {
    params.groupId = this.groupId;
    return params;
  }

  submit(params) {
    this.setState({state: State.Submitting});
    strikeApi(Api.Invite, this.setBase(params))
      .then((result)=> {
        this.setState({result, errors: {}, state: State.Success});
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, state: State.Fail});
      });
  }

  listen(to) {
    to('submit', (params)=> {
      this.submit(params);
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
      login: ''
    }
  }

  get params() {
    return {login: this.state.login}
  }

  componentWillUpdate(props) {
    if (this.props.state !== State.Success && props.state === State.Success) {
      this.setState({login: ''})
    }
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

  writeSubmit() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="sending" disabled={true}>
          <Fa icon="thumbs-o-up" animation="pulse"/>
          招待する
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="submit"
                       onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="thumbs-o-up"/>
          招待する
        </button>;
    }
  }

  writeResult() {
    switch (this.props.state) {
      case State.Success:
        return <p className="invitation success">招待しました</p>
      case State.Submitting:
        return <p className="invitation success">&nbsp;</p>
      case State.Waiting:
        return null;
      case State.Fail:
      default:
        return this.writeError('any')
    }
  }

  render() {
    let {login} = this.state;

    return <section className="invitation body">
      <div className="invitation input-area">
        <section className="invitation login-area">
          <input type="text" value={login} placeholder="対象ユーザーのログインId"
                 onChange={(e)=> this.setState({login: e.target.value})}/>
        </section>
        {this.writeSubmit()}
      </div>
      {this.writeResult()}
    </section>
  }
}

class InvitationCreator {
  static start(dom) {
    let groupId = dom.getAttribute('data-id');
    ReactDOM.render(<Context {...{groupId}}>
      <Component/>
    </Context>, dom);
  }
}

window.InvitationCreator = InvitationCreator;


