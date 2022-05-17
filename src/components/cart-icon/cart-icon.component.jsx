import "./cart-icon.styles.scss";

import {ReactComponent as ShoppingBagIcon} from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    const totalCartItems = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)

    return(
        <div 
            className={`${isCartOpen ? 'cart-is-open' : ''} cart-icon-container`} 
            onClick={toggleCart}
        >
            <ShoppingBagIcon className="shopping-icon"></ShoppingBagIcon>
            <span className="item-count">{totalCartItems}</span>
        </div>
    )
};

export default CartIcon;