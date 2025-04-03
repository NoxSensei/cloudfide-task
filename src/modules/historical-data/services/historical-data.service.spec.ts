import { Test } from '@nestjs/testing';
import { BinanceService } from '../../binance/services/binance.service';
import { HistoricalDataService } from './historical-data.service';
import { SpotSymbol } from '../models/symbol';

describe('HistoricalDataService', () => {
  it('should calculate trade statistics', async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        HistoricalDataService,
        {
          provide: BinanceService,
          useValue: {
            getAggregatedTrades: jest.fn(() => [
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
              {
                a: 26129, // Aggregate tradeId
                p: '0.01533102', // Price
                q: '4.70443515', // Quantity
                f: 27781, // First tradeId
                l: 27781, // Last tradeId
                T: 1498793709153, // Timestamp
                m: true, // Was the buyer the maker?
                M: true, // Was the trade the best price match?
              },
              {
                a: 26129, // Aggregate tradeId
                p: '1.01633102', // Price
                q: '4.70443515', // Quantity
                f: 27781, // First tradeId
                l: 27781, // Last tradeId
                T: 1498793709153, // Timestamp
                m: true, // Was the buyer the maker?
                M: true, // Was the trade the best price match?
              },
            ]),
          },
        },
      ],
    }).compile();

    const historicalDataService = moduleRef.get(HistoricalDataService);

    const startDate = '2025-04-01T13:19:09.620Z';
    const endDate = '2025-04-02T13:19:09.620Z';
    const symbol = 'BTCUSDC' as SpotSymbol;

    const data = await historicalDataService.calculateTradesStatistics(
      startDate,
      endDate,
      symbol
    );
    expect(data).toStrictEqual({
      lowestPrice: 0.01533102,
      highestPrice: 1.01633102,
      initialPrice: 0.01633102,
      endPrice: 1.01633102,
      changeRate: 61.233162411165985,
    });
  });
});
