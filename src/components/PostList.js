import React, { useState } from 'react';
import { BtnDefault, ButtonCreate, ButtonSubmit, Input1, TextArea, Title } from './style';

function PostList({ posts, deletePost, editPost, addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = () => {
    addPost(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <Title style={{ fontSize: '40px', border: '2px solid black', padding: '5px', marginTop: '0', backgroundColor: '#D2B48C' }}>Post List</Title>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <BtnDefault onClick={() => deletePost(post.id)}>Delete</BtnDefault>
            <ButtonSubmit
              onClick={() => {
                const newTitle = prompt('Enter new title:', post.title);
                const newContent = prompt('Enter new content:', post.content);
                editPost(post.id, newTitle, newContent);
              }}
            >
              Edit
            </ButtonSubmit>
          </li>
        ))}
      </ul>
      <Title>Add New Post</Title>
      <div>
        <Input1
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '30px' }}
        />
      </div>
      <div>
        <TextArea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="2"
          style={{ marginBottom: '30px' }}
        />
      </div>
      <div style={{ textAlign: 'center'}}>
        <ButtonCreate onClick={handleAddPost}>Create new post</ButtonCreate>
      </div>
    </div>
  );
}

export default PostList;
