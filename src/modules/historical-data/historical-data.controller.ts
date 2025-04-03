import {Controller, Get, Query} from "@nestjs/common";
import {HistoricalDataService} from "./historical-data.service";
import {HistoricalDataDto} from "./dtos/historical-data.dto";

@Controller('/trades-history')
export class HistoricalDataController {
    public constructor(private readonly historicalDataService: HistoricalDataService) {
    }

    @Get()
    public getHistoricalData(@Query() query: HistoricalDataDto) {
        return this.historicalDataService.fetchHistoricalData(query.dateFrom, query.dateTo);
    }
}