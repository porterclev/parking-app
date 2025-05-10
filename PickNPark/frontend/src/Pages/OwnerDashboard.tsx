
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Pages/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/Pages/ui/card';
import { ParkingLotForm } from '@/components/owner/ParkingLotForm';
import { Plus, Building, MapPin } from 'lucide-react';


const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [parkingLots, setParkingLots] = useState([]);
  const handleAddLot = async (newLot) => {
    console.log('New Parking Lot:', newLot);
    const token = localStorage.getItem('token');  
    const response = await fetch('http://localhost:5000/api/parking/createParking',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newLot),
    });
    setShowForm(false);
  };

  React.useEffect(() => {
    const fetchParkingLots = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/owner/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("data:",data);
      setParkingLots(data.parkingLots);
    };
    fetchParkingLots();
  }, []);
  console.log("parking:",parkingLots);

  const removeClick = async (lotId) => {
    console.log('Removing Parking Lot:', lotId);
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/parking/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: lotId }),
    });
    if (response.ok) {
      setParkingLots(parkingLots.filter(lot => lot.id !== lotId));
    }
  };
  return (
    <div className="py-4 space-y-6">
      <div className="mb-4 flex justify-between items-center">
        <div>
          {/* <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-medium">Owner Dashboard</span> */}
          <h1 className="text-2xl font-bold mt-2">Manage Parking Lots</h1>
        </div>
        {/* <Button 
          onClick={() => setShowForm(true)} 
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Parking Lot
        </Button> */}
      </div>
      
      {showForm ? (
        <Card className="mb-6 border-2 border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle>Add New Parking Lot</CardTitle>
            <CardDescription>Fill in the details to create a new parking lot</CardDescription>
          </CardHeader>
          <CardContent>
            <ParkingLotForm onSubmit={handleAddLot} onCancel={() => setShowForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          className="w-full py-8 border-dashed border-2 hover:border-primary/50 text-muted-foreground gap-2"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-5 w-5" />
          Click to add a new parking lot
        </Button>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {parkingLots.map((lot) => (
          <Card key={lot.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                {lot.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {lot.address}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Spots</p>
                  <p className="font-medium">{lot.totalSpots}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Available</p>
                  <p className="font-medium">{lot.availableSpots}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rate</p>
                  <p className="font-medium">${lot.hourlyRate}/hr</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-1 border-t">
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => removeClick(lot.id)}>
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;
