declare const React;
declare const ReactDOM;
import {Root, Node} from '../eventer'
import {State} from '../models/state'
import Fa from '../fa'
import ErrorMessage from './error-message'

export default class InputForm extends Node {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue
    }
  }

  get className() {
    let {className, state} = this.props;
    return className + (state === State.Submitting ? ' sending' : ' ready');
  }

  get label() {
    let {label} = this.props;
    if (!label) {
      return null
    }

    return <label>{label}</label>
  }

  get error() {
    let {errors, name} = this.props;
    return <ErrorMessage {...{errors, name}}/>
  }

  render() {
    let {type, name, placeholder, value, onChange, errors} = this.props;

    let state = !!errors && !!errors[name] ? 'has-error' : 'calm';

    return <div className="input-form">
      {this.label}
      <input className={state} {...{type, name, placeholder, value, onChange: (e)=> onChange(e.target.value)}}/>
      {this.error}
    </div>
  }
}
