
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BatteryCharging, MapPin, Clock, Car, Banknote, Info, X } from 'lucide-react';

interface StationDetailsProps {
  station: any;
  open: boolean;
  onClose: () => void;
}

const StationDetails = ({ station, open, onClose }: StationDetailsProps) => {
  if (!station) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BatteryCharging className="h-5 w-5 text-ev-blue" />
            {station.name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{station.address || "Location information unavailable"}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <Badge variant={station.available ? "default" : "destructive"} className="px-3 py-1">
              {station.available ? 'Available' : 'In Use'}
            </Badge>
            {station.distance && (
              <span className="text-sm text-muted-foreground">{station.distance} away</span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-y-4">
            <div className="flex items-start gap-2">
              <Car className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Charger Type</p>
                <p className="text-sm text-muted-foreground">{station.type}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <BatteryCharging className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Power Output</p>
                <p className="text-sm text-muted-foreground">{station.power}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Banknote className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Pricing</p>
                <p className="text-sm text-muted-foreground">{station.price}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Hours</p>
                <p className="text-sm text-muted-foreground">24/7 Access</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2 pt-2">
            <Info className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Additional Information</p>
              <p className="text-sm text-muted-foreground">
                This charging station is located in a public parking lot. 
                Payment can be made via credit card or through the EV Finder mobile app.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between gap-2 pt-4">
            <Button variant="outline" className="w-full" onClick={onClose}>
              <X className="h-4 w-4 mr-1" /> Close
            </Button>
            <Button className="w-full bg-ev-blue hover:bg-ev-blue/90">
              <MapPin className="h-4 w-4 mr-1" /> Navigate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StationDetails;
