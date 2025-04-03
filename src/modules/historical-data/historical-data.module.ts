import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {HistoricalDataController} from "./historical-data.controller";
import {HistoricalDataService} from "./historical-data.service";

@Module({
    imports: [HttpModule],
    controllers: [HistoricalDataController],
    providers: [HistoricalDataService]
})
export class HistoricalDataModule {
}
