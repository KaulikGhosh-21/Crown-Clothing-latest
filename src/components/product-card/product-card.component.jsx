
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./product-card.styles.scss";



const ProductCard = ({product}) => {

    const dispatch = useDispatch();

    const {price, name, imageUrl} = product;

    const cartItems = useSelector(selectCartItems)

    const addProductToCard = () => dispatch(addItemToCart(cartItems, product));

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
        </div>
    )
};

export default ProductCard;