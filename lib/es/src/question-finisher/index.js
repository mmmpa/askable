import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';
import SubmitButton from '../lib/components/submit-button';

export default class QuestionFinisher {
  static start (dom) {
    if (!dom) {
      return;
    }

    const questionId = dom.getAttribute('data-questionId');
    const groupId = dom.getAttribute('data-groupId');

    ReactDOM.render(
      <Context {...{ questionId, groupId }}>
        <Component />
      </Context>
      , dom);
  }
}

window.QuestionFinisher = QuestionFinisher;

@feeder
export class Context extends React.Component {
  setBase (params) {
    const { groupId, questionId } = this;
    return Object.assign({}, params, { groupId, questionId });
  }

  get questionId () {
    return this.props.questionId;
  }

  get groupId () {
    return this.props.groupId;
  }

  @bind
  submit () {
    this.setState({ condition: Condition.Submitting });
    API.finishQuestion(this.setBase({}))
      .then(() => {
        location.reload();
      })
      .catch(({ errors }) => {
        this.setState({ errors, condition: Condition.Fail });
        this.succeed();
      });
  }

  listen (to) {
    to('submit', this.submit);
  }
}

@eater
export class Component extends React.Component {
  @bind
  submit () {
    this.dispatch('submit');
  }

  render () {
    const { condition } = this.props;

    return (
      <article className="finish body">
        <section className="finish submit-area">
          <SubmitButton
            className="submit"
            icon="thumbs-o-up"
            text="Close this question !"
            condition={condition}
            onClick={this.submit}
          />
        </section>
      </article>
    );
  }
}
