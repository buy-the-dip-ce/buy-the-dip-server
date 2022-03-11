import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { DailyStock } from "./dailyStock.entity"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(DailyStock)
        private dailyStocksRepository: Repository<DailyStock>
    ) {}

    findAll(): Promise<DailyStock[]> {
        return this.dailyStocksRepository.find()
    }

    findOne(id: string): Promise<DailyStock> {
        return this.dailyStocksRepository.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.dailyStocksRepository.delete(id)
    }
}
