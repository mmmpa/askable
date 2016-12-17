
import {ContextComponent, ComponentComponent} from '../lib/parcel'
import API from '../lib/services/strike-api'
import {State} from '../lib/models/state'
import Fa from '../lib/fa'
import User from '../lib/models/user'
import SubmitButton from '../lib/components/submit-button'
import InputForm from '../lib/components/input-form'
import {writeInput} from '../lib/helpers/input-writer'

enum Target{
  User,
  Password,
  Disposer
}

class Context extends ContextComponent {
  destroySucceed() {
    location.reload();
  }

  target(api) {
    this.setState({targetNow: this.detectTarget(api)});
  }

  detectTarget(api) {
    switch (api) {
      case Api.UpdateUser:
        return Target.User;
      case Api.ChangePassword:
        return Target.Password;
      case Api.DestroyUser:
        return Target.Disposer;
      default:
        return null;
    }
  }

  update(params) {
    this.setState({updatingState: State.Submitting, updatingMessage: ''});
    this.target(Api.UpdateUser);
    strike(Api.UpdateUser, params)
      .then((result)=> {
        let user = new User(result);
        this.setState({result, user, errors: {}, updatingState: State.Success, updatingMessage: '更新に成功しました'});
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, updatingState: State.Fail, passwordMessage: '更新に成功しました'});
      });
  }

  changePassword(params) {
    this.setState({passwordState: State.Submitting, passwordMessage: ''});
    this.target(Api.ChangePassword);
    strike(Api.ChangePassword, params)
      .then((result)=> {
        this.setState({result, errors: {}, passwordState: State.Success, passwordMessage: '更新に成功しました'});
      })
      .catch((result)=> {
        let {errors} = result;
        errors.passwordNow = errors.password_now
        this.setState({errors, passwordState: State.Fail, passwordMessage: 'エラーがあります'});
      });
  }

  destroy() {
    this.setState({destroyState: State.Submitting});
    this.target(Api.DestroyUser);
    strike(Api.DestroyUser)
      .then((result)=> {
        this.destroySucceed();
      })
      .catch((result)=> {
        let {errors} = result;
        this.setState({errors, destroyState: State.Fail});
      });
  }

  listen(to) {
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

  initialState(props) {
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
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      login: '',
      email: '',
    }
  }

  get updatingParams() {
    let {name, login, email} = this.state;
    return {name, login, email};
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillUpdate(props, state) {
    this.updateState(props, this.props);
  }

  isToSuccess(nextProps, props?) {
    if (!props) {
      return nextProps.state === State.Success;
    }
    return props.state !== State.Success && nextProps.state === State.Success
  }

  updateState(nextProps, props?) {
    if (props && (nextProps === props || !this.isToSuccess(nextProps, props))) {
      return;
    }

    let {name, login, email} = nextProps.user;
    this.setState({name, login, email})
  }

  writeMessage() {
    switch (this.props.updatingState) {
      case State.Success:
        return <p className="com success-message">{this.props.updatingMessage}</p>;
      case State.Submitting:
        return <p>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </p>;
      case State.Fail:
        return <p className="com error-message">{this.props.updatingMessage}</p>;s
      case State.Waiting:
      default:
        return null;
    }
  }

  render() {
    let {updatingState, errors} = this.props;
    let {name, login, email} = this.state;

    return <section className="com border-box-container">
      <h1 className="com border-box-title-area">登録内容の変更</h1>
      <form className="com form-area">
        {writeInput(this, 'text', 'name', '表示する名前', '表示する名前', errors)}
        {writeInput(this, 'text', 'login', 'ログイン用ID', 'ログイン用ID', errors)}
        {writeInput(this, 'text', 'email', 'メールアドレス', 'メールアドレス', errors)}
        <section className="com submit-section">
          <SubmitButton {...{
            state: updatingState, icon: "send-o", text: "変更する", className: 'submit',
            onClick: ()=>this.dispatch('update', this.updatingParams)
          }}/>
        </section>
        {this.writeMessage()}
      </form>
    </section>
  }
}

class PasswordComponent extends ComponentComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordNow: '',
    }
  }

  get passwordParams() {
    let {passwordNow, password} = this.state;
    return {passwordNow, password};
  }

  componentDidMount() {
    this.clearPassword(this.props);
  }

  componentWillUpdate(props, state) {
    this.clearPassword(props, this.props);
  }

  isToSuccess(nextProps, props?) {
    if (!props) {
      return nextProps.state === State.Success;
    }
    return props.state !== State.Success && nextProps.state === State.Success
  }

  clearPassword(nextProps, props?) {
    if (this.isToSuccess(nextProps, props)) {
      this.setState({password: '', passwordNow: ''})
    }
  }

  writeMessage() {
    switch (this.props.passwordState) {
      case State.Success:
        return <p className="com success-message">{this.props.passwordMessage}</p>
      case State.Submitting:
        return <p>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </p>;
      case State.Fail:
        return <p className="com error-message">{this.props.passwordMessage}</p>
      case State.Waiting:
      default:
        return null;
    }
  }


  render() {
    let {passwordState, errors} = this.props;
    let {passwordNow, password} = this.state;

    return <section className="com border-box-container">
      <h1 className="com border-box-title-area">パスワードの変更</h1>
      <form className="com form-area">
        {writeInput(this, 'password', 'passwordNow', '旧パスワード', '旧パスワード', errors)}
        {writeInput(this, 'password', 'password', '新パスワード', '新パスワード', errors)}
        <section className="com submit-section">
          <SubmitButton {...{
            state: passwordState, icon: "key", text: "パスワードを変更する", className: 'submit',
            onClick: ()=> this.dispatch('changePassword', this.passwordParams)
          }}/>
        </section>
        {this.writeMessage()}
      </form>
    </section>
  }
}

class DisposerComponent extends ComponentComponent {
  constructor(props) {
    super(props);
    this.state = {
      yes: false
    }
  }

  destroy() {
    this.dispatch('destroy');
  }

  render() {
    let {destroyState} = this.props;
    let {yes} = this.state;

    return <section className="com border-box-container">
      <h1 className="com border-box-title-area">アカウントの削除</h1>
      <div className="com form-area">
        <section className="user-editor dispose-verify">
          <label>
            <input type="checkbox" name="yes" checked={yes} onChange={()=> this.setState({yes: !yes})}/>
            本当に削除する
          </label>
        </section>
        <section className="com submit-section">
          <SubmitButton {...{
            state: destroyState, icon: "trash", text: "アカウントを削除する", className: 'dispose', disabled: !yes,
            onClick: ()=> this.dispatch('destroy')
          }}/>
        </section>
      </div>
    </section>
  }
}

class UserEditor {
  static start(dom:HTMLElement) {
    let initial = new User(JSON.parse(dom.getAttribute('data-user')));
    ReactDOM.render(
      <article className="user-editor body">
        <Context {...{initial}}>
          <UserComponent/>
          <PasswordComponent/>
          <DisposerComponent/>
        </Context>
      </article>
      , dom);
  }
}

window.UserEditor = UserEditor;


