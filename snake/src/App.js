import React, { useState, useEffect, useRef } from "react";
import "./App.css"; 

function App() {
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
  const [food, setFood] = useState(randomFood());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef(dir);

  function randomFood() {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }

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
      let newDir = dirRef.current;
      if (Math.random() < 0.2) {
        const options = Object.values(directions);
        newDir = options[Math.floor(Math.random() * options.length)];
      }

      const newHead = {
        x: snake[0].x + newDir.x,
        y: snake[0].y + newDir.y,
      };

      if (
        newHead.x < 0 ||
        newHead.x >= gridSize ||
        newHead.y < 0 ||
        newHead.y >= gridSize ||
        snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        setGameOver(true);
        return;
      }

      let newSnake = [newHead, ...snake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(score + 1);
        setFood(randomFood());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      setDir(newDir);
      dirRef.current = newDir;
    }, 200);

    return () => clearInterval(interval);
  }, [snake, food, gameOver, score]);

  const restartGame = () => {
    setSnake(initialSnake);
    setDir(directions.ArrowRight);
    dirRef.current = directions.ArrowRight;
    setFood(randomFood());
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🥴 Drunken Snake</h1>
      <h2>Score: {score}</h2>

      {gameOver && (
        <>
          <h2 style={{ color: "red" }}>💀 Game Over</h2>
          <button
            onClick={restartGame}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🔁 Restart Game
          </button>
        </>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gridTemplateRows: `repeat(${gridSize}, 20px)`,
          margin: "20px auto",
          backgroundColor: "#333",
          width: gridSize * 20,
          height: gridSize * 20,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: isSnake
                  ? "#00ff00"
                  : isFood
                  ? "#ff0000"
                  : "#111",
                boxSizing: "border-box",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
