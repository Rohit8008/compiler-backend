import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user ID to the request object
    req.user = { id: decoded.id };
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;