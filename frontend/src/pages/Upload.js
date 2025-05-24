import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../backend/api';

export default function UploadVideo() {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('video', video);
    form.append('thumbnail', thumbnail);

    await api.post('/video', form);
    navigate('/videos');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 600 }}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} required />
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
}
