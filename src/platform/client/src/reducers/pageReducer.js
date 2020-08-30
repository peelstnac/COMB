/*
To determine which of 3 pages to load
1 - landing page
2 - login page
3 - dashboard
*/
import PAGE from '../constants/page';
const defaultState = 1;

const pageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PAGE:
            return action.page;
        default:
            return state;
    }
}

export default pageReducer;