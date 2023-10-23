import { useExpansesContext } from "../Context/Context";
import { useRef } from "react";
export function History() {
  const { selectedPeriod, ExpansesHistory, addExpanse, removeExpanse, SpendSummary } =
    useExpansesContext();
  const ExpanseName = useRef<HTMLInputElement | null>(null);
  const ExpanseValue = useRef<HTMLInputElement | null>(null);

  const handleNewExpanse = () => {
    if (ExpanseName.current?.value.length && ExpanseValue.current?.value.length) {
      addExpanse(ExpanseName.current.value, parseFloat(ExpanseValue.current.value));
      ExpanseName.current.value = "";

      ExpanseValue.current.value = "";
    }
  };
  console.log(ExpansesHistory);

  return (
    <>
      <div className="Period">
        <div className="Period">
          <input type="text" placeholder="Name" ref={ExpanseName} className="ExpansesInput" />
          <input type="number" placeholder="value" ref={ExpanseValue} className="ExpansesInput" />
        </div>
        <div>
          <button onClick={handleNewExpanse}> Add </button>
        </div>
      </div>
      <div className="Period">
        {ExpansesHistory.map((e) => {
          if (e._id === selectedPeriod) {
            return (
              <table className="TSummary">
                <tr>
                  <th className="TBudget">{e.budget.toFixed(2)}</th>
                  <th className="TSpent">{SpendSummary().toFixed(2)}</th>
                </tr>
              </table>
            );
          }
        })}
      </div>
      <div className="Period">
        <table className="ExpansesTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>PLN</th>
              <th>Date</th>
              <th>---</th>
            </tr>
          </thead>
          {ExpansesHistory.map((e) => {
            if (e._id === selectedPeriod) {
              return e.expanses.map((expanse) => (
                <tr key={expanse._id}>
                  <th>{expanse.name}</th>
                  <th>{expanse.value.toFixed(2)}</th>
                  <th>{new Date(expanse._id).toLocaleDateString()}</th>
                  <th>
                    <button className="removeButton" onClick={() => removeExpanse(expanse._id)}>
                      X
                    </button>
                  </th>
                </tr>
              ));
            }
          })}
        </table>
      </div>
    </>
  );
}
