import { ParkingProvider } from '@/context/ParkingContext';
import ParkingLayout from '@/components/Lots/ParkingLayout';
import ParkingSidePageView from "../components/ParkingSidePageView/ParkingSidePageView.js";
const FindParking = () => {
    return (
        <>
            <section className="flex flex-row w-screen h-full">
                <ParkingProvider>
                    <ParkingSidePageView>

                    </ParkingSidePageView>
                    <div className="w-screen ">
                        <ParkingLayout/>
                    </div>
                </ParkingProvider>
            </section>
        </>
        
    );
  };
  
  export default FindParking;
  