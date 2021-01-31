<<<<<<< HEAD
import React, { Component } from 'react';

/* 
    Download button component 
    Receives props: 
        - extension: the extension of the file to be downloaded, appended to end of file name (myFile is defaut right now)
        - fileType: file type to be displayed to the user on the actual button
        - file: the contents of the file to be downloaded
*/
class DownloadButton extends Component {

    /* 
        Creates and downloads the file uses props:
            - extension
            - file
    */
    downloadFile = () => {

        const editor = document.createElement("a");
        const file = new Blob([this.props.file],
            { type: 'text/plain;charset=utf-8' });
        editor.href = URL.createObjectURL(file);
        editor.download = "myFile." + this.props.extension;
        document.body.appendChild(editor);
        editor.click();
    }

    /* 
        Renders the button, downloads appropriate file on click
        Uses props:
            - fileType
    */
    render() {
        return (
            <button onClick={this.downloadFile}>Download {this.props.fileType}</button>
        );
    }
}

=======
import React, { Component } from 'react';

/* 
    Download button component 
    Receives props: 
        - extension: the extension of the file to be downloaded, appended to end of file name (myFile is defaut right now)
        - fileType: file type to be displayed to the user on the actual button
        - file: the contents of the file to be downloaded
*/
class DownloadButton extends Component {

    /* 
        Creates and downloads the file uses props:
            - extension
            - file
    */
    downloadFile = () => {

        const editor = document.createElement("a");
        const file = new Blob([this.props.file],
            { type: 'text/plain;charset=utf-8' });
        editor.href = URL.createObjectURL(file);
        editor.download = "myFile." + this.props.extension;
        document.body.appendChild(editor);
        editor.click();
    }

    /* 
        Renders the button, downloads appropriate file on click
        Uses props:
            - fileType
    */
    render() {
        return (
            <button onClick={this.downloadFile}>Download {this.props.fileType}</button>
        );
    }
}

>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
export default DownloadButton;