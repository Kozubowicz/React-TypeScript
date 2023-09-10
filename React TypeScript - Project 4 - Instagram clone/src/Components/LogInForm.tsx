import { useEffect, useRef } from "react";
import { useInstaContext } from "../Context/InstaContext";
export function LogInForm() {
  const { DarkMode, LogIn, sucess, setSucess } = useInstaContext();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const preapareData = () => {
    if (email.current && password.current) {
      LogIn(email.current.value, password.current.value);
    }
  };

  useEffect(() => {
    setSucess(undefined);
  }, []);
  return (
    <>
      <div className="LogInContainer">
        <div className="LabelInputContainer">
          E-mail:
          <input type="email" ref={email} className={`inputBar ${DarkMode ? "dark" : ""}`} />
        </div>
        <div className="LabelInputContainer">
          Password:
          <input type="password" ref={password} className={`inputBar ${DarkMode ? "dark" : ""}`} />
        </div>
        {sucess === false && <label style={{ color: "red", fontWeight: "bold" }}>Error</label>}
        <div className="LogSignButtonContainer">
          <button onClick={() => preapareData()}>Log In</button>
        </div>
      </div>
    </>
  );
}
