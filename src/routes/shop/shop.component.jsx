import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";


// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesAsync, fetchCategoriesStart, setCategoriesArray } from "../../store/categories/category.action";
// import { CATEGORY_ACTION_TYPES } from "../../store/categories/category.types";


import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";


const Shop = () => {

    const dispatch = useDispatch();

    // console.log("rendered")

    useEffect(() => {
        // const getDataFromCategories = async () => {
        //     const categoriesArray = await getCategoriesAndDocuments();
        //     dispatch(setCategoriesArray(
        //         CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray
        //     ));
        // }

        // getDataFromCategories();

        dispatch(fetchCategoriesStart());

    }, [])

    return(
        <Routes>

            <Route index element={<CategoriesPreview />} />

            <Route path=":category" element={<Category />} />

        </Routes>
    )

    
};

export default Shop;