import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import { RotatingLines } from "react-loader-spinner"; // Importing loading spinner component
import { searchCoin } from "../../services/cryptoApi"; // Importing search function from API
import styles from "./Search.module.css"; // Importing CSS styles for the component

function Search({ currency, setCurrency }) {
  const [text, setText] = useState(""); // State for storing the input text
  const [coins, setCoins] = useState([]); // State for storing search results
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  useEffect(() => {
    const controller = new AbortController(); // Creating a controller for aborting fetch requests

    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        
        if (json.coins) {
          setIsLoading(false);
          setCoins(json.coins);
        } else {
          console.log(json.status.error_message);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsLoading(false);
        }
      }
    };

    setIsLoading(true);
    search();

    return () => controller.abort(); // Cleanup function to abort fetch on unmount
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)} // Update text state on input change
      />

      <select
        className={styles.select}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <RotatingLines
              width="50px"
              height="50px"
              strokeWidth="2"
              strokeColor="#3874ff" // Loading spinner
            />
          )}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
