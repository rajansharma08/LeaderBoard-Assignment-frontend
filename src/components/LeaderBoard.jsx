import React, { useEffect, useState } from "react";
import axios from "axios";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Leaderboard = ({ refreshKey }) => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await axios.get(`${BACKEND_API}/api/users`);
      const sorted = res.data.sort((a, b) => b.points - a.points);
      setLeaders(sorted);
    };
    fetchLeaderboard();
  }, [refreshKey]); // Re-fetch when claim happens

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-yellow-300 mb-8">
        🏆 Leaderboard
      </h3>

      {/* Top 3 Podium - Smaller */}
      <div className="flex justify-center items-end mb-4 gap-3">
        {/* 2nd Place - Left */}
        {leaders[1] && (
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg p-3 mb-1 shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-2xl mb-1">🥈</div>
              <div className="text-white text-center">
                <div className="font-bold text-sm">{leaders[1].name}</div>
                <div className="text-yellow-300 font-semibold text-xs">
                  {leaders[1].points} pts
                </div>
              </div>
            </div>
            <div className="bg-gray-400 h-12 w-16 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">2</span>
            </div>
          </div>
        )}

        {/* 1st Place - Middle (Higher) */}
        {leaders[0] && (
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg p-4 mb-1 shadow-xl transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-1">👑</div>
              <div className="text-white text-center">
                <div className="font-bold text-base">{leaders[0].name}</div>
                <div className="text-yellow-200 font-semibold text-sm">
                  {leaders[0].points} pts
                </div>
              </div>
            </div>
            <div className="bg-yellow-500 h-16 w-20 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">1</span>
            </div>
          </div>
        )}

        {/* 3rd Place - Right */}
        {leaders[2] && (
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg p-3 mb-2 shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-2xl mb-1">🥉</div>
              <div className="text-white text-center">
                <div className="font-bold text-sm">{leaders[2].name}</div>
                <div className="text-yellow-300 font-semibold text-xs">
                  {leaders[2].points} pts
                </div>
              </div>
            </div>
            <div className="bg-orange-500 h-10 w-14 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3</span>
            </div>
          </div>
        )}
      </div>

      {/* List Format for All Rankings (like image) */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4">
          {leaders.map((user, index) => (
            <div
              key={user._id}
              className={`flex items-center justify-between p-4 rounded-lg mb-3 ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300"
                  : index === 1
                    ? "bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300"
                    : index === 2
                      ? "bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300"
                      : "bg-gray-50 hover:bg-gray-100 transition-colors"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                        ? "bg-gray-400"
                        : index === 2
                          ? "bg-orange-500"
                          : "bg-gray-600"
                  }`}
                >
                  {index + 1}
                </div>

                {/* User Info */}
                <div>
                  <div className="font-bold text-gray-800">{user.name}</div>
                  {index < 3 && (
                    <div className="text-sm text-gray-600">
                      {index === 0
                        ? "👑 Champion"
                        : index === 1
                          ? "🥈 Runner-up"
                          : "🥉 Third Place"}
                    </div>
                  )}
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <div className="font-bold text-lg text-gray-800">
                  {user.points.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
