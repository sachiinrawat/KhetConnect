import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SoilHealthCard = () => {
    const soilData = {
        ph: 6.8,
        moisture: 65,
        nitrogen: 78,
        phosphorus: 45,
        potassium: 82,
        lastUpdated: "2025-09-28T10:30:00"
    };

    const getStatusColor = (value, type) => {
        switch (type) {
            case 'ph':
                if (value >= 6.0 && value <= 7.5) return 'text-success';
                if (value >= 5.5 && value <= 8.0) return 'text-warning';
                return 'text-destructive';
            case 'moisture':
                if (value >= 60 && value <= 80) return 'text-success';
                if (value >= 40 && value <= 90) return 'text-warning';
                return 'text-destructive';
            case 'npk':
                if (value >= 70) return 'text-success';
                if (value >= 50) return 'text-warning';
                return 'text-destructive';
            default:
                return 'text-muted-foreground';
        }
    };

    const getStatusText = (value, type) => {
        switch (type) {
            case 'ph':
                if (value >= 6.0 && value <= 7.5) return 'Optimal';
                if (value >= 5.5 && value <= 8.0) return 'Good';
                return 'Needs Attention';
            case 'moisture':
                if (value >= 60 && value <= 80) return 'Optimal';
                if (value >= 40 && value <= 90) return 'Good';
                return 'Needs Attention';
            case 'npk':
                if (value >= 70) return 'High';
                if (value >= 50) return 'Medium';
                return 'Low';
            default:
                return 'Unknown';
        }
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon name="Sprout" size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-card-foreground">Soil Health</h2>
                        <p className="text-sm text-muted-foreground">
                            Last updated: {formatTime(soilData?.lastUpdated)}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="RefreshCw" size={16} />
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* pH Level */}
                <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">pH Level</span>
                        <Icon name="Droplets" size={16} className="text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-card-foreground">{soilData?.ph}</span>
                        <span className={`text-sm font-medium ${getStatusColor(soilData?.ph, 'ph')}`}>
                            {getStatusText(soilData?.ph, 'ph')}
                        </span>
                    </div>
                </div>

                {/* Moisture */}
                <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Moisture</span>
                        <Icon name="CloudRain" size={16} className="text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-card-foreground">{soilData?.moisture}%</span>
                        <span className={`text-sm font-medium ${getStatusColor(soilData?.moisture, 'moisture')}`}>
                            {getStatusText(soilData?.moisture, 'moisture')}
                        </span>
                    </div>
                </div>
            </div>
            {/* NPK Values */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-card-foreground">NPK Levels</h3>

                <div className="grid grid-cols-3 gap-4">
                    {/* Nitrogen */}
                    <div className="text-center">
                        <div className="bg-muted/50 rounded-lg p-3 mb-2">
                            <div className="text-lg font-bold text-card-foreground">{soilData?.nitrogen}%</div>
                            <div className={`text-xs font-medium ${getStatusColor(soilData?.nitrogen, 'npk')}`}>
                                {getStatusText(soilData?.nitrogen, 'npk')}
                            </div>
                        </div>
                        <span className="text-sm text-muted-foreground">Nitrogen (N)</span>
                    </div>

                    {/* Phosphorus */}
                    <div className="text-center">
                        <div className="bg-muted/50 rounded-lg p-3 mb-2">
                            <div className="text-lg font-bold text-card-foreground">{soilData?.phosphorus}%</div>
                            <div className={`text-xs font-medium ${getStatusColor(soilData?.phosphorus, 'npk')}`}>
                                {getStatusText(soilData?.phosphorus, 'npk')}
                            </div>
                        </div>
                        <span className="text-sm text-muted-foreground">Phosphorus (P)</span>
                    </div>

                    {/* Potassium */}
                    <div className="text-center">
                        <div className="bg-muted/50 rounded-lg p-3 mb-2">
                            <div className="text-lg font-bold text-card-foreground">{soilData?.potassium}%</div>
                            <div className={`text-xs font-medium ${getStatusColor(soilData?.potassium, 'npk')}`}>
                                {getStatusText(soilData?.potassium, 'npk')}
                            </div>
                        </div>
                        <span className="text-sm text-muted-foreground">Potassium (K)</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    View Detailed Analysis
                </Button>
            </div>
        </div>
    );
};

export default SoilHealthCard;