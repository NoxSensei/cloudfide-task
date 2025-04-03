import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RawAggregatedTrade } from '../../historical-data/models/raw-aggregated-trade';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BinanceService {
  private binanceApiUrl: string;
  private logger: Logger;

  public constructor(private readonly httpService: HttpService) {
    // TODO should be extracted from config - we can switch to the demo env
    this.binanceApiUrl = 'https://api.binance.com/api';
    this.logger = new Logger(BinanceService.name);
  }

  public async getAggregatedTrades(
    startTimestamp: number,
    endTimestamp: number,
  ): Promise<RawAggregatedTrade[]> {
    try {
      const url = `${this.binanceApiUrl}/v3/aggTrades`;
      const response$ = this.httpService.get<RawAggregatedTrade[]>(url, {
        params: {
          symbol: 'BTCUSDC',
          startTime: startTimestamp,
          endTime: endTimestamp,
        },
      });

      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException(
        'Internal Server Error - Please try again later',
      );
    }
  }
}
