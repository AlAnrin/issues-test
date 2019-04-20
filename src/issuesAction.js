export const SET_ISSUES = 'SET_ISSUES';

export function setIssuesAction(issues) {
    return {
        type: SET_ISSUES,
        payload: issues
    }
}