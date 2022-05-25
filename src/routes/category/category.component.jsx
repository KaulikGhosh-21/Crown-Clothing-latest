import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { CategoriesContext } from "../../contexts/category.context";

import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoryMap } from "../../store/categories/category.selector";

import "./category.styles.scss";

const Category = () => {

    // console.log("render/re-render from Category component");

    const {category} = useParams();
    console.log(category);

    const categoryMap = useSelector(selectCategoryMap)
    console.log(categoryMap);
    
    // const {categoryMap} = useContext(CategoriesContext);
    
    const [products, setProducts] = useState([]);
    console.log(products);

    useEffect(() => {
        // console.log("Use effect from Category")
        setProducts(categoryMap[category]);
    }, [category, categoryMap])

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products &&
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Fragment>
    )
};

export default Category;