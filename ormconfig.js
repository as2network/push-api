 require("dotenv").config()[`parsed`];

const config = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ["dist/src/models/*.js"],
  migrations: ["dist/src/migrations/**/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/models"
  },
  extra: {
    connectTimeout: 3600000,
  },
};
if (process.env.TS_NODE) {
  config.entities = ["src/models/**/*.ts"];
  config.migrations = ["src/migrations/**/*.ts"]
}
module.exports = config;