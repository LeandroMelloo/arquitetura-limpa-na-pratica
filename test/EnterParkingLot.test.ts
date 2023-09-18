import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import GetParkingLot from "../src/core/usecase/GetParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";
import ParkingLotRepositorySQL from "../src/infra/repository/ParkingLotRepositorySQL";

test("Should enter parking lot", async () => {
    // const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
    const parkingLot = await getParkingLot.execute("Shopping");
    expect(parkingLot.code).toBe("Shopping");
});

test("Should enter parking lot", async () => {
    // const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
    const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);

    const parkingLotBeforeEnter = await getParkingLot.execute("Shopping");
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("Shopping", "FIH-2326", new Date("2023-09-15T10:00:00"));

    const parkingLotAfterEnter = await getParkingLot.execute("Shopping");
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test("Should be closed", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);

    const parkingLotBeforeEnter = await getParkingLot.execute("Shopping");
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("Shopping", "FIH-2326", new Date("2023-09-15T22:00:00"));
});

test("Should be full", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);

    const parkingLotBeforeEnter = await getParkingLot.execute("Shopping");
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("Shopping", "FIH-2326", new Date("2023-09-15T22:00:00"));
    await enterParkingLot.execute("Shopping", "FIH-2325", new Date("2023-09-15T22:00:00"));
    await enterParkingLot.execute("Shopping", "FIH-2324", new Date("2023-09-15T22:00:00"));
    await enterParkingLot.execute("Shopping", "FIH-2323", new Date("2023-09-15T22:00:00"));
    await enterParkingLot.execute("Shopping", "FIH-2323", new Date("2023-09-15T22:00:00"));
});