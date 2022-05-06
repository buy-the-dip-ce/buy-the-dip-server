import axios from "axios";
import { createConnection } from "typeorm";
import { User } from "../src/user/user.entity";
import { Photo } from "../src/photos/photo.entity";
import { Ticker } from "../src/ticker/ticker.entity";
import { DailyStock } from "../src/dailyStock/dailyStock.entity";
const fs = require("fs");

const dotenv = require("dotenv");

dotenv.config();

interface DailyStockData {
  country: string;
  industry: string;
  ipoyear: string; //"1999"
  lastsale: string; //"$127.58"
  marketCap: string; //"38288464638.00"
  name: string; //"Agilent Technologies Inc. Common Stock"
  netchange: string; // "-2.73"
  pctchange: string; //"-2.095%"
  sector: string; //"Capital Goods"
  symbol: string; //"A"
  url: string; //"/market-activity/stocks/a"
  volume: string; //"1737099"
}

const run = async () => {
  console.log(new Date());
  console.log({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE_NAME,
    entities: [User, Photo, Ticker, DailyStock],
  });
  try {
    const connection = await createConnection({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE_NAME,
      entities: [User, Photo, Ticker, DailyStock],
      connectTimeout: 2000000,
    });
    console.log("connected");

    const { data } = await axios.get(
      "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25&offset=0&download=true"
    );
    const dailyStockDatas: DailyStockData[] = data.data.rows;
    console.log(dailyStockDatas.length);
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() - 1}`;

    const AAPL = dailyStockDatas.find((stock) => stock.symbol === "AAPL");

    const prevAAPL = await connection.manager.findOne(DailyStock, {
      where: { ticker: "AAPL" },
      order: { date: "DESC" },
    });

    const GOOGL = dailyStockDatas.find((stock) => stock.symbol === "GOOGL");
    const prevGOOGL = await connection.manager.findOne(DailyStock, {
      where: { ticker: "GOOGL" },
      order: { date: "DESC" },
    });
    if (
      Number(AAPL.lastsale.replace("$", "")) === prevAAPL.close &&
      prevGOOGL.close === Number(GOOGL.lastsale.replace("$", ""))
    ) {
      console.log("휴장일입니다");
      return;
    }

    dailyStockDatas.forEach(async (stock, index) => {
      await connection
        .createQueryBuilder()
        .insert()
        .into(DailyStock)
        .values([
          {
            ticker: stock.symbol,
            close: Number(stock.lastsale.replace("$", "")),
            date,
          },
        ])
        .execute();

      if (index === dailyStockDatas.length - 1) {
        process.exit(1);
      }
    });
  } catch (e) {
    console.debug(e);
  }
};

run();
