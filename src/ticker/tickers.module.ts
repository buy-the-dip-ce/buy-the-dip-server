import { TickerService } from "src/ticker/tickers.service";
import { TickerController } from "./ticker.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticker } from "./ticker.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ticker])],
  controllers: [TickerController],
  providers: [TickerService],
})
export class TickerModule {}
