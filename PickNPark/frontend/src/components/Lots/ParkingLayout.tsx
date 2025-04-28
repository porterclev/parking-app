
import React from 'react';
import { useParkingContext } from '@/context/ParkingContext';
import MapView from '../Map/MapView';
import LotDetails from './LotDetails';
import SpotSelection from './SpotSelection';
import PaymentView from '../Payment/PaymentView';
import ConfirmationView from '../Payment/ConfirmationView';

const ParkingLayout = () => {
  const { currentView } = useParkingContext();
  
  return (
    <div className="container max-w-5xl">
      
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
