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
  get invitationId() {
    return this.props.invitationId;
  }

  succeed(){
    location.reload();
  }

  setBase(params) {
    params.invitationId = this.invitationId;
    return params;
  }

  submit(api:Api) {
    this.setState({state: State.Submitting});
    strike(api, this.setBase({}))
      .then(()=> {
        let result = this.resultMessage(api);
        location.reload();
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, state: State.Fail});
      });
  }

  resultMessage(api){
    switch(api){
      case Api.AcceptInvitation:
        return '参加しました';
      case Api.RejectInvitation:
        return 'ことわりました';
      case Api.BlockInvitation:
        return 'ブロックしました'
    }
  }

  listen(to) {
    to('accept', ()=> {
      this.submit(Api.AcceptInvitation);
    });

    to('reject', ()=> {
      this.submit(Api.RejectInvitation);
    });

    to('block', ()=> {
      this.submit(Api.BlockInvitation);
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

  writeForm() {
    let {state} = this.props;

    return <section className="reactor body">
      <SubmitButton {...{
        state, icon: "thumbs-o-up", text: "参加する", className: 'submit',
        onClick: ()=>this.dispatch('accept')
      }}/>
      <SubmitButton {...{
        state, icon: "trash", text: "ことわる", className: 'reject',
        onClick: ()=>this.dispatch('reject')
      }}/>
      <SubmitButton {...{
        state, icon: "ban", text: "ブロック", className: 'block',
        onClick: ()=>this.dispatch('block')
      }}/>
    </section>
  }

  writeResult() {
    return <section className="reactor body">
      <div className="com success-message reactor completed">{this.props.result}</div>
    </section>
  }

  render() {
    switch (this.props.state) {
      case State.Success:
        return this.writeResult();
      case State.Submitting:
      case State.Waiting:
      case State.Fail:
      default:
        return this.writeForm();
    }
  }
}

class InvitationReactor {
  static start(doms) {
    if (!doms) {
      return;
    }

    _.each(doms, (dom)=> {
      let invitationId = dom.getAttribute('data-id');
      ReactDOM.render(
        <Context {...{invitationId}}>
          <Component/>
        </Context>
        , dom);
    })
  }
}

window.InvitationReactor = InvitationReactor;


