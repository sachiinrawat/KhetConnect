import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';


const ChatInput = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (message?.trim() && !disabled) {
            onSendMessage(message?.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e?.key === 'Enter' && !e?.shiftKey) {
            e?.preventDefault();
            handleSubmit(e);
        }
    };

    const handleVoiceInput = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-IN';

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event) => {
                const transcript = event?.results?.[0]?.[0]?.transcript;
                setMessage(transcript);
                setIsListening(false);
            };

            recognition.onerror = () => {
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition?.start();
        } else {
            alert('Speech recognition is not supported in your browser');
        }
    };

    return (
        <div className="sticky bottom-0 bg-background border-t p-4">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="flex items-end space-x-2">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Ask me anything about farming..."
                            value={message}
                            onChange={(e) => setMessage(e?.target?.value)}
                            onKeyPress={handleKeyPress}
                            disabled={disabled}
                            className="resize-none"
                        />
                    </div>

                    {/* Voice Input Button */}
                    <Button
                        type="button"
                        variant={isListening ? "default" : "outline"}
                        size="icon"
                        onClick={handleVoiceInput}
                        disabled={disabled}
                        className="flex-shrink-0"
                        title="Voice input"
                    >
                        <Icon
                            name={isListening ? "MicOff" : "Mic"}
                            size={20}
                            color={isListening ? "white" : "currentColor"}
                        />
                    </Button>

                    {/* Send Button */}
                    <Button
                        type="submit"
                        variant="default"
                        size="icon"
                        disabled={!message?.trim() || disabled}
                        className="flex-shrink-0"
                        title="Send message"
                    >
                        <Icon name="Send" size={20} color="white" />
                    </Button>
                </form>

                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {[
                        "What crops should I plant this season?",
                        "How to control pest in tomatoes?",
                        "Best irrigation schedule for wheat?"
                    ]?.map((suggestion, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="xs"
                            onClick={() => setMessage(suggestion)}
                            disabled={disabled}
                            className="text-xs"
                        >
                            {suggestion}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatInput;