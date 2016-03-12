declare const React;
declare const ReactDOM;
import {Root, Node} from '../eventer'
import {State} from '../models/state'
import Fa from '../fa'

export default class SubmitButton extends Node {
  get className() {
    let {className, state} = this.props;
    return className + (state === State.Submitting ? ' sending' : ' ready');
  }

  render() {
    let {text, onClick, icon, state, disabled} = this.props;
    let {className} = this;

    switch (state) {
      case State.Submitting:
        return <button className={this.className} disabled={true}>
          <Fa icon={icon}/>
          {text}
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button {...{className, disabled, onClick}}>
        <Fa icon={icon}/>
          {text}
        </button>;
    }
  }
}
