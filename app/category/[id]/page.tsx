// app/category/[id]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface CategoryParams {
  params: { id?: string };
}

const CategoryDetailPage: React.FC<CategoryParams> = ({ params }) => {
  const [category, setCategory] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = params; // Access id from params
  const router = useRouter(); // Use useRouter for navigation

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/category`);
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
          const categoriesData = await response.json();
          const foundCategory = categoriesData.find((category: any) => category.id === Number(id));

          if (foundCategory) {
            setCategory(foundCategory);
          } else {
            setError('Category not found');
            router.push('/category'); // Redirect if category not found
          }
        } catch (err) {
          setError((err as Error).message);
        }
      }
    };

    fetchCategory();
  }, [id, router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryDetailPage;
