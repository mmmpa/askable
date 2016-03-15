declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import {State} from './lib/models/state'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'

class Context extends Root {
  get messageId() {
    return this.props.messageId;
  }

  succeed() {
    location.href = '/m/index'
  }

  setBase(params) {
    params.messageId = this.messageId;
    return params;
  }

  submit() {
    this.setState({state: State.Submitting});
    strike(Api.DisposeMessage, this.setBase({}))
      .then(()=> {
        this.succeed();
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, state: State.Fail});
      });
  }

  listen(to) {
    to('dispose', ()=> {
      this.submit();
    });
  }

  initialState(props) {
    return {
      state: State.Waiting
    }
  }
}


class Component extends Node {
  constructor(props) {
    super(props);
  }

  render() {
    let {state} = this.props;

    return <SubmitButton {...{
      state, icon: "ban", text: "メッセージを削除する", className: 'dispose',
      onClick: ()=>this.dispatch('dispose')
    }}/>
  }
}

class MessageDisposer {
  static start(dom) {
    if (!dom) {
      return;
    }

    let messageId = dom.getAttribute('data-id');

    ReactDOM.render(
      <Context {...{messageId}}>
        <Component/>
      </Context>
      , dom);
  }
}

window.MessageDisposer = MessageDisposer;


