export type VehicleType = Car | Bike;

class Vehicle {
  hasHandicapPermission: boolean;
  preferNoObstructedView: boolean;
  type: string | undefined;
  constructor() {
    this.hasHandicapPermission = false;
    this.preferNoObstructedView = false;
  }
}

export class Car extends Vehicle {
  constructor() {
    super();
    this.type = "car";
  }
}

export class Bike extends Vehicle {
  constructor() {
    super();
    this.type = "bike";
  }
}
