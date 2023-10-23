import { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ExpansesTrackerContextProvide = {
  children: ReactNode;
};
type ExpansesHistory = {
  _id: number;
  periodName: string;
  budget: number;
  expanses: expanse[];
};
type expanse = {
  _id: number;
  name: string;
  value: number;
};
type getPeriods = {
  _id: number;
  name: string;
};

type ExpansesContext = {
  addPeriod: (name: string, budget: number) => void;
  removePeriod: () => void;
  getPeriods: () => getPeriods[] | undefined;
  selectedPeriod: number;
  setSelectedPeriod: (_id: number) => void;
  ExpansesHistory: ExpansesHistory[];
  addExpanse: (name: string, value: number) => void;
  removeExpanse: (_id: number) => void;
  SpendSummary: () => number;
};
const ExpansesContext = createContext({} as ExpansesContext);

export function useExpansesContext() {
  return useContext(ExpansesContext);
}

export function ExpansesTrackerContextProvide({ children }: ExpansesTrackerContextProvide) {
  const [ExpansesHistory, setExpansesHistory] = useLocalStorage<ExpansesHistory[]>("expanses", []);
  const [selectedPeriod, setSelectedPeriod] = useLocalStorage<number>("selectedPeriod", 0);

  function addPeriod(name: string, budget: number) {
    const newPeriod: ExpansesHistory = {
      _id: Date.now(),
      periodName: name,
      budget: budget,
      expanses: [],
    };
    setExpansesHistory((prevExpanses) => [...prevExpanses, newPeriod]);
    setSelectedPeriod(newPeriod._id);
  }
  function removePeriod() {
    const UpdateExpanses = ExpansesHistory.filter((e) => {
      if (selectedPeriod !== e._id) {
        return { ...e };
      }
    });
    console.log(ExpansesHistory.length);

    if (UpdateExpanses.length > 0) {
      setSelectedPeriod(UpdateExpanses[UpdateExpanses.length - 1]._id);
    } else {
      setSelectedPeriod(NaN);
    }

    setExpansesHistory(UpdateExpanses);
    console.log(ExpansesHistory);
  }

  function getPeriods(): getPeriods[] | undefined {
    const expanses = ExpansesHistory.map((e) => ({ _id: e._id, name: e.periodName }));
    return expanses;
  }

  function addExpanse(name: string, value: number) {
    const newExpanse: expanse = {
      _id: Date.now(),
      name: name,
      value: value,
    };

    const UpdateExpanses = ExpansesHistory.map((e) => {
      if (e._id === selectedPeriod) {
        return { ...e, expanses: [newExpanse, ...e.expanses] };
      }
      return e;
    });
    setExpansesHistory(UpdateExpanses);
  }

  function removeExpanse(_id: number) {
    const UpdateExpanses = ExpansesHistory.map((e) => {
      if (e._id === selectedPeriod) {
        const UpdateExpanses = e.expanses.filter((ex) => ex._id !== _id);
        return { ...e, expanses: UpdateExpanses };
      }
      return e;
    });
    setExpansesHistory(UpdateExpanses);
  }

  function SpendSummary(): number {
    const summary = ExpansesHistory.reduce((acc, e) => {
      if (e._id === selectedPeriod) {
        const periodExpensesTotal = e.expanses.reduce((sum, cur) => sum + cur.value, 0);
        return acc + periodExpensesTotal;
      }
      return acc;
    }, 0);

    return summary;
  }

  return (
    <>
      <ExpansesContext.Provider
        value={{
          addPeriod,
          removePeriod,
          getPeriods,
          selectedPeriod,
          setSelectedPeriod,
          ExpansesHistory,
          addExpanse,
          removeExpanse,
          SpendSummary,
        }}
      >
        {children}
      </ExpansesContext.Provider>
    </>
  );
}
