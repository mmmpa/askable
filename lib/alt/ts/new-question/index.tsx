declare const React;
declare const ReactDOM;
declare const _;
declare const request;
declare const Promise;

import {Root, Node} from './lib/eventer'
import Fa from './lib/fa'
import {Api, strikeApi, ILogIn} from './lib/services/strike-api'
import * as marked from 'marked'
import User from "./lib/models/user";
import Team from "./lib/models/team";

require("codemirror/addon/mode/overlay.js");
require("codemirror/addon/display/placeholder.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/mode/gfm/gfm.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/meta.js");

import * as CodeMirror from 'codemirror'

enum State{
  Waiting,
  Submitting,
  Fail,
  Success
}

class Context extends Root {
  children(props) {
    return <Component {...props}/>;
  }

  succeed() {
    document.location = this.props.userPage;
  }

  submit(params:INewQuestion) {
    this.setState({state: State.Submitting});
    strikeApi(Api.LogIn, params)
      .then(()=> {
        this.setState({state: State.Success});
        this.succeed();
      })
      .catch(()=> {
        this.setState({state: State.Fail});
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
  private cm;

  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      markdown: '',
      title: ''
    }
  }

  componentDidMount() {
    this.cm = CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs['editor']), {
      lineNumbers: true,
      mode: "gfm",
      lineWrapping: true
    });
    this.cm.on('change', (e)=> this.changeComment(e.doc.getValue()));
    this.cm.setSize('100%', '300');
    this.cm.setValue(this.state.markdown);
  }

  changeComment(value) {
    this.setState({markdown: value});
  }

  get params():ILogIn {
    let {login, password} = this.state;
    return {login, password};
  }

  get isPreview() {
    return this.state.preview;
  }

  get markedTitle() {
    return `# ${this.state.title}\n\n`
  }

  get marked() {
    let {markdown} = this.state;
    let __html = marked(this.markedTitle + markdown, {sanitize: true});
    return {__html};
  }

  writeError() {
    switch (this.props.state) {
      case State.Fail:
        return <section className="new-question error-messages">
          <p className="error-message">
            <Fa icon="ban"/>
            ログインに失敗しました
          </p>
        </section>;
      case State.Success:
        return <section className="new-question success-messages">
          <p className="success-message">
            <Fa icon="paw"/>
            ログインに成功しました
          </p>
        </section>;
      case State.Submitting:
      case State.Waiting:
      default:
        return null;
    }
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

  detectTabClass(isPreview:boolean) {
    return isPreview === this.state.preview ? 'tabnav-tab selected' : 'tabnav-tab';
  }

  writeCommentArea() {
    let className = this.isPreview
      ? 'new-question entry-area hidden'
      : 'new-question entry-area'

    return <section className={className}>
      <section className="new-question title-area">
        <input type="text" name="title" placeholder="タイトルを入力"
               value={this.state.title}
               onChange={(e)=> this.setState({title: e.target.value})}/>
      </section>
      <section className="new-question comment-area">
        <textarea name="comment" ref="editor" placeholder="質問内容をここに入力"
                  value={this.state.markdown}
                  onChange={(e)=>this.setState({markdown: e.target.value})}/>
      </section>
    </section>
  }

  writePreviewArea() {
    if (!this.isPreview) {
      return null;
    }

    if (this.state.markdown === '') {
      return <section className='new-question preview-area'>
        <p className="new-question blank-comment">コメントが入力されていません</p>
      </section>;
    }

    return <section className='new-question preview-area'>
      <section dangerouslySetInnerHTML={this.marked}/>
    </section>
  }

  writeAssigner() {
    let {user:User, team:Team} = this.props;

    return <section className="new-question team-members">
      <section className="new-question team-member-list">
        {team.users.map((user)=>{
          return <label className="new-question team-member" key={user.login}>
            <span className="input-input">
              <input type="checkbox" name="assign"/>
            </span>
            <span className="input-label">
              {user.name}
            </span>
          </label>
          })}
      </section>
    </section>
  }

  render() {
    return <article className="new-question body">
      <section className="new-question box-body">
        <h1 className="new-question log-in-title">質問する</h1>
        <div className="columns">
          <section className="new-question editor-area">
            <section className="new-question tabs tabnav">
              <nav className="tabnav-tabs">
                <a className={this.detectTabClass(false)}
                   onClick={()=> this.setState({preview: false})}>
                  <Fa icon="pencil"/>
                  コメントを書く
                </a>
                <a className={this.detectTabClass(true)}
                   onClick={()=> this.setState({preview: true})}>
                  <Fa icon="file-text-o"/>
                  プレビュー
                </a>
              </nav>
            </section>
            <div className="inner form">
              {this.writeCommentArea()}
              {this.writePreviewArea()}
              <section className="new-question submit-section">
                {this.writeSubmit()}
              </section>
            </div>
          </section>
          <section className="new-question assigning-area">
            <section className="new-question tabs tabnav">
              <nav className="tabnav-tabs">
                <a className="tabnav-tab selected">
                  <Fa icon="hand-o-right"/>
                  回答をおねがいする
                </a>
              </nav>
            </section>
            {this.writeAssigner()}
          </section>
        </div>
      </section>
    </article>
  }
}

class NewQuestion {
  static start(dom:HTMLElement, userJson, teamJson) {
    let user = new User(userJson);
    let team = new Team(teamJson);
    ReactDOM.render(<Context {...{user, team}}/>, dom);
  }
}

window.NewQuestion = NewQuestion;


