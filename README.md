# 🥴 Drunken-Snake-Game
This is a fun little variation of the classic Snake game made with React. The snake moves on a 20x20 grid, randomly changes direction slightly to simulate drunkenness, and eats apples (🍎) to grow.

# 📦 Features
- React Functional Component with Hooks
- Snake head displays directional emoji (🔼🔽◀️▶️)
- Random direction deviations for a drunk effect
- Game start and restart functionality
- Collision detection
- Score tracking

# 🚀 How to Run
1. Clone the project or copy **App.js** and **App.css** into a Create React App.
2. Run:
   ```
   npm install
   npm start
   ```
3. Open **http://localhost:3000** to play.

# 🧠 Game Logic Breakdown
## Grid Setup
- Grid size: **20 x 20**
- Controlled with CSS grid layout

## Snake behaviour
- The initial snake has one segment
- Snake moves every 100ms
- Direction changes via arrow keys, unless it would reverse the snake
- A small random deviation (5% chance) makes the snake pick a different, valid direction

## Food Placement
- Randomly placed on the grid
- Never overlaps the snake

## Collision Logic
The game ends if the snake hits the wall or itself

## Head Emoji
Directional emojis used to indicate snake heading's: 
- **🔼** Up
- **🔽** Down
- **◀️** Left
- **▶️** Right

## 🎮 Controls
- **Arrow keys**: Change direction
- **Start Game**: Begins the game
- **Restart Game**: Appears on game over

## 📁 File Structure
```
/src
 └── App.js       # Main game logic
 └── App.css      # Optional styling (grid, fonts)
```

**Developed by** - @Arijit2175

Enjoy the game and try not to crash! 🍻🐍