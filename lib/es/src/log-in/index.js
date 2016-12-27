import { feeder } from '../lib/decorators/feeder';
import React from '../lib/react';
import ReactDom from '../lib/react-dom';

import API from '../lib/services/strike-api';
import { Condition } from '../lib/models/condition';
import Component from './component';


window.LogIn = class {
  static start (dom) {
    ReactDom.render(
      <Context>
        <Component />
      </Context>
      , dom);
  }
};

@feeder
class Context extends React.Component {
  state = {
    condition: Condition.Waiting,
    loggedIn: false,
  };

  listen (to) {
    to('submit', p => this.submit(p));
  }

  submit (params) {
    this.setState({ condition: Condition.Submitting });
    API
      .logIn(params)
      .then(() => {
        this.setState({ condition: Condition.Success });
        location.reload();
      })
      .catch(() => {
        this.setState({ condition: Condition.Fail });
      });
  }
}
