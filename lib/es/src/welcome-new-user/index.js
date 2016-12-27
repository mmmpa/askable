import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';

import Fa from '../lib/components/fa';
import SubmitButton from '../lib/components/submit-button';
import InputSection from '../lib/components/input-section';
import ConditionMessage from '../lib/components/condition-message';

window.Welcome = class {
  static start (dom) {
    ReactDOM.render(
      <Context>
        <Component />
      </Context>
      , dom);
  }
};

const conditionMessages = {
  [Condition.Success]: null,
  [Condition.Submitting]: 'Submitting...',
  [Condition.Fail]: "Couldn't sign up.",
  [Condition.Waiting]: null,
  [Condition.Retrying]: null,
};

@feeder
class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
  };

  @bind
  submit (params) {
    this.setState({ condition: Condition.Submitting });

    API
      .createUser(params)
      .then((result) => {
        this.setState({ result, errors: {}, condition: Condition.Success });
      })
      .catch((result) => {
        const { errors } = result;
        this.setState({ errors, condition: Condition.Fail });
      });
  }

  listen (to) {
    to('submit', this.submit);
  }
}

@eater
class Component extends React.Component {
  state = {
    name: '',
    login: '',
    email: '',
    password: '',
  };

  get params () {
    const {
      name,
      login,
      email,
      password,
    } = this.state;

    return { name, login, email, password };
  }

  @bind
  submit () {
    this.dispatch('submit', this.params);
  }

  get form () {
    const {
      condition,
      errors,
    } = this.props;

    const {
      name,
      login,
      email,
      password,
    } = this.state;

    const messageProps = {
      condition,
      messages: conditionMessages,
    };

    return (
      <article className="user-register body">
        <section className="com border-box-container">
          <h1 className="com border-box-title-area">Sign up</h1>
          <form className="com form-area">
            <InputSection
              type="text"
              name="name"
              placeholder="Display name"
              value={name}
              errors={errors}
              onChange={(_, v) => this.setState({ name: v })}
            />
            <InputSection
              type="text"
              name="login"
              placeholder="ID"
              value={login}
              errors={errors}
              onChange={(_, v) => this.setState({ login: v })}
            />
            <InputSection
              type="text"
              name="email"
              placeholder="E-mail address"
              value={email}
              errors={errors}
              onChange={(_, v) => this.setState({ email: v })}
            />
            <InputSection
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              errors={errors}
              onChange={(_, v) => this.setState({ password: v })}
            />
            <section className="com submit-section">
              <SubmitButton
                className="submit"
                icon="send-o"
                text="Sign up !"
                condition={condition}
                onClick={this.submit}
              />
            </section>
          </form>
          <ConditionMessage {...messageProps} />
        </section>
      </article>
    );
  }

  get result () {
    const {
      name,
      login,
      email,
    } = this.props.result || {};

    return (
      <article className="user-registered body">
        <section className="com border-box-container">
          <h1 className="com border-box-title-area">Completed to sign up</h1>
          <div className="com form-area">
            <ResultSection name="Display name" value={name} />
            <ResultSection name="ID to sign in" value={login} />
            <ResultSection name="E-mail address" value={email} />
            <section className="user-registered link-section">
              <a href="/in" className="link ready">
                <Fa icon="sign-in" />
                Sign in
              </a>
            </section>
          </div>
        </section>
      </article>
    );
  }

  render () {
    const { condition } = this.props;

    return condition === Condition.Success
      ? this.result
      : this.form;
  }
}

function ResultSection (props) {
  const {
    name,
    value,
  } = props;

  return (
    <section className="com input-section">
      <h1 className="user-registered info-label">{name}</h1>
      <p className="user-registered info">{value}</p>
    </section>
  );
}
