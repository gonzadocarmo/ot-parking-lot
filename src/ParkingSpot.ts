import { VehicleType, VechicleTypeEnum } from "./Vehicle";

// restriction types are a (small) finite/concrete number
// they will not change drastically over time.
// if new ones are to be added, there will be code related to
// what type of restriction it is and how it affects the specific vehicle types

// On the other side, if we consider this to be dynamic (eg: user adding or removing restrictions and how they interact/apply to what vehicle types),
// the enums/types should go away since there's no way to know in advance those names/types.
// At that point, each restriction should have details about what vehicles it applies to and how.
// Instead of checking each of them (hardcoded, lines 49-61), we would loop over all restrictions
// associated to this parking spot and delegate the logic on each of them.

export enum ParkingSpotRestrictionType {
  HANDICAP = "handicap",
  BLOCKED = "blocked"
}
type RestrictionsType = Array<ParkingSpotRestrictionType>;
export class ParkingSpot {
  vehicleTypes: Array<string>;
  restrictions: Array<string>;
  id: number;
  vehicle?: VehicleType;
  constructor(
    id: number,
    vehicleTypes: Array<VechicleTypeEnum>,
    restrictions: RestrictionsType
  ) {
    this.vehicleTypes = [];
    vehicleTypes.map((e) => this.vehicleTypes.push(e));

    this.restrictions = restrictions;
    this.id = id; //assigned by Lot
  }

  isFree() {
    return typeof this.vehicle === "undefined";
  }
  park(vehicle: VehicleType) {
    if (this.canPark(vehicle)) {
      this.vehicle = vehicle;
      return true;
    }
    return false;
  }
  canPark(vehicle: VehicleType) {
    if (this.restrictions.includes("blocked") || !this.isFree()) return false;
    if (!this.vehicleTypes.includes(vehicle.type as string)) return false;

    //handicap
    if (
      !vehicle.hasHandicapPermission &&
      this.restrictions.includes("handicap")
    )
      return false;

    //obstructed
    if (
      vehicle.preferNoObstructedView &&
      this.restrictions.includes("obstructed")
    )
      return false;

    return true;
  }
}

export class CarParkingSpot {
  spot: ParkingSpot;
  constructor(id: number, restrictions: RestrictionsType = []) {
    this.spot = new ParkingSpot(
      id,
      [VechicleTypeEnum.CAR, VechicleTypeEnum.BIKE],
      restrictions
    );
  }

  park(vehicle: VehicleType) {
    return this.spot.park(vehicle);
  }
}

export class BikeParkingSpot {
  spot: ParkingSpot;
  constructor(id: number, restrictions: RestrictionsType = []) {
    this.spot = new ParkingSpot(id, [VechicleTypeEnum.BIKE], restrictions);
  }
  park(vehicle: VehicleType) {
    return this.spot.park(vehicle);
  }
}
