# Memory Game

A simple Memory Game built with React to test and improve memory skills.

## Features
- Displays a grid of cards that can be flipped.
- Match pairs of cards to win the game.
- Tracks the number of moves made by the player.
- Responsive design for desktop and mobile devices.

## Live Demo
[Demo Link](https://janvihatwar.github.io/MemoryGame)

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/memory-game.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```

## Deployment to GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add this to `package.json`:
   ```json
   "homepage": "https://<your-username>.github.io/memory-game",
   "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

## What I Learned
- **State Management in React:** Gained experience managing the state of flipped cards and matched pairs using `useState`.
- **Game Logic Implementation:** Learned how to design game mechanics, including flipping cards, checking for matches, and resetting the game.
- **React Hooks:** Improved understanding of `useEffect` for handling side effects like automatically flipping cards back after a delay.
- **CSS Grid:** Used CSS Grid to create a responsive and visually appealing layout for the game board.


### Thank you for checking out the Memory Game! 
### Happy coding!
