import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({checkoutItem}) => {

    const {addItemToCart, decrementItemFromCart, removeItemFromCart} = useContext(CartContext);

    const {name, quantity, price, imageUrl} = checkoutItem;

    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div 
                    className="arrow"
                    onClick={() => decrementItemFromCart(checkoutItem)}
                >
                    &#10094;
                </div>
                <div className="value">{quantity}</div>
                <div 
                    className="arrow"
                    onClick={() => addItemToCart(checkoutItem)}
                >
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div 
                className="remove-button" 
                onClick={() => removeItemFromCart(checkoutItem)}>&#10005;</div>
        </div>
    )
};

export default CheckoutItem;