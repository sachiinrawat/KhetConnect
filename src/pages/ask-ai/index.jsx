import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import ChatHeader from './components/ChatHeader';

const AskAI = () => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Mock conversation data
    const initialMessages = [
        {
            id: 1,
            content: `Hello! I'm your KhetConnect AI assistant. I can help you with:\n\n• Crop recommendations and planning\n• Pest and disease management\n• Soil health and fertilization\n• Weather-based farming advice\n• Irrigation and water management\n• Market prices and profit optimization\n\nWhat would you like to know about farming today?`,
            isUser: false,
            timestamp: new Date(Date.now() - 300000)
        },
        {
            id: 2,
            content: "My tomato plants are showing yellow leaves. What could be the problem?",
            isUser: true,
            timestamp: new Date(Date.now() - 240000)
        },
        {
            id: 3,
            content: `Yellow leaves on tomato plants can indicate several issues:\n\n🔍 **Most Common Causes:**\n• Overwatering or poor drainage\n• Nitrogen deficiency\n• Early blight disease\n• Natural aging of lower leaves\n\n💡 **Quick Solutions:**\n• Check soil moisture - should be moist but not waterlogged\n• Apply balanced fertilizer (NPK 10-10-10)\n• Remove affected leaves to prevent disease spread\n• Ensure good air circulation\n\n📊 **Monitor:** If yellowing continues upward, it's likely a nutrient issue. If it stays on lower leaves, it's normal aging.\n\nWould you like specific fertilizer recommendations for your soil type?`,
            isUser: false,
            timestamp: new Date(Date.now() - 180000)
        },
        {
            id: 4,
            content: "Yes, please suggest fertilizers. My soil pH is around 6.5 and it's clay soil.",
            isUser: true,
            timestamp: new Date(Date.now() - 120000)
        },
        {
            id: 5,
            content: `Perfect! pH 6.5 is ideal for tomatoes. For clay soil, here are my recommendations:\n\n🌱 **Primary Fertilizer:**\n• NPK 12-12-12 or 10-10-10 (balanced)\n• Apply 2-3 tablespoons per plant every 2 weeks\n\n🏺 **Clay Soil Specific:**\n• Add compost or aged manure to improve drainage\n• Use liquid fertilizers for faster absorption\n• Consider raised beds if drainage is poor\n\n⚡ **Quick Boost Options:**\n• Liquid seaweed fertilizer (weekly)\n• Epsom salt (1 tbsp/plant monthly) for magnesium\n• Bone meal for phosphorus\n\n📅 **Application Schedule:**\n• Week 1-4: High nitrogen for growth\n• Week 5-8: Balanced NPK\n• Week 9+: Lower nitrogen, higher potassium for fruiting\n\nYour clay soil will retain nutrients well, so avoid over-fertilizing!`,
            isUser: false,
            timestamp: new Date(Date.now() - 60000)
        }
    ];

    useEffect(() => {
        setMessages(initialMessages);
    }, []);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const generateAIResponse = (userMessage) => {
        const responses = [
            `Based on your question about "${userMessage?.toLowerCase()}", here are some key insights:\n\n• Consider your local climate conditions\n• Check soil moisture levels regularly\n• Monitor for pest activity\n• Follow recommended spacing guidelines\n\nWould you like more specific advice for your region?`,

            `Great question! For "${userMessage?.toLowerCase()}", I recommend:\n\n🌾 **Best Practices:**\n• Timing is crucial - check weather forecasts\n• Soil preparation is key to success\n• Use quality seeds from trusted sources\n• Plan for proper irrigation\n\n📊 **Expected Results:**\n• Follow up in 2-3 weeks for progress check\n• Monitor growth patterns\n• Adjust care based on plant response\n\nNeed help with implementation steps?`,

            `Excellent farming question! Here's what I suggest for "${userMessage?.toLowerCase()}":\n\n✅ **Immediate Actions:**\n• Assess current conditions\n• Gather necessary materials\n• Plan timing carefully\n• Document your approach\n\n🎯 **Success Factors:**\n• Consistent monitoring\n• Proper technique application\n• Weather consideration\n• Patience and observation\n\nShall I provide more detailed guidance on any specific aspect?`,

            `Thank you for asking about "${userMessage?.toLowerCase()}". Here's my agricultural advice:\n\n🔬 **Technical Approach:**\n• Scientific methods work best\n• Local conditions matter most\n• Experience guides decisions\n• Data helps optimize results\n\n💰 **Economic Considerations:**\n• Cost-benefit analysis important\n• ROI typically seen in 1-2 seasons\n• Quality inputs yield better returns\n• Market timing affects profitability\n\nWould you like cost estimates or market insights?`
        ];

        return responses?.[Math.floor(Math.random() * responses?.length)];
    };

    const handleSendMessage = async (messageContent) => {
        // Add user message
        const userMessage = {
            id: Date.now(),
            content: messageContent,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                content: generateAIResponse(messageContent),
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    return (
        <>
            <Helmet>
                <title>Ask AI - KhetConnect | Agricultural AI Assistant</title>
                <meta name="description" content="Get personalized farming advice from KhetConnect AI. Ask questions about crops, soil, weather, and agricultural best practices." />
            </Helmet>
            <div className="min-h-screen bg-background">
                <Header />

                <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
                    {/* Chat Header */}
                    <ChatHeader isOnline={isOnline} />

                    {/* Chat Messages Area */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto px-4 py-6 pb-32 md:pb-6"
                    >
                        <div className="max-w-4xl mx-auto">
                            {messages?.map((message) => (
                                <ChatMessage
                                    key={message?.id}
                                    message={message}
                                    isUser={message?.isUser}
                                />
                            ))}

                            {isTyping && <TypingIndicator />}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Chat Input */}
                    <ChatInput
                        onSendMessage={handleSendMessage}
                        disabled={isTyping}
                    />
                </div>
            </div>
        </>
    );
};

export default AskAI;