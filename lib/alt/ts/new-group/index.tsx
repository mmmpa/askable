declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'
import InputForm from './lib/components/input-form'
import {State} from './lib/models/state'

class Context extends Root {
  succeed(groupId) {
    location.href = '/g/' + groupId;
  }

  submit(params) {
    this.setState({state: State.Submitting});
    strike(Api.CreateGroup, params)
      .then((result)=> {
        this.succeed(result.id);
        this.setState({result, errors: {}, state: State.Success});
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, state: State.Fail});
      });
  }

  listen(to) {
    to('submit', (params)=> {
      this.submit(params);
    });
  }

  initialState(props) {
    return {
      state: State.Waiting
    }
  }
}


class Component extends Node {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }

  get params() {
    let {name, description} = this.state;
    return {name, description}
  }

  writeInput(type, name, placeholder, errors) {
    return <section className="com input-section">
      <InputForm {...{
        errors, type, name, placeholder, value: this.state[name],
        onChange: (v)=> {
          let p = {};
          p[name] = v;
          this.setState(p)
        }
      }}/>
    </section>
  }

  render() {
    let {state, errors} = this.props;

    return <article className="new-group body">
      <div className="com border-box-container">
        <h1 className="com border-box-title-area">グループを作成する</h1>
        <section className="com form-area">
          {this.writeInput('text', 'name', 'グループの名前', errors)}
          {this.writeInput('text', 'description', 'グループの概要', errors)}
          <section className="com submit-section">
            <SubmitButton {...{
              state, icon: "thumbs-o-up", text: "作成する", className: 'submit',
              onClick: ()=>this.dispatch('submit', this.params)
            }}/>
          </section>
        </section>
      </div>
    </article>
  }
}

class NewGroup {
  static start(dom) {
    if (!dom) {
      return;
    }
    ReactDOM.render(
      <Context>
        <Component/>
      </Context>
      , dom);
  }
}

window.NewGroup = NewGroup;


