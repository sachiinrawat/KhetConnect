import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ isOnline }) => {
    return (
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b p-4 z-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <Icon name="Bot" size={20} color="white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-foreground">KhetConnect AI Assistant</h1>
                            <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                                <span className="text-sm text-muted-foreground">
                                    {isOnline ? 'Online' : 'Offline Mode'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            <Icon name="Zap" size={12} />
                            <span>AI Powered</span>
                        </div>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-muted-foreground">
                        <Icon name="Lightbulb" size={16} className="inline mr-1" />
                        Ask me anything about farming, crops, weather, or agricultural best practices. I'm here to help!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;