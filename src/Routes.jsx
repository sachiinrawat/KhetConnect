import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PhoneAuthentication from './pages/phone-authentication';
import LanguageSelection from './pages/language-selection';
import Settings from './pages/settings';
import Dashboard from './pages/dashboard';
import AskAI from './pages/ask-ai';
import CropAdvice from './pages/crop-advice';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Component to handle root route redirection
const RootRedirect = () => {
    const { isAuthenticated, isLanguageSelected, loading } = useAuth();

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

    // Redirect based on auth state
    if (!isAuthenticated) {
        return <Navigate to="/phone-authentication" replace />;
    }

    if (!isLanguageSelected) {
        return <Navigate to="/language-selection" replace />;
    }

    return <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
    return (
        <RouterRoutes>
            {/* Root route with smart redirection */}
            <Route path="/" element={<RootRedirect />} />

            {/* Authentication Flow - accessible without auth */}
            <Route path="/phone-authentication" element={<PhoneAuthentication />} />
            <Route path="/language-selection" element={<LanguageSelection />} />

            {/* Protected Main Application Routes */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/ask-ai" element={
                <ProtectedRoute>
                    <AskAI />
                </ProtectedRoute>
            } />
            <Route path="/crop-advice" element={
                <ProtectedRoute>
                    <CropAdvice />
                </ProtectedRoute>
            } />
            <Route path="/settings" element={
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>
            } />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
        </RouterRoutes>
    );
};

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
