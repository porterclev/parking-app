
import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";

export type ParkingSpot = {
  id: string;
  level: number;
  number: string;
  available: boolean;
  type: "standard" | "handicap" | "electric";
  hourlyRate: number;
};

export type ParkingLot = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  totalSpots: number;
  availableSpots: number;
  levels: number;
  hasElevator: boolean;
  hourlyRate: number;
  dailyRate: number;
  image?: string;
};

export type ReservationDetails = {
  parkingLot: ParkingLot | null;
  parkingSpot: ParkingSpot | null;
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
  cost: number;
};

type ParkingContextType = {
  currentView: "map" | "lotDetails" | "spotSelection" | "payment" | "confirmation";
  setCurrentView: (view: "map" | "lotDetails" | "spotSelection" | "payment" | "confirmation") => void;
  parkingLots: ParkingLot[];
  selectedLot: ParkingLot | null;
  setSelectedLot: (lot: ParkingLot | null) => void;
  selectedLevel: number;
  setSelectedLevel: (level: number) => void;
  availableSpots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  setSelectedSpot: (spot: ParkingSpot | null) => void;
  reservation: ReservationDetails;
  updateReservation: (details: Partial<ReservationDetails>) => void;
  resetReservation: () => void;
  findNearbyParkingLots: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
  setSelectedLocation: (location: { lat: number; lng: number } | null) => void;
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

// Sample parking lot data
const sampleParkingLots: ParkingLot[] = [
  // 33.78606725053306, -118.10844036371701
  {
    id: "lot-1",
    name: "G14",
    address: "123 Main St, Downtown",
    lat: 33.78606725053306,
    lng: -118.10844036371701,
    totalSpots: 150,
    availableSpots: 42,
    levels: 1,
    hasElevator: true,
    hourlyRate: 5,
    dailyRate: 25
  },
  //33.78735274617551, -118.10841781060066
  {
    id: "lot-2",
    name: "G13",
    address: "456 Market St, City Center",
    lat: 33.78735274617551,
    lng: -118.10841781060066,
    totalSpots: 200,
    availableSpots: 65,
    levels: 1,
    hasElevator: true,
    hourlyRate: 6,
    dailyRate: 30
  },
  // 33.78568194199987, -118.10903471868853
  {
    id: "lot-3",
    name: "Parking Structure 2",
    address: "789 West Ave, Westside",
    lat: 33.78568194199987,
    lng: -118.10903471868853,
    totalSpots: 90,
    availableSpots: 12,
    levels: 4,
    hasElevator: false,
    hourlyRate: 4,
    dailyRate: 20
  },
  // 33.787407361649514, -118.1093404905339
  {
    id: "lot-4",
    name: "Parking Structure 3",
    address: "789 West Ave, Westside",
    lat: 33.7874,
    lng: -118.1093,
    totalSpots: 90,
    availableSpots: 12,
    levels: 4,
    hasElevator: false,
    hourlyRate: 4,
    dailyRate: 20
  }
];

// Generate sample parking spots for a specific level and lot
const generateSampleSpots = (lotId: string, level: number): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  const totalSpots = level === 1 ? 30 : level === 2 ? 25 : 20;
  
  for (let i = 1; i <= totalSpots; i++) {
    const spotNumber = `${level}${i.toString().padStart(2, '0')}`;
    const isHandicap = i <= 3;
    const isElectric = i > totalSpots - 5;
    const type = isHandicap ? "handicap" : isElectric ? "electric" : "standard";
    
    spots.push({
      id: `${lotId}-spot-${spotNumber}`,
      level,
      number: spotNumber,
      available: Math.random() > 0.3, // 70% chance of being available
      type,
      hourlyRate: type === "electric" ? 7 : 5
    });
  }
  
  return spots;
};

export const ParkingProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<"map" | "lotDetails" | "spotSelection" | "payment" | "confirmation">("map");
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [reservation, setReservation] = useState<ReservationDetails>({
    parkingLot: null,
    parkingSpot: null,
    startTime: null,
    endTime: null,
    duration: 1,
    cost: 0
  });


  const [nearbyLots, setNearbyLots] = useState<ParkingLot[]>(sampleParkingLots);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // When a new lot is selected, reset the spot selection
  const handleLotSelection = (lot: ParkingLot | null) => {
    setSelectedLot(lot);
    setSelectedSpot(null);
    setSelectedLevel(1);
    
    if (lot) {
      setCurrentView("lotDetails");
    } else {
      setCurrentView("map");
    }
  };

  // Calculate available spots based on selected lot and level
  const availableSpots = selectedLot ? generateSampleSpots(selectedLot.id, selectedLevel) : [];

  const updateReservation = (details: Partial<ReservationDetails>) => {
    setReservation(prev => ({ ...prev, ...details }));
  };

  // Initial nearby listings based on Maps default center.
  useEffect(() => {
    findNearbyParkingLots(33.7859, -118.1089);
  }, []);

  const findNearbyParkingLots = (lat: number, lng: number) => {
    const maxDistance = 5; // 5 km radius
    const nearby = sampleParkingLots.filter(lot => {
      const distance = calculateDistance(lat, lng, lot.lat, lot.lng);
      return distance <= maxDistance;
    });

    setNearbyLots(nearby);
    setSelectedLocation({ lat, lng });
  };

  const resetReservation = () => {
    setReservation({
      parkingLot: null,
      parkingSpot: null,
      startTime: null,
      endTime: null,
      duration: 1,
      cost: 0
    });
    setSelectedLot(null);
    setSelectedSpot(null);
    setSelectedLevel(1);
    setCurrentView("map");
  };

  const value = {
    currentView,
    setCurrentView,
    parkingLots: nearbyLots,
    selectedLot,
    setSelectedLot: handleLotSelection,
    selectedLevel,
    setSelectedLevel,
    availableSpots,
    selectedSpot,
    setSelectedSpot,
    reservation,
    updateReservation,
    resetReservation,
    findNearbyParkingLots,
    selectedLocation,
    setSelectedLocation,
  };

  return <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>;
};

export const useParkingContext = (): ParkingContextType => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParkingContext must be used within a ParkingProvider");
  }
  return context;
};
