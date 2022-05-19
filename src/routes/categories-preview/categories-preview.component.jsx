import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/category.context";

import ProductCard from "../../components/product-card/product-card.component"

import "./categories-preview.styles.scss";
import { Link } from "react-router-dom";

const CategoriesPreview = () => {

    const {categoryMap} = useContext(CategoriesContext)

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
                            
                            <div className="products-container">
                                {categoryMap[title].slice(0,4).map(product => 
                                    <ProductCard key={product.id} product={product} /> 
                                )}
                            </div>
                        </ Fragment>
                    )
                })
            }
        </div>
        
    )
};

export default CategoriesPreview;