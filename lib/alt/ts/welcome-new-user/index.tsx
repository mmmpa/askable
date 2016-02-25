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
  children(props) {
    return <Component {...props}/>;
  }

  submit(params:ICreateUser) {
    this.setState({state: State.Submitting});
    strikeApi(Api.CreateUser, params)
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
          登録中
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="user-register submit"
                       onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="send-o"/>
          登録する
        </button>;
    }
  }

  writeForm() {
    return <article className="user-register body">
      <section className="user-register registering-body">
        <h1 className="user-register registering-title">登録内容を入力してください</h1>
        <div className="inner form">
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
        </div>
      </section>
    </article>
  }

  writeResult() {
    let {name, login, email} = this.props.result || {};
    return <article className="user-register body">
      <section className="user-register registered-body">
        <h1 className="user-register registered-title">以下の内容で登録されました</h1>
        <div className="inner">
          <section className="user-register info-section">
            <h1 className="user-register info-label">表示するなまえ</h1>
            <p className="user-register info">{name}</p>
          </section>
          <section className="user-register info-section">
            <h1 className="user-register info-label">ログイン用ID</h1>
            <p className="user-register info">{login}</p>
          </section>
          <section className="user-register info-section">
            <h1 className="user-register info-label">メールアドレス</h1>
            <p className="user-register info">{email}</p>
          </section>
          <section className="user-register link-section">
            <Fa icon="sign-in"/><a href="/in">ログインページヘ</a>
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
    ReactDOM.render(<Context />, dom);
  }
}

window.Welcome = Welcome;


