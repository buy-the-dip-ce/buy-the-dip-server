import { Categories } from "./categories.entity";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>
  ) {}

  findAll(): Promise<Categories[]> {
    return this.categoryRepository.find();
  }

  findOne(id: string): Promise<Categories> {
    return this.categoryRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
