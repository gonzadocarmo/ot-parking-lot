import {
  CarParkingSpot,
  BikeParkingSpot,
  ParkingSpotRestrictionType
} from "./ParkingSpot";
import { VehicleType } from "./Vehicle";

export class ParkingLot {
  parkingSpots: Array<CarParkingSpot | BikeParkingSpot>;

  constructor() {
    this.parkingSpots = [
      new CarParkingSpot(1, [ParkingSpotRestrictionType.HANDICAP]),
      new CarParkingSpot(2, [ParkingSpotRestrictionType.HANDICAP]),
      new CarParkingSpot(3),
      new BikeParkingSpot(4, [ParkingSpotRestrictionType.BLOCKED]),
      new BikeParkingSpot(5, [ParkingSpotRestrictionType.HANDICAP]),
      new BikeParkingSpot(6, [ParkingSpotRestrictionType.BLOCKED])
    ];
  }
  park(vehicle: VehicleType) {
    const eligibleParkingSpot = this.parkingSpots.find((e) => e.park(vehicle));
    if (typeof eligibleParkingSpot === "undefined")
      throw Error("no spots available");

    return eligibleParkingSpot;
  }
}
