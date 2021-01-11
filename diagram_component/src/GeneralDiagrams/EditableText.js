import React from 'react'

export default class EditableText extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        name: props.name,
        type: props.type||'text',
        value: props.value||'',
        editClassName: props.editClassName,
        edit: false
      }
    }

    edit = () => {
        this.setState(() => ({
            edit:this.state.edit!==false
        }))
    }

    render() {
      return (
        this.state.edit===true&&
        <input
            maxLength="40"
            name={this.state.name}
            type={this.state.type}
            value={this.state.value}
            className={this.state.editClassName}
            autoFocus
            onFocus={event=>{
                const value = event.target.value
                event.target.value = ''
                event.target.value = value
            this.setState({backup:this.state.value})
            }}
            onChange={event=>{
                this.setState({value:event.target.value})
            }}

            onKeyDown={event=>{
                if(event.key=='Enter'){
                    this.setState({edit:false})
                }
            }}
            onKeyUp={event=>{
                if(event.key==='Escape') {
                    this.setState({edit:false, value:this.state.backup})
                }
            }}
        />
        ||
        <span onClick={event=>{
            this.setState({edit:this.state.edit!==true})
            }}>
            {this.state.value}
        </span>
      )
    }
}