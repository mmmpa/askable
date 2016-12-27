import { feeder, eater } from '../lib/decorators'
import API from '../lib/services/strike-api'
import { Condition } from '../lib/models/condition'
import Fa from '../lib/components/fa'
import SubmitButton from '../lib/components/submit-button'

@feeder
class Context extends React.Component {
  componentWillMount () {
    this.setState({
      condition: Condition.Waiting
    })
  }

  get invitationId () {
    return this.props.invitationId
  }

  setBase (params) {
    params.invitationId = this.invitationId
    return params
  }

  submit (api) {
    this.setState({ condition: Condition.Submitting })
    api(this.setBase({}))
      .then(()=> {
        location.reload()
      })
      .catch((result)=> {
        let { errors } = result
        this.setState({ errors, condition: Condition.Fail })
      })
  }

  listen (to) {
    to('accept', ()=> this.submit(API.acceptInvitation))
    to('reject', ()=> this.submit(API.rejectInvitation))
    to('block', ()=> this.submit(API.blockInvitation))
  }
}

@eater
class Component extends React.Component {
  writeForm () {
    let { state } = this.props

    return <section className="reactor body">
      <SubmitButton {...{
        state,
        icon: "thumbs-o-up",
        text: "Accept",
        className: 'submit',
        onClick: () => this.dispatch('accept')
      }}/>
      <SubmitButton {...{
        state,
        icon: "trash",
        text: "Reject",
        className: 'reject',
        onClick: () => this.dispatch('reject')
      }}/>
      <SubmitButton {...{
        state,
        icon: "ban",
        text: "Block",
        className: 'reject',
        onClick: () => this.dispatch('block')
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
      case Condition.Success:
        return this.writeResult()
      case Condition.Submitting:
      case Condition.Waiting:
      case Condition.Fail:
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


