
import React from 'react';
import { ParkingProvider } from '@/context/ParkingContext';
import ParkingLayout from '@/components/ParkingLayout';

const Index = () => {
  return (
    <ParkingProvider>
      <ParkingLayout />
    </ParkingProvider>
  );
};

export default Index;
