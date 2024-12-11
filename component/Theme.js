import React, { createContext, useContext, useState } from "react";

// Tạo Context để quản lý theme
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Mặc định là light theme với màu nền sáng
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle theme: chuyển giữa sáng và tối
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Định nghĩa màu nền của theme
    const themeStyles = isDarkMode 
        ? { background: '#a9a9a9', text: '#FFFFFF' } // Theme tối
        : { background: '#FFFFFF', text: '#000000' }; // Theme sáng

    return (
        <ThemeContext.Provider value={{ isDarkMode, themeStyles, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook sử dụng ThemeContext
export const useTheme = () => useContext(ThemeContext);
