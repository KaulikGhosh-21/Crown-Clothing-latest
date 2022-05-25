import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./category-item.styles.jsx";

import { 
  BackgroundImage, 
  CategoryItemBodyContainer, 
  CategoryItemContainer 
} from './category-item.styles.jsx';

const CategoryItem = ({category}) => {
    
  const navigate = useNavigate();
  console.log(category.route);

  return (
    <CategoryItemContainer onClick={() => navigate(category.route)}>
        <BackgroundImage imageUrl={category.imageUrl} />

        <CategoryItemBodyContainer>
            <h2>{category.title}</h2>
            <p>Shop Now</p>
        </CategoryItemBodyContainer>
    </CategoryItemContainer>
  )
};

export default CategoryItem;
