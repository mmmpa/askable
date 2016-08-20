import {ContextComponent, ComponentComponent} from '../parcel'
import {State} from '../models/state'
import Fa from '../fa'

export default class SubmitButton extends ComponentComponent {
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
          <Fa icon={icon} animation="pulse"/>
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
