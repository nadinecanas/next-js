// import AddCommentForm from '@/components/AddCommentForm';
// import { User, Post } from '@/types';

// const mockUsers: User[] = [
//   { id: '1', name: 'Alice' },
//   { id: '2', name: 'Bob' },
// ];

// const mockPosts: Post[] = [
//   { id: 'a', title: 'First Blog Post' },
//   { id: 'b', title: 'Second Blog Post' },
// ];

// export default function CommentsPage() {
//   return (
//     <div className="p-6">
//       <AddCommentForm users={mockUsers} posts={mockPosts} />
//     </div>
//   );
// }



'use client';

import { useState } from 'react';

const users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const posts = [
  { id: '1', title: 'First Blog Post' },
  { id: '2', title: 'Second Blog Post' },
  { id: '3', title: 'Another Post' },
];

export default function CommentsPage() {
  const [userId, setUserId] = useState('');
  const [postId, setPostId] = useState('');
  const [comment, setComment] = useState('');
  const [submittedComments, setSubmittedComments] = useState<
    { userId: string; postId: string; comment: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !postId || !comment) return;

    setSubmittedComments((prev) => [
      ...prev,
      { userId, postId, comment }
    ]);

    // Clear form
    setUserId('');
    setPostId('');
    setComment('');
  };

  const handleClear = () => {
    setUserId('');
    setPostId('');
    setComment('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          📝 Add Comment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comment Author</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">Select an author</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Post to Comment On</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              required
            >
              <option value="">Select a post</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>{post.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comment</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={100}
              rows={4}
              required
              placeholder="Write your comment here..."
            />
            <p className="text-sm text-gray-500">
              {comment.length}/30 characters
            </p>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>

      {/* Display submitted comments */}
      {submittedComments.length > 0 && (
        <div className="bg-white shadow-md rounded px-6 py-4 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-3">Submitted Comments</h3>
          <ul className="space-y-3">
            {submittedComments.map((c, index) => (
              <li key={index} className="border p-3 rounded">
                <p><strong>User:</strong> {users.find(u => u.id === c.userId)?.name}</p>
                <p><strong>Post:</strong> {posts.find(p => p.id === c.postId)?.title}</p>
                <p><strong>Comment:</strong> {c.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}