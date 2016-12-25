import { ContextComponent, ComponentComponent } from '../lib/parcel'
import API from '../lib/services/strike-api'
import { Condition, isToSuccess } from '../lib/models/condition'
import User from '../lib/models/user'
import SubmitButton from '../lib/components/submit-button'
import InputSection from '../lib/components/input-section'
import ConditionMessage from '../lib/components/condition-message'
import { boss, feeder } from '../lib/hub-mixins'
import { bind } from 'decko'

const UserFormContainer = props => {
  const { title } = props

  return (
    <section className="user-editor border-box-container">
      <div className="com border-box-container">
        <h1 className="com border-box-title-area">{title}</h1>
        <form className="com form-area">
          {props.children}
        </form>
      </div>
    </section>
  )
}

@boss
class Context extends React.Component {
  state = {
    updatingCondition: Condition.Waiting,
    passwordCondition: Condition.Waiting,
    destroyCondition: Condition.Waiting,
    updatingMessage: '',
    passwordMessage: '',
    destroyMessage: '',
    user: {},
    errors: {}
  }

  componentWillMount () {
    this.setState({
      user: this.props.user,
    })
  }

  @bind
  update (params) {
    this.setState({ updatingCondition: Condition.Submitting, updatingMessage: '' })

    API.updateUser(params)
      .then((result)=> {
        let user = new User(result)
        this.setState({
          result,
          user,
          errors: {},
          updatingCondition: Condition.Success,
          updatingMessage: 'Updated !'
        })
      })
      .catch((result)=> {
        let { errors } = result
        this.setState({
          errors,
          updatingCondition: Condition.Fail,
          updatingMessage: 'Fail to update.'
        })
      })
  }

  @bind
  changePassword (params) {
    this.setState({ passwordCondition: Condition.Submitting, passwordMessage: '' })

    API.changePassword(params)
      .then((result)=> {
        this.setState({
          result,
          errors: {},
          passwordCondition: Condition.Success,
          passwordMessage: 'Changed !'
        })
      })
      .catch((result)=> {
        let { errors } = result
        errors.passwordNow = errors.password_now
        this.setState({
          errors,
          passwordCondition: Condition.Fail,
          passwordMessage: 'Fail to change.'
        })
      })
  }

  @bind
  destroy () {
    this.setState({ destroyCondition: Condition.Submitting })

    API.destroyUser()
      .then((result)=> {
        location.reload()
      })
      .catch((result)=> {
        let { errors } = result
        this.setState({ errors, destroyCondition: Condition.Fail })
      })
  }

  listen (to) {
    to('update', this.update)
    to('destroy', this.destroy)
    to('changePassword', this.changePassword)
  }
}

@feeder
class UserComponent extends React.Component {
  state = {
    name: '',
    login: '',
    email: '',
  }

  componentDidMount () {
    this.updateState(this.props)
  }

  componentWillUpdate (props) {
    this.updateState(props, this.props)
  }

  updateState (nextProps, props) {
    if (!nextProps.user || props && (nextProps === props || !isToSuccess(nextProps, props))) {
      return
    }

    let { name, login, email } = nextProps.user
    this.setState({ name, login, email })
  }

  get updatingParams () {
    let { name, login, email } = this.state
    return { name, login, email }
  }

  @bind
  submit () {
    this.dispatch('update', this.updatingParams)
  }

  render () {
    let { updatingCondition, updatingMessage, errors } = this.props
    let { name, login, email } = this.state

    return (
      <UserFormContainer
        title="Update information about you"
      >
        <InputSection
          type="text"
          name="name"
          placeholder="Display name"
          label="Display name"
          value={name}
          errors={errors}
          onChange={(_, v) => this.setState({ name: v })}
        />
        <InputSection
          type="text"
          name="login"
          placeholder="ID"
          label="ID"
          value={login}
          errors={errors}
          onChange={(_, v) => this.setState({ login: v })}
        />
        <InputSection
          type="text"
          name="email"
          placeholder="E-mail address"
          label="E-mail address"
          value={email}
          errors={errors}
          onChange={(_, v) => this.setState({ email: v })}
        />
        <section className="com submit-section">
          <SubmitButton
            condition={updatingCondition}
            icon="send-o"
            text="Update"
            className="submit"
            onClick={this.submit}
          />
        </section>
        <ConditionMessage
          condition={updatingCondition}
          message={updatingMessage}
        />
      </UserFormContainer>
    )
  }
}

@feeder
class PasswordComponent extends React.Component {
  state = {
    password: '',
    passwordNow: '',
  }

  get passwordParams () {
    let { passwordNow, password } = this.state
    return { passwordNow, password }
  }

  componentDidMount () {
    this.clearPassword(this.props)
  }

  componentWillUpdate (props) {
    this.clearPassword(props, this.props)
  }

  clearPassword (nextProps, props) {
    if (isToSuccess(nextProps, props)) {
      this.setState({ password: '', passwordNow: '' })
    }
  }

  @bind
  submit () {
    this.dispatch('changePassword', this.passwordParams)
  }

  render () {
    let { passwordCondition, passwordMessage, errors } = this.props
    let { passwordNow, password } = this.state

    return (
      <UserFormContainer
        title="Change password"
      >
        <InputSection
          type="password"
          name="passwordNow"
          placeholder="Old password"
          value={passwordNow}
          errors={errors}
          onChange={(_, v) => this.setState({ passwordNow: v })}
        />
        <InputSection
          type="password"
          name="password"
          placeholder="New password"
          value={password}
          errors={errors}
          onChange={(_, v) => this.setState({ password: v })}
        />
        <section className="com submit-section">
          <SubmitButton
            condition={passwordCondition}
            icon="key"
            text="Change"
            className="submit"
            onClick={this.submit}
          />
        </section>
        <ConditionMessage
          condition={passwordCondition}
          message={passwordMessage}
        />
      </UserFormContainer>
    )
  }
}

@feeder
class DisposerComponent extends React.Component {
  state = {
    yes: false
  }

  @bind
  toggle () {
    this.setState({ yes: !this.state.yes })
  }

  @bind
  submit () {
    this.dispatch('destroy')
  }

  render () {
    let { destroyCondition } = this.props
    let { yes } = this.state

    return (
      <UserFormContainer
        title="Dispose your account"
      >
        <section className="user-editor dispose-verify">
          <label>
            <input
              type="checkbox"
              name="yes"
              checked={yes}
              onChange={this.toggle}
            />
            Ensure to dispose your account
          </label>
        </section>
        <section className="com submit-section">
          <SubmitButton
            condition={destroyCondition}
            icon="trash"
            text="Dispose"
            className="dispose"
            disabled={!yes}
            onClick={this.submit}
          />
        </section>
      </UserFormContainer>
    )
  }
}

class UserEditor {
  static start (dom) {
    let user = new User(JSON.parse(dom.getAttribute('data-user')))
    ReactDOM.render(
      <article className="user-editor body">
        <div className="user-editor box-wrapper">
          <Context
            user={user}
          >
            <UserComponent/>
            <PasswordComponent/>
            <DisposerComponent/>
          </Context>
        </div>
      </article>
      , dom)
  }
}

window.UserEditor = UserEditor
