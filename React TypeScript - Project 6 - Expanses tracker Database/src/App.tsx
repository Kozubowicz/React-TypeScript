import { NavBar } from "./Components/NavBar";
import { ExpanseContextProvider } from "./Context/Context";
import { Page } from "./Pages/Page";

function App() {
  return (
    <>
      <ExpanseContextProvider>
        <NavBar />
        <Page />
      </ExpanseContextProvider>
    </>
  );
}
export default App;
