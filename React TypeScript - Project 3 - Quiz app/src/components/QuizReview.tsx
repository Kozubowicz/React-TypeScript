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
  userAnswers: Map<number, number>;
  correctAnswers: number[];
  Quiz: Quiz;
};

export function QuizReview({
  questionIndex,
  setQuestionIndex,
  userAnswers,
  correctAnswers,
  Quiz,
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
            <div
              className={`AnswerContainer ${
                correctAnswers[questionIndex] === i ? "ReviewAnswerCorrect" : "non"
              }
                  ${userAnswers.get(questionIndex) === i ? "ReviewAnswerUser" : "non"}
              }`}
              key={`${i}div`}
            >
              <input
                type="radio"
                onChange={() => console.log(i)}
                value={i}
                key={i}
                checked={userAnswers.get(questionIndex) === i}
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
