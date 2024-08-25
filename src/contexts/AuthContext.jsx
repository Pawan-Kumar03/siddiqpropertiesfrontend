import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedToken = localStorage.getItem('token');
        if (storedUsername && storedToken) {
            setUsername(storedUsername);
            setToken(storedToken);
        }
    }, []);

    const login = (username, token) => {
        setUsername(username);
        setToken(token);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUsername(null);
        setToken(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ username, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
