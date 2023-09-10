import { useEffect, useState } from "react";
import { LogInForm } from "../Components/LogInForm";
import { SignUpForm } from "../Components/SignUpForm";
import { useInstaContext } from "../Context/InstaContext";

type LogInSignUpProps = {
  setLogSign: (e: boolean) => void;
};
export function LogInSignUp({ setLogSign }: LogInSignUpProps) {
  const [LogOrSign, setLogOrSign] = useState<boolean>(true);

  const { tokenId } = useInstaContext();

  useEffect(() => {
    if (tokenId.length > 1) setLogSign(false);
  }, [tokenId]);

  return (
    <div style={{ margin: "auto", maxWidth: "90vw" }}>
      <div className="LogInContainer">
        <button onClick={() => setLogOrSign(!LogOrSign)}>
          {LogOrSign ? <>Sign Up</> : <>Log In</>}
        </button>

        {LogOrSign ? <LogInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
