import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSettings = ({ currentLanguage, onLanguageChange, languages }) => {
    const handleLanguageSelect = (selectedValue) => {
        onLanguageChange(selectedValue);
    };

    // Map languages to Select format
    const selectOptions = languages?.map(lang => ({
        label: lang.name || lang.label,
        value: lang.code || lang.value
    }));

    return (
        <div className="bg-card rounded-lg p-6 shadow-agricultural">
            <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon name="Languages" size={20} color="var(--color-primary)" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-card-foreground">Language Settings</h3>
                    <p className="text-sm text-muted-foreground">Choose your preferred language for the application</p>
                </div>
            </div>

            <div className="space-y-4">
                <Select
                    label="Application Language"
                    description="Changes will be applied immediately across all screens"
                    options={selectOptions}
                    value={currentLanguage}
                    onChange={handleLanguageSelect}
                    placeholder="Select language"
                    className="w-full"
                />

                <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                    <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Language Support</p>
                        <p>The application supports both English and Hindi (हिंदी) to help farmers access agricultural guidance in their preferred language.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageSettings;