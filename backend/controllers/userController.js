import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { Purchase } from "../models/purchaseModel.js";
import { Course } from "../models/courseModel.js";

const saltRounds = 10;

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userSchema = z.object({
        firstName: z.string().min(3, { message: "First name should be at least 3 characters long" }),
        lastName: z.string().min(3, { message: "Last name should be at least 3 characters long" }),
        email: z.email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
    });

    const validatedData = userSchema.safeParse(req.body);
    if (!validatedData.success) {
        return res.status(400).json({ errors: validatedData.error.issues.map(err => err.message) })
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Signup Successful", newUser });
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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: "User not found" })
        }

        const ispassword = await bcrypt.compare(password, user.password);
        if (!ispassword) {
            return res.status(401).json({ errors: "Password or email incorrect" });
        }
        //jwt code
        const token = jwt.sign(
            { id: user._id },
            config.JWT_TOKEN,
            { expiresIn: 21600 } // in seconds
        );
        const cookieOptions = {
            expires: new Date(Date.now() + 6 * 60 * 60 * 1000),// 6 hours
            httpOnly: true, //cant be access via js directly
            secure: process.env.JWT_TOKEN === "production",//true for https only
            sameSite: "Strict" //csrf attacks
        }
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({ message: "Login successful", user, token })
    } catch (error) {
        res.status(500).json({ errors: "Error in login" })
        console.log("Error in login", error);
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout Successfull" })
    } catch (error) {
        res.status(500).json({ errors: "Logout Unsuccessfull" })
        console.log("Error in logout", error);
    }
};

export const purchses = async(req, res)=>{
    const userId = req.userId;
    try {
        const purchased = await Purchase.find({userId})

        let purchasedCourseId = []

        for(let i=0;i<purchased.length;i++){
            purchasedCourseId.push(purchased[i].courseId);
        }
        const courseData = await Course.find({
            _id: {$in: purchasedCourseId},
        });
        res.status(200).json({purchased,courseData})
    } catch (error) {
        res.status(500).json({errors:"Error in finding purchase"})
        console.log("Error in finding purchase", error);
    }
}