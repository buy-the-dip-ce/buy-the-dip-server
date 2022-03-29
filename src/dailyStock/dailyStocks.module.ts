import { DailyService } from "./dailyStocks.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyStock } from "./dailyStock.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DailyStock])],
  exports: [TypeOrmModule],
  providers: [DailyService],
})
export class DailyModule {}
