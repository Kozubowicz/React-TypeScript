import { useState, useRef } from "react";
import { useQuizContext } from "../context/quizContext";
type LogInProps = {
  setMode: (mode: string) => void;
};
export function LogIn({ setMode }: LogInProps) {
  const { LogIn } = useQuizContext();
  const UserName = useRef<HTMLInputElement | null>(null);
  const Password = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<string>("");
  const handleLogIn = async () => {
    if (UserName.current?.value && Password.current?.value) {
      try {
        const response = await LogIn(UserName.current.value, Password.current.value);
        setMode("0");
        setMessage(response.message);
        console.log(response);
      } catch (error) {
        console.error("Error");
        setMessage("Something went wrong Check Log In data");
      }
    }
  };
  return (
    <>
      <div className="QuizContainer">
        <div className="QuestionContainer">
          <label className="QuizStartTitle">Log In</label>
          <div className="querryInputsContainer">
            <div className="inputLabelcontainer">
              <label>User Name:</label>
              <input type="text" ref={UserName} className="inputField" />
            </div>
            <div className="inputLabelcontainer">
              <label>Password:</label>
              <input type="password" ref={Password} className="inputField" />
            </div>
          </div>
          <div className="QuizButtonContainer">
            {message}
            <button className="StartButton" onClick={() => handleLogIn()}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
