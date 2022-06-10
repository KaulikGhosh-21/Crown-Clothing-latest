import { createSelector } from "reselect";

const selectUserReducerSlice = (state) => {
    return state.user;
}

export const selectCurrentUser = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Hello");
        return userSlice.currentUser;
    }
)

export const selectUserIsLoading = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Hello");
        return userSlice.isLoading
    }
)

export const selectIsSignupDone = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Hello");
        return userSlice.isSignupDone;
    }
)

export const selectIsSignoutSuccessfull = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Hello");
        return userSlice.isSignoutSuccessfull;
    }
)

export const selectItemsInCart = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Hello");
        return userSlice.itemsInCart;
    }
)

export const selectItemAddedToCart = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Hello");
        return userSlice.itemAddedToCart;
    }
)

export const selectItemRemovedFromCart = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Removed from cart selector", userSlice.itemRemovedFromCart)
        return userSlice.itemRemovedFromCart
    }
)

export const selectAuthDone = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        console.log("Hello");
        return userSlice.authDone;
    }
)

// export const selectCurrentUser = (state) => {
//     console.log("User selector");
//     return state.user.currentUser;
// }