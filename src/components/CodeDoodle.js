import React, { Component } from 'react';
import './CodeDoodle.css';
import CodePanel from './CodePanel';
import DownloadButton from './DownloadButton';
import UploadButton from './UploadButton';
import Toggalable from './Toggalable';
import ARDiagramDrawArea from '../ARdiagram/ARDiagramDrawArea';
import Droppable from './Droppable';
import Anchor from './Anchor'

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

    Xarrows must be rendered last in the DOM in order to show up on top of everything else
*/

const DroppableDrawArea = Droppable(ARDiagramDrawArea);

class CodeDoodle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorOpen: false,
            drawOpen: true,
            drawInfoOpen: false,
            arrowConnectionPointsOpen: false,
            stackOpen: true,
            heapOpen: true,
            staticOpen: true,
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
            stat: [],
            classes: [],
            anchors: [{number:1}],
            arrows: [{fromRef:'var-b0', toDivID:'var-a0'}],
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.toggleEditor = this.toggleEditor.bind(this);
        this.toggleDraw = this.toggleDraw.bind(this);
        this.toggleDrawInfo = this.toggleDrawInfo.bind(this);
        this.toggleArrowConnectionPoints = this.toggleArrowConnectionPoints.bind(this);
        this.toggleStack = this.toggleStack.bind(this);
        this.toggleHeap = this.toggleHeap.bind(this);
        this.toggleStatic = this.toggleStatic.bind(this);

        this.handleStack = this.handleStack.bind(this);
        this.handleClasses = this.handleClasses.bind(this);
        this.handleArrows = this.handleArrows.bind(this);
        this.spawnAnchor = this.spawnAnchor.bind(this);
        this.generateCode = this.generateCode.bind(this);
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

    /* toggles the stack section */
    toggleStack() {
        this.setState(state => ({
            stackOpen: !state.stackOpen
        }));
    }

    /* toggles the heap section */
    toggleHeap() {
        this.setState(state => ({
            heapOpen: !state.heapOpen
        }));
    }

    /* toggles the static section */
    toggleStatic() {
        this.setState(state => ({
            staticOpen: !state.staticOpen
        }));
    }

    toggleDrawInfo() {
        this.setState(state => ({
            drawInfoOpen: !state.drawInfoOpen
        }));
    }

    toggleArrowConnectionPoints() {
        this.setState(state => ({
            arrowConnectionPointsOpen: !state.arrowConnectionPointsOpen
        }));
    }

    /*handles something being dropped on the ARDrawArea */
    handleARDrawAreaDrop(item) {
        // alert("(in codedoodle) anchor dropped item: " + item);
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

    handleStatic(frames) {
        this.setState(state => ({
            stat: frames
        }));
    }

    /* updates the classes */
    handleClasses(classList) {
        this.setState(state => ({
            classes: classList
        }));
    }

    // might delete not currently in use
    handleArrows(arrowList){
        this.setState(state => ({
            arrows: arrowList
        }));
    }

    spawnAnchor() {
        alert('spawning anchor')
    }

    generateCode(data) {
        this.setState(state => ({
            user_c_code: data,
            value: data,
            editorOpen: true,
            drawOpen: false,
            drawInfoOpen: false,
        }));
    }

    render() {
        const { user_c_code, user_cpp_code, language, value } = this.state;
        const { stack, heap, stat, classes, arrows, anchors } = this.state;
        const { editorOpen, drawOpen, stackOpen, heapOpen, staticOpen, drawInfoOpen, arrowConnectionPointsOpen } = this.state;

        return (
            <div className="App">
                <div className='header'>
                    <ul>
                        <div className='drop'>
                            <button className='drop-btn'>File</button>
                            <div className='drop-content'>
                                <UploadButton onClick={this.handleFileUpload} />
                                <DownloadButton extension='c' fileType='C' file={user_c_code} />
                                <DownloadButton extension='cpp' fileType='C++' file={user_cpp_code} />
                                {/* <DownloadButton fileType='Diagram' /> */}
                            </div>
                        </div>

                        <div className='drop'>
                            <button className='drop-btn'>Edit</button>
                            <div className='drop-content'></div>
                        </div>

                        <div className='drop'>
                            <button className='drop-btn'>View</button>
                            <div className='drop-content'>
                                <button onClick={this.toggleEditor}><Toggalable toggle={editorOpen} alt={'View'}>Hide</Toggalable> Editor</button>
                                <button onClick={this.toggleDraw}><Toggalable toggle={drawOpen} alt={'View'}>Hide</Toggalable> Draw</button>
                                <button onClick={this.toggleStack}><Toggalable toggle={stackOpen} alt={'View'}>Hide</Toggalable> Stack</button>
                                <button onClick={this.toggleHeap}><Toggalable toggle={heapOpen} alt={'View'}>Hide</Toggalable> Heap</button>
                                <button onClick={this.toggleStatic}><Toggalable toggle={staticOpen} alt={'View'}>Hide</Toggalable> Static</button>
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
                    <Toggalable toggle={drawOpen} alt={null}>
                        <DroppableDrawArea
                            drawInfoOpen={drawInfoOpen}
                            arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                            static={stat}
                            staticOpen={staticOpen}
                            stack={stack}
                            stackOpen={stackOpen}
                            heap={heap}
                            heapOpen={heapOpen}
                            stat={stat}
                            classes={classes}
                            onStackChange={this.handleStack}
                            onStaticChange={this.handleStatic}
                            onClassesChange={this.handleClasses}
                            generateCode={this.generateCode}
                            toggleDrawInfo={this.toggleDrawInfo}
                            toggleArrowConnectionPoints={this.toggleArrowConnectionPoints}
                            handleDrop={this.handleARDrawAreaDrop}
                            spawnAnchor={this.spawnAnchor}
                        />
                    </Toggalable>

                    <Toggalable toggle={editorOpen} alt={null}>
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
                    </Toggalable>
                </div>

                {anchors.map((index) =>
                    <Anchor key={index} number={1} >
                        <h2 id={'anchor-1'} className='anchor'>anchor-1</h2>
                    </Anchor>
                )}

            </div >
        );
    }
}

export default CodeDoodle;