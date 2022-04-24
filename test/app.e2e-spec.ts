import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  const mockFn = jest.fn();
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('console.log the text "hello"', () => {
    const logSpy = jest.spyOn(console, "debug");

    console.debug("hello");

    expect(logSpy).toHaveBeenCalledWith("hello");
  });

  it("console", () => {
    const logSpy = jest.spyOn(console, "log");

    console.log(mockFn.mockReturnValue("i"));

    mockFn()
      .then((result) => {
        console.log(result); // I will be a mock!
      })
      .expect(logSpy)
      .toHaveBeenCalledWith("hello");
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("Hello World!");
  });

  it("/portfolios (POST)", () => {
    return request(app.getHttpServer()).post("/portfolios").expect(201).expect({ message: "SUCCESS" });
  });

  it("/c (POST)", () => {
    return request(app.getHttpServer()).post("/portfolios").expect(201).expect({ message: "SUCCESS" });
  });
});
