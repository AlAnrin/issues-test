export const SET_ISSUES = 'SET_ISSUES';
export const SET_OWNER = 'SET_OWNER';
export const SET_REPO = 'SET_REPO';
export const SET_PAGE = 'SET_PAGE';
export const SET_ISSUES_COUNT = 'SET_ISSUES_COUNT';
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT';
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE';
export const SET_LOAD_REPO = 'SET_LOAD_REPO';

export const setAction = (type, payload)=> dispatch=>{
    dispatch({
        type: type,
        payload: payload
    });
    return Promise.resolve()
};