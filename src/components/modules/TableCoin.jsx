import { RotatingLines } from "react-loader-spinner";

import { marketChart } from "../../services/cryptoApi";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import styles from "./TableCoin.module.css";

function TableCoin({ coins, isLoading, currencySymbol, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currencySymbol={currencySymbol}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
// Component to render each row of the coin table
const TableRow = ({ coin, currencySymbol, setChart }) => {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    current_price,
    price_change_percentage_24h: price_change,
  } = coin;

  // Function to fetch market chart data for the selected coin
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      if (!res.ok) throw new Error("Failed to fetch market chart");
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      console.error(error);
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{`${currencySymbol}${current_price.toLocaleString()}`}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};

export default TableCoin;
