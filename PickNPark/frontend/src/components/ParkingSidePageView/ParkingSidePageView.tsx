import { useState } from 'react';
import { Input } from "@/Pages/ui/input";
import { Button } from "@/Pages/ui/button.tsx";
import { Calendar } from "@/Pages/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Pages/ui/popover";
import { useParkingContext } from "@/context/ParkingContext";
import { CalendarIcon, Clock, Navigation, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/Pages/ui/use-toast";


const ParkingSidePageView = () => {
    const [address, setAddress] = useState("");
    const [date, setDate] = useState<Date>();
    const [startTime, setStartTime] = useState("12:00");
    const [endTime, setEndTime] = useState("13:00");

    const [isLoading, setIsLoading] = useState(false);

    const { findNearbyParkingLots } = useParkingContext();
    const { toast } = useToast();

    const geocodeAddress = async (address: string) => {
        // For demo purposes, using Geocoding API directly
        // In production, this should go through a backend service
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        }
        throw new Error("Location not found");
    };

    const handleSearch = async () => {
        if (!address.trim()) {
            toast({
                title: "Address Required",
                description: "Please enter an address to search for parking spots.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const location = await geocodeAddress(address);
            findNearbyParkingLots(location.lat, location.lng);
            toast({
                title: "Location Found",
                description: "Showing nearby parking spots.",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Could not find the specified location. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" flex flex-col justify-start items-center w-10/12 h-screen ">
            <div className="text-4xl font-bold p-10">
                <h2 >Ready to book your parking</h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Find Parking Near You</h2>

                <div className="space-y-6">
                    <div className="relative">
                        <Navigation className="absolute left-3 top-3 text-spot-darkGray" size={20} />
                        <Input
                            type="text"
                            placeholder="Enter address, place, or event"
                            className="pl-10"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Date</p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        className={cn("p-3 pointer-events-auto")}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Time Range</p>
                                <div className="flex space-x-2">
                                    <div className="relative flex-grow">
                                        <Clock className="absolute left-3 top-3 text-spot-darkGray" size={18} />
                                        <select
                                            className="h-10 w-full pl-10 pr-2 rounded-md border border-input bg-background"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        >
                                            {Array.from({ length: 24 }).map((_, i) => (
                                                <option key={i} value={`${i}:00`}>
                                                    {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <span className="flex items-center">to</span>

                                    <div className="relative flex-grow">
                                        <Clock className="absolute left-3 top-3 text-spot-darkGray" size={18} />
                                        <select
                                            className="h-10 w-full pl-10 pr-2 rounded-md border border-input bg-background"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        >
                                            {Array.from({ length: 24 }).map((_, i) => (
                                                <option key={i} value={`${i}:00`}>
                                                    {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full bg-spot-blue hover:bg-spot-darkBlue text-white py-6 text-lg font-medium "
                        onClick={handleSearch}
                    >
                        <Search size={20} className="mr-2" />
                        Search for Parking
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ParkingSidePageView;
