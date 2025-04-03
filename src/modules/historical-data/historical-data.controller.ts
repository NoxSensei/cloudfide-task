import { Controller, Get, Query } from '@nestjs/common';
import { HistoricalDataService } from './historical-data.service';
import {
  HistoricalDataRequestDto,
  HistoricalDataResponseDto,
} from './dtos/historical-data.dto';

@Controller('/trades-history')
export class HistoricalDataController {
  public constructor(
    private readonly historicalDataService: HistoricalDataService,
  ) {}

  @Get()
  public async getHistoricalData(
    @Query() query: HistoricalDataRequestDto,
  ): Promise<HistoricalDataResponseDto> {
    return this.historicalDataService.fetchHistoricalData(
      query.dateFrom,
      query.dateTo,
    );
  }
}
