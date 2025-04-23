import { ParkingProvider } from '@/context/ParkingContext';
import ParkingLayout from '@/components/Lots/ParkingLayout';
const FindParking = () => {
    return (
        <>
        
        <div>
            <h2>Book your parking space, for $40 a week</h2>
            <ul>
                <li>Space guarantee 9 months in advance</li>
                <li>Reduced rate compared to the on-site price</li>
                <li>Free cancellation reservation</li>
                <li>No additional charge</li>
            </ul>
            <button>More Information</button>
        </div>
        
        <div>
            <div className="discover-section">
                <h2>Discover all car parks</h2>
                <h3>Select your car park and book your space online</h3>
            </div>
            <div>
                <p>searchbar</p>
            </div>
        </div>

        <div className="map-section">
            <h2>Find your parking space</h2>
            <ParkingProvider>
                <ParkingLayout />
            </ParkingProvider>
        </div>
        </>
        
    );
  };
  
  export default FindParking;
  