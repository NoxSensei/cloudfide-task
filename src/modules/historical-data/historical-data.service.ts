import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RawAggregatedTrade } from './models/raw-aggregated-trade';
import Dinero from 'dinero.js';
import { HistoricalDataResponseDto } from './dtos/historical-data.dto';

@Injectable()
export class HistoricalDataService {
  public constructor(private readonly httpService: HttpService) {}

  public async fetchHistoricalData(
    startDate: string,
    endDate: string,
  ): Promise<HistoricalDataResponseDto> {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    const url = 'https://api.binance.com/api/v3/aggTrades';
    const response$ = this.httpService.get<RawAggregatedTrade[]>(url, {
      params: {
        symbol: 'BTCUSDC',
        startTime: startTimestamp,
        endTime: endTimestamp,
      },
    });
    const response = await firstValueFrom(response$);

    const data = response.data.map((element) => ({
      // TODO consider issues with precission
      price: Number.parseFloat(element.p),
      timestamp: element.T,
    }));

    let lowestPrice: null | number = null;
    let highestPrice: null | number = null;
    let firstValue = data.at(0) ?? null;
    let lastValue = data.at(-1) ?? null;
    for (const entry of data) {
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
