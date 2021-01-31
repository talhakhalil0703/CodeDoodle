<<<<<<< HEAD
import React, { Component } from 'react';

class DragAndDropFiles extends Component {
    constructor(props) {
        super(props);

        this.dropRef = React.createRef();
    }

    componentDidMount() {
        const drop = this.dropRef.current;
        drop.addEventListener('dragover', this.handleDragOver);
        drop.addEventListener('drop', this.handleFileUpload);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    /* 
        Gets file, parses out file information, extension, and filename 
        Accepts text/plain (which includes c/c++) and application/json file types
    */
    handleFileUpload = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const [file] = e.dataTransfer.files;
        if (file) {

            /* getting the extension of the file */
            var length = file.name.length;
            var ext_pos = file.name.indexOf('.') + 1;
            var ext = file.name.slice(ext_pos, length);

            /* reading and sending info to CodeDoodle component */
            const reader = new FileReader();
            reader.onload = (e) => {
                this.props.onUpload(e.target.result, ext, file.name);
            }
            reader.readAsText(file);
        }
    };

    render() {
        return (
            <div ref={this.dropRef} className='editor'>
                {this.props.children}
            </div>
        );
    }

}

=======
import React, { Component } from 'react';

class DragAndDropFiles extends Component {
    constructor(props) {
        super(props);

        this.dropRef = React.createRef();
    }

    componentDidMount() {
        const drop = this.dropRef.current;
        drop.addEventListener('dragover', this.handleDragOver);
        drop.addEventListener('drop', this.handleFileUpload);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    /* 
        Gets file, parses out file information, extension, and filename 
        Accepts text/plain (which includes c/c++) and application/json file types
    */
    handleFileUpload = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const [file] = e.dataTransfer.files;
        if (file) {

            /* getting the extension of the file */
            var length = file.name.length;
            var ext_pos = file.name.indexOf('.') + 1;
            var ext = file.name.slice(ext_pos, length);

            /* reading and sending info to CodeDoodle component */
            const reader = new FileReader();
            reader.onload = (e) => {
                this.props.onUpload(e.target.result, ext, file.name);
            }
            reader.readAsText(file);
        }
    };

    render() {
        return (
            <div ref={this.dropRef} className='editor'>
                {this.props.children}
            </div>
        );
    }

}

>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
export default DragAndDropFiles;