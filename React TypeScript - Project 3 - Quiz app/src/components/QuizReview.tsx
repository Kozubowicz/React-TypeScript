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
  userAnswers: number[];
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
                  ${userAnswers[questionIndex] === i ? "ReviewAnswerUser" : "non"}
              }`}
              key={`${i}div`}
            >
              <input type="radio" value={i} key={i} checked={userAnswers[questionIndex] === i} />

              {e}
            </div>
          ))}
        </div>

        <div className="QuizButtonContainer">
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
