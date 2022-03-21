import { Portfolio } from "./portfolio.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  exports: [TypeOrmModule],
})
export class UsersModule {}
