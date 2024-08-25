import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    const login = (username) => {
        localStorage.setItem('username', username);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem('username');
        setUsername(null);
    };

    return (
        <UserContext.Provider value={{ username, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
