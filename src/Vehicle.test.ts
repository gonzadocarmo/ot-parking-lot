import { Car, Bike, VehicleType } from "./Vehicle";

describe("Vehicle", () => {
  let vehicle: VehicleType;
  describe("car", () => {
    beforeEach(() => {
      vehicle = new Car();
    });

    it('should return "car" type', () => {
      expect(vehicle.type).toEqual("car");
    });
    it("should NOT have handicap permission", () => {
      expect(vehicle.hasHandicapPermission).toEqual(false);
    });
  });

  describe("bike", () => {
    beforeEach(() => {
      vehicle = new Bike();
    });
    it('should return "bike" type', () => {
      expect(vehicle.type).toEqual("bike");
    });
    it("should NOT have handicap permission", () => {
      expect(vehicle.hasHandicapPermission).toEqual(false);
    });
  });
});
