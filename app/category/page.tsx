// app/category/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null); // To track selected category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleBackToList = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>
        Categories
      </h1>

      <Link
        href="/category/add"
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          textDecoration: 'none',
          marginBottom: '20px',
          display: 'inline-block',
        }}
      >
        Add Category
      </Link>

      {/* Category List */}
      {!selectedCategory && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
          {categories.map(category => (
            <div key={category.id} style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <button
                onClick={() => handleCategoryClick(category.id)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Category Detail */}
      {selectedCategory && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
          <button
            onClick={handleBackToList}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              marginBottom: '20px',
            }}
          >
            Back to List
          </button>
          <h2>{selectedCategory.name}</h2>
          <p>{selectedCategory.description}</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
