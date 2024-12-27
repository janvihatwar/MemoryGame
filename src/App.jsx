import { useState, useEffect } from "react";
import "./App.css";

const categories = {
  animals: ["lion", "tiger", "snake", "zebra", "bear", "panda"],
  fruits: ["apple", "banana", "orange", "grape", "mango", "kiwi"],
  colors: ["red", "blue", "green", "yellow", "purple", "pink"],
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("animals");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(parseInt(localStorage.getItem("level")) || 1);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const shuffleCards = (category) => {
    const categoryCards = categories[category];
    const doubledCards = [...categoryCards, ...categoryCards];
    const shuffled = doubledCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setMatchedCards([]);
    setFlippedCards([]);
    setIsGameOver(false);
    setMoves(0);
    setTimeLeft(60);
    setGameStarted(false); // Ensure timer doesn't start until user starts the game
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(cards[index]) || isGameOver) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      if (cards[firstCard] === cards[secondCard]) {
        setMatchedCards([...matchedCards, cards[firstCard]]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  //check whether all pairs of cards have been matched
  useEffect(() => {
    if (matchedCards.length === cards.length / 2) {
      setIsGameOver(true);
    }
  }, [matchedCards, cards]);

  useEffect(() => {
    if (!gameStarted || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          setGameStarted(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, isGameOver]);

  useEffect(() => {
    if (isGameOver && matchedCards.length === cards.length / 2) {
      setLevel(level + 1);
      localStorage.setItem("level", level + 1);
      shuffleCards(selectedCategory);
      setShowLevelUpPopup(true);
    }
  }, [isGameOver, matchedCards, cards.length, level]);

  useEffect(() => {
    shuffleCards(selectedCategory);
  }, [selectedCategory]);

  const handleLevelUpPopupClose = () => {
    setShowLevelUpPopup(false);
    setGameStarted(true); // Start the game after popup closes
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>

      {showInstructions && (
        <div className="instructions-modal">
          <div className="instructions-content">
            <h2>How to Play</h2>
            <p>
              1. The goal is to find pairs of matching cards.
              <br />
              2. Click on two cards to flip them over. If they match, they stay open.
              <br />
              3. If the cards don't match, they will flip back over after a short delay.
              <br />
              4. The game ends when you match all the cards or the time runs out.
            </p>
            <button onClick={() => { 
              setShowInstructions(false); 
              setGameStarted(true); // Start the game after instructions
            }}>
              Start Game
            </button>
          </div>
        </div>
      )}

      {showLevelUpPopup && (
        <div className="level-up-popup">
          <div className="popup-content">
            <h2>Level Up! 🎉</h2>
            <p>Congratulations on completing Level {level}!</p>
            <p>Choose your next category to continue:</p>

            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <button onClick={handleLevelUpPopupClose}>Start</button>
          </div>
        </div>
      )}

      <div>
        <p>Level: {level}</p>
        <p>Time Left: {timeLeft}s</p>
        <p>Moves: {moves}</p>
      </div>

      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(card) ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(card) ? card : "?"}
          </div>
        ))}
      </div>

      {isGameOver && (
        <div className="game-over">
          {timeLeft > 0 ? "You Win!" : "Time's Up!"}
        </div>
      )}
    </div>
  );
}

export default App;
