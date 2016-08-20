import { ContextComponent, ComponentComponent } from './lib/parcel'
import API from './lib/services/strike-api'
import { State } from './lib/models/state'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'
import InputForm from './lib/components/input-form'
import ErrorMessage from './lib/components/error-message'

class Context extends ContextComponent {
  get groupId () {
    return this.props.groupId;
  }

  setBase (params) {
    params.groupId = this.groupId;
    return params;
  }

  submit (params) {
    this.setState({ state: State.Submitting });
    API.invite(this.setBase(params))
      .then((result)=> {
        this.setState({ result, errors: {}, state: State.Success });
      })
      .catch((result)=> {
        let { errors } = result;
        this.setState({ errors, state: State.Fail });
      });
  }

  listen (to) {
    to('submit', (params)=> {
      this.submit(params);
    });
  }

  initialState (props) {
    return {
      state: State.Waiting
    }
  }
}


class Component extends ComponentComponent {
  constructor (props) {
    super(props);
    this.state = {
      login: ''
    }
  }

  get params () {
    return { login: this.state.login }
  }

  componentWillUpdate (props) {
    if (this.props.state !== State.Success && props.state === State.Success) {
      this.setState({ login: '' })
    }
  }

  writeResult () {
    switch (this.props.state) {
      case State.Success:
        return <div className="invitation message-area">
          <p className="com success-message">招待しました</p>
        </div>;
      case State.Submitting:
        return <div className="invitation message-area"/>;
      case State.Waiting:
        return null;
      case State.Fail:
      default:
        let { errors } = this.props;
        let name = 'any';
        return <div className="invitation message-area">
          <ErrorMessage {...{ errors, name }}/>
        </div>;
    }
  }

  render () {
    let { login } = this.state;
    let { state } = this.props;

    return <section className="invitation body">
      <div className="invitation input-area">
        <section className="invitation login-area">
          <InputForm {...{
            type: 'text', name: 'login', placeholder: '対象ユーザーのログインId', value: login,
            onChange: (v)=> this.setState({ login: v })
          }}/>
        </section>
        <SubmitButton {...{
          state, icon: "thumbs-o-up", text: "招待する", className: 'submit',
          onClick: ()=>this.dispatch('submit', this.params)
        }}/>
        {this.writeResult()}
      </div>
    </section>
  }
}

class InvitationCreator {
  static start (dom) {
    if (!dom) {
      return;
    }

    let groupId = dom.getAttribute('data-id');
    ReactDOM.render(
      <Context {...{ groupId }}>
        <Component/>
      </Context>
      , dom);
  }
}

window.InvitationCreator = InvitationCreator;


