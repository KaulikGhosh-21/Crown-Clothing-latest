import { createSelector } from "reselect";

const selectCartReducerSlice = (state) => {
    console.log("Cart selector 1");
    return state.cart;
}

export const selectCartItems = createSelector(
    [selectCartReducerSlice],
    (cartSlice) => {
        console.log("select cart items selector");
        return cartSlice.cartItems;
    }
)

export const selectIsCartOpen = createSelector(
    [selectCartReducerSlice],
    (cartSlice) => {
        console.log("select is cart open selector");
        return cartSlice.isCartOpen;
    }
)

export const selectNewCartCount = createSelector(
    [selectCartReducerSlice],
    (cartSlice) => {
        console.log("select new cart count selector", cartSlice);
        return cartSlice.newCartCount;
    }
)