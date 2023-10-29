import { useExpanseContext } from "../Context/Context";

export function Period() {
  const { AddPeriod, RemovePeriod, periodsList, selectedPeriod, SelectPeriod, period } =
    useExpanseContext();

  const handleNewPeriod = () => {
    const newPeriodName = window.prompt("New period name:");

    if (newPeriodName && newPeriodName.length > 1) {
      const newPeriodBudget = window.prompt("New period budget");

      if (newPeriodBudget && newPeriodBudget.length > 1 && parseFloat(newPeriodBudget) > 1) {
        AddPeriod(newPeriodName, parseFloat(newPeriodBudget));
      }
    }
  };

  return (
    <>
      <div className="PeriodContainer">
        <div className="PeriodNameContainer">
          <select
            value={selectedPeriod}
            onChange={(e) => {
              SelectPeriod(e.target.value);
            }}
          >
            {periodsList &&
              periodsList.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.Name}
                </option>
              ))}
          </select>
          <div className="PeriodNameContainer">
            <button onClick={handleNewPeriod}>New</button>
            <button onClick={RemovePeriod}>Remove</button>
          </div>
        </div>
        {period && period.Budget && (
          <table className="BudgetSummaryTable">
            <tbody>
              <tr>
                <th className="TBudget">{period.Budget.toFixed(2)}</th>
                <th className="TSpent">
                  {period.Expanses.reduce((sum, e) => sum + e.Value, 0).toFixed(2)}
                </th>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
