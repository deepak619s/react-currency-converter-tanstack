import axios from "axios";

const api = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/57e57babcdd0d96a80e3935e",
});

// we need to create get request from api :-
export const currencyConverter = async (fromCurrency, toCurrency, amount) => {
  const res = await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
  return res.data.conversion_result;
};
