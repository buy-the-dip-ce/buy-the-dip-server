import axios from "axios"
import { createConnection } from "typeorm"
import { User } from "../src/user/user.entity"
import { Photo } from "../src/photos/photo.entity"
import { Ticker } from "../src/ticker/ticker.entity"
import { DailyStock } from "../src/dailyStock/dailyStock.entity"
const fs = require("fs")

const dotenv = require("dotenv")

dotenv.config()

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
            connectTimeout: 2000000,
        })
        console.log("connected")
        const { tickers } = require("../static/tickers.ts")
        const errorList = []
        const res = []
        let i = 0
        tickers.forEach(async (ticker) => {
            try {
                const {
                    request,
                    data: { data: company },
                } = await axios.get<any>(
                    `https://api.nasdaq.com/api/quote/${ticker.symbol}/info?assetclass=stocks`
                )
                i = i + 1
                console.log("recieved")
                // const market_cap = Number(
                //     (
                //         company.summaryData.MarketCap.value.replace(/,/g, "") /
                //         100000000000
                //     ).toFixed(2)
                // )
                // const sector = company.summaryData.Sector.value
                // const industry = company.summaryData.Industry.value
                // const per = company.summaryData.PERatio.value
                // const high_52 = company.summaryData.FiftTwoWeekHighLow.value
                //     .split("/")[0]
                //     .replace("$", "")

                // let _ticker = new Ticker()
                // _ticker.symbol = ticker.symbol
                // _ticker.name = ticker.name
                // _ticker.country = !!ticker.country ? ticker.country : null
                // _ticker.market_cap = !!market_cap ? market_cap : 0
                // _ticker.per = !!per ? per : 0
                // _ticker.high_52 = high_52
                // _ticker.sector = !!sector ? sector : null
                // _ticker.industry = !!industry ? industry : null

                // await connection.manager.save(_ticker)

                // await connection
                //     .createQueryBuilder()
                //     .insert()
                //     .into(Ticker)
                //     .values([
                //         {
                //             symbol: ticker.symbol,
                //             name: ticker.name,
                //             country: !!ticker.country ? ticker.country : null,
                //             market_cap: !!market_cap ? market_cap : 0,
                //             per: !!per ? per : 0,
                //             high_52,
                //             sector: !!sector ? sector : null,
                //             industry: !!industry ? industry : null,
                //         },
                //     ])
                //     .execute()

                console.log(ticker.symbol, " Added")
            } catch (e) {
                console.log(e)
                if (e.code !== "ETIMEDOUT") {
                    console.log(ticker.symbol, " ", e.message, e.code)
                }
                if (e?.code !== "ER_DUP_ENTRY") {
                    errorList.push(JSON.stringify(ticker))
                }
            } finally {
                console.log(i)
                if (ticker.symbol === "ZYXI") {
                    setTimeout(() => {
                        fs.writeFileSync(
                            "static/tickers.ts",
                            `export const tickers =[${errorList}];`
                        )
                        process.exit(1)
                    }, 0)
                }
            }
        })
    } catch (e) {
        console.debug(e)
    }
}

run()
