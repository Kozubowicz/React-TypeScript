import { useExpanseContext } from "../Context/Context";
import { Home } from "./Home";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

export function Page() {
  const { CurrentPage } = useExpanseContext();
  return (
    <>
      {CurrentPage === "home" && <Home />}
      {CurrentPage === "signup" && <SignUp />}
      {CurrentPage === "login" && <LogIn />}
    </>
  );
}
