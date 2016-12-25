import { ContextComponent, ComponentComponent } from '../lib/parcel'
import API from '../lib/services/strike-api'
import { Condition } from '../lib/models/condition'
import Fa from '../lib/fa'
import CommentEditor from '../lib/components/comment-editor'
import SubmitButton from '../lib/components/submit-button'

class Context extends ContextComponent {
  succeed () {
    location.reload();
  }

  get commentId () {
    return this.props.commentId;
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
    params.commentId = this.commentId;
    return params;
  }

  submit (params) {
    this.setState({ state: Condition.Submitting });
    API.replyToReply(this.setBase(params))
      .then(()=> {
        this.succeed();
      })
      .catch(({ errors })=> {
        this.setState({ errors, state: Condition.Fail });
      });
  }

  listen (to) {
    to('submit', (params)=> {
      this.submit(params);
    });
  }

  initialState (props) {
    return {
      state: Condition.Waiting,
      errors: {}
    }
  }
}

class Component extends ComponentComponent {
  constructor (props) {
    super(props);
    this.state = {
      markdown: ''
    }
  }

  get params () {
    let { markdown } = this.state;
    return { markdown, commentId: null, questionId: null };
  }

  writeResponder () {
    let { errors, state } = this.props;
    let { markdown } = this.state;
    return <section>
      <CommentEditor {...{
        errors,
        markdown
      }} title="not required" onChange={(state)=> this.setState(state)}/>
      <section className="com submit-section">
        <SubmitButton {...{
          state,
          icon: "reply",
          text: "Reply or supplement",
          className: 'reply-to-reply submit',
          onClick: ()=>this.dispatch('submit', this.params)
        }}/>
      </section>
    </section>
  }

  render () {
    return <article className="reply-to-reply body">
      <section className="reply-to-reply responder-area">
        {this.writeResponder()}
      </section>
    </article>
  }
}

export default class ReplyToReply {
  static opener (doms) {
    _.each(doms, (dom)=> {
      let questionId = dom.getAttribute('data-questionId');
      let groupId = dom.getAttribute('data-groupId');
      let commentId = dom.getAttribute('data-commentId');
      let opened = false
      dom.addEventListener('click', (e)=> {
        if (opened) {
          return
        }
        opened = true
        dom.style.display = 'none'
        ReactDOM.render(
          <Context {...{ commentId, questionId, groupId }}>
            <Component/>
          </Context>
          , e.currentTarget.parentNode);
      });
    });
  }
}

window.ReplyToReply = ReplyToReply;
