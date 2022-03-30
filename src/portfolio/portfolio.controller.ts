import { DailyService } from "./../dailyStock/dailyStocks.service";
import { Category } from "./../categories/categories.entity";
import { PortfolioService } from "./portfolio.service";
import { Portfolio } from "./portfolio.entity";
import { Param, Post, Body, Patch, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "../categories/categories.service";
import { Ticker } from "../ticker/ticker.entity";
import { TickerService } from "../ticker/tickers.service";

export type CreatePortfolioBody = {
  [key: string]: string[];
};

@Controller("")
export class PortfolioController {
  constructor(
    private portfolioService: PortfolioService,
    private categoryService: CategoryService,
    private tickerService: TickerService,
    private dailyService: DailyService
  ) {}

  @Post("/portfolios")
  async savePortfolio(@Body() body: CreatePortfolioBody) {
    const newPortfolio = await this.portfolioService.createPortfolio(body);

    return newPortfolio;
  }

  @Post("/portfolios/:id/categories/:category")
  async addCategory(@Param("id") portfolioId, @Param("category") category, @Body() body) {
    console.log(portfolioId, body, category);
    const { symbol } = body;
    if (!portfolioId || !category || !symbol) {
      throw new NotFoundException();
    }
    await this.categoryService.addSymbolToCategory({ portfolioId, category, symbol });
    return true;
  }

  @Get("/portfolios/:id")
  async getOne(@Param("id") id: string): Promise<{ [key: string]: Ticker[] }> {
    const portfolio = await this.portfolioService.findOne(id);

    const promises = [];

    const tickerData = {};
    portfolio.categories.forEach((category) => {
      const tickerArray = [];
      const tickerPromises = category.ticker_arr.map(async (symbol) => {
        //@ts-ignore
        const tickerData = await this.tickerService.findOne(symbol);
        const dailyData = await this.dailyService.findOne(symbol);
        const yearlyData = await this.dailyService.yearData(symbol);
        if (!tickerData) {
          return;
        }
        const ticker = {
          symbol: tickerData.symbol,
          name: tickerData.name,
          market_cap: tickerData.market_cap,
          per: tickerData.per,
          mdd: (((tickerData.high_52 - dailyData.close) / tickerData.high_52) * 100).toFixed(2),
          ytd: ((dailyData.close / yearlyData.close - 1) * 100).toFixed(2),
        };
        tickerArray.push(ticker);
      });
      promises.push(...tickerPromises);
      tickerData[`${category.name}`] = tickerArray;
    });
    try {
      await Promise.all(promises);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return tickerData;
  }
}
