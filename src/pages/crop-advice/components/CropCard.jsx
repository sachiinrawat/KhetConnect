import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CropCard = ({ crop, onViewDetails }) => {
    const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="bg-card rounded-lg border shadow-agricultural p-6 transition-agricultural hover:shadow-agricultural-lg">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="Wheat" size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-card-foreground">{crop?.name}</h3>
                        <p className="text-sm text-muted-foreground">{crop?.category}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {crop?.isRecommended && (
                        <div className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                            Recommended
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <Icon
                            name={isExpanded ? "ChevronUp" : "ChevronDown"}
                            size={20}
                        />
                    </Button>
                </div>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{crop?.expectedYield}</div>
                    <div className="text-sm text-muted-foreground">Quintals/Acre</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                    <div className={`text-2xl font-bold ${getProfitColor(crop?.profitMargin)}`}>
                        ₹{crop?.profitMargin?.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-muted-foreground">Profit/Acre</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{crop?.sustainabilityScore}%</div>
                    <div className="text-sm text-muted-foreground">Sustainability</div>
                </div>
            </div>
            {/* Sustainability Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Environmental Impact</span>
                    <span className="text-sm text-muted-foreground">{crop?.sustainabilityScore}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getSustainabilityColor(crop?.sustainabilityScore)}`}
                        style={{ width: `${crop?.sustainabilityScore}%` }}
                    ></div>
                </div>
            </div>
            {/* Expanded Details */}
            {isExpanded && (
                <div className="border-t pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Planting Details</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Best Season:</span>
                                    <span className="text-foreground">{crop?.plantingSeason}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Growth Period:</span>
                                    <span className="text-foreground">{crop?.growthPeriod} days</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Water Requirement:</span>
                                    <span className="text-foreground">{crop?.waterRequirement}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Market Information</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Market Demand:</span>
                                    <span className={`font-medium ${crop?.marketDemand === 'High' ? 'text-success' :
                                        crop?.marketDemand === 'Medium' ? 'text-warning' : 'text-error'
                                        }`}>
                                        {crop?.marketDemand}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Investment Level:</span>
                                    <span className="text-foreground">{crop?.investmentLevel}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Risk Level:</span>
                                    <span className={`font-medium ${crop?.riskLevel === 'Low' ? 'text-success' :
                                        crop?.riskLevel === 'Medium' ? 'text-warning' : 'text-error'
                                        }`}>
                                        {crop?.riskLevel}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button
                            variant="default"
                            onClick={() => onViewDetails(crop)}
                            iconName="Eye"
                            iconPosition="left"
                            className="flex-1"
                        >
                            View Full Details
                        </Button>
                        <Button
                            variant="outline"
                            iconName="MessageCircle"
                            iconPosition="left"
                            className="flex-1"
                        >
                            Ask AI About This Crop
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropCard;