declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import {State} from './lib/models/state'
import Fa from './lib/fa'
import InputForm from './lib/components/input-form'
import SubmitButton from './lib/components/submit-button'
import {writeInput} from './lib/helpers/input-writer'

class Context extends Root {
  succeed() {
    location.reload();
  }

  submit(params) {
    this.setState({state: State.Submitting});
    strike(Api.LogIn, params)
      .then(()=> {
        this.succeed();
        this.setState({loggedIn: true});
      })
      .catch(()=> {
        this.setState({state: State.Fail});
      });
  }

  listen(to) {
    to('submit', (params)=> {
      this.submit(params);
    });
  }

  initialState(props) {
    return {
      state: State.Waiting,
      loggedIn: false
    }
  }
}

class Component extends Node {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    }
  }

  get params() {
    let {login, password} = this.state;
    return {login, password};
  }

  writeError() {
    if(this.props.loggedIn){
      return <p className="com message-area success-message">
        <Fa icon="paw"/>
        ログインに成功しました
      </p>;
    }

    switch (this.props.state) {
      case State.Fail:
        return <p className="com message-area error-message">
          <Fa icon="ban"/>
          ログインに失敗しました
        </p>;
      case State.Success:
      case State.Submitting:
      case State.Waiting:
      default:
        return null;
    }
  }

  render() {
    let {state} = this.props;
    let {login, password} = this.state;

    return <article className="user-log-in body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">ログイン</h1>
        <div className="com form-area">
          {writeInput(this, 'text', 'login', 'ログインID', null)}
          {writeInput(this, 'password', 'password', 'パスワード', null)}
          <section className="com submit-section">
            <SubmitButton {...{
              state, icon: "sign-in", text: "ログインする", className: 'submit',
              onClick: ()=>this.dispatch('submit', this.params)
            }}/>
          </section>
        </div>
        {this.writeError()}
      </section>
    </article>
  }
}

class LogIn {
  static start(dom:HTMLElement) {
    ReactDOM.render(
      <Context>
        <Component/>
      </Context>
      , dom);
  }
}

window.LogIn = LogIn;


