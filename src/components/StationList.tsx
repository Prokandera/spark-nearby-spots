
import React from 'react';
import StationCard from './StationCard';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface StationListProps {
  onStationSelect?: (station: any) => void;
}

const StationList = ({ onStationSelect }: StationListProps) => {
  // Sample data - in a real app, this would come from an API
  const stations = [
    {
      id: 1,
      name: "Downtown Fast Charging",
      address: "123 Main St, San Francisco, CA",
      type: "DC Fast",
      power: "50kW",
      available: true,
      price: "$0.40/kWh",
      distance: "0.5 mi"
    },
    {
      id: 2,
      name: "Central Mall Chargers",
      address: "456 Market St, San Francisco, CA",
      type: "Level 2",
      power: "22kW",
      available: true,
      price: "$0.30/kWh",
      distance: "0.8 mi"
    },
    {
      id: 3,
      name: "West Side Supercharger",
      address: "789 Van Ness Ave, San Francisco, CA",
      type: "DC Fast",
      power: "150kW",
      available: false,
      price: "$0.45/kWh",
      distance: "1.2 mi"
    },
    {
      id: 4,
      name: "North Beach Charging Station",
      address: "100 Bay St, San Francisco, CA",
      type: "Level 2",
      power: "19kW",
      available: true,
      price: "$0.35/kWh",
      distance: "1.5 mi"
    },
    {
      id: 5,
      name: "Mission District Power",
      address: "500 Mission St, San Francisco, CA",
      type: "Level 2",
      power: "22kW",
      available: false,
      price: "$0.32/kWh",
      distance: "2.1 mi"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-4 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search locations..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Charger Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="level2">Level 2</SelectItem>
              <SelectItem value="dcfast">DC Fast</SelectItem>
              <SelectItem value="tesla">Tesla</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stations</SelectItem>
              <SelectItem value="available">Available Now</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {stations.map(station => (
          <StationCard 
            key={station.id} 
            station={station} 
            onClick={() => onStationSelect && onStationSelect(station)}
          />
        ))}
      </div>
    </div>
  );
};

export default StationList;
