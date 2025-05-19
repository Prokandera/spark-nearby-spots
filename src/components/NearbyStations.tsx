
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, BatteryCharging, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Station {
  id: number;
  name: string;
  distance: string;
  type: string;
  available: boolean;
}

interface NearbyStationsProps {
  onNavigate?: (station: Station) => void;
}

const NearbyStations = ({ onNavigate }: NearbyStationsProps) => {
  const [nearbyStations, setNearbyStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [hasArrived, setHasArrived] = useState(false);
  
  // Simulate fetching nearby stations
  useEffect(() => {
    // In a real app, this would use the user's location to find actual nearby stations
    const fetchStations = () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const mockStations = [
          { id: 1, name: "Downtown Fast Charging", distance: "0.5 mi", type: "DC Fast", available: true },
          { id: 2, name: "Central Mall Chargers", distance: "0.8 mi", type: "Level 2", available: true },
          { id: 3, name: "West Side Supercharger", distance: "1.2 mi", type: "DC Fast", available: false }
        ];
        setNearbyStations(mockStations);
        setLoading(false);
      }, 1000);
    };
    
    fetchStations();
  }, []);
  
  const handleNavigate = (station: Station) => {
    setSelectedStation(station);
    if (onNavigate) {
      onNavigate(station);
    }
    
    // Simulate navigation and arrival at the station
    toast.info(`Navigating to ${station.name}...`);
    
    // In a real app, this would be based on actual GPS location updates
    setTimeout(() => {
      setHasArrived(true);
      toast.success(`You've arrived at ${station.name}!`, {
        description: "You can now begin charging your vehicle.",
        duration: 5000
      });
    }, 3000);
  };
  
  const handleStartCharging = () => {
    if (!selectedStation) return;
    
    toast.success(`Charging started at ${selectedStation.name}`, {
      description: "Your vehicle is now charging. You'll receive a notification when complete.",
      icon: <Zap className="h-4 w-4" />,
      duration: 5000
    });
  };
  
  return (
    <div className="space-y-4 mt-3">
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ev-blue"></div>
          <span className="ml-2 text-gray-600">Finding nearby stations...</span>
        </div>
      ) : (
        <>
          {selectedStation && hasArrived ? (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <BatteryCharging className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium">Ready to charge at {selectedStation.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">Connect your vehicle to begin charging</p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700" 
                    onClick={handleStartCharging}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Start Charging Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">
                {nearbyStations.length} charging stations found nearby
              </p>
              {nearbyStations.map(station => (
                <Card key={station.id} className={station.available ? "" : "opacity-60"}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{station.name}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">{station.distance}</span>
                          <span>•</span>
                          <span className="ml-2">{station.type}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-ev-blue text-ev-blue hover:bg-ev-blue/10"
                        onClick={() => handleNavigate(station)}
                        disabled={!station.available}
                      >
                        <Navigation className="mr-1 h-4 w-4" />
                        Navigate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NearbyStations;
