import React, { Component } from 'react';
import './StackFrame.css';
import Variable from './Variable';

class StackFrame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            local: [],
            args: [],
        };

        this.handleAddLocalVar = this.handleAddLocalVar.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.dropRef = React.createRef();
    }

    componentDidMount() {
        const drop = this.dropRef.current;
        drop.addEventListener('dragover', this.handleDragOver);
        drop.addEventListener('drop', this.handleDrop);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        var text = e.dataTransfer.getData('Text');

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else {

            var new_var = {
                type: text,
                name: 'a',
                value: '0'
            };
            var loc = this.state.local;
            loc.push(new_var);

            this.setState(state => ({
                local: loc
            }));

        }
    }

    handleDrag(e) {
        e.dataTransfer.setData('Text', e.target.id);
    }

    render() {
        const local = this.state.local;
        return (
            <div ref={this.dropRef} className='stack-frame'>
                <ul className='local-variables'>
                    {local.map((variable, index) => {
                        return (
                            <li key={index}>
                                <Variable
                                    type={variable.type}
                                    name={variable.name}
                                    value={variable.value}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default StackFrame;