
import {ContextComponent, ComponentComponent} from '../lib/parcel'
import API from '../lib/services/strike-api'
import {State} from '../lib/models/condition'
import Fa from '../lib/fa'
import SubmitButton from '../lib/components/submit-button'

class Context extends ContextComponent {
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
    this.setState({condition: Condition.Submitting});
    strike(Api.DisposeMessage, this.setBase({}))
      .then(()=> {
        this.succeed();
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, condition: Condition.Fail});
      });
  }

  listen(to) {
    to('dispose', ()=> {
      this.submit();
    });
  }

  initialState(props) {
    return {
      condition: Condition.Waiting
    }
  }
}

class Component extends ComponentComponent {
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


