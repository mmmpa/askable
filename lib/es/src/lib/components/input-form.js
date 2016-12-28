import { bind } from 'decko';
import React from '../react';

import InputLabel from './input-label';
import ErrorMessage from './error-message';

const defaultProps = {
  name: '',
  label: null,
  type: 'text',
  value: '',
  onChange: () => null,
  errors: {},
};

export default class InputForm {
  get inputProps () {
    const {
      type,
      name,
      value,
      placeholder,
      errors,
    } = this.props;

    return {
      type,
      name,
      value,
      placeholder,
      onChange: this.onChange,
      className: !!errors && !!errors[name] ? 'has-error' : 'calm',
    };
  }

  @bind
  onChange (e) {
    this.props.onChange(e, e.target.value);
  }

  render () {
    return (
      <div className="input-form">
        <InputLabel {...this.props} />
        <input {...this.inputProps} />
        <ErrorMessage {...this.props} />
      </div>
    );
  }
}

InputForm.defaultProps = defaultProps;
