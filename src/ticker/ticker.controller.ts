import { TickerService } from "./tickers.service"
import { Controller, Get, Query } from "@nestjs/common"

@Controller("")
export class TickerController {
    constructor(private readonly tickerService: TickerService) {}

    @Get("/tickers/search")
    search(@Query("keyword") keyword: string) {
        const data = this.tickerService.find(keyword)
        return data
    }
}
