import { useState, useEffect } from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import "./styles/styles.scss";

/**
 * Main App Component
 * Handles theme switching and main layout
 * 
 * @component
 */
const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    // Apply theme class to body when theme changes
    useEffect(() => {
        document.body.classList.toggle('dark-theme', darkTheme);
    }, [darkTheme]);

    return (
        <div className={`app-container ${darkTheme ? 'dark-theme' : ''}`}>
            {/* Theme toggle button */}
            <button 
                onClick={() => setDarkTheme(!darkTheme)}
                className="theme-toggle"
                aria-label={darkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            >
                {darkTheme ? '☀️' : '🌙'}
            </button>

            {/* Main currency converter component */}
            <CurrencyConverter />
        </div>
    );
};

export default App;
