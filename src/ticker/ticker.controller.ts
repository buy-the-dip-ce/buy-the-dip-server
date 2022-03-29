import { TickerService } from "./tickers.service";
import { Controller, Get, Query } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
@Controller("")
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get("/tickers/search")
  async search(@Query("keyword") keyword: string) {
    const data = this.tickerService.find(keyword);
    console.log(data);
    // try {
    //   const result = await this.elasticsearchService.search({ q: keyword });
    // } catch (e) {
    //   console.log(e);
    // }
    return data;
  }
}
