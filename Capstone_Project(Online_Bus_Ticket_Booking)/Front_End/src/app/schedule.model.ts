export interface BusSchedule {
    scheduleId?: number;
    busName: string;
    busNumber: string;
    busType: string;
    numofSeats: number;
    origin: string;
    destination: string;
    timings: string;
    fare: number;
  }
  