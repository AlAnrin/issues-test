export const SET_ISSUES = 'SET_ISSUES';
export const SET_OWNER_NAME = 'SET_OWNER_NAME';
export const SET_REPO_NAME = 'SET_REPO_NAME';
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const SET_ISSUES_COUNT = 'SET_ISSUES_COUNT';
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT';
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE';
export const SET_LOAD_REPO = 'SET_LOAD_REPO';
export const SET_ROUTES = 'SET_ROUTES';

export const setAction = (type, payload)=> dispatch=>{
    dispatch({
        type: type,
        payload: payload
    });
    return Promise.resolve();
};