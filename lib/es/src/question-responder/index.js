import { ContextComponent, ComponentComponent } from '../lib/parcel'
import API from '../lib/services/strike-api'
import { State } from '../lib/models/state'
import Fa from '../lib/fa'
import CommentEditor from '../lib/components/comment-editor'
import Assigner from '../lib/components/assigner'
import User from "../lib/models/user";
import Group from "../lib/models/group";
import SubmitButton from '../lib/components/submit-button'

class Context extends ContextComponent {
  succeed () {
    location.reload();
  }

  get questionId () {
    return this.props.questionId;
  }

  get groupId () {
    return this.props.groupId;
  }

  setBase (params) {
    params.groupId = this.groupId;
    params.questionId = this.questionId;
    return params;
  }

  answer (params) {
    this.submit(API.answerQuestion, this.setBase(params));
  }

  assign (params) {
    this.submit(API.assignUserQuestion, this.setBase(params));
  }

  sorry () {
    this.submit(API.sorryQuestion, this.setBase({}));
  }

  wait () {
    this.submit(API.waitAnswerQuestion, this.setBase({}));
  }

  submit (api, params) {
    this.setState({ state: State.Submitting });
    api(params)
      .then(()=> {
        this.succeed();
      })
      .catch(({ errors })=> {
        this.setState({ errors, state: State.Fail });
      });
  }

  listen (to) {
    to('answer', (params)=> {
      this.answer(params);
    });

    to('assign', (params)=> {
      this.assign(params);
    });

    to('sorry', ()=> {
      this.sorry();
    });
    to('wait', ()=> {
      this.wait();
    });
  }

  initialState (props) {
    return {
      state: State.Waiting,
      errors: {}
    }
  }
}

const Mode = {
  Answering: 'Answering',
  Assigning: 'Assigning'
}

class Component extends ComponentComponent {
  constructor (props) {
    super(props);
    this.state = {
      preview: false,
      markdown: '',
      assigned: [],
      mode: Mode.Answering
    }
  }

  writeResponder () {
    switch (this.state.mode) {
      case Mode.Answering:
        return this.writeAnswerArea()
      case Mode.Assigning:
        return this.writeAssignArea()
    }
  }

  get answerParams () {
    let { title, markdown, assigned } = this.state;
    return { title, markdown, assigned, questionId: null };
  }

  get assignParams () {
    let { title, markdown, assigned } = this.state;
    return { title, markdown, assigned, questionId: null };
  }

  writeAnswerArea () {
    let { errors, state } = this.props;
    let { markdown } = this.state;
    return <section>
      <CommentEditor {...{
        errors,
        markdown
      }} title="not required" onChange={(state)=> this.setState(state)}/>
      <section className="respond submit-section">
        <SubmitButton {...{
          state, icon: "hand-paper-o", text: "Answer", className: 'submit',
          onClick: ()=> this.dispatch('answer', this.answerParams)
        }}/>
      </section>
    </section>
  }

  writeAssignArea () {
    let { assigned } = this.state;
    let { user, group, errors, already, state } = this.props;
    return <section>
      <Assigner {...{
        errors,
        assigned,
        user,
        group,
        already
      }} onChange={(state)=> this.setState(state)}/>
      <section className="respond submit-section">
        <SubmitButton {...{
          state,
          icon: "hand-o-right",
          text: "Request to answer instead",
          className: 'submit',
          onClick: ()=> this.dispatch('assign', this.assignParams)
        }}/>
      </section>
    </section>
  }

  detectTabClass (base, mode) {
    return mode === this.state.mode
      ? `${base} tabnav-tab selected`
      : `${base} tabnav-tab`
  }

  changeMode (mode) {
    this.setState({ mode })
  }

  writeTitle () {
    if (this.props.responded) {
      return <h1 className="respond title">
        <Fa icon="reply "/>
        Answer
      </h1>
    } else {
      return <h1 className="respond title">
        <Fa icon="graduation-cap "/>
        You are requested to answer this question.
      </h1>
    }
  }

  writeResponderButton () {
    if (this.props.responded) {
      return null;
    }

    let { state } = this.props;

    return [
      <SubmitButton key="sorry" {...{
        state, icon: "paw", text: "力になれません", className: 'respond sorry',
        onClick: ()=> this.dispatch('sorry')
      }}/>,
      <SubmitButton key="wait" {...{
        state, icon: "clock-o", text: "すこし待ってて", className: 'respond wait',
        onClick: ()=> this.dispatch('wait')
      }}/>
    ]
  }

  render () {
    return <article className="respond body">
      <section className="respond box-body">
        {this.writeTitle()}
        <section className="respond response">
          <section className="respond response-type-area">
            <div className="tabnav">
              {this.writeResponderButton()}
              <nav className="tabnav-tabs">
                <a className={this.detectTabClass('respond answer-tab', Mode.Answering)}
                   onClick={()=> this.changeMode(Mode.Answering)}>
                  <Fa icon="thumbs-o-up"/>
                  Answer
                </a>
                <a className={this.detectTabClass('respond assign-tab', Mode.Assigning)}
                   onClick={()=> this.changeMode(Mode.Assigning)}>
                  <Fa icon="group"/>
                  Assign others who could answer
                </a>
              </nav>
            </div>
          </section>
          <section className="respond responder-area">
            {this.writeResponder()}
          </section>
        </section>
      </section>
    </article>
  }
}

export default class QuestionResponder {
  static start (dom) {
    let questionPage = dom.getAttribute('data-questionPage');
    let questionId = dom.getAttribute('data-questionId');
    let groupId = dom.getAttribute('data-groupId');
    let user = new User(JSON.parse(dom.getAttribute('data-user')));
    let group = new Group(JSON.parse(dom.getAttribute('data-group')));
    let already = JSON.parse(dom.getAttribute('data-already'));
    let responded = dom.getAttribute('data-responded') === 'true';

    ReactDOM.render(
      <Context {...{ questionId, user, group, already, responded, groupId }}>
        <Component/>
      </Context>
      , dom);
  }

  static opener (doms, params) {
    _.each(doms, (dom)=> {
      dom.addEventListener('click', (e)=> {
        this.start(e.target.parentNode, params);
      });
    });
  }
}

window.QuestionResponder = QuestionResponder;



