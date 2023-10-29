import { useRef, useState } from "react";
import { useExpansesContext } from "../Context/Context";
export function FirstPeriod() {
  const { addPeriod } = useExpansesContext();
  const [Error, setError] = useState<boolean>(false);
  const PeriodName = useRef<HTMLInputElement>(null);
  const PeriodBudget = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    console.log(PeriodName.current?.value);
    if (PeriodName.current?.value && PeriodBudget.current?.value) {
      addPeriod(PeriodName.current.value, parseFloat(PeriodBudget.current.value));
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="FirstPeriod">
        <div className="Title"> Create First Period</div>
        <div className="Period">
          <div className="PeriodProperties">
            <input
              className="PeriodPropertiesInput"
              type="text"
              ref={PeriodName}
              placeholder="Period Name"
            />
            <input
              className="PeriodPropertiesInput"
              type="number"
              ref={PeriodBudget}
              placeholder="Period budget"
            />
          </div>
          <button onClick={handleCreate}>Create</button>
        </div>
        {Error ? <div className="Error">Error</div> : <></>}
      </div>
    </>
  );
}
