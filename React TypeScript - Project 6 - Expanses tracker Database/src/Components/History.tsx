import { useRef } from "react";
import { useExpanseContext } from "../Context/Context";

export function History() {
  const { AddExpanse, RemoveExpanse, period } = useExpanseContext();
  const ExpanseName = useRef<HTMLInputElement>(null);
  const ExpanseValue = useRef<HTMLInputElement>(null);

  const HandleAddExpanse = () => {
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
          <div className="InputsContainer">
            <input placeholder="Name" ref={ExpanseName} />
            <input placeholder="Value" ref={ExpanseValue} />
          </div>
          <div className="ButtonContainer">
            <button onClick={HandleAddExpanse}>Add</button>
          </div>
        </div>
        <div className="TableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>PLN</th>
                <th>Date</th>
                <th>---</th>
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
