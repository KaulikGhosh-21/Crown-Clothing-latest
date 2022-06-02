import { combineReducers } from "redux";

import { cartReducer } from "./cart-new/cart-new.reducer";
import { categoryReducer } from "./categories/category.reducer";
import { dataReducer } from "./data/data.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    categories: categoryReducer,
    user: userReducer,
    data: dataReducer
})