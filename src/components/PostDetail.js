import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function PostDetail({ posts, addComment }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const [comment, setComment] = useState('');

  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleAddComment = () => {
    addComment(post.id, comment);
    setComment('');
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <ul>
        {post.comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <Link to="/posts">Back to All Posts</Link>
    </div>
  );
}

export default PostDetail;
