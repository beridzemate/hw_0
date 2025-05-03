import { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [postData, setPostData] = useState({ title: '', content: '', image: null });
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    if (postData.image) formData.append('image', postData.image);

    try {
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Post created successfully!');
    } catch (err) {
      alert('Error creating post');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostData({ ...postData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded h-32"
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {previewImage && (
          <img src={previewImage} alt="Preview" className="w-48 h-48 object-cover" />
        )}
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Create Post
        </button>
      </form>
    </div>
  );
}