import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Injectable()
export class HistoricalDataService {
    public constructor(
        private readonly httpService: HttpService
    ) {
    }

    public async fetchHistoricalData(): Promise<void> {
        const url = 'https://api.binance.com/api/v3/historicalTrades';
        const response$ = this.httpService.get(url, {
            params: {
                symbol: 'BTCUSDC'
            }
        })
        const response = await firstValueFrom(response$);

        return response.data;
    }
}