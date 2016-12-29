import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';
import CommentEditor from '../lib/components/comment-editor';
import SubmitButton from '../lib/components/submit-button';

window.ReplyToReply = class {
  static opener (doms) {
    doms.forEach((dom) => {
      const questionId = dom.getAttribute('data-questionId');
      const groupId = dom.getAttribute('data-groupId');
      const commentId = dom.getAttribute('data-commentId');

      let opened = false;

      dom.addEventListener('click', () => {
        if (opened) {
          return;
        }
        opened = true;

        ReactDOM.render(
          <Context {...{ commentId, questionId, groupId }}>
            <Component />
          </Context>
          , dom.parentNode);

        dom.parentNode.removeChild(dom);
      });
    });
  }
};

@feeder
class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
    errors: {},
  };

  setBase (params) {
    const { groupId, questionId, commentId } = this;
    return Object.assign({}, params, { groupId, questionId, commentId });
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

  @bind
  submit (params) {
    this.setState({ condition: Condition.Submitting });
    API.replyToReply(this.setBase(params))
      .then(() => {
        location.reload();
      })
      .catch(({ errors }) => {
        this.setState({ errors, condition: Condition.Fail });
      });
  }

  listen (to) {
    to('submit', this.submit);
  }
}

@eater
class Component extends React.Component {
  state = {
    markdown: '',
  };

  get params () {
    const { markdown } = this.state;
    return { markdown, commentId: null, questionId: null };
  }

  @bind
  submit () {
    this.dispatch('submit', this.params);
  }

  render () {
    const { errors, condition } = this.props;
    const { markdown } = this.state;

    return (
      <article className="reply-to-reply body">
        <section className="reply-to-reply responder-area">
          <section>
            <CommentEditor
              errors={errors}
              markdown={markdown}
              onChange={s => this.setState(s)}
            />
            <section className="com submit-section">
              <SubmitButton
                className="reply-to-reply submit"
                icon="reply"
                text="Reply or supplement"
                condition={condition}
                onClick={this.submit}
              />
            </section>
          </section>
        </section>
      </article>
    );
  }
}
