import React from '../react';

const defaultProps = {
  label: '',
  htmlFor: '_',
};

function InputLabel (props) {
  const {
    label,
    htmlFor,
  } = props;

  return label
    ? (<label className="input-label" htmlFor={htmlFor}>{label}</label>)
    : null;
}

InputLabel.defaultProps = defaultProps;

export default InputLabel;
