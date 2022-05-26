import axios from "axios";
import { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { AppStyles } from "./AppStyles";
import "./AppStyles.tsx";
import StarShipItem from "./components/StarShipItem";

const App: FC = () => {
  const fetchData = async () => {
    const { data } = await axios.get("https://swapi.dev/api/starships");
    setTotal(data.count);
    // const groupedStarShip = data.results.groupBy(
    //   (starship: any) => starship.starship_class
    // );
    // console.log(groupedStarShip);

    // console.log(groupedStarShip);
    // const groupedStarShipWithTotal = groupedStarShip
    //   .keys()
    //   .map((key: string) => ({ key: key, total: groupedStarShip[key].length }));

    // setList(groupedStarShipWithTotal);

    const groupedStarShip = data.results.reduce((group: any, ship: any) => {
      const { starship_class } = ship;
      group[starship_class] = group[starship_class] ?? 0;
      group[starship_class]++;
      return group;
    }, {});

    const groupedStarShipWithTotal = Object.keys(groupedStarShip).map(
      (key: string) => ({
        key,
        total: groupedStarShip[key],
      })
    );

    setList(groupedStarShipWithTotal);
  };

  const [total, setTotal] = useState<number>(0);

  const [list, setList] = useState([] as any[]);

  const fetchDataCallback = useCallback(fetchData, []);

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  return (
    <AppStyles>
      <div id="background-container">
        <header id="header-title">Star Wars Test</header>
        <main id="main-container">
          <h2>Starships:</h2>
          <p id="total-ships">Total ships: {total}</p>
          <h2>Starships by class:</h2>
          {list.map((starship) => (
            <StarShipItem starShipClass={starship.key} total={starship.total} />
          ))}
        </main>
      </div>
    </AppStyles>
  );
};

export default App;
