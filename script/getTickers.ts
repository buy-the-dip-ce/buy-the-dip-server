const fs = require("fs")

//?  ticker 목록을 static/tickers.ts 에 추가
const run = async () => {
    try {
        const dailyStocksString = fs.readFileSync(
            "static/nasdaq_2022_03_09.csv",
            { encoding: "utf-8" }
        )

        const dailyStocks = dailyStocksString.split("\r\n")

        fs.writeFileSync(
            "static/tickers.ts",

            `export const tickers =[${dailyStocks
                .map((stock, index) => {
                    if (index === 0 || dailyStocks.length - 1 === index) {
                        return ""
                    }
                    const splits = stock.split(",")
                    return JSON.stringify({
                        symbol: splits[0],
                        name: splits[1],
                        market_cap: splits[5],
                        country: splits[6],
                        sector: splits[9],
                        industry: splits[10],
                    })
                })
                .filter((stock) => !!stock)}];`
        )
    } catch (e) {
        console.debug(e, "csv read 에러")
    }
}

run()
