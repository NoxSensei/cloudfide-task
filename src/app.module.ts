import {Module} from '@nestjs/common';
import {HistoricalDataModule} from "./modules/historical-data/historical-data.module";
import { BinanceModule } from './modules/binance/binance.module';

@Module({
    imports: [HistoricalDataModule, BinanceModule],
})
export class AppModule {
}
