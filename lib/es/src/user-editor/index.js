import { ContextComponent, ComponentComponent } from '../lib/parcel'
import API from '../lib/services/strike-api'
import { State } from '../lib/models/state'
import Fa from '../lib/fa'
import User from '../lib/models/user'
import SubmitButton from '../lib/components/submit-button'
import InputForm from '../lib/components/input-form'
import { writeInput } from '../lib/helpers/input-writer'

const Target = {
  User: 'User',
  Password: 'Password',
  Disposer: 'Disposer'
}

class Context extends ContextComponent {
  destroySucceed () {
    location.reload()
  }

  target (api) {
    this.setState({ targetNow: this.detectTarget(api) });
  }

  detectTarget (api) {
    switch (api) {
      case API.UpdateUser:
        return Target.User;
      case API.ChangePassword:
        return Target.Password;
      case API.DestroyUser:
        return Target.Disposer;
      default:
        return null;
    }
  }

  update (params) {
    this.setState({ updatingState: State.Submitting, updatingMessage: '' });
    this.target(API.UpdateUser);
    API.updateUser(params)
      .then((result)=> {
        let user = new User(result);
        this.setState({
          result,
          user,
          errors: {},
          updatingState: State.Success,
          updatingMessage: 'Updated !'
        });
      })
      .catch((result)=> {
        let { errors } = result
        this.setState({
          errors,
          updatingState: State.Fail,
          passwordMessage: 'Fail to update.'
        });
      });
  }

  changePassword (params) {
    this.setState({ passwordState: State.Submitting, passwordMessage: '' });
    this.target(API.ChangePassword);
    API.changePassword(params)
      .then((result)=> {
        this.setState({
          result,
          errors: {},
          passwordState: State.Success,
          passwordMessage: 'Changed !'
        });
      })
      .catch((result)=> {
        let { errors } = result;
        errors.passwordNow = errors.password_now
        this.setState({
          errors,
          passwordState: State.Fail,
          passwordMessage: 'Fail to change.'
        });
      });
  }

  destroy () {
    this.setState({ destroyState: State.Submitting });
    this.target(API.DestroyUser);
    API.destroyUser()
      .then((result)=> {
        this.destroySucceed();
      })
      .catch((result)=> {
        let { errors } = result;
        this.setState({ errors, destroyState: State.Fail });
      });
  }

  listen (to) {
    to('update', (params)=> {
      this.update(params);
    });

    to('destroy', ()=> {
      this.destroy();
    });

    to('changePassword', (params)=> {
      this.changePassword(params);
    });
  }

  initialState (props) {
    return {
      updatingState: State.Waiting,
      passwordState: State.Waiting,
      destroyState: State.Waiting,
      updatingMessage: '',
      passwordMessage: '',
      destroyMessage: '',
      targetNow: null,
      user: props.initial,
      errors: {}
    }
  }
}

class UserComponent extends ComponentComponent {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      login: '',
      email: '',
    }
  }

  get updatingParams () {
    let { name, login, email } = this.state;
    return { name, login, email };
  }

  componentDidMount () {
    this.updateState(this.props);
  }

  componentWillUpdate (props, state) {
    this.updateState(props, this.props);
  }

  isToSuccess (nextProps, props) {
    if (!props) {
      return nextProps.state === State.Success;
    }
    return props.state !== State.Success && nextProps.state === State.Success
  }

  updateState (nextProps, props) {
    if (props && (nextProps === props || !this.isToSuccess(nextProps, props))) {
      return;
    }

    let { name, login, email } = nextProps.user;
    this.setState({ name, login, email })
  }

  writeMessage () {
    switch (this.props.updatingState) {
      case State.Success:
        return <p className="com success-message">
          {this.props.updatingMessage}
        </p>
      case State.Submitting:
        return <p>
          <Fa icon="spinner" animation="pulse"/>
          sending...
        </p>
      case State.Fail:
        return <p className="com error-message">
          {this.props.updatingMessage}
        </p>
      case State.Waiting:
      default:
        return null
    }
  }

  render () {
    let { updatingState, errors } = this.props;
    let { name, login, email } = this.state;

    return <section className="user-editor border-box-container">
      <div className="com border-box-container">
        <h1 className="com border-box-title-area">Update information about you</h1>
        <form className="com form-area">
          {writeInput(this, 'text', 'name', 'Display name', 'Display name', errors)}
          {writeInput(this, 'text', 'login', 'ID', 'ID', errors)}
          {writeInput(this, 'text', 'email', 'E-mail address', 'E-mail address', errors)}
          <section className="com submit-section">
            <SubmitButton {...{
              state: updatingState,
              icon: "send-o",
              text: "Update",
              className: 'submit',
              onClick: ()=>this.dispatch('update', this.updatingParams)
            }}/>
          </section>
          {this.writeMessage()}
        </form>
      </div>
    </section>
  }
}

class PasswordComponent extends ComponentComponent {
  componentWillMount () {
    this.state = {
      password: '',
      passwordNow: '',
    }
  }

  get passwordParams () {
    let { passwordNow, password } = this.state;
    return { passwordNow, password };
  }

  componentDidMount () {
    this.clearPassword(this.props);
  }

  componentWillUpdate (props, state) {
    this.clearPassword(props, this.props);
  }

  isToSuccess (nextProps, props) {
    if (!props) {
      return nextProps.state === State.Success
    }
    console.log(nextProps.passwordState, State.Success)
    return props.passwordState !== State.Success && nextProps.passwordState === State.Success
  }

  clearPassword (nextProps, props) {
    if (this.isToSuccess(nextProps, props)) {
      this.setState({ password: '', passwordNow: '' })
    }
  }

  writeMessage () {
    switch (this.props.passwordState) {
      case State.Success:
        return <p className="com success-message">
          {this.props.passwordMessage}
        </p>
      case State.Submitting:
        return <p>
          <Fa icon="spinner" animation="pulse"/>
          sending...
        </p>;
      case State.Fail:
        return <p className="com error-message">{this.props.passwordMessage}</p>
      case State.Waiting:
      default:
        return null;
    }
  }

  render () {
    let { passwordState, errors } = this.props;
    let { passwordNow, password } = this.state;

    return <section className="user-editor border-box-container">
      <div className="com border-box-container">
        <h1 className="com border-box-title-area">Change password</h1>
        <form className="com form-area">
          {writeInput(this, 'password', 'passwordNow', 'Old password', '', errors)}
          {writeInput(this, 'password', 'password', 'New password', '', errors)}
          <section className="com submit-section">
            <SubmitButton {...{
              state: passwordState,
              icon: "key",
              text: "Change",
              className: 'submit',
              onClick: ()=> this.dispatch('changePassword', this.passwordParams)
            }}/>
          </section>
          {this.writeMessage()}
        </form>
      </div>
    </section>
  }
}

class DisposerComponent extends ComponentComponent {
  constructor (props) {
    super(props);
    this.state = {
      yes: false
    }
  }

  destroy () {
    this.dispatch('destroy');
  }

  render () {
    let { destroyState } = this.props;
    let { yes } = this.state;

    return <section className="user-editor border-box-container">
      <div className="com border-box-container">
        <h1 className="com border-box-title-area">Dispose your account</h1>
        <div className="com form-area">
          <section className="user-editor dispose-verify">
            <label>
              <input type="checkbox" name="yes" checked={yes} onChange={()=> this.setState({ yes: !yes })}/>
              Ensure to dispose your account
            </label>
          </section>
          <section className="com submit-section">
            <SubmitButton {...{
              state: destroyState,
              icon: "trash",
              text: "Dispose",
              className: 'dispose',
              disabled: !yes,
              onClick: ()=> this.dispatch('destroy')
            }}/>
          </section>
        </div>
      </div>
    </section>
  }
}

class UserEditor {
  static start (dom) {
    let initial = new User(JSON.parse(dom.getAttribute('data-user')));
    ReactDOM.render(
      <article className="user-editor body">
        <div className="user-editor box-wrapper">
          <Context {...{ initial }}>
            <UserComponent/>
            <PasswordComponent/>
            <DisposerComponent/>
          </Context>
        </div>
      </article>
      , dom);
  }
}

window.UserEditor = UserEditor;
