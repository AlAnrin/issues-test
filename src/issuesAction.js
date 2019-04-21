export const SET_ISSUES = 'SET_ISSUES';
export const SET_OWNER = 'SET_OWNER';
export const SET_REPO = 'SET_REPO';
export const SET_PAGE = 'SET_PAGE';

export function setIssuesAction(issues) {
    return {
        type: SET_ISSUES,
        payload: issues
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

export function setPageAction(page) {
    return {
        type: SET_PAGE,
        payload: page
    }
}