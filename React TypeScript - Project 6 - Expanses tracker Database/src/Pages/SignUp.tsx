import { useRef, useState } from "react";
import { useExpanseContext } from "../Context/Context";

export function SignUp() {
  const mail = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const password2 = useRef<HTMLInputElement | null>(null);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const { SignUp, sucess } = useExpanseContext();

  const handleLogIn = () => {
    if (checkEmail(mail.current?.value) && mail.current) {
      if (
        password.current?.value &&
        password.current?.value === password2.current?.value &&
        password.current?.value.length >= 4
      ) {
        setErrorPassword(false);
        SignUp(mail.current.value, password.current.value);
        //Przesłanie danych na serwer
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

  return (
    <>
      <div className="PrimalContainer">
        <div className="SecondaryContainer">
          <input type="text" placeholder="e-mail" ref={mail} />
          <input type="password" placeholder="password" ref={password} />
          <input type="password" placeholder="repeat password" ref={password2} />

          <button onClick={handleLogIn}>Sign Up</button>

          {errorEmail && <div className="Error">Incorrect e-mail format</div>}
          {errorPassword && <div className="Error">Incorrect password</div>}
          {sucess && <div className="Success">Successful registration</div>}
        </div>
      </div>
    </>
  );
}
