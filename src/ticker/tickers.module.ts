import { TickerController } from "./ticker.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticker } from "./ticker.entity";
import { TickerService } from "./tickers.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "../configuration";
@Module({
  imports: [
    TypeOrmModule.forFeature([Ticker]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [TickerController],
  providers: [TickerService],
})
export class TickerModule {}
