import {Module} from '@nestjs/common';
import {HistoricalDataModule} from "./modules/historical-data/historical-data.module";

@Module({
    imports: [HistoricalDataModule],
})
export class AppModule {
}
