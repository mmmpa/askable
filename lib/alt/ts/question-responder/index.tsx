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
import Team from "./lib/models/team";

enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

class Context extends Root {
  children(props) {
    return <Component {...props}/>;
  }

  succeed() {
    location.reload();
  }

  submitAnswer(params:IAnswer) {
    this.submit(Api.AssignUserQuestion, params);
  }

  submitAssign(params:IAssign) {
    this.submit(Api.AssignUserQuestion, params);
  }

  submitSorry() {
    this.submit(Api.SorryQuestion);
  }

  submitWait() {
    this.submit(Api.WaitAnswerQuestion);
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
      state: 'ready',
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

  get answerParams():ICreateQuestion {
    let {title, markdown, assigned} = this.state;
    return {title, markdown, assigned};
  }

  get assignParams():ICreateQuestion {
    let {title, markdown, assigned} = this.state;
    return {title, markdown, assigned};
  }

\
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
    let {user, team} = this.props;
    return <section>
      <Assigner {...{assigned, user, team}} onChange={(state)=> this.setState(state)}/>
      <section className="respond submit-section">
        {this.writeSubmitAssign()}
      </section>
    </section>
  }

  writeSubmitAssign() {
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
        return <button className="respond submit"
                       onClick={()=> this.dispatch('submitAssign', this.assignParams)}>
          <Fa icon="hand-paper-o"/>
          替わりにおねがいする
        </button>;
    }
  }

  writeSubmitAnswer() {
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
        return <button className="respond submit"
                       onClick={()=> this.dispatch('submitAnswer', this.answerParams)}>
          <Fa icon="hand-paper-o"/>
          この内容で回答する
        </button>;
    }
  }

  detectTabClass(mode:Mode) {
    return mode === this.state.mode
      ? 'tabnav-tab selected'
      : 'tabnav-tab'
  }

  changeMode(mode:Mode) {
    this.setState({mode})
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
        <h1 className="respond title">
          <Fa icon="graduation-cap "/>
          回答をおねがいされています
        </h1>
        <section className="respond response">
          <section className="respond response-type-area">
            <div className="tabnav">
              <a className="respond sorry" onClick={()=> this.dispatch('submitWait')}>
                <Fa icon="paw"/>
                すこし待ってて
              </a>
              <a className="respond sorry" onClick={()=> this.dispatch('submitSorry')}>
                <Fa icon="paw"/>
                力になれません
              </a>
              <nav className="tabnav-tabs">
                <a className={this.detectTabClass(Mode.Answering)}
                   onClick={()=> this.changeMode(Mode.Answering)}>
                  <Fa icon="thumbs-o-up"/>
                  回答する
                </a>
                <a className={this.detectTabClass(Mode.Assigning)}
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
  static start(dom:HTMLElement, questionId, userJson, teamJson) {
    let user = new User(userJson);
    let team = new Team(teamJson);
    ReactDOM.render(<Context {...{questionId, user, team}}/>, dom);
  }
}

window.QuestionResponder = QuestionResponder;


