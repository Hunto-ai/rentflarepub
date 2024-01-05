import React, { createContext, useRef, ReactNode } from 'react';

// Define the type for your context
type ScrollContextType = {
    getInTouchRef: React.MutableRefObject<null>;
};

// Create a context with a default value
export const ScrollContext = createContext<ScrollContextType>({ getInTouchRef: { current: null } });

// Define the props for ScrollProvider
type ScrollProviderProps = {
    children: ReactNode;
};

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
    const getInTouchRef = useRef(null);

    return (
        <ScrollContext.Provider value={{ getInTouchRef }}>
            {children}
        </ScrollContext.Provider>
    );
};
