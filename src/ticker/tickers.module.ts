import { TickerController } from "./ticker.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticker } from "./ticker.entity";
import { TickerService } from "./tickers.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Module({
  imports: [TypeOrmModule.forFeature([Ticker])],
  controllers: [TickerController],
  providers: [TickerService],
})
export class TickerModule {}
