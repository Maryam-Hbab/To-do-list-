import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios-config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Side - Login */}
      <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-gray-200">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">Login</h1>
          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:bg-gray-50"
              >
                Login
              </button>
            </form>
          </div>
          <Link
            to="/register"
            className="block w-full py-3 px-4 bg-white border border-gray-200 rounded-xl text-center text-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:bg-gray-50 mt-4"
          >
            Sign Up
          </Link>
        </div>
      </div>
      
      {/* Right Side - Preview */}
      <div className="w-1/2 relative flex items-center justify-center bg-center bg-no-repeat bg-contain" style={{ backgroundImage: "url('./src/assets/website.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Optional dark overlay */}
        <div className="relative p-8 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">To-Do List</h2>
          <p className="text-lg">
          Stay organized and manage your tasks efficiently. Add, edit, and track your to-do items.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
