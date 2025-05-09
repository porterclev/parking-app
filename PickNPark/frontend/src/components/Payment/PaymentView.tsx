
import React, { useState } from 'react';
import { useParkingContext } from '@/context/ParkingContext';
import { Button } from '@/Pages/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Pages/ui/card';
import { Input } from '@/Pages/ui/input';
import { Label } from '@/Pages/ui/label';
import { ArrowLeft, Clock, CalendarIcon, CreditCard, CheckCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Pages/ui/popover';
import { Calendar } from '@/Pages/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Pages/ui/select';
import { useNavigate } from 'react-router-dom';

const PaymentView = () => {
  const { selectedLot, selectedSpot, setCurrentView, updateReservation, reservation } = useParkingContext();
  const [startTime, setStartTime] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState<string>("1");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  if (!selectedLot || !selectedSpot) return null;
  
  const handleBackToSpotSelection = () => {
    setCurrentView("spotSelection");
  };
  
  const handlePayment = () => {
    if (!startTime) return;
    
    setPaymentProcessing(true);
    
    const durationHours = parseInt(duration);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + durationHours);
    
    const cost = selectedSpot.hourlyRate * durationHours;
    
    // Simulate payment processing
    setTimeout(() => {
      updateReservation({
        parkingLot: selectedLot,
        parkingSpot: selectedSpot,
        startTime: startTime,
        endTime: endTime,
        duration: durationHours,
        cost
      });
      
      setCurrentView("confirmation");
    }, 1500);
    goToStripe
  };
  
  // Generate time slots for the select
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      const period = i < 12 ? 'AM' : 'PM';
      const displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i;
      options.push(
        <SelectItem key={`time-${i}`} value={`${hour}:00`}>
          {displayHour}:00 {period}
        </SelectItem>
      );
      options.push(
        <SelectItem key={`time-${i}-30`} value={`${hour}:30`}>
          {displayHour}:30 {period}
        </SelectItem>
      );
    }
    return options;
  };
  
  const handleStartTimeChange = (time: string) => {
    if (!startTime) return;
    
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(startTime);
    newDate.setHours(hours, minutes);
    setStartTime(newDate);
  };
  
  const handleDurationChange = (value: string) => {
    setDuration(value);
  };
  
  const calculateCost = () => {
    const durationHours = parseInt(duration);
    return selectedSpot.hourlyRate * durationHours;
  };

  const navigate = useNavigate();

  const goToStripe = () => {
    navigate('/checkout');

  };
  
  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={handleBackToSpotSelection} 
        className="mb-2"
        disabled={paymentProcessing}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Spot Selection
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Reserve Your Parking Spot</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Reservation Details</h3>
                <div className="bg-muted/30 p-3 rounded-md space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Location:</div>
                    <div className="text-sm">{selectedLot.name}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Parking Spot:</div>
                    <div className="text-sm">#{selectedSpot.number}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Type:</div>
                    <div className="text-sm capitalize">{selectedSpot.type}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Rate:</div>
                    <div className="text-sm">${selectedSpot.hourlyRate}/hr</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startTime && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startTime ? format(startTime, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startTime}
                      onSelect={(date) => setStartTime(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Select onValueChange={handleStartTimeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions()}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select value={duration} onValueChange={handleDurationChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">1 day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-accent p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total Cost:</span>
                  <span className="text-xl font-semibold">${calculateCost().toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Includes all taxes and fees
                </div>
              </div>
            </div>
            
            
          </div>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/50 px-6 py-4">
          <Button 
            onClick={handlePayment} 
            className="w-full"
            disabled={paymentProcessing}
          >
            {paymentProcessing ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${calculateCost().toFixed(2)} & Reserve`
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentView;
