import Express from "express";
import GetParkingLot from "../../core/usecase/GetParkingLot";
import ParkingLotRepositorySQL from "../repository/ParkingLotRepositorySQL";
import ExpressAdapter from "../../core/adapter/ExpressAdapter";
import ParkingLot from "../../core/entity/ParkingLot";

const app = new Express();

app.get("/parkingLots/:code", async (req, res) => {
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
    const parkingLot = await getParkingLot.execute(req.params.code);
    res.json(parkingLot);
});

app.get("/parkingLot/:code", ExpressAdapter.create(ParkingLotController.getParkingLot))

app.listen(3000);