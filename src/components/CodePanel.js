import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import './CodePanel.css'

/*
    This component holds anything related to the code editor:
     - language buttons
     - convert button
     - and renders the CodeEditor component

    Manages state:
     - breakpoint, an array of all set breakpoints, always -1 if none set

    Receives props:
     - c: the c code the user has written
     - cpp: the cpp code the user has written
     - language: the currently selected language
     - value: the code that should be currently displayed in the code editor
     - onChange: access to CodeDoodles onChange function
     - onClick: access to CodeDoodles onClick function
     - onKeydown: access to CodeDoodles onKeyDown function
*/
class CodePanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            breakpoint: [-1]
        }

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleConvert = this.handleConvert.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBreakpoint = this.handleBreakpoint.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    /* 
        Helper function for handleClick, returns the text that 
        should be displayed on language change.
    */
    getEditorCode(lang) {

        var val = '';
        var c = this.props.c;
        var cpp = this.props.cpp;

        if (lang === 'c') {
            /* If the C button was clicked... */
            val = c;
        } else if (lang === 'cpp') {
            /* If the C++ button was clicked */
            val = cpp;
        }

        return val;
    }

    /* 
        When a language button is clicked get appropriate code to be displayed
        Passes state up to CodeDoodle
    */
    handleLanguageChange(lang) {
        var val = this.getEditorCode(lang);
        this.props.onClick(val, lang);
    }

    /* 
        When something is changed in the code editor update the state accordingly
        Passes state up to CodeDoodle
    */
    handleEditorChange(val) {
        const lang = this.props.language;
        this.props.onChange(val, lang);
    }

    /*
        Checks if tab was pressed on key down
        If tab was pressed content and cursor will be indented
        Passes the new value, cursor position and a ref to the text area to CodeDoodle
    */
    handleKeyDown(start, end, ref) {
        this.props.onKeyDown(start, end, ref);
    }

    handleFileUpload(val, lang, filename) {
        this.props.onUpload(val, lang, filename);
    }

    /* 
        Fetch code editor input for conversion takes into account 
        where the first breakpoint is and only emits code before it, 
        alerts for now just to show code 
    */
    handleConvert() {
        const text = this.props.value;
        var bp = this.state.breakpoint[0];

        var lines = text.split(/\r\n|\r|\n/);
        var output = '';

        /* if no breakpoint is set, set to number of lines of code */
        if (bp === -1) {
            bp = lines.length;
        }

        for (let i = 0; i < bp; i++) {
            output += lines[i];
        }

        alert(output);
    }

    /* handles toggling a breakpoint and updates state accordingly */
    handleBreakpoint(line_num) {

        var bp = this.state.breakpoint;

        /* if the first element is -1, remove it */
        if (bp[0] === -1) {
            bp.shift();
        }

        var index = bp.indexOf(line_num);

        /* if the line number exists in the array of breakpoints... */
        if (index !== -1) {

            /* remove the line number from the array of breakpoints */
            bp.splice(index, 1);

            /* if the array is empty, add a -1 (doing this is utilized in handleConvert) */
            if (bp.length === 0) {
                bp.push(-1);
            }

        } else {

            /* if the line number isnt found in the array of breakpoints add it in */
            bp.push(line_num);

            /* sort array of breakpoints in ascending order */
            bp.sort(function (a, b) {
                return a - b
            });

        }

        /* update state accordingly */
        this.setState(state => ({
            breakpoint: bp
        }));
    }

    render() {
        return (
            <div className='code-panel'>
                <div className='code-panel-header'>
                    <button className='lang-btn' onClick={this.handleLanguageChange.bind(this, 'c')} autoFocus>C</button>
                    <button className='lang-btn' onClick={this.handleLanguageChange.bind(this, 'cpp')}>C++</button>
                    <button className='convert-btn' onClick={this.handleConvert}>Create Diagram</button>
                </div>

                <CodeEditor
                    value={this.props.value}
                    language={this.props.language}
                    onChange={this.handleEditorChange}
                    onKeyDown={this.handleKeyDown}
                    onClick={this.handleBreakpoint}
                    onUpload={this.handleFileUpload}
                />
            </div >
        );
    }
}

export default CodePanel;