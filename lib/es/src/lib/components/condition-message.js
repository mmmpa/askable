import { Condition } from '../models/condition'
import Fa from '../fa'

const StateMessage = props => {
  const {
    condition,
    message
  } = props

  switch (condition) {
    case Condition.Success:
      return (
        <p className="com success-message">{message}</p>
      )
    case Condition.Submitting:
      return (
        <p className="com sending-message">
          <Fa icon="spinner" animation="pulse"/>
          sending...
        </p>
      )
    case Condition.Fail:
      return (
        <p className="com error-message">{message}</p>
      )
    case Condition.Waiting:
    default:
      return null
  }
}

export default StateMessage
