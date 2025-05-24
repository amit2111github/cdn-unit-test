import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../backend/api';

export default function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    api.get(`/video/${videoId}`).then(res => setVideo(res.data.data));
  }, [videoId]);

  if (!video) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">{video.title}</h2>
      <video controls src={video.video} className="w-100 rounded shadow mb-3" />
      <img src={video.thumbnail} alt="Thumbnail" className="img-thumbnail" style={{ maxWidth: 200 }} />
    </div>
  );
}
