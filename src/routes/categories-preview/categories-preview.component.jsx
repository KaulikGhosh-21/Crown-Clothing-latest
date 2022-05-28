import { Fragment } from "react";
// import { CategoriesContext } from "../../contexts/category.context";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component"

import "./categories-preview.styles.scss";

import { selectCategoriesIsLoading, selectCategoryMap } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {

    // const {categoryMap} = useContext(CategoriesContext)

    const categoryMap = useSelector(selectCategoryMap);

    const isLoading = useSelector(selectCategoriesIsLoading)

    return(
        <div className="products-upper-container">
            {
                Object.keys(categoryMap).map(title => {
                    return(
                        <Fragment key={title}>
                            <Link to={`${title}`}>
                                <h2>
                                    {title.toUpperCase()}
                                </h2>
                            </Link>

                            {
                                isLoading ? <Spinner /> : (
                                    <div className="products-container">
                                        {categoryMap[title].slice(0,4).map(product => 
                                            <ProductCard key={product.id} product={product} /> 
                                        )}
                                    </div>
                                )
                            }
                            
                        </ Fragment>
                    )
                })
            }
        </div>
        
    )
};

export default CategoriesPreview;