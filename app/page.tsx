// app/page.tsx
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'My App',
  description: 'Welcome to my Next.js application',
};

export default function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3em', marginBottom: '20px', color: 'blue' }}>
        Welcome and Enjoy!
      </h1>
      <p style={{ fontSize: '1.2em', color: 'black', marginBottom: '30px' }}>
        Our wonderful application. Explore More!
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link
          href="/users"
          style={{
            backgroundColor: 'green',
            color: 'pink',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '1.1em',
          }}
        >
          View Users
        </Link>
        <Link
          href="/blog"
          style={{
            backgroundColor: 'green',
            color: 'pink',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '1.1em',
          }}
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}