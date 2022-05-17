import "./cart-dropdown.styles.scss";

import { Link } from "react-router-dom";

import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {

    const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    console.log(cartItems)

    return(
        <div className={`${isCartOpen ? 'show-overlay' : ''} hide-overlay`}
            onClick={toggleCart}
        >
            <div className={`${isCartOpen ? 'show-dropdown' : ''} cart-dropdown-container`}>
                <div className="cart-items">
                    {
                        cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)
                    }
                </div>
                <Link to="/checkout" className="checkout-link">
                    <Button>Go to checkout</Button>
                </Link>
            </div>
        </div>
    )
};

export default CartDropdown;