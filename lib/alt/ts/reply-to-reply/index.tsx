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

  get commentId() {
    return this.props.commentId;
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
    params.commentId = this.commentId;
    return params;
  }

  submit(params) {
    this.setState({state: State.Submitting});
    strike(Api.ReplyToReply, this.setBase(params))
      .then(()=> {
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
      state: State.Waiting,
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

  get params() {
    let {markdown} = this.state;
    return {markdown, commentId: null, questionId: null};
  }

  writeResponder() {
    let {errors, state} = this.props;
    let {markdown} = this.state;
    return <section>
      <CommentEditor {...{errors, markdown}} title="not required" onChange={(state)=> this.setState(state)}/>
      <section className="com submit-section">
        <SubmitButton {...{
          state, icon: "reply", text: "返信、または補足する", className: 'reply-to-reply submit',
          onClick: ()=>this.dispatch('submit', this.params)
        }}/>
      </section>
    </section>
  }

  render() {
    return <article className="reply-to-reply body">
      <section className="reply-to-reply responder-area">
        {this.writeResponder()}
      </section>
    </article>
  }
}

export default class ReplyToReply {
  static opener(doms) {
    _.each(doms, (dom)=> {
      let questionId = dom.getAttribute('data-questionId');
      let groupId = dom.getAttribute('data-groupId');
      let commentId = dom.getAttribute('data-commentId');
      dom.addEventListener('click', (e)=> {
        ReactDOM.render(<Context {...{commentId, questionId, groupId}}>
          <Component/>
        </Context>, e.target.parentNode);
      });
    });
  }


}

window.ReplyToReply = ReplyToReply;
