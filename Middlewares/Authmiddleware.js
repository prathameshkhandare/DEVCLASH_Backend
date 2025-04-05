const jwt = require("jsonwebtoken");
const User = require("../models/usermodel"); // Adjust the path as necessary

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // You can fetch user if you want extra details
    req.user = decoded;
    // req.user = await User.findById(decoded.id).select("-password"); // Exclude password
    req.user=decoded;
    console.log(req.user);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is not valid" });
  }
}



module.exports = authMiddleware;
