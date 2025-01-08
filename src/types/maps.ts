export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  city: string;
  state: string;
  neighborhood?: string;
  zipCode?: string;
  formattedAddress?: string;
  timestamp?: string;
}

export interface MarkerInfo extends Coordinate {
  locationInfo?: LocationInfo;
}