import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

import LanguageCard from './components/LanguageCard';
import PreviewText from './components/PreviewText';
import WelcomeMessage from './components/WelcomeMessage';

const LanguageSelection = () => {
    const navigate = useNavigate();
    const { isAuthenticated, completeLanguageSelection } = useAuth();
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Redirect to phone auth if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/phone-authentication', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const languages = [
        {
            code: 'en',
            name: 'English',
            nativeName: 'English',
            flag: '🇬🇧',
            description: 'International language for farming',
            culturalIcon: '🌾'
        },
        {
            code: 'hi',
            name: 'Hindi',
            nativeName: 'हिन्दी',
            flag: '🇮🇳',
            description: 'भारतीय किसानों के लिए',
            culturalIcon: '🚜'
        }];


    // Auto-select English as default for better UX
    useEffect(() => {
        setSelectedLanguage('en');
    }, []);

    const handleLanguageSelect = (languageCode) => {
        setSelectedLanguage(languageCode);
    };

    const handleContinue = async () => {
        if (!selectedLanguage) return;

        setIsLoading(true);

        try {
            // Simulate setting up language preferences
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Complete language selection through auth context
            completeLanguageSelection(selectedLanguage);

            // Navigate to dashboard after language selection
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Failed to set language preference:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const selectedLangData = languages?.find((lang) => lang?.code === selectedLanguage);

    // Don't render if not authenticated (will be redirected)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
                    {/* Logo and Branding */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">KhetConnect</h1>
                    </div>

                    {/* Welcome Message */}
                    <WelcomeMessage selectedLanguage={selectedLanguage} />

                    {/* Language Selection */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Choose your language
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Select your preferred language to continue with KhetConnect
                            </p>
                        </div>

                        {/* Language Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {languages?.map((language) =>
                                <LanguageCard
                                    key={language?.code}
                                    language={language}
                                    isSelected={selectedLanguage === language?.code}
                                    onSelect={handleLanguageSelect} />

                            )}
                        </div>

                        {/* Preview Text */}
                        {selectedLangData &&
                            <PreviewText language={selectedLangData} />
                        }

                        {/* Continue Button */}
                        <div className="pt-4">
                            <Button
                                onClick={handleContinue}
                                loading={isLoading}
                                disabled={!selectedLanguage}
                                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">

                                {isLoading ? 'Setting up...' : 'Continue'}
                            </Button>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center">
                            <p className="text-xs text-gray-500">
                                You can change your language preference later in Settings
                            </p>
                        </div>
                    </div>

                    {/* Language Features */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-900 mb-4">
                                Available in your language
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    <span className="text-sm text-gray-700">Crop Advice</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    <span className="text-sm text-gray-700">Weather Updates</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    <span className="text-sm text-gray-700">AI Assistant</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    <span className="text-sm text-gray-700">Market Prices</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Message */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Join thousands of farmers using KhetConnect in their native language
                    </p>
                </div>
            </div>
        </div>);

};

export default LanguageSelection;