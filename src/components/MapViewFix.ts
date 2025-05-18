
// This is a utility file to fix type errors in MapView.tsx
// The issue is with passing array coordinates to Mapbox

import { LngLatLike } from 'mapbox-gl';

// Helper function to convert number[] to LngLatLike
export function toLngLatLike(coords: number[]): LngLatLike {
  if (coords.length < 2) {
    throw new Error('Coordinates must have at least 2 elements');
  }
  return [coords[0], coords[1]] as [number, number];
}
