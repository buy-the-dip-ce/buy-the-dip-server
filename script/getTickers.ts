const fs = require("fs")

const run = async () => {
    try {
        const dailyStocksString = fs.readFileSync(
            "static/nasdaq_2022_03_09.csv",
            { encoding: "utf-8" }
        )

        const dailyStocks = dailyStocksString.split("\r\n")
        fs.writeFileSync(
            "static/tickers.ts",

            `const tickers =[${dailyStocks
                .map((stock, index) => {
                    if (index === 0 || dailyStocks.length - 1 === index) {
                        return ""
                    }
                    return `"${stock.split(",")[0]}"`
                })
                .filter((stock) => !!stock)}];`
        )
    } catch (e) {
        console.debug(e, "csv read 에러")
    }
}

run()
