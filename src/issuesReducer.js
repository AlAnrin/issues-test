import {SET_ISSUES, SET_ISSUES_COUNT, SET_OWNER_NAME, SET_REPO_NAME, SET_PAGE_NUMBER, SET_PAGE_COUNT, SET_CURRENT_ISSUE, SET_LOAD_REPO} from './Actions';

const initialState = {
    issues: [],
    issues_count: 0,
    load_repo: null,
    baseUrl: 'https://api.github.com/',
    repos: 'repos/',
    users: 'users/',
    owner: 'zalmoxisus',
    repo: 'redux-devtools-extension',
    iss: 'issues',
    page: 1,
    page_count: [],
    limit: 30,
    current_issue: {title: 'FAKE'}
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
        case SET_LOAD_REPO:
            return {
                ...state,
                load_repo: action.payload
            };
        case SET_OWNER_NAME:
            return {
                ...state,
                owner: action.payload
            };
        case SET_REPO_NAME:
            return {
                ...state,
                repo: action.payload
            };
        case SET_PAGE_NUMBER:
            return {
                ...state,
                page: action.payload
            };
        case SET_PAGE_COUNT:
            return {
                ...state,
                page_count: action.payload
            };
        case SET_CURRENT_ISSUE:
            return {
                ...state,
                current_issue: action.payload
            };
        default:
            return state;
        }
}