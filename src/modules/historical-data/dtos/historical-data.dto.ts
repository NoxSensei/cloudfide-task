import { IsDateString } from 'class-validator';

export class HistoricalDataDto {
  @IsDateString()
  public dateFrom: string;

  @IsDateString()
  public dateTo: string;
}
