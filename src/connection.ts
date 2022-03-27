import { read } from "fs";
import fs from "fs";
import { Client } from "@elastic/elasticsearch";

export async function esTest() {
  // const client = new Client({
  //   node: "http://localhost:9200",
  //   maxRetries: 5,
  //   requestTimeout: 60000,
  //   sniffOnStart: true,
  // });

  //* 인덱스 생성
  // try {
  //   client.indices.create({
  //     index: "tickers",
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  //* 데이터 삽입

  fs.readFile("nasdaq_2022_03_09.csv", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
  // const document = await client.get({
  //   index: "books",
  //   id: "1",
  // });

  // console.log(document);
}

// type IElasticData = {
//   id: number;
//   price: number;
//   title: string;
//   updatedat: number;
// };
// async function searchProductTitle(searchText: string) {
//   const response = await client.search<IElasticData>({
//     index: "store10",
//     size: 15,
//     body: {
//       query: {
//         match: {
//           title: searchText,
//         },
//       },
//     },
//   }); //실 데이터는 hits안의 hits명칭으로 배열로 저장된다. //각각의 row부분에서 _source가 실제 데이터가 있는 곳임.
//   const data = response.hits.hits.map((row) => {
//     return {
//       id: row._source.id,
//       price: row._source.price,
//       title: row._source.title,
//     };
//   });
// await client.index({
//   index: 'game-of-thrones',
//   document: {
//     character: 'Ned Stark',
//     quote: 'Winter is coming.'
//   }
// })

// await client.index({
//   index: 'game-of-thrones',
//   document: {
//     character: 'Daenerys Targaryen',
//     quote: 'I am the blood of the dragon.'
//   }
// })

// await client.index({
//   index: 'game-of-thrones',
//   document: {
//     character: 'Tyrion Lannister',
//     quote: 'A mind needs books like a sword needs a whetstone.'
//   }
// })
