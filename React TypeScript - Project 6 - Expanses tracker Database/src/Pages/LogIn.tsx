import { useRef, useState, useEffect } from "react";

import { useExpanseContext } from "../Context/Context";

export function LogIn() {
  const mail = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const { LogIn, sucess, setSucess, setCurrentPage } = useExpanseContext();

  const handleLogIn = () => {
    if (checkEmail(mail.current?.value) && mail.current) {
      if (password.current?.value && password.current.value.length >= 4) {
        setErrorPassword(false);
        LogIn(mail.current.value, password.current.value);
      } else {
        setErrorPassword(true);
      }
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
  };

  const checkEmail = (email: string | undefined): boolean => {
    if (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (sucess) {
      setCurrentPage("home");
      setSucess(undefined);
    }
  }, [sucess]);

  return (
    <>
      <div className="PrimalContainer">
        <h3>
          If you don't have an account yet, please click the "Sign Up" button on the navbar to
          register
        </h3>
        <div className="SecondaryContainer">
          <h2>Log In</h2>
          <input type="email" placeholder="e-mail" ref={mail} />
          <input type="password" placeholder="password" ref={password} />
          <div className="ButtonContainer">
            <button onClick={handleLogIn}>Log In</button>
          </div>
          {errorEmail && <div className="Error">Incorrect e-mail format</div>}
          {errorPassword && <div className="Error">To short password</div>}
          {sucess === false && <div className="Error">Server error</div>}
        </div>
      </div>
    </>
  );
}
