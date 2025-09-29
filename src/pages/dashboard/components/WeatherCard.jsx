import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherCard = () => {
    const weatherData = {
        temperature: 28,
        humidity: 72,
        precipitation: 15,
        windSpeed: 12,
        uvIndex: 6,
        condition: "Partly Cloudy",
        forecast: [
            { day: "Today", high: 28, low: 22, condition: "Partly Cloudy", precipitation: 15 },
            { day: "Tomorrow", high: 30, low: 24, condition: "Sunny", precipitation: 5 },
            { day: "Day 3", high: 26, low: 20, condition: "Rainy", precipitation: 80 },
            { day: "Day 4", high: 25, low: 19, condition: "Cloudy", precipitation: 40 }
        ],
        lastUpdated: "2025-09-28T10:45:00"
    };

    const getWeatherIcon = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'sunny':
                return 'Sun';
            case 'partly cloudy':
                return 'CloudSun';
            case 'cloudy':
                return 'Cloud';
            case 'rainy':
                return 'CloudRain';
            case 'stormy':
                return 'CloudLightning';
            default:
                return 'Sun';
        }
    };

    const getPrecipitationColor = (percentage) => {
        if (percentage >= 70) return 'text-destructive';
        if (percentage >= 40) return 'text-warning';
        if (percentage >= 20) return 'text-primary';
        return 'text-success';
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date?.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="bg-card rounded-lg border shadow-agricultural p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                        <Icon name={getWeatherIcon(weatherData?.condition)} size={24} color="var(--color-secondary)" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-card-foreground">Weather Forecast</h2>
                        <p className="text-sm text-muted-foreground">
                            Last updated: {formatTime(weatherData?.lastUpdated)}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="RefreshCw" size={16} />
                </Button>
            </div>
            {/* Current Weather */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <Icon name={getWeatherIcon(weatherData?.condition)} size={48} color="var(--color-secondary)" />
                        <div>
                            <div className="text-3xl font-bold text-card-foreground">{weatherData?.temperature}°C</div>
                            <div className="text-sm text-muted-foreground">{weatherData?.condition}</div>
                        </div>
                    </div>
                    <div className={`text-right ${getPrecipitationColor(weatherData?.precipitation)}`}>
                        <div className="text-lg font-semibold">{weatherData?.precipitation}%</div>
                        <div className="text-xs text-muted-foreground">Rain Chance</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <Icon name="Droplets" size={20} className="mx-auto mb-1 text-muted-foreground" />
                        <div className="text-sm font-medium text-card-foreground">{weatherData?.humidity}%</div>
                        <div className="text-xs text-muted-foreground">Humidity</div>
                    </div>
                    <div>
                        <Icon name="Wind" size={20} className="mx-auto mb-1 text-muted-foreground" />
                        <div className="text-sm font-medium text-card-foreground">{weatherData?.windSpeed} km/h</div>
                        <div className="text-xs text-muted-foreground">Wind Speed</div>
                    </div>
                    <div>
                        <Icon name="Sun" size={20} className="mx-auto mb-1 text-muted-foreground" />
                        <div className="text-sm font-medium text-card-foreground">{weatherData?.uvIndex}</div>
                        <div className="text-xs text-muted-foreground">UV Index</div>
                    </div>
                </div>
            </div>
            {/* 4-Day Forecast */}
            <div className="space-y-3">
                <h3 className="text-lg font-medium text-card-foreground">4-Day Forecast</h3>

                <div className="space-y-2">
                    {weatherData?.forecast?.map((day, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <Icon name={getWeatherIcon(day?.condition)} size={20} color="var(--color-muted-foreground)" />
                                <span className="text-sm font-medium text-card-foreground min-w-[60px]">
                                    {day?.day}
                                </span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <span className="text-sm font-medium text-card-foreground">{day?.high}°</span>
                                    <span className="text-sm text-muted-foreground ml-1">{day?.low}°</span>
                                </div>
                                <div className={`text-xs font-medium ${getPrecipitationColor(day?.precipitation)} min-w-[30px] text-right`}>
                                    {day?.precipitation}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                    <Icon name="CloudSun" size={16} className="mr-2" />
                    View Extended Forecast
                </Button>
            </div>
        </div>
    );
};

export default WeatherCard;