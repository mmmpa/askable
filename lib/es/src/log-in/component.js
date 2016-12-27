import { bind } from 'decko';
import { eater } from '../lib/decorators/feeder';
import React from '../lib/react';

import { Condition } from '../lib/models/condition';

import SubmitButton from '../lib/components/submit-button';
import InputSection from '../lib/components/input-section';
import ConditionMessage from '../lib/components/condition-message';

const conditionMessages = {
  [Condition.Success]: 'Signed in.',
  [Condition.Submitting]: 'Submitting...',
  [Condition.Fail]: "Couldn't sign in.",
  [Condition.Waiting]: null,
  [Condition.Retrying]: null,
};

@eater
class Component extends React.Component {
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
          <ConditionMessage {...messageProps} />
        </section>
      </article>
    );
  }
}

export default Component;
