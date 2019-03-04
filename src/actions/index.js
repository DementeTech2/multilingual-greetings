

//  update names
//  change language
//  update languages list
//  update greetings list

//  get languages list  Async
//  transalate greetings Async

import { yandexTrCall } from "../utils";
import { FROM_LANGUAGE, GREETING } from "../config";

export const UPDATE_NAMES_LIST = 'UPDATE_NAMES'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export const REQUEST_LANGUAGES_LIST = 'REQUEST_LANGUAGES_LIST'
export const RECEIVE_LANGUAGES_LIST = 'RECEIVE_LANGUAGES_LIST'
export const REQUEST_TRANSLATION = 'REQUEST_TRANSLATION'
export const RECEIVE_TRANSLATION = 'RECEIVE_TRANSLATION'


function updateNamesList(names) {
  return {
      type: UPDATE_NAMES_LIST,
      names
  }
}


export function updateNames(namesList) {
    return (dispatch, getState) => {
      dispatch(updateNamesList(namesList))
      dispatch(requestTranslation())
    }
}


function receiveTranslation(json) {
  return {
    type: RECEIVE_TRANSLATION,
    greetingsList: json.text
  }
}


export function requestTranslation(newLanguage) {
  return (dispatch, getState) => {
    const state = getState();
    const toLanguage = newLanguage || state.languages.selected;

    if(state.namesList.length > 0){
      const textList = state.namesList.map(name => `${GREETING} ${name}`)

      dispatch({type: REQUEST_TRANSLATION})
      return yandexTrCall('/translate', 'POST', {'lang': `${FROM_LANGUAGE}-${toLanguage}`, 'text': textList})
            .then(response => response.json())
            .then(json => dispatch(receiveTranslation(json)));
    } else {
      dispatch(receiveTranslation({text:[]}))
    }
  }
}

export function changeLanguage(newLanguage) {
  return (dispatch, getState) => {
      let state = getState();

      if(state.languages.selected !== newLanguage) {
        dispatch({
          type: CHANGE_LANGUAGE,
          language: newLanguage
        });
        dispatch(requestTranslation(newLanguage))
      }
  }
}


function requestLanguagesList() {
  return {
    type: REQUEST_LANGUAGES_LIST
  }
}

function receiveLanguages(json) {
    let langsObj = json.langs;
    // let langsObj = json.dirs
    //     .filter((lang) => lang.startsWith(FROM_LANGUAGE))
    //     .map((lang) => lang.substr(3))
    //     .reduce((acc, lang) => {
    //       acc[lang] = json.langs[lang];
    //       return acc;
    //     }, {});

    return {
        type: RECEIVE_LANGUAGES_LIST,
        languagesList: langsObj,
        receivedAt: Date.now()
    }
}

export function fetchLanguages() {
    return (dispatch, getState) => {
        let state = getState();
        if( Object.entries(state.languages.list).length === 0 && state.languages.list.constructor === Object) {
            dispatch(requestLanguagesList())
            return yandexTrCall('/getLangs', 'GET', {'ui': FROM_LANGUAGE})
                .then(response => response.json())
                .then(json => dispatch(receiveLanguages(json)));
        }
    }
}
