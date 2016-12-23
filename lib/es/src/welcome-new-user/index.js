import Fa from '../lib/fa'
import SubmitButton from '../lib/components/submit-button'
import InputForm from '../lib/components/input-form'
import { State } from '../lib/models/state'
import { boss, feeder } from '../lib/hub-mixins'

window.Welcome = class {
  static start (dom) {
    ReactDOM.render(
      <Context>
        <Component/>
      </Context>
      , dom);
  }
}

@boss
class Context extends React.Component {
  componentWillMount () {
    this.setState({
      state: State.Waiting
    })
  }

  submit (params) {
    this.setState({ state: State.Submitting });
    API
      .createUser(params)
      .then((result) => {
        this.setState({ result, errors: {}, state: State.Success });
      })
      .catch((result) => {
        let { errors } = result
        this.setState({ errors, state: State.Fail });
      });
  }

  listen (to) {
    to('submit', (params)=> {
      this.submit(params);
    });
  }
}

@feeder
class Component extends React.Component {
  componentWillMount () {
    this.state = {
      name: '',
      login: '',
      email: '',
      password: ''
    }
  }

  get params () {
    let { name, login, email, password } = this.state;
    return { name, login, email, password };
  }

  writeInput (type, name, placeholder, errors) {
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

  get form () {
    let { state, errors } = this.props;

    return <article className="user-register body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">Sign up</h1>
        <div className="com form-area">
          {this.writeInput('text', 'name', 'Display name', errors)}
          {this.writeInput('text', 'login', 'ID to sign in', errors)}
          {this.writeInput('text', 'email', 'E-mail address', errors)}
          {this.writeInput('password', 'password', 'Password', errors)}
          <section className="com submit-section">
            <SubmitButton {...{
              state, icon: "send-o", text: "Sign up !", className: 'submit',
              onClick: () => this.dispatch('submit', this.params)
            }}/>
          </section>
        </div>
      </section>
    </article>
  }

  get result () {
    let { name, login, email } = this.props.result || {};
    return <article className="user-registered body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">Completed to sign up</h1>
        <div className="com form-area">
          <section className="com input-section">
            <h1 className="user-registered info-label">Display name</h1>
            <p className="user-registered info">{name}</p>
          </section>
          <section className="com input-section">
            <h1 className="user-registered info-label">ID to sign in</h1>
            <p className="user-registered info">{login}</p>
          </section>
          <section className="com input-section">
            <h1 className="user-registered info-label">E-mail address</h1>
            <p className="user-registered info">{email}</p>
          </section>
          <section className="user-registered link-section">
            <a href="/in" className="link ready">
              <Fa icon="sign-in"/>
              Sign in
            </a>
          </section>
        </div>
      </section>
    </article>
  }

  render () {
    switch (this.props.state) {
      case State.Success:
        return this.result;
      case State.Submitting:
      case State.Waiting:
      case State.Fail:
      default:
        return this.form;
    }
  }
}
