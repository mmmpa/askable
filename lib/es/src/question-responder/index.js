import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';
import User from '../lib/models/user';
import Group from '../lib/models/group';

import Fa from '../lib/components/fa';
import CommentEditor from '../lib/components/comment-editor';
import Assigner from '../lib/components/assigner';
import SubmitButton from '../lib/components/submit-button';

export default class QuestionResponder {
  static start (dom) {
    // const questionPage = dom.getAttribute('data-questionPage');
    const questionId = dom.getAttribute('data-questionId');
    const groupId = dom.getAttribute('data-groupId');
    const user = new User(JSON.parse(dom.getAttribute('data-user')));
    const group = new Group(JSON.parse(dom.getAttribute('data-group')));
    const already = JSON.parse(dom.getAttribute('data-already'));
    const responded = dom.getAttribute('data-responded') === 'true';

    ReactDOM.render(
      <Context {...{ questionId, user, group, already, responded, groupId }}>
        <Component />
      </Context>
      , dom);
  }

  static opener (doms, params) {
    doms.forEach((dom) => {
      let started = false;

      dom.addEventListener('click', (e) => {
        if (started) {
          return;
        }
        started = true;
        this.start(e.target.parentNode, params);
      });
    });
  }
}

window.QuestionResponder = QuestionResponder;

const Mode = {
  Answering: 'Answering',
  Assigning: 'Assigning',
};

function ResponderTitle (props) {
  if (props.responded) {
    return (
      <h1 className="respond title">
        <Fa icon="reply " />
        Answer
      </h1>
    );
  }

  return (
    <h1 className="respond title">
      <Fa icon="graduation-cap " />
      You are requested to answer this question.
    </h1>
  );
}

@feeder
export class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
    errors: {},
  };

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
  answer (params) {
    this.submit(API.answerQuestion, this.setBase(params));
  }

  @bind
  assign (params) {
    this.submit(API.assignUserQuestion, this.setBase(params));
  }

  @bind
  sorry () {
    this.submit(API.sorryQuestion, this.setBase({}));
  }

  @bind
  wait () {
    this.submit(API.waitAnswerQuestion, this.setBase({}));
  }

  submit (api, params) {
    this.setState({ condition: Condition.Submitting });
    api(params)
      .then(() => {
        location.reload();
      })
      .catch(({ errors }) => {
        this.setState({ errors, condition: Condition.Fail });
      });
  }

  listen (to) {
    to('answer', this.answer);
    to('assign', this.assign);
    to('sorry', this.sorry);
    to('wait', this.wait);
  }
}

@eater
export class Component extends React.Component {
  state = {
    preview: false,
    markdown: '',
    assigned: [],
    mode: Mode.Answering,
  };

  get responder () {
    return this.state.mode === Mode.Answering
      ? this.answerArea
      : this.assignArea;
  }

  get answerParams () {
    const { title, markdown, assigned } = this.state;
    return { title, markdown, assigned, questionId: null };
  }

  get assignParams () {
    const { title, markdown, assigned } = this.state;
    return { title, markdown, assigned, questionId: null };
  }

  get answerArea () {
    const {
      errors,
      condition,
    } = this.props;

    const { markdown } = this.state;

    return (
      <section>
        <CommentEditor
          errors={errors}
          markdown={markdown}
          onChange={s => this.setState(s)}
        />
        <section className="respond submit-section">
          <SubmitButton
            className="submit"
            icon="hand-paper-o"
            text="Answer"
            condition={condition}
            onClick={this.answer}
          />
        </section>
      </section>
    );
  }

  get assignArea () {
    const {
      condition,
      errors,
      user,
      group,
      already,
    } = this.props;

    const {
      assigned,
    } = this.state;

    return (
      <section>
        <Assigner
          assigned={assigned}
          errors={errors}
          user={user}
          group={group}
          already={already}
          onChange={this.assign}
        />
        <section className="respond submit-section">
          <SubmitButton
            className="submit"
            icon="hand-o-right"
            text="Request to answer instead"
            condition={condition}
            onClick={this.request}
          />
        </section>
      </section>
    );
  }

  detectTabClass (base, mode) {
    return mode === this.state.mode
      ? `${base} tabnav-tab selected`
      : `${base} tabnav-tab`;
  }

  changeMode (mode) {
    this.setState({ mode });
  }

  @bind
  wait () {
    this.dispatch('wait');
  }

  @bind
  sorry () {
    this.dispatch('sorry');
  }

  @bind
  request () {
    this.dispatch('assign', this.assignParams);
  }

  @bind
  assign (assigned) {
    this.setState({ assigned });
  }

  @bind
  answer () {
    this.dispatch('answer', this.answerParams);
  }

  render () {
    const {
      condition,
      responded,
    } = this.props;

    return (
      <article className="respond body">
        <section className="respond box-body">
          <ResponderTitle
            responded={responded}
          />
          <section className="respond response">
            <section className="respond response-type-area">
              <div className="tabnav">
                <SubmitButton
                  className="respond sorry"
                  icon="paw"
                  text="Sorry, I have no idea."
                  condition={condition}
                  onClick={this.sorry}
                />
                <SubmitButton
                  className="respond wait"
                  icon="clock-o"
                  text="Wait a moment."
                  condition={condition}
                  onClick={this.wait}
                />
                <nav className="tabnav-tabs">
                  <button
                    type="button"
                    className={this.detectTabClass('respond answer-tab', Mode.Answering)}
                    onClick={() => this.changeMode(Mode.Answering)}
                  >
                    <Fa icon="thumbs-o-up" />
                    Answer
                  </button>
                  <button
                    type="button"
                    className={this.detectTabClass('respond assign-tab', Mode.Assigning)}
                    onClick={() => this.changeMode(Mode.Assigning)}
                  >
                    <Fa icon="group" />
                    Assign others who could answer
                  </button>
                </nav>
              </div>
            </section>
            <section className="respond responder-area">
              {this.responder}
            </section>
          </section>
        </section>
      </article>
    );
  }
}
