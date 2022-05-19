import "./cart-dropdown.styles.jsx";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItems, EmptyMessage, HideOverlayContainer } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {

    const navigate = useNavigate();

    const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    return(
        <HideOverlayContainer showOverlay={isCartOpen}
            onClick={toggleCart}
        >
            <CartDropdownContainer showDropdown={isCartOpen}>
                <CartItems>
                    {
                        cartItems.length ? 
                        (cartItems.map(cartItem => 
                            <CartItem key={cartItem.id} cartItem={cartItem} />)
                        ) : 
                        (
                            <EmptyMessage>
                                No products in your cart
                            </EmptyMessage>
                        )
                    }
                </CartItems>

                <Button onClick={() => navigate('/checkout')}>Go to checkout</Button>
            </CartDropdownContainer>
        </HideOverlayContainer>
    )
};

export default CartDropdown;