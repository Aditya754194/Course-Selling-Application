import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userMiddleware=(req, res, next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors: "No token provided"})
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,config.JWT_TOKEN)
        req.userId = decoded.id
        next();
    } catch (error) {
        res.status(401).json({errors: "Invalid token or expired"});
        console.log("Invalid token or expired token" + error);
    }
}


export default userMiddleware;

