import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPage.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/blog', newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="blog-page">
      <h1>Blog Page</h1>
      {selectedPost ? (
        <div className="post-detail">
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
          <button onClick={handleBackClick}>Back to Posts</button>
        </div>
      ) : (
        <>
          <div className="post-list">
            {posts.map((post) => (
              <div key={post._id} className="post-item">
                <h2>{post.title}</h2>
                <button onClick={() => handlePostClick(post)}>Read More</button>
              </div>
            ))}
          </div>
          <div className="create-post">
            <h2>Create New Post</h2>
            <form onSubmit={handleCreatePost}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleNewPostChange}
                  required
                />
              </label>
              <label>
                Content:
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleNewPostChange}
                  required
                ></textarea>
              </label>
              <button type="submit">Create Post</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
