require("dotenv").config();

export const JWT_SECRET = process.env.APP_KEY;

export const VAPID_KEYS ={
  "publicKey": "",
  "privateKey": ""
};