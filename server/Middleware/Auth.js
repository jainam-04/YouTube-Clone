import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
      try {
            const token = req.headers.Authorization.split(" ")[1]
            let decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user_id = decodeData?.id
            next()
      } catch (error) {
            res.send(400).json("Invalid Credentials..")
            return
      }
}