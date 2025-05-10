import React from 'react';
import { useParkingContext } from '@/context/ParkingContext';
import { Button } from '@/Pages/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Pages/ui/card';
import { Badge } from '@/Pages/ui/badge';
import { ArrowLeft, CircleParking, Car, Clock, DollarSign, MapPin, User } from 'lucide-react';

const LotDetails = () => {
  const { selectedLot, setCurrentView, setSelectedLot } = useParkingContext();
  
  if (!selectedLot) {
    return null;
  }
  
  const handleBackToMap = () => {
    setSelectedLot(null);
  };
  
  const handleFindSpot = () => {
    setCurrentView("spotSelection");
  };
  
  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={handleBackToMap} 
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Map
      </Button>
      
      <Card className="overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-parking-light to-parking bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-white text-parking hover:bg-white/90">
              <CircleParking className="h-4 w-4 mr-1" />
              {selectedLot.availableSpots} spots available
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle>{selectedLot.name}</CardTitle>
          <CardDescription>{selectedLot.address}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Car className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{selectedLot.totalSpots} Total Spots</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>${selectedLot.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{selectedLot.levels} Levels</span>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{selectedLot.ownerName}</span>
            </div>
          </div>
          
          <div className="bg-muted p-3 rounded-md mb-2">
            <h4 className="font-medium mb-1">Features</h4>
            <div className="flex flex-wrap gap-2">
              {/* <Badge variant="outline">Covered</Badge>
              <Badge variant="outline">Security</Badge> */}
              {selectedLot.hasElevator && <Badge variant="outline">Elevator</Badge>}
              {/* <Badge variant="outline">24/7 Access</Badge> */}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/50 px-6 py-4">
          <Button onClick={handleFindSpot} className="w-full">
            Find a Spot
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LotDetails;
