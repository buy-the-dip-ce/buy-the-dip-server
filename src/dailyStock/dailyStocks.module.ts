import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DailyStock } from "./dailyStock.entity"

@Module({
    imports: [TypeOrmModule.forFeature([DailyStock])],
    exports: [TypeOrmModule],
})
export class UsersModule {}
