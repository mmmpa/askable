declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'

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

  submit(params) {
    this.setState({state: State.Submitting});
    strike(Api.LogIn, params)
      .then(()=> {
        this.succeed();
        this.setState({state: State.Success});
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
      state: 'ready'
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

  writeError(state) {
    switch (state) {
      case State.Fail:
        return <p className="com message-area error-message">
          <Fa icon="ban"/>
          ログインに失敗しました
        </p>;
      case State.Success:
        return <p className="com message-area success-message">
          <Fa icon="paw"/>
          ログインに成功しました
        </p>;
      case State.Submitting:
      case State.Waiting:
      default:
        return null;
    }
  }

  render() {
    let {state} = this.props;

    return <article className="user-log-in body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">ログイン</h1>
        <div className="com form-area">
          <section className="com input-section">
            <input type="text" name="login" value={this.state.login} placeholder="ログインID"
                   onChange={(e)=> this.setState({login: e.target.value})}/>
          </section>
          <section className="com input-section">
            <input type="password" name="password" value={this.state.password} placeholder="パスワード"
                   onChange={(e)=> this.setState({password: e.target.value})}/>
          </section>
          <section className="com submit-section">
            <SubmitButton {...{
              state, icon: "sign-in", text: "ログインする", className: 'submit',
              onClick: ()=>this.dispatch('submit', this.params)
            }}/>
          </section>
        </div>
        {this.writeError(state)}
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


