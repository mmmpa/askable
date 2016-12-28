import React from '../react';
import ReactDOM from '../react-dom';

import { Condition } from '../models/condition'
import Fa from './fa'

function SubmitButton (props) {
  const {
    text,
    onClick,
    icon,
    condition,
    disabled,
    className: classBase
  } = props;

  const className = classBase + (condition === Condition.Submitting ? ' sending' : ' ready')

  const buttonProps = {
    className,
    disabled,
    onClick: (e) => {
      e.preventDefault()
      onClick(e)
    }
  }

  switch (condition) {
    case Condition.Submitting:
      return (
        <button
          className={className}
          disabled={true}
        >
          <Fa icon="spinner" animation="pulse"/>
          {text}
        </button>
      )
    case Condition.Success:
    case Condition.Waiting:
    case Condition.Fail:
    default:
      return (
        <button {...buttonProps}>
          <Fa icon={icon}/>
          {text}
        </button>
      )
  }
}

export default SubmitButton
