type QuizStartProps = {
  name: string;
  length: number | undefined;
  setQuestionIndex: (e: number) => void;
};
export function QuizStart({ name, length, setQuestionIndex }: QuizStartProps) {
  return (
    <>
      <div className="QuestionContainer">
        <label className="QuizStartTitle">{name}</label>
        <div className="QuizStartNumber">
          Number of Questions in Quiz: <label className="Num">{length}</label>
        </div>
        <div className="QuizButtonContainer">
          <button className="StartButton" onClick={() => setQuestionIndex(0)}>
            Start Quiz
          </button>
        </div>
      </div>
    </>
  );
}
