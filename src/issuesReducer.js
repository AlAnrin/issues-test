import {SET_ISSUES, SET_OWNER, SET_REPO} from './issuesAction';

const initialState = {
    issues: [],
    baseUrl: 'https://api.github.com/',
    repos: 'repos/',
    owner: 'zalmoxisus',
    repo: 'redux-devtools-extension',
    iss: 'issues',
    page: '0'
};

export function issuesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ISSUES:
            return {
                ...state,
                issues: action.payload
            };
        case SET_OWNER:
            return {
                ...state,
                owner: action.payload
            };
        case SET_REPO:
            return {
                ...state,
                repo: action.payload
            };
        default:
            return state;
        }
}