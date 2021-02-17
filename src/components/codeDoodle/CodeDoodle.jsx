import React, { Component, useState } from 'react';
import './CodeDoodle.css';
import CodePanel from '../CodePanel';
import DownloadButton from '../DownloadButton';
import UploadButton from '../UploadButton';
import Toggalable from '../Toggalable';
import ARDiagramDrawArea from '../../ARdiagram/ARDiagramDrawArea';
import Droppable from '../Droppable';
import Anchor from '../anchor/Anchor'
import { selectReRenderToggle } from '../../GeneralDiagrams/Arrow/arrowSlice';
import { useDispatch,  useSelector} from 'react-redux'
import {updateStack, selectStack} from "./stackSlice"

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

function CodeDoodle() {
    const dispatch = useDispatch()

    const [render, setRender] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [drawOpen, setDrawOpen] = useState(true);
    const [drawInfoOpen, setDrawInfoOpen] = useState(false);
    const [arrowConnectionPointsOpen, setArrowConnectionPointsOpen]= useState(false);
    const [stackOpen, setStackOpen] = useState(true);
    const [heapOpen, setHeapOpen] = useState(true);
    const [staticOpen, setStaticOpen] = useState(true);
    const [user_c_code, set_user_c_code] = useState(`#include <stdio.h>
    int main() {
    // printf() displays the string inside quotation
    printf("Hello, World!");
    return 0;
    }`);
    const [user_cpp_code, set_user_cpp_code] = useState( `// Your First C++ Program

    #include <iostream>
    
    int main() {
    std::cout << "Hello World!";
    return 0;
    }`);
    const [language, setLanguage] = useState('c');
    const [value, setValue] = useState(`#include <stdio.h>
    int main() {
    // printf() displays the string inside quotation
    printf("Hello, World!");
    return 0;
    }`);
    const [stack, setStack] = useState([]);
    const [heap, setHeap] = useState([]);
    const [stat, setStat] = useState([]);
    const [classes, setClasses] = useState([]);
    const [anchors, setAnchors] = useState([{number:1}]);
    const [arrows, setArrows] = useState([{fromRef:'var-b0', toDivID:'var-a0'}]);

    /* toggles the code editor */
    const toggleEditor = () => {
        setEditorOpen(!editorOpen)
    }

    /* toggles the drawing editor */
    const toggleDraw = () => {
        setDrawOpen(!drawOpen)
    }

    /* toggles the stack section */
    const toggleStack = () => {
        setStackOpen(!stackOpen)
    }

    /* toggles the heap section */
    const toggleHeap= () => {
        setHeapOpen(!heapOpen)
    }
    const toggleRender= () => {
        setRender(!render)
    }

    /* toggles the static section */
    const toggleStatic = () => {
        setStaticOpen(!staticOpen)
    }

    const toggleDrawInfo = () => {
        setDrawInfoOpen(!drawInfoOpen)
    }

    const toggleArrowConnectionPoints= () => {
        setArrowConnectionPointsOpen(!arrowConnectionPointsOpen)
    }

    /*handles something being dropped on the ARDrawArea */
    const handleARDrawAreaDrop = (item) => {
        // alert("(in codedoodle) anchor dropped item: " + item);
    }

    /* 
        Updates changes made in the code editor and file uploads, saves state:
        - value
        - user_c/cpp_code, whichever is currently selected
     */
    const handleEditorChange = (val, lang) => {

        switch (lang) {
            case 'c':
                set_user_c_code(val)
                setValue(val)
                break;

            case 'cpp':
                set_user_cpp_code(val)
                setValue(val)
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
   const handleLanguageChange = (val, lang) => {
        setLanguage(lang)
        setValue(val)
    }

    /* 
        Displays information from an uploaded file, indicates filename and displays in appropriate language

        * NOTE: the double space in final_val is intentional *
    */
   const handleFileUpload = (val, lang, filename) => {

        var final_val = `/* Displaying contents of ${filename} */
        
${val}`;

        handleEditorChange(final_val, lang);
    }

    /*
        Checks if tab was pressed on key down
        If tab was pressed indents content and cursor and updates state
    */
   //This might be broken
   const handleKeyDown = (start, end, ref) =>{
   
        setValue(value.substring(0, start) + "    " + value.substring(end))
        
            ref.selectionStart = ref.selectionEnd =
                start + 4;
        
    }

    /* updates state of the stack section */
    const handleStack= (frames) => {
        // setStack(frames);
        dispatch(updateStack(frames))   
        toggleRender()
    }

    const handleStatic= (frames) => {
        setStat(frames)
        toggleRender()
    }

    /* updates the classes */
    const handleClasses= (classList) => {
        setClasses(classList)
        toggleRender()
    }

    // might delete not currently in use
    const handleArrows= (arrowList)=>{
        setArrows(arrowList)
    }

    const spawnAnchor=()=> {
        alert('spawning anchor')
    }

    const generateCode= (data)=> {
        set_user_c_code( data)
        setValue(data)
        setEditorOpen( true)
        setDrawOpen(false)
        setDrawInfoOpen( false)
    }
    
    return (
        <div className="App">
            <div className='header'>
                <ul>
                    <div className='drop'>
                        <button className='drop-btn'>File</button>
                        <div className='drop-content'>
                            <UploadButton onClick={handleFileUpload} />
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
                            <button onClick={toggleEditor}><Toggalable toggle={editorOpen} alt={'View'}>Hide</Toggalable> Editor</button>
                            <button onClick={toggleDraw}><Toggalable toggle={drawOpen} alt={'View'}>Hide</Toggalable> Draw</button>
                            <button onClick={toggleStack}><Toggalable toggle={stackOpen} alt={'View'}>Hide</Toggalable> Stack</button>
                            <button onClick={toggleHeap}><Toggalable toggle={heapOpen} alt={'View'}>Hide</Toggalable> Heap</button>
                            <button onClick={toggleStatic}><Toggalable toggle={staticOpen} alt={'View'}>Hide</Toggalable> Static</button>
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
                    {
                        //Remove me later
                        console.log("Codedoodle")
                       
                    }
                    {
                         console.log(useSelector(selectStack))
                    }
                    <DroppableDrawArea
                        drawInfoOpen={drawInfoOpen}
                        arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                        static={stat}
                        staticOpen={staticOpen}
                        stack={useSelector(selectStack)}
                        stackOpen={stackOpen}
                        heap={heap}
                        heapOpen={heapOpen}
                        stat={stat}
                        classes={classes}
                        onStackChange={handleStack}
                        onStaticChange={handleStatic}
                        onClassesChange={handleClasses}
                        generateCode={generateCode}
                        toggleDrawInfo={toggleDrawInfo}
                        toggleArrowConnectionPoints={toggleArrowConnectionPoints}
                        handleDrop={handleARDrawAreaDrop}
                        spawnAnchor={spawnAnchor}
                    />
                </Toggalable>

                <Toggalable toggle={editorOpen} alt={null}>
                    <CodePanel
                        c={user_c_code}
                        cpp={user_cpp_code}
                        language={language}
                        value={value}
                        onChange={handleEditorChange}
                        onClick={handleLanguageChange}
                        onKeyDown={handleKeyDown}
                        onUpload={handleFileUpload}
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

export default CodeDoodle;