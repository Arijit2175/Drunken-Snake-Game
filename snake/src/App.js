import React, {useState, useEffect, useRef} from "react";

const gridSize = 20;
const initialSnake = [{ x: 10, y: 10 }];
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

