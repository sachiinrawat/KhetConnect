import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import SoilHealthCard from './components/SoilHealthCard';
import WeatherCard from './components/WeatherCard';
import QuickActions from './components/QuickActions';
import FarmOverview from './components/FarmOverview';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        // Check localStorage for saved language preference
        const savedLanguage = localStorage.getItem('khetconnect-language') || 'en';
        setCurrentLanguage(savedLanguage);

        // Set greeting based on time of day
        const hour = new Date()?.getHours();
        if (hour < 12) {
            setGreeting(savedLanguage === 'hi' ? 'सुप्रभात' : 'Good Morning');
        } else if (hour < 17) {
            setGreeting(savedLanguage === 'hi' ? 'नमस्कार' : 'Good Afternoon');
        } else {
            setGreeting(savedLanguage === 'hi' ? 'शुभ संध्या' : 'Good Evening');
        }
    }, []);

    const translations = {
        en: {
            title: 'Dashboard',
            subtitle: 'Monitor your farm\'s health and get insights',
            welcomeBack: 'Welcome back, Farmer!',
            overview: 'Farm Overview'
        },
        hi: {
            title: 'डैशबोर्ड',
            subtitle: 'अपने खेत के स्वास्थ्य की निगरानी करें और जानकारी प्राप्त करें',
            welcomeBack: 'वापसी पर स्वागत है, किसान जी!',
            overview: 'खेत का अवलोकन'
        }
    };

    const t = translations?.[currentLanguage];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Icon name="Home" size={24} color="var(--color-primary)" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                {greeting}
                            </h1>
                            <p className="text-muted-foreground">{t?.welcomeBack}</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground ml-15">
                        {t?.subtitle}
                    </p>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left Column - Primary Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Soil Health and Weather Cards */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <SoilHealthCard />
                            <WeatherCard />
                        </div>

                        {/* Farm Overview */}
                        <FarmOverview />
                    </div>

                    {/* Right Column - Quick Actions */}
                    <div className="lg:col-span-1">
                        <QuickActions />
                    </div>
                </div>

                {/* Bottom Section - Additional Info */}
                <div className="bg-card rounded-lg border shadow-agricultural p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-card-foreground">Farm Performance</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your farm is performing 15% better than last season
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-success">+15%</div>
                            <div className="text-xs text-muted-foreground">vs last season</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;