import React from 'react';
import { cn } from '../../../utils/cn';

const LanguageCard = ({ language, isSelected, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(language?.code)}
            className={cn(
                "w-full p-6 border-2 rounded-xl transition-all duration-200 text-left hover:shadow-md",
                isSelected
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200 hover:border-green-300 bg-white"
            )}
        >
            <div className="flex items-start space-x-4">
                {/* Language Flag/Icon */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-2xl">
                        {language?.flag}
                    </div>
                </div>

                {/* Language Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                            {language?.name}
                        </h3>
                        <span className="text-2xl">
                            {language?.culturalIcon}
                        </span>
                    </div>

                    <p className="text-lg font-medium text-gray-700 mb-2">
                        {language?.nativeName}
                    </p>

                    <p className="text-sm text-gray-600">
                        {language?.description}
                    </p>
                </div>

                {/* Selection Indicator */}
                <div className="flex-shrink-0">
                    <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                        isSelected
                            ? "border-green-500 bg-green-500" : "border-gray-300"
                    )}>
                        {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
            {/* Additional Language Features */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>Voice Support</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>Full Interface</span>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default LanguageCard;