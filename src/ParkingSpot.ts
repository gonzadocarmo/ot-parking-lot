import { v4 as uuidv4 } from "uuid";
import { VehicleType } from "./Vehicle";

export class ParkingSpot {
  vehicleTypes: Array<string>;
  restrictions: Array<string>;
  isFree: boolean;
  id: string;
  vehicle?: VehicleType;
  constructor(vehicleTypes: Array<string>, restrictions: Array<string>) {
    this.vehicleTypes = [];
    vehicleTypes.map((e) => this.vehicleTypes.push(e));

    this.restrictions = restrictions;
    this.isFree = true;
    this.id = uuidv4();
  }
  park(vehicle: VehicleType) {
    if (this.restrictions.includes("blocked") || !this.isFree) return false;
    if (!this.vehicleTypes.includes(vehicle.type as string)) return false;

    //handicap
    if (
      this.restrictions.includes("handicap") &&
      !vehicle.hasHandicapPermission
    )
      return false;

    //obstructed
    if (
      this.restrictions.includes("obstructed") &&
      vehicle.preferNoObstructedView
    )
      return false;

    //... so on more restrictions check

    this.vehicle = vehicle;
    this.isFree = false; //could be derived from having vehicle or not, later
    return true;
  }
}

type RestrictionsType = Array<string> | undefined;
export class CarParkingSpot extends ParkingSpot {
  constructor(restrictions: RestrictionsType = []) {
    super(["car", "bike"], restrictions);
  }
}

export class BikeParkingSpot extends ParkingSpot {
  constructor(restrictions: RestrictionsType = []) {
    super(["bike"], restrictions);
  }
}
