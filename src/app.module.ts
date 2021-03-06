import { TickerModule } from "./ticker/tickers.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { Category } from "./categories/categories.entity";
import { Portfolio } from "./portfolio/portfolio.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./user/user.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Photo } from "./photos/photo.entity";
import configuration from "./configuration";
import { DailyStock } from "./dailyStock/dailyStock.entity";
import { Ticker } from "./ticker/ticker.entity";
import { UsersModule } from "./user/users.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService<any>) => ({
        type: "mysql",
        host: configService.get("database").host,
        port: 3306,
        username: configService.get("database").username,
        password: configService.get("database").password,
        database: configService.get("database").database,
        entities: [User, Photo, Ticker, DailyStock, Portfolio, Category],
        synchronize: true,
        keepConnectionAlive: true,
      }),
    }),
    UsersModule,
    PortfolioModule,
    TickerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
