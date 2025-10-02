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

// Simple root redirect to dashboard
const RootRedirect = () => <Navigate to="/dashboard" replace />;

const AppRoutes = () => {
    return (
        <RouterRoutes>
            {/* Root route with smart redirection */}
            <Route path="/" element={<RootRedirect />} />

            {/* Authentication Flow - accessible without auth */}
            <Route path="/phone-authentication" element={<PhoneAuthentication />} />
            <Route path="/language-selection" element={<LanguageSelection />} />

            {/* Main Application Routes - no authentication required */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ask-ai" element={<AskAI />} />
            <Route path="/crop-advice" element={<CropAdvice />} />
            <Route path="/settings" element={<Settings />} />

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
                <AppRoutes />
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
