import Express from "express";
import ExpressAdapter from "../../core/adapter/ExpressAdapter";
import ParkingLotController from "../../core/controller/ParkingLotController";

const app = new Express();

app.get("/parkingLots/:code", ExpressAdapter.create(ParkingLotController.getParkingLot))

app.listen(3000);