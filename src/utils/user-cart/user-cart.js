

export const addItemsToCart = (cartItems, itemToAdd) => {
    console.log(cartItems);
    console.log(itemToAdd);
    const isItemInCart = cartItems.find(cartItem => cartItem.id === itemToAdd.id);
    console.log(isItemInCart)
    if(isItemInCart){
        return cartItems.map(cartItem => cartItem.id === itemToAdd.id ? 
            {...cartItem, quantity : cartItem.quantity + 1} : 
            cartItem )
    }
    return [...cartItems, {...itemToAdd, quantity : 1}]
}

export const decrementItemsQuantity = (cartItems, productToDecrement) => {
    if(productToDecrement.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToDecrement.id)
    }else{
        return cartItems.map(cartItem => cartItem.id === productToDecrement.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} : 
            cartItem)
    }
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    console.log(" I was called");
    const updatedCartItemsAfterRemove = cartItems.filter(cartItem => 
        cartItem.id !== productToRemove.id);
        console.log(updatedCartItemsAfterRemove);
    return updatedCartItemsAfterRemove;
}