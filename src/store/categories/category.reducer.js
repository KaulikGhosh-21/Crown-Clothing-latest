import { CATEGORY_ACTION_TYPES } from "./category.types"


const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
    // console.log("Category Reducer", state);
    // switch(action.type){
    //     case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
    //         return{
    //             ...state,
    //             categories: action.payload
    //         }
    //     default:
    //         return state
    // }

    switch(action.type){
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
            return{
                ...state,
                isLoading: true
            }
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return{
                ...state,
                isLoading: false,
                categories: action.payload
            }
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
            return{
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
};