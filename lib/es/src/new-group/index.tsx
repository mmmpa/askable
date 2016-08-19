declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Parcel, Good} from './lib/parcel'
import {State} from './lib/models/state'
import {Api, strike} from './lib/services/strike-api'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'
import {writeInput} from './lib/helpers/input-writer'

class Context extends Parcel {
  succeed(groupId) {
    location.href = '/g/' + groupId;
  }

  submit(params) {
    this.setState({state: State.Submitting});
    strike(Api.CreateGroup, params)
      .then((result)=> {
        this.succeed(result.id);
      })
      .catch((result)=> {
        let {errors} = result
        this.setState({errors, state: State.Fail});
      });
  }
  s
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

class Component extends Good {
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

  render() {
    let {state, errors} = this.props;

    return <article className="new-group body">
      <div className="com border-box-container">
        <h1 className="com border-box-title-area">グループを作成する</h1>
        <section className="com form-area">
          {writeInput(this, 'text', 'name', 'グループの名前', null, errors)}
          {writeInput(this, 'text', 'description', 'グループの概要', null,  errors)}
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
