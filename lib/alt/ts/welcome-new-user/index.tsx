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

interface S {
  state:State
}

class Context extends Root<{},{}> {
  children(props) {
    return <Component {...props}/>;
  }

  submit(params:ICreateUser) {
    this.setState({state: State.Submitting});
    strikeApi(Api.CreateUser, params)
      .then((result)=> {
        this.setState({result, errors:{}, state: State.Success});
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


class Component extends Node<{},{}> {
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

  writeSubmit() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="user-register sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          Sending...
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="user-register submit"
                       onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="paw"/>
          Submit
        </button>;
    }
  }

  render() {
    console.log(this.props)
    return <article className="user-register body">
      <section className="user-register input-section">
        {this.writeInput('text', 'name', '表示するなまえ')}
      </section>
      <section className="user-register input-section">
        {this.writeInput('text', 'login', 'ログイン用ID')}
      </section>
      <section className="user-register input-section">
        {this.writeInput('text', 'email', 'メールアドレス')}
      </section>
      <section className="user-register input-section">
        {this.writeInput('password', 'password', 'パスワード')}
      </section>
      <section className="user-register submit-section">
        {this.writeSubmit()}
      </section>
    </article>
  }
}

class Welcome {
  static start(dom:HTMLElement) {
    ReactDOM.render(
      <Context />,
      dom
    );
  }
}

window.Welcome = Welcome;


