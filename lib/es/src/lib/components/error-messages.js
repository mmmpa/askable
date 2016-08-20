import {ContextComponent, ComponentComponent} from '../parcel'
import Fa from '../fa'

export default class ErrorMessages extends ComponentComponent {
  render(){
    let errors = this.props.errors[this.props.name];

    if (!errors || errors.length === 0) {
      return null
    }

    return <ul className="error-messages">
      {errors.map((error)=>{
        return <li className="error-message">{error}</li>
        })}
    </ul>
  }
}