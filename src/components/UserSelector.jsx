import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const UserSelector = ({ selectedUser, setSelectedUser, refreshUsers }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`${BACKEND_API}/api/users`);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!newUser) return;
    await axios.post(`${BACKEND_API}/api/users`, { name: newUser });
    setNewUser("");
    fetchUsers();
    refreshUsers(); // Update leaderboard as well
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-black shadow-lg rounded-2xl p-6 my-6 w-full max-w-4xl mx-auto animate-fade-in">
      {/* Centered Heading */}
      <h2 className="text-xl font-semibold mb-6 text-white text-center">
        👤 Select or Add User
      </h2>

      {/* Main Content - Left Select, Right Input + Button */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-end">
        {/* Left: Select User */}
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-white text-sm font-medium mb-2">
            Select Existing User
          </label>
          <select
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 hover:border-gray-500"
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser}
          >
            <option
              value=""
              style={{ backgroundColor: "#1f2937", color: "white" }}
            >
              -- Select User --
            </option>
            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Add New User */}
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-white text-sm font-medium mb-2">
            Add New User
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="text"
              value={newUser}
              placeholder="Enter user name"
              onChange={(e) => setNewUser(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 hover:border-gray-400"
            />
            <button
              onClick={addUser}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200 whitespace-nowrap"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelector;
