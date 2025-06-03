// components/AddCategoryForm.tsx
import React, { useState } from 'react';
import { Category } from '../types/category';

interface AddCategoryFormProps {
  onAddCategory: (category: Category) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory: Category = {
      id: Math.random().toString(36).substr(2, 9), // Simple unique ID
      name,
    };

    onAddCategory(newCategory);
    setName('');
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category-name">Category Name</label>
        <input
          type="text"
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="category-description">Description (optional)</label>
        <textarea
          id="category-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
