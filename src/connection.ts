import { read } from "fs";
import fs from "fs";
import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://3.135.9.168:9200",
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

export default client;
//* 인덱스 생성
export async function ElasticFunction() {
  // try {
  //   client.indices.create({
  //     index: "tickers",
  //   });
  // } catch (error) {
  //   console.log(error);

  const client = new Client({
    node: "http://3.135.9.168:9200",
    maxRetries: 5,
    requestTimeout: 600000,
    sniffOnStart: true,
  });
  // * 데이터 삽입
  const file = fs.readFileSync(
    "/Users/lim-eunbi/Desktop/buy the dip/buy-the-dip-server/static/nasdaq_2022_03_09.csv",
    "utf8"
  );
  const data = file.split("\r\n");
  for (let i = 1; i < data.length; i++) {
    const ticker = data[i].split(",");
    await client.index({
      index: "tickers",
      document: {
        symbol: ticker[0],
        name: ticker[1],
        country: ticker[6],
        sector: ticker[9],
        industry: ticker[10],
      },
    });
  }
}
