import { createSelector } from "reselect";

const selectUserReducerSlice = (state) => {
    return state.user;
}

export const selectCurrentUser = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        return userSlice.currentUser;
    }
)

export const selectUserIsLoading = createSelector(
    [selectUserReducerSlice],
    (userSlice) => userSlice.isLoading
)

export const selectIsSignupDone = createSelector(
    [selectUserReducerSlice],
    (userSlice) => userSlice.isSignupDone
)

export const selectIsSignoutSuccessfull = createSelector(
    [selectUserReducerSlice],
    (userSlice) => userSlice.isSignoutSuccessfull
)

export const selectItemsInCart = createSelector(
    [selectUserReducerSlice],
    (userSlice) => userSlice.itemsInCart
)

export const selectItemAddedToCart = createSelector(
    [selectUserReducerSlice],
    (userSlice) => userSlice.itemAddedToCart
)

export const selectAuthDone = createSelector(
    [selectUserReducerSlice],
    (userSlice) => userSlice.authDone
)

// export const selectCurrentUser = (state) => {
//     console.log("User selector");
//     return state.user.currentUser;
// }