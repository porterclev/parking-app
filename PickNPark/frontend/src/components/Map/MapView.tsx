import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "../../Pages/ui/card";
import { useParkingContext } from '../../context/ParkingContext';
import { Button } from '../../Pages/ui/button';
import { MapPin } from 'lucide-react';
import MapComponent from '../../mapcomponent';

type MapLocation = {
  id: string;
  position: { lat: number; lng: number };
  title: string;
};

const MapView = () => {
  const [mapApiStatus, setMapApiStatus] = useState<"loading" | "ready" | "error">("loading");
  const { parkingLots, setSelectedLot } = useParkingContext();

  const [locations] = useState<MapLocation[]>(
    parkingLots.map((lot) => ({
      id: lot.id,
      position: { lat: lot.lat, lng: lot.lng },
      title: lot.name,
    }))
  );
  
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    setMapApiStatus("ready");
  }, []);

  const handleSelectParkingLot = (locationId: string) => {
    setSelectedLocation(locationId);
    const lot = parkingLots.find((lot) => lot.id === locationId);
    if (lot) {
      setSelectedLot(lot);
    }
  };

  if (mapApiStatus === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-lg font-medium">Loading Map...</p>
      </div>
    );
  }

  if (mapApiStatus === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-lg font-medium text-destructive mb-2">Unable to load map</p>
        <p className="text-muted-foreground mb-4">Please check your connection and try again.</p>
        <Button onClick={() => setMapApiStatus("loading")} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-lg border border-border">
      {/* Pass locations and handlers to MapComponent */}
      <MapComponent
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectParkingLot}
      />

      <div className="absolute top-0 right-0 p-4">
        <Card className="w-64 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-base mb-2">Available Parking</h3>
            <div className="space-y-2">
              {locations.map((location) => (
                <Button
                  key={location.id}
                  variant={selectedLocation === location.id ? "default" : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => handleSelectParkingLot(location.id)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="truncate">{location.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;
