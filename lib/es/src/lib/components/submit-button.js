import { Condition } from '../models/condition'
import Fa from '../fa'

export default class SubmitButton {
  get className () {
    let { className, condition } = this.props;
    return className + (condition === Condition.Submitting ? ' sending' : ' ready');
  }

  render () {
    let { text, onClick, icon, condition, disabled } = this.props;
    let { className } = this;

    switch (condition) {
      case Condition.Submitting:
        return <button className={this.className} disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          {text}
        </button>;
      case Condition.Success:
      case Condition.Waiting:
      case Condition.Fail:
      default:
        return <button {...{
          className, disabled, onClick: (e) => {
            e.preventDefault()
            onClick(e)
          }
        }}>
          <Fa icon={icon}/>
          {text}
        </button>;
    }
  }
}
