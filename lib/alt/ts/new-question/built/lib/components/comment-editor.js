var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventer_1 = require('../eventer');
var marked = require('marked');
var fa_1 = require('../fa');
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
var CodeMirror = require('codemirror');
var CommentEditor = (function (_super) {
    __extends(CommentEditor, _super);
    function CommentEditor(props) {
        _super.call(this, props);
        this.state = {
            preview: false,
            markdown: props.markdown || '',
            title: props.title || ''
        };
    }
    CommentEditor.prototype.componentDidMount = function () {
        var _this = this;
        this.cm = CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs['editor']), {
            lineNumbers: true,
            mode: "gfm",
            lineWrapping: true
        });
        this.cm.on('change', function (e) { return _this.changeComment(e.doc.getValue()); });
        this.cm.setSize('100%', '300');
        this.cm.setValue(this.state.markdown);
    };
    CommentEditor.prototype.isStateChanged = function (state) {
        return this.state.markdown !== state.markdown || this.state.title !== state.title;
    };
    CommentEditor.prototype.componentDidUpdate = function (props, state) {
        if (this.isStateChanged(state)) {
            this.props.onChange(this.state);
        }
    };
    CommentEditor.prototype.changeComment = function (value) {
        this.setState({ markdown: value });
    };
    CommentEditor.prototype.changeTitle = function (value) {
        this.setState({ title: value });
    };
    Object.defineProperty(CommentEditor.prototype, "isPreview", {
        get: function () {
            return this.state.preview;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentEditor.prototype, "marked", {
        get: function () {
            var markdown = this.state.markdown;
            var __html = marked(markdown, { sanitize: true });
            return { __html: __html };
        },
        enumerable: true,
        configurable: true
    });
    CommentEditor.prototype.writeError = function (errors) {
        if (!errors || errors.length === 0) {
            return null;
        }
        return React.createElement("ul", {"className": "comment-editor error-messages"}, errors.map(function (error) {
            return React.createElement("li", {"className": "error-message"}, error);
        }));
    };
    CommentEditor.prototype.detectTabClass = function (isPreview) {
        return isPreview === this.state.preview ? 'tabnav-tab selected' : 'tabnav-tab';
    };
    CommentEditor.prototype.writeTitleArea = function () {
        var _this = this;
        if (!!this.props.title) {
            return null;
        }
        return React.createElement("section", {"className": "comment-editor title-area"}, React.createElement("input", {"type": "text", "name": "title", "placeholder": "タイトルを入力", "value": this.props.title || this.state.title, "onChange": function (e) { return _this.changeTitle(e.target.value); }}));
    };
    CommentEditor.prototype.writeCommentArea = function () {
        var errors = this.props.errors;
        var className = this.isPreview
            ? 'comment-editor entry-area hidden'
            : 'comment-editor entry-area';
        return React.createElement("section", {"className": className}, this.writeTitleArea(), this.writeError(errors.title), React.createElement("section", {"className": "comment-editor comment-area"}, React.createElement("textarea", {"name": "comment", "ref": "editor", "placeholder": "内容をここに入力", "value": this.state.markdown})), this.writeError(errors.markdown));
    };
    CommentEditor.prototype.writePreviewArea = function () {
        if (!this.isPreview) {
            return null;
        }
        if (this.state.markdown === '') {
            return React.createElement("section", {"className": 'comment-editor preview-area'}, React.createElement("p", {"className": "comment-editor blank-comment"}, "コメントが入力されていません"));
        }
        return React.createElement("section", {"className": 'comment-editor preview-area'}, React.createElement("section", {"className": "markdown-html", "dangerouslySetInnerHTML": this.marked}));
    };
    CommentEditor.prototype.render = function () {
        var _this = this;
        return React.createElement("section", {"className": "comment-editor editor-area"}, React.createElement("section", {"className": "comment-editor tabs tabnav"}, React.createElement("nav", {"className": "tabnav-tabs"}, React.createElement("a", {"className": this.detectTabClass(false), "onClick": function () { return _this.setState({ preview: false }); }}, React.createElement(fa_1.default, {"icon": "pencil"}), "書く"), React.createElement("a", {"className": this.detectTabClass(true), "onClick": function () { return _this.setState({ preview: true }); }}, React.createElement(fa_1.default, {"icon": "file-text-o"}), "プレビュー"))), React.createElement("div", {"className": "inner form"}, this.writeCommentArea(), this.writePreviewArea()));
    };
    return CommentEditor;
})(eventer_1.Node);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentEditor;
//# sourceMappingURL=comment-editor.js.map