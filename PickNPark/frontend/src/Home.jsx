import React from 'react';
import MapComponent from "./mapcomponent";
import ParkingLot from "./components/ParkingLayout";
import { ParkingProvider, useParkingContext } from './context/ParkingContext';

const Home = () => {
    return (
        <div>
        
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the PickNPark</h1>
        </div>
        <MapComponent />
        </div>
        
    );
};

export default Home;