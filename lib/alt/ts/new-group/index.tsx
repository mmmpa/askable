declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import {Api, strikeApi, ICreateUser} from './lib/services/strike-api'

enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

class Context extends Root {
  succeed(groupId) {
    location.href = '/g/' + groupId;
  }

  submit(params) {
    this.setState({state: State.Submitting});
    strikeApi(Api.CreateGroup, params)
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
      state: 'ready'
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
    let {name, description} = this.state
    return {name, description}
  }

  writeError(name:string) {
    if (!this.props.errors) {
      return null;
    }
    let errors = this.props.errors[name];
    if (!errors) {
      return null;
    }
    return <ul className="error-messages">
      {errors.map((error)=> <li className="error-message">{error}</li>)}
    </ul>
  }

  writeSubmit() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </button>;
      case State.Success:
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="submit"
                       onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="thumbs-o-up"/>
          作成する
        </button>;
    }
  }

  render() {
    let {name, description} = this.state;

    return <section className="new-group body">
      <h1 className="new-group registering-title">グループを作成する</h1>
      <section className="new-group registering-body">
        <section className="new-group input-section">
          <input type="text" placeholder="グループの名前" value={name}
                 onChange={(e)=> this.setState({name: e.target.value})}/>
          {this.writeError('name')}
        </section>
        <section className="new-group input-section">
          <textarea type="text" placeholder="グループの概要" value={description}
                    onChange={(e)=> this.setState({description: e.target.value})}/>
          {this.writeError('description')}
        </section>
        <section className="new-group submit-section">
          {this.writeSubmit()}
        </section>
      </section>
    </section>
  }
}

class NewGroup {
  static start(dom) {
    if (!dom) {
      return;
    }
    ReactDOM.render(<Context>
      <Component/>
    </Context>, dom);
  }
}

window.NewGroup = NewGroup;


