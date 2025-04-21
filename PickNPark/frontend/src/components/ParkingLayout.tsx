
import React from 'react';
import { useParkingContext } from '@/context/ParkingContext';
import MapView from './MapView';
import LotDetails from './LotDetails';
import SpotSelection from './SpotSelection';
import PaymentView from './PaymentView';
import ConfirmationView from './ConfirmationView';
import { CircleParking } from 'lucide-react';

const ParkingLayout = () => {
  const { currentView } = useParkingContext();
  
  return (
    <div className="container py-6 max-w-5xl">
      
      <main>
        {currentView === "map" && <MapView />}
        {currentView === "lotDetails" && <LotDetails />}
        {currentView === "spotSelection" && <SpotSelection />}
        {currentView === "payment" && <PaymentView />}
        {currentView === "confirmation" && <ConfirmationView />}
      </main>
    </div>
  );
};

export default ParkingLayout;
