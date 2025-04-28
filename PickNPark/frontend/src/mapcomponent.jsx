import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import {useParkingContext} from "./context/ParkingContext.js";

const MapComponent = ({ locations, selectedLocation, onSelectLocation, center }) => {

    const  { findNearbyParkingLots } = useParkingContext()
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return <p>Error: Google Maps API key is missing.</p>;
  }

  const getMarkerIcon = (isSelected) => {
    const size = isSelected ? 20 : 12;
    const fillColor = isSelected ? '#0EA5E9' : '#FFFFFF';
    return {
      url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2-1}" fill="${fillColor}" stroke="#0EA5E9" stroke-width="2"/></svg>`,
      scaledSize: { width: size, height: size },
    };
  };
  locations.forEach(location => {
    console.log(location.position);
  });
  console.log(locations);
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{ lat: 33.7859, lng: -118.1089 }} // csulb
        defaultZoom={17}
        center={ center }
        gestureHandling="greedy"
        onCenterChanged= { (center) => {
            findNearbyParkingLots(
                center.map.getCenter().lat(),
                center.map.getCenter().lng()
            )
        }}
        disableDefaultUI={false}
        options={{
          disableDefaultUI: true, // Removes all default UI
          clickableIcons: false,  // Optional: Prevent default POIs from being clickable
        }}
      >
        {locations.map((location) => {
          console.log("Rendering marker for:", location);
          console.log("Marker icon for location:", getMarkerIcon(selectedLocation === location.id));
          return (
            <Marker
              key={location.id}
              position={location.position}
              onClick={() => onSelectLocation(location.id)}
              icon={getMarkerIcon(selectedLocation === location.id)}
            />
          );
        })}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;