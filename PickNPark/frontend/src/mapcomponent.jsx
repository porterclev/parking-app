import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return <p>Error: Google Maps API key is missing.</p>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 33.7701, lng: -118.1937 }} // New York City
        defaultZoom={10}
        gestureHandling={'greedy'}
        disableDefaultUI={false}
      >
        <Marker position={{ lat: 33.7701, lng: -118.1937}} />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;