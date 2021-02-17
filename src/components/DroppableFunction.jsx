import React, { Component } from 'react';

/* 
    Higher Order Component that can be used to make another component 'droppable'
    Meaning, something can be dropped onto it and it will handle such action

    ** Droppable manages no state and expects its parent component to manage state **

    Running example: You have parent component X and child component Y, you want component Y to be droppable

    Particular things need to be done to make this work (in any order):

    1. Wrap the component you want to be droppable (make sure Droppable.js is imported)
        
            - const <NewComponentName> = Droppable(Y); (where <NewComponentName> is whatever you want)
        
        - Then you can render the new droppable Y component as <NewComponentName>

        - This is essentially creating:

            <Droppable>
                <Y />
            </Droppable>

    2. Pass some required information to <NewComponentName>
        
        - This should be done in the form:

            <NewComponentName
                value={}
                handleDrop={}
            />
        
        - value is whatever info the child component Y should be handling on drop, likely state
        - handleDrop is access to parent component X's handleDrop function
            - it will likely save state in component X or pass state further up
        - any other extra attributes of your own can be passed to child component Y, 
          they will be passed through as is and can be accessed in Y as expected

    3. Create a function called handleDrop() in component Y, this will likely be the logic to handle the drop
        In other words, whatever needs to happen on drop for component Y is implemented here

        This function needs to do two things:

        1. it needs to receive two arguments (text, value), you can call text and value whatever you want though
            - text is information about what has been dragged 
                (i.e. you drag Int from the drawing icons, text will be 'int', this info is specified and created in DrawingIcons)
            - value is the value attribute passed in step 2., again likely state
        2. it needs to return the outcome of the drop
            Note: since value could likely be state make sure you return all necessary state as it will likely be updated as such

    And that it! This is lengthy but it really isn't that complicated, if you want to see an 
    examples look at files StackFrame.js (would be component X 
    in running example) and ARHalfFrame.js (would be component Y in running example), or ARDiagramDrawArea.js and any of ARStack/Heap/StaticArea.js, Heap and Static are not implemented right now and are just the skeleton so that could be a good place to start! 
    
     How Droppable works will be explained below as well, so have a look at the rest of this file if needed.
*/

/* Droppable receives a component as an argument (i.e. Y in running example)... */
function Droppable (WrappedComponent) {
    /* ... and will return another component (i.e. <NewComponentName> in step 1.)*/
    return class extends Component {
        constructor(props) {
            super(props);

            this.dropRef = React.createRef();
            this.handleDrop = this.handleDrop.bind(this);
        }

        /* 
            On mount, it will get the ref to the new component and attach event listeners for:
                - dragover event (which will be handled by function handleDragOver)
                - drop event (which will be handled by function handleDrop)
        */
        componentDidMount() {
            const drop = this.dropRef.current;
            drop.addEventListener('dragover', this.handleDragOver);
            drop.addEventListener('drop', this.handleDrop);
        }

        /* Prevents unwanted functionality when dragging item over valid drop targets */
        handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        /* Prevents unwanted functionality on drop, and... */
        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();

            /* ... gets information about whats being dragged (info set in DrawingIcons)*/
            var text = e.dataTransfer.getData('Text');

            /* information that is to be handled by Y's unique handleDrop function */
            var { value, classes, id } = this.props;

            /* 
                This is why step 3. is important!
                This calls Y's handleDrop function and gets the new state from it
            */
            console.log("Droppable Function")
            console.log(text);
            this.props.handleDrop(this.props, text);

            // value = WrappedComponent.prototype.handleDrop(text, value, classes);
            // console.log('returned....');
            // /* Passes the new state up to component X to be handled  */
            // this.props.handleDrop(value, id);
        }

        /* 
            You can see here that the ref is wrapped around what would be component Y 
            {...this.props} is just passing all attributes you gave <NewComponentName> as props to component Y, as stated earlier these can be accessed as you would expect in component Y (again you must pass things specified in step 2., but you can pass as many extra things as you would like)
    
            Class 'droppable' can be found in CodeDoodle.css if changes need to be made,
            as of now it tries to fit the width and height of its container, and has a min-height
            of 100px just in case it can't do this.
        */
        render() {
            return (
                <div className='droppable' ref={this.dropRef} >
                    {console.log("DroppableFunction Return")}
                    {console.log(this.props)}
                    <WrappedComponent {...this.props} />
                </div >
            );
        }
    }
}

export default Droppable;