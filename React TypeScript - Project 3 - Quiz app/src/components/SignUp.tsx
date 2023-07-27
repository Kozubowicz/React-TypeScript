import { useRef, useState } from "react";
import { useQuizContext } from "../context/quizContext";
export function SignUp() {
  const UserName = useRef<HTMLInputElement | null>(null);
  const Password = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<string>("");

  const { SignUp } = useQuizContext();
  const hanleSend = async () => {
    if (UserName.current?.value && Password.current?.value) {
      try {
        console.log(UserName.current.value, Password.current.value);
        const response = await SignUp(UserName.current.value, Password.current.value);
        console.log(response);
        setMessage(response.message);
      } catch (error) {
        setMessage("Error");
        console.error("Error");
      }
    }
  };

  return (
    <>
      <div className="QuizContainer">
        <div className="QuestionContainer">
          <label className="QuizStartTitle">Sign Up</label>
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
            <button className="StartButton" onClick={() => hanleSend()}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
