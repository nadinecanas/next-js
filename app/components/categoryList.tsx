// components/CategoryList.tsx
import React from 'react';
import { Category } from '../types/category';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div>
      <h3>All Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
