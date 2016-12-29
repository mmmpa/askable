import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';
import SubmitButton from '../lib/components/submit-button';

export default class MessageDisposer {
  static start (dom) {
    if (!dom) {
      return;
    }

    const messageId = dom.getAttribute('data-id');

    ReactDOM.render(
      <Context {...{ messageId }}>
        <Component />
      </Context>
      , dom);
  }
}

window.MessageDisposer = MessageDisposer;

@feeder
export class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
  };

  setBase (params) {
    const { messageId } = this;
    return Object.assign({}, params, { messageId });
  }

  get messageId () {
    return this.props.messageId;
  }

  @bind
  submit () {
    this.setState({ condition: Condition.Submitting });
    API.disposeMessage(this.setBase({}))
      .then(() => {
        location.href = '/m/index';
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
export class Component {
  @bind
  submit () {
    this.dispatch('submit');
  }

  render () {
    const { condition } = this.props;

    return (
      <SubmitButton
        className="dispose"
        icon="ban"
        text="Delete this message"
        condition={condition}
        onClick={this.submit}
      />
    );
  }
}
