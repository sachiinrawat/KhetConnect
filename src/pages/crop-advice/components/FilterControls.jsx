import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({
    sortBy,
    setSortBy,
    filterSeason,
    setFilterSeason,
    filterInvestment,
    setFilterInvestment,
    filterLandSize,
    setFilterLandSize,
    onClearFilters
}) => {
    const sortOptions = [
        { value: 'profit', label: 'Highest Profit' },
        { value: 'yield', label: 'Best Yield' },
        { value: 'sustainability', label: 'Most Sustainable' },
        { value: 'recommended', label: 'Recommended First' }
    ];

    const seasonOptions = [
        { value: 'all', label: 'All Seasons' },
        { value: 'kharif', label: 'Kharif (Monsoon)' },
        { value: 'rabi', label: 'Rabi (Winter)' },
        { value: 'zaid', label: 'Zaid (Summer)' }
    ];

    const investmentOptions = [
        { value: 'all', label: 'All Investment Levels' },
        { value: 'low', label: 'Low Investment' },
        { value: 'medium', label: 'Medium Investment' },
        { value: 'high', label: 'High Investment' }
    ];

    const landSizeOptions = [
        { value: 'all', label: 'All Land Sizes' },
        { value: 'small', label: 'Small (< 2 acres)' },
        { value: 'medium', label: 'Medium (2-5 acres)' },
        { value: 'large', label: 'Large (> 5 acres)' }
    ];

    const hasActiveFilters = filterSeason !== 'all' || filterInvestment !== 'all' || filterLandSize !== 'all';

    return (
        <div className="bg-card rounded-lg border shadow-agricultural p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Sort Control */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Icon name="ArrowUpDown" size={20} color="var(--color-muted-foreground)" />
                        <span className="text-sm font-medium text-foreground">Sort by:</span>
                    </div>
                    <Select
                        options={sortOptions}
                        value={sortBy}
                        onChange={setSortBy}
                        className="w-48"
                    />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Select
                        label="Season"
                        options={seasonOptions}
                        value={filterSeason}
                        onChange={setFilterSeason}
                        className="w-full sm:w-40"
                    />

                    <Select
                        label="Investment"
                        options={investmentOptions}
                        value={filterInvestment}
                        onChange={setFilterInvestment}
                        className="w-full sm:w-40"
                    />

                    <Select
                        label="Land Size"
                        options={landSizeOptions}
                        value={filterLandSize}
                        onChange={setFilterLandSize}
                        className="w-full sm:w-40"
                    />

                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            onClick={onClearFilters}
                            iconName="X"
                            iconPosition="left"
                            className="w-full sm:w-auto"
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterControls;