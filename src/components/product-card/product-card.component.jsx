
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart-new/cart-new.action";
import { selectCartItems } from "../../store/cart-new/cart-new.selector";
import { 
    selectItemAddedToCart, 
    selectItemsInCart 
} from "../../store/user/user.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { addItemsToCartStart, itemSuccessfullyAdded } from "../../store/user/user.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./product-card.styles.scss";
import { SuccessPrompt } from "../success-prompt/success-prompt.component";
import { useEffect, useState } from "react";



const ProductCard = ({product}) => {

    const dispatch = useDispatch();

    const {price, name, imageUrl} = product;

    const cartItems = useSelector(selectCartItems);

    const cartItemsOfUser = useSelector(selectItemsInCart);

    const currentUser = useSelector(selectCurrentUser);

    const isItemAddedToCart = useSelector(selectItemAddedToCart);


    if(isItemAddedToCart){
        const timeoutRet = setTimeout(() => {
            dispatch(itemSuccessfullyAdded());
            clearTimeout(timeoutRet);
        }, 1000)
    }


    const addProductToCard = () => {
        // dispatch(addItemToCart(cartItems, product));
        dispatch(addItemsToCartStart({currentUser, cartItemsOfUser, product}));
    }

    return(
        <div className="product-card-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>

        <Button 
        buttonType={BUTTON_TYPE_CLASSES.inverted} 
        onClick={addProductToCard}
        >
            Add to Cart
        </Button>

        {
            isItemAddedToCart && 
            <SuccessPrompt>Item successfully added to cart</SuccessPrompt>
        }

        </div>
    )
};

export default ProductCard;