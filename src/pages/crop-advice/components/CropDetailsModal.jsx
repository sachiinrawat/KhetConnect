import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CropDetailsModal = ({ crop, isOpen, onClose }) => {
    if (!isOpen || !crop) return null;

    const getProfitColor = (margin) => {
        if (margin >= 50000) return 'text-success';
        if (margin >= 30000) return 'text-warning';
        return 'text-error';
    };

    const getSustainabilityColor = (score) => {
        if (score >= 80) return 'bg-success';
        if (score >= 60) return 'bg-warning';
        return 'bg-error';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-background rounded-lg shadow-agricultural-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name="Wheat" size={24} color="var(--color-primary)" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">{crop?.name}</h2>
                            <p className="text-muted-foreground">{crop?.category} • {crop?.scientificName}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <Icon name="X" size={24} />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <div className="text-3xl font-bold text-foreground">{crop?.expectedYield}</div>
                            <div className="text-sm text-muted-foreground">Quintals/Acre</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <div className={`text-3xl font-bold ${getProfitColor(crop?.profitMargin)}`}>
                                ₹{crop?.profitMargin?.toLocaleString('en-IN')}
                            </div>
                            <div className="text-sm text-muted-foreground">Profit/Acre</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <div className="text-3xl font-bold text-foreground">{crop?.sustainabilityScore}%</div>
                            <div className="text-sm text-muted-foreground">Sustainability</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <div className="text-3xl font-bold text-foreground">{crop?.growthPeriod}</div>
                            <div className="text-sm text-muted-foreground">Days to Harvest</div>
                        </div>
                    </div>

                    {/* Sustainability Progress */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-foreground">Environmental Impact Score</span>
                            <span className="text-lg font-bold text-foreground">{crop?.sustainabilityScore}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                            <div
                                className={`h-3 rounded-full transition-all duration-300 ${getSustainabilityColor(crop?.sustainabilityScore)}`}
                                style={{ width: `${crop?.sustainabilityScore}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Detailed Information Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Growing Conditions */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                                <Icon name="Sprout" size={20} color="var(--color-primary)" />
                                <span>Growing Conditions</span>
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Best Planting Season:</span>
                                    <span className="text-foreground font-medium">{crop?.plantingSeason}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Water Requirement:</span>
                                    <span className="text-foreground font-medium">{crop?.waterRequirement}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Soil Type:</span>
                                    <span className="text-foreground font-medium">{crop?.soilType}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Temperature Range:</span>
                                    <span className="text-foreground font-medium">{crop?.temperatureRange}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-muted-foreground">Rainfall Requirement:</span>
                                    <span className="text-foreground font-medium">{crop?.rainfallRequirement}</span>
                                </div>
                            </div>
                        </div>

                        {/* Market & Investment */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                                <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
                                <span>Market & Investment</span>
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Market Demand:</span>
                                    <span className={`font-medium ${crop?.marketDemand === 'High' ? 'text-success' :
                                        crop?.marketDemand === 'Medium' ? 'text-warning' : 'text-error'
                                        }`}>
                                        {crop?.marketDemand}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Investment Level:</span>
                                    <span className="text-foreground font-medium">{crop?.investmentLevel}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Risk Level:</span>
                                    <span className={`font-medium ${crop?.riskLevel === 'Low' ? 'text-success' :
                                        crop?.riskLevel === 'Medium' ? 'text-warning' : 'text-error'
                                        }`}>
                                        {crop?.riskLevel}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-muted-foreground">Market Price Range:</span>
                                    <span className="text-foreground font-medium">{crop?.marketPriceRange}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-muted-foreground">Export Potential:</span>
                                    <span className="text-foreground font-medium">{crop?.exportPotential}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Farming Tips */}
                    <div>
                        <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2 mb-4">
                            <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
                            <span>Farming Tips & Best Practices</span>
                        </h3>
                        <div className="bg-muted rounded-lg p-4">
                            <p className="text-foreground leading-relaxed">{crop?.farmingTips}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button
                            variant="default"
                            iconName="MessageCircle"
                            iconPosition="left"
                            className="flex-1"
                        >
                            Ask AI About This Crop
                        </Button>
                        <Button
                            variant="outline"
                            iconName="BookOpen"
                            iconPosition="left"
                            className="flex-1"
                        >
                            View Growing Guide
                        </Button>
                        <Button
                            variant="secondary"
                            iconName="Share"
                            iconPosition="left"
                            className="flex-1"
                        >
                            Share Recommendation
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDetailsModal;