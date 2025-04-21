
import React from 'react';
import { useParkingContext } from '@/context/ParkingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle, Home, Calendar, Clock, CircleParking, Share2 } from 'lucide-react';

const ConfirmationView = () => {
  const { reservation, resetReservation } = useParkingContext();
  const { parkingLot, parkingSpot, startTime, endTime, duration, cost } = reservation;
  
  if (!parkingLot || !parkingSpot || !startTime || !endTime) {
    return null;
  }
  
  const startTimeFormatted = format(startTime, "p");
  const endTimeFormatted = format(endTime, "p");
  const dateFormatted = format(startTime, "EEEE, MMMM d, yyyy");
  
  return (
    <div className="max-w-lg mx-auto">
      <Card className="border-parking-light">
        <div className="bg-gradient-to-r from-parking to-parking-dark h-2 w-full"></div>
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg space-y-4">
            <div className="flex items-center">
              <CircleParking className="h-5 w-5 mr-3 text-parking" />
              <div>
                <h3 className="font-medium">{parkingLot.name}</h3>
                <p className="text-sm text-muted-foreground">{parkingLot.address}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-parking" />
              <div>
                <h3 className="font-medium">Reservation Date</h3>
                <p className="text-sm text-muted-foreground">{dateFormatted}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-parking" />
              <div>
                <h3 className="font-medium">Reservation Time</h3>
                <p className="text-sm text-muted-foreground">
                  {startTimeFormatted} - {endTimeFormatted} ({duration} {duration === 1 ? 'hour' : 'hours'})
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-dashed border-muted p-4 rounded-lg">
            <div className="text-center">
              <h3 className="font-semibold mb-1">Parking Spot</h3>
              <div className="text-3xl font-bold text-parking">{parkingSpot.number}</div>
              <p className="text-sm text-muted-foreground capitalize">
                {parkingSpot.type} Spot - Level {parkingSpot.level}
              </p>
            </div>
          </div>
          
          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total Paid:</span>
              <span className="font-semibold">${cost.toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Confirmation #: PK-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/50 px-6 py-4">
          <Button 
            onClick={resetReservation} 
            className="w-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Find Another Spot
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfirmationView;
