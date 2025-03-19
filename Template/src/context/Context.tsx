import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type AppContextProps = {
  children: ReactNode;
};

type AppContext = {
  counterVal: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
};

const AppContext = createContext({} as AppContext);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: AppContextProps) {
  const [counterVal, setCounterVal] = useLocalStorage('counterLocal', 1);

  const increaseCounter = () => {
    setCounterVal((prev) => prev + 1);
  };

  const decreaseCounter = () => {
    setCounterVal((prev) => prev - 1);
  };

  return (
    <AppContext.Provider
      value={{ counterVal, increaseCounter, decreaseCounter }}
    >
      {children}
    </AppContext.Provider>
  );
}
