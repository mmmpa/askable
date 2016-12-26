import API from '../lib/services/strike-api'
import { Condition } from '../lib/models/condition'
import Fa from '../lib/fa'
import SubmitButton from '../lib/components/submit-button'
import { bind } from 'decko'
import { boss, feeder } from '../lib/hub-mixins'
import InputSection from '../lib/components/input-section'

window.LogIn = class {
  static start (dom) {
    ReactDOM.render(
      <Context>
        <Component/>
      </Context>
      , dom)
  }
}

@boss
class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
    loggedIn: false
  }

  listen (to) {
    to('submit', p => this.submit(p))
  }

  submit (params) {
    this.setState({ condition: Condition.Submitting })
    API
      .logIn(params)
      .then(()=> {
        this.setState({ loggedIn: true })
        location.reload()
      })
      .catch(()=> {
        this.setState({ condition: Condition.Fail })
      })
  }
}

@feeder
class Component extends React.Component {
  state = {
    login: '',
    password: ''
  }

  get params () {
    const {
      login,
      password
    } = this.state

    return { login, password }
  }

  get processMessages () {
    const {
      loggedIn,
      condition
    } = this.props

    if (loggedIn) {
      return (
        <p className="com message-area success-message">
          <Fa icon="paw"/>
          Signed in.
        </p>
      )
    }

    switch (condition) {
      case Condition.Fail:
        return (
          <p className="com message-area error-message">
            <Fa icon="ban"/>
            Couldn't sign in.
          </p>
        )
      case Condition.Success:
      case Condition.Submitting:
        return (
          <p className="com message-area submitting-message">Submitting...</p>
        )
      case Condition.Waiting:
      default:
        return null
    }
  }

  @bind
  submit () {
    this.dispatch('submit', this.params)
  }

  render () {
    const {
      login,
      password
    } = this.state
    const { condition } = this.props

    return (
      <article className="user-log-in body">
        <section className="com border-box-container">
          <h1 className="com border-box-title-area">Sign in</h1>
          <form className="com form-area">
            <InputSection
              type="text"
              name="login"
              placeholder="ID"
              value={login}
              onChange={(_, v) => this.setState({ login: v })}
            />
            <InputSection
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(_, v) => this.setState({ password: v })}
            />
            <section className="com submit-section">
              <SubmitButton
                className="submit"
                icon="sign-in"
                text="Sign in"
                condition={condition}
                onClick={this.submit}
              />
            </section>
          </form>
          {this.processMessages}
        </section>
      </article>
    )
  }
}
