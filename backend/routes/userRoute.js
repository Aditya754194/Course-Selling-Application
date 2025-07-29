import express from "express";
import { login, logout, purchses, signup } from "../controllers/userController.js";
import userMiddleware from "../middlewares/userMid.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/purchases",userMiddleware,purchses);

export default router;

