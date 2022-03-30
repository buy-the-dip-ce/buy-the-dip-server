import { TickerService } from "./tickers.service";
import { Controller, Get, Query, InternalServerErrorException } from "@nestjs/common";
@Controller("")
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get("/tickers/search")
  async search(@Query("keyword") keyword: string) {
    return await this.tickerService.searchWithES(keyword);
  }
}
