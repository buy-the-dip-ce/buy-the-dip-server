import { Client } from "@elastic/elasticsearch";

export async function esTest() {
  const client = new Client({
    node: "http://localhost:9200",
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true,
  });

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
}
