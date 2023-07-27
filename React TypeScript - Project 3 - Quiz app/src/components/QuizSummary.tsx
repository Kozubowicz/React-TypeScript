import { useEffect, useState } from "react";

type QuizSummaryProps = {
  setMode: (_id: string) => void;
  setQuestionIndex: (e: number) => void;

  setReviewMode: (e: number) => void;
  setRepeat: (e: number) => void;

  length: number | undefined;
  userAnswers: Map<number, number>;
  correctAnswers: number[];
  repeat: number;
};

export function QuizSummary({
  setMode,
  setQuestionIndex,
  length,
  userAnswers,
  correctAnswers,
  setReviewMode,
  setRepeat,
  repeat,
}: QuizSummaryProps) {
  const [corr, setCorr] = useState(0);
  const [inCorr, setInCorr] = useState(0);

  useEffect(() => {
    setCorr(0);
    setInCorr(0);
    correctAnswers.forEach((e, i) => {
      if (e === userAnswers.get(i)) {
        setCorr((prev) => prev + 1);
      } else setInCorr((prev) => prev + 1);
    });
  }, [userAnswers]);

  return (
    <>
      <div className="QuestionContainer">
        <label className="QuizStartTitle">Quiz Summary</label>
        <div className="QuizSummaryStats">
          <p>
            Number of Questions : <label className="Num">{length}</label>
          </p>
          <p>
            Correct Answers: <label className="Num">{corr}</label>
          </p>
          <p>
            InCorrect Answers: <label className="Num">{inCorr}</label>
          </p>
        </div>
        <div className="QuizButtonContainer">
          <button
            className="StartButton"
            onClick={() => {
              setReviewMode(1);
              setQuestionIndex(0);
            }}
          >
            Review Answers
          </button>
          <button
            className="StartButton"
            onClick={() => {
              setQuestionIndex(-1);

              setRepeat(repeat + 1);
              setReviewMode(0);
            }}
          >
            Repeat Quiz
          </button>
          <button
            className="StartButton"
            onClick={() => {
              setMode("0");
              setRepeat(0);
            }}
          >
            New Quiz
          </button>
        </div>
      </div>
    </>
  );
}
