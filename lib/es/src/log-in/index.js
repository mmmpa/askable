import { ContextComponent, ComponentComponent } from './lib/parcel'
import API from './lib/services/strike-api'
import { State } from './lib/models/state'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'
import { writeInput } from './lib/helpers/input-writer'

window.LogIn = class {
  static start (dom) {
    ReactDOM.render(
      <Context>
        <Component/>
      </Context>
      , dom);
  }
}

class Context extends ContextComponent {
  initialState (props) {
    return {
      state: State.Waiting,
      loggedIn: false
    }
  }

  succeed () {
    location.reload();
  }

  submit (params) {
    this.setState({ state: State.Submitting });
    API.logIn(params)
      .then(()=> {
        this.succeed();
        this.setState({ loggedIn: true });
      })
      .catch(()=> {
        this.setState({ state: State.Fail });
      });
  }

  listen (to) {
    to('submit', (params)=> {
      this.submit(params);
    });
  }
}


class Component extends ComponentComponent {
  initialState (props) {
    return {
      login: '',
      password: ''
    }
  }

  get params () {
    let { login, password } = this.state;
    return { login, password };
  }

  writeError () {
    if (this.props.loggedIn) {
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

  render () {
    let { state } = this.props;

    return <article className="user-log-in body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">ログイン</h1>
        <form className="com form-area">
          {writeInput(this, 'text', 'login', 'ログインID', null)}
          {writeInput(this, 'password', 'password', 'パスワード', null)}
          <section className="com submit-section">
            <SubmitButton {...{
              state, icon: "sign-in", text: "ログインする", className: 'submit',
              onClick: ()=>this.dispatch('submit', this.params)
            }}/>
          </section>
        </form>
        {this.writeError()}
      </section>
    </article>
  }
}
