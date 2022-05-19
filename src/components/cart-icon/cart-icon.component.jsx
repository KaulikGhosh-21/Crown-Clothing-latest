import "./cart-icon.styles.jsx";


import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
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