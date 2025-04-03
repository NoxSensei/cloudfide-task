import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HistoricalDataController } from './controllers/historical-data.controller';
import { HistoricalDataService } from './services/historical-data.service';
import { BinanceModule } from '../binance/binance.module';

@Module({
  imports: [BinanceModule],
  controllers: [HistoricalDataController],
  providers: [HistoricalDataService],
})
export class HistoricalDataModule {}
