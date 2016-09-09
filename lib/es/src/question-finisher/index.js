
import {ContextComponent, ComponentComponent} from './lib/parcel'
import API from './lib/services/strike-api'
import {State} from './lib/models/state'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'

class Context extends ContextComponent {
  succeed() {
    location.reload();
  }

  get questionId() {
    return this.props.questionId;
  }

  get groupId() {
    return this.props.groupId;
  }

  setBase(params) {
    params.groupId = this.groupId;
    params.questionId = this.questionId;
    return params;
  }

  submit() {
    this.setState({state: State.Submitting});
    strike(Api.FinishQuestion, this.setBase({}))
      .then(()=> {
        this.succeed();
      })
      .catch(({errors})=> {
        this.setState({errors, state: State.Fail});
        this.succeed();
      });
  }

  listen(to) {
    to('submit', ()=> {
      this.submit();
    });
  }

  initialState(props) {
    return {}
  }
}

class Component extends ComponentComponent {
  render() {
    let {state} = this.props;

    return <article className="finish body">
      <section className="finish submit-area">
        <SubmitButton {...{
          state, icon: "thumbs-o-up", text: "質問を終了する", className: 'submit',
          onClick: ()=>this.dispatch('submit')
        }}/>
      </section>
    </article>
  }
}

export default class QuestionFinisher {
  static start(dom) {
    if (!dom) {
      return;
    }

    let questionId = dom.getAttribute('data-questionId');
    let groupId = dom.getAttribute('data-groupId');
    ReactDOM.render(
      <Context {...{questionId, groupId}}>
        <Component/>
      </Context>
      , dom);
  }
}

window.QuestionFinisher = QuestionFinisher;


