import { useRef } from "react";
import { useExpanseContext } from "../Context/Context";

export function History() {
  const { AddExpanse, RemoveExpanse, period } = useExpanseContext();
  const ExpanseName = useRef<HTMLInputElement>(null);
  const ExpanseValue = useRef<HTMLInputElement>(null);

  const HandleAddExpanse = (event: React.FormEvent) => {
    event.preventDefault();

    if (ExpanseName && ExpanseName.current && ExpanseName.current?.value.length > 0) {
      if (ExpanseValue && ExpanseValue.current && parseFloat(ExpanseValue.current.value) > 0) {
        AddExpanse(ExpanseName.current.value, parseFloat(ExpanseValue.current.value));
        ExpanseName.current.value = "";
        ExpanseValue.current.value = "";
      }
    }
  };

  return (
    <>
      <div className="HistoryContainer">
        <div className="NewExpanseContainer">
          <form onSubmit={HandleAddExpanse}  className="FormContainer">
            <input type="text"
              placeholder="Name" 
              ref={ExpanseName}
              className="ExpanseInput"
              required
            />

            <input type="text" 
              pattern="[0-9]*[.]?[0-9]*" 
              inputMode="decimal"
              placeholder="Value"
              ref={ExpanseValue} 
              className="ExpanseInput"
              required
            />
            <button>Add</button>
          </form>
        </div>
        <div className="TableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>PLN</th>
                <th>Date</th>
                <th>{' '}</th>
              </tr>
            </thead>
            {period && period.Expanses && (
              <tbody>
                {period.Expanses.map((e) => {
                  return (
                    <tr key={e.Id}>
                      <th>{e.Name}</th>
                      <th>{e.Value.toFixed(2)}</th>
                      <th>{new Date(e.Id).toLocaleDateString()}</th>
                      <th>
                        <button className="RemoveButton" onClick={() => RemoveExpanse(e.Id)}>
                          X
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
