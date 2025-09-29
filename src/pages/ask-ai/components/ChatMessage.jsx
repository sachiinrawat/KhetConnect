import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser }) => {
    const formatTime = (timestamp) => {
        return new Date(timestamp)?.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${isUser ? 'order-2' : 'order-1'}`}>
                {/* Avatar */}
                <div className={`flex items-end space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-secondary' : 'bg-primary'
                        }`}>
                        <Icon
                            name={isUser ? 'User' : 'Bot'}
                            size={16}
                            color="white"
                        />
                    </div>

                    {/* Message Bubble */}
                    <div className={`px-4 py-3 rounded-2xl shadow-agricultural ${isUser
                        ? 'bg-secondary text-secondary-foreground rounded-br-md'
                        : 'bg-primary text-primary-foreground rounded-bl-md'
                        }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message?.content}
                        </p>

                        {/* Timestamp */}
                        <div className={`text-xs mt-2 opacity-70 ${isUser ? 'text-right' : 'text-left'
                            }`}>
                            {formatTime(message?.timestamp)}
                        </div>
                    </div>
                </div>

                {/* Sender Name */}
                <div className={`text-xs text-muted-foreground mt-1 px-2 ${isUser ? 'text-right' : 'text-left'
                    }`}>
                    {isUser ? 'You' : 'KhetConnect AI'}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;