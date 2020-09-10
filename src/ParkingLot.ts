import { CarParkingSpot, BikeParkingSpot, ParkingSpot } from "./ParkingSpot";
import { VehicleType } from "./Vehicle";

export class ParkingLot {
  parkingSpots: Array<ParkingSpot>;

  constructor() {
    this.parkingSpots = [
      new CarParkingSpot(["handicap"]),
      new CarParkingSpot(["handicap"]),
      new CarParkingSpot(),
      new BikeParkingSpot(["blocked"]),
      new BikeParkingSpot(["handicap"]),
      new BikeParkingSpot(["blocked"])
    ];
  }
  park(vehicle: VehicleType) {
    const eligibleParkingSpot = this.parkingSpots.find((e) => e.park(vehicle));
    if (typeof eligibleParkingSpot === "undefined")
      throw Error("no spots available");

    return eligibleParkingSpot;
  }
}
