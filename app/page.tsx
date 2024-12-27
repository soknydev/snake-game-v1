'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import ColorPicker from "../components/ColorPicker";
import LevelSelector from "../components/LevelSelector";

const Home = () => {
  const [snakeColor, setSnakeColor] = useState<string>("#00ff00");
  const [level, setLevel] = useState<number>(1);
  const router = useRouter();

  const startGame = () => {
    router.push(`/dashboard?color=${snakeColor}&level=${level}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-[40px] font-bold text-blue-600">Snake Game</h1>
      <ColorPicker selectedColor={snakeColor} onColorChange={setSnakeColor} />
      <LevelSelector selectedLevel={level} onLevelChange={setLevel} />
      <button
        onClick={startGame}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
