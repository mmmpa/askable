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

  submit() {
    this.setState({state: State.Submitting});
    strikeApi(Api.FinishQuestion, this.setBase({}))
      .then(()=> {
        this.setState({state: State.Success});
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

class Component extends Node {
  writeSubmit() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="new-question sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </button>;
      case State.Success:
        return null;
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="new-question submit"
                       onClick={()=> this.dispatch('submit')}>
          <Fa icon="hand-paper-o"/>
          質問を終了する
        </button>;
    }
  }

  render() {
    if (this.props.state === State.Success) {
      return <article className="finish body">
        <section className="finish registered-body">
          <p className="finish registered-message">送信完了しました</p>
        </section>
      </article>
    }

    return <article className="finish body">
      <section className="finish submit-area">
        {this.writeSubmit()}
      </section>
    </article>
  }
}

class QuestionFinisher {
  static start(dom:HTMLElement, {closed, questionId, groupId}) {
    if (!dom) {
      return;
    }
    if (closed) {
      dom.parentNode.removeChild(dom);
      return;
    }
    ReactDOM.render(<Context {...{questionId, groupId}}>
      <Component/>
    </Context>, dom);
  }
}

window.QuestionFinisher = QuestionFinisher;


