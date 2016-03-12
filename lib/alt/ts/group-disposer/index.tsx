declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import {Api, strike} from './lib/services/strike-api'
import {State} from './lib/models/state'
import Fa from './lib/fa'
import SubmitButton from './lib/components/submit-button'

class Context extends Root {
  get groupId() {
    return this.props.groupId;
  }

  succeed() {
    location.reload();
  }

  setBase(params) {
    params.groupId = this.groupId;
    return params;
  }

  submit() {
    this.setState({state: State.Submitting});
    strike(Api.DisposeGroup, this.setBase({}))
      .then((result)=> {
        this.succeed();
        this.setState({result, errors: {}, state: State.Success});
      })
      .catch((result)=> {
        this.setState({errors: {}, state: State.Fail});
      });
  }

  listen(to) {
    to('submit', ()=> {
      this.submit();
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
      name: ''
    }
  }

  get text() {
    return this.props.isOwner ? '解散' : '脱退'
  }

  render() {
    let {name} = this.state;
    let {state} = this.props;

    return <section className="disposer body">
      <div className="disposer input-area">
        <section className="disposer login-area">
          <input type="text" value={name} placeholder="グループの名前を入力"
                 onChange={(e)=> this.setState({name: e.target.value})}/>
        </section>
        <SubmitButton {...{
          state, icon: "trash", text: this.text + 'する', className: 'dispose',
          disabled: this.props.groupName !== name,
          onClick: ()=>this.dispatch('submit')
        }}/>
      </div>
    </section>
  }
}

class GroupDisposer {
  static start(dom) {
    if (!dom) {
      return;
    }
    let groupId = dom.getAttribute('data-id');
    let groupName = dom.getAttribute('data-name');
    let isOwner = dom.getAttribute('data-owner') === 'true';
    ReactDOM.render(
      <Context {...{groupId, groupName, isOwner}}>
        <Component/>
      </Context>
      , dom);
  }
}

window.GroupDisposer = GroupDisposer;


