
import {ContextComponent, ComponentComponent} from '../parcel'
import {State} from '../models/state'
import Fa from '../fa'

export default class ErrorMessage extends ComponentComponent {
  wrap(errors) {
    switch (true) {
      case !errors:
        return [];
      case errors.map:
        return errors;
      default:
        return [errors]
    }
  }

  render() {
    let {errors, name} = this.props;
    if (!errors) {
      return null;
    }

    let myErrors = this.wrap(errors[name]);
    if (myErrors.length === 0) {
      return null;
    }

    return <ul className="error-messages">
      {myErrors.map((error, i)=> <li className="error-message" key={i}>{error}</li>)}
    </ul>
  }

}