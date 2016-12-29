import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition, isToSuccess } from '../lib/models/condition';

import SubmitButton from '../lib/components/submit-button';
import InputForm from '../lib/components/input-form';
import ConditionMessage from '../lib/components/condition-message';

const conditionMessages = {
  [Condition.Success]: 'Invited the user.',
  [Condition.Submitting]: 'Submitting...',
  [Condition.Fail]: "Couldn't invite.",
  [Condition.Waiting]: null,
  [Condition.Retrying]: null,
};

export default class InvitationCreator {
  static start (dom) {
    if (!dom) {
      return;
    }

    const groupId = dom.getAttribute('data-id');
    ReactDOM.render(
      <Context {...{ groupId }}>
        <Component />
      </Context>
      , dom);
  }
}

window.InvitationCreator = InvitationCreator;

@feeder
export class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
  };

  setBase (params) {
    const { groupId } = this;
    return Object.assign({}, params, { groupId });
  }

  get groupId () {
    return this.props.groupId;
  }

  @bind
  submit (params) {
    this.setState({ condition: Condition.Submitting });

    API.invite(this.setBase(params))
      .then((result) => {
        this.setState({
          result,
          errors: {},
          condition: Condition.Success,
        });
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
export class Component extends React.Component {
  state = {
    login: '',
  };

  componentWillUpdate (props) {
    if (isToSuccess(props, this.props)) {
      this.setState({ login: '' });
    }
  }

  get params () {
    return { login: this.state.login };
  }

  @bind
  submit () {
    this.dispatch('submit', this.params);
  }

  render () {
    const { login } = this.state;
    const {
      condition,
      errors,
    } = this.props;

    const messageProps = {
      condition,
      messages: conditionMessages,
    };

    return (
      <section className="invitation body">
        <form className="invitation input-area">
          <section className="invitation login-area">
            <InputForm
              type="text"
              name="login"
              placeholder="Target user's sign in ID"
              value={login}
              errors={errors}
              onChange={(_, v) => this.setState({ login: v })}
            />
          </section>
          <SubmitButton
            className="submit"
            icon="envelope-o"
            text="Invite"
            condition={condition}
            onClick={this.submit}
          />
          <div className="invitation message-area">
            <ConditionMessage {...messageProps} />
          </div>
        </form>
      </section>
    );
  }
}
