import { Categories } from "./../categories/categories.entity"
import { PortfolioService } from "./portfolio.service"
import { Portfolio } from "./portfolio.entity"
import { Param, Post, Body } from "@nestjs/common"
import { Controller, Get } from "@nestjs/common"

export type CreatePortfolioBody = {
    [key: string]: string[]
}

@Controller("/portfolios")
export class PortfolioController {
    constructor(private portfolioService: PortfolioService) {}

    @Post()
    async savePortfolio(@Body() body: CreatePortfolioBody) {
        const newPortfolio = await this.portfolioService.createPortfolio(body)

        return newPortfolio
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        const data = await this.portfolioService.findOne(id)
        return data
    }
}
