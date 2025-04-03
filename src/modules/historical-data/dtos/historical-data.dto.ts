import { IsDateString } from 'class-validator';

export class HistoricalDataRequestDto {
  @IsDateString()
  public dateFrom: string;

  @IsDateString()
  public dateTo: string;
}

export class HistoricalDataResponseDto {
  lowestPrice: number | null;
  highestPrice: number | null;
  initialPrice: number | null;
  endPrice: number | null;
  changeRate: number | null;
}
