import { ContextComponent, ComponentComponent } from '../lib/parcel'
import { Condition } from '../lib/models/condition'
import API from '../lib/services/strike-api'
import Fa from '../lib/components/fa'
import SubmitButton from '../lib/components/submit-button'
import { writeInput } from '../lib/helpers/input-writer'

class Context extends ContextComponent {
  succeed (groupId) {
    location.href = '/g/' + groupId;
  }

  submit (params) {
    this.setState({ condition: Condition.Submitting });
    API.createGroup(params)
      .then((result)=> {
        this.succeed(result.id);
      })
      .catch((result)=> {
        let { errors } = result
        this.setState({ errors, condition: Condition.Fail });
      });
  }

  listen (to) {
    to('submit', (params)=> {
      this.submit(params);
    });
  }

  initialState (props) {
    return {
      condition: Condition.Waiting
    }
  }
}

class Component extends ComponentComponent {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }

  get params () {
    let { name, description } = this.state;
    return { name, description }
  }

  render () {
    let { state, errors } = this.props;

    return <article className="new-group body">
      <div className="com border-box-container">
        <h1 className="com border-box-title-area">Create new group</h1>
        <section className="com form-area">
          {writeInput(this, 'text', 'name', 'Name', null, errors)}
          {writeInput(this, 'text', 'description', 'Description', null, errors)}
          <section className="com submit-section">
            <SubmitButton {...{
              state, icon: "thumbs-o-up", text: "Create", className: 'submit',
              onClick: ()=>this.dispatch('submit', this.params)
            }}/>
          </section>
        </section>
      </div>
    </article>
  }
}

class NewGroup {
  static start (dom) {
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
