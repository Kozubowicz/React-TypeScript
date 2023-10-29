import { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useExpanseContext } from "../Context/Context";

export function LogIn() {
  const mail = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const { LogIn, sucess, setSucess } = useExpanseContext();

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
      navigate("/");
      setSucess(undefined);
    }
  }, [sucess]);

  return (
    <>
      <div className="PrimalContainer">
        <div className="SecondaryContainer">
          <input type="text" placeholder="e-mail" ref={mail} />
          <input type="password" placeholder="password" ref={password} />

          <button onClick={handleLogIn}>Log In</button>

          {errorEmail && <div className="Error">Incorrect e-mail format</div>}
          {errorPassword && <div className="Error">To short password</div>}
          {sucess === false && <div className="Error">Server error</div>}
        </div>
      </div>
    </>
  );
}
