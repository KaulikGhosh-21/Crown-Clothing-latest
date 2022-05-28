import { useDispatch, useSelector } from "react-redux";
import "./cart-icon.styles.jsx";

import { selectCartItems, selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";

const CartIcon = () => {
    // console.log("Cart-icon");

    const dispatch = useDispatch();

    // const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext)

    const isCartOpen = useSelector(selectIsCartOpen)
    const cartItems = useSelector(selectCartItems)

    const toggleCart = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    const totalCartItems = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)

    return(
        <CartIconContainer cartIsOpen={isCartOpen}
            onClick={toggleCart}
        >
            <ShoppingIcon></ShoppingIcon>
            <ItemCount>{totalCartItems}</ItemCount>
        </CartIconContainer>
    )
};

export default CartIcon;