// ScrollContext.tsx
import React, { createContext, useRef, ReactNode } from 'react';

// Define the context type
type ScrollContextType = {
    getInTouchRef: React.MutableRefObject<HTMLDivElement | null>;
};

// Provide a default value with the correct type
export const ScrollContext = createContext<ScrollContextType>({
    getInTouchRef: { current: null }
});

// Define the props for ScrollProvider
type ScrollProviderProps = {
    children: ReactNode;
};

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
    // Specify the type for useRef
    const getInTouchRef = useRef<HTMLDivElement>(null);

    return (
        <ScrollContext.Provider value={{ getInTouchRef }}>
            {children}
        </ScrollContext.Provider>
    );
};
