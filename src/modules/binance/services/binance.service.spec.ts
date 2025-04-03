import { Test } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BinanceService } from './binance.service';
import { of } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
import { SpotSymbol } from '../../historical-data/models/symbol';

describe('BinanceService', () => {
  it('should return response data', async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BinanceService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() =>
              of({
                data: [
                  {
                    a: 26129, // Aggregate tradeId
                    p: '0.01633102', // Price
                    q: '4.70443515', // Quantity
                    f: 27781, // First tradeId
                    l: 27781, // Last tradeId
                    T: 1498793709153, // Timestamp
                    m: true, // Was the buyer the maker?
                    M: true, // Was the trade the best price match?
                  },
                ],
              }),
            ),
          },
        },
      ],
    }).compile();

    const binanceService = moduleRef.get(BinanceService);
    const httpService = moduleRef.get(HttpService);

    const startDate = new Date('2025-04-01T13:19:09.620Z').getTime();
    const endDate = new Date('2025-04-02T13:19:09.620Z').getTime();
    const symbol = 'BTCUSDC' as SpotSymbol;

    const data = await binanceService.getAggregatedTrades(startDate, endDate, symbol);
    expect(data.length).toBe(1);
  });

  // This is a smoke test
  it('should call binance api with success', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BinanceService],
    }).compile();

    const binanceService = moduleRef.get(BinanceService);

    const startDate = new Date('2025-04-01T13:19:09.620Z').getTime();
    const endDate = new Date('2025-04-02T13:19:09.620Z').getTime();
    const symbol = 'BTCUSDC' as SpotSymbol;

    expect(
      () => binanceService.getAggregatedTrades(startDate, endDate, symbol),
    ).not.toThrow(InternalServerErrorException);
  });
});
