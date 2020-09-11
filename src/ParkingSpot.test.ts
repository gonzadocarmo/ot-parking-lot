import { CarParkingSpot, BikeParkingSpot, ParkingSpot } from "./ParkingSpot";
import { Car, Bike } from "./Vehicle";

describe("ParkingSpot", () => {
  describe("CarParkingSpot", () => {
    let noRestrictionsSpot: CarParkingSpot;
    let blockedSpot: CarParkingSpot;
    let busySpot: CarParkingSpot;
    beforeEach(() => {
      noRestrictionsSpot = new CarParkingSpot(1);
      blockedSpot = new CarParkingSpot(2, ["blocked"]);
      busySpot = new CarParkingSpot(3);
      busySpot.park(new Car());
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
            const handicapSpot = new CarParkingSpot(1, ["handicap"]);
            it("should return false", () => {
              const result = handicapSpot.park(car);
              expect(result).toBeFalsy();
            });
          });
          describe("when obstructed view restriction", () => {
            car.preferNoObstructedView = true;
            const obstructedSpot = new CarParkingSpot(1, ["obstructed"]);
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
            const handicapSpot = new CarParkingSpot(1, ["handicap"]);
            it("should return true", () => {
              const result = handicapSpot.park(car);
              expect(result).toBeTruthy();
            });
          });
          describe("when obstructed view restriction", () => {
            car.preferNoObstructedView = true;
            const obstructedSpot = new CarParkingSpot(1, ["obstructed"]);
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
    let noRestrictionsSpot: BikeParkingSpot;
    let blockedSpot: BikeParkingSpot;
    let busySpot: BikeParkingSpot;
    beforeEach(() => {
      noRestrictionsSpot = new BikeParkingSpot(1);
      blockedSpot = new BikeParkingSpot(2, ["blocked"]);
      busySpot = new BikeParkingSpot(3);
      busySpot.park(new Bike());
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
            const handicapSpot = new BikeParkingSpot(1, ["handicap"]);
            it("should return false", () => {
              const result = handicapSpot.park(bike);
              expect(result).toBeFalsy();
            });
          });
          describe("when obstructed view restriction", () => {
            bike.preferNoObstructedView = true;
            const obstructedSpot = new BikeParkingSpot(1, ["obstructed"]);
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
