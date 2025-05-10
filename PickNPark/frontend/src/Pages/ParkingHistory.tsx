import React, { useEffect, useState } from 'react';
import { ParkingTicket } from './ParkingTicket.tsx';

// interface ParkingHistoryProps {
//   tickets: {
//     id: string;
//     lotName: string;
//     spotNumber: string;
//     location: string;
//     reservedBy: string;
//     reservedAt: string;
//     reservedUntil: string;
//     isActive: boolean;
//   }[];
// }

const ParkingHistory: React.FC = () => {
  const [history, setHistory] = useState([]);
      useEffect(() => {
          const fetchSpots = async () => {
              const token = localStorage.getItem('token');
              const hist = await fetch(`http://localhost:5000/api/parking/user-spots`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
              });
              const histData = await hist.json();
              setHistory(histData.spots);
              console.log(histData.spots);
          };
  
          fetchSpots();
      }, []);
  const validTickets = Array.isArray(history) ? history : [];
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
          <h3 className="text-sm font-medium text-muted-foreground mb-3"></h3>
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
