import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) { return res.status(401).json({ error: "No token provided" }) }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) { return res.status(401).json({ error: "Invalid token" }) }
    const user=await User.findById(decoded.userId).select("-password");
    if (!user) { return res.status(401).json({ error: "No user found" }) }
    req.user = user;
    next();

}

export default protectRoute;
