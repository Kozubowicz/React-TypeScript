enum status {
  WIN = "win",
  LOSE = "lose",
  PLAYING = "playing",
}

type WordProps = {
  wordToGuess: string[];
  guessedLetters: string[];
  gameStatus: status;
};

export function Word({ wordToGuess, guessedLetters, gameStatus }: WordProps) {
  return (
    <div className="Word--container">
      {wordToGuess.map((el) => (
        <div key={"W" + el} className="Word--box">
          <div className="Word--box-floor" />
          <div
            className={`Word--box-letter ${
              gameStatus === status.LOSE || guessedLetters.includes(el)
                ? ""
                : "Word--box-letter-hidden"
            } ${!guessedLetters.includes(el) ? "Word--box-letter-not" : ""}`}
          >
            {el}
          </div>
        </div>
      ))}
    </div>
  );
}
