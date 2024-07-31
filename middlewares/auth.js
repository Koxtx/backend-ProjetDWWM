const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Obtenir le token du header
  const token = req.header("x-auth-token");

  // Vérifier si aucun token n'est présent
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Vérifier et décoder le token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
