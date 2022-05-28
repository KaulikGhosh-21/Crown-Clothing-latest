import { CART_ACTION_TYPES } from "./cart.types"

const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false,
    newCartCount: 0
}

export const cartReducer = (state = INITIAL_STATE, action) => {
   
    switch(action.type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                cartItems: action.payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: action.payload
            }
        default:
            return state;
    }
}


