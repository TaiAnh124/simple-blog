import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import { v4 as uuid } from 'uuid';


import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

function App() {
  const [posts, setPosts] = useState([]);

  // Lấy danh sách bài viết từ localStorage khi ứng dụng khởi chạy
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  // Lưu danh sách bài viết vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (title, content) => {
    const newPost = {
      id: uuid(),
      title,
      content,
      comments: [],
    };
    setPosts([...posts, newPost]);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const editPost = (postId, newTitle, newContent) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, title: newTitle, content: newContent };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const addComment = (postId, commentText) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, commentText] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/post/:id" element={<PostDetail posts={posts} addComment={addComment} />} />
          <Route path="/posts" element={<PostList posts={posts} deletePost={deletePost} editPost={editPost} />} />
          <Route path="/" element={<PostList posts={posts} deletePost={deletePost} editPost={editPost} addPost={addPost} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
