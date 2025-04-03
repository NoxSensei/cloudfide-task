import { Controller, Get, Logger, Query } from '@nestjs/common';
import { HistoricalDataService } from '../services/historical-data.service';
import {
  HistoricalDataRequestDto,
  HistoricalDataResponseDto,
} from '../dtos/historical-data.dto';

@Controller('/trades-history')
export class HistoricalDataController {
  private readonly logger: Logger;

  public constructor(
    private readonly historicalDataService: HistoricalDataService,
  ) {
    this.logger = new Logger(HistoricalDataController.name);
  }

  @Get()
  public async getHistoricalData(
    @Query() query: HistoricalDataRequestDto,
  ): Promise<HistoricalDataResponseDto> {
    const data = await this.historicalDataService.calculateTradesStatistics(
      query.dateFrom,
      query.dateTo,
      query.symbol,
    );

    this.logger.log(
      `Trades History for ${query.dateFrom}-${query.dateTo} changed by ${data.changeRate?.toFixed(4)}`,
    );
    return data;
  }
}
