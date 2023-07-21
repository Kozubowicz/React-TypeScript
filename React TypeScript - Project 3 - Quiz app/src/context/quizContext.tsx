import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type QuizzesContextProviderProps = {
  children: ReactNode;
};

type QuizzesList = {
  _id: string;
  name: string;
  length: number;
};
type Quiz = {
  _id: string;
  name: string;
  quiz: quiz[];
};
type quiz = {
  answers: string[];
  correctAns: number;
  question: string;
};
type userData = {
  message: string;
  userId: string;
};

type QuizzesContext = {
  getQuizzesList: () => Promise<QuizzesList[]>;
  getQuiz: (_id: string) => Promise<Quiz>;
  LogIn: (UserName: string, Password: string) => Promise<userData>;
  SignUp: (UserName: string, Password: string) => Promise<userData>;
  setUserId: (name: string) => void;
  userId: string;
};
const QuizzesContext = createContext({} as QuizzesContext);

export function useQuizContext() {
  return useContext(QuizzesContext);
}

export function QuizzesContextProvider({ children }: QuizzesContextProviderProps) {
  const [userId, setUserId] = useLocalStorage<string>("userId", "non");

  async function SignUp(UserName: string, Password: string): Promise<userData> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/quizzesapi-gbwpe/endpoint/SignUp?username=${UserName}&password=${Password}`
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const jsonData = await response.json();
      if (!jsonData.userId) {
        throw new Error("Error: Invalid response data");
      }
      return jsonData;
    } catch (error) {
      console.error("Error during log in request");

      throw error;
    }
  }
  async function LogIn(UserName: string, Password: string): Promise<userData> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/quizzesapi-gbwpe/endpoint/LogIn?username=${UserName}&password=${Password}`
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const jsonData = await response.json();
      if (!jsonData.userId) {
        throw new Error("Error: Invalid response data");
      }

      setUserId(jsonData.userId);
      return jsonData;
    } catch (error) {
      console.error("Error during log in request");
      throw error;
    }
  }

  async function getQuizzesList(): Promise<QuizzesList[]> {
    try {
      const response = await fetch(
        "https://us-east-1.aws.data.mongodb-api.com/app/quizzesapi-gbwpe/endpoint/getQuizzesList"
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const jsonData = await response.json();
      return jsonData as QuizzesList[];
    } catch (error) {
      console.error("Error during downloading", error);
      throw error;
    }
  }

  async function getQuiz(_id: string): Promise<Quiz> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/quizzesapi-gbwpe/endpoint/getQuiz?_id=${_id}`
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const jsonData = await response.json();
      const { quiz } = jsonData;
      shuffleAnswers(quiz);
      return jsonData as Quiz;
    } catch (error) {
      console.error("Error during downloading quiz");
      throw error;
    }
  }

  function shuffleAnswers(questionObjects: quiz[]): void {
    for (const questionObject of questionObjects) {
      const { answers, correctAns } = questionObject;
      const shuffledAnswers = shuffleArray(answers);
      const newCorrectAns = shuffledAnswers.indexOf(answers[correctAns]);

      questionObject.answers = shuffledAnswers;
      questionObject.correctAns = newCorrectAns;
    }
  }

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  return (
    <>
      <QuizzesContext.Provider
        value={{ SignUp, LogIn, getQuizzesList, getQuiz, userId, setUserId }}
      >
        {children}
      </QuizzesContext.Provider>
    </>
  );
}
