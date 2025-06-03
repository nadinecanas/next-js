// app/category/add/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddCategoryPage: React.FC = () => {
  const [category, setCategory] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Simple validation
    if (!category.name || !category.description) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        router.push('/category');
      } else {
        setError('Failed to add category');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name</label>
          <input
            type="text"
            value={category.name}
            onChange={e => setCategory({ ...category, name: e.target.value })}
            required
            style={{ padding: '10px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Description</label>
          <textarea
            value={category.description}
            onChange={e => setCategory({ ...category, description: e.target.value })}
            required
            style={{ padding: '10px', width: '100%' }}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white' }}>
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryPage;
