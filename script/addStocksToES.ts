import fs from "fs";
import dotenv from "dotenv";
import { EventEmitter } from "stream";
import { Client } from "@elastic/elasticsearch";
dotenv.config();

const client = new Client({
  node: `${process.env.ELASTIC_SERVER}`,
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

// async function bootstrap() {
//   try {
//     client.ping();
//     console.log("9200번 포트 연결");
//   } catch (e) {
//     console.log(e);
//   }
// }
// bootstrap();

// // const client = new Client({
// //   node: process.env.ELASTIC_SERVER,
// //   auth: {
// //     username: process.env.ELASTIC_SERVER_USER,
// //     password: process.env.ELASTIC_SERVER_PASSWORD,
// //   },
// // });

//* 인덱스 생성
const ElasticFunction = async () => {
  //   try {
  //     client.indices.create({
  //       index: "ticker",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // * 데이터 삽입
  const file = fs.readFileSync("static/nasdaq_2022_03_09.csv", "utf8");
  const data = file.split("\r\n").map((stock) => {
    const splits = stock.split(",");
    return {
      symbol: splits[0],
      name: splits[1],
      country: splits[6],
      sector: splits[9],
      industry: splits[10],
    };
  });
  const emitter = new EventEmitter();
  emitter.setMaxListeners(0);
  data.forEach(async (document) => {
    try {
      if (document?.name) {
        await client.index({
          index: "ticker",
          document,
        });
        console.log("done");
      }
    } catch (e) {
      console.log(e);
    }
  });
};
ElasticFunction();
