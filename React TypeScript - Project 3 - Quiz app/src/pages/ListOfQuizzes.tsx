import { useQuizContext } from "../context/quizContext";
import { useState, useEffect } from "react";
type ListOfQuizzesProps = {
  setMode: (_id: string) => void;
};
type lo = {
  _id: string;
  name: string;
  length: number;
};
export function ListOfQuizzes({ setMode }: ListOfQuizzesProps) {
  const { getQuizzesList } = useQuizContext();

  const [list, setList] = useState<lo[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const quizzesList = await getQuizzesList();
        setList(quizzesList);
      } catch (error) {
        console.error("Error in featch function");
      }
    };
    getData();
  }, []);

  return (
    <>
      {list.length > 0 ? (
        <div className="QuizzesList">
          {list.map((e, index) => (
            <div
              className="QuizListContainer"
              key={index}
              onClick={() => {
                setMode(e._id);
              }}
            >
              <label className="QuizListTitle">{e.name}</label>
              <hr />
              <label className="QuizListNum">Questions: {e.length}</label>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
