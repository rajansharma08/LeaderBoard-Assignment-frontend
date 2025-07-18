import React, { useState } from "react";
import UserSelector from "./components/UserSelector";
import ClaimPoints from "./components/ClaimPoints";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from "./components/LeaderBoard";

const App = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const handleResetUser = () => setSelectedUser("");

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-black bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl p-8 animate-fade-in">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-yellow-300 drop-shadow-lg mb-6 sm:mb-8 animate-bounce">
          🔥 Claim & Climb Leaderboard
        </h1>

        <div className="space-y-6">
          <UserSelector
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            refreshUsers={triggerRefresh}
          />

          <ClaimPoints
            selectedUser={selectedUser}
            refreshLeaderboard={triggerRefresh}
            onResetUser={handleResetUser}
          />

          <Leaderboard refreshKey={refreshKey} />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
