import React from '../react';

const defaultProps = {
  name: '',
  errors: {},
};

function ErrorMessages (props) {
  const errors = props.errors[props.name];

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <ul className="error-messages">
      {errors.map(error => <li className="error-message">{error}</li>)}
    </ul>
  );
}

ErrorMessages.defaultProps = defaultProps;

export default ErrorMessages;
