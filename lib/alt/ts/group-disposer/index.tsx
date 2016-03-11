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

  succeed() {
    location.reload();
  }

  setBase(params) {
    params.groupId = this.groupId;
    return params;
  }

  submit() {
    this.setState({state: State.Submitting});
    strikeApi(Api.DisposeGroup, this.setBase({}))
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
    to('submit', ()=> {
      this.submit();
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
      name: ''
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
    if (this.props.groupName !== this.state.name) {
      return <button className="dispose" disabled={true}>
        <Fa icon="remove"/>
        解散する
      </button>;
    }

    switch (this.props.state) {
      case State.Submitting:
        return <button className="sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          解散する
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="dispose"
                       onClick={()=> this.dispatch('submit')}>
          <Fa icon="remove"/>
          解散する
        </button>;
    }
  }

  writeResult() {
    switch (this.props.state) {
      case State.Success:
        return <p className="disposer success">削除しました</p>
      case State.Submitting:
      case State.Waiting:
      case State.Fail:
      default:
        return null;
    }
  }

  render() {
    let {login} = this.state;

    return <section className="disposer body">
      <div className="disposer input-area">
        <section className="disposer login-area">
          <input type="text" value={login} placeholder="グループの名前を入力"
                 onChange={(e)=> this.setState({name: e.target.value})}/>
        </section>
        {this.writeSubmit()}
      </div>
      {this.writeResult()}
    </section>
  }
}

class GroupDisposer {
  static start(dom) {
    let groupId = dom.getAttribute('data-id');
    let groupName = dom.getAttribute('data-name');
    ReactDOM.render(<Context {...{groupId, groupName}}>
      <Component/>
    </Context>, dom);
  }
}

window.GroupDisposer = GroupDisposer;


