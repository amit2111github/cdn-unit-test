import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../backend/api";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = async () => {
    try {
      await api.post("/user/logout");
    } catch (e) {}
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!user) return null;

  return (
    <div className="bg-light py-2 px-4 d-flex justify-content-end">
      <div className="dropdown">
        <div
          className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
          style={{ width: 40, height: 40, cursor: "pointer" }}
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user.name[0].toUpperCase()}
        </div>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li className="dropdown-item-text"><strong>{user.name}</strong></li>
          <li className="dropdown-item-text">{user.email}</li>
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
        </ul>
      </div>
    </div>
  );
}
