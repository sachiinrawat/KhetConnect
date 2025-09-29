import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = () => {
    return (
        <div className="flex justify-start mb-4">
            <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="flex items-end space-x-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Icon name="Bot" size={16} color="white" />
                    </div>

                    <div className="px-4 py-3 rounded-2xl bg-primary text-primary-foreground rounded-bl-md shadow-agricultural">
                        <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm ml-2 opacity-70">KhetConnect AI is thinking...</span>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground mt-1 px-2">
                    KhetConnect AI
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;