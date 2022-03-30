import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DailyStock } from "./dailyStock.entity";

type dailyStockType = {
  [key: string]: string[];
};
@Injectable()
export class DailyService {
  constructor(
    @InjectRepository(DailyStock)
    private dailyStocksRepository: Repository<DailyStock>
  ) {}

  findAll(): Promise<DailyStock[]> {
    return this.dailyStocksRepository.find();
  }

  async findOne(ticker: string): Promise<DailyStock> {
    const dailyStock = await this.dailyStocksRepository
      .createQueryBuilder("dailystock")
      .where("dailystock.ticker = :ticker", { ticker: ticker })
      .orderBy("date", "DESC")
      .getOne();
    return dailyStock;
  }
  async yearData(ticker: string): Promise<DailyStock> {
    const yeardate = "12-31";
    const yearlyStock = await this.dailyStocksRepository
      .createQueryBuilder("dailystock")
      .where("dailystock.ticker = :ticker", { ticker: ticker })
      .andWhere("date_format(dailystock.date, '%m-%d') = :date", { date: yeardate })
      .orderBy("date", "DESC")
      .getOne();
    return yearlyStock;
  }

  async remove(id: string): Promise<void> {
    await this.dailyStocksRepository.delete(id);
  }
}
