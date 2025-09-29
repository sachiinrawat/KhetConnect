import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CropCard from './components/CropCard';
import FilterControls from './components/FilterControls';
import CropDetailsModal from './components/CropDetailsModal';
import CropStats from './components/CropStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CropAdvice = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('recommended');
    const [filterSeason, setFilterSeason] = useState('all');
    const [filterInvestment, setFilterInvestment] = useState('all');
    const [filterLandSize, setFilterLandSize] = useState('all');
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock crop data
    const crops = [
        {
            id: 1,
            name: "Basmati Rice",
            category: "Cereal",
            scientificName: "Oryza sativa",
            expectedYield: 25,
            profitMargin: 65000,
            sustainabilityScore: 85,
            plantingSeason: "Kharif",
            growthPeriod: 120,
            waterRequirement: "High",
            soilType: "Clay loam",
            temperatureRange: "20-35°C",
            rainfallRequirement: "1000-1200mm",
            marketDemand: "High",
            investmentLevel: "Medium",
            riskLevel: "Low",
            marketPriceRange: "₹3,500-4,200/quintal",
            exportPotential: "Excellent",
            isRecommended: true,
            farmingTips: `Basmati rice requires well-drained clay loam soil with good water retention capacity. Maintain water level of 2-5 cm during vegetative growth. Apply organic manure before transplanting and use balanced NPK fertilizers. Monitor for pests like stem borer and leaf folder regularly.`
        },
        {
            id: 2,
            name: "Wheat",
            category: "Cereal",
            scientificName: "Triticum aestivum",
            expectedYield: 40,
            profitMargin: 45000,
            sustainabilityScore: 78,
            plantingSeason: "Rabi",
            growthPeriod: 110,
            waterRequirement: "Medium",
            soilType: "Loamy",
            temperatureRange: "15-25°C",
            rainfallRequirement: "300-400mm",
            marketDemand: "High",
            investmentLevel: "Low",
            riskLevel: "Low",
            marketPriceRange: "₹2,100-2,400/quintal",
            exportPotential: "Good",
            isRecommended: true,
            farmingTips: `Wheat grows best in well-drained loamy soil. Sow seeds at 2-3 cm depth with proper spacing. Apply nitrogen in split doses - half at sowing and half at tillering stage. Ensure adequate irrigation during grain filling stage.`
        },
        {
            id: 3,
            name: "Sugarcane",
            category: "Cash Crop",
            scientificName: "Saccharum officinarum",
            expectedYield: 800,
            profitMargin: 85000,
            sustainabilityScore: 65,
            plantingSeason: "Kharif",
            growthPeriod: 365,
            waterRequirement: "Very High",
            soilType: "Deep fertile",
            temperatureRange: "20-30°C",
            rainfallRequirement: "1500-2500mm",
            marketDemand: "High",
            investmentLevel: "High",
            riskLevel: "Medium",
            marketPriceRange: "₹350-400/quintal",
            exportPotential: "Limited",
            isRecommended: false,
            farmingTips: `Sugarcane requires deep, fertile, well-drained soil with good organic matter content. Plant healthy seed canes with 2-3 buds. Maintain adequate moisture throughout the growing period. Apply heavy doses of organic manure and balanced fertilizers.`
        },
        {
            id: 4,
            name: "Cotton",
            category: "Fiber Crop",
            scientificName: "Gossypium hirsutum",
            expectedYield: 18,
            profitMargin: 55000,
            sustainabilityScore: 70,
            plantingSeason: "Kharif",
            growthPeriod: 180,
            waterRequirement: "Medium",
            soilType: "Black cotton soil",
            temperatureRange: "21-30°C",
            rainfallRequirement: "500-1000mm",
            marketDemand: "High",
            investmentLevel: "Medium",
            riskLevel: "Medium",
            marketPriceRange: "₹5,500-6,200/quintal",
            exportPotential: "Excellent",
            isRecommended: true,
            farmingTips: `Cotton thrives in black cotton soil with good drainage. Maintain plant spacing of 45-60 cm between rows. Apply balanced fertilizers and ensure adequate potassium supply. Monitor for bollworm and whitefly infestations regularly.`
        },
        {
            id: 5,
            name: "Tomato",
            category: "Vegetable",
            scientificName: "Solanum lycopersicum",
            expectedYield: 300,
            profitMargin: 75000,
            sustainabilityScore: 82,
            plantingSeason: "Rabi",
            growthPeriod: 90,
            waterRequirement: "Medium",
            soilType: "Well-drained loamy",
            temperatureRange: "18-25°C",
            rainfallRequirement: "600-800mm",
            marketDemand: "Very High",
            investmentLevel: "Medium",
            riskLevel: "Medium",
            marketPriceRange: "₹800-1,500/quintal",
            exportPotential: "Good",
            isRecommended: true,
            farmingTips: `Tomatoes require well-drained, fertile soil rich in organic matter. Transplant seedlings at 4-6 weeks age. Provide support with stakes or cages. Apply balanced fertilizers and ensure consistent moisture. Protect from late blight and fruit borer.`
        },
        {
            id: 6,
            name: "Maize",
            category: "Cereal",
            scientificName: "Zea mays",
            expectedYield: 35,
            profitMargin: 38000,
            sustainabilityScore: 75,
            plantingSeason: "Kharif",
            growthPeriod: 100,
            waterRequirement: "Medium",
            soilType: "Well-drained fertile",
            temperatureRange: "21-27°C",
            rainfallRequirement: "500-750mm",
            marketDemand: "High",
            investmentLevel: "Low",
            riskLevel: "Low",
            marketPriceRange: "₹1,800-2,200/quintal",
            exportPotential: "Good",
            isRecommended: false,
            farmingTips: `Maize grows well in well-drained fertile soil with pH 6.0-7.5. Plant seeds at 3-5 cm depth with proper spacing. Apply nitrogen fertilizer in split doses. Ensure adequate water during tasseling and grain filling stages.`
        },
        {
            id: 7,
            name: "Soybean",
            category: "Oilseed",
            scientificName: "Glycine max",
            expectedYield: 20,
            profitMargin: 42000,
            sustainabilityScore: 88,
            plantingSeason: "Kharif",
            growthPeriod: 95,
            waterRequirement: "Medium",
            soilType: "Well-drained loamy",
            temperatureRange: "20-30°C",
            rainfallRequirement: "450-700mm",
            marketDemand: "High",
            investmentLevel: "Low",
            riskLevel: "Low",
            marketPriceRange: "₹3,800-4,500/quintal",
            exportPotential: "Excellent",
            isRecommended: true,
            farmingTips: `Soybean is a nitrogen-fixing legume that improves soil fertility. Inoculate seeds with Rhizobium bacteria before sowing. Maintain proper plant population and weed control. Apply phosphorus and potassium fertilizers as per soil test recommendations.`
        },
        {
            id: 8,
            name: "Onion",
            category: "Vegetable",
            scientificName: "Allium cepa",
            expectedYield: 250,
            profitMargin: 68000,
            sustainabilityScore: 76,
            plantingSeason: "Rabi",
            growthPeriod: 120,
            waterRequirement: "Medium",
            soilType: "Sandy loam",
            temperatureRange: "15-25°C",
            rainfallRequirement: "650-750mm",
            marketDemand: "Very High",
            investmentLevel: "Medium",
            riskLevel: "Medium",
            marketPriceRange: "₹1,200-2,800/quintal",
            exportPotential: "Excellent",
            isRecommended: false,
            farmingTips: `Onions require well-drained sandy loam soil with good organic matter. Transplant seedlings at 6-8 weeks age with proper spacing. Apply balanced fertilizers and ensure consistent moisture. Harvest when tops start yellowing and falling over.`
        }
    ];

    // Filter and sort crops
    const filteredAndSortedCrops = useMemo(() => {
        let filtered = crops?.filter(crop => {
            const seasonMatch = filterSeason === 'all' || crop?.plantingSeason?.toLowerCase() === filterSeason;
            const investmentMatch = filterInvestment === 'all' || crop?.investmentLevel?.toLowerCase() === filterInvestment;
            const landSizeMatch = filterLandSize === 'all' ||
                (filterLandSize === 'small' && crop?.investmentLevel === 'Low') ||
                (filterLandSize === 'medium' && crop?.investmentLevel === 'Medium') ||
                (filterLandSize === 'large' && crop?.investmentLevel === 'High');

            return seasonMatch && investmentMatch && landSizeMatch;
        });

        // Sort crops
        filtered?.sort((a, b) => {
            switch (sortBy) {
                case 'profit':
                    return b?.profitMargin - a?.profitMargin;
                case 'yield':
                    return b?.expectedYield - a?.expectedYield;
                case 'sustainability':
                    return b?.sustainabilityScore - a?.sustainabilityScore;
                case 'recommended':
                    if (a?.isRecommended && !b?.isRecommended) return -1;
                    if (!a?.isRecommended && b?.isRecommended) return 1;
                    return b?.profitMargin - a?.profitMargin;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [crops, sortBy, filterSeason, filterInvestment, filterLandSize]);

    const handleViewDetails = (crop) => {
        setSelectedCrop(crop);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCrop(null);
    };

    const handleClearFilters = () => {
        setFilterSeason('all');
        setFilterInvestment('all');
        setFilterLandSize('all');
    };

    const handleAskAI = () => {
        navigate('/ask-ai');
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
                {/* Page Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Crop Recommendations</h1>
                        <p className="text-muted-foreground">
                            Discover the best crops for your farm with detailed yield predictions and profitability analysis
                        </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                        <Button
                            variant="outline"
                            onClick={handleAskAI}
                            iconName="MessageCircle"
                            iconPosition="left"
                        >
                            Ask AI for Advice
                        </Button>
                        <Button
                            variant="default"
                            iconName="Download"
                            iconPosition="left"
                        >
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Crop Statistics */}
                <CropStats crops={crops} filteredCrops={filteredAndSortedCrops} />

                {/* Filter Controls */}
                <FilterControls
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    filterSeason={filterSeason}
                    setFilterSeason={setFilterSeason}
                    filterInvestment={filterInvestment}
                    setFilterInvestment={setFilterInvestment}
                    filterLandSize={filterLandSize}
                    setFilterLandSize={setFilterLandSize}
                    onClearFilters={handleClearFilters}
                />

                {/* Crop Cards Grid */}
                {filteredAndSortedCrops?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredAndSortedCrops?.map((crop) => (
                            <CropCard
                                key={crop?.id}
                                crop={crop}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                            <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">No crops found</h3>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your filters to see more crop recommendations
                        </p>
                        <Button variant="outline" onClick={handleClearFilters}>
                            Clear All Filters
                        </Button>
                    </div>
                )}

                {/* Help Section */}
                <div className="mt-12 bg-primary/5 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2">Need Help Choosing?</h3>
                            <p className="text-muted-foreground mb-4">
                                Our AI assistant can help you select the best crops based on your specific soil conditions,
                                climate, and farming goals. Get personalized recommendations tailored to your farm.
                            </p>
                            <Button
                                variant="default"
                                onClick={handleAskAI}
                                iconName="MessageCircle"
                                iconPosition="left"
                            >
                                Chat with AI Assistant
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Crop Details Modal */}
            <CropDetailsModal
                crop={selectedCrop}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default CropAdvice;