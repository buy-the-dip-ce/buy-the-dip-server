import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DailyStock } from "./dailyStock.entity";

@Injectable()
export class DailyService {
  constructor(
    @InjectRepository(DailyStock)
    private dailyStocksRepository: Repository<DailyStock>
  ) {}

  findAll(): Promise<DailyStock[]> {
    return this.dailyStocksRepository.find();
  }

  findOne(ticker: string): Promise<DailyStock> {
    return this.dailyStocksRepository.findOne({ ticker });
  }

  async remove(id: string): Promise<void> {
    await this.dailyStocksRepository.delete(id);
  }
}
