import { useState } from "react";
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
  addAnswer: (and: number) => void;
  Quiz: Quiz;
};

export function Question({ questionIndex, setQuestionIndex, addAnswer, Quiz }: QuizStartProps) {
  const [answer, setAnswer] = useState<number>(-1);

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
                checked={answer === i}
                onChange={() => {
                  setAnswer(i);
                }}
              />
              {e}
            </div>
          ))}
        </div>

        <div className="QuizButtonContainer">
          <button
            className="StartButton"
            onClick={() => {
              setQuestionIndex(questionIndex + 1);
              addAnswer(answer);
              setAnswer(-1);
            }}
          >
            {questionIndex + 1 !== Quiz.quiz.length ? "Next Question" : "Summary"}
          </button>
        </div>
      </div>
    </>
  );
}
