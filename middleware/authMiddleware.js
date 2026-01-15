const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;


    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if (!decoded.role || decoded.role !== "user") {
      return res.status(403).json({ message: "Access denied - Users only" });
    }

    req.user = decoded; // { id, role }
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.role || decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied - Admins only" });
    }

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
