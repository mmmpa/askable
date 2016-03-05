import {IAnswer} from "./lib/services/strike-api";
declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import {Api, strikeApi, IReplyToReply} from './lib/services/strike-api'
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

  get commentId() {
    return this.props.commentId;
  }

  get questionId() {
    return this.props.questionId;
  }

  submit(params:IReplyToReply) {
    params.commentId = this.commentId;
    params.questionId = this.questionId;

    this.setState({state: State.Submitting});
    strikeApi(Api.ReplyToReply, params)
      .then(()=> {
        this.setState({state: State.Success});
        this.succeed();
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

class Component extends Node {
  private cm;

  constructor(props) {
    super(props);
    this.state = {
      markdown: ''
    }
  }

  get params():IReplyToReply {
    let {markdown} = this.state;
    return {markdown, commentId: null, questionId: null};
  }

  writeResponder() {
    let {errors} = this.props;
    let {markdown} = this.state;
    return <section>
      <CommentEditor {...{errors, markdown}} title="not required" onChange={(state)=> this.setState(state)}/>
      <section className="reply-to-reply submit-section">
        {this.writeSubmit()}
      </section>
    </section>
  }

  writeSubmit() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="reply-to-reply sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </button>;
      case State.Success:
        return null;
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="reply-to-reply submit" onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="hand-paper-o"/>
          返信、もしくは補足する
        </button>;
    }
  }

  render() {
    if (this.props.state === State.Success) {
      return <article className="reply-to-reply body">
        <section className="reply-to-reply registered-body">
          <p className="reply-to-reply registered-message">投稿完了しました</p>
        </section>
      </article>
    }

    return <article className="reply-to-reply body">
      <section className="reply-to-reply responder-area">
        {this.writeResponder()}
      </section>
    </article>
  }
}

class ReplyToReply {
  static opener(doms, {closed, questionId}) {
    if (closed) {
      _.each(doms, (dom)=> dom.parentNode.parentNode.removeChild(dom.parentNode));
      return;
    }

    _.each(doms, (dom)=> {
      let commentId = dom.getAttribute('data-id');
      dom.addEventListener('click', (e)=> {
        ReactDOM.render(<Context {...{commentId, questionId}}/>, e.target.parentNode);
      });
    });
  }


}

window.ReplyToReply = ReplyToReply;
