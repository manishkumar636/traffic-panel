/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/auth.service';
import { Helmet } from 'react-helmet';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// A simple loader component
const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="loader"></div>
  </div>
);

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginUs = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent further clicks if already loading

    setLoading(true);

    const { username, password } = formData;
    if (!username || !password) {
      alert('Both username and password fields are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData);

      if (response) {
        setFormData({
          username: '',
          password: ''
        });
        navigate('/billingdetails');
        alert('Login Successful');
      } else {
        alert('Login Failed, please correct username and password.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error(`Error during login: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
          <form onSubmit={handleLoginUs}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleLoginChange}
                className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleLoginChange}
                className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 top-8 px-3 flex items-center text-gray-700"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 font-semibold text-white py-2 rounded-md"
            >Login
            </button>
          </form>
          <div className="mt-4">
            {loading && <Loader />}
          </div>
        </div>
      </div>

      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light grey */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
