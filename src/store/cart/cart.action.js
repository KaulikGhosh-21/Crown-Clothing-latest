import { CART_ACTION_TYPES } from "./cart.types"



const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if(existingItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : 
            cartItem)
    }

    return [...cartItems, {...productToAdd, quantity : 1}]
}

const decrementCartItem = (cartItems, productToDecrement) => {
    if(productToDecrement.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToDecrement.id)
    }else{
        return cartItems.map(cartItem => cartItem.id === productToDecrement.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} : 
            cartItem)
    }
}

export const setCartItems = (newCartItems) => {
    return { 
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    }
}

export const setIsCartOpen = (newIsCartOpenStatus) => ({
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: newIsCartOpenStatus
})

export const addItemToCart = (cartItems, productToAdd) => {
    const updatedCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(updatedCartItems);
}

export const decrementItemFromCart = (cartItems, productToDecrement) => {
    const updatedCartItemsFromDecrement = 
        decrementCartItem(cartItems, productToDecrement);
    return setCartItems(updatedCartItemsFromDecrement)
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const updatedCartItemsAfterRemove = cartItems.filter(cartItem => 
        cartItem.id !== productToRemove.id);
    return setCartItems(updatedCartItemsAfterRemove);
}