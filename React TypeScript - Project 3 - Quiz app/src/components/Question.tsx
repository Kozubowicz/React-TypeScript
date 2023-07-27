type Quiz = {
  _id: string;
  name: string;
  quiz: {
    question: string;
    answers: string[];
    correctAns: number;
  }[];
};

type QuizStartProps = {
  questionIndex: number;
  setQuestionIndex: (e: number) => void;
  addAnswer: (index: number, ans: number) => void;
  Quiz: Quiz;
  userAnswers: Map<number, number>;
};

export function Question({
  questionIndex,
  setQuestionIndex,
  addAnswer,
  Quiz,
  userAnswers,
}: QuizStartProps) {
  return (
    <>
      <div className="QuestionContainer">
        <div className="QuestionOnOff">
          <label className="Num">
            {questionIndex + 1}/{Quiz.quiz.length}
          </label>
        </div>
        <h3>{Quiz.quiz[questionIndex].question}</h3>
        <div className="AnswersContainer">
          {Quiz.quiz[questionIndex].answers.map((e, i) => (
            <div className="AnswerContainer" key={`${i}div`}>
              <input
                type="radio"
                value={i}
                key={i}
                className="radio"
                checked={userAnswers.get(questionIndex) === i}
                onChange={() => {
                  addAnswer(questionIndex, i);
                }}
              />
              {e}
            </div>
          ))}
        </div>

        <div className="QuizButtonContainer">
          {questionIndex > 0 && (
            <button
              className="StartButton"
              onClick={() => {
                setQuestionIndex(questionIndex - 1);
              }}
            >
              Previous Question
            </button>
          )}
          <button
            className="StartButton"
            onClick={() => {
              setQuestionIndex(questionIndex + 1);
            }}
          >
            {questionIndex + 1 !== Quiz.quiz.length ? "Next Question" : "Summary"}
          </button>
        </div>
      </div>
    </>
  );
}
