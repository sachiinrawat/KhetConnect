import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLanguageSelected, loading } = useAuth();

    // Show loading spinner while checking auth status
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">KhetConnect</h2>
                    <p className="text-gray-600 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to phone auth if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/phone-authentication" replace />;
    }

    // Redirect to language selection if authenticated but no language selected
    if (!isLanguageSelected) {
        return <Navigate to="/language-selection" replace />;
    }

    // User is fully authenticated and has selected language
    return children;
};

export default ProtectedRoute;