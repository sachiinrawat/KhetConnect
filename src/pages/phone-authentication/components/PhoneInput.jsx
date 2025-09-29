import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const PhoneInput = ({
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    onSendOTP,
    isLoading,
    error
}) => {
    const countryCodes = [
        { code: '+91', country: 'India', flag: '🇮🇳' },
        { code: '+1', country: 'USA', flag: '🇺🇸' },
        { code: '+44', country: 'UK', flag: '🇬🇧' },
        { code: '+86', country: 'China', flag: '🇨🇳' }
    ];

    const formatPhoneNumber = (value) => {
        // Remove all non-digits
        const digits = value?.replace(/\D/g, '');

        // Limit to 10 digits for Indian numbers
        if (digits?.length > 10) return digits?.slice(0, 10);

        return digits;
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e?.target?.value);
        setPhoneNumber(formatted);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Enter your phone number
                </h2>
                <p className="text-gray-600 text-sm">
                    We'll send you a verification code to confirm your identity
                </p>
            </div>
            {/* Phone Number Input */}
            <div className="space-y-4">
                {/* Country Code Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country/Region
                    </label>
                    <div className="relative">
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e?.target?.value)}
                            className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                        >
                            {countryCodes?.map((item) => (
                                <option key={item?.code} value={item?.code}>
                                    {item?.flag} {item?.country} ({item?.code})
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <div className="flex space-x-2">
                        <div className="flex-shrink-0">
                            <input
                                type="text"
                                value={countryCode}
                                readOnly
                                className="h-12 w-16 px-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-center font-medium"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="Enter phone number"
                                className={cn(
                                    "w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
                                    error && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                                maxLength={10}
                            />
                        </div>
                    </div>
                    {phoneNumber && (
                        <p className="mt-2 text-sm text-gray-600">
                            We'll send SMS to: <span className="font-medium">{countryCode} {phoneNumber}</span>
                        </p>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Send OTP Button */}
                <Button
                    onClick={onSendOTP}
                    loading={isLoading}
                    disabled={!phoneNumber || phoneNumber?.length < 10}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>

                {/* Additional Info */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        By continuing, you agree to receive SMS messages for verification.
                        <br />
                        Standard message rates may apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PhoneInput;