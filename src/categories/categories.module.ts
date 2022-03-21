import { Categories } from "./categories.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  exports: [TypeOrmModule],
})
export class UsersModule {}
