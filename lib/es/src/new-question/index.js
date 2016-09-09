
import {ContextComponent, ComponentComponent} from './lib/parcel'
import API from './lib/services/strike-api'
import {State} from './lib/models/state'
import Fa from './lib/fa'
import CommentEditor from './lib/components/comment-editor'
import Assigner from './lib/components/assigner'
import User from "./lib/models/user";
import Group from "./lib/models/group";
import SubmitButton from './lib/components/submit-button'

class Context extends ContextComponent {
  succeed(questionId) {
    document.location = this.props.questionPage.replace(':questionId', questionId);
  }

  get groupId() {
    return this.props.groupId;
  }

  setBase(params) {
    params.groupId = this.groupId;
  }

  submit(params) {
    this.setBase(params);

    this.setState({state: State.Submitting});
    API.createQuestion(params)
      .then(({id})=> {
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
      state: State.Waiting,
      errors: {}
    }
  }
}

class Component extends ComponentComponent {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      markdown: '',
      title: '',
      assigned: []
    }
  }

  get params() {
    let {title, markdown, assigned} = this.state;
    return {title, markdown, assigned};
  }

  render() {
    let {state} = this.props;

    let {errors, user, group} = this.props;
    return <article className="new-question body">
      <section className="new-question box-body">
        <div className="columns">
          <section className="new-question editor-area">
            <CommentEditor {...{errors}} onChange={(state)=> this.setState(state)}/>
            <div className="inner form">
              <section className="new-question submit-section">
                <SubmitButton {...{
                  state, icon: "plus-circle", text: "この内容で質問する", className: 'submit',
                  onClick: ()=>this.dispatch('submit', this.params)
                }}/>
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
  static start(dom) {
    let questionPage = dom.getAttribute('data-questionPage');
    let groupId = dom.getAttribute('data-groupId');
    let user = new User(JSON.parse(dom.getAttribute('data-user')));
    let group = new Group(JSON.parse(dom.getAttribute('data-group')));

    ReactDOM.render(
      <Context {...{questionPage, user, group, groupId}}>
        <Component/>
      </Context>
      , dom);
  }
}

window.NewQuestion = NewQuestion;
