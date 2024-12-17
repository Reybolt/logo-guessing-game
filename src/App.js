import React, { useState, useEffect } from 'react';
import './styles.css';

// Logo data with multiple programming languages and frameworks
const logoData = [
  {
    name: 'React',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    category: 'Frontend',
    difficulty: 'easy'
  },
  {
    name: 'Python',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
    category: 'Backend',
    difficulty: 'easy'
  },
  {
    name: 'TypeScript',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
    category: 'Frontend',
    difficulty: 'medium'
  },
  {
    name: 'Go',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg',
    category: 'Backend',
    difficulty: 'hard'
  },
  {
    name: 'Rust',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',
    category: 'Systems',
    difficulty: 'hard'
  },
  {
    name: 'Node.js',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    category: 'Backend',
    difficulty: 'medium'
  },
  {
    name: 'Angular',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
    category: 'Frontend',
    difficulty: 'medium'
  },
  {
    name: 'Java',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg',
    category: 'Backend',
    difficulty: 'hard'
  }
];

function LogoGuessingGame() {
  // Game state
  const [currentLogo, setCurrentLogo] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [difficulty, setDifficulty] = useState('easy');

  // Select random logo based on difficulty
  const selectRandomLogo = () => {
    const filteredLogos = logoData.filter(logo => logo.difficulty === difficulty);
    const randomLogo = filteredLogos[Math.floor(Math.random() * filteredLogos.length)];
    setCurrentLogo(randomLogo);
  };

  // Timer effect
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // Handle logo guess
  const handleGuess = (guessedName) => {
    if (gameOver) return;

    if (guessedName === currentLogo.name) {
      // Correct guess
      setScore(prevScore => prevScore + 1);
      selectRandomLogo();
    } else {
      // Incorrect guess
      setAttempts(prevAttempts => {
        const newAttempts = prevAttempts - 1;
        if (newAttempts <= 0) {
          endGame();
        }
        return newAttempts;
      });
    }
  };

  // End game logic
  const endGame = () => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  // Restart game
  const restartGame = () => {
    setScore(0);
    setAttempts(3);
    setGameOver(false);
    setTimeLeft(60);
    selectRandomLogo();
  };

  // Initialize game on mount and difficulty change
  useEffect(() => {
    selectRandomLogo();
  }, [difficulty]);

  // Render game over screen
  if (gameOver) {
    return (
      <div className="game-over-container">
        <h2>Game Over!</h2>
        <p>Your Score: {score}</p>
        <p>High Score: {highScore}</p>
        <button onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="logo-guessing-game">
      <div className="game-header">
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Time Left: {timeLeft}s</span>
          <span>Attempts: {attempts}</span>
        </div>

        <div className="difficulty-selector">
          <label>
            Difficulty:
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={gameOver}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>
      </div>

      <div className="logo-container">
        {currentLogo && (
          <img 
            src={currentLogo.logo} 
            alt="Logo to guess" 
            className="current-logo"
          />
        )}
      </div>

      <div className="guess-buttons">
        {logoData.map((logo) => (
          <button 
            key={logo.name}
            onClick={() => handleGuess(logo.name)}
            disabled={gameOver}
          >
            {logo.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LogoGuessingGame;