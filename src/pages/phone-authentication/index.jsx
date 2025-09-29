import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import PhoneInput from './components/PhoneInput';
import OTPVerification from './components/OTPVerification';
import TrustIndicators from './components/TrustIndicators';

const PhoneAuthentication = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLanguageSelected, completePhoneAuth } = useAuth();
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && isLanguageSelected) {
            navigate('/dashboard', { replace: true });
        } else if (isAuthenticated && !isLanguageSelected) {
            navigate('/language-selection', { replace: true });
        }
    }, [isAuthenticated, isLanguageSelected, navigate]);

    const handleSendOTP = async () => {
        if (!phoneNumber || phoneNumber?.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Simulate API call for sending OTP
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For dummy implementation - all phone numbers are valid
            setStep('otp');
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPVerified = () => {
        // Complete phone authentication
        completePhoneAuth(phoneNumber, countryCode);

        // Navigate to language selection after successful OTP verification
        navigate('/language-selection', { replace: true });
    };

    const handleBackToPhone = () => {
        setStep('phone');
        setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
                    {/* Logo and Branding */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">KhetConnect</h1>
                        <p className="text-gray-600 text-sm">Your trusted farming companion</p>
                    </div>

                    {/* Agricultural Hero Image */}
                    <div className="mb-6">
                        <div className="w-full h-32 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>

                    {step === 'phone' ? (
                        <PhoneInput
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            countryCode={countryCode}
                            setCountryCode={setCountryCode}
                            onSendOTP={handleSendOTP}
                            isLoading={isLoading}
                            error={error}
                        />
                    ) : (
                        <OTPVerification
                            phoneNumber={`${countryCode} ${phoneNumber}`}
                            onVerified={handleOTPVerified}
                            onBack={handleBackToPhone}
                        />
                    )}

                    {/* Trust Indicators */}
                    <TrustIndicators />
                </div>

                {/* Additional Security Message */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Secure authentication powered by SMS verification
                    </p>
                    <div className="flex items-center justify-center mt-2 space-x-4">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
                            </svg>
                            <span className="text-xs text-gray-500">Secure</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="text-xs text-gray-500">Trusted</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-500">Verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneAuthentication;