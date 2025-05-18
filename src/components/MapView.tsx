
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toLngLatLike } from './MapViewFix';

interface MapViewProps {
  onStationSelect?: (station: any) => void;
}

const MapView = ({ onStationSelect }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  // In a production app, this token would be stored securely
  // This is just a placeholder for this demo
  const PLACEHOLDER_TOKEN = "YOUR_MAPBOX_TOKEN";

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        () => {
          console.log("Unable to retrieve your location");
          // Default location (San Francisco)
          setUserLocation([-122.4194, 37.7749]);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !userLocation || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken || PLACEHOLDER_TOKEN;
    
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 12
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add user location marker
      new mapboxgl.Marker({ color: '#1EAEDB' })
        .setLngLat(userLocation)
        .addTo(map.current);

      // Add sample charging stations (in a real app, these would come from an API)
      const sampleStations = [
        {
          id: 1,
          name: "Downtown Fast Charging",
          coordinates: [userLocation[0] + 0.01, userLocation[1] + 0.01],
          type: "DC Fast",
          power: "50kW",
          available: true,
          price: "$0.40/kWh"
        },
        {
          id: 2,
          name: "Central Mall Chargers",
          coordinates: [userLocation[0] - 0.008, userLocation[1] + 0.005],
          type: "Level 2",
          power: "22kW",
          available: true,
          price: "$0.30/kWh"
        },
        {
          id: 3,
          name: "West Side Supercharger",
          coordinates: [userLocation[0] - 0.015, userLocation[1] - 0.01],
          type: "DC Fast",
          power: "150kW",
          available: false,
          price: "$0.45/kWh"
        }
      ];

      sampleStations.forEach(station => {
        // Create an HTML element for the marker
        const el = document.createElement('div');
        el.className = 'flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md';
        el.innerHTML = `<div class="${station.available ? 'text-green-500' : 'text-red-500'}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-7 7-7 0 2.5 2 4 4 4s4-1.5 4-4-1.5-4-4-4Z"/>
                            <path d="M17 10a3 3 0 0 0-3-3"/>
                            <path d="M5 14a4 4 0 0 0 4 4c2.2 0 4-1.8 4-4"/>
                          </svg>
                        </div>`;
        
        // Add marker to map using toLngLatLike to fix type error
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(toLngLatLike(station.coordinates))
          .addTo(map.current);

        // Add click event to marker
        marker.getElement().addEventListener('click', () => {
          if (onStationSelect) {
            onStationSelect(station);
          }
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [userLocation, mapboxToken, onStationSelect]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      {!mapboxToken && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10 p-6">
          <div className="max-w-md text-center space-y-4">
            <h3 className="text-lg font-bold">Mapbox Token Required</h3>
            <p className="text-gray-600">Please enter your Mapbox token to enable the map. In a real application, this would be stored securely.</p>
            <input 
              type="text" 
              placeholder="Enter your Mapbox token" 
              className="w-full p-2 border rounded"
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-xs text-gray-500">Get a token from <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-blue-500">mapbox.com</a></p>
          </div>
        </div>
      )}
      <div className="absolute top-4 left-4 z-20">
        <Button size="sm" variant="secondary" className="shadow-md flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>Find Nearby</span>
        </Button>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapView;
