import React from 'react';

const TrustIndicators = () => {
    const trustFeatures = [
        {
            icon: (
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
                </svg>
            ),
            title: 'Secure Verification',
            description: 'Your data is protected with end-to-end encryption'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            ),
            title: 'Trusted by Farmers',
            description: '10,000+ farmers across India trust KhetConnect'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
            ),
            title: 'Privacy Protected',
            description: 'We never share your personal information'
        }
    ];

    return (
        <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 text-center mb-4">
                    Why KhetConnect is secure
                </h3>

                <div className="space-y-3">
                    {trustFeatures?.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                                {feature?.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {feature?.title}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {feature?.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Privacy Policy Link */}
                <div className="text-center mt-6">
                    <button className="text-xs text-green-600 hover:text-green-700 underline">
                        Privacy Policy & Terms of Service
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrustIndicators;