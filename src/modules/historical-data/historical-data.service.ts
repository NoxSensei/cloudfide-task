import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RawAggregatedTrade } from './models/raw-aggregated-trade';
import Dinero from 'dinero.js';
import { HistoricalDataResponseDto } from './dtos/historical-data.dto';
import { BinanceService } from '../binance/services/binance.service';

@Injectable()
export class HistoricalDataService {
  private logger: Logger;

  public constructor(
    private readonly binanceService: BinanceService,
  ) {
    this.logger = new Logger(HistoricalDataService.name);

  }

  public async fetchHistoricalData(
    startDate: string,
    endDate: string,
  ): Promise<HistoricalDataResponseDto> {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    const data = await this.binanceService.getAggregatedTrades(startTimestamp, endTimestamp);
    const normalizedData = data.map((element) => ({
      // TODO consider issues with precission
      price: Number.parseFloat(element.p),
      timestamp: element.T,
    }));

    let lowestPrice: null | number = null;
    let highestPrice: null | number = null;
    let firstValue = normalizedData.at(0) ?? null;
    let lastValue = normalizedData.at(-1) ?? null;
    for (const entry of normalizedData) {
      if (lowestPrice === null || entry.price < lowestPrice) {
        lowestPrice = entry.price;
      }

      if (highestPrice === null || entry.price > highestPrice) {
        highestPrice = entry.price;
      }
    }

    let changeRate;
    if (firstValue && lastValue) {
      changeRate = this.calculateChangeRate(firstValue.price, lastValue.price);
    }

    return {
      lowestPrice,
      highestPrice,
      initialPrice: firstValue?.price ?? null,
      endPrice: lastValue?.price ?? null,
      changeRate,
    };
  }

  public calculateChangeRate(
    startValue: number,
    endValue: number,
  ): number | null {
    if (!startValue || !endValue) {
      return null;
    }

    return (endValue - startValue) / startValue;
  }
}
