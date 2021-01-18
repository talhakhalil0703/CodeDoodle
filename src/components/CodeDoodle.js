import React, { Component } from 'react';
import './CodeDoodle.css';
import CodePanel from './CodePanel';
import DownloadButton from './DownloadButton';
import UploadButton from './UploadButton';

import DrawingPanel from '../depreciated/DrawingPanel';

import ARDiagramDrawArea from '../ARdiagram/ARDiagramDrawArea';

/*
    The main component.
    Manages all the state as of now and displays the entire application.

    State:
     - editorOpen: whether or not the code editor should be displayed
     - drawOpen: whether or not the draw editor should be displayed
     - user_c_code: c code the user has inputed
     - user_cpp_code: c++ code the user has inputed
     - language: the currently selected language
     - value: the code currently displayed in the code editor
     - stack: all info in the stack section
     - stat: all info in the static section
     - heap: all info in the heap section
*/

class CodeDoodle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorOpen: true,
            drawOpen: true,
            user_c_code: `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`,
            user_cpp_code: `// Your First C++ Program

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`,
            language: 'c',
            value: `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`,
            stack: [],
            heap: [],
            stat: []
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.toggleEditor = this.toggleEditor.bind(this);
        this.toggleDraw = this.toggleDraw.bind(this);

        this.handleStack = this.handleStack.bind(this);
    }

    /* toggles the code editor */
    toggleEditor() {
        this.setState(state => ({
            editorOpen: !state.editorOpen
        }));
    }

    /* toggles the drawing editor */
    toggleDraw() {
        this.setState(state => ({
            drawOpen: !state.drawOpen
        }));
    }

    /* 
        Updates changes made in the code editor and file uploads, saves state:
        - value
        - user_c/cpp_code, whichever is currently selected
     */
    handleEditorChange(val, lang) {

        switch (lang) {
            case 'c':
                this.setState(state => ({
                    user_c_code: val,
                    value: val
                }));
                break;

            case 'cpp':
                this.setState(state => ({
                    user_cpp_code: val,
                    value: val
                }));
                break;

            default:
                alert('Something went wrong...')
                break;

        }
    }

    /* 
        Updates language changes, saves state:
         - language
         - value
    */
    handleLanguageChange(val, lang) {
        this.setState(state => ({
            language: lang,
            value: val
        }));
    }

    /* 
        Displays information from an uploaded file, indicates filename and displays in appropriate language

        * NOTE: the double space in final_val is intentional *
    */
    handleFileUpload(val, lang, filename) {

        var final_val = `/* Displaying contents of ${filename} */
        
${val}`;

        this.handleEditorChange(final_val, lang);
    }

    /*
        Checks if tab was pressed on key down
        If tab was pressed indents content and cursor and updates state
    */
    handleKeyDown(start, end, ref) {
        this.setState(
            prevState => ({
                value:
                    prevState.value.substring(0, start) + "    " + prevState.value.substring(end)
            }),
            /* Updates cursor position after state has been updated */
            () => {
                ref.selectionStart = ref.selectionEnd =
                    start + 4;
            }
        );
    }

    /* updates state of the stack section */
    handleStack(frames) {
        this.setState(state => ({
            stack: frames
        }));
    }

    render() {
        const { user_c_code, user_cpp_code, language, value, stack, heap, stat } = this.state;
        return (
            <div className="App">
                <div className='header'>
                    <ul>
                        <div className='drop'>
                            <button className='drop-btn'>File</button>
                            <div className='drop-content'>
                                <UploadButton onClick={this.handleFileUpload} />
                                <DownloadButton
                                    extension='c'
                                    fileType='C'
                                    file={user_c_code}
                                />
                                <DownloadButton
                                    extension='cpp'
                                    fileType='C++'
                                    file={user_cpp_code}
                                />

                                {/* <DownloadButton
                                    fileType='Diagram'
                                /> */}
                            </div>
                        </div>

                        <div className='drop'>
                            <button className='drop-btn'>Edit</button>
                            <div className='drop-content'>

                            </div>
                        </div>

                        <div className='drop'>
                            <button className='drop-btn'>View</button>
                            <div className='drop-content'>
                                <button onClick={this.toggleEditor}>Hide Editor</button>
                                <button onClick={this.toggleDraw}>Hide Draw</button>
                            </div>
                        </div>

                        <div className='drop'>
                            <button className='drop-btn'>Help</button>
                            <div className='drop-content'>

                            </div>
                        </div>
                    </ul>
                </div>

                <div className='base'>
                    {/* {this.state.drawOpen ? (
                        <DrawingPanel
                            stack={stack}
                            heap={heap}
                            stat={stat}
                            onStackChange={this.handleStack}
                        />
                    ) : null} */}

                    {this.state.drawOpen ? (
                        <ARDiagramDrawArea
                            stack={stack}
                            heap={heap}
                            stat={stat}
                            onStackChange={this.handleStack}
                        />
                    ) : null}

                    {this.state.editorOpen ? (
                        <CodePanel
                            c={user_c_code}
                            cpp={user_cpp_code}
                            language={language}
                            value={value}
                            onChange={this.handleEditorChange}
                            onClick={this.handleLanguageChange}
                            onKeyDown={this.handleKeyDown}
                            onUpload={this.handleFileUpload}
                        />
                    ) : null}
                </div>

            </div >
        );
    }
}

export default CodeDoodle;