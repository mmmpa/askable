declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import {Api, strikeApi, ICreateQuestion} from './lib/services/strike-api'
import CommentEditor from './lib/components/comment-editor'
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

  succeed(questionId) {
    document.location = this.props.questionPage.replace(':questionId', questionId);
  }

  submit(params:ICreateQuestion) {
    this.setState({state: State.Submitting});
    strikeApi(Api.createQuestion, params)
      .then(({id})=> {
        this.setState({state: State.Success});
        this.succeed(id);
      })
      .catch(({errors})=> {
        this.setState({errors, state: State.Fail});
      });
  }

  listen(to) {
    to('submit', (params)=> {
      this.submit(params);
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
    }
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
                       onClick={()=> this.dispatch('submit', this.params)}>
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
              <a className="respond sorry" href="#">
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
                  <Fa icon="hand-o-right"/>
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


