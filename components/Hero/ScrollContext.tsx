import React, { createContext, useRef } from 'react';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const getInTouchRef = useRef(null);

    return (
        <ScrollContext.Provider value={{ getInTouchRef }}>
            {children}
        </ScrollContext.Provider>
    );
};
