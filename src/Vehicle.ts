export type VehicleType = Car | Bike;

// vehicle types are a (small) finite/concrete number
// no issues in having them as enums & classes
// since they will not change drastically over time.
export enum VechicleTypeEnum {
  CAR = "car",
  BIKE = "bike"
}
class Vehicle {
  hasHandicapPermission: boolean;
  preferNoObstructedView: boolean;
  type?: VechicleTypeEnum;
  constructor(type: VechicleTypeEnum) {
    this.hasHandicapPermission = false;
    this.preferNoObstructedView = false;
    this.type = type;
  }
}

export class Car extends Vehicle {
  constructor() {
    super(VechicleTypeEnum.CAR);
  }
}

export class Bike extends Vehicle {
  constructor() {
    super(VechicleTypeEnum.BIKE);
  }
}
