import {SET_ISSUES} from './issuesActions';

const initialState = {
    issues: []
};

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ISSUES:
            return {
                ...state,
                issues: action.payload
            }
        }
}