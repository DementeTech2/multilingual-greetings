import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../styles/Greetings.css';

class Greetings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            awesome: false
        }
    }

    toggleStyle(ev){
        this.setState({
            awesome: Boolean(ev.target.checked)
        })
    }

    render() {
        return (
            <div className="greetings">
                <label>
                    Toggle awesome style
                    <input type="checkbox" onChange={ev => this.toggleStyle(ev)}/>
                </label>
                {this.props.namesList.map((elem, i) => (
                    <h3 key={i} className={ this.state.awesome? "awesome":'' }>{this.props.singleGreatting} {elem}</h3>
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const isLoadingLanguages = state.languages.isLoading;
    const isLoadingTranslation = state.greetings.isLoading;
    const namesList = state.namesList;
    const singleGreatting = state.greetings.singleGreatting;
    return {
        singleGreatting,
        isLoadingLanguages,
        isLoadingTranslation,
        namesList
    }
  }
  
  export default connect(mapStateToProps)(Greetings)