import { combineReducers } from 'redux';
import { RECEIVE_LANGUAGES_LIST, REQUEST_LANGUAGES_LIST, CHANGE_LANGUAGE } from "../actions/index";
import { RECEIVE_TRANSLATION, REQUEST_TRANSLATION } from "../actions/index";
import { UPDATE_NAMES_LIST } from "../actions/index";

const initialState = {
    languages: {
        selected: 'es',
        list: {},
        isLoading: true
    },
    namesList: [],
    greetings :{
        list: [],
        isLoading: true
    }
}


function languages( state = initialState.languages, action ) {
    switch (action.type) {
        case REQUEST_LANGUAGES_LIST:
            return Object.assign({}, state, {isLoading: true});
        case RECEIVE_LANGUAGES_LIST:
            return {
                selected: Object.keys(action.languagesList)[0],
                isLoading: false,
                list: action.languagesList
            };   
        case CHANGE_LANGUAGE:
            return Object.assign({}, state, {selected: action.language});
        default:
            return state;
    }
}

function greetings(state = initialState.greetings, action) {
    switch (action.type) {
        case REQUEST_TRANSLATION:
            return Object.assign({}, state, {isLoading: true});
        case RECEIVE_TRANSLATION:
            return {
                isLoading: false,
                list: action.greetingsList
            };
        default:
            return state;
    }
}

function namesList(state = initialState.namesList, action) {
    switch (action.type) {
        case UPDATE_NAMES_LIST:
            return action.names;
        default:
            return state;
    }
}

const appReducers = combineReducers({
    languages,
    greetings,
    namesList
})
  
export default appReducers;
