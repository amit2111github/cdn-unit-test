// components/RedirectIfAuth.js
import { Navigate } from "react-router-dom";

export default function RedirectIfAuth({ children }) {
  const user = localStorage.getItem("user");
  return user ? <Navigate to="/videos" /> : children;
}
