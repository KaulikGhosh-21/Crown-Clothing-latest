// export const setCategoriesArray = (type, payload) => ({type, payload})

import { CATEGORY_ACTION_TYPES } from "./category.types";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => ({
    type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START
})

export const fetchCategoriesSuccess = (categoriesArray) => ({
    type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    payload: categoriesArray
})

export const fetchCategoriesFailure = (error) => ({
    type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
    payload: error
})

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try{
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }catch(error){
        dispatch(fetchCategoriesFailure(error));
    }
}