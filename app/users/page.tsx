// app/users/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { User } from '../types/user';
import Link from 'next/link';
import UserCard from '../components/UserCard';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>
        Users
      </h1>
      <Link
        href="/users/add"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          textDecoration: 'none',
          marginBottom: '20px',
          display: 'inline-block',
        }}
      >
        Add User
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;