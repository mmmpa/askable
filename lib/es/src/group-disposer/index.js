import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';

import SubmitButton from '../lib/components/submit-button';
import InputForm from '../lib/components/input-form';

export default class GroupDisposer {
  static start (dom) {
    if (!dom) {
      return;
    }

    const groupId = dom.getAttribute('data-id');
    const groupName = dom.getAttribute('data-name');
    const isOwner = dom.getAttribute('data-owner') === 'true';

    const props = { groupId, groupName, isOwner };

    ReactDOM.render(
      <Context {...props}>
        <Component />
      </Context>
      , dom);
  }
}

window.GroupDisposer = GroupDisposer;

@feeder
export class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
  };

  setBase (params) {
    const { groupId } = this;
    return Object.assign({}, params, { groupId });
  }

  get groupId () {
    return this.props.groupId;
  }

  @bind
  submit () {
    this.setState({ condition: Condition.Submitting });
    API.disposeGroup(this.setBase({}))
      .then(() => {
        location.reload();
      })
      .catch(() => {
        this.setState({ condition: Condition.Fail });
      });
  }

  listen (to) {
    to('submit', this.submit);
  }
}

@eater
export class Component extends React.Component {
  state = {
    name: '',
  };

  get text () {
    return this.props.isOwner ? 'Dismiss' : 'Leave';
  }

  get disabled () {
    return this.props.groupName !== this.state.name;
  }

  @bind
  submit () {
    this.dispatch('submit', this.params);
  }

  render () {
    const { name } = this.state;
    const { condition } = this.props;

    return (
      <section className="disposer body">
        <form className="disposer input-area">
          <section className="disposer login-area">
            <InputForm
              type="text"
              name="login"
              placeholder="This group name"
              value={name}
              onChange={(_, v) => this.setState({ name: v })}
            />
          </section>
          <SubmitButton
            className="dispose"
            icon="trash-o"
            text={this.text}
            disabled={this.disabled}
            condition={condition}
            onClick={this.submit}
          />
        </form>
      </section>
    );
  }
}

