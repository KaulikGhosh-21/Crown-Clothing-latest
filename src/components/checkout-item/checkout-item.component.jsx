
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
    itemSuccessfullyRemoved
} from "../../store/user/user.action";

import { selectCartItems } from "../../store/cart-new/cart-new.selector";
import { selectCurrentUser, selectItemRemovedFromCart, selectItemsInCart } from "../../store/user/user.selector";

import "./checkout-item.styles.scss";
import { SuccessPrompt } from "../success-prompt/success-prompt.component";

const CheckoutItem = ({cartItems}) => {

    const currentUser = useSelector(selectCurrentUser); 

    const dispatch = useDispatch();

    const cartItemsOfUser = useSelector(selectItemsInCart)

    const isItemRemovedSuccessfully = useSelector(selectItemRemovedFromCart);

    // const itemsInCart = useSelector(selectItemsInCart)

    console.log(cartItemsOfUser);

    console.log(isItemRemovedSuccessfully);

    if(isItemRemovedSuccessfully){
        const timeoutRet = setTimeout(() => {
            dispatch(itemSuccessfullyRemoved());
            clearTimeout(timeoutRet);
        }, 1000)
    }

    const updateCartItemsInCheckout = (operation, checkoutItem) => {
        switch(operation){
            case 'addToCart':
                dispatch(addItemsToCartStart(
                    {currentUser, cartItemsOfUser, product: checkoutItem}
                ));
                return;
            case 'decrementFromCart':
                checkoutItem.quantity === 1 ? dispatch(
                    removeItemFromCartStart(
                        {currentUser, cartItemsOfUser, product: checkoutItem}
                    )
                ) : dispatch(
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
        <>
        {
            isItemRemovedSuccessfully && 
                <SuccessPrompt>
                    Item successfully removed from cart
                </SuccessPrompt>
        }
        {
            cartItems.length > 0 ? cartItems.map(checkoutItem => {

                const { imageUrl, name, price, quantity, id } = checkoutItem;

                return (
                    <div className="checkout-item-container" key={id}>
                        <div className="image-container">
                            <img src={imageUrl} />
                        </div>
                        <span className="name">{name}</span>
                        <span className="quantity">
                            <div 
                                className="arrow"
                                onClick={
                                    () => 
                                    updateCartItemsInCheckout('decrementFromCart', checkoutItem)}
                            >
                                &#10094;
                            </div>
                            <div className="value">{quantity}</div>
                            <div 
                                className="arrow"
                                onClick={
                                    () => 
                                    updateCartItemsInCheckout('addToCart', checkoutItem)}
                            >
                                &#10095;
                            </div>
                        </span>
                        <span className="price">{price}</span>
                        <div 
                            className="remove-button" 
                            onClick={
                                () => updateCartItemsInCheckout("", checkoutItem)
                                }
                        >
                            &#10005;
                        </div>

                </div>
                )})
                : <h2>No products in your cart.</h2>
        }
        </>
        
    )
};

export default CheckoutItem;