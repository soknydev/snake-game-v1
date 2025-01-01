import React, { useEffect, useRef, useState, useCallback } from "react";

interface GameBoardProps {
  snakeColor: string;
  level: number;
  isPaused: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ snakeColor, level, isPaused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * 30),
    y: Math.floor(Math.random() * 20),
  });
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const canvasWidth = 600;
  const canvasHeight = 400;
  const cellSize = 20; // Each cell is 20x20 pixels
  const gridWidth = canvasWidth / cellSize; // 30 cells wide
  const gridHeight = canvasHeight / cellSize; // 20 cells tall

 
  const moveSnake = useCallback(() => {
    setSnake((prev) => {
      const newHead = { ...prev[0] };

      // Update head position based on direction
      if (direction === "RIGHT") newHead.x += 1;
      if (direction === "LEFT") newHead.x -= 1;
      if (direction === "UP") newHead.y -= 1;
      if (direction === "DOWN") newHead.y += 1;

      // Wrap around the walls
      newHead.x = (newHead.x + gridWidth) % gridWidth;
      newHead.y = (newHead.y + gridHeight) % gridHeight;

      // Check for self-collision
      const collision = prev.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      );
      if (collision) {
        setGameOver(true);
        return prev; // Stop updating the snake
      }

      const ateFood = newHead.x === food.x && newHead.y === food.y;

      if (ateFood) {
        // Generate new food if eaten
        setFood({
          x: Math.floor(Math.random() * gridWidth),
          y: Math.floor(Math.random() * gridHeight),
        });

        // Increment the score
        setScore((prevScore) => prevScore + 1);

        // Grow the snake by adding only the new head
        return [newHead, ...prev];
      }

      // Move the snake (no growth)
      return [newHead, ...prev.slice(0, -1)];
    });
  }, [direction, food, gridWidth, gridHeight]);
  

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    },
    [direction] // Dependency ensures it's up-to-date
  );

  useEffect(() => {
      if (gameOver || isPaused) return; // Pause the game loop when paused
  
      document.addEventListener("keydown", handleKeyPress);
      const interval = setInterval(moveSnake, 300 / level);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
        clearInterval(interval);
      };
    }, [handleKeyPress, moveSnake, level, gameOver, isPaused]); // Added isPaused to dependencies
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 600, 400);

        // Draw snake
        snake.forEach((segment, index) => {
          if (index === 0) {
            // Draw head
            ctx.fillStyle = snakeColor;
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);

            // Draw eyes based on direction
            ctx.fillStyle = "white";
            if (direction === "UP") {
              ctx.beginPath();
              ctx.arc(segment.x * 20 + 6, segment.y * 20 + 6, 3, 0, Math.PI * 2); // Left eye
              ctx.arc(segment.x * 20 + 14, segment.y * 20 + 6, 3, 0, Math.PI * 2); // Right eye
            } else if (direction === "DOWN") {
              ctx.beginPath();
              ctx.arc(segment.x * 20 + 6, segment.y * 20 + 14, 3, 0, Math.PI * 2); // Left eye
              ctx.arc(segment.x * 20 + 14, segment.y * 20 + 14, 3, 0, Math.PI * 2); // Right eye
            } else if (direction === "LEFT") {
              ctx.beginPath();
              ctx.arc(segment.x * 20 + 6, segment.y * 20 + 6, 3, 0, Math.PI * 2); // Top eye
              ctx.arc(segment.x * 20 + 6, segment.y * 20 + 14, 3, 0, Math.PI * 2); // Bottom eye
            } else if (direction === "RIGHT") {
              ctx.beginPath();
              ctx.arc(segment.x * 20 + 14, segment.y * 20 + 6, 3, 0, Math.PI * 2); // Top eye
              ctx.arc(segment.x * 20 + 14, segment.y * 20 + 14, 3, 0, Math.PI * 2); // Bottom eye
            }
            ctx.fill();

            // Draw mouth based on direction
            ctx.fillStyle = "black";
            ctx.beginPath();
            if (direction === "UP") {
              ctx.arc(segment.x * 20 + 10, segment.y * 20 + 2, 3, 0, Math.PI);
            } else if (direction === "DOWN") {
              ctx.arc(segment.x * 20 + 10, segment.y * 20 + 18, 3, 0, Math.PI);
            } else if (direction === "LEFT") {
              ctx.arc(segment.x * 20 + 2, segment.y * 20 + 10, 3, Math.PI / 2, (3 * Math.PI) / 2);
            } else if (direction === "RIGHT") {
              ctx.arc(segment.x * 20 + 18, segment.y * 20 + 10, 3, (3 * Math.PI) / 2, Math.PI / 2);
            }
            ctx.fill();
          } else {
            // Draw body
            ctx.fillStyle = snakeColor;
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
            ctx.strokeStyle = "white";
            ctx.strokeRect(segment.x * 20, segment.y * 20, 20, 20);
          }
        });

        // Draw food
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(food.x * 20 + 10, food.y * 20 + 10, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [snake, food, snakeColor, direction]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight),
    });
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[18px] text-gray-600">Score: {score}</p>
      {gameOver ? (
        <div className="text-center">
          <p className="text-red-500 font-bold">Game Over!</p>
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Restart
          </button>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border-2 border-gray-300 shadow-lg rounded-lg"
        />
      )}
    </div>
  );
};

export default GameBoard;
