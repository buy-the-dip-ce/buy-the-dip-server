import { DailyService } from "./../dailyStock/dailyStocks.service";
import { DailyStock } from "./../dailyStock/dailyStock.entity";
import { Ticker } from "./../ticker/ticker.entity";
import { Category } from "./../categories/categories.entity";
import { Portfolio } from "./portfolio.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";
import { TickerService } from "../ticker/tickers.service";
import { CategoryService } from "../categories/categories.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "../configuration";

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio, Category, Ticker, DailyStock]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, TickerService, CategoryService, DailyService],
})
export class PortfolioModule {}
