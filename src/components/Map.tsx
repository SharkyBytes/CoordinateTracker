import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Navigation, Building2, Clock, Trash2 } from 'lucide-react';
import type { MarkerInfo, Coordinate } from '../types/maps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 39.8283,
  lng: -98.5795
};

interface MapProps {
  coordinates: Coordinate[];
  onDelete: (index: number) => void;
}

export default function Map({ coordinates, onDelete }: MapProps) {
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo & { index: number } | null>(null);

  useEffect(() => {
    const fetchLocationInfo = async (coord: Coordinate) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coord.latitude},${coord.longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        
        if (data.results && data.results[0]) {
          const addressComponents = data.results[0].address_components;
          const formattedAddress = data.results[0].formatted_address;
          
          const city = addressComponents.find((component: any) => 
            component.types.includes('locality'))?.long_name || '';
          const state = addressComponents.find((component: any) => 
            component.types.includes('administrative_area_level_1'))?.long_name || '';
          const neighborhood = addressComponents.find((component: any) => 
            component.types.includes('neighborhood'))?.long_name || '';
          const zipCode = addressComponents.find((component: any) => 
            component.types.includes('postal_code'))?.long_name || '';
          
          return {
            city,
            state,
            neighborhood,
            zipCode,
            formattedAddress,
            timestamp: new Date().toLocaleString()
          };
        }
        return null;
      } catch (error) {
        console.error('Error fetching location info:', error);
        return null;
      }
    };

    const loadMarkers = async () => {
      const markersWithInfo = await Promise.all(
        coordinates.map(async (coord) => {
          const locationInfo = await fetchLocationInfo(coord);
          return {
            ...coord,
            locationInfo
          };
        })
      );
      setMarkers(markersWithInfo);
    };

    loadMarkers();
  }, [coordinates]);

  const handleMarkerClick = useCallback((marker: MarkerInfo, index: number) => {
    setSelectedMarker({ ...marker, index });
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => handleMarkerClick(marker, index)}
          />
        ))}

        {selectedMarker && selectedMarker.locationInfo && (
          <InfoWindow
            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-4 max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-lg text-gray-900">
                    {selectedMarker.locationInfo.city}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    onDelete(selectedMarker.index);
                    setSelectedMarker(null);
                  }}
                  className="p-1 hover:bg-red-50 rounded-full text-red-600 transition-colors"
                  title="Delete marker"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-gray-600" />
                  <p>
                    <span className="font-medium">Coordinates:</span><br />
                    {selectedMarker.latitude.toFixed(4)}, {selectedMarker.longitude.toFixed(4)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <div>
                    <p><span className="font-medium">State:</span> {selectedMarker.locationInfo.state}</p>
                    {selectedMarker.locationInfo.neighborhood && (
                      <p><span className="font-medium">Neighborhood:</span> {selectedMarker.locationInfo.neighborhood}</p>
                    )}
                    {selectedMarker.locationInfo.zipCode && (
                      <p><span className="font-medium">ZIP:</span> {selectedMarker.locationInfo.zipCode}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <p className="text-gray-500 text-xs">
                    Added: {selectedMarker.locationInfo.timestamp}
                  </p>
                </div>

                <p className="text-xs text-gray-600 mt-2 pt-2 border-t">
                  {selectedMarker.locationInfo.formattedAddress}
                </p>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}