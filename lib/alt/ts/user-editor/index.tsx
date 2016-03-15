declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import {State} from './lib/models/state'
import Fa from './lib/fa'
import User from './lib/models/user'
import SubmitButton from './lib/components/submit-button'
import InputForm from './lib/components/input-form'
import {writeInput} from './lib/helpers/input-writer'

enum Target{
  User,
  Password,
  Disposer
}

class Context extends Root {
  destroySucceed() {
    location.reload();
  }

  update(params) {
    this.setState({state: State.Submitting});
    strike(Api.UpdateUser, params)
      .then((result)=> {
        let user = new User(result);
        this.setState({result, user, errors: {}, state: State.Success});
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, state: State.Fail});
      });
  }

  changePassword(params) {
    this.setState({state: State.Submitting});
    strike(Api.ChangePassword, params)
      .then((result)=> {
        this.setState({result, errors: {}, state: State.Success});
      })
      .catch((result)=> {
        let {errors} = result;
        errors.passwordNow = errors.password_now
        this.setState({errors, state: State.Fail});
      });
  }

  destroy() {
    this.setState({state: State.Submitting});
    strike(Api.DestroyUser)
      .then((result)=> {
        this.destroySucceed();
        this.setState({result, errors: {}, state: State.Success});
      })
      .catch((result)=> {
        let {errors} = result;
        this.setState({errors, state: State.Fail});
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
      state: State.Waiting,
      targetNow: null,
      user: props.initial,
      errors: {}
    }
  }
}

class UserComponent extends Node {
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

  render() {
    let {state, targetNow, errors} = this.props;
    let {name, login, email} = this.state;

    return <section className="com border-box-container">
      <h1 className="com border-box-title-area">登録内容の変更</h1>
      <div className="com form-area">
        {writeInput(this, 'text', 'name', '表示する名前', '表示する名前', errors)}
        {writeInput(this, 'text', 'login', 'ログイン用ID', 'ログイン用ID', errors)}
        {writeInput(this, 'text', 'email', 'メールアドレス', 'メールアドレス', errors)}
        <section className="com submit-section">
          <SubmitButton {...{
            state, targetNow, icon: "send-o", text: "変更する", className: 'submit', target: Target.User,
            onClick: ()=>this.dispatch('update', this.updatingParams)
          }}/>
        </section>
      </div>
    </section>
  }
}
class PasswordComponent extends Node {
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

  render() {
    let {state, targetNow, errors} = this.props;
    let {passwordNow, password} = this.state;

    return <section className="com border-box-container">
      <h1 className="com border-box-title-area">パスワードの変更</h1>
      <div className="com form-area">
        {writeInput(this, 'password', 'passwordNow', '旧パスワード', '旧パスワード', errors)}
        {writeInput(this, 'password', 'password', '新パスワード', '新パスワード', errors)}
        <section className="com submit-section">
          <SubmitButton {...{
            state, targetNow, icon: "key", text: "パスワードを変更する", className: 'submit', target: Target.Password,
            onClick: ()=> this.dispatch('changePassword', this.passwordParams)
          }}/>
        </section>
      </div>
    </section>
  }
}

class DisposerComponent extends Node {
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
    let {state,  targetNow} = this.props;
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
            state, targetNow, icon: "trash", text: "アカウントを削除する", className: 'dispose', disabled: !yes, target: Target.Disposer,
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


