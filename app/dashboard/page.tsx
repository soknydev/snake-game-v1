'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GameBoard from "@/components/GameBoard";

const Dashboard = () => {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const snakeColor = queryParams.get("color") || "#00ff00";
  const level = parseInt(queryParams.get("level") || "1", 10);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-[40px] font-bold text-blue-600">Snake Game Dashboard</h1>
      <GameBoard snakeColor={snakeColor} level={level}  />
      <div className="flex gap-4">
        <button
          onClick={togglePause}
          className={`px-6 py-3 rounded text-white ${
            isPaused
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {isPaused ? "Continue" : "Pause"}
        </button>
        <button
          onClick={goHome}
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
