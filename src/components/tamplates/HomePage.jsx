import { useEffect, useState } from "react";

import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  const [totalCoins, setTotalCoins] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("$ ");

  useEffect(() => {
    // Function to fetch coin data from API
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        if (json) {
          const total = 200;
          setTotalCoins(total);
          setCoins(json);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getData();
  }, [page, currency]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    // Update currency symbol based on selected currency
    switch (newCurrency) {
      case "usd":
        setCurrencySymbol("$ ");
        break;
      case "eur":
        setCurrencySymbol("€ ");
        break;
      case "jpy":
        setCurrencySymbol("¥ ");
        break;
      default:
        setCurrencySymbol("$ "); // Default to dollar if unknown
    }
  };

  return (
    <div>
      <Search
        currency={currency}
        setCurrency={handleCurrencyChange}
        currencySymbol={currencySymbol}
      />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currencySymbol={currencySymbol}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} totalCoins={totalCoins} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
