import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Videos from "./pages/Videos";
import VideoPlayer from "./pages/VideoDetail";
import Upload from "./pages/Upload";
import Navbar from "./component/Navbar";
import RedirectIfAuth from "./component/RedirectIfAuth";
import ProtectedRoute from "./component/ProtectedRoute";
import GoBack from "./component/GoBack";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/videos" replace />} />
        <Route
          path="/signin"
          element={
            <RedirectIfAuth>
              <Signin />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <Signup />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <Videos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/:videoId"
          element={
            <ProtectedRoute>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<GoBack />} />
      </Routes>
    </Router>
  );
};

export default App;
