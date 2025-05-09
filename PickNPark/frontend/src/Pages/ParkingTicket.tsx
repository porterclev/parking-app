
import React from 'react';
import { Card } from '@/Pages/ui/card';
import { Clock, Calendar, CarFront, Ticket } from 'lucide-react';

interface ParkingTicketProps {
    id: string;
    spotNumber: string;
    location: string;
    reservedBy: string;
    reservedAt: string;
    reservedUntil: string;
    isActive: boolean;
}

export const ParkingTicket: React.FC<ParkingTicketProps> = ({
  id,
  location,
  spotNumber,
  reservedAt,
  reservedBy,
  reservedUntil,
  isActive,
}) => {
  return (
    <Card className={`overflow-hidden card-hover ${isActive ? 'animate-pulse-scale border-primary border-2' : ''}`}>
      <div className="relative">
        <div className="absolute top-0 right-0 m-4">
          <div className={`flex items-center ${isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'} px-2 py-1 rounded-full text-xs font-medium`}>
            <div className={`w-2 h-2 rounded-full mr-1.5 ${isActive ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
            {isActive ? 'Active' : 'Completed'}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start text-left">
            <Ticket className="w-8 h-8 text-primary opacity-80 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{location}</h3>
              <p className="text-muted-foreground text-sm mt-1">Spot {spotNumber}</p>
            </div>
          </div>
          
          {/* <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-muted-foreground mr-2" />
              <span className="text-sm">{reservedAt}</span>
            </div>
            <div className="flex items-center">
              <CarFront className="w-4 h-4 text-muted-foreground mr-2" />
              <span className="text-sm">Ticket #{id.slice(-4)}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Cost</span>
            <span className="text-lg font-semibold">${0}</span>
          </div> */}
        </div>
      </div>
    </Card>
  );
};
