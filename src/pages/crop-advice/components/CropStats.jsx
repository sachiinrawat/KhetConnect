import React from 'react';
import Icon from '../../../components/AppIcon';

const CropStats = ({ crops, filteredCrops }) => {
    const totalCrops = crops?.length;
    const filteredCount = filteredCrops?.length;
    const recommendedCount = filteredCrops?.filter(crop => crop?.isRecommended)?.length;
    const avgProfitMargin = filteredCrops?.reduce((sum, crop) => sum + crop?.profitMargin, 0) / filteredCount || 0;
    const avgSustainability = filteredCrops?.reduce((sum, crop) => sum + crop?.sustainabilityScore, 0) / filteredCount || 0;

    const stats = [
        {
            icon: 'Wheat',
            label: 'Total Crops',
            value: filteredCount,
            subtext: `of ${totalCrops} available`,
            color: 'text-primary'
        },
        {
            icon: 'Star',
            label: 'Recommended',
            value: recommendedCount,
            subtext: 'for your conditions',
            color: 'text-success'
        },
        {
            icon: 'TrendingUp',
            label: 'Avg. Profit',
            value: `₹${Math.round(avgProfitMargin)?.toLocaleString('en-IN')}`,
            subtext: 'per acre',
            color: 'text-warning'
        },
        {
            icon: 'Leaf',
            label: 'Avg. Sustainability',
            value: `${Math.round(avgSustainability)}%`,
            subtext: 'environmental score',
            color: 'text-success'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats?.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg border shadow-agricultural p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name={stat?.icon} size={20} color="var(--color-primary)" />
                        </div>
                        <div className="flex-1">
                            <div className={`text-2xl font-bold ${stat?.color}`}>
                                {stat?.value}
                            </div>
                            <div className="text-sm text-muted-foreground">{stat?.label}</div>
                            <div className="text-xs text-muted-foreground">{stat?.subtext}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CropStats;