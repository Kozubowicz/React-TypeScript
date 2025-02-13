const man = [
  "Hangman--head",
  "Hangman--body",
  "Hangman--arm-1",
  "Hangman--arm-2",
  "Hangman--leg-1",
  "Hangman--leg-2",
];

export type HangmanProps = {
  wrongGuesses: number;
};

export function Hangman({ wrongGuesses }: HangmanProps) {
  const drawHangMan = () => {
    const draw: JSX.Element[] = [];

    for (let i = 0; i < wrongGuesses; i++) {
      draw.push(<div className={man[i]} key={i} />);
    }

    return draw;
  };

  return (
    <div className="Hangman--container">
      <div className="Hangman--gallows-e1" />
      <div className="Hangman--gallows-e2" />
      <div className="Hangman--gallows-e3" />
      <div className="Hangman--gallows-e4" />
      {drawHangMan()}
    </div>
  );
}
