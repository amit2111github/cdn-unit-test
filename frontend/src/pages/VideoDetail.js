import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../backend/api";

export default function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [signedUrl, setSignedUrl] = useState("");  // Store signed URL separately

  useEffect(() => {
    api.get(`/video/${videoId}`).then((res) => {
      const videoData = res.data.data;
      setVideo(videoData);
      setSignedUrl(videoData.video);  // Directly set the signed URL from response
    }).catch((error) => {
      console.error("Error fetching video data:", error);
    });
  }, [videoId]);


  if (!video || !signedUrl) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">{video.title}</h2>
      <video
        controls
        src={signedUrl}  // Use the signed URL to avoid any expired link issues
        className="w-100 rounded shadow mb-3"
      />
      <img
        src={video.thumbnail}
        alt="Thumbnail"
        className="img-thumbnail"
        style={{ maxWidth: 200 }}
      />
    </div>
  );
}
