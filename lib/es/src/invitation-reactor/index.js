import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';

import SubmitButton from '../lib/components/submit-button';

export default class InvitationReactor {
  static start (doms) {
    if (!doms) {
      return;
    }

    doms.forEach((dom) => {
      const invitationId = dom.getAttribute('data-id');
      ReactDOM.render(
        <Context {...{ invitationId }}>
          <Component />
        </Context>
        , dom);
    });
  }
}

window.InvitationReactor = InvitationReactor;

@feeder
export class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
  };

  setBase (params = {}) {
    const { invitationId } = this;
    return Object.assign({}, params, { invitationId });
  }

  get invitationId () {
    return this.props.invitationId;
  }

  submit (api) {
    this.setState({ condition: Condition.Submitting });

    api(this.setBase({}))
      .then(() => {
        location.reload();
      })
      .catch((result) => {
        const { errors } = result;
        this.setState({ errors, condition: Condition.Fail });
      });
  }

  listen (to) {
    to('accept', () => this.submit(API.acceptInvitation));
    to('reject', () => this.submit(API.rejectInvitation));
    to('block', () => this.submit(API.blockInvitation));
  }
}

@eater
export class Component extends React.Component {
  get form () {
    const { condition } = this.props;

    return (
      <section className="reactor body">
        <SubmitButton
          className="submit"
          icon="thumbs-o-up"
          text="Accept"
          condition={condition}
          onClick={this.accept}
        />
        <SubmitButton
          className="reject"
          icon="thumbs-o-up"
          text="Reject"
          condition={condition}
          onClick={this.reject}
        />
        <SubmitButton
          className="reject"
          icon="thumbs-o-up"
          text="Block"
          condition={condition}
          onClick={this.block}
        />
      </section>
    );
  }

  get result () {
    return (
      <section className="reactor body">
        <div className="com success-message reactor completed">{this.props.result}</div>
      </section>
    );
  }

  @bind
  accept () {
    this.dispatch('accept');
  }

  @bind
  reject () {
    this.dispatch('reject');
  }

  @bind
  block () {
    this.dispatch('block');
  }

  render () {
    const { condition } = this.props;

    return condition === Condition.Success
      ? this.result
      : this.form;
  }
}
