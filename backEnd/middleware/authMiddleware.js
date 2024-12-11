const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    // Log all headers for debugging
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: no token provided" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: invalid token format" });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: no token extracted" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);

    req.user = decoded;
    next(); 
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
