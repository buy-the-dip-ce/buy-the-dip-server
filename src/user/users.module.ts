import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { UsersController } from "./user.controller"
import { UsersService } from "../user/users.service"

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
