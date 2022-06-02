import { useDispatch, useSelector } from "react-redux";
import "./cart-icon.styles.jsx";

import { selectCartItems, selectIsCartOpen } from "../../store/cart-new/cart-new.selector.js";
import { setIsCartOpen } from "../../store/cart-new/cart-new.action.js";


import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";
import { selectItemsInCart } from "../../store/user/user.selector.js";

const CartIcon = () => {

    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen)

    const itemsInCart = useSelector(selectItemsInCart)

    console.log(itemsInCart);

    const toggleCart = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    let totalCartItems = itemsInCart.reduce(
        (acc, cartItem) => acc + cartItem.quantity, 0)
        console.log(totalCartItems);


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