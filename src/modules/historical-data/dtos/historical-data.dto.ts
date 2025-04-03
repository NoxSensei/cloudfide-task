import { IsDateString, IsEnum } from 'class-validator';
import { SpotSymbol } from '../models/symbol';

export class HistoricalDataRequestDto {
  @IsDateString()
  public dateFrom: string;

  @IsDateString()
  public dateTo: string;

  @IsEnum(SpotSymbol)
  public symbol: SpotSymbol;
}

export class HistoricalDataResponseDto {
  lowestPrice: number | null;
  highestPrice: number | null;
  initialPrice: number | null;
  endPrice: number | null;
  changeRate: number | null;
}
