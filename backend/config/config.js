// config.js
import dotenv from "dotenv";
dotenv.config();

const JWT_TOKEN = process.env.JWT_TOKEN;
const JWT_ADMIN_TOKEN = process.env.JWT_ADMIN_TOKEN;
export default {
    JWT_TOKEN,
    JWT_ADMIN_TOKEN,
};
