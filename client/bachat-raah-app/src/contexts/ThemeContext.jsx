import React, {createContext, useState, useEffect} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [privateMode, setPrivateMode] = useState(() => {
        const savedMode = localStorage.getItem('privateMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('privateMode', JSON.stringify(privateMode));
    }, [privateMode]);

    return (
        <ThemeContext.Provider 
        value={{ 
            darkMode, 
            setDarkMode,
            toggleDarkMode: () => setDarkMode(prev => !prev),
            privateMode, 
            setPrivateMode,
            togglePrivateMode: () => setPrivateMode(prev => !prev)}}>
            {children}
        </ThemeContext.Provider>
    );
}
