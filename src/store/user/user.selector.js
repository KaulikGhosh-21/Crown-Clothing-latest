import { createSelector } from "reselect";

const selectUserReducerSlice = (state) => {
    // console.log("User selector 1: ", state);
    return state.user;
}

export const selectCurrentUser = createSelector(
    [selectUserReducerSlice],
    (userSlice) => {
        // console.log("User selector 2: ", userSlice)
        return userSlice.currentUser;
    }
)

// export const selectCurrentUser = (state) => {
//     console.log("User selector");
//     return state.user.currentUser;
// }