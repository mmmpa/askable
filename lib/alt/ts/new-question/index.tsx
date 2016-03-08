declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import CommentEditor from './lib/components/comment-editor'
import Assigner from './lib/components/assigner'
import {Api, strikeApi, ICreateQuestion} from './lib/services/strike-api'
import User from "./lib/models/user";
import Group from "./lib/models/group";


enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

class Context extends Root {
  succeed(questionId) {
    document.location = this.props.questionPage.replace(':questionId', questionId);
  }

  get groupId() {
    return this.props.groupId;
  }

  setBase(params){
    params.groupId = this.groupId;
  }

  submit(params:ICreateQuestion) {
    this.setBase(params);

    this.setState({state: State.Submitting});
    strikeApi(Api.createQuestion, params)
      .then(({id})=> {
        this.setState({state: State.Success});
        this.succeed(id);
      })
      .catch(({errors})=> {
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
      state: 'ready',
      errors: {}
    }
  }
}

class Component extends Node {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      markdown: '',
      title: '',
      assigned: []
    }
  }

  get params():ICreateQuestion {
    let {title, markdown, assigned} = this.state;
    return {title, markdown, assigned};
  }

  writeSubmit() {
    switch (this.props.state) {
      case State.Submitting:
        return <button className="new-question sending" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          送信中
        </button>;
      case State.Success:
        return null;
      case State.Waiting:
      case State.Fail:
      default:
        return <button className="new-question submit"
                       onClick={()=> this.dispatch('submit', this.params)}>
          <Fa icon="hand-paper-o"/>
          この内容で質問する
        </button>;
    }
  }


  render() {
    if (this.props.state === State.Success) {
      return <article className="new-question body">
        <section className="new-question registered-body">
          <p className="new-question registered-message">投稿完了しました</p>
        </section>
      </article>
    }

    let {errors, user, group} = this.props;
    return <article className="new-question body">
      <section className="new-question box-body">
        <div className="columns">
          <section className="new-question editor-area">
            <CommentEditor {...{errors}} onChange={(state)=> this.setState(state)}/>
            <div className="inner form">
              <section className="new-question submit-section">
                {this.writeSubmit()}
              </section>
            </div>
          </section>
          <section className="new-question assigning-area">
            <Assigner {...{errors, user, group}} onChange={(state)=> this.setState(state)}/>
          </section>
        </div>
      </section>
    </article>
  }
}

class NewQuestion {
  static start(dom:HTMLElement, {questionPage, user, group, groupId}) {
    let user = new User(user);
    let group = new Group(group);
    ReactDOM.render(<Context {...{questionPage, user, group, groupId}}>
      <Component/>
    </Context>, dom);
  }
}

window.NewQuestion = NewQuestion;
