import { Fragment, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Admindash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Fragment>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-4 flex justify-between">
          <div></div>
          <button
            onClick={openModal}
            className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto text-xs"
          >
            Add
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-sm">
                <th className="px-4 py-2 border-b text-left">ID</th>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th className="px-4 py-2 border-b text-left">Role</th>
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs">
                <td className="px-4 py-2 border-b">1</td>
                <td className="px-4 py-2 border-b">John Doe</td>
                <td className="px-4 py-2 border-b">johndoe@example.com</td>
                <td className="px-4 py-2 border-b">Client</td>
                <td className="px-4 py-2 border-b">
                  <button className="bg-green-500 text-xs text-white py-1 px-2 rounded hover:bg-green-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-xs text-white py-1 px-2 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="text-xs">
                <td className="px-4 py-2 border-b">2</td>
                <td className="px-4 py-2 border-b">Jane Smith</td>
                <td className="px-4 py-2 border-b">janesmith@example.com</td>
                <td className="px-4 py-2 border-b">Client</td>
                <td className="px-4 py-2 border-b">
                  <button className="bg-green-500 text-xs text-white py-1 px-2 rounded hover:bg-green-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-xs text-white py-1 px-2 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form>
              <div className="space-y-1">
                <label className="block text-gray-700 text-sm">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded text-xs"
                  placeholder="Enter email"
                />
              </div>

              <div className="space-y-1 mt-4 relative">
                <label className="block text-gray-700 text-sm">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded text-xs"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-7 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-end mt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-xs text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-xs text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
