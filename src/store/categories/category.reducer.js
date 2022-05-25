import { CATEGORY_ACTION_TYPES } from "./category.types"


const INITIAL_STATE = {
    categories: []
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
    // console.log("Category Reducer", state);
    switch(action.type){
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return{
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
};