import marked from 'marked';
import React from '../react';

import Fa from './fa';
import ErrorMessage from './error-message';

require('codemirror/addon/mode/overlay.js');
require('codemirror/addon/display/placeholder.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/gfm/gfm.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/clike/clike.js');
require('codemirror/mode/meta.js');

import * as CodeMirror from 'codemirror'; // eslint-disable-line import/first

class UnrenderingTextarea extends React.Component {
  componentWillMount () {
    this.setState({ markdown: this.props.markdown });
  }

  componentDidMount () {
    this.cm = CodeMirror.fromTextArea(this.editor, {
      lineNumbers: true,
      mode: 'gfm',
      lineWrapping: true,
    });
    this.cm.on('change', e => this.props.changeComment(e.doc.getValue()));
    this.cm.setValue(this.state.markdown);
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <section className="comment-editor comment-area">
        <textarea
          name="comment"
          ref={e => (this.editor = e)}
          placeholder="Question"
          value={this.state.markdown}
        />
      </section>
    );
  }
}

export default class CommentEditor extends React.Component {
  state = {
    preview: false,
    markdown: '',
    title: '',
  };

  componentWillMount () {
    this.setState({
      markdown: this.props.markdown,
      title: this.props.title,
    });
  }

  componentDidUpdate (props, state) {
    if (this.isStateChanged(state)) {
      this.props.onChange(this.state);
    }
  }

  isStateChanged (state) {
    return this.state.markdown !== state.markdown || this.state.title !== state.title;
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
    return { __html: marked(this.state.markdown, { sanitize: true }) };
  }

  detectTabClass (isPreview) {
    return isPreview === this.state.preview ? 'tabnav-tab selected' : 'tabnav-tab';
  }

  get titleArea () {
    const {
      withTitle,
      errors,
    } = this.props;

    const { title } = this.state;

    if (!withTitle) {
      return null;
    }

    return (
      <section className="comment-editor title-area">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={e => this.changeTitle(e.target.value)}
        />
        <ErrorMessage
          name="title"
          errors={errors}
        />
      </section>
    );
  }

  get commentArea () {
    const { errors } = this.props;

    const className = this.isPreview
      ? 'comment-editor entry-area hidden'
      : 'comment-editor entry-area';

    return (
      <section className={className}>
        {this.titleArea}
        <UnrenderingTextarea
          changeComment={(...args) => this.changeComment(...args)}
          markdown={this.state.markdown}
        />
        <ErrorMessage
          name="markdown"
          errors={errors}
        />
      </section>
    );
  }

  get previewArea () {
    if (!this.isPreview) {
      return null;
    }

    if (this.state.markdown === '') {
      return (
        <section className="comment-editor preview-area">
          <p className="comment-editor blank-comment">No comment</p>
        </section>
      );
    }

    return (
      <section className="comment-editor preview-area">
        <section className="markdown-html" dangerouslySetInnerHTML={this.marked} />
      </section>
    );
  }

  render () {
    return (
      <section className="comment-editor editor-area">
        <section className="comment-editor tabs tabnav">
          <nav className="tabnav-tabs">
            <button
              type="button"
              className={this.detectTabClass(false)}
              onClick={() => this.setState({ preview: false })}
            >
              <Fa icon="pencil" />
              Edit
            </button>
            <button
              type="button"
              className={this.detectTabClass(true)}
              onClick={() => this.setState({ preview: true })}
            >
              <Fa icon="file-text-o" />
              Preview
            </button>
          </nav>
        </section>
        <div className="inner form">
          {this.commentArea}
          {this.previewArea}
        </div>
      </section>
    );
  }
}
