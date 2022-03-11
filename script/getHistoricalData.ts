import axios from "axios"
import { createConnection, Connection } from "typeorm"
import { User } from "../src/user/user.entity"
import { Photo } from "../src/photos/photo.entity"

const dotenv = require("dotenv")

dotenv.config()

console.log(process.env)
const run = async () => {
    try {
        const connection = await createConnection({
            type: "mysql",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE_NAME,
            entities: [User, Photo],
        })
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { firstName: "Timber", lastName: "Saw", photos: [] },
                { firstName: "Phantom", lastName: "Lancer", photos: [] },
            ])
            .execute()
        // const { data } = await axios.get<any>(
        //     "https://api.nasdaq.com/api/quote/AAPL/historical?assetclass=stocks&fromdate=2021-03-10&limit=9999&todate=2022-03-10"
        // )
        // console.log(data.data.rows.forEach(row=>{
        //     row.forEach(daily=>daily.close daily.date)
        // }))
    } catch (e) {
        console.debug(e)
    }
}

run()
