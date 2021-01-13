import React, { Component } from 'react';
import './CodeDoodle.css';
import CodePanel from './CodePanel';
import DownloadButton from './DownloadButton';
import UploadButton from './UploadButton';

/*
    TODO:
     - Fix syntax highlighting 
        - kind of done, i think its good enough for now
     - improve code editor 
        - tab now indents instead
        - maybe make undo better?
            - might have to a copy of previous state to do so
     - fill out more dropdowns

    The main component.
    Manages all the state as of now and displays the entire application.

    State:
     - user_c_code: c code the user has inputed
     - user_cpp_code: c++ code the user has inputed
     - language: the currently selected language
     - value: the code currently displayed in the code editor
*/

class CodeDoodle extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
}`
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
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

    render() {
        const { user_c_code, user_cpp_code, language, value } = this.state;
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

                            </div>
                        </div>

                        <div className='drop'>
                            <button className='drop-btn'>Help</button>
                            <div className='drop-content'>

                            </div>
                        </div>
                    </ul>
                </div>

                <div className='drawing-panel'></div>

                <div className='drawing-area'></div>

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

            </div>
        );
    }
}

export default CodeDoodle;