const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    console.log("Token reçu :", token); // Affichez le token reçu
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded._id;
    console.log("Token décodé avec succès :", decoded); // Affichez le token décodé
    next();
  } catch (err) {
    console.error("Erreur de vérification du token :", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
