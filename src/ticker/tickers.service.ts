import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticker } from "./ticker.entity";
import axios from "axios";

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

  async searchWithES(keyword): Promise<tickerDataType[]> {
    try {
      const axiosClient = axios.create({
        baseURL: process.env.ELASTIC_SEARCH_ENDPOINT,
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ELASTIC_SEARCH_USERNAME!}:${process.env.ELASTIC_SEARCH_PASSWORD!}`
          ).toString("base64")}`,
        },
      });

      const { data } = await axiosClient.get(`/ticker/_search?q=${keyword}`);
      const stocks = data.hits.hits.map((row) => {
        return {
          symbol: row._source["symbol"],
          name: row._source["name"],
        };
      });
      return stocks;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findOne(id: string): Promise<Ticker> {
    return this.tickersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tickersRepository.delete(id);
  }
}
