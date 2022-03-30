import { TickerService } from "./tickers.service";
import { Controller, Get, Query, InternalServerErrorException } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
@Controller("")
export class TickerController {
  constructor(
    private readonly tickerService: TickerService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @Get("/tickers/search")
  async search(@Query("keyword") keyword: string) {
    return this.tickerService.find(keyword);
  }
}
