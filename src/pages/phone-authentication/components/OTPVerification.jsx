import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const OTPVerification = ({ phoneNumber, onVerified, onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus on first input when component mounts
        if (inputRefs?.current?.[0]) {
            inputRefs?.current?.[0]?.focus();
        }
    }, []);

    useEffect(() => {
        // Countdown timer for resend OTP
        if (resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const handleOtpChange = (index, value) => {
        if (value?.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto focus next input
        if (value && index < 5) {
            inputRefs?.current?.[index + 1]?.focus();
        }

        // Auto verify when all digits are entered
        if (newOtp?.every(digit => digit !== '') && newOtp?.join('')?.length === 6) {
            setTimeout(() => handleVerifyOTP(newOtp?.join('')), 100);
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
            inputRefs?.current?.[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e?.preventDefault();
        const pasteData = e?.clipboardData?.getData('text')?.replace(/\D/g, '')?.slice(0, 6);

        if (pasteData?.length === 6) {
            const newOtp = pasteData?.split('');
            setOtp(newOtp);

            // Auto verify
            setTimeout(() => handleVerifyOTP(pasteData), 100);
        }
    };

    const handleVerifyOTP = async (otpCode = otp?.join('')) => {
        if (otpCode?.length !== 6) {
            setError('Please enter a complete 6-digit code');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Simulate API call for OTP verification
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For dummy implementation - any 6-digit code is valid
            if (otpCode === '123456' || otpCode?.length === 6) {
                onVerified();
            } else {
                setError('Invalid verification code. Please try again.');
                // Clear OTP inputs on error
                setOtp(['', '', '', '', '', '']);
                inputRefs?.current?.[0]?.focus();
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
            setOtp(['', '', '', '', '', '']);
            inputRefs?.current?.[0]?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (!canResend) return;

        setCanResend(false);
        setResendTimer(30);
        setError('');
        setOtp(['', '', '', '', '', '']);

        try {
            // Simulate resend API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Focus back to first input
            inputRefs?.current?.[0]?.focus();
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Verify your phone
                </h2>
                <p className="text-gray-600 text-sm">
                    We've sent a 6-digit code to
                </p>
                <p className="font-medium text-gray-900">{phoneNumber}</p>
            </div>
            {/* OTP Input */}
            <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                    {otp?.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e?.target?.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className={cn(
                                "w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none",
                                digit && "border-green-500 bg-green-50",
                                error && "border-red-500 focus:border-red-500 focus:ring-red-200"
                            )}
                            maxLength={1}
                        />
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center justify-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Verify Button */}
                <Button
                    onClick={() => handleVerifyOTP()}
                    loading={isLoading}
                    disabled={otp?.some(digit => !digit)}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                >
                    {isLoading ? 'Verifying...' : 'Verify'}
                </Button>

                {/* Resend OTP */}
                <div className="text-center">
                    {canResend ? (
                        <button
                            onClick={handleResendOTP}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                            Resend OTP
                        </button>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Resend OTP in {resendTimer} seconds
                        </p>
                    )}
                </div>

                {/* Back Button */}
                <div className="flex items-center justify-center">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Change phone number</span>
                    </button>
                </div>

                {/* Hint */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        For demo purposes, use <span className="font-medium">123456</span> as OTP
                        <br />
                        or any 6-digit code to proceed
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;