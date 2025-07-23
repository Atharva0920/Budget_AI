import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationTtleContext = createContext();

export const NavigationTitleProvider = ({ children }) => {


    const [title, setTitle] = useState("");
    useEffect(() => {
        console.log('GlobalProvider mounted');
        console.log(value);

        return () => console.log('GlobalProvider unmounted');
    }, []);

    const value = {
        title,
        setTitle
    };

    return (
        <NavigationTtleContext.Provider value={value}>
            {children}
        </NavigationTtleContext.Provider>
    );
};

export const useNavigationTitleContext = () => {
    const context = useContext(NavigationTtleContext);
    if (!context) {
        throw new Error('useNavigationTitleContext must be used with a NavigationTitleProvider');
    }
    return context;
}