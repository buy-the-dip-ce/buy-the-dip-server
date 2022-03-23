import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200",
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

client.ping();
