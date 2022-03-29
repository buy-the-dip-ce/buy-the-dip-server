import axios from "axios";
import { createConnection } from "typeorm";
import { User } from "../src/user/user.entity";
import { Photo } from "../src/photos/photo.entity";
import { Ticker } from "../src/ticker/ticker.entity";
import { DailyStock } from "../src/dailyStock/dailyStock.entity";
const fs = require("fs");

const dotenv = require("dotenv");

dotenv.config();

const run = async () => {
  try {
    const connection = await createConnection({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE_NAME,
      entities: [User, Photo, Ticker, DailyStock],
      connectTimeout: 30000,
    });
    console.log("connected");
    const { tickers } = require("../static/tickers.ts");
    const errorList = [];

    let i = 0;
    tickers.forEach(async (ticker) => {
      try {
        const { data } = await axios.get<any>(
          `https://api.nasdaq.com/api/quote/${ticker.symbol.replace(
            "/",
            "."
          )}/historical?assetclass=stocks&fromdate=2021-12-31&limit=9999&todate=2022-03-29`
        );
        i = i + 1;
        const lastDayData = data?.data?.tradesTable?.rows?.find((value) => value.date === "12/31/2021");
        if (lastDayData) {
          await connection
            .createQueryBuilder()
            .insert()
            .into(DailyStock)
            .values([
              {
                ticker: ticker.symbol,
                close: Number(lastDayData.close.replace("$", "")),
                date: "2021-12-31",
              },
            ])
            .execute();
        }

        console.log(ticker.symbol, " Added");
      } catch (e) {
        console.log("Error", ticker.symbol, e.message, e.code, e.response?.status);
        errorList.push(JSON.stringify(ticker));
      } finally {
        console.log(i);
        if (ticker.symbol === "ZWRKW") {
          setTimeout(() => {
            fs.writeFileSync("static/tickers.ts", `export const tickers =[${errorList}];`);
            process.exit(1);
          }, 0);
        }
      }
    });
  } catch (e) {
    console.debug(e);
  }
};

run();
