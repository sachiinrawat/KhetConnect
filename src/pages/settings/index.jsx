import React, { useState } from 'react';
import { ArrowLeft, Settings, Globe, Wifi, Info, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import LanguageSettings from './components/LanguageSettings';
import OfflineSettings from './components/OfflineSettings';
import AboutSection from './components/AboutSection';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeSection, setActiveSection] = useState(null);

    // Add state for language settings
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [languages] = useState([
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' }
    ]);

    // Add state for offline settings
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [offlineMode, setOfflineMode] = useState(false);
    const [lastSyncTime] = useState(new Date());

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/phone-authentication', { replace: true });
        }
    };

    const renderMainSettings = () => (
        <div className="space-y-4">
            {/* User Info Section */}
            {user && (
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-green-800 mb-2">Account Information</h3>
                    <p className="text-sm text-green-700">
                        Phone: {user?.countryCode} {user?.phoneNumber}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                        Verified on {new Date(user?.authenticatedAt)?.toLocaleDateString()}
                    </p>
                </div>
            )}

            {/* Settings Options */}
            <div className="space-y-2">
                <button
                    onClick={() => setActiveSection('language')}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                            <h3 className="font-medium text-gray-900">Language & Region</h3>
                            <p className="text-sm text-gray-500">Choose your preferred language</p>
                        </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </button>

                <button
                    onClick={() => setActiveSection('offline')}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center space-x-3">
                        <Wifi className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                            <h3 className="font-medium text-gray-900">Offline Mode</h3>
                            <p className="text-sm text-gray-500">Manage offline functionality</p>
                        </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </button>

                <button
                    onClick={() => setActiveSection('about')}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center space-x-3">
                        <Info className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                            <h3 className="font-medium text-gray-900">About</h3>
                            <p className="text-sm text-gray-500">App information and support</p>
                        </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </button>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors mt-6"
                >
                    <div className="flex items-center space-x-3">
                        <LogOut className="w-5 h-5 text-red-600" />
                        <div className="text-left">
                            <h3 className="font-medium text-red-900">Logout</h3>
                            <p className="text-sm text-red-500">Sign out of your account</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center p-4">
                    <button
                        onClick={handleBack}
                        className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <Settings className="w-6 h-6 text-green-600" />
                        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 max-w-md mx-auto">
                {activeSection === 'language' && (
                    <LanguageSettings
                        onBack={() => setActiveSection(null)}
                        currentLanguage={currentLanguage}
                        onLanguageChange={setCurrentLanguage}
                        languages={languages}
                    />
                )}
                {activeSection === 'offline' && (
                    <OfflineSettings
                        onBack={() => setActiveSection(null)}
                        isOffline={isOffline}
                        offlineMode={offlineMode}
                        onOfflineModeToggle={setOfflineMode}
                        lastSyncTime={lastSyncTime}
                    />
                )}
                {activeSection === 'about' && (
                    <AboutSection
                        onBack={() => setActiveSection(null)}
                        currentLanguage={currentLanguage}
                    />
                )}
                {!activeSection && renderMainSettings()}
            </div>
        </div>
    );
};

export default SettingsPage;