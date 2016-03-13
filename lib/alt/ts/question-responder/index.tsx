import {IAnswer} from "./lib/services/strike-api";
declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import {State} from './lib/models/state'
import Fa from './lib/fa'
import CommentEditor from './lib/components/comment-editor'
import Assigner from './lib/components/assigner'
import User from "./lib/models/user";
import Group from "./lib/models/group";
import SubmitButton from './lib/components/submit-button'

class Context extends Root {
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

  answer(params) {
    this.submit(Api.AnswerQuestion, this.setBase(params));
  }

  assign(params) {
    this.submit(Api.AssignUserQuestion, this.setBase(params));
  }

  sorry() {
    this.submit(Api.SorryQuestion, this.setBase({}));
  }

  wait() {
    this.submit(Api.WaitAnswerQuestion, this.setBase({}));
  }

  submit(api:Api, params?:any) {
    this.setState({state: State.Submitting});
    strike(api, params)
      .then(()=> {
        this.setState({state: State.Success});
        this.succeed();
      })
      .catch(({errors})=> {
        this.setState({errors, state: State.Fail});
      });
  }

  listen(to) {
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

  initialState(props) {
    return {
      state: State.Waiting,
      errors: {}
    }
  }
}

enum Mode{
  Answering,
  Assigning
}

class Component extends Node {
  private cm;

  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      markdown: '',
      assigned: [],
      mode: Mode.Answering
    }
  }

  writeResponder() {
    switch (this.state.mode) {
      case Mode.Answering:
        return this.writeAnswerArea()
      case Mode.Assigning:
        return this.writeAssignArea()
    }
  }

  get answerParams():IAnswer {
    let {title, markdown, assigned} = this.state;
    return {title, markdown, assigned, questionId: null};
  }

  get assignParams() {
    let {title, markdown, assigned} = this.state;
    return {title, markdown, assigned, questionId: null};
  }

  writeAnswerArea() {
    let {errors, state} = this.props;
    let {markdown} = this.state;
    return <section>
      <CommentEditor {...{errors, markdown}} title="not required" onChange={(state)=> this.setState(state)}/>
      <section className="respond submit-section">
        <SubmitButton {...{
          state, icon: "hand-paper-o", text: "この内容で回答する", className: 'submit',
          onClick: ()=> this.dispatch('answer', this.answerParams)
        }}/>
      </section>
    </section>
  }

  writeAssignArea() {
    let {assigned} = this.state;
    let {user, group, errors, already, state} = this.props;
    return <section>
      <Assigner {...{errors, assigned, user, group, already}} onChange={(state)=> this.setState(state)}/>
      <section className="respond submit-section">
        <SubmitButton {...{
          state, icon: "hand-o-right", text: "替わりにおねがいする", className: 'submit',
          onClick: ()=> this.dispatch('assign', this.assignParams)
        }}/>
      </section>
    </section>
  }

  detectTabClass(base:string, mode:Mode) {
    return mode === this.state.mode
      ? `${base} tabnav-tab selected`
      : `${base} tabnav-tab`
  }

  changeMode(mode:Mode) {
    this.setState({mode})
  }

  writeTitle() {
    if (this.props.responded) {
      return <h1 className="respond title">
        <Fa icon="reply "/>
        回答する
      </h1>
    } else {
      return <h1 className="respond title">
        <Fa icon="graduation-cap "/>
        回答をおねがいされています
      </h1>
    }
  }

  writeResponderButton() {
    if (this.props.responded) {
      return null;
    }

    let {state} = this.props;

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

  render() {
    if (this.props.state === State.Success) {
      return <article className="respond body">
        <section className="respond registered-body">
          <p className="respond registered-message">投稿完了しました</p>
        </section>
      </article>
    }

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
                  回答する
                </a>
                <a className={this.detectTabClass('respond assign-tab', Mode.Assigning)}
                   onClick={()=> this.changeMode(Mode.Assigning)}>
                  <Fa icon="group"/>
                  知ってそうな人を招待する
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
  static start(dom) {

    let questionPage = dom.getAttribute('data-questionPage');
    let questionId = dom.getAttribute('data-questionId');
    let groupId = dom.getAttribute('data-groupId');
    let user = new User(JSON.parse(dom.getAttribute('data-user')));
    let group = new Group(JSON.parse(dom.getAttribute('data-group')));
    let already = JSON.parse(dom.getAttribute('data-already'));
    let responded = dom.getAttribute('data-responded') === 'true';

    ReactDOM.render(
      <Context {...{questionId, user, group, already, responded, groupId}}>
      <Component/>
    </Context>
      , dom);
  }

  static opener(doms, params) {
    _.each(doms, (dom)=> {
      dom.addEventListener('click', (e)=> {
        this.start(e.target.parentNode, params);
      });
    });
  }
}

window.QuestionResponder = QuestionResponder;



