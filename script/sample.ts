const finnhub = require("finnhub")

const api_key = finnhub.ApiClient.instance.authentications["api_key"]
api_key.apiKey = "c8oatdqad3iddfsar2bg"
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.companyBasicFinancials("AAPL", "all", (error, data, response) => {
    console.log(data)
})
