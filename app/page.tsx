"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ColorPicker from "../components/ColorPicker";
import LevelSelector from "../components/LevelSelector";
import Meteors from "@/components/ui/meteors";
import RainbowButton from "@/components/ui/rainbow-button";

const Home = () => {
  const [snakeColor, setSnakeColor] = useState<string>("#00ff00");
  const [level, setLevel] = useState<string>("easy");
  const router = useRouter();

  const startGame = () => {
    const encodedColor = encodeURIComponent(snakeColor); // Properly encode the selected color
    router.push(`/dashboard?color=${encodedColor}&level=${level}`);
  };


  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Meteors number={30} />
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Welcome to Snake Game
        </h1>
        <ColorPicker selectedColor={snakeColor} onColorChange={setSnakeColor} />
        <LevelSelector selectedLevel={level} onLevelChange={setLevel} />
        <RainbowButton onClick={startGame} className="rounded-[10px]">
          Start Snake Game Now
        </RainbowButton>
      </div>
    </div>
  );
};

export default Home;
