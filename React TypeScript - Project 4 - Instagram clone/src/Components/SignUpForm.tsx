import { useEffect, useRef } from "react";
import { useInstaContext } from "../Context/InstaContext";

export function SignUpForm() {
  const { DarkMode, SignUp, sucess, setSucess } = useInstaContext();
  const userName = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const preapareData = () => {
    //UserName validation
    if (!userName.current?.value || userName.current.value.length <= 1) {
      setSucess(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.current?.value || !emailRegex.test(email.current.value)) {
      setSucess(false);
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{2,}$/;
    if (!password.current?.value || !passwordRegex.test(password.current.value)) {
      setSucess(false);
      return;
    }

    SignUp(userName.current.value, email.current.value, password.current.value);
  };

  useEffect(() => {
    setSucess(undefined);
  }, []);

  useEffect(() => {
    if (sucess === true) {
      if (userName.current) userName.current.value = "";
      if (email.current) email.current.value = "";
      if (password.current) password.current.value = "";
    }
  }, [sucess]);

  return (
    <>
      <div className="LogInContainer">
        <div className="LabelInputContainer">
          User name:{" "}
          <input type="text" ref={userName} className={`inputBar ${DarkMode ? "dark" : ""}`} />
        </div>
        <div className="LabelInputContainer">
          E-mail:{" "}
          <input type="email" ref={email} className={`inputBar ${DarkMode ? "dark" : ""}`} />
        </div>
        <div className="LabelInputContainer">
          Password:{" "}
          <input type="password" ref={password} className={`inputBar ${DarkMode ? "dark" : ""}`} />
        </div>

        {sucess === false && <label style={{ color: "red", fontWeight: "bold" }}>Error</label>}
        {sucess === true && <label style={{ color: "green", fontWeight: "bold" }}>Sucess</label>}

        <div className="LogSignButtonContainer">
          <button onClick={() => preapareData()}>Sign In</button>
        </div>
      </div>
    </>
  );
}
