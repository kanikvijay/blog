import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "HCEWBI3B309BDB", (err, decodedToken) => {
    if (err) {
      return res.sendStatus(403);
    }
    console.log(`i am in auth ${decodedToken}`);
    req.user = decodedToken.author;
    next();
  });
};
export default authenticateJWT;
