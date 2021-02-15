import { Component } from 'react';

/* 
    Wrapper component that will make the wrapped component 'toggalable' 
    It expects that the parent component manages the toggle state, and uses this state to display
    whatever is necessary.

    Receives props:
        - toggle: the toggle state from the parent
        - alt: whatever should be displayed on toggle, pass null if component should be hidden
*/
class Toggalable extends Component {

    render() {
        const { toggle, alt } = this.props;
        return (
            toggle ? (
                this.props.children
            ) : alt
        );
    }
}

export default Toggalable;