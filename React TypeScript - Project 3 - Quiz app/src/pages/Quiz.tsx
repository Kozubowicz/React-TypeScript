import { useState, useEffect } from "react";
import { useQuizContext } from "../context/quizContext";
import { QuizStart } from "../components/QuizStart";

import { Question } from "../components/Question";
import { QuizSummary } from "../components/QuizSummary";
import { QuizReview } from "../components/QuizReview";

type QuizProps = {
  mode: string;
  setMode: (id: string) => void;
};
type Quiz = {
  _id: string;
  name: string;
  quiz: { question: string; answers: string[]; correctAns: number }[];
};

export function Quiz({ mode, setMode }: QuizProps) {
  const { getQuiz } = useQuizContext();

  const [Quiz, setQuiz] = useState<Quiz>();
  const [length, setLength] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(-1);

  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());

  const [repeat, setRepeat] = useState<number>(0);
  const [reviewMode, setReviewMode] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const quizData = await getQuiz(mode);

        if (quizData && quizData.name) {
          setQuiz(quizData);
          setLength(quizData.quiz.length);
          setCorrectAnswers(quizData.quiz.map((e: any) => e.correctAns));
        }
      } catch (error) {
        console.error("Error in featch function", error);
      }
    };
    getData();
    setUserAnswers(new Map());
  }, [repeat]);

  const addAnswer = (index: number, ans: number) => {
    const newMap = new Map(userAnswers);
    newMap.set(index, ans);
    setUserAnswers(newMap);
  };

  return (
    <>
      {Quiz ? (
        <div className="QuizContainer">
          {questionIndex === -1 && (
            <QuizStart name={Quiz.name} length={length} setQuestionIndex={setQuestionIndex} />
          )}

          {questionIndex >= 0 && questionIndex < length && reviewMode === 0 && (
            <Question
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              addAnswer={addAnswer}
              Quiz={Quiz}
              userAnswers={userAnswers}
            />
          )}
          {questionIndex >= 0 && questionIndex < length && reviewMode === 1 && (
            <QuizReview
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              userAnswers={userAnswers}
              correctAnswers={correctAnswers}
              Quiz={Quiz}
            />
          )}
          {questionIndex === length && (
            <QuizSummary
              setMode={setMode}
              setQuestionIndex={setQuestionIndex}
              length={length}
              userAnswers={userAnswers}
              correctAnswers={correctAnswers}
              setReviewMode={setReviewMode}
              setRepeat={setRepeat}
              repeat={repeat}
            />
          )}
        </div>
      ) : (
        <>
          <div className="homeContainer">Downloading Quiz</div>
        </>
      )}
    </>
  );
}
