import { useRef, useState } from "react";
import { useExpanseContext } from "../Context/Context";

export function ChangePassword() {
  const oldPassword = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const password2 = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);

  const { ChangePassword, sucess, setSucess, setCurrentPage } = useExpanseContext();

  const handleChanePassword = () => {
    if (oldPassword.current?.value && oldPassword.current) {
      if (
        password.current?.value &&
        password.current?.value === password2.current?.value &&
        password.current?.value.length >= 4
      ) {
        setError(false);
        console.log(oldPassword.current.value, password.current.value);

        ChangePassword(oldPassword.current.value, password.current.value);
      } else {
        setError(true);
      }

      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="PrimalContainer">
        <div className="SecondaryContainer">
          <h2>Change Password</h2>
          <input type="password" placeholder="Old Password" ref={oldPassword} />
          <input type="password" placeholder="New Password" ref={password} />
          <input type="password" placeholder="Repeat New password" ref={password2} />
          <div className="ButtonContainer">
            <button
              onClick={() => {
                setSucess(undefined), setCurrentPage("home");
              }}
            >
              Home
            </button>
            <button onClick={handleChanePassword}>Change password</button>
          </div>
          {error && <div className="Error">Error</div>}
          {sucess && <div className="Success">Successful change of password</div>}
        </div>
      </div>
    </>
  );
}
