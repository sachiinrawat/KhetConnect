import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            id: 1,
            title: "Get Crop Advice",
            description: "Personalized recommendations for your farm",
            icon: "Wheat",
            color: "bg-primary/10 text-primary",
            path: "/crop-advice",
            urgent: false
        },
        {
            id: 2,
            title: "Ask AI Assistant",
            description: "Get instant answers to farming questions",
            icon: "MessageCircle",
            color: "bg-accent/10 text-accent",
            path: "/ask-ai",
            urgent: false
        },
        {
            id: 3,
            title: "Weather Alert",
            description: "Heavy rain expected in 2 days",
            icon: "AlertTriangle",
            color: "bg-warning/10 text-warning",
            path: "/dashboard",
            urgent: true
        },
        {
            id: 4,
            title: "Soil Analysis",
            description: "Schedule soil testing for next week",
            icon: "TestTube",
            color: "bg-secondary/10 text-secondary",
            path: "/dashboard",
            urgent: false
        }
    ];

    const handleActionClick = (path) => {
        navigate(path);
    };

    return (
        <div className="bg-card rounded-lg border shadow-agricultural p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <Icon name="Zap" size={24} color="var(--color-accent)" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-card-foreground">Quick Actions</h2>
                        <p className="text-sm text-muted-foreground">
                            Recommended actions for today
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions?.map((action) => (
                    <div
                        key={action?.id}
                        className={`relative bg-muted/30 rounded-lg p-4 border transition-agricultural hover:shadow-agricultural-lg cursor-pointer ${action?.urgent ? 'border-warning/30' : 'border-transparent'
                            }`}
                        onClick={() => handleActionClick(action?.path)}
                    >
                        {action?.urgent && (
                            <div className="absolute -top-2 -right-2 h-4 w-4 bg-warning rounded-full flex items-center justify-center">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                            </div>
                        )}

                        <div className="flex items-start space-x-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action?.color}`}>
                                <Icon name={action?.icon} size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-card-foreground mb-1">
                                    {action?.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {action?.description}
                                </p>
                            </div>
                            <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Need help getting started?</span>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/ask-ai')}>
                        <Icon name="HelpCircle" size={16} className="mr-2" />
                        Ask AI
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;