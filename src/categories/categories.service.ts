import { Category } from "./categories.entity";

import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PortfolioService } from "../portfolio/portfolio.service";

interface AddCategoryParams {
  portfolioId: string;
  category: string;
  symbol: string;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private portfolioService: PortfolioService
  ) {}

  async addSymbolToCategory(params: AddCategoryParams) {
    const portfolio = await this.portfolioService.findOne(params.portfolioId);

    const _category = new Category();
    _category.portfolio = portfolio;
    _category.name = params.category;

    //? categories에 '여행관련'가 없다면 새 카테고리를 만든다
    const targetCategory = portfolio.categories.find((category) => category.name === params.category);

    if (!targetCategory) {
      _category.ticker_arr = [params.symbol];
      const newCategory = await this.categoryRepository.save(_category);
      return newCategory;
    }
    //? 티커가 이미 존재한다면
    if (targetCategory.ticker_arr.includes(params.symbol)) {
      throw new ConflictException(`카테고리에 이미 ${params.symbol}이 있습니다.`);
    }

    //? categories에 '여행관련' 가 있다면
    _category.ticker_arr = [...targetCategory.ticker_arr, params.symbol];
    const changedCategory = await this.categoryRepository.update(targetCategory.id, _category);
    return changedCategory;
  }
}
