import { TickerModule } from "./../ticker/tickers.module"
import { TickerService } from "./../ticker/tickers.service"
import { Categories } from "./../categories/categories.entity"
import { CreatePortfolioBody } from "./portfolio.controller"
import { Portfolio } from "./portfolio.entity"
import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { read } from "fs"
import { request } from "http"
import { Ticker } from "../ticker/ticker.entity"

@Injectable()
export class PortfolioService {
    constructor(private TickerService: TickerService) {}
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>

    async createPortfolio(portfolioBody: CreatePortfolioBody) {
        //? 빈 포트폴리오를 만든 후 id 를 받는다
        //? 해당 id의 카테고리들을 만든다
        //? 처음 포트폴리오의 카테고리를 만든 카테고리로 채운다

        const _portfolio = new Portfolio()
        const newPortfolio = await this.portfolioRepository.save(_portfolio)

        const keys = Object.keys(portfolioBody)
        keys.forEach(async (key) => {
            const category = new Categories()
            category.name = key
            category.ticker_arr = portfolioBody[key]
            category.portfolio = newPortfolio
            const newCategory = await this.categoriesRepository.save(category)
        })

        const newPortfolioId = newPortfolio.id
        return newPortfolioId
    }

    findAll(): Promise<Portfolio[]> {
        return this.portfolioRepository.find()
    }

    async findOne(id: string): Promise<{ [key: string]: Ticker[] }> {
        const portfolio = await this.portfolioRepository.findOne(
            { id: id },
            { relations: ["categories"] }
        )

        if (!portfolio) {
            throw new NotFoundException(`포트폴리오 ${id} 가 없습니다.`)
        }
        const category_data = portfolio.categories

        const promises = []

        const tickerData = {}
        category_data.forEach((category) => {
            const tickerArray = []
            const tickerPromises = category.ticker_arr.map(async (symbol) => {
                //@ts-ignore
                const ticker = await this.TickerService.findOne(symbol)
                if (!ticker) {
                    return
                }
                tickerArray.push(ticker)
            })
            promises.push(...tickerPromises)
            tickerData[`${category.name}`] = tickerArray
        })

        try {
            await Promise.all(promises)
        } catch (e) {
            throw new InternalServerErrorException()
        }
        return tickerData
    }

    async remove(id: string): Promise<void> {
        await this.portfolioRepository.delete(id)
    }
}
