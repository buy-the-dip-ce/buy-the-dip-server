import { Categories } from "./../categories/categories.entity";
import { PortfolioService } from "./portfolio.service";
import { Portfolio } from "./portfolio.entity";
import { Param, Post, Body } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";

export type CreatePortfolioBody = {
  [key: string]: string[];
};

@Controller("/portfolios")
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Post()
  async savePortfolio(@Body() body: CreatePortfolioBody) {
    const newPortfolio = await this.portfolioService.createPortfolio(body);
    console.log("바디", body);
    console.log("콘트롤러", newPortfolio);
    return newPortfolio;
  }

  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<Portfolio> {
    console.log("get start");
    const data = await this.portfolioService.findOne(id);
    console.log(data);
    return data;
  }
}
