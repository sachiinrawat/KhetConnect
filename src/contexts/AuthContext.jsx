import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLanguageSelected, setIsLanguageSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        try {
            // Check if user has completed phone authentication
            const authStatus = localStorage.getItem('khetconnect_authenticated');
            const languagePreference = localStorage.getItem('khetconnect_language');
            const userData = localStorage.getItem('khetconnect_user');

            setIsAuthenticated(authStatus === 'true');
            setIsLanguageSelected(!!languagePreference);
            setUser(userData ? JSON.parse(userData) : null);
        } catch (error) {
            console.error('Error checking auth status:', error);
            // Reset auth state on error
            clearAuthState();
        } finally {
            setLoading(false);
        }
    };

    const completePhoneAuth = (phoneNumber, countryCode) => {
        const userData = {
            phoneNumber,
            countryCode,
            authenticatedAt: new Date()?.toISOString()
        };

        localStorage.setItem('khetconnect_authenticated', 'true');
        localStorage.setItem('khetconnect_user', JSON.stringify(userData));

        setIsAuthenticated(true);
        setUser(userData);
    };

    const completeLanguageSelection = (language) => {
        localStorage.setItem('khetconnect_language', language);
        setIsLanguageSelected(true);
    };

    const logout = () => {
        clearAuthState();
    };

    const clearAuthState = () => {
        localStorage.removeItem('khetconnect_authenticated');
        localStorage.removeItem('khetconnect_user');
        localStorage.removeItem('khetconnect_language');

        setIsAuthenticated(false);
        setIsLanguageSelected(false);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        isLanguageSelected,
        loading,
        user,
        completePhoneAuth,
        completeLanguageSelection,
        logout,
        clearAuthState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;