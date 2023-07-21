import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { useQuizContext } from "./context/quizContext";
import { ListOfQuizzes } from "./pages/ListOfQuizzes";
import { Quiz } from "./pages/Quiz";
import { LogInSignUp } from "./pages/LogInSignUp";
import { HomePage } from "./pages/HomePage";

function App() {
  const [mode, setMode] = useState<string>("0");
  const { userId } = useQuizContext();

  return (
    <>
      <NavBar mode={mode} setMode={setMode} />
      {mode === "0" && userId != "non" && <ListOfQuizzes setMode={setMode} />}
      {mode != "0" && userId != "non" && <Quiz mode={mode} setMode={setMode} />}
      {(mode === "LogIn" || mode === "SignUp") && userId === "non" && (
        <LogInSignUp mode={mode} setMode={setMode} />
      )}
      {userId === "non" && mode === "0" && <HomePage />}
    </>
  );
}

export default App;
