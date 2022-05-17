import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if(existingItem){
        console.log("If block")
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : 
            cartItem)
    }

    return [...cartItems, {...productToAdd, quantity : 1}]
}

const decrementCartItem = (cartItems, productToDecrement) => {
    if(productToDecrement.quantity === 1){
        console.log("If block")
        return cartItems.filter(cartItem => cartItem.id !== productToDecrement.id)
    }else{
        return cartItems.map(cartItem => cartItem.id === productToDecrement.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} : 
            cartItem)
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    decrementItemFromCart: () => {},
    removeItemFromCart: () => {}
});

export const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        console.log(productToAdd);
        const updatedCartItems = addCartItem(cartItems, productToAdd);
        console.log(updatedCartItems)
        setCartItems(updatedCartItems);
    }

    const decrementItemFromCart = (productToDecrement) => {
        console.log(productToDecrement);
        const updatedCartItemsFromDecrement = 
            decrementCartItem(cartItems, productToDecrement);
        console.log(updatedCartItemsFromDecrement);
        setCartItems(updatedCartItemsFromDecrement)
    }

    const removeItemFromCart = (productToRemove) => {
        console.log(productToRemove);
        const updatedCartItemsAfterRemove = cartItems.filter(cartItem => 
            cartItem.id !== productToRemove.id);
        console.log(updatedCartItemsAfterRemove);
        setCartItems(updatedCartItemsAfterRemove);
    }

    const [isCartOpen, setIsCartOpen] = useState(false);

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart,
        decrementItemFromCart,
        removeItemFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}