import { History } from "../Components/History";
import { Period } from "../Components/Period";
import { useExpanseContext } from "../Context/Context";

export function Home() {
  const { tokenId, selectedPeriod } = useExpanseContext();

  return (
    <>
      <div className="PrimalContainer">
        {tokenId && tokenId.length > 10 ? (
          <>
            <Period />
            {selectedPeriod && <History />}
          </>
        ) : (
          <h3>Hello, please log in or register by clicking the ‘Sign In’ button on the navbar</h3>
        )}
      </div>
    </>
  );
}
