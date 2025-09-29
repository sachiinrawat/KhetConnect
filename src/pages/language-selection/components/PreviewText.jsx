import React from 'react';


const PreviewText = ({ language }) => {
    const previewTexts = {
        en: {
            greeting: "Welcome to KhetConnect!",
            description: "Get personalized farming advice, weather updates, and crop management tools in English.",
            sample: "Today's weather: Sunny, 28°C. Perfect for irrigation.",
            features: ["Smart Crop Recommendations", "Weather Forecasts", "Market Price Updates", "AI Assistant"]
        },
        hi: {
            greeting: "खेतकनेक्ट में आपका स्वागत है!",
            description: "हिन्दी में व्यक्तिगत खेती की सलाह, मौसम अपडेट, और फसल प्रबंधन उपकरण प्राप्त करें।",
            sample: "आज का मौसम: धूप, 28°C। सिंचाई के लिए उत्तम।",
            features: ["स्मार्ट फसल सुझाव", "मौसम पूर्वानुमान", "बाज़ार भाव अपडेट", "AI सहायक"]
        }
    };

    const preview = previewTexts?.[language?.code] || previewTexts?.en;

    return (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Preview in {language?.nativeName}
                    </h4>

                    <div className="space-y-3">
                        <div>
                            <h5 className="font-semibold text-green-800 text-lg">
                                {preview?.greeting}
                            </h5>
                            <p className="text-sm text-gray-700 mt-1">
                                {preview?.description}
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-800">
                                📱 {preview?.sample}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-700 mb-2">
                                Available features:
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                {preview?.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-1">
                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                        <span className="text-xs text-gray-600">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewText;