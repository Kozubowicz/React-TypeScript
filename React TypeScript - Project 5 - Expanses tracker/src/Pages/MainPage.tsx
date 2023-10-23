import { FirstPeriod } from "../Components/FirstPeriod";
import { History } from "../Components/History";
import { Period } from "../Components/Period";
import { useExpansesContext } from "../Context/Context";

export function MainPage() {
  const { getPeriods } = useExpansesContext();
  console.log(getPeriods()?.length);

  return (
    <>
      <div className="MainPage"></div>
      {getPeriods()?.length ? (
        <>
          <Period />
          <History />
        </>
      ) : (
        <>
          <FirstPeriod />
        </>
      )}
    </>
  );
}
