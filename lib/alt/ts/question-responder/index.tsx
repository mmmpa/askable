import {IAnswer} from "./lib/services/strike-api";
declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import {Api, strikeApi, IAssign, IAnswer, IWait, ISorry} from './lib/services/strike-api'
import CommentEditor from './lib/components/comment-editor'
import Assigner from './lib/components/assigner'
import User from "./lib/models/user";
import Group from "./lib/models/group";

enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

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

  setBase(params){
    params.groupId = this.groupId;
    params.questionId = this.questionId;
    return params;
  }

  submitAnswer(params:IAnswer) {
    this.submit(Api.AnswerQuestion, this.setBase(params));
  }

  submitAssign(params:IAssign) {
    this.submit(Api.AssignUserQuestion, this.setBase(params));
  }

  submitSorry() {
    this.submit(Api.SorryQuestion, this.setBase({}));
  }

  submitWait() {
    this.submit(Api.WaitAnswerQuestion, this.setBase({}));
  }

  submit(api:Api, params?:any) {
    this.setState({state: State.Submitting});
    strikeApi(api, params)
      .then(()=> {
        this.setState({state: State.Success});
        this.succeed();
      })
      .catch(({errors})=> {
        this.setState({errors, state: State.Fail});
      });
  }

  listen(to) {
    to('submitAnswer', (params)=> {
      this.submitAnswer(params);
    });

    to('submitAssign', (params)=> {
      this.submitAssign(params);
    });

    to('submitSorry', ()=> {
      this.submitSorry();
    });
    to('submitWait', ()=> {
      this.submitWait();
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
  Assigning,
  Sorrying
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

  get assignParams():IAssign {
    let {title, markdown, assigned} = this.state;
    return {title, markdown, assigned, questionId: null};
  }

  writeAnswerArea() {
    let {errors} = this.props;
    let {markdown} = this.state;
    return <section>
      <CommentEditor {...{errors, markdown}} title="not required" onChange={(state)=> this.setState(state)}/>
      <section className="respond submit-section">
        {this.writeSubmitAnswer()}
      </section>
    </section>
  }

  writeAssignArea() {
    let {assigned} = this.state;
    let {user, group, errors, already} = this.props;
    return <section>
      <Assigner {...{errors, assigned, user, group, already}} onChange={(state)=> this.setState(state)}/>
      <section className="respond submit-section">
        {this.writeSubmitAssign()}
      </section>
    </section>
  }

  writeSubmit(text:string, onClick:()=>void) {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="respond sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </button>;
      case State.Success:
        return null;
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="respond submit" onClick={onClick}>
          <Fa icon="hand-paper-o"/>
          {text}
        </button>;
    }
  }

  writeSubmitAssign() {
    return this.writeSubmit('替わりにおねがいする',
      ()=> this.dispatch('submitAssign', this.assignParams));
  }

  writeSubmitAnswer() {
    return this.writeSubmit('この内容で回答する',
      ()=> this.dispatch('submitAnswer', this.answerParams));
  }

  detectTabClass(base:string, mode:Mode) {
    return mode === this.state.mode
      ? `${base} tabnav-tab selected`
      : `${base} tabnav-tab`
  }

  changeMode(mode:Mode) {
    this.setState({mode})
  }

  writeButton(text:string, name:string, icon:string, onClick:()=>void) {
    switch (this.props.state) {
      case State.Submitting:
        return <button className={`respond ${name} sending`} disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </button>;
      case State.Success:
        return null;
      case State.Waiting:
      case State.Fail:
      default:
        return <button className={`respond ${name}`} onClick={onClick}>
          <Fa icon={icon}/>
          {text}
        </button>;
    }
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
    return [
      this.writeButton('力になれません', 'sorry', 'paw',
        ()=> this.dispatch('submitSorry')),
      this.writeButton('すこし待ってて', 'wait', 'clock-o',
        ()=> this.dispatch('submitWait'))
    ]
  }

  writeOpener() {
    return <article className="respond body">
      <button className="respond opener" onClick={()=> this.setState({opened: true})}>
        <Fa icon="folder-open-o"/>
        回答フォームを表示する
      </button>
    </article>
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

class QuestionResponder {
  static start(dom:HTMLElement, {closed, questionId, user, group, already, responded, groupId}) {
    let user = new User(user);
    let group = new Group(group);
    ReactDOM.render(<Context {...{questionId, user, group, already, responded, groupId}}>
      <Component/>
    </Context>, dom);
  }

  static opener(doms, params) {
    if (closed) {
      _.each(doms, (dom)=> dom.parentNode.removeChild(dom));
      return;
    }

    _.each(doms, (dom)=> {
      dom.addEventListener('click', (e)=> {
        this.start(e.target.parentNode, params);
      });
    });
  }
}

window.QuestionResponder = QuestionResponder;



