
import { useDispatch, useSelector } from "react-redux";

// import { 
//     addItemToCart, 
//     decrementItemFromCart, 
//     removeItemFromCart 
// } from "../../store/cart-new/cart-new.action";

import { 
    addItemsToCartStart, 
    decrementItemQuantityFromCartStart, 
    removeItemFromCartStart ,
    itemSuccessfullyAdded
} from "../../store/user/user.action";

import { selectCartItems } from "../../store/cart-new/cart-new.selector";
import { selectCurrentUser, selectItemAddedToCart, selectItemsInCart } from "../../store/user/user.selector";

import "./checkout-item.styles.scss";
import { SuccessPrompt } from "../success-prompt/success-prompt.component";

const CheckoutItem = ({checkoutItem}) => {

    const currentUser = useSelector(selectCurrentUser); 

    const dispatch = useDispatch();

    const cartItemsOfUser = useSelector(selectItemsInCart)

    const {name, quantity, price, imageUrl} = checkoutItem;

    const isItemRemovedSuccessfully = useSelector(selectItemAddedToCart);

    if(isItemRemovedSuccessfully){
        const timeoutRet = setTimeout(() => {
            dispatch(itemSuccessfullyAdded());
            clearTimeout(timeoutRet);
        }, 1000)
    }

    const updateCartItemsInCheckout = (operation) => {
        switch(operation){
            case 'addToCart':
                dispatch(addItemsToCartStart(
                    {currentUser, cartItemsOfUser, product: checkoutItem}
                ));
                return;
            case 'decrementFromCart':
                dispatch(
                    decrementItemQuantityFromCartStart(
                        {currentUser, cartItemsOfUser, product: checkoutItem}
                    )
                );
                return;
            default:
                dispatch(removeItemFromCartStart(
                    {currentUser, cartItemsOfUser, product: checkoutItem}
                ));
        }
    }

    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div 
                    className="arrow"
                    onClick={() => updateCartItemsInCheckout('decrementFromCart')}
                >
                    &#10094;
                </div>
                <div className="value">{quantity}</div>
                <div 
                    className="arrow"
                    onClick={() => updateCartItemsInCheckout('addToCart')}
                >
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div 
                className="remove-button" 
                onClick={updateCartItemsInCheckout}>&#10005;</div>

            {
                isItemRemovedSuccessfully && 
                <SuccessPrompt>Item successfully removed from cart</SuccessPrompt>
            }
        </div>
    )
};

export default CheckoutItem;