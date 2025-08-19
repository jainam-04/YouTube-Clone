import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
      try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                  return res.status(401).json({ message: "No token provided" });
            }
            try {
                  let decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
                  req.user_id = decodeData?.id;
                  return next();
            } catch (error) {
                  if (error.name === "TokenExpiredError") {
                        const decoded = jwt.decode(token);
                        req.user_id = decoded?.id;
                        req.expired = true;
                        return next();
                  }
            }
            return res.status(401).json({ message: "Invalid token" });
      } catch (error) {
            res.status(500).json("Auth middleware error");
            return;
      }
}

export default auth;