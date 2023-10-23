import { useEffect } from "react";
import { useExpansesContext } from "../Context/Context";

export function Period() {
  const { getPeriods, selectedPeriod, setSelectedPeriod, addPeriod, removePeriod } =
    useExpansesContext();
  const Periods = getPeriods();

  useEffect(() => {
    console.log(selectedPeriod);
  }, [selectedPeriod]);

  const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(parseFloat(e.target.value));
  };

  const handleNewPeriod = () => {
    const newPeriodName = window.prompt("Please enter new Period Name");

    if (newPeriodName) {
      const newPeriodBudget = window.prompt("Please enter Period Budget");
      if (newPeriodBudget) {
        addPeriod(newPeriodName, parseFloat(newPeriodBudget));
        window.alert("Successful creation of new period");
      }
    }
  };

  const handleRemovePeriod = () => {
    const isOk = window.confirm("Are you sure");
    if (isOk) {
      removePeriod();
    }
  };

  return (
    <>
      <div className="Period">
        <select value={selectedPeriod} onChange={handleChangePeriod}>
          {Periods?.length && Periods ? (
            Periods.map((e) => (
              <option value={e._id} key={e._id}>
                {e.name}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
        <div className="PeriodButtonsContainer">
          <button onClick={handleNewPeriod}>New period</button>
          <button onClick={handleRemovePeriod}>Remove</button>
        </div>
      </div>
    </>
  );
}
