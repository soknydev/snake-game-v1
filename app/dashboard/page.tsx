'use client';

import { useSearchParams } from "next/navigation";
import GameBoard from "@/components/GameBoard";

const PlayGame = () => {
  const searchParams = useSearchParams();
  const color = searchParams.get("color") || "#00ff00";
  const level = parseInt(searchParams.get("level") || "1", 10);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-[30px] font-semibold mb-4">Snake Game</h1>
      <GameBoard snakeColor={color} level={level} />
    </div>
  );
};

export default PlayGame;
