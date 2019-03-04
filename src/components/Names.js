import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Names.css';
import { updateNames } from "../actions/index";
import { debounce } from "debounce";

class Names extends Component {


    dispatchEvent = debounce(namesList => {
        const {dispatch} = this.props;
        dispatch(updateNames(namesList));
    }, 350)

    handleOnChange(event){
        const namesList = event.target.value.split("\n").filter(Boolean);
        this.dispatchEvent(namesList)
    }

    render() {
        return (
            <textarea className="names" rows={10} cols={30} 
                onChange={(event) => this.handleOnChange(event)}>
            </textarea>
        );
    }
}

function mapStateToProps(state) {
    const namesList = state.namesList;
    return {
        namesList
    }
}
  
export default connect(mapStateToProps)(Names)