import React, { Component } from 'react';
import { connect } from 'react-redux'
import Names from './Names.js'
import LanguageSelector from './LanguageSelector.js'
import Greetings from './Greetings.js'
import '../styles/App.css';

import { fetchLanguages } from "../actions/index";

class App extends Component {
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLanguages());
  }

  render() {

    const isLoading = this.props.isLoadingLanguages;

    return (
      <div className="App">
        <header className="App-header">
          { !isLoading &&
            <div>
              <Names />
              <LanguageSelector />
              <Greetings />
            </div>
          }
          <a className={"yandex"} href="http://translate.yandex.com/">Powered by Yandex.Translate</a>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const isLoadingLanguages = state.languages.isLoading;
  return {
    isLoadingLanguages
  }
}

export default connect(mapStateToProps)(App)