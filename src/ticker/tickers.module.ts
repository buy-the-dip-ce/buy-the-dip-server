import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticker } from "./ticker.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ticker])],
  exports: [TypeOrmModule],
})
export class TickerModule {}
