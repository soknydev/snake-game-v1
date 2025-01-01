'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GameBoard from "@/components/GameBoard";
import RainbowButton from "@/components/ui/rainbow-button";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPaused, setIsPaused] = useState(false);
  const [snakeColor, setSnakeColor] = useState("#00ff00"); // Default color
  const [level, setLevel] = useState("easy"); // Default level

  const levelSpeeds: Record<string, number> = {
    easy: 1,
    medium: 2,
    hard: 3,
    "very hard": 4,
  };

  useEffect(() => {
    // Get query parameters
    const colorParam = searchParams.get("color");
    const levelParam = searchParams.get("level");

    if (colorParam) setSnakeColor(decodeURIComponent(colorParam)); // Decode the color
    if (levelParam) setLevel(levelParam);

    console.log("Color:", colorParam, "Level:", levelParam);
  }, [searchParams]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-[40px] font-bold text-blue-600">Snake Game Dashboard</h1>
      <GameBoard snakeColor={snakeColor} level={levelSpeeds[level]} isPaused={isPaused} />

      <div className="flex gap-4">

        <RainbowButton onClick={togglePause}
          className={`text-[16px] px-10 py-4 text-white rounded-[10px] ${
            isPaused
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}>
          {isPaused ? "Resume" : "Pause"}
        </RainbowButton>

        <RainbowButton onClick={goHome}
          className="bg-red-500 text-white px-6 py-3 rounded-[10px] hover:bg-red-600">
          Go Home
        </RainbowButton>
      
      </div>
    </div>
  );
};

export default Dashboard;
