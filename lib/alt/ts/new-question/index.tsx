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
  children(props) {
    return <Component {...props}/>;
  }

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
      preview: false,
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
        return <section className="new-question error-messages">
          <p className="error-message">
            <Fa icon="ban"/>
            ログインに失敗しました
          </p>
        </section>;
      case State.Success:
        return <section className="new-question success-messages">
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
        return <button className="new-question sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          認証中
        </button>;
      case State.Success:
        return null;
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="new-question submit"
                       onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="sign-in"/>
          ログインする
        </button>;
    }
  }

  detectTabClass(isPreview:boolean) {
    return isPreview === this.state.preview ? 'tabnav-tab selected' : 'tabnav-tab';
  }

  render() {
    return <article className="new-question body">
      <section className="new-question box-body">
        <h1 className="new-question log-in-title">ログイン</h1>
        <section className="new-question tabs tabnav">
          <nav className="tabnav-tabs">
            <a className={this.detectTabClass(false)}
               onClick={()=> this.setState({preview: false})}>
              <Fa icon="pencil"/>
              コメントを書く
            </a>
            <a className={this.detectTabClass(true)}
               onClick={()=> this.setState({preview: true})}>
              <Fa icon="file-text-o"/>
              プレビュー
            </a>
          </nav>
        </section>
        <div className="inner form">
          <section className="new-question input-section">
            <input type="text" name="title" value={this.state.title} placeholder="タイトル"
                   onChange={(e)=> this.setState({login: e.target.value})}/>
          </section>
          <section className="new-question input-section">
            <textarea name="comment"/>
          </section>
          {this.writeError()}
          <section className="new-question submit-section">
            {this.writeSubmit()}
          </section>
        </div>
      </section>
    </article>
  }
}

class NewQuestion {
  static start(dom:HTMLElement, user, team) {
    ReactDOM.render(<Context {...{user, team}}/>, dom);
  }
}

window.NewQuestion = NewQuestion;


