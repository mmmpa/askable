import API from '../lib/services/strike-api'
import { State } from '../lib/models/state'
import Fa from '../lib/fa'
import SubmitButton from '../lib/components/submit-button'
import { writeInput } from '../lib/helpers/input-writer'
import { bind } from 'decko'
import { boss, feeder } from '../lib/hub-mixins'

window.LogIn = class {
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
      state: State.Waiting,
      loggedIn: false
    })
  }

  listen (to) {
    to('submit', p => this.submit(p));
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
}


@feeder
class Component extends React.Component {
  componentWillMount () {
    this.setState({
      login: '',
      password: ''
    })
  }

  get params () {
    let { login, password } = this.state;
    return { login, password };
  }

  get processMessages () {
    if (this.props.loggedIn) {
      return <p className="com message-area success-message">
        <Fa icon="paw"/>
        Signed in.
      </p>
    }

    switch (this.props.state) {
      case State.Fail:
        return <p className="com message-area error-message">
          <Fa icon="ban"/>
          Couldn't sign in.
        </p>
      case State.Success:
      case State.Submitting:
        return <p className="com message-area submitting-message">
          Submitting...
        </p>
      case State.Waiting:
      default:
        return null;
    }
  }

  render () {
    let { state } = this.props;

    return <article className="user-log-in body">
      <section className="com border-box-container">
        <h1 className="com border-box-title-area">Sign in</h1>
        <form className="com form-area">
          {writeInput(this, 'text', 'login', 'ID', null)}
          {writeInput(this, 'password', 'password', 'Password', null)}
          <section className="com submit-section">
            <SubmitButton {...{
              state,
              icon: "sign-in",
              text: "Sign in",
              className: 'submit',
              onClick: () => this.dispatch('submit', this.params)
            }}/>
          </section>
        </form>
        {this.processMessages}
      </section>
    </article>
  }
}
