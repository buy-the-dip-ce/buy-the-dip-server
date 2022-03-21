import { Portfolio } from "./portfolio.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>
  ) {}

  findAll(): Promise<Portfolio[]> {
    return this.portfolioRepository.find();
  }

  findOne(id: string): Promise<Portfolio> {
    return this.portfolioRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.portfolioRepository.delete(id);
  }
}
