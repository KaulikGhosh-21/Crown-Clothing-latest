import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { CATEGORY_ACTION_TYPES } from "./category.types";

import { fetchCategoriesFailure, fetchCategoriesSuccess } from "./category.action";


// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());

//     try{
//         const categoriesArray = await getCategoriesAndDocuments();
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     }catch(error){
//         dispatch(fetchCategoriesFailure(error));
//     }
// }


export function* fetchCategoriesAsync(){

    try{
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    }catch(error){
        yield put(fetchCategoriesFailure(error));
    }

}


export function* onFetchCategories(){
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}


export function* categoriesSaga(){
    yield all([call(onFetchCategories)])
}