declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import {Api, strikeApi, ILogIn} from './lib/services/strike-api'

enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

class Context extends Root {
  succeed() {
    document.location = this.props.userPage;
  }

  submit(params:ILogIn) {
    this.setState({state: State.Submitting});
    strikeApi(Api.LogIn, params)
      .then(()=> {
        this.setState({state: State.Success});
        this.succeed();
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

  get params():ILogIn {
    let {login, password} = this.state;
    return {login, password};
  }

  writeError() {
    switch (this.props.state) {
      case State.Fail:
        return <section className="user-log-in error-messages">
          <p className="error-message">
            <Fa icon="ban"/>
            ログインに失敗しました
          </p>
        </section>;
      case State.Success:
        return <section className="user-log-in success-messages">
          <p className="success-message">
            <Fa icon="paw"/>
            ログインに成功しました
          </p>
        </section>;
      case State.Submitting:
      case State.Waiting:
      default:
        return null;
    }
  }


  writeSubmit() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="user-log-in sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          認証中
        </button>;
      case State.Success:
        return null;
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="user-log-in submit"
                       onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="sign-in"/>
          ログインする
        </button>;
    }
  }

  render() {
    return <article className="user-log-in body">
      <section className="user-log-in box-body">
        <h1 className="user-log-in log-in-title">ログイン</h1>
        <div className="inner form">
          <section className="user-log-in input-section">
            <input type="text" name="login" value={this.state.login} placeholder="ログインID"
                   onChange={(e)=> this.setState({login: e.target.value})}/>
          </section>
          <section className="user-log-in input-section">
            <input type="password" name="password" value={this.state.password} placeholder="パスワード"
                   onChange={(e)=> this.setState({password: e.target.value})}/>
          </section>
          {this.writeError()}
          <section className="user-log-in submit-section">
            {this.writeSubmit()}
          </section>
        </div>
      </section>
    </article>
  }
}

class LogIn {
  static start(dom:HTMLElement, userPage:string) {
    ReactDOM.render(<Context {...{userPage}}>
      <Component/>
    </Context>, dom);
  }
}

window.LogIn = LogIn;


