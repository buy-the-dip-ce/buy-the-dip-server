import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticker } from "./ticker.entity";

@Injectable()
export class TickerService {
  constructor(
    @InjectRepository(Ticker)
    private tickersRepository: Repository<Ticker>
  ) {}

  findAll(): Promise<Ticker[]> {
    return this.tickersRepository.find();
  }

  findOne(id: string): Promise<Ticker> {
    return this.tickersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tickersRepository.delete(id);
  }
}
