import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../backend/api";
import { Link } from "react-router-dom";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/signin", form).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/videos");
      });
    } catch (err) {
      alert(err.response?.data?.error || "Signin failed");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <form
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: 400 }}
        onSubmit={signin}
      >
        <h2 className="text-center mb-4">Sign In</h2>

        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Sign up here
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
}
