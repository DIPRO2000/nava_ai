import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card"; // Assuming Card component exists
import grad from "../../assets/gradient.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Signup Successfully!");
        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          window.location.href = "/login"; // Redirect after signup
        }, 2000);
      } else {
        alert(`❌hello ${data.message}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("❌ Server error. Please try again!");
    }
  };

  const loginRedirect=()=>{
    navigate("/login");
  }

  return (
    <div className="h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${grad})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <Card>
        <div className="m-5">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none w-1/2"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none w-1/2"
                required
              />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-200 mt-3 text-center">
            Already have an account?{" "}
            <a onClick={loginRedirect} className="text-blue-700 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
