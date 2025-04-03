import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Injectable()
export class HistoricalDataService {
    public constructor(
        private readonly httpService: HttpService
    ) {
    }

    public async fetchHistoricalData(startDate: string, endDate: string): Promise<void> {
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();

        const url = 'https://api.binance.com/api/v3/aggTrades';
        const response$ = this.httpService.get(url, {
            params: {
                symbol: 'BTCUSDC',
                startTime: startTimestamp,
                endTime: endTimestamp,
            }
        })
        const response = await firstValueFrom(response$);

        return response.data;
    }
}