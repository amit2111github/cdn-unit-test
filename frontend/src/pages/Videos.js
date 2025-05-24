import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../backend/api';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/video').then(res => setVideos(res.data.data));
  }, []);

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
