import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RawAggregatedTrade } from '../../historical-data/models/raw-aggregated-trade';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SpotSymbol } from '../../historical-data/models/symbol';

@Injectable()
export class BinanceService {
  private binanceApiUrl: string;
  private logger: Logger;

  public constructor(private readonly httpService: HttpService) {
    // TODO should be extracted from config - we can switch to the demo env
    this.binanceApiUrl = 'https://api.binance.com/api';
    this.logger = new Logger(BinanceService.name);
  }

  // TODO can be extended with the retry logic
  public async getAggregatedTrades(
    startTimestamp: number,
    endTimestamp: number,
    symbol: SpotSymbol,
  ): Promise<RawAggregatedTrade[]> {
    const endpointLimit = 1000;
    try {
      const url = `${this.binanceApiUrl}/v3/aggTrades`;
      const response$ = this.httpService.get<RawAggregatedTrade[]>(url, {
        params: {
          symbol: symbol,
          startTime: startTimestamp,
          endTime: endTimestamp,
          limit: endpointLimit,
        },
      });

      const response = await firstValueFrom(response$);
      if (response.data.length >= endpointLimit) {
        this.logger.warn(`Data range is too long, possibly part of the data was skipped`)
      }

      return response.data;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException(
        'Internal Server Error - Please try again later',
      );
    }
  }
}
