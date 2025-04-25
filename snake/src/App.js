import React, {useState, useEffect, useRef} from "react";
import "./App.css";

function App(){
const gridSize = 20;
const initialSnake = [{ x: 10, y: 10 }];
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

  const [snake, setSnake] = useState(initialSnake);
  const [dir, setDir] = useState(directions.ArrowRight);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const dirRef = useRef(dir);

  useEffect(() => {
    const handleKey = (e) => {
      if (directions[e.key]) {
        dirRef.current = directions[e.key];
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const wobble = Math.random();
      let newDir = dirRef.current;

      if (wobble < 0.2) {
        const options = Object.values(directions);
        newDir = options[Math.floor(Math.random() * options.length)];
      }

      const newHead = {
        x: snake[0].x + newDir.x,
        y: snake[0].y + newDir.y,
      };

      if (
        newHead.x < 0 || newHead.x >= gridSize ||
        newHead.y < 0 || newHead.y >= gridSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        return;
      }

      let newSnake = [newHead, ...snake];
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      setDir(newDir);
      dirRef.current = newDir;
    }, 200);

    return () => clearInterval(interval);
  }, [snake, food, gameOver]);

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl mb-2">🥴 Drunken Snake</h1>
      {gameOver && <h2 className="text-red-500">Game Over</h2>}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gridTemplateRows: `repeat(${gridSize}, 20px)`,
          gap: "1px",
          background: "#333",
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isSnake = snake.some(seg => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              style={{
                width: "20px",
                height: "20px",
                background: isSnake ? "#00FF00" : isFood ? "#FF0000" : "#111",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;