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
    const { parkingLots, setSelectedLot, selectedLocation } = useParkingContext();
    const [locations, setLocations] = useState<MapLocation[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

    useEffect(() => {
        setLocations(parkingLots.map((lot) => ({
            id: lot.id,
            position: { lat: lot.lat, lng: lot.lng },
            title: lot.name,
        })));
    }, [parkingLots]);

    useEffect(() => {
        setMapApiStatus("ready");
    }, []);

    const handleSelectParkingLot = (locationId: string) => {

        setSelectedLocationId(locationId);
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
    <div className="w-screen h-screen overflow-hidden">
      {/* Pass locations and handlers to MapComponent */}
      <MapComponent
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectParkingLot}
        center = { selectedLocation || undefined }
      />

      <div className="absolute top-0 right-0 py-40 px-10 space-y-4 z-10">
        <Card className="w-64 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-base mb-2">Available Parking</h3>
            <div className="space-y-2">
              {locations.map((location) => (
                <Button
                  key={location.id}
                  variant={selectedLocationId === location.id ? "default" : "outline"}
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
