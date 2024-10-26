import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const { token } = parsedUser;

            if (token) {
                const decodedToken = jwtDecode(token); // Decode the token
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    // Token has expired, log the user out
                    logout();
                } else {
                    setUser(parsedUser);
                }
            }
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
