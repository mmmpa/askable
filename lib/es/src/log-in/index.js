import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';

import SubmitButton from '../lib/components/submit-button';
import InputSection from '../lib/components/input-section';
import ConditionMessage from '../lib/components/condition-message';
import SmallFormBox from '../lib/components/small-form-box';

export default class LogIn {
  static start (dom) {
    ReactDOM.render(
      <Context>
        <Component />
      </Context>
      , dom);
  }
}

window.LogIn = LogIn;

const conditionMessages = {
  [Condition.Success]: 'Signed in.',
  [Condition.Submitting]: 'Submitting...',
  [Condition.Fail]: "Couldn't sign in.",
  [Condition.Waiting]: null,
  [Condition.Retrying]: null,
};

@feeder
export class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
    loggedIn: false,
  };

  listen (to) {
    to('submit', p => this.submit(p));
  }

  submit (params) {
    this.setState({ condition: Condition.Submitting });
    API
      .logIn(params)
      .then(() => {
        this.setState({ condition: Condition.Success });
        location.reload();
      })
      .catch(() => {
        this.setState({ condition: Condition.Fail });
      });
  }
}

@eater
export class Component extends React.Component {
  state = {
    login: '',
    password: '',
  };

  get params () {
    const {
      login,
      password,
    } = this.state;

    return { login, password };
  }

  @bind
  submit () {
    this.dispatch('submit', this.params);
  }

  render () {
    const {
      login,
      password,
    } = this.state;

    const { condition } = this.props;

    const messageProps = {
      condition,
      messages: conditionMessages,
    };

    return (
      <article className="user-log-in body">
        <SmallFormBox
          title="Sign in"
        >
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
          <ConditionMessage {...messageProps} />
        </SmallFormBox>
      </article>
    );
  }
}
