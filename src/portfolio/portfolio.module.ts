import { Ticker } from "./../ticker/ticker.entity";
import { Category } from "./../categories/categories.entity";
import { Portfolio } from "./portfolio.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";
import { TickerService } from "../ticker/tickers.service";
import { CategoryService } from "../categories/categories.service";

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, Category, Ticker])],
  controllers: [PortfolioController],
  providers: [PortfolioService, TickerService, CategoryService],
})
export class PortfolioModule {}
