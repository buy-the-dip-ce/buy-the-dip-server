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
    try {
      const result = await this.elasticsearchService.search({ q: keyword });
      return (
        result?.hits?.hits?.map((index: any) => ({ symbol: index._source.symbol, name: index._source.name })) || []
      );
    } catch (e) {
      new InternalServerErrorException();
    }
  }
}
