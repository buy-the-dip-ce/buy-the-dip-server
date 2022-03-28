import { Ticker } from "./../ticker/ticker.entity"
import { Categories } from "./../categories/categories.entity"
import { Portfolio } from "./portfolio.entity"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PortfolioController } from "./portfolio.controller"
import { PortfolioService } from "./portfolio.service"
import { TickerService } from "../ticker/tickers.service"

@Module({
    imports: [TypeOrmModule.forFeature([Portfolio, Categories, Ticker])],
    controllers: [PortfolioController],
    providers: [PortfolioService, TickerService],
})
export class PortfolioModule {}
