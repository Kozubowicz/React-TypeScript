import { useQuizContext } from "../context/quizContext";

type NavBarProps = {
  mode: string;
  setMode: (mode: string) => void;
};
export function NavBar({ mode, setMode }: NavBarProps) {
  const { userId, setUserId } = useQuizContext();
  return (
    <>
      <div className="NavBar">
        <label className="AppName">Quizzes App</label>
        <div className="NavBarButtonContainer">
          {/*<button className="NavBarButton">Create Quiz</button> */}
          {userId != "non" && mode != "0" && (
            <button className="NavBarButton" onClick={() => setMode("0")}>
              Quit quiz
            </button>
          )}
          {userId === "non" && (
            <>
              <button className="NavBarButton" onClick={() => setMode("SignUp")}>
                Sign up
              </button>
              <button className="NavBarButton" onClick={() => setMode("LogIn")}>
                Log In
              </button>
            </>
          )}
          {userId != "non" && (
            <button
              className="NavBarButton"
              onClick={() => {
                setUserId("non");
                setMode("0");
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </>
  );
}
