import React, { useState, useEffect, useRef } from "react";
import "./App.css";

//Size of grid
const gridSize = 20;

//Direction mappings
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

//Generate food in random positions
function randomFood(snake) {
  while (true) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    const isOnSnake = snake.find(seg => seg.x === x && seg.y === y);
    if (!isOnSnake) return { x, y };
  }
}

//To check if two directions are opposite
function areOpposite(d1, d2) {
  return d1.x + d2.x === 0 && d1.y + d2.y === 0;
}

//For design of the head
function getHeadEmoji(dir) {
  if (dir.x === 0 && dir.y === -1) return "🔼";
  if (dir.x === 0 && dir.y === 1) return "🔽";
  if (dir.x === -1 && dir.y === 0) return "◀️";
  if (dir.x === 1 && dir.y === 0) return "▶️";
  return "🔺";
}

//Initializing the App component
function App() {
  const initialSnake = [{ x: 10, y: 10 }];
  const [snake, setSnake] = useState(initialSnake);
  const [dir, setDir] = useState(directions.ArrowRight);
  const [food, setFood] = useState(randomFood(initialSnake));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const dirRef = useRef(dir);

  //Listen for keyboard keys
  useEffect(() => {
    const handleKey = (e) => {
      const newDir = directions[e.key];
      if (newDir && !areOpposite(newDir, dirRef.current)) {
        dirRef.current = newDir;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!hasStarted || gameOver) return;

    const interval = setInterval(() => {
      let newDir = dirRef.current;
      if (Math.random() < 0.05) {
        const options = Object.values(directions).filter(d =>
          !areOpposite(d, dirRef.current)
        );
        const possibleDirs = options.filter(d => {
          const nx = snake[0].x + d.x;
          const ny = snake[0].y + d.y;
          return (
            nx >= 0 &&
            nx < gridSize &&
            ny >= 0 &&
            ny < gridSize &&
            !snake.some(seg => seg.x === nx && seg.y === ny)
          );
        });
        if (possibleDirs.length > 0) {
          newDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        }
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
        snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        setGameOver(true);
        return;
      }

      let newSnake = [newHead, ...snake];
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(score + 1);
        setFood(randomFood(newSnake));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      setDir(newDir);
      dirRef.current = newDir;
    }, 100);

    return () => clearInterval(interval);
  }, [snake, food, gameOver, score, hasStarted]);

  //Restart the game
  const restartGame = () => {
    setSnake(initialSnake);
    setDir(directions.ArrowRight);
    dirRef.current = directions.ArrowRight;
    setFood(randomFood(initialSnake));
    setScore(0);
    setGameOver(false);
    setHasStarted(false);
  };

  //Render the game
  return (
    <div className="App" style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🥴 Drunken Snake</h1>
      <h2>Score: {score}</h2>

      {!hasStarted && !gameOver && (
        <button
          onClick={() => setHasStarted(true)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          ▶️ Start Game
        </button>
      )}

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
          const isHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
          const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                backgroundColor: "#111",
              }}
            >
              {isHead
                ? getHeadEmoji(dir)
                : isSnake
                ? "🟢"
                : isFood
                ? "🍎"
                : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

//Exporting the App component
export default App;
