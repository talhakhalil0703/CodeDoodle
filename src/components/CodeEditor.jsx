import React, { Component } from 'react';
import Prism from 'prismjs';
import '../prism.css'
import './CodeEditor.css';
import LineNum from './LineNum'
import DragAndDropFiles from './DragAndDropFiles';

/* 
    CodeEditor has both the:
     - text area for coding
     - associated line numbers

    Uses Prism.js for syntax highlighting, need to install using:
     - npm i prismjs

    Receives props:
     - value: code to be displayed
     - onChange: access to CodePanel onChange function
     - onKeyDown: access to CodePanel onKeyDown function
*/
class CodeEditor extends Component {

    constructor(props) {
        super(props);

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBreakpoint = this.handleBreakpoint.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

        this.getLineCount = this.getLineCount.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.editorRef = React.createRef();
        this.linesRef = React.createRef();
        this.outRef = React.createRef();
    }

    /* Adds a scroll event listener to the coding editor and does syntax highlighting */
    componentDidMount() {
        const editor = this.editorRef.current;
        editor.addEventListener('scroll', this.onScroll);
        Prism.highlightAll();
    }

    /* Allows for live syntax highlighting */
    componentDidUpdate() {
        Prism.highlightAll();
    }

    /* Makes the code editor and lines scroll at same time */
    onScroll({ currentTarget }) {
        const editor = this.editorRef.current;
        const lines = this.linesRef.current;
        const out = this.outRef.current;

        lines.scrollTop = editor.scrollTop;
        out.scrollTop = editor.scrollTop;

        out.scrollLeft = editor.scrollLeft;
    }

    /*
        When something is changed in the code editor update the state accordingly
        Passes state up to CodePanel
    */
    handleEditorChange(event) {
        const val = event.target.value;
        this.props.onChange(val);
    }

    /* 
        Checks if tab was pressed on key down
        If tab was pressed content and cursor will be indented
        Passes cursor position and a ref to the text area to CodePanel
    */
    handleKeyDown(event) {
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;

        if (event.key === "Tab") {
            event.preventDefault();
            this.props.onKeyDown(selectionStart, selectionEnd, this.editorRef.current);
        }
    }

    /* Helper function that gets how many lines of code there are */
    getLineCount() {
        var value = this.props.value;
        var lines = value.split(/\r\n|\r|\n/).length;
        return lines;
    }

    /* Passes breakpoint line number up to CodePanel */
    handleBreakpoint(line_num) {
        this.props.onClick(line_num);
    }

    handleFileUpload(val, lang, filename) {
        this.props.onUpload(val, lang, filename);
    }

    render() {
        const { value } = this.props;
        const num_lines = this.getLineCount();
        return (
            <div className='editor-panel'>
                <div ref={this.linesRef} className='line-container'>
                    {
                        /* For each line of code, create a corresponding LineNum component */
                        Array.from({ length: num_lines }, (_, k) => {
                            if(k+1 == this.props.activeLine)
                            {
                                return(
                                    <LineNum
                                    key={k}
                                    num={k + 1}
                                    // onClick={this.handleBreakpoint}
                                    isActive={true}
                                    />
                            )}
                            else {
                                return(
                                <LineNum
                                key={k}
                                num={k + 1}
                                // onClick={this.handleBreakpoint}
                                isActive={false}
                                />
                            )}
                        })
                    }
                </div>
                <DragAndDropFiles onUpload={this.handleFileUpload}>
                    <textarea ref={this.editorRef} className='code-input' value={value} spellCheck='false' onChange={this.handleEditorChange} onKeyDown={this.handleKeyDown} />
                    <pre ref={this.outRef} className='code-output'><code className='language-clike'>{value}
                    </code></pre>
                </DragAndDropFiles>

            </div >
        );
    }
}

export default CodeEditor;