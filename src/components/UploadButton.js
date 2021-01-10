import React, { Component } from 'react';

/*  
    Upload button component, labeled 'Open' under 'File' dropdown
    
    Recevies props:
     - onClick: access to CodeDoodles onClick function
*/
class UploadButton extends Component {

    constructor(props) {
        super(props);

        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    /* 
        Gets file, parses out file information, extension, and filename 
        Accepts text/plain (which includes c/c++) and application/json file types
    */
    handleFileUpload = (e) => {
        const [file] = e.target.files;
        if (file) {

            /* getting the extension of the file */
            var length = file.name.length;
            var ext_pos = file.name.indexOf('.') + 1;
            var ext = file.name.slice(ext_pos, length);

            /* reading and sending info to CodeDoodle component */
            const reader = new FileReader();
            reader.onload = (e) => {
                this.props.onClick(e.target.result, ext, file.name);
            }
            reader.readAsText(file);
        }
    };

    render() {
        return (
            <div>
                <input className='open-file' id='upload' name='upload' type='file' accept='text/plain,application/json' multiple={false} onChange={this.handleFileUpload} />
                <label className='open-label' htmlFor='upload'>Open</label>
            </div >
        );
    }
}

export default UploadButton;