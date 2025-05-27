import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../backend/api';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  console.log(videos);
  useEffect(() => {
    api.get('/video')
      .then(res => setVideos(res.data.data))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          // Clear localStorage
          localStorage.removeItem('user'); // or localStorage.clear() if you want to clear all
          // Redirect to /signin
          navigate('/signin');
        } else {
          console.error('Failed to fetch videos:', err);
        }
      });
  }, [navigate]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Videos</h2>
        <button className="btn btn-success" onClick={() => navigate('/upload')}>Upload Video</button>
      </div>
      <div className="row">
        {videos.map((video) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={video.id}>
            <div className="card h-100" onClick={() => navigate(`/videos/${video.id}`)} style={{ cursor: 'pointer' }}>
              <img src={video.thumbnail} className="card-img-top" alt={video.title} />
              <div className="card-body">
                <h5 className="card-title text-center">{video.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
