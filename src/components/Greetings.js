import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../styles/Greetings.css';

class Greetings extends Component {
    render() {
        return (
            <div className="greetings">
                <a href="http://translate.yandex.com/">Powered by Yandex.Translate</a>
                {this.props.greetingsList.map((elem, i) => (
                    <h3 key={i}>{elem}</h3>
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const isLoadingLanguages = state.languages.isLoading;
    const isLoadingTranslation = state.greetings.isLoading;
    const greetingsList = state.greetings.list;
    return {
      isLoadingLanguages,
      isLoadingTranslation,
      greetingsList
    }
  }
  
  export default connect(mapStateToProps)(Greetings)