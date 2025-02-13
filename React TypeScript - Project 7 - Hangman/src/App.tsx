import { useState } from "react";
import word from "./wordList.json";
import { Hangman } from "./components/Hangman";
import { Word } from "./components/Word";
import { Keyboard } from "./components/Keyboard";
import "./styles.scss";

enum status {
  WIN = "win",
  LOSE = "lose",
  PLAYING = "playing",
}

function App() {
  const [wordToGuess] = useState<string[]>(() => {
    return word[Math.floor(Math.random() * word.length)]
      .toUpperCase()
      .split("");
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<status>(status.PLAYING);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);

  const addToGuessedLetters = (key: string) => {
    if (gameStatus === status.PLAYING) {
      setGuessedLetters((prev) => {
        prev = [...prev, key];

        handleCheckIfYouWin(prev);

        return prev;
      });

      if (!wordToGuess.includes(key)) {
        setWrongGuesses((prev) => {
          prev += 1;

          if (prev === 6) {
            setGameStatus(() => status.LOSE);
          }

          return prev;
        });
      }
    }
  };

  const handleCheckIfYouWin = (letters: string[]) => {
    let tmp = true;

    wordToGuess.forEach((el) => {
      if (!letters.includes(el)) {
        tmp = false;
      }
    });

    if (tmp === true) {
      setGameStatus(status.WIN);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "2.2rem",
          textAlign: "center",
          minHeight: "2.5rem",
          fontWeight: "bold",
        }}
      >
        {gameStatus === status.WIN && <>You Win - Refresh to try again</>}
        {gameStatus === status.LOSE && <>You Lose - Refresh to try again</>}
      </div>
      <Hangman wrongGuesses={wrongGuesses} />
      <Word
        wordToGuess={wordToGuess}
        guessedLetters={guessedLetters}
        gameStatus={gameStatus}
      />
      <Keyboard
        wordToGuess={wordToGuess}
        guessedLetters={guessedLetters}
        handleAddToGuessedLetters={addToGuessedLetters}
      />
    </div>
  );
}

export default App;
