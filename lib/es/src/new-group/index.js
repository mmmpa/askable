import { bind } from 'decko';
import { feeder, eater } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDOM from '../lib/react-dom';

import { Condition } from '../lib/models/condition';
import API from '../lib/services/strike-api';

import SubmitButton from '../lib/components/submit-button';
import InputSection from '../lib/components/input-section';
import ConditionMessage from '../lib/components/condition-message';
import SmallFormBox from '../lib/components/small-form-box';

window.NewGroup = class {
  static start (dom) {
    if (!dom) {
      return;
    }
    ReactDOM.render(
      <Context>
        <Component />
      </Context>
      , dom);
  }
};

const conditionMessages = {
  [Condition.Success]: null,
  [Condition.Submitting]: 'Submitting...',
  [Condition.Fail]: "Couldn't create.",
  [Condition.Waiting]: null,
  [Condition.Retrying]: null,
};

@feeder
class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
  };

  succeed (groupId) {
    location.href = `/g/${groupId}`;
  }

  @bind
  submit (params) {
    this.setState({ condition: Condition.Submitting });
    API.createGroup(params)
      .then((result) => {
        this.succeed(result.id);
      })
      .catch((result) => {
        const { errors } = result;
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
    name: '',
    description: '',
  };

  get params () {
    const {
      name,
      description,
    } = this.state;

    return { name, description };
  }

  @bind
  submit () {
    this.dispatch('submit', this.params);
  }

  render () {
    const {
      condition,
      errors,
    } = this.props;

    const {
      name,
      description,
    } = this.state;

    const messageProps = {
      condition,
      messages: conditionMessages,
    };

    return (
      <article className="new-group body">
        <SmallFormBox
          title="Create new group"
        >
          <InputSection
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            errors={errors}
            onChange={(_, v) => this.setState({ name: v })}
          />
          <InputSection
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            errors={errors}
            onChange={(_, v) => this.setState({ description: v })}
          />
          <section className="com submit-section">
            <SubmitButton
              className="submit"
              icon="thumbs-o-up"
              text="Create"
              condition={condition}
              onClick={this.submit}
            />
          </section>
          <ConditionMessage {...messageProps} />
        </SmallFormBox>
      </article>
    );
  }
}
