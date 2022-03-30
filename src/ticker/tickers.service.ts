import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticker } from "./ticker.entity";

type tickerDataType = {
  [key: string]: string[];
};
@Injectable()
export class TickerService {
  constructor(
    @InjectRepository(Ticker)
    private tickersRepository: Repository<Ticker>
  ) {}

  findAll(): Promise<Ticker[]> {
    return this.tickersRepository.find();
  }

  async find(keyword): Promise<tickerDataType[]> {
    const query = keyword;
    // try {
    //   const response = await this.elasticsearchService.search({
    //     index: "ticker",
    //     query: {
    //       match: {
    //         symbol: keyword,
    //       },
    //     },
    //   });
    //   const data = response.hits.hits.map((row) => {
    //     return {
    //       symbol: row._source["symbol"],
    //       name: row._source["name"],
    //     };
    //   });
    //   return data;
    // } catch (error) {
    //   new InternalServerErrorException();
    // }
    return query;
  }

  findOne(id: string): Promise<Ticker> {
    return this.tickersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tickersRepository.delete(id);
  }
}
