import {SET_ISSUES, SET_ISSUES_COUNT, SET_OWNER, SET_REPO, SET_PAGE} from './issuesAction';

const initialState = {
    issues: [],
    issues_count: 0,
    baseUrl: 'https://api.github.com/',
    repos: 'repos/',
    users: 'users/',
    owner: 'zalmoxisus',
    repo: 'redux-devtools-extension',
    iss: 'issues',
    page: '1'
};

export function issuesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ISSUES:
            return {
                ...state,
                issues: action.payload
            };
        case SET_ISSUES_COUNT:
            return {
                ...state,
                issues_count: action.payload
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
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            };
        default:
            return state;
        }
}