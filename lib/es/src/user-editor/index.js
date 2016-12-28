import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition, isToSuccess } from '../lib/models/condition';
import User from '../lib/models/user';

import SubmitButton from '../lib/components/submit-button';
import InputSection from '../lib/components/input-section';
import ConditionMessage from '../lib/components/condition-message';
import SmallFormBox from '../lib/components/small-form-box';

window.UserEditor = class {
  static start (dom) {
    const user = new User(JSON.parse(dom.getAttribute('data-user')));
    ReactDOM.render(
      <article className="user-editor body">
        <div className="user-editor box-wrapper">
          <Context
            user={user}
          >
            <UserComponent />
            <PasswordComponent />
            <DisposerComponent />
          </Context>
        </div>
      </article>
      , dom);
  }
};

const updatingConditionMessages = {
  [Condition.Success]: 'Updated !',
  [Condition.Submitting]: 'Submitting...',
  [Condition.Fail]: "Couldn't update.",
  [Condition.Waiting]: null,
  [Condition.Retrying]: null,
};

function UserFormContainer (props) {
  return (
    <section className="user-editor border-box-container">
      <SmallFormBox {...props} />
    </section>
  );
}

@feeder
class Context extends React.Component {
  state = {
    updatingCondition: Condition.Waiting,
    passwordCondition: Condition.Waiting,
    destroyCondition: Condition.Waiting,
    user: {},
    updatingErrors: {},
    passwordErrors: {},
  }

  componentWillMount () {
    this.setState({
      user: this.props.user,
    });
  }

  @bind
  update (params) {
    this.setState({ updatingCondition: Condition.Submitting, updatingMessage: '' });

    API.updateUser(params)
      .then((result) => {
        const user = new User(result);
        this.setState({
          result,
          user,
          updatingErrors: {},
          updatingCondition: Condition.Success,
        });
      })
      .catch((result) => {
        const { errors } = result;
        this.setState({
          updatingErrors: errors,
          updatingCondition: Condition.Fail,
        });
      });
  }

  @bind
  updatePassword (params) {
    this.setState({ passwordCondition: Condition.Submitting, passwordMessage: '' });

    API.updatePassword(params)
      .then((result) => {
        this.setState({
          result,
          passwordErrors: {},
          passwordCondition: Condition.Success,
        });
      })
      .catch((result) => {
        const { errors } = result;
        errors.passwordNow = errors.password_now;
        this.setState({
          passwordErrors: errors,
          passwordCondition: Condition.Fail,
        });
      });
  }

  @bind
  destroy () {
    this.setState({ destroyCondition: Condition.Submitting });

    API.destroyUser()
      .then(() => {
        location.reload();
      })
      .catch((result) => {
        const { errors } = result;
        this.setState({ errors, destroyCondition: Condition.Fail });
      });
  }

  listen (to) {
    to('update', this.update);
    to('destroy', this.destroy);
    to('updatePassword', this.updatePassword);
  }
}

@eater
class UserComponent extends React.Component {
  state = {
    name: '',
    login: '',
    email: '',
  };

  componentDidMount () {
    this.updateState(this.props);
  }

  componentWillUpdate (props) {
    this.updateState(props, this.props);
  }

  updateState (nextProps, props) {
    if (!nextProps.user) {
      return;
    }
    if (props && !isToSuccess(nextProps, props)) {
      return;
    }

    const {
      name,
      login,
      email,
    } = nextProps.user;

    this.setState({ name, login, email });
  }

  get updatingParams () {
    const {
      name,
      login,
      email,
    } = this.state;

    return { name, login, email };
  }

  @bind
  submit () {
    this.dispatch('update', this.updatingParams);
  }

  render () {
    const {
      updatingCondition,
      updatingErrors,
    } = this.props;

    const {
      name,
      login,
      email,
    } = this.state;

    const messageProps = {
      condition: updatingCondition,
      messages: updatingConditionMessages,
    };

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
          errors={updatingErrors}
          onChange={(_, v) => this.setState({ name: v })}
        />
        <InputSection
          type="text"
          name="login"
          placeholder="ID"
          label="ID"
          value={login}
          errors={updatingErrors}
          onChange={(_, v) => this.setState({ login: v })}
        />
        <InputSection
          type="text"
          name="email"
          placeholder="E-mail address"
          label="E-mail address"
          value={email}
          errors={updatingErrors}
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
        <ConditionMessage {...messageProps} />
      </UserFormContainer>
    );
  }
}

@eater
class PasswordComponent extends React.Component {
  state = {
    password: '',
    passwordNow: '',
  };

  componentDidMount () {
    this.clearPassword(this.props);
  }

  componentWillUpdate (props) {
    this.clearPassword(props, this.props);
  }

  clearPassword (nextProps, props) {
    if (isToSuccess(nextProps, props, 'passwordCondition')) {
      this.setState({ password: '', passwordNow: '' });
    }
  }

  get passwordParams () {
    const {
      passwordNow,
      password,
    } = this.state;

    return { passwordNow, password };
  }

  @bind
  submit () {
    this.dispatch('updatePassword', this.passwordParams);
  }

  render () {
    const {
      passwordCondition,
      passwordErrors,
    } = this.props;

    const {
      passwordNow,
      password,
    } = this.state;

    const messageProps = {
      condition: passwordCondition,
      messages: updatingConditionMessages,
    };

    return (
      <UserFormContainer
        title="Change password"
      >
        <InputSection
          type="password"
          name="passwordNow"
          placeholder="Old password"
          value={passwordNow}
          errors={passwordErrors}
          onChange={(_, v) => this.setState({ passwordNow: v })}
        />
        <InputSection
          type="password"
          name="password"
          placeholder="New password"
          value={password}
          errors={passwordErrors}
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
        <ConditionMessage {...messageProps} />
      </UserFormContainer>
    );
  }
}

@eater
class DisposerComponent extends React.Component {
  state = {
    yes: false,
  };

  @bind
  toggle () {
    this.setState({ yes: !this.state.yes });
  }

  @bind
  submit () {
    this.dispatch('destroy');
  }

  render () {
    const { destroyCondition } = this.props;
    const { yes } = this.state;

    return (
      <UserFormContainer
        title="Dispose your account"
      >
        <section className="user-editor dispose-verify">
          <label htmlFor="ensureDisposing">
            <input
              id="ensureDisposing"
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
    );
  }
}
