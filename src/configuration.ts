export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE_NAME,
  },
  es: {
    endpoint: process.env.ELASTIC_SERVER,
    username: process.env.ELASTIC_SERVER_USER,
    password: process.env.ELASTIC_SERVER_PASSWORD,
  },
});
