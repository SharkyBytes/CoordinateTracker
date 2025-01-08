import React, { useState } from 'react';
import {  Plus, Trash2 } from 'lucide-react';
import Map from './components/Map';
import type { Coordinate } from './types/maps';

const sampleCoordinates: Coordinate[] = [
  { latitude: 40.73061, longitude: -73.935242 }, // New York
  { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
  { latitude: 41.8781, longitude: -87.6298 }, // Chicago
  { latitude: 29.7604, longitude: -95.3698 }, // Houston
  { latitude: 39.9526, longitude: -75.1652 }, // Philadelphia
];

export default function App() {
  const [coordinates, setCoordinates] =
    useState<Coordinate[]>(sampleCoordinates);
  const [newLat, setNewLat] = useState('');
  const [newLng, setNewLng] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const isValidUSCoordinate = (lat: number, lng: number) => {
    return (
      lat >= 24.396308 && lat <= 49.384358 && lng >= -125.0 && lng <= -66.93457
    );
  };

  const handleAddCoordinate = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(newLat);
    const lng = parseFloat(newLng);

    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid coordinates');
      return;
    }

    if (!isValidUSCoordinate(lat, lng)) {
      alert('Please enter coordinates within the United States');
      return;
    }

    setCoordinates([...coordinates, { latitude: lat, longitude: lng }]);
    setNewLat('');
    setNewLng('');
  };

  const handleDeleteCoordinate = (index: number) => {
    const newCoordinates = coordinates.filter((_, i) => i !== index);
    setCoordinates(newCoordinates);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🌍 Coordinate Tracker
        </h1>
  
        {/* Input Form */}
        <form
          onSubmit={handleAddCoordinate}
          className="mb-6 bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-stretch space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            type="text"
            placeholder="Latitude"
            value={newLat}
            onChange={(e) => setNewLat(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={newLng}
            onChange={(e) => setNewLng(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Location
          </button>
        </form>
  
        {/* Map Section */}
        <div className="mb-6 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            🗺️ Map of Coordinates
          </h2>
          <Map coordinates={coordinates} onDelete={handleDeleteCoordinate} />
        </div>
  
        {/* Saved Locations Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            📍 Saved Locations
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                    Latitude
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                    Longitude
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {coordinates.map((coord, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Location {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {coord.latitude.toFixed(6)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {coord.longitude.toFixed(6)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteCoordinate(index)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {coordinates.length === 0 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                No locations added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}  