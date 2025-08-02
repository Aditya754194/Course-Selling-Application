// config.js
import dotenv from "dotenv";
dotenv.config();

const JWT_TOKEN = process.env.JWT_TOKEN;
const JWT_ADMIN_TOKEN = process.env.JWT_ADMIN_TOKEN;
const STRIPE_SECRET_KEY =process.env.STRIPE_SECRET_KEY; 
export default {
    JWT_TOKEN,
    JWT_ADMIN_TOKEN,
    STRIPE_SECRET_KEY,
};
