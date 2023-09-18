import ParkingLotRepositorySQL from "../../infra/repository/ParkingLotRepositorySQL";
import GetParkingLot from "../usecase/GetParkingLot";

export default class ParkingLotController {
    static async getParkingLot(params, body) {
        const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
        const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
        const parkingLot = await getParkingLot.execute(params.code);
        return parkingLot;
    }
}