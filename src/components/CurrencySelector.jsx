import React from 'react';
import PropTypes from 'prop-types';

/**
 * CurrencySelector Component
 * Renders a select dropdown for choosing currencies
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Currently selected currency
 * @param {function} props.onChange - Handler for currency change
 * @param {string[]} props.currencies - Array of available currencies
 */
const CurrencySelector = ({ value, onChange, currencies }) => (
    <select 
        className="currency-selector"
        value={value}
        onChange={onChange}
    >
        {currencies.map(currency => (
            <option key={currency} value={currency}>
                {currency}
            </option>
        ))}
    </select>
);

CurrencySelector.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CurrencySelector;
