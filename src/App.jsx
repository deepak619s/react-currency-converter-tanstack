import { useState } from "react";
import { currencyConverter } from "./api/postApi";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [amount, setAmount] = useState(0); // Amount to convert
  const [fromCurrency, setFromCurrency] = useState("USD"); // Base currency
  const [toCurrency, setToCurrency] = useState("INR"); // Target currency

  // to fetch the data :-
  const {
    data: convertedAmount,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currency"],
    queryFn: () => currencyConverter(fromCurrency, toCurrency, amount),
    enabled: false,
  });

  // handleCurrencyConverter :-
  const handleCurrencyConverter = async () => {
    if (amount > 0) {
      refetch();
    }
  };

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>

        <div className="currency-selector">
          <div>
            <label>
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {["USD", "EUR", "INR", "GBP", "AUD"].map((currency) => {
                  return (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div>
            <label>
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {["INR", "USD", "EUR", "GBP", "AUD"].map((currency) => {
                  return (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>

        <button
          disabled={isLoading || amount <= 0}
          onClick={handleCurrencyConverter}
        >
          {isLoading ? "Converting.." : "Convert"}
        </button>

        <hr />
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}
              {toCurrency}
            </h2>
          </div>
        )}

        {error && <p>An error occured: {error.message}</p>}
      </div>
    </section>
  );
};

export default App;
