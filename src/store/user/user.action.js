import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user) => ({
    type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user
})



export const checkUserSession = () => ({
    type: USER_ACTION_TYPES.CHECK_USER_SESSION
})

export const googleSignInStart = () => ({
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
})

export const emailSignInStart = (email, password) => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    payload: {email, password}
})

export const signInSuccess = (user) => {
    console.log("Signin success was called");
    return{
    type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: user
}
}

export const signInFailed = (error) => ({
    type: USER_ACTION_TYPES.SIGN_IN_FAILED,
    payload: error
})

export const signUpStart = (email, password, displayName, ...additionalData) => ({
    type: USER_ACTION_TYPES.SIGN_UP_START,
    payload: {email, password, displayName, ...additionalData}
})

export const signUpSuccess = (user) => ({
    type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    payload: user
})

export const signUpFailed = (error) => ({
    type: USER_ACTION_TYPES.SIGN_UP_FAILED,
    payload: error
})

export const signOutStart = () => ({
    type: USER_ACTION_TYPES.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS
})

export const signOutFailed = (error) => ({
    type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
    payload: error
})

export const addItemsToCartStart = (data) => ({
    type: USER_ACTION_TYPES.ADD_ITEMS_TO_CART_START,
    payload: data
})

export const addItemsToCartSuccess = (itemsInCart) => ({
    type: USER_ACTION_TYPES.ADD_ITEMS_TO_CART_SUCCESS,
    payload: itemsInCart
})

export const addItemsToCartFailed = (error) => ({
    type: USER_ACTION_TYPES.ADD_ITEMS_TO_CART_FAILED,
    payload: error
})

export const decrementItemQuantityFromCartStart = (data) => ({
    type: USER_ACTION_TYPES.DECREMENT_ITEM_QUANTITY_FROM_CART_START,
    payload: data
})

export const decrementItemQuantityFromCartSuccess = (itemsInCart) => ({
    type: USER_ACTION_TYPES.DECREMENT_ITEM_QUANTITY_FROM_CART_SUCCESS,
    payload: itemsInCart
})

export const decrementItemQuantityFromCartFailed = (error) => ({
    type: USER_ACTION_TYPES.DECREMENT_ITEM_QUANTITY_FROM_CART_FAILED,
    payload: error
})

export const removeItemFromCartStart = (data) => ({
    type: USER_ACTION_TYPES.REMOVE_ITEM_FROM_CART_START,
    payload: data
})

export const removeItemFromCartSuccess = (itemsInCart) => ({
    type: USER_ACTION_TYPES.REMOVE_ITEM_FROM_CART_SUCCESS,
    payload: itemsInCart
})

export const removeItemFromCartFailed = (error) => ({
    type: USER_ACTION_TYPES.REMOVE_ITEM_FROM_CART_FAILED,
    payload: error
})

export const itemSuccessfullyAdded = () => ({
    type: USER_ACTION_TYPES.ITEM_SUCCESSFULLY_ADDED
})

export const authSuccessfullyDone = () => ({
    type: USER_ACTION_TYPES.AUTH_SUCCESSFULLY_DONE
})
