export const SET_ISSUES = 'SET_ISSUES';
export const SET_OWNER = 'SET_OWNER';
export const SET_REPO = 'SET_REPO';
export const SET_PAGE = 'SET_PAGE';
export const SET_ISSUES_COUNT = 'SET_ISSUES_COUNT';
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT';
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE';

export const setAction = (type, page)=> dispatch=>{
    dispatch({
        type: type,
        payload: page
    });
    return Promise.resolve()
};