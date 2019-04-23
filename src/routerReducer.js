import App from "./containers/App";
import {SET_ROUTES} from "./Actions";

const initialState = {
    routes: [
        {
            path: '/home',
            title: 'Select Repo or Owner',
            component: App
        }
    ]
};

export function routesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ROUTES:
            return {
                ...state,
                routes: action.payload
            };
        default:
            return state;
    }
}