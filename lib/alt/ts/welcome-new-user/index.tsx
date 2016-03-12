declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'
import InputForm from './lib/components/input-form'

enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

class Context extends Root {
  submit(params) {
    this.setState({state: State.Submitting});
    strike(Api.CreateUser, params)
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
      name: '',
      login: '',
      email: '',
      password: ''
    }
  }

  get params() {
    let {name, login, email, password} = this.state;
    return {name, login, email, password};
  }

  writeForm() {
    let {state, errors} = this.props;
    let {name, login, email, password} = this.state;

    return <article className="user-register body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">登録内容を入力してください</h1>
        <div className="com form-area">
          <section className="com input-section">
            <InputForm {...{
              errors, type: 'text', name: 'name', placeholder: '表示するなまえ', value: name,
              onChange: (v)=> this.setState({name: v})
            }}/>
          </section>
          <section className="com input-section">
            <InputForm {...{
              errors, type: 'text', name: 'login', placeholder: 'ログイン用ID', value: login,
              onChange: (v)=> this.setState({login: v})
            }}/>
          </section>
          <section className="com input-section">
            <InputForm {...{
              errors, type: 'text', name: 'email', placeholder: 'メールアドレス', value: email,
              onChange: (v)=> this.setState({email: v})
            }}/>
          </section>
          <section className="com input-section">
            <InputForm {...{
              errors, type: 'password', name: 'password', placeholder: 'パスワード', value: password,
              onChange: (v)=> this.setState({password: v})
            }}/>
          </section>
          <section className="com submit-section">
            <SubmitButton {...{
              state, icon: "send-o", text: "登録する", className: 'submit',
              onClick: ()=>this.dispatch('submit', this.params)
            }}/>
          </section>
        </div>
      </section>
    </article>
  }

  writeResult() {
    let {name, login, email} = this.props.result || {};
    return <article className="user-register body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">以下の内容で登録されました</h1>
        <div className="com form-area">
          <section className="com input-section">
            <h1 className="user-register info-label">表示するなまえ</h1>
            <p className="user-register info">{name}</p>
          </section>
          <section className="com input-section">
            <h1 className="user-register info-label">ログイン用ID</h1>
            <p className="user-register info">{login}</p>
          </section>
          <section className="com input-section">
            <h1 className="user-register info-label">メールアドレス</h1>
            <p className="user-register info">{email}</p>
          </section>
          <section className="user-register link-section">
            <Fa icon="sign-in"/>
            <a href="/in">ログインページヘ</a>
          </section>
        </div>
      </section>
    </article>
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

class Welcome {
  static start(dom:HTMLElement) {
    ReactDOM.render(<Context>
      <Component/>
    </Context>, dom);
  }
}

window.Welcome = Welcome;


