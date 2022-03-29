import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  node: process.env.ELASTIC_SEARCH_ENDPOINT,
  auth: {
    username: process.env.ELASTIC_SEARCH_USERNAME,
    password: process.env.ELASTIC_SEARCH_PASSWORD,
  },
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

export default client;
//* 인덱스 생성
export async function ElasticFunction() {
  const client = new Client({
    node: process.env.ELASTIC_SERVER,
    auth: {
      username: "elastic",
      password: "ZBzTHLk5qj9xl0NhjF9FfP9d",
    },
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true,
  });

  // try {
  //   client.indices.create({
  //     index: "tickers",
  //   });
  // } catch (error) {
  //   console.log(error);

  // * 데이터 삽입
  // const file = fs.readFileSync(
  //   "/Users/lim-eunbi/Desktop/buy the dip/buy-the-dip-server/static/nasdaq_2022_03_09.csv",
  //   "utf8"
  // );
  // const data = file.split("\r\n");
  // for (let i = 1; i < data.length; i++) {
  //   const ticker = data[i].split(",");
  //   await client.index({
  //     index: "tickers",
  //     document: {
  //       symbol: ticker[0],
  //       name: ticker[1],
  //       country: ticker[6],
  //       sector: ticker[9],
  //       industry: ticker[10],
  //     },
  //   });
  // }
}
