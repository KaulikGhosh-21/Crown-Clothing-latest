import { createSelector } from "reselect";

const selectCartReducerSlice = (state) => {
    return state.cart;
}

export const selectCartItems = createSelector(
    [selectCartReducerSlice],
    (cartSlice) => {
        return cartSlice.cartItems;
    }
)

export const selectIsCartOpen = createSelector(
    [selectCartReducerSlice],
    (cartSlice) => {
        return cartSlice.isCartOpen;
    }
)

// export const selectNewCartCount = createSelector(
//     [selectCartReducerSlice],
//     (cartSlice) => {
//         return cartSlice.newCartCount;
//     }
// )