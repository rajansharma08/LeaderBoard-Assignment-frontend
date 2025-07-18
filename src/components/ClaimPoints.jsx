import React from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from "../utils/toast";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const ClaimPoints = ({ selectedUser, refreshLeaderboard, onResetUser }) => {
  const handleClaim = async () => {
    if (!selectedUser) {
      showWarnToast("⚠️ Please select a user first!");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_API}/api/claim`, {
        userId: selectedUser,
      });

      const points = res.data.claimedPoints;
      showSuccessToast(`🎉 ${res.data.user.name} got ${points} points!`);

      refreshLeaderboard();
      onResetUser(); // ✅ Reset done by parent
    } catch (err) {
      showErrorToast("❌ Failed to claim points.", err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-4 sm:px-0 mt-4">
      <button
        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm sm:text-base rounded-lg shadow-md hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 active:scale-95"
        onClick={handleClaim}
      >
        🎁 Claim Points
      </button>
    </div>
  );
};

export default ClaimPoints;
