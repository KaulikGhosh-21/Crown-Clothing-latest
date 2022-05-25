import { createContext, useReducer } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    decrementItemFromCart: () => {},
    removeItemFromCart: () => {}
});


const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}


const cartReducer = (state, action) => {
    console.log(action);
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
            throw new Error(`Unhandled type ${action.type} error`);
    }
}


const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false
}


export const CartProvider = ({children}) => {

    // const [cartItems, setCartItems] = useState([]);

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    // console.log(state);

    const {cartItems, isCartOpen} = state;


    const setCartItems = (newCartItems) => dispatch({ 
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    })

    const setIsCartOpen = (newIsCartOpenStatus) => dispatch({
        type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
        payload: newIsCartOpenStatus
    })




    const addItemToCart = (productToAdd) => {
        const updatedCartItems = addCartItem(cartItems, productToAdd);
        setCartItems(updatedCartItems);
    }

    const decrementItemFromCart = (productToDecrement) => {
        const updatedCartItemsFromDecrement = 
            decrementCartItem(cartItems, productToDecrement);
        setCartItems(updatedCartItemsFromDecrement)
    }

    const removeItemFromCart = (productToRemove) => {
        const updatedCartItemsAfterRemove = cartItems.filter(cartItem => 
            cartItem.id !== productToRemove.id);
        setCartItems(updatedCartItemsAfterRemove);
    }

    // const [isCartOpen, setIsCartOpen] = useState(false);

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