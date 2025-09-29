import React from 'react';
import Icon from '../../../components/AppIcon';

const FarmOverview = () => {
    const farmData = {
        farmName: "Green Valley Farm",
        location: "Maharashtra, India",
        totalArea: 5.2,
        cultivatedArea: 4.8,
        currentCrops: [
            { name: "Wheat", area: 2.1, status: "Growing", health: "Good" },
            { name: "Rice", area: 1.5, status: "Harvesting", health: "Excellent" },
            { name: "Sugarcane", area: 1.2, status: "Planted", health: "Fair" }
        ],
        nextPlanting: "15 days",
        waterLevel: 78,
        lastActivity: "Irrigation completed 2 hours ago"
    };

    const getHealthColor = (health) => {
        switch (health?.toLowerCase()) {
            case 'excellent':
                return 'text-success bg-success/10';
            case 'good':
                return 'text-primary bg-primary/10';
            case 'fair':
                return 'text-warning bg-warning/10';
            case 'poor':
                return 'text-destructive bg-destructive/10';
            default:
                return 'text-muted-foreground bg-muted/10';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'growing':
                return 'Sprout';
            case 'harvesting':
                return 'Scissors';
            case 'planted':
                return 'Seedling';
            default:
                return 'Leaf';
        }
    };

    return (
        <div className="bg-card rounded-lg border shadow-agricultural p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <Icon name="MapPin" size={24} color="var(--color-success)" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-card-foreground">{farmData?.farmName}</h2>
                        <p className="text-sm text-muted-foreground flex items-center">
                            <Icon name="MapPin" size={14} className="mr-1" />
                            {farmData?.location}
                        </p>
                    </div>
                </div>
            </div>
            {/* Farm Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-card-foreground">{farmData?.totalArea}</div>
                    <div className="text-xs text-muted-foreground">Total Acres</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-card-foreground">{farmData?.cultivatedArea}</div>
                    <div className="text-xs text-muted-foreground">Cultivated</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-card-foreground">{farmData?.waterLevel}%</div>
                    <div className="text-xs text-muted-foreground">Water Level</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-card-foreground">{farmData?.nextPlanting}</div>
                    <div className="text-xs text-muted-foreground">Next Planting</div>
                </div>
            </div>
            {/* Current Crops */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-card-foreground">Current Crops</h3>

                <div className="space-y-3">
                    {farmData?.currentCrops?.map((crop, index) => (
                        <div key={index} className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                    <Icon name={getStatusIcon(crop?.status)} size={16} color="var(--color-primary)" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-card-foreground">{crop?.name}</div>
                                    <div className="text-xs text-muted-foreground">{crop?.area} acres • {crop?.status}</div>
                                </div>
                            </div>

                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(crop?.health)}`}>
                                {crop?.health}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Recent Activity */}
            <div className="mt-6 pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>{farmData?.lastActivity}</span>
                </div>
            </div>
        </div>
    );
};

export default FarmOverview;