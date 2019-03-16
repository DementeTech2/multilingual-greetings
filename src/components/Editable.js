import React, { Component } from 'react';
import { connect } from 'react-redux'


import { updateSingleName} from ''

class Editable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            original: this.props.original
        };
    }

    openInput(){
        this.setState({
            editing: true
        })
    }

    updateName(event){
        if (event.key === 'Enter') {
            this.setState({
                editing: false
            });

            let {dispatch, original, key} = this.props;

            if(this.state.original !== original) {
                dispatch(updateSingleName(key, this.state.original))
            }
        }
    }

    render() {
        return (
            <h3 onClick={event=>this.openInput()}>{this.props.translation}<input value={this.state.original} onKeyUp={event => this.updateName(event)}/></h3>
        );
    }
}

export default connect()(Editable)