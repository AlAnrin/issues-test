export const SET_ISSUES = 'SET_ISSUES';
export const SET_OWNER = 'SET_OWNER';
export const SET_REPO = 'SET_REPO';
export const SET_PAGE = 'SET_PAGE';
export const SET_ISSUES_COUNT = 'SET_ISSUES_COUNT';

export function setIssuesAction(issues) {
    return {
        type: SET_ISSUES,
        payload: issues
    }
}

export function setIssuesCountAction(issues_count) {
    return {
        type: SET_ISSUES_COUNT,
        payload: issues_count
    }
}

export function setOwnerAction(owner) {
    return {
        type: SET_OWNER,
        payload: owner
    }
}

export function setRepoAction(repo) {
    return {
        type: SET_REPO,
        payload: repo
    }
}

export const setAction = (type, page)=> dispatch=>{
    dispatch({
        type: type,
        payload: page
    });
    return Promise.resolve()
};