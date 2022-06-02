import { CART_NEW_ACTION_TYPES } from "./cart-new.types"

const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false,
}

export const cartReducer = (state = INITIAL_STATE, action) => {
   
    switch(action.type){
        case CART_NEW_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                cartItems: action.payload
            }
        case CART_NEW_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: action.payload
            }
        default:
            return state;
    }
}


