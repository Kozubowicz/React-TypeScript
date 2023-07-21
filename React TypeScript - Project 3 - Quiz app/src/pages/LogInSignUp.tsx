import { LogIn } from "../components/LogIn";
import { SignUp } from "../components/SignUp";
import { useQuizContext } from "../context/quizContext";

type LogInSignUpProps = {
  mode: string;
  setMode: (mode: string) => void;
};

export function LogInSignUp({ mode, setMode }: LogInSignUpProps) {
  const { userId } = useQuizContext();
  return (
    <>
      {userId === "non" && mode === "SignUp" && <SignUp />}
      {userId === "non" && mode === "LogIn" && <LogIn setMode={setMode} />}
    </>
  );
}
