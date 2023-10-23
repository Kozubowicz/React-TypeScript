import { NavBar } from "./Components/NavBar";
import { ExpansesTrackerContextProvide } from "./Context/Context";
import { MainPage } from "./Pages/MainPage";
import "./style.css";

function App() {
  return (
    <ExpansesTrackerContextProvide>
      <NavBar />
      <MainPage />
    </ExpansesTrackerContextProvide>
  );
}

export default App;
