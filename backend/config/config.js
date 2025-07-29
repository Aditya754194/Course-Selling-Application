// config.js
import dotenv from "dotenv";
dotenv.config();

const JWT_TOKEN = process.env.JWT_TOKEN;
const JWT_USER_TOKEN = process.env.JWT_USER_TOKEN;
export default {
    JWT_TOKEN,
    JWT_USER_TOKEN,
};
