import React from 'react';
import { ParkingTicket } from './ParkingTicket.tsx';

interface ParkingHistoryProps {
  tickets: {
    id: string;
    spotNumber: string;
    location: string;
    reservedBy: string;
    reservedAt: string;
    reservedUntil: string;
    isActive: boolean;
  }[];
}

const ParkingHistory: React.FC<ParkingHistoryProps> = ({ tickets }) => {
  const validTickets = Array.isArray(tickets) ? tickets : [];
  const activeTickets = validTickets.filter(ticket => ticket.isActive);
  const pastTickets = validTickets.filter(ticket => !ticket.isActive);
  return (
    <div className="space-y-6">
      {activeTickets.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3"></h3>
          <div className="space-y-4">
            {activeTickets.map(ticket => (
              <ParkingTicket key={ticket.id} {...ticket} />
            ))}
          </div>
        </div>
      )}

      {pastTickets.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Past Parking</h3>
          <div className="space-y-4">
            {pastTickets.map(ticket => (
              <ParkingTicket key={ticket.id} {...ticket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ParkingHistory;
