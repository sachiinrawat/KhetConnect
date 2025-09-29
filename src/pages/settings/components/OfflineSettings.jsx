import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfflineSettings = ({ isOffline, offlineMode, onOfflineModeToggle, lastSyncTime }) => {
    const formatSyncTime = (timestamp) => {
        if (!timestamp) return 'Never';
        const date = new Date(timestamp);
        return date?.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-card rounded-lg p-6 shadow-agricultural">
            <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <Icon name={isOffline ? "WifiOff" : "Wifi"} size={20} color="var(--color-secondary)" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-card-foreground">Offline Mode</h3>
                    <p className="text-sm text-muted-foreground">Access your data even without internet connection</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className={`h-3 w-3 rounded-full ${isOffline ? 'bg-destructive' : 'bg-success'}`}></div>
                        <div>
                            <p className="font-medium text-sm">Connection Status</p>
                            <p className="text-xs text-muted-foreground">
                                {isOffline ? 'Currently offline' : 'Connected to internet'}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last sync</p>
                        <p className="text-sm font-medium">{formatSyncTime(lastSyncTime)}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="font-medium text-sm mb-1">Enable Offline Mode</p>
                        <p className="text-xs text-muted-foreground">Store data locally for offline access</p>
                    </div>
                    <Button
                        variant={offlineMode ? "default" : "outline"}
                        size="sm"
                        onClick={onOfflineModeToggle}
                        iconName={offlineMode ? "Check" : "X"}
                        iconPosition="left"
                        iconSize={16}
                    >
                        {offlineMode ? 'Enabled' : 'Disabled'}
                    </Button>
                </div>

                {offlineMode && (
                    <div className="flex items-start space-x-3 p-4 bg-success/10 rounded-lg border border-success/20">
                        <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium text-success mb-1">Offline Mode Active</p>
                            <p className="text-muted-foreground">Your soil data, weather forecasts, and crop recommendations are stored locally and available offline.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfflineSettings;