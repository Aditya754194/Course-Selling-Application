import logo from "../assets/logo_web.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("Login successfull");
      toast.success(response.data.message || "Login successful!");
      localStorage.setItem("user",JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      SetErrorMessage(error.response.data.errors || "Login failed!!!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <header className="flex items-center justify-between p-6">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl text-violet-400 font-bold">EduWeb</h1>
          </div>
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-300 hover:text-black">
            Login
          </Link>
          <Link to="/signup" className="bg-violet-500 text-white py-2 px-4 rounded hover:text-black hover:bg-violet-300">
            Signup
          </Link>
        </div>
      </header>

      <div className="flex justify-center">
        <div className="p-6 flex justify-center bg-gray-900 w-96 rounded-xl">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
            <div className="text-center">
              <h1 className="font-bold text-lg">Welcome to <span className="text-violet-400">EduWeb</span></h1>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">👁️</span>
              </div>
            </div>
            {
              errorMessage && (
                <div className="text-red-500 text-center">{errorMessage}!</div>
              )
            }
            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-400 hover:text-black text-white py-3 px-6 rounded-md transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login
