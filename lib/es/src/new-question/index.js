import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';

import CommentEditor from '../lib/components/comment-editor';
import Assigner from '../lib/components/assigner';
import User from '../lib/models/user';
import Group from '../lib/models/group';
import SubmitButton from '../lib/components/submit-button';

window.NewQuestion = class {
  static start (dom) {
    const questionPage = dom.getAttribute('data-questionPage');
    const groupId = dom.getAttribute('data-groupId');
    const user = new User(JSON.parse(dom.getAttribute('data-user')));
    const group = new Group(JSON.parse(dom.getAttribute('data-group')));
    const props = { questionPage, user, group, groupId };

    ReactDOM.render(
      <Context {...props}>
        <Component />
      </Context>
      , dom);
  }
};

@feeder
class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
    errors: {},
  };

  setBase (params) {
    const { groupId } = this;
    return Object.assign({}, params, { groupId });
  }

  get groupId () {
    return this.props.groupId;
  }

  succeed (questionId) {
    location.href = this.props.questionPage.replace(':questionId', questionId);
  }

  @bind
  submit (params) {
    this.setState({ condition: Condition.Submitting });

    API.createQuestion(this.setBase(params))
      .then(({ id }) => {
        this.succeed(id);
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
    preview: false,
    markdown: '',
    title: '',
    assigned: [],
  };

  get params () {
    const {
      title,
      markdown,
      assigned,
    } = this.state;

    return { title, markdown, assigned };
  }

  @bind
  submit () {
    this.dispatch('submit', this.params);
  }

  @bind
  assign (assigned) {
    this.setState({ assigned });
  }

  render () {
    const { condition } = this.props;

    const {
      errors,
      user,
      group,
    } = this.props;

    const {
      assigned,
    } = this.state;

    return (
      <article className="new-question body">
        <section className="new-question box-body">
          <div className="columns">
            <section className="new-question editor-area">
              <CommentEditor
                errors={errors}
                onChange={s => this.setState(s)}
              />
              <div className="inner form">
                <section className="new-question submit-section">
                  <SubmitButton
                    className="submit"
                    icon="plus-circle"
                    text="Ask"
                    condition={condition}
                    onClick={this.submit}
                  />
                </section>
              </div>
            </section>
            <section className="new-question assigning-area">
              <Assigner
                assigned={assigned}
                errors={errors}
                user={user}
                group={group}
                onChange={this.assign}
              />
            </section>
          </div>
        </section>
      </article>
    );
  }
}
