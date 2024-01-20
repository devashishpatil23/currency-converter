import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = currencyData(from);
  const options = Object.keys(currencyInfo);
  // const swap = () => {
  //   setFrom(to);
  //   setTo(from);
  // };
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  function currencyData(currency) {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
      )
        .then((res) => res.json())
        .then((res) => setData(res[currency]));
    });
    return data;
  }

  return (
    <>
      <div className="max-w-md bg-red-200 mx-auto p-4 relative top-20">
        <h1 className="text-center  text-2xl">Currnecy Converter</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectedCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />
          <br />
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectedCurrency={to}
            disabled={true}
          />
        </form>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
            disabled={!amount ? true : false}
            onClick={() => convert()}
          >
            Convert
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
