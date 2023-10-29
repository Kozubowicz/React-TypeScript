import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { SignUp } from "./Pages/SignUp";
import { LogIn } from "./Pages/LogIn";
import { NavBar } from "./Components/NavBar";
import { ExpanseContextProvider } from "./Context/Context";

function App() {
  return (
    <>
      <ExpanseContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </ExpanseContextProvider>
    </>
  );
}

export default App;
