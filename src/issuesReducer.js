import {SET_ISSUES} from './issuesAction';

const initialState = {
    issues: [],
    baseUrl: 'https://api.github.com/',
    repos: 'repos/',
    owner: 'zalmoxisus/',
    repo: 'redux-devtools-extension/',
    iss: 'issues'
};

export function issuesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ISSUES:
            return {
                ...state,
                issues: action.payload
            };
        default:
            return state;
        }
}