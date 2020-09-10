import { CarParkingSpot, BikeParkingSpot, ParkingSpot } from "./ParkingSpot";
import { Car, Bike } from "./Vehicle";

describe("ParkingSpot", () => {
  let noRestrictionsSpot: ParkingSpot;
  let blockedSpot: ParkingSpot;
  let busySpot: ParkingSpot;
  describe("CarParkingSpot", () => {
    beforeEach(() => {
      noRestrictionsSpot = new CarParkingSpot();
      blockedSpot = new CarParkingSpot(["blocked"]);
      busySpot = new CarParkingSpot();
      busySpot.isFree = false;
    });

    describe("when trying to park a car", () => {
      it("should return true", () => {
        const car = new Car();
        const result = noRestrictionsSpot.park(car);
        expect(result).toBeTruthy();
      });
      describe("when spot is blocked", () => {
        it("should return false", () => {
          const car = new Car();
          const result = blockedSpot.park(car);
          expect(result).toBeFalsy();
        });
      });
      describe("when spot is busy", () => {
        it("should return false", () => {
          const car = new Car();
          const result = busySpot.park(car);
          expect(result).toBeFalsy();
        });
      });
      describe("when non-handicap car", () => {
        const car = new Car();
        describe("and no restrictions", () => {
          it("should return true", () => {
            const result = noRestrictionsSpot.park(car);
            expect(result).toBeTruthy();
          });
        });
        describe("and restrictions", () => {
          describe("when handicap restriction", () => {
            const handicapSpot = new CarParkingSpot(["handicap"]);
            it("should return false", () => {
              const result = handicapSpot.park(car);
              expect(result).toBeFalsy();
            });
          });
          describe("when obstructed view restriction", () => {
            car.preferNoObstructedView = true;
            const obstructedSpot = new CarParkingSpot(["obstructed"]);
            it("should return false", () => {
              const result = obstructedSpot.park(car);
              expect(result).toBeFalsy();
            });
          });
        });
      });
      describe("and handicap car", () => {
        const car = new Car();
        car.hasHandicapPermission = true;
        describe("and spot w/o restrictions", () => {
          it("should return true", () => {
            const result = noRestrictionsSpot.park(car);
            expect(result).toBeTruthy();
          });
        });
        describe("and spot w/ restrictions", () => {
          describe("when handicap restriction", () => {
            const handicapSpot = new CarParkingSpot(["handicap"]);
            it("should return true", () => {
              const result = handicapSpot.park(car);
              expect(result).toBeTruthy();
            });
          });
          describe("when obstructed view restriction", () => {
            car.preferNoObstructedView = true;
            const obstructedSpot = new CarParkingSpot(["obstructed"]);
            it("should return false", () => {
              const result = obstructedSpot.park(car);
              expect(result).toBeFalsy();
            });
          });
        });
      });
    });
    describe("when trying to park a bike", () => {
      it("should return true", () => {
        const bike = new Bike();
        const result = noRestrictionsSpot.park(bike);
        expect(result).toBeTruthy();
      });
    });
  });

  describe("BikeParkingSpot", () => {
    beforeEach(() => {
      noRestrictionsSpot = new BikeParkingSpot();
      blockedSpot = new BikeParkingSpot(["blocked"]);
      busySpot = new BikeParkingSpot();
      busySpot.isFree = false;
    });

    describe("when trying to park a bike", () => {
      it("should return true", () => {
        const bike = new Bike();
        const result = noRestrictionsSpot.park(bike);
        expect(result).toBeTruthy();
      });
      describe("when spot is blocked", () => {
        it("should return false", () => {
          const bike = new Bike();
          const result = blockedSpot.park(bike);
          expect(result).toBeFalsy();
        });
      });
      describe("when spot is busy", () => {
        it("should return false", () => {
          const car = new Car();
          const result = busySpot.park(car);
          expect(result).toBeFalsy();
        });
      });
      describe("when non-handicap bike", () => {
        const bike = new Bike();
        describe("and spot w/o restrictions", () => {
          it("should return true", () => {
            const result = noRestrictionsSpot.park(bike);
            expect(result).toBeTruthy();
          });
        });
        describe("and and spot w/ restrictions", () => {
          describe("when handicap restriction", () => {
            const handicapSpot = new BikeParkingSpot(["handicap"]);
            it("should return false", () => {
              const result = handicapSpot.park(bike);
              expect(result).toBeFalsy();
            });
          });
          describe("when obstructed view restriction", () => {
            bike.preferNoObstructedView = true;
            const obstructedSpot = new BikeParkingSpot(["obstructed"]);
            it("should return false", () => {
              const result = obstructedSpot.park(bike);
              expect(result).toBeFalsy();
            });
          });
        });
      });
      describe("when handicap car", () => {});
    });
    describe("when trying to park a car", () => {
      it("should return false", () => {
        const car = new Car();
        const result = noRestrictionsSpot.park(car);
        expect(result).toBeFalsy();
      });
    });
  });
});
