import { TickerService } from "./tickers.service";
import { Controller, Get, Query } from "@nestjs/common";

@Controller("/tickers")
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get("/search")
  search(@Query("keyword") keyword: string) {
    const data = this.tickerService.find(keyword);
    return data;
  }
}
