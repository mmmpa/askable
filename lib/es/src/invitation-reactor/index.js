import { ContextComponent, ComponentComponent } from '../lib/parcel'
import API from '../lib/services/strike-api'
import { State } from '../lib/models/state'
import Fa from '../lib/fa'
import SubmitButton from '../lib/components/submit-button'

class Context extends ContextComponent {
  get invitationId () {
    return this.props.invitationId
  }

  succeed () {
    location.reload()
  }

  setBase (params) {
    params.invitationId = this.invitationId
    return params
  }

  submit (api) {
    this.setState({ state: State.Submitting })
    api(this.setBase({}))
      .then(()=> {
        let result = this.resultMessage(api)
        location.reload()
      })
      .catch((result)=> {
        let { errors } = result
        this.setState({ errors, state: State.Fail })
      })
  }

  resultMessage (api) {
    switch (api) {
      case API.acceptInvitation:
        return 'Joined'
      case API.rejectInvitation:
        return 'Rejected'
      case API.blockInvitation:
        return 'Blocked'
    }
  }

  listen (to) {
    to('accept', ()=> this.submit(API.acceptInvitation))
    to('reject', ()=> this.submit(API.rejectInvitation))
    to('block', ()=> this.submit(API.blockInvitation))
  }

  initialState (props) {
    return {
      state: State.Waiting
    }
  }
}

class Component extends ComponentComponent {
  constructor (props) {
    super(props)
  }

  writeForm () {
    let { state } = this.props

    return <section className="reactor body">
      <SubmitButton {...{
        state, icon: "thumbs-o-up", text: "Accept", className: 'submit',
        onClick: ()=>this.dispatch('accept')
      }}/>
      <SubmitButton {...{
        state, icon: "trash", text: "Reject", className: 'reject',
        onClick: ()=>this.dispatch('reject')
      }}/>
      <SubmitButton {...{
        state, icon: "ban", text: "Block", className: 'reject',
        onClick: ()=>this.dispatch('block')
      }}/>
    </section>
  }

  writeResult () {
    return <section className="reactor body">
      <div className="com success-message reactor completed">{this.props.result}</div>
    </section>
  }

  render () {
    switch (this.props.state) {
      case State.Success:
        return this.writeResult()
      case State.Submitting:
      case State.Waiting:
      case State.Fail:
      default:
        return this.writeForm()
    }
  }
}

class InvitationReactor {
  static start (doms) {
    if (!doms) {
      return
    }

    doms.forEach((dom)=> {
      let invitationId = dom.getAttribute('data-id')
      ReactDOM.render(
        <Context {...{ invitationId }}>
          <Component/>
        </Context>
        , dom)
    })
  }
}

window.InvitationReactor = InvitationReactor


