import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200",
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

client.ping();

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.STAGE === "dev") {
    const options = new DocumentBuilder()
      .setTitle("Buy The Dip API Docs")
      .setDescription(
        "Buy The Dip API Swagger 입니다.\nAuthorization이 필요없습니다."
      )
      .setVersion("1.0.0")
      .addBearerAuth({
        type: "http",
        scheme: "bearer",
        in: "header",
        name: "Authorization",
      })
      .addServer(String("http://localhost:4000"), String("local"))
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs", app, document);

    const basePath = "./swagger";
    const swaggerSpecPath = path.join(basePath, "swagger-spec.json");
    try {
      fs.mkdirSync(basePath);
    } catch (e) {}
    fs.writeFileSync(
      swaggerSpecPath,
      JSON.stringify(document, undefined, "\t") + "\n"
    );
  }

  await app.listen(4000);
}
bootstrap();
