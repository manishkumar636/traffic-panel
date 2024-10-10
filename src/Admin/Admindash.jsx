import { Fragment, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { addUsers, getUsersByAdmin } from "@/Service/auth.service";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function Admindash() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    username: "",
    password: "",
    loginPassword: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.username ||
      !formData.password ||
      !formData.loginPassword
    ) {
      alert("All fields are required.");
      return;
    }
    
    const response = await addUsers(formData);
    if (response) {
      alert(response.message);
      closeModal();
      setFormData({
        name: "",
        email: "",
        company: "",
        username: "",
        password: "",
        loginPassword: "",
      }); // Reset form data
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsersByAdmin();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleLogoutUser = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/");
  };

  return (
    <Fragment>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-4 flex justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={openModal}
              className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto text-xs"
            >
              Add
            </button>
            <button
              onClick={handleLogoutUser}
              className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto text-xs"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-sm">
                <th className="px-4 py-2 border-b text-left">ID</th>
                <th className="px-4 py-2 border-b text-left">User ID</th>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th className="px-4 py-2 border-b text-left">Company</th>
                <th className="px-4 py-2 border-b text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr className="text-xs" key={user._id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{user._id}</td>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.company}</td>
                  <td className="px-4 py-2 border-b">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          onClick={closeModal} // Close modal on overlay click
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleCreateAccount}>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2 text-xs"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-sm px-1 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2 text-xs"
                >
                  Email
                </label>
                <p className="text-xs mt-2 mb-2 text-gray-500">The email should be unique</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-sm px-1 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2 text-xs"
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full text-sm px-1 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2 text-xs"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full text-sm px-1 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2 text-xs"
                >
                  Password
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm px-1 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 top-6 px-3 flex items-center text-gray-700"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mb-6 relative">
                <label
                  htmlFor="loginPassword"
                  className="block text-gray-700 font-medium mb-2 text-xs"
                >
                  Login Password
                </label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleChange}
                  className="w-full text-sm px-1 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 top-6 px-3 flex items-center text-gray-700"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-between items-center gap-5">
                <button
                  type="submit"
                  className="w-full bg-blue-500 font-semibold text-white py-2 rounded-md text-xs"
                >
                  Add New User
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-gray-300 font-semibold text-gray-700 py-2 rounded-md text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
