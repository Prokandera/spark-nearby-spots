
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MapView from '@/components/MapView';
import StationList from '@/components/StationList';
import StationDetails from '@/components/StationDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

const MapPage = () => {
  const isMobile = useIsMobile();
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const handleStationSelect = (station: any) => {
    setSelectedStation(station);
    setShowDetails(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6">
        {isMobile ? (
          <div className="h-[calc(100vh-8rem)]">
            <Tabs defaultValue="map" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="flex-1 data-[state=active]:flex data-[state=active]:flex-col h-full">
                <div className="rounded-lg overflow-hidden flex-1">
                  <MapView onStationSelect={handleStationSelect} />
                </div>
              </TabsContent>
              <TabsContent value="list" className="flex-1 data-[state=active]:flex data-[state=active]:flex-col h-full">
                <StationList onStationSelect={handleStationSelect} />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            <div className="lg:col-span-1 overflow-hidden">
              <StationList onStationSelect={handleStationSelect} />
            </div>
            <div className="lg:col-span-2 rounded-lg overflow-hidden h-full">
              <MapView onStationSelect={handleStationSelect} />
            </div>
          </div>
        )}
        
        {selectedStation && (
          <StationDetails
            station={selectedStation}
            open={showDetails}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MapPage;
