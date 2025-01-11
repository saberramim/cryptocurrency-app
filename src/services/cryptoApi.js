const BASE_URL = "https://api.coingecko.com/api/v3"; // Base URL for CoinGecko API
const API_KEY = "CG-Mr1rn6fMhs3k6qop79gtzN5X"; // API key for accessing the service

// Function to generate URL for getting list of coins
const getCoinList = (page, currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`;

// Function to generate URL for searching for a specific coin
const searchCoin = (query) =>
  `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

// Function to generate URL for fetching market chart data for a specific coin
const marketChart = (coin) =>
  `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`;
export { getCoinList, searchCoin, marketChart };
