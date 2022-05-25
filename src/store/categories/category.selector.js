import { createSelector } from "reselect";

// export const selectCategoryMap = (state) => {
//     console.log("category selector");
//     console.log("state: ", state);
//     console.log("state.categories: ", state.categories);
//     let categoryMap = {};
//     state.categories.categories.map(category => {
//         const {title, items} = category;
//         categoryMap[title] = items;
//     })
//     return categoryMap;
// }

const selectCategoriesReducerSlice = (state) => {
    // console.log("selector 1");
    return state.categories;
}


export const selectCategoriesData = createSelector(
    [selectCategoriesReducerSlice],
    (categoriesSlice) => {
        // console.log("selector 2", categoriesSlice);
        return categoriesSlice.categories
    }
);

export const selectCategoryMap = createSelector(
    [selectCategoriesData],
    (categories) => {
        // console.log("selector 3", categories);
        let categoryMap = {};
        categories.map(category => {
            const {title, items} = category;
            categoryMap[title.toLowerCase()] = items;
        })
        return categoryMap
    }
);