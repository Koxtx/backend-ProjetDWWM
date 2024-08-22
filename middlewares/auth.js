const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("Decoded token:", decoded);
    // Vérifiez ici si la structure du token est correcte
    if (decoded && decoded.user && decoded.user._id) {
      req.user = decoded.user; // Définir req.user correctement
      next();
    } else {
      throw new Error("User ID not found in token");
    }
  } catch (error) {
    console.error("Token decoding failed:", error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
