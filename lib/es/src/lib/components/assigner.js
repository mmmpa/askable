import { bind } from 'decko';
import { remove } from 'lodash';
import React from '../react';

import Fa from './fa';
import ErrorMessages from './error-messages';

export default class Assigner extends React.Component {
  @bind
  onChange (e) {
    const login = e.target.value;
    const now = this.props.assigned.concat();

    if (now.includes(login)) {
      remove(now, v => v === login);
    } else {
      now.push(login);
    }

    this.props.onChange(now);
  }

  isAssigned (login) {
    return this.props.assigned.includes(login);
  }

  get assignee () {
    const {
      user,
      group,
      already,
    } = this.props;

    const exclusion = (already || []).concat(user.login);
    return group.users.filter(({ login }) => !exclusion.includes(login));
  }

  @bind
  userElement ({ login, name }) {
    return (
      <label className="assigner group-member" htmlFor={`assignee-${login}`} key={login}>
        <span className="input-input">
          <input
            id={`assignee-${login}`}
            type="checkbox"
            name="assignee"
            value={login}
            checked={this.isAssigned(login)}
            onChange={this.onChange}
          />
        </span>
        <span className="input-label">
          {name}
        </span>
      </label>
    );
  }

  render () {
    return (
      <article className="assigner body">
        <section className="assigner tabs tabnav">
          <nav className="tabnav-tabs">
            <buton className="tabnav-tab selected">
              <Fa icon="hand-o-right" />
              Request to answer
            </buton>
          </nav>
        </section>
        <section className="assigner group-members">
          <section className="assigner group-member-list">
            {this.assignee.map(this.userElement)}
          </section>
        </section>
        <ErrorMessages name="assigned" {...this.props} />
      </article>
    );
  }
}
