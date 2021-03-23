
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { join } from 'path';
import routes from './routes/routes';
import * as webPush from "web-push";
import { VAPID_KEYS } from './config/constants';

createConnection().then(async connection => {
  // Increase max listener to prevent memory limit.
  process.setMaxListeners(50);

/** @dev Try establish database connection */

  /**  Init express app */
  const app = express();

  const dirPath = join(__dirname, "storage");
  webPush.setVapidDetails(
    'mailto:notifications@as2.network',
    VAPID_KEYS.publicKey,
    VAPID_KEYS.privateKey
  );
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(express.static(dirPath));
  app.use("/api/", routes);
  // TODO integrate swagger spec
  // app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

 /**  Register all application routes */
  
  app.listen(process.env.APP_PORT, () => {
    console.log(`⚡️[server]: Server is running at ${process.env.APP_URL}`);
  });
})