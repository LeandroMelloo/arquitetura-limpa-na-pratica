import Hapi from "@hapi/hapi";
import ParkingLotController from "../../core/controller/ParkingLotController";
import HapiAdapter from "../../core/adapter/HapiAdapter";

const  server = Hapi.server({
    port: 3001,
    host: "localhost",
});

server.route({
    method: "GET",
    path: "/parkingLots/{code}",
    handler: HapiAdapter.create(ParkingLotController.getParkingLot)
});

server.start();