import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { Admin } from "../models/adminModel.js";

const saltRounds = 10;

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const adminSchema = z.object({
        firstName: z.string().min(3, { message: "First name should be at least 3 characters long" }),
        lastName: z.string().min(3, { message: "Last name should be at least 3 characters long" }),
        email: z.email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
    });

    const validatedData = adminSchema.safeParse(req.body);
    if (!validatedData.success) {
        return res.status(400).json({ errors: validatedData.error.issues.map(err => err.message) })
    }

    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: "Signup Successful", newAdmin });
    } catch (error) {
        res.status(500).json({ errors: "Error in signup" });
        console.log("Error in signup", error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ errors: "Invalid Credentials" })
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ errors: "Admin not found" })
        }

        const ispassword = await bcrypt.compare(password, admin.password);
        if (!ispassword) {
            return res.status(401).json({ errors: "Password or email incorrect" });
        }
        //jwt code
        const token = jwt.sign(
            { id: admin._id },
            config.JWT_ADMIN_TOKEN,
            { expiresIn: 21600 } // in seconds
        );
        const cookieOptions = {
            expires: new Date(Date.now() + 6 * 60 * 60 * 1000),// 6 hours
            httpOnly: true, //cant be access via js directly
            secure: process.env.NODE_ENV === "production",//true for https only
            sameSite: "Strict" //csrf attacks
        }
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({ message: "Login successful", admin, token })
    } catch (error) {
        res.status(500).json({ errors: "Error in login" })
        console.log("Error in login", error);
    }
};

export const logout = (req, res) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(401).json({ errors: "Kindly login first" });
        }
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ errors: "Error in Logout" })
        console.log("Error in logout", error);
    }
};