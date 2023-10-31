import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ExpanseContextProvider = {
  children: ReactNode;
};

type PeriodsList = {
  _id: string;
  Name: string;
};

type Period = {
  _id: string;
  UserId: string;
  Name: string;
  Budget: number;
  Expanses: Expanse[];
};

type Expanse = {
  Id: number;
  Name: string;
  Value: number;
};

type ExpanseContext = {
  tokenId: string;
  setSucess: (action: boolean | undefined) => void;
  sucess: boolean | undefined;
  setTokenId: (name: string) => void;
  LogIn: (mail: string, password: string) => Promise<void>;
  SignUp: (mail: string, password: string) => Promise<void>;
  AddPeriod: (periodName: string, periodBudget: number) => Promise<void>;
  RemovePeriod: () => Promise<void>;
  periodsList: PeriodsList[];
  selectedPeriod: string;
  SelectPeriod: (periodId: string) => Promise<void>;
  AddExpanse: (Name: string, Value: number) => Promise<void>;
  RemoveExpanse: (Id: number) => Promise<void>;
  period: Period | undefined;
  CurrentPage: string;
  setCurrentPage: (name: string) => void;
  ChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  openMenu: boolean;
  setOpenMenu: (e: boolean) => void;
};

const ExpanseContext = createContext({} as ExpanseContext);

export function useExpanseContext() {
  return useContext(ExpanseContext);
}

export function ExpanseContextProvider({ children }: ExpanseContextProvider) {
  const [tokenId, setTokenId] = useLocalStorage<string>("tokenId", "");
  const [sucess, setSucess] = useState<boolean | undefined>();
  const [action, setAction] = useState<boolean>(false);
  const [refreshExpenses, setRefreshExpenses] = useState<boolean>(false);
  const [periodsList, setPeriodsList] = useState<PeriodsList[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [period, setPeriod] = useState<Period | undefined>();
  const [CurrentPage, setCurrentPage] = useState<string>("home");
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  async function LogIn(mail: string, password: string): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/LogIn?mail=${mail}&password=${password}`
      );
      if (!response.ok) {
        setSucess(false);
        throw new Error();
      }
      const jsonData = await response.json();
      setSucess(true);
      setTokenId(jsonData);
    } catch (error) {
      console.error("Error Logn In");
      throw error;
    }
  }

  async function SignUp(mail: string, password: string): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/SignUp?mail=${mail}&password=${password}`
      );
      if (!response.ok) {
        setSucess(false);
        throw new Error();
      }
      setSucess(true);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function ChangePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/ChangePassword?userid=${tokenId}&oldpassword=${oldPassword}&newpassword=${newPassword}`
      );
      if (!response.ok) {
        setSucess(false);
        throw new Error();
      }
      setSucess(true);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function AddPeriod(periodName: string, periodBudget: number): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/AddPeriod?userid=${tokenId}&periodname=${periodName}&periodbudget=${periodBudget}`
      );
      if (!response.ok) {
        throw new Error();
      }
      setAction(!action);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function RemovePeriod(): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/RemovePeriod?periodid=${selectedPeriod}`
      );
      if (!response.ok) {
        console.error("Error");
        throw new Error();
      }
      setPeriod(undefined);
      setAction(!action);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }
  async function GetPeriodsList(): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/GetPeriodsList?userid=${tokenId}`
      );
      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();
      setPeriodsList(jsonData.periods);
      setSelectedPeriod(jsonData.SelectedPeriod);
    } catch (error) {
      console.error("error");
      throw error;
    }
  }

  async function SelectPeriod(periodId: string): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/SelectPeriod?userid=${tokenId}&periodid=${periodId}`
      );
      if (!response.ok) {
        throw new Error();
      }
      setAction(!action);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function GetPeriod(): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/GetPeriod?periodid=${selectedPeriod}`
      );
      if (!response.ok) {
        console.error("Error");
        throw new Error();
      }
      const jsonData = await response.json();
      setPeriod(jsonData.Period);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function AddExpanse(Name: string, Value: number): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/AddExpanse?periodid=${selectedPeriod}&id=${Date.now()}&name=${Name}&value=${Value}`
      );
      if (!response.ok) {
        throw new Error();
      }
      setRefreshExpenses(!refreshExpenses);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function RemoveExpanse(Id: number): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/expansetracker-api-nqhen/endpoint/RemoveExpanse?periodid=${selectedPeriod}&id=${Id}`
      );
      if (!response.ok) {
        throw new Error();
      }
      setRefreshExpenses(!refreshExpenses);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  useEffect(() => {
    if (tokenId) {
      GetPeriodsList();
    }
  }, [tokenId, action]);

  useEffect(() => {
    if (selectedPeriod) {
      GetPeriod();
    }
  }, [refreshExpenses, selectedPeriod]);

  return (
    <>
      <ExpanseContext.Provider
        value={{
          tokenId,
          setTokenId,
          LogIn,
          SignUp,
          AddPeriod,
          RemovePeriod,
          periodsList,
          selectedPeriod,
          SelectPeriod,
          setSucess,
          sucess,
          AddExpanse,
          RemoveExpanse,
          period,
          CurrentPage,
          setCurrentPage,
          ChangePassword,
          openMenu,
          setOpenMenu,
        }}
      >
        {children}
      </ExpanseContext.Provider>
    </>
  );
}
