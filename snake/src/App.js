import React, {useState, useEffect, useRef} from "react";

const gridSize = 20;
const initialSnake = [{ x: 10, y: 10 }];
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

export default function DrunkenSnake() {
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