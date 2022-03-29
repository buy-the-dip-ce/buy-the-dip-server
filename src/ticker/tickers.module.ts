import { TickerController } from "./ticker.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticker } from "./ticker.entity";
import { TickerService } from "./tickers.service";
import { ElasticsearchService, ElasticsearchModule } from "@nestjs/elasticsearch";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "../configuration";
@Module({
  imports: [
    TypeOrmModule.forFeature([Ticker]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get("es").endpoint,
        auth: {
          username: configService.get("es").username,
          password: configService.get("es").password,
        },
      }),
    }),
  ],
  controllers: [TickerController],
  providers: [TickerService],
})
export class TickerModule {}
