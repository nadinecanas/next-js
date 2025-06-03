// app/components/BlogPostCard.tsx
import React, { useState } from 'react';
import { BlogPost } from '../types/blogPost';

interface BlogPostCardProps {
  post: BlogPost;
  onClick: () => void;  // A callback function to trigger inline detail display
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    // Toggle the visibility of post details
    setShowDetails(prevState => !prevState);
    // Also, trigger the parent handler
    onClick();
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', cursor: 'pointer' }} onClick={handleClick}>
      <h2>{post.title}</h2>
      <p>Author: {post.authorName || 'Unknown'}</p>
      <p>Date: {new Date(post.date).toLocaleDateString()}</p>
      {post.thumbnail && <img src={post.thumbnail} alt="Thumbnail" style={{ maxWidth: '100%' }} />}
      
      {/* Show snippet only */}
      <p>{post.content.substring(0, 100)}...</p>

      {/* Show full content when clicked */}
      {showDetails && (
        <div style={{ marginTop: '10px' }}>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
};

export default BlogPostCard;
