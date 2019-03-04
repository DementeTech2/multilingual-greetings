import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeLanguage } from "../actions/index";

class LanguageSelector extends Component {

    handleOnChange(event) {
        this.props.dispatch(changeLanguage(event.target.value));
    }
    render() {
        return (
            <select className="language-selector" value={this.props.languageSelected} onChange={(event) => this.handleOnChange(event)}>
                {
                    Object.keys(this.props.languages).map((keyName, i) => (
                        <option key={keyName} value={keyName}>{this.props.languages[keyName]}</option>
                    ))
                }
            </select>
        );
    }
}

function mapStateToProps(state) {
    const languages = state.languages.list;
    const languageSelected = state.languages.selected;
    return {
        languages,
        languageSelected
    }
  }
  
  export default connect(mapStateToProps)(LanguageSelector)