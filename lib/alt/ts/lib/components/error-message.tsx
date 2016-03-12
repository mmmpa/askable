declare const React;
declare const ReactDOM;
declare const _;

import {Root, Node} from '../eventer'
import {State} from '../models/state'
import Fa from '../fa'

export default class ErrorMessage extends Node {
  wrap(errors) {
    switch(true){
      case _.isArray(errors):
        return errors;
      case !errors:
        return [];
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
      {myErrors.map((error)=> <li className="error-message">{error}</li>)}
    </ul>
  }

}