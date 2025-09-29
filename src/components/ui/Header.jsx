import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    React.useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const navigationItems = [
        {
            label: 'Dashboard',
            path: '/dashboard',
            icon: 'BarChart3',
            tooltip: 'View soil and weather data'
        },
        {
            label: 'Crop Advice',
            path: '/crop-advice',
            icon: 'Sprout',
            tooltip: 'Get crop recommendations'
        },
        {
            label: 'Ask AI',
            path: '/ask-ai',
            icon: 'MessageCircle',
            tooltip: 'Get personalized guidance'
        },
        {
            label: 'Settings',
            path: '/settings',
            icon: 'Settings',
            tooltip: 'Configure preferences'
        }];


    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActivePath = (path) => {
        return location?.pathname === path;
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4 lg:px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Icon name="Wheat" size={20} color="white" />
                    </div>
                    <span className="text-xl font-bold text-primary">KhetConnect</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1 ml-8">
                    {navigationItems?.map((item) =>
                        <Button
                            key={item?.path}
                            variant={isActivePath(item?.path) ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleNavigation(item?.path)}
                            iconName={item?.icon}
                            iconPosition="left"
                            iconSize={18}
                            className="transition-agricultural"
                            title={item?.tooltip}>

                            {item?.label}
                        </Button>
                    )}
                </nav>

                {/* Right side items */}
                <div className="ml-auto flex items-center space-x-4">
                    {/* Offline Status Indicator */}
                    {isOffline &&
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Icon name="WifiOff" size={16} />
                            <span className="hidden sm:inline">Offline</span>
                        </div>
                    }

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                // Mobile menu toggle logic would go here
                                console.log('Mobile menu toggle');
                            }}>

                            <Icon name="Menu" size={20} />
                        </Button>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation - Bottom Tab Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t">
                <nav className="flex items-center justify-around py-2 px-4">
                    {navigationItems?.map((item) =>
                        <button
                            key={item?.path}
                            onClick={() => handleNavigation(item?.path)}
                            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-agricultural min-w-0 flex-1 ${isActivePath(item?.path) ?
                                'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`
                            }
                            title={item?.tooltip}>

                            <Icon
                                name={item?.icon}
                                size={20}
                                color={isActivePath(item?.path) ? 'var(--color-primary)' : 'currentColor'} />

                            <span className="text-xs font-medium truncate">{item?.label}</span>
                        </button>
                    )}
                </nav>
            </div>
        </header>);

};

export default Header;