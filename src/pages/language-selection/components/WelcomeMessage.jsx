import React from 'react';

const WelcomeMessage = ({ selectedLanguage }) => {
    const messages = {
        en: {
            title: "Welcome, Farmer!",
            subtitle: "Let\'s set up KhetConnect in your preferred language",
            description: "Choose the language that feels most comfortable for you. You'll get farming advice, weather updates, and all features in your selected language."
        },
        hi: {
            title: "स्वागत है किसान भाई!",
            subtitle: "आइए फार्मवाइज़ को आपकी पसंदीदा भाषा में सेट करते हैं",
            description: "वह भाषा चुनें जो आपके लिए सबसे आरामदायक हो। आपको खेती की सलाह, मौसम अपडेट और सभी सुविधाएं आपकी चुनी गई भाषा में मिलेंगी।"
        }
    };

    const message = messages?.[selectedLanguage] || messages?.en;

    return (
        <div className="text-center mb-8">
            {/* Cultural Illustration */}
            <div className="w-full h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4 text-4xl">
                    <span>🌾</span>
                    <span>🚜</span>
                    <span>🌱</span>
                    <span>🌈</span>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {message?.title}
            </h2>
            <p className="text-lg text-green-700 font-medium mb-3">
                {message?.subtitle}
            </p>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
                {message?.description}
            </p>
            {/* Language Stats */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H11C11.24 21 11.47 20.93 11.6 20.8L21 11.5C21.55 11 21.55 10 21 9.5V9M5 3H13.5L19 8.5V9.7L9.7 19H5V3Z" />
                    </svg>
                    <span>2 Languages</span>
                </div>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>Voice Support</span>
                </div>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                    </svg>
                    <span>Full Localization</span>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMessage;