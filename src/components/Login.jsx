import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  localStorage.setItem("email",email)

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log(response.data)
      if (response.data.message) {
       
        login(response.data.user); // Set user in context
        localStorage.setItem("token", response.data.token); // Save token

        // Redirect based on role
        if (response.data.user.role === "admin") {
          console.log("Redirecting to Admin Dashboard");
          navigate("/admin-dashboard");
        } else {
          console.log("Redirecting to Employee Dashboard");
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.error); // Show server error
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-teal-600 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-white">VizFaculty</h1>
      </div>
      <div className="w-1/2 bg-white flex justify-center items-center">
        <div className="w-96 bg-gray-100 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-black font-bold py-2 px-4 rounded-md hover:bg-teal-800 text-white transition-transform duration-200"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;