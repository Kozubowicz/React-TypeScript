import { ChangePassword } from "./ChangePassword";
import { useExpanseContext } from "../Context/Context";
import { Home } from "./Home";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

export function Page() {
  const { CurrentPage, setOpenMenu } = useExpanseContext();
  return (
    <div onClick={() => setOpenMenu(false)}>
      {CurrentPage === "home" && <Home />}
      {CurrentPage === "signup" && <SignUp />}
      {CurrentPage === "login" && <LogIn />}
      {CurrentPage === "change" && <ChangePassword />}
    </div>
  );
}
