import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: []
});

export const CategoriesProvider = ({children}) => {

    const [categoryMap, setCategoryMap] = useState({});

    useEffect(() => {
        const getDataFromCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setCategoryMap(categoryMap);
        }

        getDataFromCategories();

    }, [])

    const value = {categoryMap};

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}