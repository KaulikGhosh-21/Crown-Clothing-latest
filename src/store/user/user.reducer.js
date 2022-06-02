import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    isSignupDone: false,
    error: null,
    itemsInCart: [],
    itemAddedToCart: false,
    authDone: false
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case USER_ACTION_TYPES.ITEM_SUCCESSFULLY_ADDED:
            return{
                ...state,
                itemAddedToCart: false
            }
            case USER_ACTION_TYPES.AUTH_SUCCESSFULLY_DONE:
                return{
                    ...state,
                    authDone: false
                }
        case USER_ACTION_TYPES.DECREMENT_ITEM_QUANTITY_FROM_CART_SUCCESS:
            return{
                ...state,
                itemsInCart: action.payload, 
            }
        case USER_ACTION_TYPES.ADD_ITEMS_TO_CART_SUCCESS:
        case USER_ACTION_TYPES.REMOVE_ITEM_FROM_CART_SUCCESS:
            return{
                ...state,
                itemsInCart: action.payload,
                itemAddedToCart: true
            }
        case USER_ACTION_TYPES.SIGN_UP_START:
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
            return{
                ...state,
                isLoading: true
            }
        case USER_ACTION_TYPES.SIGN_UP_SUCCESS:
            return{
                ...state, 
                isLoading: false,
                isSignupDone: true
            }
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return{
                ...state, 
                currentUser: action.payload,
                itemsInCart: action.payload.itemsInCart,
                isLoading: false,
                authDone: true
            }
        case USER_ACTION_TYPES.SIGN_OUT_START:
            return{
                ...state,
                isLoading: true
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                isLoading: false,
                itemsInCart: [],
                isSignupDone: false,
                authDone: true
            }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return{
                ...state, 
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

