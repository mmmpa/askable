import { ContextComponent, ComponentComponent } from '../parcel'
import marked from 'marked'
import Fa from '../fa'
import ErrorMessage from './error-message'

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

class UnrenderingTextarea extends ComponentComponent {
  shouldComponentUpdate (p, s) {
    return false;
  }

  componentWillMount () {
    this.setState({ markdown: this.props.markdown })
  }

  componentDidMount () {
    this.cm = CodeMirror.fromTextArea(document.querySelector('#editor'), {
      lineNumbers: true,
      mode: "gfm",
      lineWrapping: true
    });
    this.cm.on('change', (e)=> this.props.changeComment(e.doc.getValue()));
    this.cm.setSize('100%', 300);
    this.cm.setValue(this.state.markdown);
  }

  render () {
    return <section className="comment-editor comment-area">
        <textarea name="comment" id="editor" placeholder="内容をここに入力"
                  value={this.state.markdown}/>
    </section>
  }
}

export default class CommentEditor extends ComponentComponent {
  constructor (props) {
    super(props);
    this.cm = null
    this.state = {
      preview: false,
      markdown: props.markdown || '',
      title: props.title || ''
    }
  }

  isStateChanged (state) {
    return this.state.markdown !== state.markdown || this.state.title !== state.title
  }

  componentDidUpdate (props, state) {
    if (this.isStateChanged(state)) {
      this.props.onChange(this.state);
    }
  }

  changeComment (value) {
    this.setState({ markdown: value });
  }

  changeTitle (value) {
    this.setState({ title: value });
  }

  get isPreview () {
    return this.state.preview;
  }

  get marked () {
    let { markdown } = this.state;
    let __html = marked(markdown, { sanitize: true });
    return { __html };
  }

  detectTabClass (isPreview) {
    return isPreview === this.state.preview ? 'tabnav-tab selected' : 'tabnav-tab';
  }

  writeTitleArea () {
    if (!!this.props.title) {
      return null;
    }

    return <section className="comment-editor title-area">
      <input type="text" name="title" placeholder="タイトルを入力"
             value={this.props.title || this.state.title}
             onChange={(e)=> this.changeTitle(e.target.value)}/>
    </section>
  }

  writeCommentArea () {
    let { errors } = this.props;
    let className = this.isPreview
      ? 'comment-editor entry-area hidden'
      : 'comment-editor entry-area';

    return <section className={className}>
      {this.writeTitleArea()}
      <ErrorMessage {...{ errors, name: 'title' }}/>
      <UnrenderingTextarea changeComment={(...args)=> this.changeComment(...args)} markdown={this.state.markdown}/>
      <ErrorMessage {...{ errors, name: 'markdown' }}/>
    </section>
  }

  writePreviewArea () {
    if (!this.isPreview) {
      return null;
    }

    if (this.state.markdown === '') {
      return <section className='comment-editor preview-area'>
        <p className="comment-editor blank-comment">コメントが入力されていません</p>
      </section>;
    }

    return <section className='comment-editor preview-area'>
      <section className="markdown-html" dangerouslySetInnerHTML={this.marked}/>
    </section>
  }

  render () {
    return <section className="comment-editor editor-area">
      <section className="comment-editor tabs tabnav">
        <nav className="tabnav-tabs">
          <a className={this.detectTabClass(false)}
             onClick={()=> this.setState({ preview: false })}>
            <Fa icon="pencil"/>
            書く
          </a>
          <a className={this.detectTabClass(true)}
             onClick={()=> this.setState({ preview: true })}>
            <Fa icon="file-text-o"/>
            プレビュー
          </a>
        </nav>
      </section>
      <div className="inner form">
        {this.writeCommentArea()}
        {this.writePreviewArea()}
      </div>
    </section>
  }
}