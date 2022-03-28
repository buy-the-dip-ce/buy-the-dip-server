import { Category } from "./categories.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PortfolioService } from "../portfolio/portfolio.service";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [TypeOrmModule],
  providers: [PortfolioService],
})
export class UsersModule {}
