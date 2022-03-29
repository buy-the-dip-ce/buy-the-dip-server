import { DailyStock } from "./../dailyStock/dailyStock.entity";
import { TickerModule } from "./../ticker/tickers.module";
import { TickerService } from "./../ticker/tickers.service";
import { Category } from "./../categories/categories.entity";
import { CreatePortfolioBody } from "./portfolio.controller";
import { Portfolio } from "./portfolio.entity";
import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { read } from "fs";
import { request } from "http";
import { Ticker } from "../ticker/ticker.entity";

@Injectable()
export class PortfolioService {
  constructor(private TickerService: TickerService) {}
  @InjectRepository(Portfolio)
  private portfolioRepository: Repository<Portfolio>;
  @InjectRepository(Category)
  private categoriesRepository: Repository<Category>;

  async createPortfolio(portfolioBody: CreatePortfolioBody) {
    const _portfolio = new Portfolio();
    const newPortfolio = await this.portfolioRepository.save(_portfolio);

    const keys = Object.keys(portfolioBody);
    keys.forEach(async (key) => {
      const category = new Category();
      category.name = key;
      category.ticker_arr = portfolioBody[key];
      category.portfolio = newPortfolio;
      const newCategory = await this.categoriesRepository.save(category);
    });

    const newPortfolioId = newPortfolio.id;
    return newPortfolioId;
  }

  findAll(): Promise<Portfolio[]> {
    return this.portfolioRepository.find();
  }

  async findOne(id: string) {
    const portfolio = await this.portfolioRepository.findOne({ id: id }, { relations: ["categories"] });
    if (!portfolio) {
      throw new NotFoundException(`포트폴리오 ${id} 가 없습니다.`);
    }
    return portfolio;
  }

  async remove(id: string): Promise<void> {
    await this.portfolioRepository.delete(id);
  }
}
