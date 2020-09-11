import { ParkingLot } from "./ParkingLot";
import { Car, Bike } from "./Vehicle";

const ERROR_MESSAGE = "no spots available";

describe("Parking Lot", () => {
  describe("parking CAR", () => {
    describe("when all spots busy", () => {
      const parkingLot = new ParkingLot();
      parkingLot.parkingSpots.forEach((e) => e.park(new Car()));

      it("should throw error", () => {
        expect.assertions(1);
        try {
          const car = new Car();
          parkingLot.park(car);
        } catch (error) {
          expect(error.message).toEqual(ERROR_MESSAGE);
        }
      });
    });
    describe("when at least one free spot", () => {
      describe("and w/o restrictions", () => {
        const parkingLot = new ParkingLot();
        const spotID = parkingLot.parkingSpots[2].id;

        it("should park car", () => {
          const car = new Car();
          const spot = parkingLot.park(car);
          expect(spot.id).toEqual(spotID);
        });
      });
      describe("and w/ handicap restriction", () => {
        const parkingLot = new ParkingLot();
        parkingLot.parkingSpots[2].park(new Car());
        const spotID = parkingLot.parkingSpots[1].id;

        describe("when car does NOT have handicap tag", () => {
          it("should throw error", () => {
            expect.assertions(1);
            try {
              const car = new Car();
              parkingLot.park(car);
            } catch (error) {
              expect(error.message).toEqual(ERROR_MESSAGE);
            }
          });
        });
        describe("when car has handicap tag", () => {
          it("should park car", () => {
            const car = new Car();
            car.hasHandicapPermission = true;
            const spot = parkingLot.park(car);
            expect(spot.id).toEqual(spotID);
          });
        });
      });
    });
  });
  describe("parking handicap BIKE", () => {
    describe("when only 1 free spot", () => {
      const parkingLot = new ParkingLot();
      const spotID = parkingLot.parkingSpots[4].id;

      it("should park bike", () => {
        const bike = new Bike();
        bike.hasHandicapPermission = true;
        const spot = parkingLot.park(bike);
        expect(spot.id).toEqual(spotID);
      });
    });
    it("should return error", () => {});
  });
});
