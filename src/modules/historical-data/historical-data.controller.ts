import {Controller, Get} from "@nestjs/common";
import {HistoricalDataService} from "./historical-data.service";

@Controller('/trades-history')
export class HistoricalDataController {
    public constructor(private readonly historicalDataService: HistoricalDataService) {
    }

    @Get()
    public getHistoricalData() {
        return this.historicalDataService.fetchHistoricalData();
    }
}