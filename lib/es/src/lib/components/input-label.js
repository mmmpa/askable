import { Component, h, render, cloneElement } from 'preact';
const React = { createElement: h, cloneElement}

const defaultProps = {
  label: 'label'
}

function InputLabel (props) {
  let { label } = props
  return label
    ? (<label className="input-label">{label}</label>)
    : null
}

InputLabel.defaultProps = defaultProps

export default InputLabel
