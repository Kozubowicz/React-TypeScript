import { useState } from "react";

export type KeyboardProps = {
  wordToGuess: string[];
  guessedLetters: string[];
  handleAddToGuessedLetters: (key: string) => void;
};

export function Keyboard({
  wordToGuess,
  guessedLetters,
  handleAddToGuessedLetters,
}: KeyboardProps) {
  const [ALPHABET] = useState<string[]>(() => {
    const alf = [];

    for (let i = 65; i <= 90; i++) {
      alf.push(String.fromCharCode(i));
    }

    return alf;
  });

  const handleDisableButton = (key: string) => {
    return guessedLetters.includes(key);
  };

  const handleGuessedRight = (key: string) => {
    return wordToGuess.includes(key) && guessedLetters.includes(key);
  };

  return (
    <div className="Keyboard--container">
      {ALPHABET.map((el) => (
        <button
          key={"K" + el}
          disabled={handleDisableButton(el)}
          onClick={() => handleAddToGuessedLetters(el)}
          className={`Keyboard--key ${
            handleDisableButton(el)
              ? handleGuessedRight(el)
                ? "Keyboard--key-right"
                : "Keyboard--key-wrong"
              : "Keyboard--key-default"
          }`}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
