
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BatteryCharging, MapPin, CarFront } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StationCardProps {
  station: {
    id: number;
    name: string;
    type: string;
    power: string;
    available: boolean;
    price: string;
    distance?: string;
    address?: string;
  };
  onClick?: () => void;
}

const StationCard = ({ station, onClick }: StationCardProps) => {
  return (
    <Card 
      className="station-card overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="bg-ev-blue/10 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BatteryCharging className="h-5 w-5 text-ev-blue" />
              <h3 className="font-medium">{station.name}</h3>
            </div>
            <Badge variant={station.available ? "default" : "destructive"}>
              {station.available ? 'Available' : 'In Use'}
            </Badge>
          </div>
          
          <div className="p-4 flex flex-col gap-3">
            {station.address && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{station.address}</span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Type:</span> 
                <span className="font-medium">{station.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Power:</span> 
                <span className="font-medium">{station.power}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Price:</span> 
                <span className="font-medium">{station.price}</span>
              </div>
              {station.distance && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Distance:</span> 
                  <span className="font-medium">{station.distance}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-2">
              {station.available ? (
                <div className="flex items-center gap-2">
                  <div className="pulse-dot"></div>
                  <span className="text-sm text-green-600 font-medium">Ready to use</span>
                </div>
              ) : (
                <span className="text-sm text-red-500">Currently unavailable</span>
              )}
              
              <Button size="sm" className="bg-ev-blue hover:bg-ev-blue/90">
                <CarFront className="h-4 w-4 mr-1" /> Navigate
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StationCard;
