import axios from "axios";
import { createConnection, Connection } from "typeorm";
import { User } from "../src/user/user.entity";
import { Photo } from "../src/photos/photo.entity";
import { Ticker } from "../src/ticker/ticker.entity";
import { DailyStock } from "../src/dailyStock/dailyStock.entity";

const dotenv = require("dotenv");

dotenv.config();

console.log(process.env);
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
    });
    const { tickers } = require("../static/tickers.ts");
    tickers.forEach(async (ticker) => {
      const { data } = await axios.get<any>(
        `https://api.nasdaq.com/api/quote/${ticker}/summary?assetclass=stocks`
      );
      await connection
      .createQueryBuilder()
      .insert()
      .into(Ticker)
      .values([{ symbol: ticker, 
        name:data.
markey_cap
per
high_52
sector
industry
    }])
      .execute()
    });

  

    // console.log(data.data.rows.forEach(row=>{
    //     row.forEach(daily=>daily.close daily.date)
    // }))
  } catch (e) {
    console.debug(e);
  }
};

run();
