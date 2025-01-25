import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import { fetchCurrencies, convertCurrency } from "../utils/currencyUtils";

/**
 * CurrencyConverter Component
 * Main component for currency conversion functionality
 * 
 * @component
 */
const CurrencyConverter = () => {
    // State management
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [currencies, setCurrencies] = useState([]);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch available currencies on component mount
    useEffect(() => {
        const loadCurrencies = async () => {
            try {
                const availableCurrencies = await fetchCurrencies();
                setCurrencies(availableCurrencies);
            } catch (err) {
                setError("Failed to load currencies. Please try again later.");
            }
        };
        
        loadCurrencies();
    }, []);

    // Handle conversion
    const handleConvert = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
            setResult(convertedAmount);
        } catch (err) {
            setError("Failed to convert currency. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="converter-container">
            <h1 className="title">Currency Converter</h1>

            {/* Amount input */}
            <div className="form-group">
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                />
            </div>

            {/* From currency selector */}
            <div className="form-group">
                <label>From</label>
                <CurrencySelector
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    currencies={currencies}
                />
            </div>

            {/* To currency selector */}
            <div className="form-group">
                <label>To</label>
                <CurrencySelector
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    currencies={currencies}
                />
            </div>

            {/* Convert button */}
            <button 
                className="convert-button" 
                onClick={handleConvert}
                disabled={isLoading}
            >
                {isLoading ? "Converting..." : "Convert"}
            </button>

            {/* Error message */}
            {error && <div className="error">{error}</div>}

            {/* Result display */}
            {result && !error && (
                <div className="result">
                    {amount} {fromCurrency} = {result} {toCurrency}
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;
