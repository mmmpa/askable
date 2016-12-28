import React from '../react';
import { Condition } from '../models/condition';
import Fa from './fa';

const defaultProps = {
  condition: Condition.Waiting,
  messages: {},
};

function ConditionMessage (props) {
  const {
    condition,
    messages,
  } = props;

  const message = messages[condition];

  if (!message && message !== '') {
    return null;
  }

  switch (condition) {
    case Condition.Success:
      return (
        <p className="com message-area success-message">{message}</p>
      );
    case Condition.Submitting:
      return (
        <p className="com message-area sending-message">
          <Fa icon="spinner" animation="pulse" />
          {message}
        </p>
      );
    case Condition.Fail:
      return (
        <p className="com message-area error-message">{message}</p>
      );
    case Condition.Waiting:
      return (
        <p className="com message-area waiting-message">{message}</p>
      );
    case Condition.Retrying:
      return (
        <p className="com message-area retrying-message">{message}</p>
      );
    default:
      return null;
  }
}

ConditionMessage.defaultProps = defaultProps;

export default ConditionMessage;
