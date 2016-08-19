import {Parcel, Good} from './lib/parcel'
import {Api, strike} from './lib/services/strike-api'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'
import InputForm from './lib/components/input-form'
import {State} from './lib/models/state'

class Context extends Parcel {
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
      state: State.Waiting
    }
  }
}

class Component extends Good {
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

  writeInput(type, name, placeholder, errors) {
    return <section className="com input-section">
      <InputForm {...{
        errors, type, name, placeholder, value: this.state[name],
        onChange: (v)=> {
          let p = {};
          p[name] = v;
          this.setState(p)
        }
      }}/>
    </section>
  }


  writeForm() {
    let {state, errors} = this.props;

    return <article className="user-register body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">登録内容を入力してください</h1>
        <div className="com form-area">
          {this.writeInput('text', 'name', '表示する名前', errors)}
          {this.writeInput('text', 'login', 'ログイン用ID', errors)}
          {this.writeInput('text', 'email', 'メールアドレス', errors)}
          {this.writeInput('password', 'password', 'パスワード', errors)}
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
    return <article className="user-registered body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">以下の内容で登録されました</h1>
        <div className="com form-area">
          <section className="com input-section">
            <h1 className="user-registered info-label">表示する名前</h1>
            <p className="user-registered info">{name}</p>
          </section>
          <section className="com input-section">
            <h1 className="user-registered info-label">ログイン用ID</h1>
            <p className="user-registered info">{login}</p>
          </section>
          <section className="com input-section">
            <h1 className="user-registered info-label">メールアドレス</h1>
            <p className="user-registered info">{email}</p>
          </section>
          <section className="user-registered link-section">
            <Fa icon="sign-in"/>
            <a href="/in">ログイン</a>
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
  static start(dom) {
    ReactDOM.render(
      <Context>
        <Component/>
      </Context>
      , dom);
  }
}

window.Welcome = Welcome;


