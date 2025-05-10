import React from 'react';
import { useParkingContext} from '@/context/ParkingContext';
import { Button } from '@/Pages/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Pages/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Pages/ui/tabs';
import { ArrowLeft, Accessibility, Zap, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';

const SpotSelection = () => {
  const { 
    selectedLot, 
    selectedLevel, 
    setSelectedLevel, 
    availableSpots, 
    selectedSpot,
    setSelectedSpot,
    setCurrentView
  } = useParkingContext();
  
  if (!selectedLot) return null;
  
  const handleBackToLotDetails = () => {
    setCurrentView("lotDetails");
    setSelectedSpot(null);
  };
  
  const handleReserveSpot = () => {
    if (selectedSpot) {
      setCurrentView("payment");
    }
  };
  
  // Create tabs for each level
  const levelTabs = [];
  for (let i = 1; i <= selectedLot.levels; i++) {
    levelTabs.push(
      <TabsTrigger key={`level-${i}`} value={i.toString()}>
        Level {i}
      </TabsTrigger>
    );
  }
  
  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={handleBackToLotDetails} 
        className="mb-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Lot Details
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{selectedLot.name} - Select a Parking Spot</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue={selectedLevel.toString()} 
            onValueChange={(value) => setSelectedLevel(parseInt(value))}
            className="w-full"
          >
            <TabsList className="w-full">
              {levelTabs}
            </TabsList>
            
            <div className="h-6"></div>
            
            {Array.from({ length: selectedLot.levels }).map((_, index) => {
              const level = index + 1;
              return (
                <TabsContent key={`level-content-${level}`} value={level.toString()}>
                  <div className="w-full h-full bg-muted/30 p-4 rounded-md">
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                      {availableSpots
                        .filter(spot => spot.level === level)
                        .map(spot => {
                          const isSelected = selectedSpot?.id === spot.id;
                          const isAvailable = spot.available;
                          let SpotIcon = null;
                          
                          if (spot.type === "handicap") SpotIcon = Accessibility;
                          else if (spot.type === "electric") SpotIcon = Zap;
                          else if (!isAvailable) SpotIcon = Ban;
                          
                          return (
                            <Button
                              key={spot.id}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              disabled={!isAvailable}
                              className={cn(
                                "h-16 flex flex-col justify-center items-center p-1",
                                isSelected && "bg-parking hover:bg-parking/90",
                                !isAvailable && "bg-muted cursor-not-allowed opacity-70",
                                isAvailable && !isSelected && "hover:bg-parking-light hover:text-parking-dark"
                              )}
                              onClick={() => isAvailable && setSelectedSpot(spot)}
                            >
                              {SpotIcon && (
                                <SpotIcon className="h-4 w-4 mb-1" />
                              )}
                              <span className="text-xs font-semibold">{spot.number}</span>
                            </Button>
                          );
                        })}
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-sm bg-parking mr-2"></div>
                        <span className="text-sm">Selected</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-sm bg-white border border-muted-foreground mr-2"></div>
                        <span className="text-sm">Available</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-sm bg-muted mr-2"></div>
                        <span className="text-sm">Unavailable</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/50 px-6 py-4">
          <Button 
            onClick={handleReserveSpot} 
            className="w-full"
            disabled={!selectedSpot}
          >
            {selectedSpot ? `Reserve Spot ${selectedSpot.number}` : "Select a Spot"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SpotSelection;
