import React, { useEffect, useRef, useState, useCallback } from "react";

interface GameBoardProps {
  snakeColor: string;
  level: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snakeColor, level }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * 25),
    y: Math.floor(Math.random() * 25),
  });
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 25; // 25x25 grid for the game board

  const moveSnake = useCallback(() => {
    setSnake((prev) => {
      const newHead = { ...prev[0] };

      // Update head position based on direction
      if (direction === "RIGHT") newHead.x += 1;
      if (direction === "LEFT") newHead.x -= 1;
      if (direction === "UP") newHead.y -= 1;
      if (direction === "DOWN") newHead.y += 1;

      // Wrap around the walls
      newHead.x = (newHead.x + gridSize) % gridSize;
      newHead.y = (newHead.y + gridSize) % gridSize;

      // Check for self-collision
      const collision = prev.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      );
      if (collision) {
        setGameOver(true);
        return prev; // Stop updating the snake
      }

      const ateFood = newHead.x === food.x && newHead.y === food.y;

      // Generate new food if eaten
      if (ateFood) {
        setFood({
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        });
        setScore((prevScore) => prevScore + 1);
        return [newHead, ...prev]; // Grow the snake
      }

      return [newHead, ...prev.slice(0, -1)];
    });
  }, [direction, food]);

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
    if (gameOver) return;

    document.addEventListener("keydown", handleKeyPress);
    const interval = setInterval(moveSnake, 300 / level);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(interval);
    };
  }, [handleKeyPress, moveSnake, level, gameOver]); // Fixed dependencies

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 500, 500);

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
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    });
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600">Score: {score}</p>
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
          width={500}
          height={500}
          className="border-2 border-gray-300 shadow-lg rounded-lg"
        />
      )}
    </div>
  );
};

export default GameBoard;
